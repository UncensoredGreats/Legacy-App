// pages/the-greats.tsx
import Layout from '../Components/homepageMenu/Layout';
import HomePage from '../Components/homepage/HomePage';
import AUTHOR_INFO from '../data/author_data';

export default function TheGreatsPage() {
  return (
    <Layout>
      <HomePage authors={AUTHOR_INFO} />
    </Layout>
  );
}
