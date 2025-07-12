import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton
} from '@mui/material';
import { Close as CloseIcon, KeyboardArrowDown } from '@mui/icons-material';

interface SkillExchangeModalProps {
  open: boolean;
  onClose: () => void;
  offeredSkills?: string[];
  wantedSkills?: string[];
}

const SkillExchangeModal: React.FC<SkillExchangeModalProps> = ({
  open,
  onClose,
  offeredSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'Design'],
  wantedSkills = ['Machine Learning', 'DevOps', 'Mobile Development', 'Data Science', 'UI/UX']
}) => {
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState('');
  const [selectedWantedSkill, setSelectedWantedSkill] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Handle form submission here
    console.log({
      offeredSkill: selectedOfferedSkill,
      wantedSkill: selectedWantedSkill,
      message: message
    });
    
    // Reset form and close modal
    setSelectedOfferedSkill('');
    setSelectedWantedSkill('');
    setMessage('');
    onClose();
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400, md: 450 },
    maxHeight: '90vh',
    overflow: 'auto',
    outline: 'none',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="skill-exchange-modal"
      aria-describedby="skill-exchange-form"
    >
      <Paper sx={modalStyle}>
        <Box
          sx={{
            p: 4,
            backgroundColor: '#ffffff',
            borderRadius: 3,
            border: '2px solid #e0e0e0',
            position: 'relative',
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#666',
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: '#333',
              fontWeight: 500,
              pr: 4, // Add padding to avoid close button
            }}
          >
            Skill Exchange Request
          </Typography>

          {/* Offered Skills Dropdown */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel
              sx={{
                color: '#666',
                '&.Mui-focused': { color: '#2d5a5a' },
              }}
            >
              Choose one of your offered skills
            </InputLabel>
            <Select
              value={selectedOfferedSkill}
              onChange={(e) => setSelectedOfferedSkill(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ccc',
                  borderWidth: 2,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2d5a5a',
                },
              }}
            >
              {offeredSkills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Wanted Skills Dropdown */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel
              sx={{
                color: '#666',
                '&.Mui-focused': { color: '#2d5a5a' },
              }}
            >
              Choose one of their wanted skills
            </InputLabel>
            <Select
              value={selectedWantedSkill}
              onChange={(e) => setSelectedWantedSkill(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ccc',
                  borderWidth: 2,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#999',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2d5a5a',
                },
              }}
            >
              {wantedSkills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Message Text Area */}
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: '#666',
              fontWeight: 500,
            }}
          >
            Message
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: '#ccc',
                  borderWidth: 2,
                },
                '&:hover fieldset': {
                  borderColor: '#999',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2d5a5a',
                },
              },
            }}
          />

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!selectedOfferedSkill || !selectedWantedSkill || !message.trim()}
              sx={{
                bgcolor: '#2d5a5a',
                color: 'white',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': { 
                  bgcolor: '#1a4040' 
                },
                '&:disabled': {
                  bgcolor: '#ccc',
                  color: '#999',
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default SkillExchangeModal;