"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false,
});

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Message {
  senderId: string;
  senderModel: "User" | "Doctor";
  receiverId: string;
  receiverModel: "User" | "Doctor";
  message: string;
}

const DrMessage = () => {
  const { user: doctor } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  console.log("object",selectedUser)
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/users/msgof/${doctor?.id}`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("receiveMessage", (msg: Message) => {
      if (msg.receiverId === doctor?.id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [doctor?.id]);

  // Fetch chat history when user is selected
  useEffect(() => {
    if (selectedUser) {
      axiosInstance
        .get(`/users/messageof/${doctor?.id}/${selectedUser._id}`)
        .then((res) => setMessages(res.data.data))
        .catch((err) => console.error("Error fetching chat:", err));
    }
  }, [selectedUser, doctor?.id]);

  // Filter users based on search input
  useEffect(() => {
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // Send Message
  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser) {
      const msgData: Message = {
        senderId: doctor?.id || "",
        senderModel: "Doctor",
        receiverId: selectedUser._id,
        receiverModel: "User",
        message: newMessage,
      };

      try {
        await axiosInstance.post("/users/sendmsg", msgData);
        socket.emit("sendMessage", msgData);
        setMessages((prev) => [...prev, msgData]);
        setNewMessage("");
      } catch (err) {
        console.error("Message send error:", err);
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - User List */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <ul>
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`p-2 cursor-pointer ${
                selectedUser?._id === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              } rounded-md mb-2`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-blue-500 text-white p-4">
              <h2 className="text-lg font-semibold">
                Chat with {selectedUser.name}
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 rounded-md ${
                    msg.senderId === doctor?.id
                      ? "bg-blue-300 self-end text-right"
                      : "bg-gray-300 self-start text-left"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border rounded-md"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default DrMessage;
