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
import { useDispatch, useSelector  } from 'react-redux'; 
import { createPxBoard } from '../../../redux/pxBoard/pxBoardThunk';
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
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState(""); // Exemple de state pour la date de fin [A MODIFIER
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


  const handleCreatePxBoard = async () => {
    // Structure de données à envoyer. Assurez-vous de remplir ceci avec toutes les données nécessaires.
    const data = {
      title: title,
      size: boardSize,
      modificationDelai: delai,
      endDate: endDate, // Exemple de récupération de la valeur directement depuis l'input
    };

    console.log("Données à envoyer pxBoard :", data);
    
    try{
      dispatch(createPxBoard(data)).unwrap();
      togglePopup();
      alert("PixelBoard créé avec succès");
    }
    catch (error) {
      console.error('Error creating pxBoard:', error.message);
      alert("Erreur lors de la création du PixelBoard");
    }
  };




  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  const dispatch = useDispatch();
  const pxBoardError = useSelector((state) => state.pxBoard.error);
  const pxBoards = useSelector((state) => state.pxBoard.pxBoards);

  console.log("pxBoards", pxBoards);
  console.log("pxBoardError", pxBoardError);



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
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Entrer le titre du pixelboard"
            />
      
            <Label for="taille">Taille</Label>
            <DropDownButton title={boardSizeLabel} onSelectSize={handleSelectSize} />
      
            <Label for="exampleDate">Date de fin</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              placeholder="date placeholder"
              min={todayDate} // Définir l'attribut min avec la date du jour
            />
      
            <Label for="exampleMode">Delai de modification</Label>
            <DropDownButtonDelai title={delaiLabel} onSelectSize={handleSelectDelai} />
      
            <div className="buttons">
              <Button type="submit" onClick={handleCreatePxBoard} color='success'>Envoyer</Button>
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
