import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  AppBar,
  Toolbar,
  Container,
  Paper,
  Chip,
  Rating,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SkillExchangeModal from './skillExchange'; // Your existing modal component
// import skillex

interface FreelancerProfileProps {
  freelancerId?: string;
}

interface FreelancerData {
  id: string;
  name: string;
  profilePhoto?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  reviews: Review[];
}

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

const FreelancerProfile: React.FC<FreelancerProfileProps> = ({ freelancerId }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock data - replace with actual data fetching
  const freelancerData: FreelancerData = {
    id: freelancerId || '1',
    name: 'Marc Demo',
    profilePhoto: '', // Add actual photo URL here
    skillsOffered: ['JavaScript', 'React', 'Node.js', 'UI/UX Design'],
    skillsWanted: ['Python', 'Machine Learning', 'DevOps', 'Data Science'],
    rating: 4.5,
    reviews: [
      {
        id: '1',
        reviewerName: 'John Smith',
        rating: 5,
        comment: 'Excellent collaboration on React project. Very knowledgeable and helpful.',
        date: '2025-01-10'
      },
      {
        id: '2',
        reviewerName: 'Sarah Johnson',
        rating: 4,
        comment: 'Great experience learning JavaScript. Patient and clear explanations.',
        date: '2025-01-08'
      }
    ]
  };

  const handleRequestClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to home page
  };

  const handleSwapRequestClick = () => {
    navigate('/swap-requests'); // Navigate to swap requests page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#2a2a2a',
        color: 'white',
      }}
    >
      {/* Header */}
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#2a2a2a',
          borderBottom: '2px solid #444',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'white',
              fontWeight: 500
            }}
          >
            Skill Swap Platform
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button
              onClick={handleSwapRequestClick}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': { backgroundColor: '#444' }
              }}
            >
              Swap request
            </Button>
            
            <Button
              onClick={handleHomeClick}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': { backgroundColor: '#444' }
              }}
            >
              Home
            </Button>
            
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#8B4513'
              }}
            >
              👤
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Main Profile Card */}
        <Paper
          sx={{
            backgroundColor: '#2a2a2a',
            border: '2px solid #666',
            borderRadius: 3,
            p: 4,
            color: 'white'
          }}
        >
          {/* Header with Request Button and Name */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
            <Box>
              <Button
                variant="outlined"
                onClick={handleRequestClick}
                sx={{
                  color: 'white',
                  borderColor: '#666',
                  borderRadius: 2,
                  mb: 3,
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#888',
                    backgroundColor: '#444'
                  }
                }}
              >
                Request
              </Button>
              
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 400,
                  mb: 4
                }}
              >
                {freelancerData.name}
              </Typography>
            </Box>

            {/* Profile Photo */}
            <Box
              sx={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '3px solid #666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#333',
                ml: 4
              }}
            >
              {freelancerData.profilePhoto ? (
                <Avatar
                  src={freelancerData.profilePhoto}
                  sx={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Typography variant="h6" sx={{ color: '#888' }}>
                  Profile Photo
                </Typography>
              )}
            </Box>
          </Box>

          {/* Skills Offered */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 400,
                mb: 2
              }}
            >
              Skills Offered
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {freelancerData.skillsOffered.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    backgroundColor: '#444',
                    color: 'white',
                    border: '1px solid #666',
                    '&:hover': { backgroundColor: '#555' }
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Skills Wanted */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 400,
                mb: 2
              }}
            >
              Skills wanted
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {freelancerData.skillsWanted.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    backgroundColor: '#444',
                    color: 'white',
                    border: '1px solid #666',
                    '&:hover': { backgroundColor: '#555' }
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Rating and Feedback Section */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 400,
                mb: 3,
                textAlign: 'center'
              }}
            >
              Rating and Feedback
            </Typography>

            {/* Overall Rating */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Rating
                value={freelancerData.rating}
                readOnly
                size="large"
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#ffc107',
                  },
                  '& .MuiRating-iconEmpty': {
                    color: '#666',
                  },
                }}
              />
              <Typography variant="h6" sx={{ color: 'white', mt: 1 }}>
                {freelancerData.rating} out of 5 stars
              </Typography>
            </Box>

            {/* Reviews */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {freelancerData.reviews.map((review) => (
                <Card
                  key={review.id}
                  sx={{
                    backgroundColor: '#333',
                    border: '1px solid #555'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        {review.reviewerName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#aaa' }}>
                        {review.date}
                      </Typography>
                    </Box>
                    <Rating
                      value={review.rating}
                      readOnly
                      size="small"
                      sx={{
                        mb: 1,
                        '& .MuiRating-iconFilled': {
                          color: '#ffc107',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: '#666',
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#ddd' }}>
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Skill Exchange Modal */}
      <SkillExchangeModal
        open={modalOpen}
        onClose={handleCloseModal}
        offeredSkills={freelancerData.skillsWanted} // What they want is what we can offer
        wantedSkills={freelancerData.skillsOffered} // What they offer is what we want
      />
    </Box>
  );
};

export default FreelancerProfile;