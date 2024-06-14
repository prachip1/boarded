import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Board.css';
import CreateBoard from './CreateBoard';
import Editable from './Editable/Editable';
import {db,userCollectionRef} from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot,getDocs, updateDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';



export default function Board(props) {
    const { workspaceId } = useParams();
    const { boardsId } = useParams();
    const [boards, setBoards] = useState([]);

    const userCollectionRef1 = collection(db, `workspace/${workspaceId}/boards/${boardsId}/lists`);

    const [targetBoardId, setTargetBoardId] = useState("");
    const [draggedCardId, setDraggedCardId] = useState("");

    const [target, setTarget] = useState({cid:"", bid:""});

  

    const addBoard = async (title) => {
      try {
          const boardData = {
              title,
              createdAt: serverTimestamp(),
              cards: [] // Initialize cards array for the new board
          };
          const docRef = await addDoc(userCollectionRef1, boardData);
          const newBoard = { id: docRef.id, ...boardData }; // Include the generated ID in the new board object
          setBoards([...boards, newBoard]); // Update the boards state with the new board
      } catch (error) {
          console.error('Error adding board:', error);
      }
  };

    const addCard = async (title, bid) => {
        try {
            const cardData = {
                title,
                labels: [],
                tasks: [],
                date: "",
                desc: "",
                createdAt: serverTimestamp()
            };
           // console.log(cardData)
            await addDoc(collection(db, `workspace/${workspaceId}/boards/${boardsId}/lists/${bid}/cards`), cardData);
           fetchBoards();
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    // Remaining functions like removeCard, addBoard, removeBoard, handleDragEnd, handleDragEnter, updateCard

    const fetchBoards = async () => {
      try {
        const q = query(userCollectionRef1, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const boards = [];
        for (const doc of querySnapshot.docs) {
            const boardData = doc.data();
            const board = {
                id: doc.id,
                ...boardData,
                createdAt: boardData.createdAt.toDate().toLocaleString("en-US"),
            };
            // Fetch cards for the current board
            const cardsSnapshot = await getDocs(collection(userCollectionRef1, doc.id, "cards"));
            const cards = cardsSnapshot.docs.map(cardDoc => ({ id: cardDoc.id, ...cardDoc.data() }));
            board.cards = cards;
            // Push the board with its cards into the boards array
            boards.push(board);
        }
        setBoards(boards);
        //fetchCardsForBoard(boardId)
    } catch (error) {
        console.error("Error fetching boards:", error);
    }
    };
    const updateCard = async (cid, bid, updatedCard) => {
      try {
          const boardRef = doc(userCollectionRef1, bid);
          const cardRef = doc(collection(userCollectionRef1, bid, "cards"), cid);
          await updateDoc(cardRef, updatedCard);
          // Update the card in the board
          const boardSnapshot = await getDoc(boardRef);
          const boardData = boardSnapshot.data();
          const updatedCards = boardData.cards.map(card => (card.id === cid ? updatedCard : card));
          await updateDoc(boardRef, { cards: updatedCards });
          fetchBoards();
      } catch (error) {
          console.error("Error updating card:", error);
      }
  };
  
  const removeBoard = async (bid) => {
      try {
          const boardRef = doc(userCollectionRef1, bid);
          await deleteDoc(boardRef);
          fetchBoards();
      } catch (error) {
          console.error("Error removing board:", error);
      }
  };
  
  const removeCard = async (cid, bid) => {
      try {
          const cardRef = doc(collection(userCollectionRef1, bid, "cards"), cid);
          await deleteDoc(cardRef);
          // Remove the card from the board
          const boardRef = doc(userCollectionRef1, bid);
          const boardSnapshot = await getDoc(boardRef);
          const boardData = boardSnapshot.data();
          const updatedCards = boardData.cards.filter(card => card.id !== cid);
          await updateDoc(boardRef, { cards: updatedCards });
        fetchBoards()
        } catch (error) {
          console.error("Error removing card:", error);
      }
  };

const handleDragEnd = async (cid, bid) => {   
    try {
        setBoards(prevBoards => {
            const sourceBoardIndex = prevBoards.findIndex(item => item.id === bid);
            if (sourceBoardIndex < 0) return prevBoards;

            const sourceCardIndex = prevBoards[sourceBoardIndex].cards.findIndex(item => item.id === cid);
            if (sourceCardIndex < 0) return prevBoards;

            const tempBoards = [...prevBoards];
            const tempCard = tempBoards[sourceBoardIndex].cards[sourceCardIndex];

            // Remove the card from the source board
            tempBoards[sourceBoardIndex].cards.splice(sourceCardIndex, 1);

            // Add the card to the target board at the appropriate index
            const targetBoardIndex = tempBoards.findIndex(item => item.id === target.bid);
            if (targetBoardIndex < 0) return prevBoards;

            const targetCardIndex = tempBoards[targetBoardIndex].cards.findIndex(item => item.id === target.cid);
            if (targetCardIndex < 0) return prevBoards;

            tempBoards[targetBoardIndex].cards.splice(targetCardIndex, 0, tempCard);
            return tempBoards;
        });
    } catch (error) {
        console.error("Error handling drag end:", error);
    }
};

const handleDragEnter = (cid, bid) => {
    setTarget(prevTarget => ({
        ...prevTarget,
        cid,
        bid
    }));
};


  
 
   //fetchCardsForBoard(boardId)

    useEffect(() => {
    fetchBoards();

     
       // fetchCardsForBoard()
    }, [workspaceId]);

    return (
        <div className="top_content">
            <div className="board-work-title"></div>
            <div className="main-content">
                <div className="home-content"></div>
                <div className="home-board">
                    {boards.length > 0 ? (
                        <div className="board-display">
                                
                            {boards.map((item) => (
                                <CreateBoard key={item.id} board={item} removeBoard={removeBoard}
                                    addCard={addCard}
                                    removeCard={removeCard}
                                    handleDragEnd={handleDragEnd}
                                    handleDragEnter={handleDragEnter}
                                    updateCard={updateCard}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Nothing created yet, click on the button to start 👉🏼</p>
                    )}
                    <div className="home-add-more-board-class">
                        <Editable
                            displayClass="home-more-board-add"
                            text="Add List"
                            placeholder="Enter board title"
                            onSubmit={(value) => addBoard(value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
