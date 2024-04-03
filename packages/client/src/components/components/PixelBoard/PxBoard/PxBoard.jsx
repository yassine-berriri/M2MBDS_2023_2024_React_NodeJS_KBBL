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
       // Supposons que `size` est toujours défini

  const [selectedColor, setSelectedColor] = useState('white');
  const [showPopupError, setShowPopupError] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [countdown, setCountdown] = useState(0); // Le compte à rebours initial est à 0
  const [canClick, setcanClick] = useState(true); // Le compte à rebours initial est à 0

  const [hoveredPixelHistory, setHoveredPixelHistory] = useState([]);
  const [pixelsData, setPixelsData] = useState([]);
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  let delay = myPxBoard ? myPxBoard.modificationDelai : 0;
  let sizeBackup = myPxBoard ? myPxBoard.size : 50;
  let pixelsBackup = myPxBoard ? myPxBoard.pixels : [];

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
  


  // fonction pour le mode hisotrique

    const handleMouseEnter = (x, y) => {
      // Effacez toutes les informations de survol précédentes.
      setHoveredPixel(null);
      setHoveredPixelHistory([]);

      // Annulez toute action en attente d'un survol précédent.
      if (timeoutId) clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
          const pixel = myPxBoard.pixels.find(p => p.x === x && p.y === y);
          if (pixel) {
              setHoveredPixel({ x, y, history: pixel.history || [] });
          } else {
              setHoveredPixel({ x, y, message: "Ce pixel est vierge." });
          }
      }, 3000); // Attendre 3 secondes avant de traiter.

      setTimeoutId(newTimeoutId); // Stockez l'ID pour une annulation future si nécessaire.
  };

    const handleMouseLeave = () => {
        // L'utilisateur a quitté le pixel; annulez l'action en attente.
        if (timeoutId) clearTimeout(timeoutId);
        setTimeoutId(null);

        // Effacez toutes les informations de survol pour éviter l'affichage obsolète.
        setHoveredPixel(null);
        setHoveredPixelHistory([]);
    };



  // fonction pour tous les modes


  const handleClickOnPixel = (x, y, isColored, defaultColor) =>{
    console.log("click", x, y, isColored, defaultColor)
    if (!canClick) {

     // handleShowPopupError("Vous ne pouvez pas modifier le tableau pour le moment. Veuillez attendre la fin du délai de modification .");
      return;
    }
    else {
       
       setcanClick(false);
       startCountdown(myPxBoard.modificationDelai);
        if (selectedColor !== 'white') {
        if (isColored) {
          if (myPxBoard.mode.includes("superposition")) {
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
   
    }

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
      const pixel = pixelsBackup.find(p => p.x === x && p.y === y);
      return (
        <Pixel key={`${x}-${y}`} 
        history={pixel ? pixel.history : []}
        canClick={canClick}
        selectedColor={selectedColor }
        defaultColor={pixel ? pixel.color : 'white'}  
        clickOnPixel={handleClickOnPixel}
              x = {x}
              y = {y} 
       {...(myPxBoard.mode.includes("historique") && { onMouseEnter: () => handleMouseEnter(x,y), onMouseLeave: handleMouseLeave })}

  
          
              />
      );
    });
  };

  const pixels = generatePixels(sizeBackup, sizeBackup, pixelsBackup);


  const startCountdown = (delay) => {
    setCountdown(delay); // Initialiser le compte à rebours avec le délai spécifié
    const intervalId = setInterval(() => {
      setCountdown((currentCountdown) => {
        if (currentCountdown <= 1) {
          clearInterval(intervalId); // Arrêter le compte à rebours lorsque 0 est atteint
          setcanClick(true);
          return 0;
        }
        setcanClick(false);
        return currentCountdown - 1;
      });
    }, 1000); // Décrémenter chaque seconde
  };
  

/*
  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setShowHistory(true);
    }, 3000); // Affiche l'historique après 3 secondes de survol
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setShowHistory(false);
  };

*/



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

        <h1>{myPxBoard?.title}</h1>
        <p>Date de fin: {new Date(myPxBoard?.endDate).toLocaleDateString()}</p>
        <p>Délai de modification: {myPxBoard?.modificationDelai} seconde</p>
        <p>Créé le: {new Date(myPxBoard?.createdAt).toLocaleDateString()}</p>
        <p>Mode: {myPxBoard?.mode.join(', ')}</p>

      
          <div className="countdownDisplay">
            Temps restant : {countdown} secondes
          </div>

      </div>

      <ColorPalette onSelectColor={setSelectedColor} />

      {showPopupError && <PopupError text={popupText} />}

      <div className="pxBoardMatrice" style={{ width: myPxBoard.size * 25 }}>
        {isLoading ? <div className="spinner"></div> : pixels}
      </div>

{
    hoveredPixel && (
        <div className="pixel-history-info">
            {hoveredPixel.message ? (
                <p>{hoveredPixel.message}</p>
            ) : (
                <>
                    <p>History for pixel at ({hoveredPixel.x}, {hoveredPixel.y}):</p>
                    {hoveredPixel.history && hoveredPixel.history.length > 0 ? (
                        hoveredPixel.history.map((h, index) => (
                            <p key={index}>Modified at {new Date(h.modifiedAt).toLocaleString()} to color {h.color}</p>
                        ))
                    ) : (
                        <p>No history available.</p>
                    )}
                </>
            )}
        </div>
    )
}

      

    </div>
  );
  
  
}

export default PxBoard;
