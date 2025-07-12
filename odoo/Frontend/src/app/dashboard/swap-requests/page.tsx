'use client';

import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SwapRequestsPage() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
const [swapRequests, setSwapRequests] = useState([]);

useEffect(() => {
  const fetchRequests = async () => {
    try {
      let userId = localStorage.getItem('userId');
      const res = await axios.get(`http://localhost:5000/api/v1/req/received/${userId}`);
      if (res.data.success) {
        const transformed = res.data.requests.map((req) => ({
          id: req._id,
          name: req.fromUser.name,
          photo: req.fromUser.profilePic,
          rating: req.fromUser.rating || 3.5,
          skillsOffered: req.skillsOffered.map((s) => s.name),
          skillsWanted: req.skillsRequested.map((s) => s.name),
          status: req.status || 'Pending',
        }));
        setSwapRequests(transformed);
      }
    } catch (err) {
      console.error('Failed to load swap requests', err);
    }
  };

  fetchRequests();
}, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredData = swapRequests.filter((req) => {
    const matchesStatus =
      filterStatus === 'All' || req.status === filterStatus;
    const matchesSearch = req.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
      {/* Top nav */}
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems={isMobile ? 'flex-start' : 'center'}
        borderBottom="1px solid #ccc"
        pb={2}
        gap={1}
      >
        <Typography variant="h5" fontWeight="bold">
          Skill Swap Platform
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Typography
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: isMobile ? '0.9rem' : '1rem',
            }}
          >
            Home
          </Typography>
          <Avatar src="/avatar/marc.png" />
        </Box>
      </Box>

      {/* Filter + Search */}
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={2}
        alignItems={isMobile ? 'stretch' : 'center'}
        my={3}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        <TextField
          placeholder="Search by name"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth={isMobile}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: '#2d5a5a',
            color: 'white',
            '&:hover': { bgcolor: '#1a4040' },
            width: isMobile ? '100%' : 'auto',
          }}
        >
          Search
        </Button>
      </Box>

      {/* Request Cards */}
      <Box display="flex" flexDirection="column" gap={3}>
        {filteredData.map((req) => (
          <Box
            key={req.id}
            p={3}
            bgcolor="#fff"
            borderRadius={3}
            border="1px solid #ccc"
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems={isMobile ? 'flex-start' : 'center'}
            gap={2}
          >
            {/* Left Section: Profile + Skills */}
            <Box display="flex" gap={2} flexDirection="row" flexWrap="wrap">
              <Avatar src={req.photo} sx={{ width: 80, height: 80 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {req.name}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Skills Offered →
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
                  {req.skillsOffered.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="body2">Skills Wanted →</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {req.skillsWanted.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="body2" mt={1}>
                  Rating: {req.rating}/5
                </Typography>
              </Box>
            </Box>

            {/* Right Section: Status + Buttons */}
            <Box textAlign={isMobile ? 'left' : 'right'} width="100%">
              <Typography fontWeight="bold">
                Status:{' '}
                <span
                  style={{
                    color:
                      req.status === 'Pending'
                        ? '#888'
                        : req.status === 'Accepted'
                        ? 'green'
                        : 'red',
                  }}
                >
                  {req.status}
                </span>
              </Typography>
              {req.status === 'Pending' && (
                <Box
                  mt={1}
                  display="flex"
                  gap={1}
                  justifyContent={isMobile ? 'flex-start' : 'flex-end'}
                >
                  <Button size="small" sx={{ color: 'green' }}>
                    Accept
                  </Button>
                  <Button size="small" sx={{ color: 'red' }}>
                    Reject
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      <Box
        mt={5}
        display="flex"
        justifyContent="center"
        gap={1}
        flexWrap="wrap"
      >
        <Button>{'<'}</Button>
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            sx={{
              textDecoration: page === 1 ? 'underline' : 'none',
              color: page === 1 ? '#2d5a5a' : 'black',
            }}
          >
            {page}
          </Button>
        ))}
        <Button>{'>'}</Button>
      </Box>
    </Box>
  );
}
