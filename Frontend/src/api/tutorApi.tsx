import axios from "axios";
import { Base_URL } from "../credentials";
import { toast } from "sonner";



export const fetchTutorDetails = async (id: string): Promise<TutorDetails> => {
    try {
      const { data } = await axios.get(`${Base_URL}/tutorDetails/${id}`);
      if (!data) {
        throw new Error('Error in fetching data');
      }
      return data; 
    } catch (error: any) {
      toast.error(error.message);
      throw error; 
    }
  };