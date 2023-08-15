
import React, { useState, useCallback, useEffect } from 'react';
import { Select, Input, Button, Spin, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { handleReadBookClick } from '../../utils/handleReadBookClick';
import AUTHOR_INFO from '../../data/author_data';
import VirtualBookShelfComponent from './VirtualBookshelf';
import BookCard from './BookCard';
import styles from '../../styles/SemanticLibraryPage.module.css';


const { Option } = Select;
const { Title, Text } = Typography;
const defaultAuthor = "All Books";

function sanitizeTitleForFilename(title) {
    return title.replace(/[\/\\\?\*\:\|\<\>\"\.\[\]\,\-\(\)\—]/g, '');
}

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowWidth;
}

const SemanticLibraryPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(null);
    const [isFlipped, setIsFlipped] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(defaultAuthor);
    const [submittedSearchValue, setSubmittedSearchValue] = useState('');
    const [imageError, setImageError] = useState({});

    const windowWidth = useWindowWidth();
    const isMobile = windowWidth && windowWidth <= 768;
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
        gap: '20px'
    };

    const handleAuthorChange = value => setSelectedAuthor(value);
    const handleSearchChange = e => setSearchValue(e.target.value);
    const handleKeyPress = (e) => { if (e.key === 'Enter') handleSearchSubmit(); };

    const handleSearchSubmit = useCallback(async () => {
        if (searchValue.trim() !== '') {
            setSubmittedSearchValue(searchValue);
            setIsLoading(true);
            const response = await fetch('/api/semantic-library', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: searchValue, author: selectedAuthor }),
            });
            if (response.ok) {
                const responseData = await response.json();
                setData(responseData);
                setIsFlipped(new Array(responseData.titles.length).fill(false));
            }
            setIsLoading(false);
        }
    }, [searchValue, selectedAuthor]);

    const toggleFlipped = (index) => {
        setIsFlipped(prevFlipped => {
            const newFlipped = [...prevFlipped];
            newFlipped[index] = !newFlipped[index];
            return newFlipped;
        });
    };

    const handleReadBook = (currentAuthorId, currentTitle) => {
        handleReadBookClick(currentAuthorId, currentTitle);
    };

    const handleImageError = (title) => {
        setImageError(prevState => ({
            ...prevState,
            [title]: true
        }));
    };


    if (typeof window !== "undefined") {
        if (window.innerWidth <= 768) {
            gridStyle.gridTemplateColumns = '1fr';
        }
    }

return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={1}>What would you like to read?</Title>
        <Text type="secondary">Search through 100s of books by semantic meaning. Then, delve deeper as you please!</Text>
      </div>

      <div className={styles.searchSection}>
        <Select 
            placeholder="Choose an author"
            className={styles.select}
            onChange={handleAuthorChange}
            defaultValue={defaultAuthor}
        >
            {AUTHOR_INFO.map(author => (
                <Option key={author.id} value={author.id}>{author.id}</Option>
            ))}
        </Select>
        <Input.Search
            placeholder="Type a topic or a query..."
            enterButton={<Button type="primary"><SearchOutlined /></Button>}
            size="large"
            className={styles.searchInput}
            onChange={handleSearchChange}
            onSearch={handleSearchSubmit}
        />
      </div>

      {isLoading ? 
          <div className={styles.loading}>
              <Spin size="large" />
          </div>
      :       
          data && data.titles.map((title, index) => (
              <BookCard 
                  title={title} 
                  currentAuthor={data.authors[index]}
                  heading={data.headings[index]}
                  bookImagePath={`/bookimages/${data.authors[index]?.id}/${sanitizeTitleForFilename(title)}.png`}
                  authorImagePath={`/images/${data.authors[index]?.id}.png`}
                  imageError={imageError}
                  handleImageError={handleImageError}
                  handleReadBookClick={handleReadBook}
                  isFlipped={isFlipped[index]}
                  toggleFlipped={() => toggleFlipped(index)}
                  summaries={data.summaries[index]}
                  contents={data.contents[index]}
              />
          ))
      }

    <VirtualBookShelfComponent />

    </div>
  );
};
export default SemanticLibraryPage;
