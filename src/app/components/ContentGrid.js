'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fade,
  Skeleton
} from '@mui/material';
import { 
  MoreVert, 
  Edit, 
  Delete, 
  CalendarToday, 
  Visibility 
} from '@mui/icons-material';
import Image from 'next/image';

const defaultImages = [
  '/d1.png',
  '/d2.png',
  '/d3.png',
  '/d4.png',
];

const ContentGrid = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load blog posts from localStorage
    const loadBlogPosts = () => {
      try {
        const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        setBlogPosts(storedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();

    // Listen for storage changes (when new blogs are added)
    const handleStorageChange = () => {
      loadBlogPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('blogUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('blogUpdated', handleStorageChange);
    };
  }, []);

  const handleMouseEnter = useCallback((index) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const handleClick = useCallback((post, index) => {
    // Navigate to detail page with proper slug
    if (post.id) {
      // For user-created blog posts, use their ID
      router.push(`/detail/${post.id}`);
    } else if (post.isDefault) {
      // For default posts, use default-index format
      router.push(`/detail/default-${index - blogPosts.length}`);
    } else {
      // Fallback for other cases
      router.push(`/detail/${index}`);
    }
  }, [router, blogPosts.length]);

  const handleMenuClick = (event, post) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedPost(null);
  };

  const handleEdit = () => {
    if (selectedPost && selectedPost.id) {
      // Navigate to edit page if you have one
      router.push(`/blog/edit/${selectedPost.id}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialog(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedPost) {
      const updatedPosts = blogPosts.filter(post => post.id !== selectedPost.id);
      setBlogPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event('blogUpdated'));
    }
    setDeleteDialog(false);
    setSelectedPost(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Combine blog posts with default images for demo
  const allContent = [
    ...blogPosts,
    ...defaultImages.map((img, index) => ({
      id: `default-${index}`,
      isDefault: true,
      image: img,
      title: `Sample Post ${index + 1}`,
      sections: [{ subtitle: 'Sample Content', content: 'This is sample content for demonstration.' }]
    }))
  ];

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#f8f9fa', width: '100%', px: 4, py: 4, mt: 0 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {[...Array(8)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <Skeleton variant="rectangular" height={250} />
                  <CardContent>
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={20} width="80%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', width: '100%', px: 4, py: 4, mt: 0 }}>
      <Container maxWidth="xl">
        {blogPosts.length > 0 && (
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              fontWeight: 700,
              color: '#1a1a1a',
              textAlign: 'center'
            }}
          >
            Latest Blog Posts
          </Typography>
        )}
        
        <Grid container spacing={3}>
          {allContent.map((item, index) => (
            <Grid
              key={item.id || index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Fade in timeout={300 + index * 100}>
                <Card
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(item, index)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoverIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoverIndex === index
                      ? '0 20px 40px rgba(0,0,0,0.15)'
                      : '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #f0f0f0',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    width:"320px",
                    height:"350px"
                  }}
                >
                  {/* Action Menu for Blog Posts */}
                  {!item.isDefault && (
                    <IconButton
                      onClick={(e) => handleMenuClick(e, item)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,1)',
                        }
                      }}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>
                  )}

                  {/* View Icon on Hover */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 3,
                      opacity: hoverIndex === index ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      p: 1
                    }}
                  >
                    <Visibility sx={{ fontSize: 24, color: 'primary.main' }} />
                  </Box>

                  {/* Image */}
                  <Box sx={{ position: 'relative', paddingTop: '60%', overflow: 'hidden' }}>
                    {item.isDefault ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          transform: hoverIndex === index ? 'scale(1.05)' : 'scale(1)'
                        }}
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          transform: hoverIndex === index ? 'scale(1.05)' : 'scale(1)'
                        }}
                      />
                    )}
                    
                    {/* Overlay on hover */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        opacity: hoverIndex === index ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 600,
                        color: '#1a1a1a',
                        lineHeight: 1.3,
                        mb: 2
                      }}
                    >
                      {item.title}
                    </Typography>

                    {/* {item.sections && item.sections[0] && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mb: 2,
                          lineHeight: 1.5,
                          flexGrow: 1
                        }}
                      >
                        {truncateText(item.sections[0].content)}
                      </Typography>
                    )} */}

                    {/* Footer */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      {item.createdAt && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarToday sx={{ fontSize: 14, color: '#666' }} />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(item.createdAt)}
                          </Typography>
                        </Box>
                      )}
                      
                      <Chip 
                        label={item.isDefault ? "Sample" : "Blog Post"} 
                        size="small" 
                        color={item.isDefault ? "default" : "primary"}
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {allContent.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No content available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create your first blog post to get started!
            </Typography>
          </Box>
        )}
      </Container>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 120,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }
        }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 1 }}>
          <Edit fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ gap: 1, color: 'error.main' }}>
          <Delete fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>
          Delete Blog Post
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedPost?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setDeleteDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentGrid;