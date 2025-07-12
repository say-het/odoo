'use client';

import { Avatar, Box, Button, Typography } from '@mui/material';
import { notFound } from 'next/navigation';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

// Dummy profile data
const mockData = {
  het: {
    name: "Het Modi",
    skillsOffered: ["React", "DSA", "Blockchain"],
    skillsWanted: ["UI/UX", "Marketing"],
    rating: 4.8,
    feedback: "Very consistent and skilled developer.",
    profilePhoto: "/avatar/het.png",
  },
  marc: {
    name: "Marc Demo",
    skillsOffered: ["Photoshop", "Design"],
    skillsWanted: ["JavaScript", "Backend"],
    rating: 4.2,
    feedback: "Creative designer with a good eye for detail.",
    profilePhoto: "/avatar/marc.png",
  },
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const profile = mockData[params.username as keyof typeof mockData];
  if (!profile) return notFound();

  return (
    <Box sx={{ bgcolor: '#fdfdfd', color: '#111', minHeight: '100vh', p: 3 }}>
      {/* Top Navigation */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={1}
        borderColor="#ccc"
        pb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Skill Swap Platform
        </Typography>
        <Box display="flex" gap={3} alignItems="center">
          <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
            Swap request
          </Typography>
          <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
            Home
          </Typography>
          <Avatar src={profile.profilePhoto} />
        </Box>
      </Box>

      {/* Profile Section */}
      <Box
        border={1}
        borderColor="#ccc"
        borderRadius={3}
        p={4}
        mt={4}
        maxWidth="900px"
        mx="auto"
        position="relative"
        bgcolor="#fff"
      >
        <Button
          variant="outlined"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            borderColor: '#1976d2',
            color: '#fff',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Request
        </Button>

        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mt={6}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {profile.name}
            </Typography>
            <Typography gutterBottom>
              <strong>Skills Offered:</strong> {profile.skillsOffered.join(', ')}
            </Typography>
            <Typography gutterBottom>
              <strong>Skills Wanted:</strong> {profile.skillsWanted.join(', ')}
            </Typography>
            <Box mt={4}>
              <Typography>
                <strong>Rating & Feedback:</strong>
              </Typography>
              <Typography>
                {profile.rating} ⭐ — {profile.feedback}
              </Typography>
            </Box>
          </Box>

          <Avatar
            src={profile.profilePhoto}
            sx={{
              width: 120,
              height: 120,
              border: '2px solid #1976d2',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
