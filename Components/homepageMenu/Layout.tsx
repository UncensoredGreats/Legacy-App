// Just making header into a reusable component that goes to each tab/page.
import HeaderProp from './header';


// // OG
// export default function Layout({ children }) {
//   return (
//     <div>
//       <HeaderProp />
//       {children}
//     </div>
//   );
// }



// With dynamic flower background.
import useBackgroundPosition from '../../hooks/useBackgroundPosition'; // Replace with actual path to the hook

export default function Layout({ children }) {
  const backgroundPosition = useBackgroundPosition();

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
    }}>
      <HeaderProp />
      <div id="imageContainer" style={{
        backgroundImage: `url('/images/WhiteOut.png')`,
        backgroundPosition: backgroundPosition,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: '0.1',
        zIndex: -1,
      }}/>
      {children}
    </div>
  );
}
