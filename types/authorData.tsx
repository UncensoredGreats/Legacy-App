export interface Author {
  id: string;
  first: string;
  last: string;
  image: string;
  description: string;
  category: string[];
}

export interface AuthorCardProps {
  author: Author;
  chatMode?: boolean;
}