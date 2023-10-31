// // In your pages folder structure (e.g. semantic-library.tsx)
// import Layout from '../Components/homepageMenu/Layout';
// import SemanticLibrarySearch from '../Components/SemanticLibrary/SemanticLibraryPage';

// export default function SemanticLibrary() {
//   return (
//     <Layout>
//       <SemanticLibrarySearch />
//     </Layout>
//   );
// }








// import { useState, useEffect } from 'react';
// import Layout from '../Components/homepageMenu/Layout';
// import SemanticLibrarySearch from '../Components/SemanticLibrary/SemanticLibraryPage';

// export default function SemanticLibrary() {
//   // State for modal visibility
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     // if (!localStorage.getItem('visitedBefore')) {
//       setShowModal(true);
//       // localStorage.setItem('visitedBefore', 'true');
//     // }
//   }, []);

//   return (
//     <Layout>
//       {showModal && (
//       <>
//       <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         zIndex: 999
//       }}></div>
//         <div style={{
//           position: 'fixed',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           backgroundColor: '#ffffff',
//           padding: '24px',
//           zIndex: 1000,
//           borderRadius: '12px',
//           boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//           textAlign: 'center',
//         }}>
//           <h2 style={{
//             fontFamily: 'Arial, sans-serif',
//             fontSize: '1.8em',
//             marginBottom: '16px',
//           }}>
//             We're Moving!
//           </h2>
//           <p style={{
//             fontFamily: 'Georgia, serif',
//             fontSize: '1.2em',
//             lineHeight: '1.6',
//             marginBottom: '24px',
//           }}>
//             In our commitment to offering an alternative to Big Tech AI, we are migrating to the Internet Computer Blockchain.
//           </p>

//           <p style={{
//             fontFamily: 'Georgia, serif',
//             fontSize: '1.2em',
//             lineHeight: '1.6',
//             marginBottom: '24px',
//           }}>
//             This transition will free us from the confines of the 7 Big Tech cloud service on which this app currently relies. It's also enabling us to make every element you see here ownable and tradeable, which we hope makes this a place of unparrelled intellectual freedom for content creators, AI researchers, and authors.
//           </p>

//           <p style={{
//             fontFamily: 'Georgia, serif',
//             fontSize: '1.2em',
//             lineHeight: '1.6',
//             marginBottom: '24px',
//           }}>
//             For the latest updates, follow @uncensrdgreats.
//           </p>

//           <button onClick={() => setShowModal(false)} style={{
//             backgroundColor: '#4285F4',
//             color: '#ffffff',
//             padding: '12px 24px',
//             borderRadius: '6px',
//             border: 'none',
//             cursor: 'pointer',
//             transition: 'background-color 0.3s',
//           }}
//           onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#357ae8'}
//           onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285F4'}
//           >
//             Got it!
//           </button>
//         </div>
//         </>
//       )}
//       <SemanticLibrarySearch />
//     </Layout>
//   );
  
// }










import { useState, useEffect } from 'react';
import Layout from '../Components/homepageMenu/Layout';
import SemanticLibrarySearch from '../Components/SemanticLibrary/SemanticLibraryPage';

const ModalBackdrop = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  }}></div>
);

const ModalContent = ({ onClose }) => (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '24px',
    zIndex: 1000,
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
  }}>
    <h2 style={typographyStyles.header}>We're Moving!</h2>
    <p style={typographyStyles.paragraph}>In our commitment to offering an alternative to Big Tech AI, we are migrating to the Internet Computer Blockchain.</p>
    <p style={typographyStyles.paragraph}>This transition will free us from the confines of the 7 Big Tech cloud service on which this app currently relies. It's also enabling us to make every element you see here ownable and tradeable, which we hope makes this a place of unparalleled intellectual freedom for content creators, AI researchers, and authors.</p>
    <p style={typographyStyles.paragraph}>For the latest updates, follow @uncensrdgreats.</p>
    <button
      onClick={onClose}
      style={buttonStyles.default}
      onMouseOver={e => e.currentTarget.style.backgroundColor = '#357ae8'}
      onMouseOut={e => e.currentTarget.style.backgroundColor = '#4285F4'}
    >
      Got it!
    </button>
  </div>
);

const typographyStyles = {
  header: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '1.8em',
    marginBottom: '16px',
  },
  paragraph: {
    fontFamily: 'Georgia, serif',
    fontSize: '1.2em',
    lineHeight: '1.6',
    marginBottom: '24px',
  }
};

const buttonStyles = {
  default: {
    backgroundColor: '#4285F4',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};

export default function SemanticLibrary() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <Layout>
      {showModal && (
        <>
          <ModalBackdrop />
          <ModalContent onClose={() => setShowModal(false)} />
        </>
      )}
      <SemanticLibrarySearch />
    </Layout>
  );
}
