import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { Base_URL } from "../../credentials";
import CourseCard from "../../components/UserComponent/CourseCard";
import Navbar from "../../components/UserComponent/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface Category {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AllCourses: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    sessionStorage.getItem("selectedCategory") || "All"
  );
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and courses
  const fetchData = useCallback(async () => {
    try {
      const [categoriesResponse, coursesResponse] = await Promise.all([
        axios.get<Category[]>(`${Base_URL}/admin/categories`),
        axios.get<[]>(`${Base_URL}/get-courses`),
      ]);

      setCategories(categoriesResponse.data);
      setCourses(coursesResponse.data);
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
      console.error("Error fetching data:", axiosError.message);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter courses based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course._doc.category === selectedCategory)
      );
    }
    sessionStorage.setItem("selectedCategory", selectedCategory || "All");
  }, [courses, selectedCategory]);

 
  const memoizedCourses = useMemo(
    () =>
      filteredCourses.map((course) => (
        <CourseCard
          key={course._id}
          name={course._doc.name}
          thumbnail={course.thumbnail}
          id={course._doc.courseId}
          price={course._doc?.price}
        />
      )),
    [filteredCourses]
  );

  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const baseClasses =
    "text font-medium p-2 cursor-pointer transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF896D] to-[#D02020] hover:font-bold";

  return (
    <main className="text-black antialiased relative">
      <section className="relative flex min-h-screen">
     
       
      </section>
    </main>
  );
};

export default AllCourses;
