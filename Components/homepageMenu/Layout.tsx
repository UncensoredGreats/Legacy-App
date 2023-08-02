import HeaderProp from './header';
import useBackgroundPosition from '../../hooks/useBackgroundPosition';

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
      <div style={{paddingLeft: '0px'}}>
        {children}
      </div>
    </div>
  );
}



// export default function Layout({ children }) {
//   const backgroundPosition = useBackgroundPosition();

//   return (
//     <div style={{
//       position: 'relative',
//       minHeight: '100vh',
//       backgroundImage: `url('/images/WhiteOut.png')`,
//       backgroundPosition: backgroundPosition,
//       backgroundSize: 'cover',
//       backgroundAttachment: 'fixed',
//       backgroundBlendMode: 'multiply',
//       backgroundColor: 'rgba(255, 255, 255, 0.1)'
//     }}>
//       <HeaderProp />
//       <div style={{ paddingLeft: '0px' }}>
//         {children}
//       </div>
//     </div>
//   );
// }
