import React from 'react';
import Layout from '../Components/homepageMenu/Layout';

import RenderWisdomTree from '../Components/Profile/wisdomTree';
import { MessageCardProvider } from '../contexts/MessageCardContext';

function WisdomTreePage() {
  return (
    <Layout>
      <div style={{ paddingTop: '60px' }}></div>
        <MessageCardProvider>
          <RenderWisdomTree />
        </MessageCardProvider>
    </Layout>
  );
}

export default WisdomTreePage;
