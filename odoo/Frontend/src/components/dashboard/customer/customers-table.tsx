'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';
import SkillExchangeModal from './skillExchange';
import { useSelection } from '@/hooks/use-selection';
import axios from 'axios';

interface Freelancer {
  _id: string;
  name: string;
  location: string;
  profilePic: string;
  availability: string;
  isPublic: boolean;
  isBanned: boolean;
  rating: number;
  totalResolved: number;
  skills: {
    offered: { name: string }[];
    wanted: { name: string }[];
  };
}

export function CustomersTable(): React.JSX.Element {
  const router = useRouter();
  const [freelancerData, setFreelancerData] = useState<Freelancer[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/users/all'); // Replace with actual route
        if (res.data.success) {
          setFreelancerData(res.data.users);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: 'black' }}>Availability</InputLabel>
          <Select
            value=""
            label="Availability"
            sx={{
              color: 'black',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' },
              '& .MuiSvgIcon-root': { color: 'black' },
            }}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="busy">Busy</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'black',
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: 'gray' },
                '&.Mui-focused fieldset': { borderColor: 'gray' },
              },
              '& .MuiInputBase-input::placeholder': { color: 'rgba(0,0,0,0.6)' },
            }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: '#2d5a5a', color: 'white', '&:hover': { bgcolor: '#1a4040' } }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Freelancer Cards */}
      <Stack spacing={2}>
        {freelancerData.map((freelancer) => (
          <Card
            key={freelancer._id}
            sx={{
              bgcolor: 'white',
              border: '1px solid #ddd',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{ width: 80, height: 80, border: '2px solid white' }}
                  src={freelancer.profilePic}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'black',
                      mb: 1,
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      '&:hover': { color: '#1976d2' },
                    }}
                    onClick={() =>
                      router.push(
                        `/dashboard/profile/${freelancer._id.toLowerCase().replace(/\s+/g, '')}`
                      )
                    }
                  >
                    {freelancer.name}
                  </Typography>

                  {/* Skills Offered */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#4ade80' }}>
                      Skills Offered →
                    </Typography>
                    {freelancer.skills.offered.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill.name}
                        size="small"
                        sx={{
                          bgcolor: 'transparent',
                          color: 'black',
                          border: '1px solid #ccc',
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  </Box>

                  {/* Skills Wanted */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: '#60a5fa' }}>
                      Skills Wanted →
                    </Typography>
                    {freelancer.skills.wanted.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill.name}
                        size="small"
                        sx={{
                          bgcolor: 'transparent',
                          color: 'black',
                          border: '1px solid #ccc',
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleOpenModal}
                  sx={{
                    bgcolor: '#2d5a5a',
                    color: 'white',
                    borderRadius: 2,
                    px: 3,
                    '&:hover': { bgcolor: '#1a4040' },
                  }}
                >
                  Request
                </Button>

                <SkillExchangeModal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  offeredSkills={['JavaScript', 'React']}
                  wantedSkills={['ML', 'UI/UX']}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    Rating
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {freelancer.rating}/5
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
