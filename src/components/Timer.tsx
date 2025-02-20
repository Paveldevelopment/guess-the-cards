import React from 'react';
import Typography from '@mui/material/Typography';
import { TimerContainer } from './TimerStyles';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  return (
    <TimerContainer>
      <Typography variant="h6" color="text.primary">
        Time: {time}s
      </Typography>
    </TimerContainer>
  );
};

export default Timer;
