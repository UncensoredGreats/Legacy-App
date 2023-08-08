import React, { useState, useCallback, useEffect } from 'react';
import { Select, Input, Button, Card, List, Spin, Image, Typography, Space, Tooltip } from 'antd';
import { SearchOutlined, BookOutlined, RetweetOutlined } from '@ant-design/icons';
import AUTHOR_INFO from '../../data/author_data';
import { handleReadBookClick } from '../../utils/handleReadBookClick';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const defaultAuthor = "Random Corpus";
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
        return title.replace(/[\/\\\?\*\:\|\<\>\"\.\,\[\]\-]/g, '');
      }
      

    // return (
    //     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
    //         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
    //             <Title level={1}>The Perfect Way to Find Your Next Read</Title>
    //             <Text type="secondary">Search book sections by semantic meaning. Then, delve deeper as you please!</Text>
    //         </div>
    //         <Space align="center" style={{ display: 'flex', justifyContent: 'center', margin: '30px auto' }}>
    //             <Select defaultValue={defaultAuthor} style={{ width: 120 }} onChange={handleAuthorChange}>
    //                 <Option value={defaultAuthor}>{defaultAuthor}</Option>
    //                 {AUTHOR_INFO.map(author => (
    //                     <Option key={author.id} value={author.id}>{author.id}</Option>
    //                 ))}
    //             </Select>
    //             <Input.Search
    //                 placeholder="Type a topic or a query..."
    //                 enterButton={<Button type="primary"><SearchOutlined /></Button>}
    //                 size="large"
    //                 onChange={handleSearchChange}
    //                 onSearch={handleSearchSubmit}
    //                 style={{ width: '75%' }}
    //             />
    //         </Space>
    //         {isLoading && <Spin size="large" />}
    //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'calc(100vh - 200px)', position: 'relative' }}>
    //             {data && data.titles.map((title, index) => {
    //                 const currentAuthor = data.authors[index];
    //                 const heading = data.headings[index];
    //                 const bookImagePath = `/bookimages/${currentAuthor?.id}/${sanitizeTitleForFilename(title)}.png`;
    //                 const authorImagePath = `/images/${currentAuthor?.id}.png`;
    //                 console.log(bookImagePath);

    //                 return (
    //                     <Card style={{ width: '80%', marginTop: '20px' }} key={title}>
    //                         <Image 
    //                             src={imageError[title] ? authorImagePath : bookImagePath} 
    //                             alt={title} 
    //                             onError={() => handleImageError(title)}
    //                         />
    //                         <Divider />
    //                         <Card.Meta
    //                             title={<Title level={2}>{title}</Title>}
    //                             description={<Text type="secondary"><em>{currentAuthor?.id} | Page {heading}</em></Text>}
    //                         />
    //                         {!isFlipped ? (
    //                             <>
    //                                 <Text strong style={{fontSize: "16px", marginBottom: "10px"}}>Key Sentences: </Text>
    //                                 <List
    //                                     size="small"
    //                                     dataSource={data.summaries[index]}
    //                                     renderItem={sentence => <List.Item>{(sentence as string)?.trim()}</List.Item>}
    //                                 />
    //                             </>
    //                         ) : (
    //                             <Paragraph>{data.contents[index]}</Paragraph>
    //                         )}
    //                         <Space>
    //                             <Button type="primary" icon={<BookOutlined />} onClick={() => handleReadBookClick(currentAuthor.id, title)}>Read the whole book</Button>
    //                             <Button icon={isFlipped ? <RetweetOutlined /> : <RetweetOutlined rotate={180} />} onClick={() => setIsFlipped(!isFlipped)} />
    //                         </Space>
    //                     </Card>
    //                 );
    //             })}
    //         </div>
    //     </div>
    // );





    // return (
    //     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
    //         <div style={{ textAlign: 'center', marginBottom: '50px' }}>
    //             <Title level={1}>A Readers Paradise</Title>
    //             <Text type="secondary">Search book sections by semantic meaning. Then, delve deeper as you please!</Text>
    //         </div>
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
    //             <Select 
    //                 placeholder="Choose an author"
    //                 style={{ width: 200, marginRight: '20px' }} 
    //                 onChange={handleAuthorChange}
    //                 defaultValue={defaultAuthor}
    //             >
    //                 {AUTHOR_INFO.map(author => (
    //                     <Option key={author.id} value={author.id}>{author.id}</Option>
    //                 ))}
    //             </Select>
    //             <Input.Search
    //                 placeholder="Type a topic or a query..."
    //                 enterButton={<Button type="primary"><SearchOutlined /></Button>}
    //                 size="large"
    //                 onChange={handleSearchChange}
    //                 onSearch={handleSearchSubmit}
    //                 style={{ width: '60%' }}
    //             />
    //         </div>
    //         {isLoading ? 
    //             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    //                 <Spin size="large" />
    //             </div>
    //         : 
    //             data && data.titles.map((title, index) => {
    //                 const currentAuthor = data.authors[index];
    //                 const heading = data.headings[index];
    //                 const bookImagePath = `/bookimages/${currentAuthor?.id}/${sanitizeTitleForFilename(title)}.png`;
    //                 const authorImagePath = `/images/${currentAuthor?.id}.png`;
    
    //                 return (
    //                     <Card style={{ width: '90%', marginTop: '30px', marginBottom: '30px' }} key={title}>
    //                         <div onClick={() => handleReadBookClick(currentAuthor.id, title)}>
    //                             <Image 
    //                                 src={imageError[title] ? authorImagePath : bookImagePath} 
    //                                 alt={title} 
    //                                 onError={() => handleImageError(title)}
    //                             />
    //                             <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white'}}>
    //                                 Read Full Book
    //                             </div>
    //                         </div>
    //                         <Divider />
    //                         <Card.Meta
    //                             title={<Title level={2}>{title}</Title>}
    //                             description={<Text type="secondary"><em>{currentAuthor?.id} | Page {heading}</em></Text>}
    //                         />
    //                         {!isFlipped ? (
    //                             <>
    //                                 <Text strong style={{fontSize: "16px", marginBottom: "10px"}}>Key Sentences: </Text>
    //                                 <List
    //                                     size="small"
    //                                     dataSource={data.summaries[index]}
    //                                     renderItem={sentence => <List.Item>{(sentence as string)?.trim()}</List.Item>}
    //                                 />
    //                             </>
    //                         ) : (
    //                             <Paragraph>{data.contents[index]}</Paragraph>
    //                         )}
    //                         <Space>
    //                             <Button onClick={() => setIsFlipped(!isFlipped)}>{isFlipped ? 'Show Summary' : 'Show Details'}</Button>
    //                         </Space>
    //                     </Card>
    //                 );
    //             })
    //         }
    //     </div>
    // );




// // Layed horizontal, but doesn't fit great.
//     return (
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
//             <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//                 <Title level={1}>A Readers Paradise</Title>
//                 <Text type="secondary">Search book sections by semantic meaning. Then, delve deeper as you please!</Text>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
//                 <Select 
//                     placeholder="Choose an author"
//                     style={{ width: 200, marginRight: '10px' }} 
//                     onChange={handleAuthorChange}
//                     defaultValue={defaultAuthor}
//                 >
//                     {AUTHOR_INFO.map(author => (
//                         <Option key={author.id} value={author.id}>{author.id}</Option>
//                     ))}
//                 </Select>
//                 <Input.Search
//                     placeholder="Type a topic or a query..."
//                     enterButton={<Button type="primary"><SearchOutlined /></Button>}
//                     size="large"
//                     onChange={handleSearchChange}
//                     onSearch={handleSearchSubmit}
//                     style={{ width: '60%' }}
//                 />
//             </div>
//             {isLoading ? 
//                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//                     <Spin size="large" />
//                 </div>
//             : 
//                 data && data.titles.map((title, index) => {
//                     const currentAuthor = data.authors[index];
//                     const heading = data.headings[index];
//                     const bookImagePath = `/bookimages/${currentAuthor?.id}/${sanitizeTitleForFilename(title)}.png`;
//                     const authorImagePath = `/images/${currentAuthor?.id}.png`;
        
//                     return (
//                         <div key={title}>
//                             <Card style={{ width: '90%', marginTop: '20px', marginBottom: '20px' }}>
//                                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                                     <Image 
//                                         src={imageError[title] ? authorImagePath : bookImagePath} 
//                                         alt={title} 
//                                         onError={() => handleImageError(title)}
//                                         width={`calc(20vw + 50px)`}
//                                         style={{marginRight: '20px', cursor: 'pointer'}}
//                                         onClick={() => handleReadBookClick(currentAuthor.id, title)}
//                                     />
//                                     <div style={{ flexGrow: 1 }}>
//                                         <Card.Meta
//                                             title={<Title level={2}>{title}</Title>}
//                                             description={<Text type="secondary"><em>{currentAuthor?.id} | Page {heading}</em></Text>}
//                                         />
//                                         <Text strong style={{fontSize: "16px", marginBottom: "10px"}}>Key Sentences: </Text>
//                                         <List
//                                             size="small"
//                                             dataSource={data.summaries[index]}
//                                             renderItem={sentence => <List.Item>{(sentence as string)?.trim()}</List.Item>}
//                                         />
//                                     </div>
//                                 </div>
//                             </Card>
//                             {isFlipped &&
//                                 <Card style={{ width: '90%', marginTop: '5px', marginBottom: '20px' }}>
//                                     <Paragraph>{data.contents[index]}</Paragraph>
//                                     <Space>
//                                         <Button onClick={() => setIsFlipped(!isFlipped)}>Hide</Button>
//                                     </Space>
//                                 </Card>
//                             }
//                             {!isFlipped &&
//                                 <Space style={{ display: 'block', textAlign: 'right', marginRight: '5%' }}>
//                                     <Button onClick={() => setIsFlipped(!isFlipped)}>Show Section</Button>
//                                 </Space>
//                             }
//                         </div>
//                     );
//                 })
//             }
//         </div>
//     );

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

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Title level={1}>A Readers Paradise</Title>
                <Text type="secondary">Search book sections by semantic meaning. Then, delve deeper as you please!</Text>
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
