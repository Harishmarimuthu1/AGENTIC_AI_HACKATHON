'use client';

import React from 'react';
import { Box } from '@mui/material';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* <Header /> */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;