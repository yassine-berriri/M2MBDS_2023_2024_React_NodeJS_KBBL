import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';

const MySpinnerPopup = () => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal centered isOpen={modal} toggle={toggle} fade = {true} >
        <ModalHeader toggle={toggle}>Chargement</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <Spinner color="primary" type="grow">
              Loading...
            </Spinner>
            {' '}
            <Spinner color="secondary" type="grow">
              Loading...
            </Spinner>
            {' '}
            <Spinner color="success" type="grow">
              Loading...
            </Spinner>
            {' '}
            <Spinner color="danger" type="grow">
              Loading...
            </Spinner>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MySpinnerPopup;
