import React, { useState, useEffect } from "react";
import AdminAside from "./AdminAside";
import Search from "../common/AdminCommon/Search";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Modal from "react-modal";

const url = "http://localhost:7000";

// Define the Category type
interface Category {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}/admin/categories`);
                setCategories(response.data);
                console.log(response.data);
            } catch (error: any) {
                console.error("Error fetching categories:", error.message);
            }
        };

        fetchCategories();
    }, []);

    const formik = useFormik({
        initialValues: {
            categoryName: "",
            description: "",
        },
        validationSchema: Yup.object({
            categoryName: Yup.string()
                .trim()
                .required("Category name is required")
                .matches(/^[A-Z][a-zA-Z]*(?: [a-zA-Z]*)*$/, "Should start with an uppercase letter and contain only letters")
                .min(3, "Category name should be at least 3 characters long")
                .max(50, "Category name should be at most 50 characters long"),
            description: Yup.string()
                .trim()
                .matches(/^[A-Z][a-zA-Z]*(?: [a-zA-Z]*)*$/, "Should start with an uppercase letter and contain only letters")
                .required("Description is required")
                .min(10, "Description should be at least 10 characters long"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const { categoryName, description } = values;
                const response = await axios.post(`${url}/admin/createcategory`, { categoryName, description });
                if (response.data === true) {
                    const newCategory: Category = {
                        _id: response.data._id, 
                        name: categoryName,
                        description,
                        isActive: true, 
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };

                    
                    setCategories((prevCategories) => [...prevCategories, newCategory]);

                    toast.success("Category created.");
                    resetForm();
                }
            } catch (error: any) {
                console.log("error", error.message);
                toast.error("Category already exists.")
            }
        },
    });

    const handleViewClick = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            <AdminAside />

            <div className="col-span-8 bg-spotify-white w-full mt-10 h-80">
                <div className="flex justify-between mb-4">
                    <h1 className="font-extrabold font-poppins text-2xl justify-start">
                        Category List
                    </h1>
                    <Search />
                </div>
                <Toaster richColors position="top-center" />

                <div className="flex">
                    <form className="w-1/4 pt-28 mr-10" onSubmit={formik.handleSubmit}>
                        <div>
                            <h2 className="text-lg font-semibold">Enter a new category</h2>
                            <input
                                type="text"
                                className="w-full text-black border-b border-black focus:outline-none py-2 mt-2"
                                placeholder="Category name"
                                name="categoryName"
                                value={formik.values.categoryName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            <p className="text-[12px] text-gray-600 mt-1">
                                "This category will be shown on the website."
                            </p>

                            {formik.touched.categoryName && formik.errors.categoryName ? (
                                <div className="text-red-500 text-sm">{formik.errors.categoryName}</div>
                            ) : null}

                            <textarea
                                className="w-full text-black border border-gray-600 focus:outline-none mt-5"
                                rows={4}
                                placeholder="Enter your description here"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="description"
                            />
                            {formik.touched.description && formik.errors.description ? (
                                <div className="text-red-500 text-sm">{formik.errors.description}</div>
                            ) : null}

                            <button type="submit" className="w-full h-12 bg-black text-white mt-5 rounded-sm font-semibold">
                                Create category
                            </button>
                        </div>
                    </form>

                    <div className="w-3/4 mt-24 rounded-md bg-white shadow-lg p-4">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-800 text-base font-semibold text-white rounded-t-md">
                                <tr className="rounded-sm">
                                    <th className="border-b py-2 px-4">S.no</th>
                                    <th className="border-b py-2 px-4">Category Name</th>
                                    <th className="border-b py-2 px-4">Active</th>
                                    <th className="border-b py-2 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <tr
                                            key={category._id}
                                            className="hover:bg-gray-100 transition-all duration-200"
                                        >
                                            <td className="border-b py-2 px-4 text-gray-700">{index + 1}</td>
                                            <td className="border-b py-2 px-4 text-gray-700">{category.name}</td>
                                            <td className="border-b py-2 px-4 text-gray-700">{category.isActive ? "Yes" : "No"}</td>
                                            <td className="border-b py-2 px-4">
                                                <button
                                                    className="text-blue-500 hover:underline focus:outline-none"
                                                    onClick={() => handleViewClick(category)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4 text-gray-700">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedCategory && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Category Details"
                    className="bg-white p-5 w-1/3 mx-auto mt-20 rounded shadow-lg"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                >
                    <h2 className="text-xl font-bold mb-4">{selectedCategory.name}</h2>
                    <p><strong>Description:</strong> {selectedCategory.description}</p>
                    <p><strong>Active:</strong> {selectedCategory.isActive ? "Yes" : "No"}</p>
                    <button
                        className="mt-4 bg-black text-white px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default CategoryList;
