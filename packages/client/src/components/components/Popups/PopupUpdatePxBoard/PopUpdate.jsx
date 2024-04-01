import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Row, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {updatePxBoard, fetchPxBoard } from '../../../../redux/pxBoard/pxBoardThunk';
import { useDispatch } from 'react-redux';


function PopupEditPxBoard({ pxBoard, onUpdate }) {
  // Initialisation des états avec les valeurs actuelles de pxBoard
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(pxBoard.title);
  const [size, setSize] = useState(pxBoard.size);
  console.log("pxBoard dans popup",pxBoard);
  // Assurez-vous que la valeur est une chaîne pour le composant Input
  const [endDate, setEndDate] = useState(formatDate(pxBoard.endDate));
  const [modificationDelai, setModificationDelai] = useState(pxBoard.modificationDelai); // Converti en chaîne
  const [mode, setMode] = useState(pxBoard.mode || []);
  
  const [pxBoard2, seetPxBoard2] = useState(); // [A MODIFIER

  const availableSizes = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
  const availableDelais = [5,10,15,20,25,30]; // En secondes

  const toggle = () => {
    if (!modal) {
      // Réinitialiser les états avec les valeurs actuelles de pxBoard seulement si nous sommes sur le point d'ouvrir le modal
      setTitle(pxBoard.title);
      setSize(pxBoard.size);
      setEndDate(formatDate(pxBoard.endDate));
      setModificationDelai(pxBoard.modificationDelai);
      setMode(pxBoard.mode || []);
    }
    setModal(!modal);
  };
  
  const dispatch = useDispatch();

  const handleUpdate = () => {
    
    let _id = pxBoard._id;
    
    
    const updatedPxBoard = {
      _id,
      title,
      size,
      endDate,
      modificationDelai,
      mode,
    };
   
   dispatch(updatePxBoard( updatedPxBoard))
   .then(() => {
    dispatch(fetchPxBoard());
  });
    // Mettre à jour le pixelboard (à implémenter
    console.log("pxBoard dans update",_id, updatedPxBoard);
    console.log("title dans update",title, modificationDelai, mode, endDate);
    reset();
  };

  useEffect(() => {
    if (modal) {
      // Assurez-vous de réinitialiser les états seulement si le modal est ouvert pour éviter de le faire inutilement
      setTitle(pxBoard.title);
      setSize(pxBoard.size);
      setEndDate(formatDate(pxBoard.endDate));
      setModificationDelai(pxBoard.modificationDelai);
      setMode(pxBoard.mode || []);
    }
  }, [pxBoard, modal]); // Écouter les changements de pxBoard et modal
  

  const reset = () =>{

    toggle();
  }
  

  return (
    <div>
      <IconButton color="success"  onClick={toggle} aria-label="edit">
        <EditIcon />
      </IconButton>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>Modifier PixelBoard {title}</ModalHeader>
        <ModalBody>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="titleId">Titre</Label>
                <Input type="text" name="title" id="titleId" value={title} onChange={e => setTitle(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="sizeSelect">Taille</Label>
                <Input type="select" id="sizeSelect" name="size" value={size} onChange={e => setSize(e.target.value)}>
                    {availableSizes.map(s => (
                        <option key={s} value={s.toString()}>{s}*{s}</option>
                    ))}
                    </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="endDateId">Date de fin</Label>
                <Input type="date" name="endDate" id="endDateId" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="modificationDelaiSelect">Délai de modification (en secondes)</Label>
                <Input type="select" id="modificationDelaiSelect" name="modificationDelai" value={modificationDelai} onChange={e => setModificationDelai(e.target.value)}>
                  {availableDelais.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Mode</Label>
            <div className='buttonSpacing'>
                {["superposition", "historique"].map((modeOption, index) => (
                    <Button
                    key={index}
                    style={{ marginRight: index < ["superposition", "historique"].length - 1 ? '12px' : '0px' }}
                    className={index < ["superposition", "historique"].length - 1 ? "buttonSpacing" : ""}
                    color={mode.includes(modeOption) ? "primary" : "secondary"}
                    onClick={() => {
                        const newMode = mode.includes(modeOption) ? mode.filter(m => m !== modeOption) : [...mode, modeOption];
                        setMode(newMode);
                    }}>
                    {modeOption}
                    </Button>
                ))}
            </div>

          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>Sauvegarder</Button>
          <Button color="secondary" onClick={toggle}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();
  
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
  
    return [year, month, day].join('-');
  };
  
PopupEditPxBoard.propTypes = {
  pxBoard: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PopupEditPxBoard;
