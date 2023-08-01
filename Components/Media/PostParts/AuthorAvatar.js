// AuthorAvatar.js
import React, { useState } from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';

const timeElapsed = (date) => {
    const currentTime = new Date();
    const postTime = new Date(date);
    const diffInMilliseconds = currentTime - postTime;
  
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
  
    if (diffInMonths > 1) return `${diffInMonths} months ago`;
    if (diffInWeeks > 1) return `${diffInWeeks} weeks ago`;
    if (diffInDays > 1) return `${diffInDays} days ago`;
    if (diffInHours > 1) return `${diffInHours} hours ago`;
    if (diffInMinutes > 1) return `${diffInMinutes} minutes ago`;
    return `${diffInSeconds} seconds ago`;
  }

const AuthorAvatar = ({ post, onAvatarClick }) => {
  const timeFromNow = timeElapsed(post.created_at);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageStyles = {
    boxShadow: '0 0 10px rgba(0,0,0,0.15)',
    cursor: 'pointer',
    opacity: isHovered ? 0.8 : 1,
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    transition: 'opacity 0.2s, transform 0.2s'
  };

  return (
    <Grid.Column width={6} textAlign="center">
      <Image 
        circular 
        src={`/images/${post.author_id}.png`} 
        size="small" 
        style={imageStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onAvatarClick}
      />
      <Card.Meta style={{ fontSize: '1em', padding: '0.3em', color: '#555' }}>{post.author_id}</Card.Meta>
      <Card.Meta style={{ fontSize: '0.85em', color: '#777' }}>{timeFromNow}</Card.Meta>
    </Grid.Column>
  )
}

export default AuthorAvatar;