import React from 'react';
import CourseCard from './CourseCard';

const CoursesHome = () => {
    return (
        <section className='container mx-auto py-16' id="courses">
            <h2 className='mb-8 text-center text-3xl tracking-tighter lg:text-4xl'>
                Courses
            </h2>
            <div className='grid gridcols-1 gap-8 md:grid-cols-5'>
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </section>
    );
}

export default CoursesHome;
