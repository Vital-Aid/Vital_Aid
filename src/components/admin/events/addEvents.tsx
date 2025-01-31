"use client"
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axios";

// Define the type for form data
interface EventFormData {
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  image: FileList; // We expect a FileList (array-like object)
}

const AddEvents = () => {
  const { register, handleSubmit, reset } = useForm<EventFormData>();  // Use type for form data
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Handle file change (ensure file exists)
    if (file) {
      setImagePreview(URL.createObjectURL(file));  // Preview image
    }
  };

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    try {
      const token = Cookies.get("token"); // Get admin token from cookies
      const formData = new FormData();

      // Append form data
      formData.append("title", data.title);
      formData.append("organization", data.organization);
      formData.append("location", data.location);
      formData.append("date", data.date);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);  // Append the first file in the FileList

      const response = await axiosInstance.post("/events/addevents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      alert("Event added successfully!");
      reset();  // Reset form fields after successful submission
      setImagePreview(null);  // Reset image preview
    } catch (error) {
      console.error(error);
      alert("Error adding event");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Event Title"
          {...register("title", { required: true })}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Organization"
          {...register("organization", { required: true })}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          {...register("location", { required: true })}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          {...register("date", { required: true })}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Event Description"
          {...register("description", { required: true })}
          className="w-full p-2 mb-2 border rounded"
        ></textarea>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="w-full p-2 mb-2 border rounded"
          onChange={handleImageChange}
        />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover mb-2 rounded" />}

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvents;
