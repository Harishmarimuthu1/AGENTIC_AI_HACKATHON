'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Grid,
} from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const HeroSection = () => {
  const [showRed, setShowRed] = useState(true);
  const lastScrollTop = useRef(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      if (st > lastScrollTop.current) {
        setShowRed(false); // Scrolling down
      } else {
        setShowRed(true); // Scrolling up
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      
        {/* <Grid>
            <Box>
                <Typography>
                    I'm curious about
                </Typography>
                <Box >
                    <ArrowDropDownCircleIcon />
                <Typography>
                    Everything
                </Typography>
                </Box>
            </Box>
        </Grid> */}
      {/* Red Fixed Section at Bottom */}
      {/* <Fade in={showRed} timeout={500}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35vh',
            bgcolor: '#e6332d',
            // zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.6s ease-in-out',
          }}
        >
          <Container maxWidth={false} sx={{ maxWidth: '1200px' }}>
            <Box sx={{ color: 'white', px: { xs: 2, sm: 4 } }}>
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
      </Fade> */}
    </Box>
  );
};

export default HeroSection;
