// // Client Side reindering Option
// import { useRouter } from 'next/router';
// import ChatPage from '../ChatPage';
// import AUTHOR_INFO from '../../data/author_data';

// const AuthorChatPage = () => {
//   const router = useRouter();
//   const { authorId } = router.query;

//   // Find the author with the matching ID
//   const author = AUTHOR_INFO.find((a) => a.id === authorId);

//   // If no author was found, return an error message
//   if (!author) {
//     return <p>Author not found</p>;
//   }

//   if (!authorId) {
//     return <div>Loading...</div>;
//   }

//   // Otherwise, render the ChatPage with the found author
//   return <ChatPage author={author} />;
// };

// export default AuthorChatPage;


// Server side rendering option
import ChatPage from '../ChatPage';
import AUTHOR_INFO from '../../data/author_data';

export async function getStaticPaths() {
  const paths = AUTHOR_INFO.map((author) => ({
    params: { authorId: author.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const author = AUTHOR_INFO.find((author) => author.id.toString() === params.authorId);
  return { props: { author } };
}

const AuthorChatPage = ({ author }) => {
  if (!author) {
    return <div>Loading...</div>;
  }

  return <ChatPage author={author} />;
};

export default AuthorChatPage;
