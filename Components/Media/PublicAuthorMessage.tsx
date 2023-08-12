import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Divider, Grid } from 'semantic-ui-react';
import AuthorAvatar from './PostParts/AuthorAvatar';
import PostRating from './PostParts/PostRating';
import PostContent from './PostParts/PostContent';
import { getColorCode } from './PostParts/ColorCode';
import { useCardState } from '../../contexts/CardStateContext';
import { useActiveChat } from '../../contexts/ActiveChatContext';

type AuthorAvatarProps = {
  post: any;
  onAvatarClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const PublicAuthorMessage = ({ 
  post,
  authorId,
  isFlipped,
  flipCard,
  animationPlayed,
  setAnimationPlayed
}) => {
  let userQuestion = "There was an error retrieving the user query.";

  const { cardState, startChat, stopChat } = useCardState(authorId);
  const { activeChat, setActiveChat } = useActiveChat();
  const router = useRouter();

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Chat Clicked');
    if (!cardState.chatMode) {
      startChat();
      setActiveChat(authorId);
      router.push(`/chat/${authorId}`);
    } else {
      stopChat();
      setActiveChat(null);
      router.push('/');
    }
  };


  if (post.metadata) {
    userQuestion = post.user_query;
  }

  let sourceTitle, sourceHeading, sourceContent, sourceSummaries, sourceMetasummary, metadata, messageId;
  try {
    sourceTitle = JSON.parse(post.source_title);
    sourceHeading = JSON.parse(post.source_heading);
    sourceContent = JSON.parse(post.source_content);
    sourceSummaries = JSON.parse(post.source_summaries);
    sourceMetasummary = JSON.parse(post.source_metasummary);
    metadata = post.metadata;
    messageId = post.message_id;
  } catch (err) {
    console.error('Failed to parse source arrays', err);
  }

  const [showMetaSummary, setShowMetaSummary] = useState(false);

  const [showMetadata, setShowMetadata] = useState(false);
  const toggleMetadata = () => setShowMetadata(!showMetadata);

  const cardColor = getColorCode(post.prompt_type);

  const result = {
    cardColor: cardColor,
    jsx: (
      <Grid.Column width={16}>
        <Card.Content>
          <Grid>
            <Grid.Row>
              <AuthorAvatar post={post} onAvatarClick={handleChatClick} />
              <PostRating metadata={metadata} messageId={messageId} toggleMetadata={toggleMetadata} />
            </Grid.Row>
            <Divider />
            <PostContent
              isFlipped={isFlipped}
              flipCard={flipCard}
              userQuestion={userQuestion}
              post={post}
              authorId={post.author_id}
              sourceTitle={sourceTitle}
              sourceHeading={sourceHeading}
              sourceContent={sourceContent}
              sourceSummaries={sourceSummaries}
              sourceMetasummary={sourceMetasummary}
              animationPlayed={animationPlayed}
              setAnimationPlayed={setAnimationPlayed}
              showMetaSummary={showMetaSummary}
              setShowMetaSummary={setShowMetaSummary}
            />
          </Grid>
        </Card.Content>
      </Grid.Column>
    ),
  };

  return result;
};

export default PublicAuthorMessage;
















