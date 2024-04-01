/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import {useEffect, useState} from "react";
import Pixel from "../Pixel/Pixel";
import ColorPalette from "../ColorPalette/ColorPalette";
import io from 'socket.io-client';

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

  const boardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: size * 10, // Changez '10' en fonction de la largeur réelle de chaque Pixel
    // Largeur totale du tableau
     // Optionnel, pour encadrer le tableau
  };

  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */

  
  const handleClickOnPixel = (x, y) =>{
    console.log("click", x, y)
    socket.emit('addPixel', { pxBoardId: idPx, x, y, color: selectedColor });

    //socket.emit('addPixel', { pxBoardId: "6606beb983b0aeea038e1764", x: 5, y: 10, color: '#ff0000' });
    socket.emit('updatePixel', { pxBoardId: "6606beb983b0aeea038e1764", x: 5, y: 10, color: '#ff0000' });
   // socket.emit('deletePixel', { pxBoardId: "6606beb983b0aeea038e1764", x: 5, y: 10, color: '#ff0000' });
  }
/*
    // Créer une liste de composants Pixel
    const pixels = [];
    for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = y * cols + x;
      pixels.push(
        <Pixel
          clickOnPixel={() => handleClickOnPixel(x, y)} // Modifié pour passer x et y
          key={index}
          selectedColor={selectedColor}
        />
      );
    }
  }
*/

   
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

    
    
    return () => {
      socket.disconnect();
      socket.emit('leaveBoard', boardId)
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

      <div className="pxBoardMatrice" style={{ width: myPxBoard.size * 25 }}>
        {isLoading ? <div className="spinner"></div> : pixels}
      </div>
    </div>
  );
  
  
}

export default PxBoard;
