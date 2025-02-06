"use client";
import React, { useState } from "react";
import useEvents from "@/lib/Query/hooks/useEvents";
import Image from "next/image";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  image: string[];
  location: string;
  organization: string;
};

const Events: React.FC = () => {
  const { events, isLoading, error } = useEvents();

  

  if (isLoading)
    return <p className="text-center text-blue-500">Loading events...</p>;

  if (error || events?.error === "true")
    return <p className="text-center text-red-500">Error loading events!</p>;

  let eventList: Event[] = Array.isArray(events?.events) ? events.events : [];

  eventList = eventList.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Upcoming Charity Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {eventList.length > 0 ? (
          eventList.map((event: Event) => (
            <div
              key={event._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="relative w-full h-48">
                <Image
                  src={event.image[0]}
                  alt={event.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-gray-500 text-sm">
                  {new Date(event.date).toDateString()}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  {event.description.slice(0, 100)}...
                </p>
                <a
                  href={`/user/events/${event._id}`}
                  className="text-blue-600 font-bold mt-3 inline-block"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No events available
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
