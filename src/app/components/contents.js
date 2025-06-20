'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  IconButton,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const HeroSection = () => {
  const [showRed, setShowRed] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Hide red section when scrolled past 50% of viewport height
      setShowRed(scrollPosition < windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
 <Box>
    
<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '50vh',
        bgcolor: '#f9f9f2', // light cream background matching image
      }}
    >
      {/* Subtitle */}
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: '1.2rem',
          color: '#1a1a1a',
          mb: 1,
        }}
      >
        I'm curious about...
      </Typography>

      {/* Icon + Title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: '#e6332d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowDropDownIcon sx={{ color: 'white', fontSize: 30 }} />
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Georgia, serif', // Classic serif to match design
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#e6332d',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          Everything
        </Typography>
      </Box>
    </Box>
      {/* Red Background Section */}
      <Fade in={showRed} timeout={500}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40vh',
            bgcolor: '#e6332d',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            transform: showRed ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.6s ease-in-out',
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: '1200px' }}>
            <Box sx={{ color: 'white', pl: { xs: 2, sm: 4 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                About the d.school
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  lineHeight: 1.5,
                  maxWidth: '600px',
                  fontWeight: 400,
                }}
              >
                We are a creative place at Stanford where people discover & build new possibilities.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Fade>
    </Box>
  );
};

export default HeroSection;