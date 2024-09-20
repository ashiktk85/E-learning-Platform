import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import userAxiosInstance from '../../config/axiosInstance/userInstance';
import { Base_URL } from '../../credentials';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function ExistRating() {
  const [value, setValue] = React.useState<number| null>(null);
  const {userInfo} = useSelector((state : RootState) => state.user)

  React.useEffect(() => {
    const fetchRating = async() => {
      try {
        alert("jj")
        const response = await userAxiosInstance.get(`${Base_URL}/get-rating/${userInfo?.userId}`)
        alert(response.data)
        setValue(response.data)
      } catch (error) {
        
      }
    }
    fetchRating()
  },[])

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      
     
      
      <Rating name="read-only" value={value} readOnly />
      
      
    </Box>
  );
}
