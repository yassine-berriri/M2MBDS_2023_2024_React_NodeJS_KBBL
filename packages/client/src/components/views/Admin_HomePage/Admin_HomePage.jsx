/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import React from "react";
import { Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPxBoard } from '../../../redux/pxBoard/pxBoardThunk';
import { useSelector } from 'react-redux';
import Tools from "../../../Utils/tools";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PopupDelete from "../../components/Popups/PopupDelete/PopupDelete";

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
  
  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */

  const handleClickonPxBoard = (id) => {
    navigate(`/pixelBoard/${id}`);
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

const handleEdit = (id) => {
  console.log(" edit clicked id = ", id);
}

const handleDelete = (id) => {
  console.log(" delete clicked id = ", id);
}



  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <div className="conatainer">
      <div className="buttonCreate">
      <h3>Liste des PixelBoards</h3>
      <PopupCreatePxBoard/>
      </div>
      <div className="pxBoardList">
      
      <CardGroup className="cardGroup">
                {loading && <div>Chargement...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && pxBoards.length > 0 ? (
                    
                    pxBoards.slice().reverse().map(pxBoard => (
                        <div key={pxBoard.id}>
                          <Card>
                            <CardImg onClick={() => handleClickonPxBoard(pxBoard._id)}  height="10%" width="100%" src="https://picsum.photos/318/180" alt="Card image cap" />
                            <CardBody>
                              <CardTitle tag="h5">{pxBoard.title}</CardTitle>
                              <CardSubtitle tag="h6" className="mb-2 text-muted">Date de création: {Tools.convertToSimpleDate(pxBoard.createdAt)}</CardSubtitle>
                              <CardSubtitle tag="h6" className="mb-2 text-muted">Date de fin:  {Tools.convertToSimpleDate(pxBoard.endDate)}</CardSubtitle>
                              <CardText> Size: {pxBoard.size} * {pxBoard.size}</CardText>
                              <CardText> Delai de modification: {pxBoard.modificationDelai}</CardText>
                              
                              <CardText> Mode
                              <ul>
                               { 
                               pxBoard.mode && pxBoard.mode.length > 0 ? ( 
                               pxBoard.mode.map((mode, index) => (
                               <li key={index}><CardText>{mode}</CardText></li>
                                ))):
                                <li><CardText>Aucun mode</CardText></li>
                                }
                              </ul>
                              </CardText>

                              <PopupDelete text={`Vous êtes sur le point de supprimer ce PixelBoard <<${pxBoard.title}>>`}/>
                              <IconButton color="primary" onClick={() => handleEdit(pxBoard._id)} aria-label="edit">
                              <EditIcon />
                              </IconButton>
                              <IconButton color="secondary" onClick={() => handleDelete(pxBoard._id)} aria-label="delete">
                              <DeleteIcon />
                              </IconButton>
                            </CardBody>

                          </Card>

                        </div>


                    ))
                ) : (
                    !loading && <div>Aucun PixelBoard trouvé.</div>
                )}

          </CardGroup>
 
      </div>
    </div>
  );
}

export default Admin_HomePage;
