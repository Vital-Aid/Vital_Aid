
import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { equipmentSchema } from "@/schema/eqiupmentSchema";
import { useFormik } from "formik";

interface FormValue {
    name: string;
    quantity: number | string;
    image: File | null;
    description: string;
}

const initialValues: FormValue = {
    name: '',
    quantity: "",
    image: null,
    description: ''
};

const Equipments = () => {
    const { errors, touched, handleBlur, handleChange, handleSubmit, handleReset, values, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: equipmentSchema,
        onSubmit: async (e) => {
            try {
                await console.log('form values:', values);
                handleReset(e);
            } catch (error) {
                console.log('form error:', error);
            }
        }
    });

    return (
        <div className="w-screen flex justify-center items-center p-6 sm:w-fit">
            <div className="w-full sm:w-11/12 md:w-[1050px] lg:w- bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
                    Add Equipment
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            type="text"
                            placeholder="Enter the title"
                            className={`w-full p-3 border rounded-md ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} bg-green-100`}
                        />
                        {errors.name && touched.name && (
                            <div className="text-red-500 text-sm">{errors.name}</div>
                        )}
                    </div>

                    {/* Quantity & Image Upload (Grid for sm+) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Quantity Input */}
                        <div>
                            <label className="block font-medium text-gray-700">Quantity</label>
                            <input
                                id="quantity"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.quantity}
                                type="number"
                                placeholder="Enter quantity"
                                className={`w-full p-3 border rounded-md ${errors.quantity && touched.quantity ? 'border-red-500' : 'border-gray-300'} bg-green-100`}
                            />
                            {errors.quantity && touched.quantity && (
                                <div className="text-red-500 text-sm">{errors.quantity}</div>
                            )}
                        </div>

                        {/* Profile Image Upload */}
                        <div>
                            <label className="block font-medium text-gray-700">Profile Image</label>
                            <label className="w-full p-6 border-2 border-dashed rounded-md bg-green-100 flex flex-col items-center justify-center cursor-pointer">
                                <FaFileUpload className="text-4xl text-gray-600 mb-2" />
                                <span className="text-gray-600">Upload image</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="image"
                                    onBlur={handleBlur}
                                    onChange={(event) => {
                                        const file = event.currentTarget.files?.[0] || null;
                                        setFieldValue("image", file);
                                    }}
                                />
                            </label>
                            {errors.image && touched.image && (
                                <div className="text-red-500 text-sm">{errors.image}</div>
                            )}
                        </div>
                    </div>

                    {/* About Equipment */}
                    <div>
                        <label className="block font-medium text-gray-700">About the Equipment</label>
                        <textarea
                            rows={4}
                            className={`w-full p-3 border rounded-md ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'} bg-green-100`}
                            id="description"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.description}
                        ></textarea>
                        {errors.description && touched.description && (
                            <div className="text-red-500 text-sm">{errors.description}</div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Equipments;
