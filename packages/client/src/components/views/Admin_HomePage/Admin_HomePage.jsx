/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import React from "react";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPxBoard } from '../../../redux/pxBoard/pxBoardThunk';
import { useSelector } from 'react-redux';

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

import "./Admin_HomePage.scss";
import { PopupCreatePxBoard } from "../../components";


/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */

function Admin_HomePage() {
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
 
  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */
  const [data, setData] = useState([]);
  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */

  function handleClick() {
    fetchPxBoard()
  }

  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPxBoard());
}, [ dispatch]);



const pxBoardData = useSelector(state => state.pxBoard.pxBoards);

console.log("pxBoardData", pxBoardData);

  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div className="conatainer">
      <div className="buttonCreate">
      <PopupCreatePxBoard/>
      </div>
      <div className="pxBoardList">
        <h3>List PixelBoards</h3>
         { pxBoardData !== undefined &&  pxBoardData.length !== 0 ?
         pxBoardData.map(pxBoard => (
          <div key={pxBoard.id}>{pxBoard.title}</div>
        )): <div>loading...</div>}
      </div>
    </div>
  );
}

export default Admin_HomePage;
