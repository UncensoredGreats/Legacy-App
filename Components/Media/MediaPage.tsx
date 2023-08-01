import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../app/authModal';
import MessageCard from './MessageCard';
import { Grid, Input } from 'semantic-ui-react';
import SettingsBar from './Settings/SettingsBar';

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

function MediaPage() {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    red: true,
    orange: true,
    green: true
  });
  const [page, setPage] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    setPosts([]);
    setPage(0);
  }, [filters]);
  

  const mapColorsToPromptTypes = (filters) => {
    const mappings = {
      red: 'prompt1',
      orange: 'prompt5',
      green: 'prompt9',
    };
  
    return Object.keys(filters)
      .filter(color => filters[color])
      .map(color => mappings[color]);
  };
  

  // Fetch posts on mount and every time the page changes
  useEffect(() => {
    const fetchPosts = async () => {
      const selectedPromptTypes = mapColorsToPromptTypes(filters);
    
      const { data, error } = await supabase
        .from('Message Cards')
        .select('*')
        .in('prompt_type', selectedPromptTypes)
        .order('created_at', { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1); 
    
      if (error) console.log("error", error);
      else setPosts(oldPosts => [...oldPosts, ...data]);
    }

    fetchPosts();
  }, [page, filters]);

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
      <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
      }}>
          <div style={{
              width: '290px',
              marginRight: '0px',  // Adjust this to control the gap between search and settings
              marginLeft: '30px',
          }}>
              <Input size='large' icon='search' placeholder='Search coming soon...'/>
          </div>

          <div style={{ 
              width: '290px',
              marginRight: '30px',
          }}>
              <SettingsBar onFilterChange={setFilters} />
          </div>
      </div>

      <div style={{ padding: '20px 0' }}>
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
    </div>
  );
}

export default MediaPage;
