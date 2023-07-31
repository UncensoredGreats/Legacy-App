// import { useState, useEffect } from 'react';

// const useBackgroundScroll = () => {
//   const [backgroundSize, setBackgroundSize] = useState('100% 100%');

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
//       const newSize = `100% ${100 + scrollPos}%`;
//       setBackgroundSize(newSize);
//     };
  
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return backgroundSize;
// };

// export default useBackgroundScroll;
