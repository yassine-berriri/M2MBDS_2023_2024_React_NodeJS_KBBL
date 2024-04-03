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


  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */
  
  



  
  

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

  useEffect(() => {
    console.log("je suis dans useEffect visitor pxBoard loading = ",loading, pxBoards.length)
    
    //myPxBoard = getPxBoardById(id);

  });
  let myPxBoard = getPxBoardById(id);



 

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div className="conatainer">
       <div>PixelBoard ici</div>
       <PxBord idPx={id}  myPxBoard={myPxBoard}   />
        </div>
  );
}

export default Visitor_PixelBoard;
