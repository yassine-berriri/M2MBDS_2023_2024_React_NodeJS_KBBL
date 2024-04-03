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

  
  const handleClickOnPixel = (x, y, isColored, initColor) =>{
    console.log("click", x, y, isColored, initColor)
    if (selectedColor !== 'white') {
    if (isColored || initColor !== undefined) {
      if (myPxBoard.mode.includes("superposition")) {
      console.log("updatePixel", x, y, selectedColor)
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
    if (isColored || initColor !== undefined) {
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
      const pixel = pixelsBackup.find(p => p.x === x && p.y === y);
      
      return (
        <Pixel key={`${x}-${y}`} 
             selectedColor={selectedColor}
              defaultColor={pixel ? pixel.color : 'white'} 
              clickOnPixel={handleClickOnPixel}
              x = {x}
              y = {y} 
              initColor={pixel?.color}
              />
      );
    });
  };

  const pixels = generatePixels(sizeBackup, sizeBackup, pixelsBackup);



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
    let action = 'nothing';
    setPixelsState(prevState => {
      const pixelIndex = prevState?.findIndex(p => p.x === x && p.y === y);
      const newPixel = { x, y, color:selectedColor};
      console.log("newPixel==== ", newPixel)
      console.log("pixelIndex==== ", prevState[pixelIndex])
      console.log("selectedColor==== ", selectedColor)
      console.log("prevState[pixelIndex].color==== ", prevState[pixelIndex].color)
      console.log("myPxBoard.mode.includes(superposition)==== ", myPxBoard.mode.includes("superposition"))
  
      // Si le pixel existe déjà, mettez-le à jour
      if (pixelIndex !== -1) {
        const newState = [...prevState];
     
        if (selectedColor !== undefined) {
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
          console.log("addPixel",idPx, x, y, selectedColor)
          action = "add";
          //socket.emit('addPixel', { pxBoardId: idPx, x, y, color: selectedColor });

          newState[pixelIndex] = newPixel;
        }
      }
      else {
        if (newPixel.color !== undefined) {
          action = "delete";
        //socket.emit('deletePixel', { pxBoardId: idPx, x, y, color: selectedColor });
        newState[pixelIndex] = newPixel;
        }
      }

      if (emit){
        if (action === "add"){
          console.log("addPixel emit = true")
          console.log("addPixel emit = true",idPx, x, y, selectedColor)
          socket.emit('addPixel', { pxBoardId: idPx, x, y, color: selectedColor });
        }
        else if (action === "update"){
          console.log("updatePixel emit = true",idPx, x, y, selectedColor)
          socket.emit('updatePixel', { pxBoardId: idPx, x, y, color: selectedColor });
        }
        else if (action === "delete") {
          socket.emit('deletePixel', { pxBoardId: idPx, x, y, color: selectedColor });
        }
        else if (action === "error") {
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
      const { x, y, color } = data;
      addPixel(x, y, color);
    //  addOrUpdatePixel(x, y, color, false);
        console.log(`Pixel ajouté à x: ${x}, y: ${y} avec la couleur: ${color}`);

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
  }, 6000); // 5000 millisecondes = 5 secondes
  return () =>{
    setPixelsState([]);
    console.log("test socket leaveBoard");
    socket.emit('leaveBoard', idPx);
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
          <h1>{myPxBoard?.title}</h1>
          <p>Date de fin: {new Date(myPxBoard?.endDate).toLocaleDateString()}</p>
          <p>Délai de modification: {myPxBoard?.modificationDelai} seconde</p>
          <p>Créé le: {new Date(myPxBoard?.createdAt).toLocaleDateString()}</p>
          <p>Mode: {myPxBoard?.mode.join(', ')}</p>
        </div>
  
        <ColorPalette onSelectColor={handleSelectColor} />
  
        {showPopupError && <PopupError text={popupText} clicked={() => setShowPopupError(false)} />}
        
        <div className="pxBoardMatrice" style={{ width: myPxBoard?.size * 25 }}>
          {!error && pixelsState?.map(({ x, y, color }) => (
            <Pixel key={`${x}-${y}`}
                   selectedColor={selectedColor}
                   defaultColor={color}
                   clickOnPixel={() => addOrUpdatePixel(x, y, selectedColor, true)}
                   x={x}
                   y={y}
                   initColor={color} />
          ))}
        </div>
  
        {error && <PopupError text="Une erreur est survenue sur notre serveur. Veuillez vérifier votre connexion et essayer à nouveau." clicked={() => setShowPopupError(false)} />}
      </>
    )}
  </div>
  
  );
  
  
}

export default PxBoard;
