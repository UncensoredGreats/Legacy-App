/* 
Psuedocode:
"""
IMPORT the useRouter hook FROM the 'next/router' module
IMPORT the AUTHOR_INFO FROM the '../../data/author_data' module

DECLARE the Author interface with fields for id, first, last, image, description, and category

DECLARE the AuthorPage component
  DECLARE a variable called router that is set to the useRouter hook
  DECLARE a variable called authorId that is set to the authorId key of the router query object
  FIND the author object in AUTHOR_INFO that matches the authorId and cast it as an Author or undefined
  IF the author is undefined, RENDER a message saying "Author not found"
  ELSE, RENDER the author information, including name, description, and other components
"""

*/


// I don't even know if this does anything anymore.


import { useRouter } from 'next/router';
import AUTHOR_INFO from '../../data/author_data';

interface Author {
  id: string;
  first: string;
  last: string;
  image: string;
  description: string;
  category: string[];
}

const AuthorPage: React.FC = () => {
  const router = useRouter();
  const { authorId } = router.query;

  const author = AUTHOR_INFO[authorId as keyof typeof AUTHOR_INFO] as Author | undefined;

  if (!author) {
    return <div>Author not found</div>;
  }

  return (
    <div>
      <h1>{authorId}</h1>
      <p>{author.description}</p>
      {}
    </div>
  );
};

export default AuthorPage;
