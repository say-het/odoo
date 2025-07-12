'use client';

import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

const availabilityOptions = [
  'weekends',
  'evenings',
  'mornings',
  'weekdays',
];

export function AccountDetailsForm(): React.JSX.Element {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    location: '',
    profilePic: '',
    availability: [] as string[],
    isPublic: true,
    role: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: typeof value === 'string' ? value.split(',') : value });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(formData);
      }}
    >
      <Card>
        <CardHeader subheader="Edit your profile information" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Profile Picture URL"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  multiple
                  name="availability"
                  value={formData.availability}
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Availability" />}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                >
                  {availabilityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Make Profile Public</Typography>
              <Switch
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleSwitchChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Save Details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
