/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import {useEffect, useState} from "react";
import Pixel from "../Pixel/Pixel";
import ColorPalette from "../ColorPalette/ColorPalette";
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

function PxBoard({ rows = 50, cols = 50 }) {
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
 // const { pageName, children } = props;
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

    // Créer une liste de composants Pixel
    const pixels = [];
    for (let i = 0; i < rows * cols; i++) {
      pixels.push(<Pixel key={i} selectedColor={selectedColor} />); // key est important pour les performances de React
    }

  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  useEffect(() => {
    window.scroll(0,0);
  }, [])

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
