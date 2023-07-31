import React, { useState } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ShareButtonProps {
  messageId: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ messageId }) => {
  const [copied, setCopied] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(`${baseUrl}timeless-media/${messageId}`);
    setCopied(true);

    toast("Link Copied to Clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Reset after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <Popup
      trigger={
        <Button
          icon
          color="blue"
          size="mini"
          style={{ margin: '0.3em' }}
          onClick={handleCopy}
        >
          <Icon name='external share'/>
        </Button>
      }
      content={copied ? 'Link Copied!' : 'Share'}
      position='top center'
    />
  );
};

export default ShareButton;
