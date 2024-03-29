/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import React from "react";
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
import "./Visitor_PixelBoard.scss";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { Page } from "../../components";
/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */


function Visitor_PixelBoard() {


  const navigate = useNavigate();

  
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
 
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */

  const [pixels, setPixels] = useState(Array(16).fill('red')); 
  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */
  
  

  const handlePixelClick = (index) => {
    const newPixels = [...pixels];
    newPixels[index] = 'black'; // Choisir la couleur ou la faire choisir par l'utilisateur
    setPixels(newPixels);
  };
  

  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div className="conatainer">
       <div>PixelBoard ici</div>
       <div className="board">
         {pixels.map((color, index) => (
       <div key={index} className="pixel" style={{ backgroundColor: color }}  onClick={() => handlePixelClick(index)}></div>
        ))}
        </div>
        </div>
  );
}

export default Visitor_PixelBoard;
