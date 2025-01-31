'use client'
import React, { useState } from 'react'
import { volunteerSchema } from '@/schema/volunteersSchema'
import { useFormik } from 'formik'
import Image from "next/image";
import { FaFileUpload } from "react-icons/fa";
import { useAppDispatch } from '@/lib/store/hooks';
import { addVolunteer } from '@/lib/store/features/volunteers';


interface formValue {
    name: string,
    phone:number | string,
    gender:  'male' | 'female' | null,
    image: File | null
}

const initialState: formValue = {
    name: '',
    phone: '',
    gender: null,
    image: null
}

const Vlounteers = () => {
    const dispatch=useAppDispatch()
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { values, errors, handleChange, handleBlur, handleReset, handleSubmit, touched, setFieldValue } = useFormik({
        initialValues: initialState,
        validationSchema: volunteerSchema,
        onSubmit: async () => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('phone', values.phone.toString());
                formData.append('gender', values.gender || "");
                if (values.image) {
                    formData.append('image', values.image);
                }
                setImagePreview(null);
              const response=  await dispatch(addVolunteer(formData))
        console.log('resp',response);
        
    
              
            } catch (error) {
                console.log("error:", error);
            }
        }
    });
    
    
    return (
        <div className="w-screen h-fit fixed flex justify-center items-center p-6 sm:w-fit">
            <div className="mx-5 w-full h-4/6 my-11 sm:w-11/12 md:w-[1000px] lg:w- bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
                    Add Volunteers
                </h2>

                <form className="space-y-2" onSubmit={handleSubmit}>

                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Enter the title"
                            className={`w-full p-3 border rounded-md border-gray-500 bg-green-200`}
                        />
                        {errors.name && touched.name && (
                            <div className="text-red-500 text-sm">{errors.name}</div>
                        )}
                    </div>

                    {/* Gender Field */}
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={values.gender === "male"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Male
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={values.gender === "female"}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Female
                        </label>
                    </div>
                    {touched.gender && errors.gender && (
                        <div className="text-red-500 text-sm">{errors.gender}</div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block font-medium text-gray-700">Phone</label>
                            <input
                                id="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                                placeholder="Enter quantity"
                                className={`w-full p-3 border rounded-md border-gray-500 bg-green-200`}
                            />
                            {errors.phone && touched.phone && (
                                <div className="text-red-500 text-sm">{errors.phone}</div>
                            )}
                            {/* Buttons */}
                            <div className="flex hidden flex-col sm:flex-row space-x-4 mx-32 justify-center mt-8 sm:block md:block ">
                                <button
                                    type="submit"
                                    className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white w-full sm:w-auto"
                                >
                                    Add
                                </button>
                                <button
                                    className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>


                        <div>
                            <label className="block font-medium text-gray-700">Profile Image</label>
                            <label className="w-full h-32 p-6 border-2 border-dashed rounded-md bg-green-200 border-gray-500 flex flex-col items-center justify-center cursor-pointer">
                                <FaFileUpload className="text-4xl text-gray-600 mb-2" />
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        width={100}
                                        height={100}
                                        alt="Preview"
                                        className="rounded-md object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-600">{values.image?.name || "Upload image"}</span>
                                )}
                                <input
                                    type="file"
                                    className="hidden bg-green-200"
                                    id="image"
                                    onBlur={handleBlur}
                                    onChange={(event) => {
                                        const file = event.currentTarget.files?.[0] || null;
                                        setFieldValue("image", file);
                                        setImagePreview(file ? URL.createObjectURL(file) : null);
                                    }}
                                />
                            </label>
                            {errors.image && touched.image && (
                                <div className="text-red-500 text-sm">{errors.image}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:hidden md:hidden">
                        <button
                            type="submit"
                            className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white w-full sm:w-auto"
                        >
                            Add
                        </button>
                        <button
                            className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white w-full sm:w-auto"
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Vlounteers
