'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper,
  Chip,
  Divider,
  Avatar,
  IconButton,
  Breadcrumbs,
  Link,
  Skeleton,
  Card,
  CardContent
} from '@mui/material';
import { 
  Share, 
  Bookmark, 
  BookmarkBorder, 
  ArrowBack,
  CalendarToday,
  Person,
  NavigateNext,
  AccessTime
} from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const defaultImages = [
  '/d1.png',
  '/d2.png', 
  '/d3.png',
  '/d4.png',
];

const defaultDetails = [
  {
    type: 'DESIGN',
    color: '#a1e0eb',
    title: 'Creative Design Process:\nA Comprehensive Guide to Innovation',
    subtitle: 'This guide enables anyone to understand and implement effective design thinking methodologies.',
    category: 'Design Thinking',
    author: 'Design Team',
    readTime: '8 min read'
  },
  {
    type: 'PEOPLE',  
    color: '#fdd1d1', 
    title: 'Meet Our Creative Director',
    subtitle: 'Lead Experience Designer and Creative Strategist',
    category: 'Team Spotlight',
    author: 'HR Team',
    readTime: '5 min read'
  },
  {
    type: 'TUTORIAL',
    color: '#d4f5d4',
    title: 'Getting Started with UI/UX',
    subtitle: 'A comprehensive tutorial that will boost your design skills.',
    category: 'Tutorial',
    author: 'Design Academy', 
    readTime: '12 min read'
  },
  {
    type: 'EVENT',
    color: '#fce3c3',
    title: 'Design Workshop: October 2024',
    subtitle: 'Join us for an intensive design thinking workshop',
    category: 'Events',
    author: 'Event Team',
    readTime: '3 min read'
  },
];

const BlogDetailPage = ({ params }) => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  
  const postId = params?.id;

  useEffect(() => {
    const loadBlogPost = () => {
      try {
        // Check if running in browser environment
        if (typeof window === 'undefined') {
          setLoading(false);
          return;
        }

        // Load blog posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        
        // Check if it's a default post (format: default-0, default-1, etc.)
        if (postId && postId.toString().startsWith('default-')) {
          const defaultIndex = parseInt(postId.toString().replace('default-', ''), 10);
          if (!isNaN(defaultIndex) && defaultIndex >= 0 && defaultIndex < defaultImages.length) {
            const defaultPost = {
              id: postId,
              title: defaultDetails[defaultIndex].title,
              image: defaultImages[defaultIndex],
              sections: [
                {
                  subtitle: defaultDetails[defaultIndex].subtitle,
                  content: `This is sample content for demonstration purposes. In a real application, this would contain the full article content with detailed information about ${defaultDetails[defaultIndex].category.toLowerCase()}.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.`
                }
              ],
              createdAt: new Date().toISOString(),
              isCustom: false,
              isDefault: true,
              ...defaultDetails[defaultIndex]
            };
            setBlogPost(defaultPost);
            setLoading(false);
            return;
          }
        }

        // Try to find the post in stored posts (created by user)
        const foundPost = storedPosts.find(post => post.id.toString() === postId?.toString());
        
        if (foundPost) {
          setBlogPost({
            ...foundPost,
            isCustom: true,
            type: 'BLOG',
            color: '#e3f2fd',
            category: 'Blog Post',
            author: foundPost.author || 'Blog Author',
            readTime: `${Math.max(1, Math.ceil(foundPost.sections?.reduce((acc, section) => acc + (section.content?.length || 0), 0) / 200))} min read`
          });
          setLoading(false);
          return;
        }

        // If no post found, try legacy numeric ID support
        const numericId = parseInt(postId, 10);
        if (!isNaN(numericId) && numericId >= 0 && numericId < defaultImages.length) {
          const defaultPost = {
            id: postId,
            title: defaultDetails[numericId].title,
            image: defaultImages[numericId],
            sections: [
              {
                subtitle: defaultDetails[numericId].subtitle,
                content: `This is sample content for demonstration purposes. In a real application, this would contain the full article content with detailed information about ${defaultDetails[numericId].category.toLowerCase()}.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
              }
            ],
            createdAt: new Date().toISOString(),
            isCustom: false,
            ...defaultDetails[numericId]
          };
          setBlogPost(defaultPost);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadBlogPost();
    } else {
      setLoading(false);
    }
  }, [postId]);

  const handleBack = () => {
    router.push('/');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost?.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        console.log('URL copied to clipboard');
      }).catch(console.error);
    }
  };

  const toggleBookmark = () => {
    if (typeof window === 'undefined') return;
    
    setIsBookmarked(!isBookmarked);
    // Save bookmark state to localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(id => id !== postId);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      bookmarks.push(postId);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recently';
    }
  };

  // Check if post is bookmarked on load
  useEffect(() => {
    if (postId && typeof window !== 'undefined') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(postId));
    }
  }, [postId]);

  if (loading) {
    return (
      <Box sx={{ background: '#f9f8f4', py: 8, minHeight: '100vh', width: "100%" }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="center" spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Skeleton variant="text" width="30%" height={30} />
                <Skeleton variant="rectangular" width="100%" height={300} sx={{ my: 3, borderRadius: 2 }} />
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (!blogPost) {
    return (
      <Box sx={{ background: '#f9f8f4', py: 8, minHeight: '100vh', width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 6, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom color="text.secondary">
              Post Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              The blog post you're looking for doesn't exist or may have been removed.
            </Typography>
            <Button variant="contained" onClick={handleBack} startIcon={<ArrowBack />}>
              Go Back Home
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#f9f8f4', py: 6, minHeight: '100vh', width: "100%" }}>
      <Container maxWidth="100%">
        {/* Breadcrumbs */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <Link 
              underline="hover" 
              color="inherit" 
              onClick={handleBack}
              sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
            >
              Home
            </Link>
            <Link 
              underline="hover" 
              color="inherit" 
              onClick={handleBack}
              sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
            >
              Blog
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 500 }}>
              {blogPost.title.split('\n')[0].substring(0, 30)}...
            </Typography>
          </Breadcrumbs>
        </Box>
    <Box>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                background: "white",
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease',
                width:"100%",
                display:"flex"
              }}
            >
                <Box >

              {/* Header */}
              <Box sx={{ p: 4, pb: 2,display:"flex" }}>
<Box sx={{width:"70%"}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: '2px',
                        color: '#666',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      • {blogPost.type}
                    </Typography>
                    <Chip 
                      label={blogPost.category} 
                      size="small" 
                      sx={{ 
                        backgroundColor: blogPost.color, 
                        color: '#333',
                        fontWeight: 500,
                        fontSize: '0.7rem'
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1,}}>
                    <IconButton onClick={handleShare} size="small" sx={{ color: '#666',ml:"-50px"  }}>
                      <Share />
                    </IconButton>
                    <IconButton onClick={toggleBookmark} size="small" sx={{ color: '#666' }}>
                      {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{display:"flex"}}>
      <Box >
                {/* Title */}
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    whiteSpace: 'pre-line',
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                    color: '#1a1a1a',
                    mt:"100px"
                  }}
                >
                  {blogPost.title}
                </Typography>

                {/* Meta Information */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: blogPost.color }}>
                      <Person fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {blogPost.author}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(blogPost.createdAt)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2" color="text.secondary">
                      {blogPost.readTime}
                    </Typography>
                  </Box>
                </Box>
                </Box>

                <Divider sx={{ my: 3 }} />
                </Box>
</Box>
            {/* Featured Image */}
              <Box sx={{width:"30%"}}>
              {blogPost.image && (
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, md: 400 }, mb: 4 }}>
                  <Image
                    src={blogPost.image}
                    alt={blogPost.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>
              )}
              </Box>
            </Box>
              {/* Content */}
              <Box sx={{ p: 4, pt: blogPost.image ? 0 : 4 }}>
                {blogPost.sections?.map((section, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    {section.subtitle && (
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: '#333',
                          lineHeight: 1.3
                        }}
                      >
                        {section.subtitle}
                      </Typography>
                    )}
                    
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: 'pre-line',
                        lineHeight: 1.8,
                        color: '#444',
                        fontSize: '1.1rem'
                      }}
                    >
                      {section.content}
                    </Typography>
                  </Box>
                ))}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, pt: 4, borderTop: '1px solid #f0f0f0' }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<ArrowBack />}
                    sx={{ borderRadius: 2 }}
                  >
                    Back to Blog
                  </Button>
                  
                  <Button
                    variant="contained"
                    onClick={handleShare}
                    startIcon={<Share />}
                    sx={{ borderRadius: 2 }}
                  >
                    Share Article
                  </Button>
                </Box>
              </Box>
              </Box>



            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Related Posts Card */}
              {/* <Card sx={{ mb: 3, borderRadius: 3, border: '1px solid #f0f0f0' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Related Posts
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {defaultDetails
                      .filter((_, index) => index !== parseInt(postId?.replace('default-', '') || '-1'))
                      .slice(0, 3)
                      .map((post, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 2,
                            border: '1px solid #f0f0f0',
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: '#f8f9fa',
                              borderColor: '#ddd'
                            }
                          }}
                          onClick={() => router.push(`/blog/default-${defaultDetails.indexOf(post)}`)}
                        >
                          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            {post.title.split('\n')[0].substring(0, 50)}...
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.category} • {post.readTime}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </CardContent>
              </Card> */}

              {/* Table of Contents */}
              {/* <Card sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Table of Contents
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {blogPost.sections?.map((section, index) => (
                      section.subtitle && (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            cursor: 'pointer',
                            color: '#666',
                            '&:hover': { color: 'primary.main' },
                            py: 0.5
                          }}
                        >
                          {section.subtitle}
                        </Typography>
                      )
                    ))}
                  </Box>
                </CardContent>
              </Card> */}
            </Box>
          </Grid>
        </Grid>
    
          
         </Box>
      </Container>
    </Box>
  );
};

export default BlogDetailPage;