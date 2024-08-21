import React, { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const url = "http://localhost:7000";

const CourseList: React.FC<{ onNext: (itemName: string) => void }> = ({
  onNext,
}) => {

    const user = useSelector((state: RootState) => state.user);
    const userInfo = user.userInfo;

    const [course, setCourse] = useState([])

    useEffect(() => {
       const fetchCourses = async() => {
            try {
                const response = await axios.get(`${url}/tutor/get-courses/${userInfo?.email}`)
                setCourse(response.data)
                console.log(response.data);
                
            } catch (error : any) {
                console.log(error.message);
                
            }
        }
        fetchCourses()
    },[])


  return (
    <div>
      <h1 className="font-semibold text-lg">course list</h1>
      <div className="w-full h-auto mt-5">
        <Image
          width={200}
          alt="NextUI hero Image"
          src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default CourseList;
