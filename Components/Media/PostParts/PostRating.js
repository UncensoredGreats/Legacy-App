// Fetches all numbers from db, but doesn't reflect user's position too nicely in the UI.
import React, { useState, useEffect } from 'react';
import { Button, Grid, Label, Icon, Rating } from 'semantic-ui-react';
import Buttons from '../Buttons';
import handleLikeClick from './ClickFunctions/handleLike';
import handleRating from './ClickFunctions/handleRating';
import { getCurrentUserId } from '../../supadb/getCurrentUserId';
import { supabase } from '../../../app/authModal';
import useUserInteractions from './ClickFunctions/useUserInteractions';


const PostRating = ({ metadata, toggleMetadata, messageId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [votes, setVotes] = useState(0);
  const [userId, setUserId] = useState(null);

  const { userInteractions, setUserInteractions } = useUserInteractions(userId, messageId);

  const fetchLikeCount = async (messageId) => {
    let { data: likes, error } = await supabase
      .from('PostInteractions')
      .select('value')
      .eq('message_id', messageId)
      .eq('interaction_type', 'like');
  
    if (error) {
      console.error('Error fetching likes: ', error);
    } else {
      return likes.length;
    }
  };
  
  const fetchRatingData = async (messageId) => {
    let { data: ratings, error } = await supabase
      .from('PostInteractions')
      .select('value')
      .eq('message_id', messageId)
      .eq('interaction_type', 'rating');
  
    if (error) {
      console.error('Error fetching ratings: ', error);
    } else {
      const totalRating = ratings.reduce((sum, { value }) => sum + value, 0);
      return { rating: totalRating / ratings.length, votes: ratings.length };
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const currentUserId = await getCurrentUserId();
      setUserId(currentUserId);
    
      const initialLikeCount = await fetchLikeCount(messageId);
      setLikeCount(initialLikeCount);
  
      const initialRatingData = await fetchRatingData(messageId);
      setRating(initialRatingData.rating);
      setVotes(initialRatingData.votes);
    };
  
    fetchInitialData();
  }, [messageId]);

  const onLikeClick = async () => {
    if (userId) {
      const updatedLike = await handleLikeClick(userId, messageId, async (liked) => {
        const updatedLikeCount = await fetchLikeCount(messageId);
        setLikeCount(updatedLikeCount);
      });
      
      setUserInteractions(prevInteractions => ({...prevInteractions, like: updatedLike}));
    }
  };
  
  const onRate = async (event, { rating }) => {
    if (userId) {
      const updatedRating = await handleRating(userId, messageId, rating, async () => {
        const updatedRatingData = await fetchRatingData(messageId);
        setRating(updatedRatingData.rating);
        setVotes(updatedRatingData.votes);
      });
  
      setUserInteractions(prevInteractions => ({...prevInteractions, rating: updatedRating}));
    }
  }; 

  return (
    <Grid.Column width={10}>
      <Grid textAlign="center" stackable>
        <Grid.Row>
          <Buttons userId={userId} messageId={messageId} toggleMetadata={toggleMetadata} metadata={metadata} setUserInteractions={setUserInteractions} />
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column textAlign="center">
            <Icon onClick={onLikeClick} color={userInteractions.like ? 'red' : 'grey'} size='large' name="heart" style={{ margin: '0.3em' }}/>
            <Rating maxRating={5} clearable size="large" icon="star" rating={userInteractions.rating || 0} style={{ margin: '0.3em' }} onRate={onRate} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column textAlign="center">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Label style={{ marginRight: '10px' }}>
                <Icon name='heart' color='red'/> {likeCount}
              </Label>
              <Label style={{ marginRight: '10px', marginLeft: '10px' }}>
                <Icon name='star' color='yellow'/> {rating}
              </Label>
              <Label style={{ marginLeft: '10px' }}>
                <Icon name='users' /> {votes}
              </Label>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  );
}

export default PostRating;

 



// // Different Design. Not as good tbh. 
// return (
//   <Grid.Column width={10}>
//     <Grid textAlign="center" stackable>
//       <Grid.Row>
//         <Buttons
//           userId={userId}
//           messageId={messageId}
//           toggleMetadata={toggleMetadata}
//           metadata={metadata}
//           setUserInteractions={setUserInteractions}
//         />
//       </Grid.Row>

//       {/* Clearable Star Rating */}
//       <Grid.Row centered>
//         <Grid.Column textAlign="center">
//           <Rating
//             maxRating={5}
//             clearable
//             size="huge"
//             icon="star"
//             rating={userInteractions.rating || 0}
//             onRate={onRate}
//           />
//         </Grid.Column>
//       </Grid.Row>

//       {/* Like, Rating & Votes */}
//       <Grid.Row centered>
//         <Grid.Column textAlign="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
//           {/* Like Button */}
//           <Button as="div" labelPosition="right" onClick={onLikeClick} size="small">
//             <Button icon color={userInteractions.like ? 'red' : null}>
//               <Icon name="heart" size="small" />
//             </Button>
//             <Label as="a" basic pointing="left" size="small">
//               {likeCount}
//             </Label>
//           </Button>
          
//           {/* Rating Stats */}
//           <Button as="div" labelPosition="left" size="small" style={{ marginLeft: '10px' }}>
//             <Label as="a" basic pointing="right" size="small">
//               <Icon name="star" color="yellow" size="small" /> {rating}
//             </Label>
//             <Button icon size="small">
//               <Icon name="users" size="small" />
//             </Button>
//             <Label as="a" basic pointing="left" size="small">
//               {votes}
//             </Label>
//           </Button>
          
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   </Grid.Column>
// );
// };

// export default PostRating;