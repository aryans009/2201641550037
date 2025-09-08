import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Link,
  Button,
  Box
} from '@mui/material';

export default function StatsPage() {
  // Use a standard state to hold the URL data
  const [urls, setUrls] = useState([]);

  // Function to load (or reload) data from localStorage
  const loadUrls = () => {
    try {
      const storedUrls = localStorage.getItem('shortenedUrls');
      // If data exists, parse it; otherwise, start with an empty array
      setUrls(storedUrls ? JSON.parse(storedUrls) : []);
    } catch (error) {
      console.error("Failed to parse URLs from localStorage", error);
      setUrls([]); // Reset to empty on error
    }
  };
  
  // Load the URLs from storage when the page first loads
  useEffect(() => {
    loadUrls();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h1">
          URL Statistics
        </Typography>
        <Button variant="outlined" onClick={loadUrls}>Refresh</Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Expires At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No URLs shortened yet.</TableCell>
              </TableRow>
            ) : (
              urls.map((url) => (
                <TableRow key={url.id}>
                  <TableCell>
                    <Link href={url.shortUrl} target="_blank">{url.shortUrl}</Link>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {url.originalUrl}
                  </TableCell>
                  <TableCell>{url.clicks}</TableCell>
                  <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}