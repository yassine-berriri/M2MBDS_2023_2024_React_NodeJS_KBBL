/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { FormGroup, Label, Input,   } from 'reactstrap';
import DropDownButton from '../Buttons/DropDownButton/DropDownButton';
import DropDownButtonDelai from '../Buttons/DropDownButtonDelai/DropDownButtonDelai';
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
import "./PopupCreatePxBoard.scss";

/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */

function PopupCreatePxBoard(props) {
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
  
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);
  const [boardSize, setBoardSize] = useState(10); 
  const [boardSizeLabel, setBoardSizeLabel] = useState("Choisisez la taille du PixelBoard");
  const [delai, setDelai] = useState(1); 
  const [delaiLabel, setDelaiLabel] = useState("Choisisez le dalai de modification");
  const todayDate = getTodayDate(); 
  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */

  const handleSelectSize = (size) => {
    setBoardSize(size);
    setBoardSizeLabel(`Taille sélectionnée : ${size}x${size}`);
    console.log(`Taille sélectionnée : ${size}x${size}`);
    // Ici, vous pouvez ajouter la logique pour ajuster la taille de votre PixelBoard
  };

  const handleSelectDelai = (size) => {
    setDelai(size);
    setDelaiLabel(`Delai sélectionné : ${size} secondes`);
    // Ici, vous pouvez ajouter la logique pour ajuster la taille de votre PixelBoard
  };


  function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janvier est 0 !
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }




  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
 

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div>
      <Button onClick={togglePopup} color='primary' className="open-button">Creer PixelBoard</Button>
      {isOpen && (
        <div className="popup-overlay">
        <div className="popup-content">
          <h3 className="popup-title">Créer un nouveau PixelBoard</h3> {/* Titre ajouté ici */}
          <FormGroup>
            <Label for="title">Titre</Label>
            <Input
              type="text"
              name="title"
              id="titleId"
              placeholder="Entrer le titre du pixelboard"
            />
      
            <Label for="taille">Taille</Label>
            <DropDownButton title={boardSizeLabel} onSelectSize={handleSelectSize} />
      
            <Label for="exampleDate">Date de fin</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              min={todayDate} // Définir l'attribut min avec la date du jour
            />
      
            <Label for="exampleMode">Delai de modification</Label>
            <DropDownButtonDelai title={delaiLabel} onSelectSize={handleSelectDelai} />
      
            <div className="buttons">
              <Button type="submit" color='success'>Envoyer</Button>
              <Button onClick={togglePopup} color='danger'>Fermer</Button>
            </div>
          </FormGroup>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default PopupCreatePxBoard;
