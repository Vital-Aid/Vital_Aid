"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDoctorUser } from "@/lib/Query/hooks/useDocterUser";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false,
});

interface Doctor {
  doctor: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface Message {
  senderId: string;
  senderModel: "User" | "Doctor";
  receiverId: string;
  receiverModel: "User" | "Doctor";
  message: string;
}

const Message = () => {
  const { doctors } = useDoctorUser();
  const { user } = useAppSelector((state) => state.auth);

  const doctorsList: Doctor[] = React.useMemo(
    () => (Array.isArray(doctors?.data?.data) ? doctors.data?.data : []),
    [doctors]
  );

  const [search, setSearch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor["doctor"] | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("receiveMessage", (msg: Message) => {
      if (msg.receiverId === user?.id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [user?.id]);

  useEffect(() => {
    if (selectedDoctor) {
      axiosInstance
        .get(`/users/messageof/${user?.id}/${selectedDoctor._id}`)
        .then((res) => setMessages(res.data.data))
        
        .catch((err) => console.error("Error fetching chat:", err));
    }
  }, [selectedDoctor, user?.id]);

  
  useEffect(() => {
    const filtered = doctorsList.filter((d) =>
      d?.doctor?.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [search, doctorsList]);

 
  const sendMessage = async () => {
    if (newMessage.trim() && selectedDoctor) {
      const msgData: Message = {
        senderId: user?.id || "",
        senderModel: "User",
        receiverId: selectedDoctor._id,
        receiverModel: "Doctor",
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
      {/* Sidebar - Doctor List */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Doctors</h2>
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <ul>
          {filteredDoctors.map((doctor) => (
            <li
              key={doctor.doctor._id}
              className={`p-2 cursor-pointer ${
                selectedDoctor?._id === doctor.doctor._id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              } rounded-md mb-2`}
              onClick={() => setSelectedDoctor(doctor.doctor)}
            >
              {doctor.doctor.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col">
        {selectedDoctor ? (
          <>
            {/* Chat Header */}
            <div className="bg-blue-500 text-white p-4">
              <h2 className="text-lg font-semibold">
                Chat with {selectedDoctor.name}
              </h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 rounded-md ${
                    msg.senderId === user?.id
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
            Select a doctor to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
