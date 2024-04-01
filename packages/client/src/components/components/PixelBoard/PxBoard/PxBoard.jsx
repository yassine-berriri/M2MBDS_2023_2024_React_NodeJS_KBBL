/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import {useEffect, useState} from "react";
import Pixel from "../Pixel/Pixel";
import ColorPalette from "../ColorPalette/ColorPalette";
import io from 'socket.io-client';
import { PopupError } from "../../../components";

import { TailSpin } from 'react-loader-spinner';

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
import "./PxBoard.scss";
/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */

function PxBoard(props) {
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
  const { REACT_APP_API_URL } = process.env;
  const socket = io(REACT_APP_API_URL);

  const { idPx, myPxBoard} = props;
 // const className = props.className ? `PxBoard ${props.className}` : "PxBoard";
//  const componentName = props.componentName
  //  ? `PxBoard ${props.componentName}`
   // : "PxBoard";
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */
  
    const [isLoading, setIsLoading] = useState(true);
    const [pxBoard, setPxBoard] = useState(null);
    const { size } = myPxBoard; // Supposons que `size` est toujours défini

  const [selectedColor, setSelectedColor] = useState('white');
  const [showPopupError, setShowPopupError] = useState(false);
  const [popupText, setPopupText] = useState("");
  let sizeBackup = MyPxBoard ? MyPxBoard.size : 50;
  const boardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: sizeBackup * 25 ,
   // Largeur totale du tableau

     // Optionnel, pour encadrer le tableau
  };

  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */

  
  const handleClickOnPixel = (x, y, isColored) =>{
    console.log("click", x, y, isColored)
    if (selectedColor !== 'white') {
    if (isColored) {
      if (MyPxBoard.mode.includes("superposition")) {
      socket.emit('updatePixel', { pxBoardId: idPx, x, y, color: selectedColor });
      }
      else {
        handleShowPopupError("Vous ne pouvez pas superposer les couleurs sur ce tableau, le mode dans ce pixelBoard est désactivé.")
      }
    }
    else {
      console.log("addPixel", x, y, selectedColor)
      socket.emit('addPixel', { pxBoardId: idPx, x, y, color: selectedColor });
    }
  }
  else {
    if (isColored) {
    socket.emit('deletePixel', { pxBoardId: idPx, x, y, color: selectedColor });
    }
  }
   
    //socket.emit('addPixel', { pxBoardId: "6606beb983b0aeea038e1764", x: 5, y: 10, color: '#ff0000' });
   // socket.emit('deletePixel', { pxBoardId: "6606beb983b0aeea038e1764", x: 5, y: 10, color: '#ff0000' });
  }
  
/*
    // Créer une liste de composants Pixel
    const pixels = [];
    for (let y = 0; y < sizeBackup; y++) {
    for (let x = 0; x < sizeBackup; x++) {
      const key = `pixel-${x}-${y}`;
      pixels.push(
        <Pixel
          clickOnPixel={handleClickOnPixel} // Modifié pour passer x et y
          key={key}
          selectedColor={selectedColor}
          x = {x}
          y = {y}
        />
      );
    }
  }
*/

 const  handleShowPopupError = (text) => {
    setPopupText(text);
    setShowPopupError(true);
  }

   
  // Générer les pixels basés sur les données de `myPxBoard`
  const generatePixels = () => {
    // Assurez-vous que `myPxBoard` et `myPxBoard.size` sont définis
    const size = myPxBoard?.size || 50; // Utilisez une taille par défaut si non spécifié
    return Array.from({ length: size * size }, (_, index) => {
      const x = index % size;
      const y = Math.floor(index / size);
      const pixel = myPxBoard.pixels?.find(p => p.x === x && p.y === y);
      return (
        <Pixel key={`${x}-${y}`} 
             selectedColor={selectedColor}
              defaultColor={pixel ? pixel.color : 'white'} 
              clickOnPixel={() => handleClickOnPixel(x, y)
                
              } />
      );
    });
  };

  const pixels = generatePixels(myPxBoard.size, myPxBoard.size, myPxBoard.pixels);

  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  

  useEffect(() => {
    console.log("id = ",idPx)
    const boardId = idPx;

    if (myPxBoard && myPxBoard.pixels) {
      setIsLoading(false);
      // Autres actions après le chargement, si nécessaire
    }

    socket.emit('joinBoard', boardId);


     // Écoute pour les pixels ajoutés
    socket.on('pixelAdded', (data) => {
      const { x, y, color } = data;
        console.log(`Pixel ajouté à x: ${x}, y: ${y} avec la couleur: ${color}`);

  });

  // Écoute pour les actions échouées
  socket.on('actionFailed', (message) => {
    console.error(message);
    handleShowPopupError("Une erreur est survenue sur notre serveur. Veuillez vérifier votre connexion et essayer à nouveau.")
    // Affichez le message d'erreur à l'utilisateur si nécessaire
  });


    
    
    return () => {
      socket.emit('leaveBoard', boardId)
      socket.disconnect();
    };
  
  }, [idPx]);

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div className="PxBoard">
      <div className="pxBoardInfo">
        <h1>{myPxBoard.title}</h1>
        <p>Date de fin: {new Date(myPxBoard.endDate).toLocaleDateString()}</p>
        <p>Délai de modification: {myPxBoard.modificationDelai} seconde</p>
        <p>Créé le: {new Date(myPxBoard.createdAt).toLocaleDateString()}</p>
        <p>Mode: {myPxBoard.mode.join(', ')}</p>
      </div>
      <ColorPalette onSelectColor={setSelectedColor} />

      {showPopupError && <PopupError text={popupText} />}

      <div className="pxBoardMatrice" style={{ width: myPxBoard.size * 25 }}>
        {isLoading ? <div className="spinner"></div> : pixels}
      </div>
    </div>
  );
  
  
}

export default PxBoard;
