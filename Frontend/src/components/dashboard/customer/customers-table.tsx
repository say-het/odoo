'use client';

import { useRouter } from 'next/navigation';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Box from '@mui/material/Box';
import SkillExchangeModal from './skillExchange';
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

import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

// Extended interface for freelancer data
interface Freelancer extends Customer {
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  maxRating: number;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

// Sample freelancer data
const freelancerData: Freelancer[] = [
  {
    id: '1',
    avatar: '/api/placeholder/40/40',
    name: 'het',
    email: 'demo@example.com',
    address: { city: 'New York', state: 'NY', country: 'USA', street: '123 Main St' },
    phone: '+1234567890',
    createdAt: new Date(),
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['React', 'Graphic designer'],
    rating: 3.0,
    maxRating: 5
  },
  {
    id: '2',
    avatar: '/api/placeholder/40/40',
    name: 'marc',
    email: 'michell@example.com',
    address: { city: 'Los Angeles', state: 'CA', country: 'USA', street: '456 Oak Ave' },
    phone: '+1234567891',
    createdAt: new Date(),
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['React', 'Graphic designer'],
    rating: 2.5,
    maxRating: 5
  },
  {
    id: '3',
    avatar: '/api/placeholder/40/40',
    name: 'Joe',
    email: 'joe@example.com',
    address: { city: 'Chicago', state: 'IL', country: 'USA', street: '789 Pine Rd' },
    phone: '+1234567892',
    createdAt: new Date(),
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['React', 'Graphic designer'],
    rating: 4.0,
    maxRating: 5
  }
];

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
 const [modalOpen, setModalOpen] = useState(false);
const router = useRouter();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;
return (
  <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: { xs: 1, sm: 2, md: 3 } }}>
    {/* Header */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        mb: 3
      }}
    >
      <FormControl fullWidth sx={{ minWidth: 120 }}>
        <InputLabel sx={{ color: 'black' }}>Availability</InputLabel>
        <Select
          value=""
          label="Availability"
          sx={{
            color: 'black',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' },
            '& .MuiSvgIcon-root': { color: 'black' }
          }}
        >
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="busy">Busy</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'black',
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: 'gray' },
              '&.Mui-focused fieldset': { borderColor: 'gray' }
            },
            '& .MuiInputBase-input::placeholder': { color: 'rgba(0,0,0,0.6)' }
          }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: '#2d5a5a',
            color: 'white',
            whiteSpace: 'nowrap',
            '&:hover': { bgcolor: '#1a4040' }
          }}
        >
          search
        </Button>
      </Box>
    </Box>

    {/* Freelancer Cards */}
    <Stack spacing={2}>
      {freelancerData.map((freelancer) => (
        <Card
          key={freelancer.id}
          sx={{
            bgcolor: 'white',
            border: '1px solid #ddd',
            borderRadius: 3,
            p: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2
            }}
          >
            {/* Left side */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  border: '2px solid white'
                }}
                src={freelancer.avatar}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'black',
                    mb: 1,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': { color: '#1976d2' }
                  }}
                  onClick={() =>
                    router.push(
                      `/dashboard/profile/${freelancer.name.toLowerCase().replace(/\s+/g, '')}`
                    )
                  }
                >
                  {freelancer.name}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#4ade80', whiteSpace: 'nowrap' }}>
                    Skills Offered →
                  </Typography>
                  {freelancer.skillsOffered.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: 'transparent',
                        color: 'black',
                        border: '1px solid #ccc',
                        borderRadius: 2
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: '#60a5fa', whiteSpace: 'nowrap' }}>
                    Skill wanted →
                  </Typography>
                  {freelancer.skillsWanted.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      sx={{
                        bgcolor: 'transparent',
                        color: 'black',
                        border: '1px solid #ccc',
                        borderRadius: 2
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Right side */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                  bgcolor: '#2d5a5a',
                  color: 'white',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': { bgcolor: '#1a4040' }
                }}
              >
                Request
              </Button>
              <SkillExchangeModal
                open={modalOpen}
                onClose={handleCloseModal}
                offeredSkills={['JavaScript', 'React', 'Node.js', 'Python', 'Design']}
                wantedSkills={['Machine Learning', 'DevOps', 'Mobile Development', 'Data Science', 'UI/UX']}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  rating
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  {freelancer.rating}/{freelancer.maxRating}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </Stack>

    {/* Pagination */}
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
        <Button sx={{ color: 'black', minWidth: 'auto' }}>{'<'}</Button>
        {[1, 2, 3, 4, 5].map((num) => (
          <Button
            key={num}
            sx={{
              color: num === 2 ? '#4ade80' : 'black',
              minWidth: 'auto',
              textDecoration: num === 2 ? 'underline' : 'none'
            }}
          >
            {num}
          </Button>
        ))}
        <Button sx={{ color: 'black', minWidth: 'auto' }}>{'>'}</Button>
      </Box>
    </Box>
  </Box>
);

}