import { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { MessageCardProvider } from '../../contexts/MessageCardContext';
import MessageCard from '../../Components/Media/MessageCard';
import Link from 'next/link';

export default function SingleMessage({ post }) {
    return (
        <MessageCardProvider>
            <div style={{ padding: '60px', position: 'relative' }}>
                <Link href="/timeless-media" passHref>
                    <div style={{ position: 'absolute', top: '10px', left: '10px', padding: '10px', cursor: 'pointer' }}>
                        <Icon name='chevron left' size='large' color='grey' />
                    </div>
                </Link>
                <MessageCard post={post} id={`post-${post.message_id}`} />
            </div>
        </MessageCardProvider>
    );
}

export async function getServerSideProps(context) {
    const { messageId } = context.params;
  
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}/api/posts/${messageId}`);
    const post = await res.json();
  
    if (!post) {
      return {
        notFound: true,
      };
    }
  
    return { props: { post } };
}
