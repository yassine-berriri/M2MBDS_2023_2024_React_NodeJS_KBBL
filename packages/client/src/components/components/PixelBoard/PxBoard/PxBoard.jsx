/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import {useEffect, useState} from "react";
import Pixel from "../Pixel/Pixel";
import ColorPalette from "../ColorPalette/ColorPalette";
import io from 'socket.io-client';


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
  const { rows = 50, cols = 50, idPx } = props;
 // const className = props.className ? `PxBoard ${props.className}` : "PxBoard";
//  const componentName = props.componentName
  //  ? `PxBoard ${props.componentName}`
   // : "PxBoard";
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */

  const [selectedColor, setSelectedColor] = useState('white');

  const boardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: cols * 50,
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
  }

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

   

  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  

  useEffect(() => {
    console.log("id = ",idPx)
    const boardId = idPx;

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
    <div className="PxBoard"
    //  className={className}
      //project-component={componentName}
     // project-page={pageName}
    >
      <div style={boardStyle}>{pixels}</div>
      <ColorPalette onSelectColor={setSelectedColor} />
    </div>
  );
}

export default PxBoard;
