import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Ratings from './Ratings';
import userAxiosInstance from '../../config/axiosInstance/userInstance';
import { Base_URL } from '../../credentials';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function RatingModal(courseId: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [ratingValue, setRatingValue] = React.useState<number | null>(null);
  const {userInfo} = useSelector((state : RootState) => state.user)

  const handleSubmit = async () => {
    if (ratingValue !== null) {
      try {
       
        const response = await userAxiosInstance.post(`${Base_URL}/add-rating/${userInfo?.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          rating: ratingValue,courseId : courseId
        });

        if (response.data === true) {
          toast.success("Rating added.")
          setOpen(false);
        } else {
          console.error('Failed to submit rating');
        }
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    } else {
      console.log('Please select a rating before submitting');
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" className="w-24" onClick={() => setOpen(true)}>
        Rating
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ width: 300, borderRadius: 'md', p: 3, boxShadow: 'lg', pl: 8 }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            Add Rating
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Rate us.
            <Ratings onRateChange={(rate) => setRatingValue(rate)} />
            <Button variant="outlined" color="neutral" className="mt-5" onClick={handleSubmit}>
              Submit
            </Button>
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
