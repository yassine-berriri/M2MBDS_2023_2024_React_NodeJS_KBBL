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
  const { rows = 100, cols = 100, idPx } = props;
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
    width: `${26 * cols}px`, // Largeur totale du tableau
     // Optionnel, pour encadrer le tableau
  };

  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */
  const handleClickOnPixel = () =>{
    console.log("click")
    socket.emit('addPixel', { pxBoardId: "6606beb983b0aeea038e1764", x: 5, y: 10, color: '#ff0000' });
  }

    // Créer une liste de composants Pixel
    const pixels = [];
    for (let i = 0; i < rows * cols; i++) {
      pixels.push(<Pixel clickOnPixel= {handleClickOnPixel} key={i} selectedColor={selectedColor} />); // key est important pour les performances de React
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
