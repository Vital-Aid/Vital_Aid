"use client";

import React, { useEffect, useState, useRef } from "react";

import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import { initializeSocket ,socket} from "@/lib/socket/socketinstanc";


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
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  

    useEffect(() => {
    if (doctor?.id) {
      axiosInstance
        .get(`/users/msgof/${doctor.id}`)
        .then((res) => setUsers(res.data.data))
        .catch((err) => console.error("Error fetching users:", err));
    }
  }, [doctor?.id]);


  useEffect(() => {
    if (doctor?.id) {
      const cleanup = initializeSocket(doctor.id, "Doctor");
      return () => {
        cleanup();
      };
    }
  }, [doctor?.id]);

// Add this to both components
const [receivedMsgs] = useState(new Set());

useEffect(() => {
  const handleReceiveMessage = (msg: Message) => {
    if (
      msg.senderId === selectedUser?._id && // or selectedDoctor?._id for user component
      !receivedMsgs.has(JSON.stringify(msg))
    ) {
      receivedMsgs.add(JSON.stringify(msg));
      setMessages((prev) => [...prev, msg]);
    }
  };

  socket.on("receiveMessage", handleReceiveMessage);
  return () => {
    socket.off("receiveMessage", handleReceiveMessage);
  };
}, [selectedUser, receivedMsgs]); // or [selectedDoctor, receivedMsgs] for user component
 
  useEffect(() => {
    if (selectedUser && doctor?.id) {
      axiosInstance
        .get(`/users/messageof/${doctor.id}/${selectedUser._id}`)
        .then((res) => setMessages(res.data.data))
        .catch((err) => console.error("Error fetching chat:", err));
    }
  }, [selectedUser, doctor?.id]);

  
  useEffect(() => {
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser && doctor?.id) {
      const msgData: Message = {
        senderId: doctor.id,
        senderModel: "Doctor",
        receiverId: selectedUser._id,
        receiverModel: "User",
        message: newMessage.trim(),
      };

      try {
       
        setMessages((prev) => [...prev, msgData]);
        socket.emit("sendMessage", msgData);
        setNewMessage("");
        await axiosInstance.post("/users/sendmsg", msgData);
      } catch (err) {
        console.error("Message send error:", err);
        setMessages((prev) => prev.filter((msg) => msg !== msgData));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen">
      
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <ul className="overflow-y-auto max-h-[calc(100vh-180px)]">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`p-2 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${
                selectedUser?._id === user._id
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white"
              } rounded-md mb-2`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div className="w-3/4 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            <div className="bg-blue-500 text-white p-4 shadow-md">
              <h2 className="text-lg font-semibold">
                Chat with {selectedUser.name}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderId === doctor?.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[70%] break-words ${
                      msg.senderId === doctor?.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
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