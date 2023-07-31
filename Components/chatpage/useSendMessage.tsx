/*
This is a custom hook that encapsulates the logic of sending a message. 
It uses the react-query library to handle API requests in a declarative manner. 
It takes in success and error callback functions and returns a mutation 
function that can be called to send a message.
*/

import { useMutation, useQueryClient } from 'react-query';

const sendMessage = async ({ query, scope, breadth }) => {
  const response = await fetch('/api/messages/author', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, scope, breadth })
  });

  if (!response.ok) {
    throw new Error(`API call failed with HTTP ${response.status}`);
  }

  return response.json();
};

const useSendMessage = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(sendMessage, {
    onSuccess,
    onError,
  });

  return mutation;
};

export default useSendMessage;
