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
  const { rows = 50, cols = 50, idPx, MyPxBoard } = props;
  console.log("MyPxBoard = ", MyPxBoard)
 // const className = props.className ? `PxBoard ${props.className}` : "PxBoard";
//  const componentName = props.componentName
  //  ? `PxBoard ${props.componentName}`
   // : "PxBoard";
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */

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

 const  handleShowPopupError = (text) => {
    setPopupText(text);
    setShowPopupError(true);
  }

   

  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  

  useEffect(() => {
    console.log("id = ",idPx)
    const boardId = idPx;

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
    <div className="PxBoard"
    //  className={className}
      //project-component={componentName}
     // project-page={pageName}
    >
      <div style={boardStyle}>{pixels}</div>
      <ColorPalette onSelectColor={setSelectedColor} />

      {showPopupError && <PopupError text={popupText} />}

    </div>
  );
}

export default PxBoard;
