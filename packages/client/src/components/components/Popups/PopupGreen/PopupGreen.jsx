import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./PopupGreen.scss";

function PopupGreen(props) {
  const { text, clicked } = props;
  const [modal, setModal] = useState(true);

  const toggle = () => {
    if(clicked) clicked(); // Call the clicked function if provided
    setModal(!modal);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="PopupGreen">
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 200 }}
        toggle={toggle}
        className="PopupGreen"
        centered
      >
        <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
        <ModalBody>
          {text}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PopupGreen;
