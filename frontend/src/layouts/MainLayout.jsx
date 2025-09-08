import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export default function MainLayout() {
  return (
    <>
      <AppBar position="static"
      sx={{
        marginLeft:'200px'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/stats">Stats</Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
            marginLeft:'200px',
          display: 'flex',
          justifyContent: 'center', // Horizontally centers the content
          alignItems: 'flex-start', // Aligns content to the top
          py: 4, // Adds padding on top and bottom
          width: '100%', // Ensures the box takes full width
        }}
      >
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}