import React, { useState, useCallback, useEffect } from 'react';
import { Select, Input, Button, Card, List, Spin, Image, Typography, Space, Tooltip } from 'antd';
import { SearchOutlined, BookOutlined, RetweetOutlined } from '@ant-design/icons';
import AUTHOR_INFO from '../../data/author_data';
import { handleReadBookClick } from '../../utils/handleReadBookClick';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const defaultAuthor = "All Books";
const SemanticLibraryPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(defaultAuthor);
    const [submittedSearchValue, setSubmittedSearchValue] = useState('');
    const [imageError, setImageError] = useState({});

    const windowWidth = useWindowWidth();
    const isMobile = windowWidth && windowWidth <= 768;


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
            if (response.ok) setData(await response.json());
            setIsLoading(false);
        }
    }, [searchValue, selectedAuthor]);

    const handleReadBook = (currentAuthorId, currentTitle) => {
        handleReadBookClick(currentAuthorId, currentTitle);
    };

    const handleImageError = (title) => {
        setImageError(prevState => ({
            ...prevState,
            [title]: true
        }));
    };

    function sanitizeTitleForFilename(title: string): string {
        return title.replace(/[\/\\\?\*\:\|\<\>\"\.\,\[\]\-\(\)\—]/g, '');
      }

    function useWindowWidth(): number | undefined {
        const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

        useEffect(() => {
            setWindowWidth(window.innerWidth);

            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowWidth;
    }
    
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
        gap: '20px'
    };


    if (typeof window !== "undefined") {
        if (window.innerWidth <= 768) {
            gridStyle.gridTemplateColumns = '1fr';
        }
    }

    // import { Select, Input, Button, Card, List, Spin, Image, Typography, Space, Tooltip } from 'antd';
    // ...

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Title level={1}>Welcome to the Semantic Library</Title>
                <Text type="secondary">Enter a meaningful idea, get the most related book sections. Then, delve deeper as you please!</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <Select 
                    placeholder="Choose an author"
                    style={{ width: 200, marginRight: '10px' }} 
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
                    style={{ width: '60%' }}
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
                    console.log(bookImagePath);
        
                    return (
                        <Card style={{ width: '90%', marginTop: '20px', marginBottom: '20px' }}>
                            <div key={title} style={gridStyle}>
                                <div>
                                    <Title level={4} style={{ marginBottom: '10px' }}>{title}</Title>
                                    <Text type="secondary" style={{ display: 'block', marginBottom: '20px', textAlign: 'center' }}><em>{currentAuthor?.id} | Page {heading}</em></Text>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title="Read Book">
                                        <Image 
                                            src={imageError[title] ? authorImagePath : bookImagePath} 
                                            alt={title} 
                                            onError={() => handleImageError(title)}
                                            width={250}
                                            height={250}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleReadBookClick(currentAuthor.id, title)}
                                            preview={false}
                                        />
                                    </Tooltip>
                                    </div>
                                </div>
                                <div>
                                    <Text strong style={{fontSize: "16px", marginBottom: "10px"}}>Key Sentences: </Text>
                                    <List
                                        size="small"
                                        dataSource={data.summaries[index]}
                                        renderItem={sentence => <List.Item>{(sentence as string)?.trim()}</List.Item>}
                                    />
                                </div>
                            </div>
                            {isFlipped &&
                                <div style={{ width: '100%', marginTop: '5px', marginBottom: '20px' }}>
                                    <Paragraph>{data.contents[index]}</Paragraph>
                                    <Space>
                                        <Button onClick={() => setIsFlipped(!isFlipped)}>Hide</Button>
                                    </Space>
                                </div>
                            }
                            {!isFlipped &&
                                <Space style={{ display: 'block', textAlign: 'right', width: '100%' }}>
                                    <Button onClick={() => setIsFlipped(!isFlipped)}>Show Section</Button>
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
