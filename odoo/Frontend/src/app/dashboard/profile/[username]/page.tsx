'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface UserProfile {
  _id: string;
  name: string;
  location: string;
  profilePic: string;
  availability: string[];
  isPublic: boolean;
  isBanned: boolean;
  skills: {
    offered: { name: string; description: string }[];
    wanted: { name: string; description: string }[];
  };
}

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:5000/api/v1/users/getuser/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        setProfile(data.data);
      })
      .catch((err) => {
        console.error(err);
        setProfile(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  const handleRequestClick = () => {
    // Simulate or make an API call here
    
    // Show success message
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) return notFound();

  return (
    <Box sx={{ bgcolor: '#fdfdfd', color: '#111', minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
      {/* Top Navigation */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={1}
        borderColor="#ccc"
        pb={2}
        flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
        gap={{ xs: 2, sm: 0 }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Skill Swap Platform
        </Typography>
        <Box display="flex" gap={{ xs: 2, sm: 3 }} alignItems="center" flexWrap="wrap">
          <Typography sx={{ 
            textDecoration: 'underline', 
            cursor: 'pointer',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}>
            Swap request
          </Typography>
          <Typography sx={{ 
            textDecoration: 'underline', 
            cursor: 'pointer',
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}>
            Home
          </Typography>
          <Avatar src={profile.profilePic} sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } }} />
        </Box>
      </Box>

      {/* Profile Section */}
      <Box
        border={1}
        borderColor="#ccc"
        borderRadius={3}
        p={{ xs: 2, sm: 3, md: 4 }}
        mt={4}
        maxWidth="900px"
        mx="auto"
        position="relative"
        bgcolor="#fff"
      >
        <Button
          variant="outlined"
          onClick={handleRequestClick}
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 16 },
            left: { xs: 8, sm: 16 },
            borderColor: '#1976d2',
            color: '#fff',
            backgroundColor: '#1976d2',
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            padding: { xs: '6px 12px', sm: '8px 16px' },
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Request
        </Button>

        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="flex-start" 
          mt={{ xs: 5, sm: 6 }}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 3, sm: 0 }}
        >
          <Box flex={1}>
            <Typography 
              variant="h4" 
              gutterBottom 
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.8rem', sm: '2rem', md: '2.125rem' } }}
            >
              {profile.name}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              <strong>Location:</strong> {profile.location || 'N/A'}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              <strong>Skills Offered:</strong>{' '}
              {profile.skills.offered.map((s) => s.name).join(', ') || 'N/A'}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              <strong>Skills Wanted:</strong>{' '}
              {profile.skills.wanted.map((s) => s.name).join(', ') || 'N/A'}
            </Typography>
          </Box>

          <Avatar
            src={profile.profilePic}
            sx={{
              width: { xs: 80, sm: 100, md: 120 },
              height: { xs: 80, sm: 100, md: 120 },
              border: '2px solid #1976d2',
              alignSelf: { xs: 'center', sm: 'flex-start' },
            }}
          />
        </Box>
      </Box>

      {/* Success Modal */}
      <Dialog
        open={showSuccess}
        onClose={handleCloseSuccess}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
            Success!
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseSuccess}
            sx={{
              color: '#666',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>
            Your request has been initiated successfully!
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            The user will be notified about your skill swap request.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseSuccess}
            variant="contained"
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#45a049',
              },
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}