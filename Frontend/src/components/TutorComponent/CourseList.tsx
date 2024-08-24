import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import axios from "axios";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const url = "http://localhost:7000";

const CourseList: React.FC<{ onNext: (itemName: string) => void }> = ({ onNext }) => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.userInfo;

  const [courses, setCourses] = useState<any[]>([]); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/tutor/get-courses/${userInfo?.email}`);
        setCourses(response.data);
        console.log(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchCourses();
  }, [courses.length]);

  return (
    <div>
      <h1 className="font-semibold text-lg">Course List</h1>
      <div className="w-full h-auto mt-5 flex gap-10">
        {courses.map((course) => (
          <Card key={course._id} shadow="sm" className="rounded-lg" isPressable onPress={() => onNext(course.name)}>
            <CardBody className="overflow-visible p-0 ">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={course.name}
                className="w-52 object-cover h-[140px]"
                src={course.thumbnail || "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"} // Fallback if no thumbnail
              />
            </CardBody>
            <CardFooter className="text-small justify-between bg-black/90 text-white">
              <div>
                <b>{course.name}</b>
                <p>Sections: {course.sections.length}</p>
                <p>Videos: {course.sections.reduce((acc: any, section: { videos: string | any[]; }) => acc + section.videos.length, 0)}</p>
              </div>
              <div>
                <p>{course.price ? `$${course.price}` : "Free"}</p>
                <p>{course.ratings.length > 0 ? `${course.ratings.length} Ratings` : "No Ratings"}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
