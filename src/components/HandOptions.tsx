import React from 'react';
import { OptionsContainer, OptionButton } from './HandOptionsStyles';

export interface HandOption {
  label: string;
  value: string;
}

interface HandOptionsProps {
  options: HandOption[];
  onSelect: (selectedValue: string) => void;
}

const HandOptions: React.FC<HandOptionsProps> = ({ options, onSelect }) => {
  return (
    <OptionsContainer>
      {options.map((option, index) => (
        <OptionButton
          key={index}
          variant="contained"
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </OptionButton>
      ))}
    </OptionsContainer>
  );
};

export default HandOptions;
