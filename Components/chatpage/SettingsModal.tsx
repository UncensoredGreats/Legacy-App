// import React from 'react';
// import { Modal, Header, Button, Icon } from 'semantic-ui-react';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

// const SettingsModal = ({ open, onClose, maxTokens, temperature, breadth, onChangeMaxTokens, onChangeTemperature, onChangeBreadth }) => (
//   <Modal
//     open={open}
//     onClose={onClose}
//     size='small'
//   >
//     <Header icon='settings' content='Settings' />
//     <Modal.Content>
      // <div>
      //   <Header as='h4'>Sources: {breadth}</Header>
      //   <Slider min={1} max={10} step={1} value={breadth} onChange={onChangeBreadth} />
      // </div>
      // <div>
      //   <Header as='h4'>Response Length: {maxTokens}</Header>
      //   <Slider min={100} max={1000} step={10} value={maxTokens} onChange={onChangeMaxTokens} />
      // </div>
      // <div>
      //   <Header as='h4'>Temperature: {temperature}</Header>
      //   <Slider min={0.1} max={1} step={0.1} value={temperature} onChange={onChangeTemperature} />
      // </div>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button color='teal' onClick={onClose}>
//         <Icon name='checkmark' /> Save
//       </Button>
//     </Modal.Actions>
//   </Modal>
// );

// export default SettingsModal;













import React from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// type SettingsModalProps = {
//   breadth: number;
//   maxTokens: number;
//   temperature: number;
//   open: boolean;
//   promptStyle: number;
//   onChangePromptStyle: (value: number) => void;
// };

const SettingsModal = ({ open, onClose, maxTokens, temperature, breadth, promptStyle, onChangeMaxTokens, onChangeTemperature, onChangeBreadth, onChangePromptStyle }) => (
  <Modal
    open={open}
    onClose={onClose}
    size='small'
  >
    <Header icon='settings' content='Settings' />
    <Modal.Content>
      <div>
        <Header as='h4'>Authenticity: {(() => {
          switch (promptStyle) {
            case 1: return "Sources reflect in responses";
            case 5: return "Sources are required in responses";
            case 9: return "Sources are the response (AI doesn't even know what you ask)";
            default: return "";
          }
        })()}</Header>
        <Slider min={1} max={9} step={4} value={promptStyle} onChange={onChangePromptStyle} />
      </div>
      <div>
        <Header as='h4'>Sources: {breadth}</Header>
        <Slider min={1} max={10} step={1} value={breadth} onChange={onChangeBreadth} />
      </div>
      <div>
        <Header as='h4'>Response Length: {maxTokens}</Header>
        <Slider min={200} max={2000} step={10} value={maxTokens} onChange={onChangeMaxTokens} />
      </div>
      <div>
        <Header as='h4'>Temperature: {temperature}</Header>
        <Slider min={0.1} max={1} step={0.1} value={temperature} onChange={onChangeTemperature} />
      </div>
    </Modal.Content>
    <Modal.Actions>
      <Button color='teal' onClick={onClose}>
        <Icon name='checkmark' /> Save
      </Button>
    </Modal.Actions>
  </Modal>
);

export default SettingsModal;
