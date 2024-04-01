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
import {useState, useEffect} from 'react';
import { PxBord } from "../../components";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */


function Visitor_PixelBoard() {

  let { id } = useParams();
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

  const { pxBoards, loading, error } = useSelector(state => state.pxBoard);

  const getPxBoardById = (id) => {
    const pxBoard = pxBoards.find((pxBoard) => pxBoard._id === id);
    console.log("pxBoards dans visitor = ",pxBoard)
    return pxBoard;
  }

  let myPxBoard = getPxBoardById(id);

  useEffect(() => {
    console.log("id = ",id)
    
  
  }, [id]);

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div className="conatainer">
       <div>PixelBoard ici</div>
       <PxBord />
        </div>
  );
}

export default Visitor_PixelBoard;
