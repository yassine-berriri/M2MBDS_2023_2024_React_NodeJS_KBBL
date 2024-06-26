/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import React from "react";
import { Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPxBoard,deletePxBoard,updatePxBoard, fetchPxBoardsByUserId } from '../../../redux/pxBoard/pxBoardThunk';
import { useSelector } from 'react-redux';
import Tools from "../../../Utils/tools";
import { DropDownButtonTrie } from "../../components";
import PopupDelete from "../../components/Popups/PopupDelete/PopupDelete";
import PopUpdate from "../../components/Popups/PopupUpdatePxBoard/PopUpdate";
import {MySpinnerPopup} from "../../components";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

/*PopUpdate
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
import PxBoard from "../../components/PixelBoard/PxBoard/PxBoard";



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

  const [dropDownTrieLabel, setDropDownTrieLabel] = useState("Trier par");
  const [sortedPxBoards, setSortedPxBoards] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  
  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */

  const   drawImageFromPixels = (pixels, width, height) => {
    // Créer un élément canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Dessiner chaque pixel
    pixels.forEach(pixel => {
      ctx.fillStyle = pixel.color; // Définir la couleur
      ctx.fillRect(pixel.x, pixel.y, 1, 1); 
    });

 
    return canvas.toDataURL();
  }

  const handleClickonPxBoard = (id) => {
    navigate(`/pixelBoard/${id}`);
  }

  const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  /*

  const   drawImageFromPixelsPromise  = (pixels, width, height) => {

    new Promise((resolve, reject) => {
    // Créer un élément canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Dessiner chaque pixel
    pixels.forEach(pixel => {
      ctx.fillStyle = pixel.color; // Définir la couleur
      ctx.fillRect(pixel.x, pixel.y, 1, 1); 
    });

      resolve(canvas.toDataURL()); // Utilisez resolve pour retourner l'URL de l'image
    });
  }
  */


  const handleExportImage = (pixels) => {
    const width = 150; // Largeur du canvas souhaitée
    const height = 150; // Hauteur du canvas souhaitée
    const dataUrl = drawImageFromPixels(pixels, width, height);
    downloadImage(dataUrl, "pixelboard.png");
  };
  const handleEdit = (id) => {
    console.log(" edit clicked id = ", id);
  }
  
  const handleDelete = (id) => {
    console.log(" delete clicked id = ", id);
    dispatch(deletePxBoard(id))
    .then(() => {
      const userId = localStorage.getItem('id');
      dispatch(fetchPxBoardsByUserId(userId));
    })
  }
  
  const handleUpdate = (id, updateData) => {
    console.log("Update clicked id = ", id);
    dispatch(updatePxBoard(id, updateData))
      .then(() => {
        dispatch(fetchPxBoard());
      });
  };

  
  const handleSelectFilter = (filter) => {
    let updatedPxBoards = [...sortedPxBoards];
    switch (filter) {
      case "date de création":
        updatedPxBoards.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
        setDropDownTrieLabel("Trier par: date de création");
        break;
      case "date de fin":
        updatedPxBoards.sort((a, b) => Date.parse(a.endDate) - Date.parse(b.endDate));
        setDropDownTrieLabel("Trier par: date de fin");
        break  
      case "taille":
        updatedPxBoards.sort((a, b) => a.size - b.size);
        setDropDownTrieLabel("Trier par: taille");
        break;
      case "delai de modification":
        updatedPxBoards.sort((a, b) => a.modificationDelai - b.modificationDelai);
        setDropDownTrieLabel("Trier par: delai de modification");
        break;
      default:
        updatedPxBoards = pxBoardsTest;
        break;
    }

    setSortedPxBoards(updatedPxBoards);

  };


  const handleFilterByName = (name) => {
    setNameFilter(name);
    console.log("name", name);
    console.log("sortedPxBoards", sortedPxBoards);
    if (pxBoardsTest === null || pxBoardsTest.length === 0) return;
    let updatedPxBoards = [...pxBoardsTest];
    console.log("updatedPxBoards", updatedPxBoards);
    updatedPxBoards = updatedPxBoards.filter(board => board.title.toLowerCase().includes(name.toLowerCase()));
    console.log("updatedPxBoards after filter", updatedPxBoards);  
   setSortedPxBoards(updatedPxBoards);
  }

  

  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('id');
    dispatch(fetchPxBoardsByUserId(userId));
    //console.log("Je suis dans le useEffect de Admin_HomePage",userId,  pxBoards);
}, [ dispatch]);

let { pxBoards, loading, error } = useSelector(state => state.pxBoard.pxBoards);
const pxBoardsTest = useSelector(state => state.pxBoard.pxBoardsByUserId);


useEffect(() => {
  // Initialisation de l'état local avec les données de Redux
  console.log("pxBoardsTest", pxBoardsTest);
  setSortedPxBoards(pxBoardsTest);
}, [pxBoardsTest]);
let imageUrl = "";

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
      <div className="filterSpace">

      <Input 
      type= "search"
      name="nameFilter"
      value={nameFilter}
      onChange={e => handleFilterByName(e.target.value)}
      placeholder="Entrer le nom du pixelboard"
       />
    
      <DropDownButtonTrie title = {dropDownTrieLabel} onSelectFilter={handleSelectFilter} />
    
      </div>
      <div className="pxBoardList">
      
      <CardGroup className="cardGroup">
                {loading && <div> <MySpinnerPopup/> </div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && pxBoardsTest?.length > 0 ? (
                    
                    sortedPxBoards?.slice().reverse().map(pxBoard => (
                        imageUrl = drawImageFromPixels(pxBoard.pixels, 100, 100),

                        <div key={pxBoard.id}>
                          <Card>
                          <CardImg
                          className="cardImg"
                          onClick={() => handleClickonPxBoard(pxBoard._id)}
                          height="100%" 
                          width="100%"
                          src={imageUrl} 
                          alt="Card image cap"
                          />
                            {/*<CardImg   height="10%" width="100%" src="https://picsum.photos/318/180" alt="Card image cap" />*/}
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

                              <div className="popups">
                              <IconButton color="primary" onClick={() => handleExportImage(pxBoard.pixels)} aria-label="export image">
                              <PhotoCamera />
                            </IconButton>
                              <PopUpdate pxBoard={pxBoard} onUpdate={(updateData) => handleUpdate(pxBoard._id, updateData)} />
                              <PopupDelete onDelete={() => handleDelete(pxBoard._id)}  text={`Vous êtes sur le point de supprimer ce PixelBoard <<${pxBoard.title}>>`}/>
                              </div>
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
