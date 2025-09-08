import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Paper, Link } from '@mui/material';
import { createShortUrl } from '../services/urlService';
import { sendLog } from '../services/loggingService';

export default function HomePage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customShortcode, setCustomShortcode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    if (!originalUrl) {
      setError('Original URL is required.');
      return;
    }

    try {
      const newUrl = createShortUrl({ originalUrl, customShortcode });
      setSuccess(newUrl);
      sendLog({ stack: 'frontend', level: 'info', package: 'HomePage', message: `URL shortened: ${newUrl.shortUrl}` });
      setOriginalUrl('');
      setCustomShortcode('');
    } catch (err) {
      setError(err.message);
      sendLog({ stack: 'frontend', level: 'error', package: 'HomePage', message: err.message });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Create a Short URL
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Optional Custom Shortcode"
          value={customShortcode}
          onChange={(e) => setCustomShortcode(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Shorten URL
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">
            Success! Your short URL is: <Link href={success.shortUrl} target="_blank">{success.shortUrl}</Link>
          </Alert>
        )}
      </Box>
    </Paper>
  );
}