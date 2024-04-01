/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import {useEffect, useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
import "./PopupError.scss";
/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */

function PopupError(props) {
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
  const { pageName,  text} = props;
  const className = props.className ? `PopupError ${props.className}` : "PopupError";
  const componentName = props.componentName
    ? `PopupError ${props.componentName}`
    : "PopupError";
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */
  
  const [modal, setModal] = useState(true);
  
  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */
  const toggle = () => setModal(!modal);
  
    
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
    
    <Modal
      isOpen={modal}
      modalTransition={{ timeout: 500 }}
      backdropTransition={{ timeout: 1000 }}
      toggle={toggle}
      className={className}
      centered
    >
      <ModalHeader toggle={toggle}>Alert</ModalHeader>
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



export default PopupError;
