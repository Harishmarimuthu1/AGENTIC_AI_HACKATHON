'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LinkedIn,
  Instagram,
  Twitter,
  Facebook,
} from '@mui/icons-material';
import Image from "next/image";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const footerLinks = {
    About: [
      'Our Space',
      'Stories',
      'News'
    ],
    Study: [
      'Undergraduate Degree',
      'Graduate Degree',
      'University-Wide Electives'
    ],
    Innovate: [
      'Professional Education',
      'Shop',
      'Tools'
    ],
    Connect: [
      'Directory',
      'Events',
      'Support'
    ],
    QuickLinks :[
    'Get In Touch',
    'Directory',
    'Elective Courses',
    'FAQ'
  ]
  };

  

  return (
  <Box
  component="footer"
  sx={{
    backgroundImage: 'url("/footer.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    bgcolor: '#1a1a1a',
    color: 'white',
    position: 'relative',
 height:"700px"
  }}
>
  <Container maxWidth="xl">
    <Grid container spacing={6} sx={{mt:10}}>

      {/* Left Side - Footer Links */}
      <Grid item xs={12} md={8} sx={{mt:30,width:"60%"}}>
        <Grid container spacing={3} sx={{ml:"50px"}}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid item xs={6} sm={3} key={category} sx={{ml:"30px"}}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {category}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href="#"
                    sx={{
                      color: '#ccc',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      '&:hover': { color: '#e6332d' },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Logo image bottom-left */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ mt: 8 }}>
              <Image src="/d.png" alt="Logo" width={100} height={100} />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Side - Newsletter Section */}
      <Grid item xs={12} md={4} sx={{mt:30}}>
        <Box sx={{ borderLeft: '2px solid #e6332d', pl: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontStyle: 'italic',
              fontSize: '1rem',
              color: '#ccc',
              mb: 1,
            }}
          >
            Updates from the d.school
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.2rem',
              mb: 2,
            }}
          >
            Want to learn more & get involved?{' '}
            <Box component="span" sx={{ color: '#fff', fontWeight: 700, }}>
              Subscribe
            </Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.95rem', color: '#ccc', mb: 2 }}
          >
            to our email newsletter for (kinda) regular updates.
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '25px',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              mt:10,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            Subscribe
          </Button>

          {/* Exclamation mark image */}
          <Box sx={{ mt: -16, ml: 30 }}>
            <Image src="/appostraphy.png" alt="!" width={90} height={150} />
          </Box>
        </Box>
      </Grid>
    </Grid>

    {/* Footer Bottom Section */}
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        mt: 6,
        pt: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="body2"
          sx={{ color: '#888', fontSize: '0.85rem' }}
        >
          © 2025 Hasso Plattner Institute of Design at Stanford University.
          All Rights Reserved.
        </Typography>
        <Link
          href="#"
          sx={{
            color: '#888',
            textDecoration: 'underline',
            fontSize: '0.85rem',
            '&:hover': { color: '#e6332d' },
          }}
        >
          Privacy Policy
        </Link>
      </Box>

      {/* Social Media */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {['LinkedIn', 'Instagram', 'X', 'Facebook', 'Medium'].map((platform) => (
          <Link
            key={platform}
            href="#"
            sx={{
              color: '#888',
              textDecoration: 'underline',
              fontSize: '0.9rem',
              '&:hover': { color: '#e6332d' },
            }}
          >
            {platform}
          </Link>
        ))}
      </Box>
    </Box>
  </Container>
</Box>

  );
};

export default Footer;