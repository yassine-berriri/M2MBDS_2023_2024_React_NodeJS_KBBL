/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Pixel from "../Pixel/Pixel";
import ColorPalette from "../ColorPalette/ColorPalette";
import { MySpinnerPopup, PopupError } from "../../../components";
import { TailSpin } from 'react-loader-spinner';
import { useSocket } from '../../../../hooks/useSocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';

import AnimatedTitle from "../../Animated/AnimatedTitle";


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
import { fetchPxBoardById } from "../../../../redux/pxBoard/pxBoardThunk";
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
  const { idPx, myPxBoard} = props;
  const socket = useSocket();
  const dispatch = useDispatch();

 // const className = props.className ? `PxBoard ${props.className}` : "PxBoard";
//  const componentName = props.componentName
  //  ? `PxBoard ${props.componentName}`
   // : "PxBoard";
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */
  
    const [isLoading, setIsLoading] = useState(true);
  
    
       // Supposons que `size` est toujours défini

  const [selectedColor, setSelectedColor] = useState('white');
  const [showPopupError, setShowPopupError] = useState();
  const [popupText, setPopupText] = useState("");

  const [countdown, setCountdown] = useState(0); // Le compte à rebours initial est à 0
  const [canClick, setcanClick] = useState(true); // Le compte à rebours initial est à 0

  const [hoveredPixelHistory, setHoveredPixelHistory] = useState([]);
  const [pixelsData, setPixelsData] = useState([]);
  const [hoveredPixel, setHoveredPixel] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  let delay = myPxBoard ? myPxBoard.modificationDelai : 0;

  const { pxBoard, loading, error } = useSelector(state => state.pxBoard);

  const [showIndicator, setShowIndicator] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('white'); 
  


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

    const handleMouseEnter = (x, y, mode) => {
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
  


 const  handleShowPopupError = (text) => {
    setPopupText(text);
    setShowPopupError(true);
  }

   


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




  /**************Test**************************** */
  const [pixelsState, setPixelsState] = useState(() => {
    return generateInitialPixels(myPxBoard);
  });

  
  
  function generateInitialPixels(myPxBoard) {
  
    const size = myPxBoard?.size || 50; // Utilisez une taille par défaut si non spécifié
    return Array.from({ length: size * size }, (_, index) => {
      const x = index % size;
      const y = Math.floor(index / size);
      const pixel = myPxBoard?.pixels?.find(p => p.x === x && p.y === y) || {};
    
  
      return { x, y, color: pixel.color || undefined }; // Retourne un objet pour chaque pixel
    });
  
  }

  function addOrUpdatePixel(x, y, selectedColor, emit) {
    if (!canClick) {

     // handleShowPopupError("Vous ne pouvez pas modifier le tableau pour le moment. Veuillez attendre la fin du délai de modification .");
      return;
    }
       else {
       
       setcanClick(false);
       startCountdown(myPxBoard.modificationDelai);
    let action = 'nothing';
    setPixelsState(prevState => {
      const pixelIndex = prevState?.findIndex(p => p.x === x && p.y === y);
      const userId =localStorage.getItem('id');
      if(!userId){
        const userId ='none';
      }
      const newPixel = {userId,x, y, color:selectedColor};
      console.log("newPixel==== ", newPixel)
      console.log("pixelIndex==== ", prevState[pixelIndex])
      console.log("selectedColor==== ", selectedColor)
      console.log("prevState[pixelIndex].color==== ", prevState[pixelIndex].color)
      console.log("myPxBoard.mode.includes(superposition)==== ", myPxBoard.mode.includes("superposition"))
  
      // Si le pixel existe déjà, mettez-le à jour
      if (pixelIndex !== -1) {
        const newState = [...prevState];
        console.log("selectedColor", selectedColor)
        if (selectedColor !== "#FFFFFF") {
        if ( prevState[pixelIndex].color !== undefined) {
          if (myPxBoard.mode.includes("superposition")) {
          console.log("updatePixel", x, y, selectedColor)
          action = 'update';
         // socket.emit('updatePixel', { pxBoardId: idPx, x, y, color: selectedColor });
          newState[pixelIndex] = newPixel;
          }
          else {
            console.log("showError")
            action = "error";
          }
        }
        else {
          console.log("addPixel",userId,idPx, x, y, selectedColor)
          action = "add";
          //socket.emit('addPixel', { pxBoardId: idPx, x, y, color: selectedColor });

          newState[pixelIndex] = newPixel;
        }
      }
      else {
        if (prevState[pixelIndex].color !== undefined) {
          console.log("deletePixel", x, y, selectedColor)
          action = "delete";
        //socket.emit('deletePixel', { pxBoardId: idPx, x, y, color: selectedColor });
        newState[pixelIndex] = newPixel;
        }
        else {
          console.log("nothing to do")
          startCountdown(0);
        }
      }

      if (emit){
        if (action === "add"){
          console.log("addPixel emit = true")
          console.log("addPixel emit = true",idPx, x, y, selectedColor)
          socket.emit('addPixel', {userId, pxBoardId: idPx, x, y, color: selectedColor });
        }
        else if (action === "update"){
          console.log("updatePixel emit = true",idPx, x, y, selectedColor)
          socket.emit('updatePixel', { pxBoardId: idPx, x, y, color: selectedColor });
        }
        else if (action === "delete") {
          socket.emit('deletePixel', { pxBoardId: idPx, x, y, color: selectedColor });
        }
        else if (action === "error") {
          setcanClick(true);
          startCountdown(0);
          handleShowPopupError("Vous ne pouvez pas superposer les couleurs sur ce tableau, le mode dans ce pixelBoard est désactivé.")
        }
        else {
          console.log("nothing to emit")
        
        }
      }
      
        return newState;
      }
      else (
        handleShowPopupError("Vous ne pouvez pas ajouter un pixel en dehors de la matrice.")
      )
       
     
      
      
    });
    
    }

    console.log("emit = ", emit)
    }
    
    const addPixel = (x, y, color) => {
      setPixelsState(prevState => {
        // S'assurer que prevState est un tableau pour éviter l'erreur "not iterable"
        const currentState = Array.isArray(prevState) ? prevState : [];
        
        const pixelIndex = currentState.findIndex(p => p.x === x && p.y === y);
        
        if (pixelIndex !== -1) {
          // Si le pixel existe déjà, mettre à jour la couleur
          const newState = [...currentState];
          newState[pixelIndex] = { x, y, color };
          console.log("newState", newState)
          return newState;
        } else {
          // Si le pixel n'existe pas, l'ajouter au tableau
          return [...currentState];
        }
      });
    };


    const handleSelectColor = (color) => {
      setSelectedColor(color);
      setShowIndicator(true); 
      setColor(color)
    }


  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  

  useEffect(() => {
    console.log("id = ",idPx)
    const boardId = idPx;

    if (myPxBoard && myPxBoard.pixels) {
     // setIsLoading(false);
      // Autres actions après le chargement, si nécessaire
    }

    
    socket?.emit('joinBoard', idPx);
    
     // Écoute pour les pixels ajoutés
    socket.on('pixelAdded', (data) => {
      const {userId, x, y, color } = data;
      addPixel(userId ,x, y, color);
    //  addOrUpdatePixel(x, y, color, false);
        console.log(`Pixel ajouté à ${userId} x: ${x}, y: ${y} avec la couleur: ${color}`);

    });

    socket.on('pixelUpdated', (data) => {
      const { x, y, color } = data;
      addOrUpdatePixel(x, y, color, false);
      console.log(`Pixel mis à jour à x: ${x}, y: ${y} avec la couleur: ${color}`);
    });

    socket?.on('pixelDeleted', (data) => {
      const { x, y, color } = data;
      addOrUpdatePixel(x, y, color, false);
      console.log(`Pixel supprimé à x: ${x}, y: ${y} avec la couleur: ${color}`);
    });


  // Écoute pour les actions échouées
  socket?.on('actionFailed', (message) => {
    console.error(message);
    handleShowPopupError("Une erreur est survenue sur notre serveur. Veuillez vérifier votre connexion et essayer à nouveau.")

    // Affichez le message d'erreur à l'utilisateur si nécessaire
  });


    return () => {
      socket?.off('pixelAdded');
      socket?.off('pixelUpdated');
      socket?.off('pixelDeleted');
      //
    
      
    };
  
  }, [socket]);

  useEffect(() => {
    dispatch(fetchPxBoardById(idPx));
}, [dispatch, idPx]); // Assurez-vous de mettre idPx comme dépendance si nécessaire

useEffect(() => {
    if (!loading && !error && pxBoard) {
      console.log("pxBoard", pxBoard);
      
        setPixelsState(generateInitialPixels(pxBoard));
    }
}, [loading, error, pxBoard]);

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 6000); 
  return () =>{
    setPixelsState([]);
    console.log("test socket leaveBoard");
    socket.emit('leaveBoard', idPx);
    socket.disconnect();
    clearTimeout(timer);
  }
 
}, [])


  // Gestionnaire pour mettre à jour la position du curseur
  /*
  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    if (showIndicator) {
      window.addEventListener('mousemove', updateCursorPosition);
    }
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [showIndicator]);
  */

    /* --------------------------------------------------------------------
   *                                 Style                                |
   * --------------------------------------------------------------------
   */

    // États existants
  const [zoomLevel, setZoomLevel] = useState(1); // 1 est le niveau de zoom initial

  // Fonction pour zoomer
  const handleZoomIn = () => {
    setZoomLevel(zoomLevel => zoomLevel * 1.2); // Zoom in de 20%
  };

  // Fonction pour dézoomer
  const handleZoomOut = () => {
    setZoomLevel(zoomLevel => zoomLevel / 1.2); // Zoom out de 20%
  };

   // Styles dynamiques pour la matrice, incluant le zoom
   const pxBoardMatriceStyle = {
    width: `${myPxBoard?.size * 25}px`,
    transform: `scale(${zoomLevel})`, // Applique le zoom
    transformOrigin: 'top center', // Ajustez selon les besoins
    transition: 'transform 0.2s' // Effet de transition douce
  };

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    
    <div className="PxBoard">
      {console.log("isLoading +++++", isLoading)}
    {isLoading ? (
      // Affiche le loader si isLoading est vrai
     <div> <MySpinnerPopup/> </div>
    ) : (
      // Utilisez un fragment ou une div englobante pour contenir plusieurs éléments
      <>
        <div className="pxBoardInfo">

          <AnimatedTitle title={myPxBoard?.title} />
          
          <p> <b>Date de fin: </b> {new Date(myPxBoard?.endDate).toLocaleDateString()}  <b> Créé le:  </b>{new Date(myPxBoard?.createdAt).toLocaleDateString()} </p>

          <p> <b> Mode: </b> {myPxBoard?.mode.join(', ')} <b>Délai de modification:</b> {myPxBoard?.modificationDelai} seconde </p>

          
          <div className="countdownDisplay">
            Temps restant : {countdown} secondes
          </div>
        </div>
  
        <ColorPalette onSelectColor={handleSelectColor} />

         {/* Carré qui change de couleur */}
         <div className="color-selected">
            <p>Couleur sélectionnée</p>
         <div className="color-preview" style={{ backgroundColor: selectedColor}}>
                {/* Ce div change de couleur basé sur selectedColor */}
            </div>
            </div>

        <div className="zoom-controls">
         <Button color="primary" className="zoom-button" onClick={handleZoomIn}>
          <FontAwesomeIcon icon={faSearchPlus} /> 
        </Button>
          <Button color="secondary" className="zoom-button" onClick={handleZoomOut}>
        <FontAwesomeIcon icon={faSearchMinus} /> 
        </Button>
</div>
        {showPopupError && <PopupError text={popupText} clicked={() => setShowPopupError(false)} />}
        
        <div className="pxBoardMatrice" style={pxBoardMatriceStyle}>
          {!error && pixelsState?.map(({ x, y, color, history, mode }) => (
            <Pixel key={`${x}-${y}`}
                  history={history}
                  canClick={canClick}
                   selectedColor={selectedColor}
                   defaultColor={color}
                   clickOnPixel={() => addOrUpdatePixel(x, y, selectedColor, true)}
                   x={x}
                   y={y}
                   initColor={color} 
                   {...(myPxBoard.mode.includes("historique") && { onMouseEnter: () => handleMouseEnter(x,y, mode), onMouseLeave: handleMouseLeave })}

                   />
          ))}
        </div>
        
        {
          hoveredPixel && (
        <div className="pixel-history-info">
            {hoveredPixel.message ? (
                <p>{hoveredPixel.message}</p>
            ) : (
                <>
                    <h4>History for pixel at ({hoveredPixel.x}, {hoveredPixel.y})</h4>
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
  
        {error && <PopupError text="Une erreur est survenue sur notre serveur. Veuillez vérifier votre connexion et essayer à nouveau." clicked={() => setShowPopupError(false)} />}
      </>
    )}
  </div>
  );
  
  
}

export default PxBoard;
