/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import {useEffect, useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
/*
 * ----------------------------------------------------------------------
 *                              Services & Models                       |
 * ----------------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------------
 *                                Styles                                |
 * ----------------------------------------------------------------------
 */
import "./PopupDelete.scss";
/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */

function PopupDelete(props) {
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
  const { pageName, children, text,onDelete} = props;
  const className = props.className ? `PopupDelete ${props.className}` : "PopupDelete";
  const componentName = props.componentName
    ? `PopupDelete ${props.componentName}`
    : "PopupDelete";
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */
  
  const [modal, setModal] = useState(false);
  
  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */
  const toggle = () => setModal(!modal);
  const functionAppeler = () => {
    onDelete();
    toggle();
  }
    
  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  useEffect(() => {
    window.scroll(0,0);
  }, [])

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div
      className={className}
      project-component={componentName}
      project-page={pageName}
    >
         <IconButton color="error" onClick={toggle} aria-label="delete">
                              <DeleteIcon />
                              </IconButton>
    
    <Modal
      isOpen={modal}
      modalTransition={{ timeout: 500 }}
      backdropTransition={{ timeout: 1000 }}
      toggle={toggle}
      className={className}
      centered
    >
      <ModalHeader toggle={toggle}>Popup de Suppression</ModalHeader>
      <ModalBody>
            {text}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={functionAppeler}>
          Supprimer
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Exit
        </Button>
      </ModalFooter>
    </Modal>
   
  </div>
  );
}



export default PopupDelete;
