import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from '@mui/material';

import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/learn-select/${name}.svg`} sx={{ width: 24, height: 24, ml: 1 }} />
);

const options = [
  { title: 'Learn Piazza', icon: icon('ic_piazza') },
  { title: 'Learn Video', icon: icon('ic_video') },
  { title: 'Learn PDF', icon: icon('ic_pdf') },
];

export default function LearnSelector({ selectedOption, setSelectedOption }) {
  return (
    <Box sx={{ height: '50%', mb: 0, width: '100%' }}>
      {options.map((option, index) => (
        <Button
          key={index}
          variant="contained"
          onClick={() => setSelectedOption(option.title)}
          sx={{
            m: 1,
            width: 'calc(100% - 16px)',
            backgroundColor: option.title === selectedOption ? '#2196f3' : 'transparent', // Blue when selected
            color: option.title === selectedOption ? 'white' : 'black', // White text when selected
            border: '1px solid',
            borderColor: option.title === selectedOption ? '#2196f3' : 'transparent',
            boxShadow: 'none',
            justifyContent: 'space-between', // Align text and icon to opposite ends
            textTransform: 'none',
            paddingLeft: '10px',
            paddingRight: '10px', // Add padding to the right for the icon
            borderRadius: '8px',
            fontSize: '1rem', // Bigger text
            '&:hover': {
              backgroundColor: '#2196f3', // Blue on hover
              boxShadow: 'none',
              borderColor: 'transparent',
              color: 'white', // Ensure text stays white on hover
            },
          }}
        >
          {option.title}
          {option.icon}
        </Button>
      ))}
    </Box>
  );
}

LearnSelector.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};
