'use client';

import {
  Avatar,
  Box,
  Typography,
  Container,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function MyProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [offeredInput, setOfferedInput] = useState('');
  const [wantedInput, setWantedInput] = useState('');

  const fetchUserData = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/users/getuser/${userId}`);
      const result = await res.json();
      setUser(result.data);
    } catch (err) {
      console.error('Error loading user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchUserData(userId);
  }, []);

  const handleAddSkill = async (type: 'offered' | 'wanted') => {
    const name = type === 'offered' ? offeredInput.trim() : wantedInput.trim();
    if (!name) return;

    try {
      const token = localStorage.getItem('token'); // if needed

      const res = await fetch('http://localhost:5000/api/v1/skills/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Uncomment below if your route uses auth
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          skills: [{ name, description: '' }],
        }),
      });

      const result = await res.json();
      if (result.success) {
        setOfferedInput('');
        setWantedInput('');
        const userId = localStorage.getItem('userId');
        if (userId) fetchUserData(userId); // reload updated user data
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error('Failed to add skill:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography mt={4} textAlign="center" color="error">
        Failed to load profile.
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        gap={3}
        textAlign={{ xs: 'center', sm: 'left' }}
      >
        <Avatar
          src={user.profilePic}
          sx={{ width: 100, height: 100, mx: { xs: 'auto', sm: 0 } }}
        />
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {user.location || 'No location'}
          </Typography>
          <Typography variant="body2">Role: {user.role}</Typography>
          <Typography variant="body2">Availability: {user.availability || 'N/A'}</Typography>
          <Typography variant="body2">Public Profile: {user.isPublic ? 'Yes' : 'No'}</Typography>
          <Typography variant="body2">Banned: {user.isBanned ? 'Yes' : 'No'}</Typography>
          <Typography variant="body2">Rating: {user.rating || 0}</Typography>
          <Typography variant="body2">Total Resolved: {user.totalResolved || 0}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle1" gutterBottom>
        🛠️ Skills I'm Offering
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
        {user.skills.offered.length > 0 ? (
          user.skills.offered.map((skill: any, i: number) => (
            <Chip key={i} label={skill.name} color="success" />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No offered skills</Typography>
        )}
      </Stack>

      <Stack direction="row" spacing={1} mb={3}>
        <TextField
          label="New Offered Skill"
          size="small"
          fullWidth
          value={offeredInput}
          onChange={(e) => setOfferedInput(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleAddSkill('offered')}>
          Add
        </Button>
      </Stack>

      <Typography variant="subtitle1" gutterBottom>
        🎯 Skills I Want
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
        {user.skills.wanted.length > 0 ? (
          user.skills.wanted.map((skill: any, i: number) => (
            <Chip key={i} label={skill.name} color="primary" />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No wanted skills</Typography>
        )}
      </Stack>

      <Stack direction="row" spacing={1}>
        <TextField
          label="New Wanted Skill"
          size="small"
          fullWidth
          value={wantedInput}
          onChange={(e) => setWantedInput(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleAddSkill('wanted')}>
          Add
        </Button>
      </Stack>
    </Container>
  );
}
