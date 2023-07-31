import React from 'react';
import Layout from '../Components/homepageMenu/Layout';
import MediaPage from '../Components/Media/MediaPage';
import { MessageCardProvider } from '../contexts/MessageCardContext';

export default function TimelessMediaPage() {
  return (
    <Layout>
      <div style={{ paddingTop: '20px' }}></div>
        <MessageCardProvider>
          <MediaPage />
        </MessageCardProvider>
    </Layout>
  );
}
