// In your pages folder structure (e.g. semantic-library.tsx)
import Layout from '../Components/homepageMenu/Layout';
import SemanticLibrarySearch from '../Components/SemanticLibrary/SemanticLibraryPage';

export default function SemanticLibrary() {
  return (
    <Layout>
      <SemanticLibrarySearch />
    </Layout>
  );
}
