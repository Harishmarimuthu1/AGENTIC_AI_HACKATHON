'use client';

import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ContentGrid from './components/ContentGrid';
import Footer from './components/Footer';
import { Box, useTheme } from '@mui/material';

export default function Home() {
  const contentGridRef = useRef(null);
  const [showRedOverlay, setShowRedOverlay] = useState(false);
  const theme = useTheme();

  const handleScroll = () => {
    if (contentGridRef.current) {
      const { top } = contentGridRef.current.getBoundingClientRect();
      // Adjust this threshold based on when you want the red overlay to appear/disappear
      setShowRedOverlay(top <= window.innerHeight / 2); // Show red when content is halfway up the screen
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    contentGridRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ position: 'relative', overflowX: 'hidden' }}>
      <Header />
      {/* <HeroSection onScrollToContent={scrollToContent} /> */}

      {/* The Red Overlay Box */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: theme.palette.primary.main,
          zIndex: 100, // Make sure it's above other content initially
          transition: 'transform 0.8s ease-in-out',
          transform: showRedOverlay ? 'translateY(0%)' : 'translateY(-100%)', // Animate from top
          pointerEvents: 'none', // Allow clicks/interactions on elements below
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 101, // Content above the red overlay
          backgroundColor: theme.palette.background.default, // Ensure background is white
        }}
      >
        <ContentGrid innerRef={contentGridRef} />
      </Box>

      <Footer />
    </Box>
  );
}