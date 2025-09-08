import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOriginalUrlAndRecordClick } from '../services/urlService';
import { sendLog } from '../services/loggingService';
import { Typography, Container } from '@mui/material';

export default function RedirectPage() {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const originalUrl = getOriginalUrlAndRecordClick(shortCode);

    if (originalUrl) {
      sendLog({ stack: 'frontend', level: 'info', package: 'RedirectPage', message: `Redirecting ${shortCode} to ${originalUrl}` });
      window.location.href = originalUrl.startsWith('http') ? originalUrl : `http://${originalUrl}`;
    } else {
      sendLog({ stack: 'frontend', level: 'warn', package: 'RedirectPage', message: `Shortcode not found: ${shortCode}` });
    
      setTimeout(() => navigate('/'), 3000);
    }
  }, [shortCode, navigate]);

  return (
    <Container>
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Redirecting... If you are not redirected, the link may be invalid.
      </Typography>
    </Container>
  );
}