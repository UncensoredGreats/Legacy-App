
import React, { useState, useCallback, useEffect } from 'react';
import { Select, Input, Button, Card, List, Spin, Image, Typography, Space, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AUTHOR_INFO from '../../data/author_data';
import { handleReadBookClick } from '../../utils/handleReadBookClick';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const defaultAuthor = "All Books";

function sanitizeTitleForFilename(title) {
    return title.replace(/[\/\\\?\*\:\|\<\>\"\.\,\[\]\-\(\)\—]/g, '');
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

    const BreakLineWithText = ({ text }) => (
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
            <span style={{ margin: '0 10px', color: '#888', fontSize: '0.8rem' }}>{text}</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
        </div>
    );


    if (typeof window !== "undefined") {
        if (window.innerWidth <= 768) {
            gridStyle.gridTemplateColumns = '1fr';
        }
    }


return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={1}>What would you like to read?</Title>
            <Text type="secondary">Enter a meaningful idea, get the most related book sections. Then, delve deeper as you please!</Text>
        </header>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
            <Select 
                placeholder="Choose an author"
                style={{ width: '20%', marginRight: '2%', minWidth: '180px' }} 
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
                onChange={handleSearchChange}
                onSearch={handleSearchSubmit}
                style={{ width: '78%' }}
            />
        </div>

        {isLoading ? 
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spin size="large" />
            </div>
        : 
            data && data.titles.map((title, index) => {
                const currentAuthor = data.authors[index];
                const heading = data.headings[index];
                const bookImagePath = `/bookimages/${currentAuthor?.id}/${sanitizeTitleForFilename(title)}.png`;
                const authorImagePath = `/images/${currentAuthor?.id}.png`;
                const fallbackImage = `/fallbackimage.png`; // default image in case both main and author images fail
                
                return (
                    <Card style={{ width: '100%', marginTop: '30px', marginBottom: '30px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <div key={title} style={gridStyle}>
                            <div>
                                <Title level={4} style={{ marginBottom: '15px' }}>{title}</Title>
                                <Text type="secondary" style={{ display: 'block', marginBottom: '25px', textAlign: 'center' }}><em>{currentAuthor?.id} | Page {heading}</em></Text>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title="Read Book">
                                        <Image 
                                            src={imageError[title] ? (authorImagePath || fallbackImage) : bookImagePath} 
                                            alt={title} 
                                            onError={() => handleImageError(title)}
                                            width={250}
                                            height={250}
                                            style={{ cursor: 'pointer', borderRadius: '4px' }}
                                            onClick={() => handleReadBookClick(currentAuthor.id, title)}
                                            preview={false}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                            <div>
                                <BreakLineWithText text="Key Sentences" />
                                <List
                                    size="small"
                                    dataSource={data.summaries[index]}
                                    renderItem={sentence => <List.Item>{(sentence as string)?.trim()}</List.Item>}
                                />
                            </div>
                        </div>
                        {isFlipped[index] &&
                            <>
                                <BreakLineWithText text="Book Section" />
                                <div style={{ width: '100%', marginTop: '5px', marginBottom: '25px' }}>
                                    <Paragraph>{data.contents[index]}</Paragraph>
                                    <Space>
                                        <Button onClick={() => toggleFlipped(index)}>Show Key Sentences</Button>
                                    </Space>
                                </div>
                            </>
                        }
                        {!isFlipped[index] &&
                            <Space style={{ display: 'block', textAlign: 'right', width: '100%' }}>
                                <Button onClick={() => toggleFlipped(index)}>Show Whole Book Section</Button>
                            </Space>
                        }
                    </Card>
                );
            })
        }
    </div>
);
};

export default SemanticLibraryPage;
