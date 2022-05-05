import React from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { DataItemType } from "../../layouts/quotes";

interface PopupProps {
    show: boolean,
    data: DataItemType,
    hidePopup: () => void
}

const Popup = ({ show, data, hidePopup }: PopupProps) => {
    const title = data && data[0];
    const infoQuote = data && data[1];

    return (
        <Modal show={show} onHide={hidePopup}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {Object.entries(infoQuote).map(([key, value]) => (
                        <ListGroup.Item key={key + value}>
                            <strong>{key}</strong> : {value}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hidePopup}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Popup;