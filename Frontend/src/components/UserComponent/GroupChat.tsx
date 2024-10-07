import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import { BsSendFill } from "react-icons/bs";
import io from "socket.io-client";
import { Base_URL } from "../../credentials";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import userAxiosInstance from "../../config/axiosInstance/userInstance";
import { defaultProfile } from "../../assets/svgs/icons";

interface Message {
  userId: string;
  message: string;
  timestamp: string;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    profileUrl: string;
  };
}

const GroupChat: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [courseData, setCourseData] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await userAxiosInstance.get(
          `${Base_URL}/mycourses/${userInfo?.userId}`
        );
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourseData();
  }, [userInfo?.userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedCourse) {
        setIsLoading(true);
        try {
          const response = await userAxiosInstance.get(
            `${Base_URL}/community/messages/${selectedCourse}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();

    if (selectedCourse) {
      socketRef.current = io(Base_URL);
      const socket = socketRef.current;

      socket.emit("joinRoom", selectedCourse);

      socket.on("receiveMessage", (payload: Message) => {
        setMessages((prevMsgs) => [...prevMsgs, payload]);
      });

      return () => {
        socket.off("receiveMessage");
        socket.disconnect();
      };
    }
  }, [selectedCourse]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "" && selectedCourse) {
      const userId = userInfo?.userId;
      socketRef.current?.emit("sendMessage", {
        courseId: selectedCourse,
        message,
        userId,
      });
      setMessage("");
    }
  };

  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courseId);
    setMessages([]);
  };

  return (
    <main className="flex flex-col md:flex-row w-full h-full gap-5 p-4">
      <section className="w-full md:w-1/4 bg-white h-full rounded-lg overflow-hidden">
        <div className="px-4 py-3 md:px-8 md:py-5">
          <h1 className="text-lg font-bold">All chats</h1>
          <input
            type="search"
            className="border-none w-full bg-gray-200 h-8 mt-3 rounded-md px-3"
            placeholder="Search"
          />
        </div>
        <div className="w-full h-full overflow-y-auto px-2">
          <h1 className="pl-2 text-sm font-semibold">Courses</h1>
          {courseData.map((course, index) => (
            <div
              key={index}
              className={`h-14 w-full px-2 md:px-3 flex items-center cursor-pointer my-3 ${
                selectedCourse === course._doc?.courseId
                  ? "bg-gray-100 rounded-md"
                  : ""
              }`}
              onClick={() => handleCourseClick(course._doc?.courseId)}
            >
              <img
                src={course?.thumbnail}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
              />
              <p className="pl-3 text-sm md:text-base font-medium">
                {course._doc?.name}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white w-full h-full rounded-lg px-3 py-2 flex flex-col">
        {selectedCourse ? (
          <>
            <div className="w-full h-12 bg-orange-50 rounded-md mb-2"></div>

            <div
              className="flex-grow bg-gray-100 overflow-y-auto rounded-md mb-2 p-3"
              style={{
                // backgroundImage: 'url(https://i.pinimg.com/564x/f9/b2/0c/f9b20cfb86e7775f86124bee62d13458.jpg)',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {isLoading ? (
                <p className="text-center text-gray-500">Loading messages...</p>
              ) : messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.userId === userInfo?.userId
                        ? "justify-end"
                        : "justify-start"
                    } mb-2`}
                  >
                    <div>
                      <div className="flex gap-2">
                        <img
                          src={msg.userDetails?.profileUrl || defaultProfile}
                          alt=""
                          className="h-5 w-5 object-cover rounded-full"
                        />
                        <strong
                          className={`flex ${
                            msg.userId === userInfo?.userId
                              ? "justify-end"
                              : "justify-start"
                          } text-sm mb-1`}
                        >
                          {msg.userDetails
                            ? `${msg.userDetails.firstName} ${msg.userDetails.lastName}`
                            : "Unknown User"}
                          :
                        </strong>{" "}
                      </div>

                      <div
                        className={`relative max-w-xs p-2 rounded-lg ${
                          msg.userId === userInfo?.userId
                            ? "bg-blue-100 text-left"
                            : "bg-green-100 text-right"
                        }`}
                      >
                        <p
                          className={`mb-2 ${
                            msg.userId === userInfo?.userId
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          {msg.message}
                        </p>

                        <span className="absolute bottom-1 right-2 text-gray-500 text-[10px]">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No messages yet.</p>
              )}
            </div>

            <form className="w-full h-12 flex" onSubmit={submit}>
              <input
                type="text"
                value={message}
                onChange={handleChange}
                className="flex-grow bg-gray-200 outline-none px-4 rounded-md"
                placeholder="Type your message"
              />
              <button type="submit" className="flex items-center px-3">
                <BsSendFill size={24} className="cursor-pointer" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            Select a course to chat
          </div>
        )}
      </section>
    </main>
  );
};

export default GroupChat;
