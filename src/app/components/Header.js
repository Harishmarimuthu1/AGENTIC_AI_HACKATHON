'use client';

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import { Search, Add, Delete, CloudUpload, Close } from '@mui/icons-material';
import Image from "next/image";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [blogData, setBlogData] = useState({
    title: '',
    image: null,
    imagePreview: null,
    sections: [{ subtitle: '', content: '' }]
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateBlog = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setBlogData({
      title: '',
      image: null,
      imagePreview: null,
      sections: [{ subtitle: '', content: '' }]
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBlogData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = () => {
    setBlogData(prev => ({
      ...prev,
      sections: [...prev.sections, { subtitle: '', content: '' }]
    }));
  };

  const handleRemoveSection = (index) => {
    if (blogData.sections.length > 1) {
      setBlogData(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSectionChange = (index, field, value) => {
    setBlogData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleSubmit = () => {
    if (!blogData.title || !blogData.image || blogData.sections.some(s => !s.subtitle || !s.content)) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    const blogPost = {
      id: Date.now(),
      title: blogData.title,
      image: blogData.imagePreview,
      sections: blogData.sections,
      createdAt: new Date().toISOString(),
    };

    // Get existing blogs from localStorage
    const existingBlogs = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const updatedBlogs = [blogPost, ...existingBlogs];
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));

    setSnackbar({
      open: true,
      message: 'Blog post created successfully!',
      severity: 'success'
    });

    handleDialogClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#fdfdf7',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease-in-out',
          py: 1,
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            maxWidth: '1400px',
            mx: 'auto',
            width: '100%',
          }}
        >
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: "43%" }}>
            <Image src="/logo.png" alt="logo Image" width={150} height={70} />
          </Box>

          {/* Search and Menu Grid Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: "150px", border: "1px solid gray", borderRadius: "50px" }}>
              <TextField
                placeholder="SEARCH"
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    border: 'none',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    '&::placeholder': {
                      color: '#888',
                      opacity: 1,
                    },
                  },
                  display: { xs: 'none', sm: 'block' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ color: 'gray', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Four Dots Icon */}
            <IconButton
              onClick={handleMenuClick}
              sx={{
                color: '#1c150d',
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2px',
                  width: '30px',
                  height: '30px',
                  fontWeight: "600",
                }}
              >
                {[...Array(4)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: '10px',
                      height: '10px',
                      bgcolor: '#1c150d',
                      borderRadius: '50%',
                    }}
                  />
                ))}
              </Box>
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  minWidth: 160,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }
              }}
            >
              <MenuItem onClick={handleCreateBlog} sx={{ py: 1.5 }}>
                Create Blog
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                About
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                Contact
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Create Blog Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 2
        }}>
          <Typography variant="h5" fontWeight="600">
            Create New Blog Post
          </Typography>
          <IconButton onClick={handleDialogClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pb: 2 }}>
          <Grid container spacing={3} sx={{display:"flex"}}>
            <Box >
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Title"
                variant="outlined"
                value={blogData.title}
                onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))}
                sx={{ mb: 2 }}
              />
            </Grid>

           

            {/* Sections */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="500">
                  Content Sections
                </Typography>
                <Button
                  onClick={handleAddSection}
                  startIcon={<Add />}
                  variant="outlined"
                  size="small"
                >
                  Add Section
                </Button>
              </Box>

              {blogData.sections.map((section, index) => (
                <Card key={index} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={`Section ${index + 1}`} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      {blogData.sections.length > 1 && (
                        <IconButton
                          onClick={() => handleRemoveSection(index)}
                          size="small"
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                    
                    <TextField
                      fullWidth
                      label="Section Title"
                      variant="outlined"
                      value={section.subtitle}
                      onChange={(e) => handleSectionChange(index, 'subtitle', e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Section Content"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={section.content}
                      onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                    />
                  </CardContent>
                </Card>
              ))}
            </Grid>
            </Box>
            <Box>
             {/* Image Upload */}
          <Grid item xs={12}>
  <Box sx={{ mb: 4 }}>
    <Box
      component="label"
      sx={{
        border: '2px dashed #c4c4c4',
        borderRadius: 3,
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        transition: '0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          borderColor: '#1976d2',
          backgroundColor: '#f0f8ff',
        },
      }}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

      {blogData.imagePreview ? (
        <Box>
          <img
            src={blogData.imagePreview}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              borderRadius: '10px',
              objectFit: 'cover',
              marginBottom: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Click to change image
          </Typography>
        </Box>
      ) : (
        <Box>
          <CloudUpload sx={{ fontSize: 56, color: '#999', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            Click to upload image
          </Typography>
        </Box>
      )}
    </Box>
  </Box>
          </Grid>

            </Box>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleDialogClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" size="large">
            Publish Blog
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;