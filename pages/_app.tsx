// Adding Toast
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthorCardProvider } from '../contexts/CardStateContext';
import { ActiveChatProvider } from '../contexts/ActiveChatContext';
import '../styles/globalStyles.css';
import '../styles/index.css';
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorCardProvider>
        <ActiveChatProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ActiveChatProvider>
      </AuthorCardProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
