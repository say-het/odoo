'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const dummyUsers = [
  { id: '1', name: 'Alice Doe', email: 'alice@example.com', isBanned: false },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', isBanned: true },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', isBanned: false },
];

export default function AdminDashboard(): React.JSX.Element {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBan = (id: string) => {
    console.log('Ban user:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete user:', id);
  };

  const handleView = (id: string) => {
    console.log('View profile of:', id);
  };

  const handleSendMessage = () => {
    console.log('Platform-wide message:', message);
    setMessage('');
    setOpenMessageModal(false);
  };

  return (
    <Box p={2} bgcolor="#f5f6f9" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="User Management" subheader="Ban or delete users" />
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => setOpenUserModal(true)}>
                View Users
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Send Announcement" subheader="Notify all users" />
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => setOpenMessageModal(true)}>
                Send Message
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* User Management Modal */}
      <Dialog
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Manage Users
          <IconButton
            aria-label="close"
            onClick={() => setOpenUserModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isBanned ? 'Banned' : 'Active'}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleView(user.id)}
                    >
                      View
                    </Button>{' '}
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => handleBan(user.id)}
                    >
                      {user.isBanned ? 'Unban' : 'Ban'}
                    </Button>{' '}
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenUserModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Send Message Modal */}
      <Dialog
        open={openMessageModal}
        onClose={() => setOpenMessageModal(false)}
        fullScreen={fullScreen}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Send Platform-wide Message
          <IconButton
            aria-label="close"
            onClick={() => setOpenMessageModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Message"
            placeholder="Type your announcement or alert here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenMessageModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSendMessage} disabled={!message.trim()}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
