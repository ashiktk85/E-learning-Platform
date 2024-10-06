import React, { useCallback, useEffect, useState, useRef } from 'react';
import CourseCard from './CourseCard';
import axios from 'axios';
import { Base_URL } from '../../credentials';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const CoursesHome = () => {
    const user = useSelector((state: RootState) => state.user);
    const userInfo = user.userInfo;
    const [courses, setCourses] = useState<any[]>([]);
    const previousCoursesRef = useRef<any[]>([]);

    
    const fetchCourses = useCallback(async () => {
        try {
            const response = await axios.get(`${Base_URL}/get-courses`);
            if (Array.isArray(response.data.courses)) {
                const newCourses = response.data.courses;

                if (JSON.stringify(newCourses) !== JSON.stringify(previousCoursesRef.current)) {
                    setCourses(newCourses);
                    previousCoursesRef.current = newCourses; 
                }
            } else {
                console.error("Unexpected data format:", response.data);
            }
        } catch (error: any) {
            console.error("Error fetching courses:", error.message);
        }
    }, []);

   
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

  
    const displayedCourses = Array.isArray(courses) ? courses.slice(0, 8) : [];

    return (
        <section className='container pl-10 py-16 bg-[#f2f2f2]' id="courses">
            <h2 className='mb-8 text-center text-3xl tracking-tighter lg:text-4xl font-sans'>
                Courses
            </h2>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
                {displayedCourses.map((course) => (
                    <CourseCard 
                        key={course._id} 
                        courseName={course.courseName} 
                        thumbnail={course.thumbnail} 
                        courseId={course.courseId} 
                        price={course.price}
                    />
                ))}
            </div>
        </section>
    );
}

export default CoursesHome;
