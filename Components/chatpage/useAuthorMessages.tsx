import { useQuery } from 'react-query';

const fetchAuthorMessages = async () => {
  const res = await fetch('/api/messages/author');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const useAuthorMessages = () => {
  const { data, refetch } = useQuery('authorMessages', fetchAuthorMessages);
  return { data: data || [], refetch };
};

export default useAuthorMessages;
