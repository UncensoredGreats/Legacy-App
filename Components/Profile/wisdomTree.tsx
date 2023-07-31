import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../app/authModal';
import MessageCard from '../Media/MessageCard';
import { Grid } from 'semantic-ui-react';

import { getCurrentUserId } from '../supadb/getCurrentUserId';


// Custom Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

function RenderWisdomTree() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  // Fetch posts on mount and every time the page changes
  useEffect(() => {
    const fetchPosts = async () => {
      let userId = await getCurrentUserId();

      const { data, error } = await supabase
        .from('Message Cards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1); 

      if (error) console.log("error", error);
      else setPosts(oldPosts => [...oldPosts, ...data]);
    }

    fetchPosts();
  }, [page]);

  // Create an IntersectionObserver to load the next page when the last post is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage(old => old + 1);
        }
      },
      { threshold: 1 }
    );

    const lastPostElement = document.getElementById(`post-${posts.length - 1}`);
    if (lastPostElement) {
      observer.observe(lastPostElement);
    }

    return () => {
      if (lastPostElement) {
        observer.unobserve(lastPostElement);
      }
    }
  }, [posts]);

  const size = useWindowSize();

  const numColumns = size.width < 700 ? 1 : size.width < 1000 ? 2 : 3;
  const columns = Array.from({ length: numColumns }, () => []);

  posts.forEach((post, i) => {
    const columnIndex = i % numColumns;
    columns[columnIndex].push(post);
  });

  return (
    <div>
      <Grid columns={numColumns} style={{ marginLeft: '15px', marginRight: '15px' }}>
        {columns.map((columnPosts, columnIndex) => (
          <Grid.Column key={columnIndex} style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            {columnPosts.map((post, postIndex) => (
              <MessageCard key={`post-${(columnIndex * pageSize) + postIndex}`} post={post} id={`post-${(columnIndex * pageSize) + postIndex}`} />
            ))}
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
}

export default RenderWisdomTree;