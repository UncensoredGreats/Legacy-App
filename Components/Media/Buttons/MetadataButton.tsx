import React, { useState } from 'react';
import { Button, Icon, Modal, Popup } from 'semantic-ui-react';

type MetadataButtonProps = {
    metadata: any;
};

const MetadataButton: React.FC<MetadataButtonProps> = ({ metadata }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Popup
                trigger={
                    <Button
                        icon
                        color="brown"
                        size="mini"
                        style={{ margin: '0.3em' }}
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpen(true);
                        }}
                        >
                        <Icon name='medium m'/>
                    </Button>
                }
                content='Metadata'
                position='top center'
            />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Modal.Header>Raw input responsible for the creation of this message:</Modal.Header>
                <Modal.Content>
                    <p>{JSON.stringify(metadata, null, 2)}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='green'
                        onClick={(event) => {
                            event.stopPropagation();
                            setOpen(false);
                        }}
                        >
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default MetadataButton;
