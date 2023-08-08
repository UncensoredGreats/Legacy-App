// // OG

// import React, { useState, useCallback } from 'react';
// import { Select, Input, Button, Card, List, Spin, Image, Typography, Space, Divider } from 'antd';
// import { SearchOutlined, BookOutlined, RetweetOutlined } from '@ant-design/icons';
// import AUTHOR_INFO from '../../data/author_data';
// import { handleReadBookClick } from '../../utils/handleReadBookClick';

// const { Option } = Select;
// const { Title, Text, Paragraph } = Typography;

// const defaultAuthor = "Random";
// const SemanticLibraryPage = () => {
//     const [searchValue, setSearchValue] = useState('');
//     const [data, setData] = useState(null);
//     const [isFlipped, setIsFlipped] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedAuthor, setSelectedAuthor] = useState(defaultAuthor);
//     const [submittedSearchValue, setSubmittedSearchValue] = useState('');

//     const handleAuthorChange = value => setSelectedAuthor(value);
//     const handleSearchChange = e => setSearchValue(e.target.value);    
//     const handleKeyPress = (e) => { if (e.key === 'Enter') handleSearchSubmit(); };

//     const handleSearchSubmit = useCallback(async () => {
//         if (searchValue.trim() !== '') {
//             setSubmittedSearchValue(searchValue);
//             setIsLoading(true);
//             const response = await fetch('/api/semantic-library', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ query: searchValue, author: selectedAuthor }),
//             });
//             if (response.ok) setData(await response.json());
//             setIsLoading(false);
//         }
//     }, [searchValue, selectedAuthor]);

//     const handleReadBook = (currentAuthorId, currentTitle) => {
//         handleReadBookClick(currentAuthorId, currentTitle);
//     };

//     return (
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
//             <div style={{ textAlign: 'center', marginBottom: '30px' }}>
//                 <Title level={1}>The Perfect Way to Find Your Next Read</Title>
//                 <Text type="secondary">Search book sections by semantic meaning. Then, delve deeper as you please!</Text>
//             </div>
//             <Space align="center" style={{ display: 'flex', justifyContent: 'center', margin: '30px auto' }}>
//                 <Select defaultValue={defaultAuthor} style={{ width: 120 }} onChange={handleAuthorChange}>
//                     <Option value={defaultAuthor}>{defaultAuthor}</Option>
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
//                     style={{ width: '75%' }}
//                 />
//             </Space>
//             {isLoading && <Spin size="large" />}
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'calc(100vh - 200px)', position: 'relative' }}>
//                 {data && data.titles.map((title, index) => {
//                     const currentAuthor = data.authors[index];
//                     const heading = data.headings[index];
//                     const imagePath = `/images/${currentAuthor?.id}.png`;

//                     return (
//                         <Card style={{ width: '80%', marginTop: '20px' }} key={title}>
//                             <Image src={imagePath} alt={title} />
//                             <Divider />
//                             <Card.Meta
//                                 title={<Title level={2}>{title}</Title>}
//                                 description={<Text type="secondary"><em>{currentAuthor?.id} | Page {heading}</em></Text>}
//                             />
//                             {!isFlipped ? (
//                                 <>
//                                     <Text strong style={{fontSize: "16px", marginBottom: "10px"}}>Key Sentences: </Text>
//                                     <List
//                                         size="small"
//                                         dataSource={data.summaries[index]}
//                                         renderItem={sentence => <List.Item>{(sentence as string)?.trim()}</List.Item>}
//                                     />
//                                 </>
//                             ) : (
//                                 <Paragraph>{data.contents[index]}</Paragraph>
//                             )}
//                             <Space>
//                                 <Button type="primary" icon={<BookOutlined />} onClick={() => handleReadBookClick(currentAuthor.id, title)}>Read the whole book</Button>
//                                 <Button icon={isFlipped ? <RetweetOutlined /> : <RetweetOutlined rotate={180} />} onClick={() => setIsFlipped(!isFlipped)} />
//                             </Space>
//                         </Card>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default SemanticLibraryPage;





















import React, { useState, useCallback, useEffect } from 'react';
import { Select, Input, Button, Card, List, Spin, Image, Typography, Space, Divider } from 'antd';
import { SearchOutlined, BookOutlined, RetweetOutlined } from '@ant-design/icons';
import AUTHOR_INFO from '../../data/author_data';
import { handleReadBookClick } from '../../utils/handleReadBookClick';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const defaultAuthor = "Random";
const SemanticLibraryPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(defaultAuthor);
    const [submittedSearchValue, setSubmittedSearchValue] = useState('');
    const [imageError, setImageError] = useState({});

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
        return title.replace(/[\/\\\?\*\:\|\<\>\"\.\,\[\]]/g, '');
      }
      

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Title level={1}>The Perfect Way to Find Your Next Read</Title>
                <Text type="secondary">Search book sections by semantic meaning. Then, delve deeper as you please!</Text>
            </div>
            <Space align="center" style={{ display: 'flex', justifyContent: 'center', margin: '30px auto' }}>
                <Select defaultValue={defaultAuthor} style={{ width: 120 }} onChange={handleAuthorChange}>
                    <Option value={defaultAuthor}>{defaultAuthor}</Option>
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
                    style={{ width: '75%' }}
                />
            </Space>
            {isLoading && <Spin size="large" />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'calc(100vh - 200px)', position: 'relative' }}>
                {data && data.titles.map((title, index) => {
                    const currentAuthor = data.authors[index];
                    const heading = data.headings[index];
                    const bookImagePath = `/bookimages/${currentAuthor?.id}/${sanitizeTitleForFilename(title)}.png`;
                    const authorImagePath = `/images/${currentAuthor?.id}.png`;
                    console.log(bookImagePath);

                    return (
                        <Card style={{ width: '80%', marginTop: '20px' }} key={title}>
                            <Image 
                                src={imageError[title] ? authorImagePath : bookImagePath} 
                                alt={title} 
                                onError={() => handleImageError(title)}
                            />
                            <Divider />
                            <Card.Meta
                                title={<Title level={2}>{title}</Title>}
                                description={<Text type="secondary"><em>{currentAuthor?.id} | Page {heading}</em></Text>}
                            />
                            {!isFlipped ? (
                                <>
                                    <Text strong style={{fontSize: "16px", marginBottom: "10px"}}>Key Sentences: </Text>
                                    <List
                                        size="small"
                                        dataSource={data.summaries[index]}
                                        renderItem={sentence => <List.Item>{(sentence as string)?.trim()}</List.Item>}
                                    />
                                </>
                            ) : (
                                <Paragraph>{data.contents[index]}</Paragraph>
                            )}
                            <Space>
                                <Button type="primary" icon={<BookOutlined />} onClick={() => handleReadBookClick(currentAuthor.id, title)}>Read the whole book</Button>
                                <Button icon={isFlipped ? <RetweetOutlined /> : <RetweetOutlined rotate={180} />} onClick={() => setIsFlipped(!isFlipped)} />
                            </Space>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default SemanticLibraryPage;
