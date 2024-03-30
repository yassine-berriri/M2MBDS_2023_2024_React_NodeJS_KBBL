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


const { pxBoards, loading, error } = useSelector(state => state.pxBoard);

console.log("pxBoardData", pxBoards);

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
      <h3>Liste des PixelBoards</h3>
                {loading && <div>Chargement...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && pxBoards.length > 0 ? (
                    pxBoards.map(pxBoard => (
                        <div key={pxBoard.id}>{pxBoard.title}</div>
                    ))
                ) : (
                    !loading && <div>Aucun PixelBoard trouvé.</div>
                )}
      </div>
    </div>
  );
}

export default Admin_HomePage;
