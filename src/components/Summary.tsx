import React from 'react';
import Typography from '@mui/material/Typography';
import { SummaryContainer, AttemptList, AttemptItem } from './SummaryStyles';

interface SummaryProps {
  totalCorrect: number;
  attempts: string[];
}

const Summary: React.FC<SummaryProps> = ({ totalCorrect, attempts }) => {
  return (
    <SummaryContainer>
      <Typography variant="h5" gutterBottom>
        Game Summary
      </Typography>
      <Typography variant="subtitle1">
        Total Correct Answers: {totalCorrect}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Previous Attempts:
      </Typography>
      <AttemptList>
        {attempts.map((attempt, index) => (
          <AttemptItem key={index}>{attempt}</AttemptItem>
        ))}
      </AttemptList>
    </SummaryContainer>
  );
};

export default Summary;
