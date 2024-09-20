import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

interface RatingsProps {
  onRateChange: (rate: number | null) => void;
}

const Ratings: React.FC<RatingsProps> = ({ onRateChange }) => {
  const [value, setValue] = React.useState<number | null>(null);

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
    onRateChange(newValue); 
  };

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleRatingChange}
        size="large"
        className="pt-2 pb-5"
      />
    </Box>
  );
};

export default Ratings;

