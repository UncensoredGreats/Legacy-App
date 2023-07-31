// Added Report Button.
import React, { useState, useEffect } from 'react';
import ShareButton from './Buttons/ShareButton';
import CommentButton from './Buttons/CommentButton';
import MetadataButton from './Buttons/MetadataButton';
import ReportButton from './Buttons/ReportButton';
import useUserInteractions from './PostParts/ClickFunctions/useUserInteractions';


type ButtonsProps = {
  toggleMetadata: () => void;
  metadata: any;
  userId: string;
  messageId: string;
  userQuestion: string;
  messageContent: string;
  setUserInteractions: any;
};

const Buttons: React.FC<ButtonsProps> = ({ metadata, userId, messageId }) => {
  const { userInteractions, setUserInteractions } = useUserInteractions(userId, messageId);
  const [reported, setReported] = useState(Boolean(userInteractions.report));

  useEffect(() => {
    setReported(Boolean(userInteractions.report));
  }, [userInteractions]);

  return (
    <>
      <ShareButton messageId={messageId} />
      <CommentButton />
      <MetadataButton metadata={metadata} />
      <ReportButton userId={userId} messageId={messageId} reported={reported} setReported={setReported} setUserInteractions={setUserInteractions} />
    </>
  );
};

export default Buttons;
