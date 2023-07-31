// // OG AuthorAvatar.js
// import React from 'react';
// import { Grid, Image, Card } from 'semantic-ui-react';

// const AuthorAvatar = ({ post }) => {
//   return (
//     <Grid.Column width={6} textAlign="center">
//       <Image circular src={`/images/${post.author_id}.png`} size="small" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.15)' }} />
//       <Card.Meta style={{ fontSize: '1em', padding: '0.3em', color: '#555' }}>{post.author_id}</Card.Meta>
//     </Grid.Column>
//   )
// }

// export default AuthorAvatar;





// AuthorAvatar.js
import React from 'react';
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

const AuthorAvatar = ({ post }) => {
  const timeFromNow = timeElapsed(post.created_at);

  return (
    <Grid.Column width={6} textAlign="center">
        
      <Image circular src={`/images/${post.author_id}.png`} size="small" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.15)' }} />
      <Card.Meta style={{ fontSize: '1em', padding: '0.3em', color: '#555' }}>{post.author_id}</Card.Meta>
      <Card.Meta style={{ fontSize: '0.85em', color: '#777' }}>{timeFromNow}</Card.Meta>
    </Grid.Column>
  )
}

export default AuthorAvatar;
