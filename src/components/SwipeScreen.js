import React, { useState , useEffect, useContext} from 'react'
import api from "../apis/api";
import TinderCard from 'react-tinder-card'
import { AuthContext } from '../contexts/authContext';
import {Button , Form , Modal } from 'react-bootstrap';
import MessageBar from './MessageBar';

function SwipeScreen () {
    const [visibleUsers, setVisibleUsers ] = useState ([]);
    const [lastDirection, setLastDirection] = useState()
    const [match, setMatch] = useState(false)
    const [details, setDetails] = useState(false)
    let loggedUserSkills = useContext (AuthContext).loggedInUser.user.skills;
//------modal
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShow(false);
//------message
    const [ message, setMessage ] = useState ({});
    const [ matchId, setMatchId ] = useState ();


  //----me mostra os usuários no banco--------------------------
  async function renderUsers() {
    try {
        const allUsersResult = await api.get("/allUsers")
        setVisibleUsers(allUsersResult.data)
    
    }catch (err) {
        console.log(err)
    }
};

useEffect(() => {
    renderUsers();

    
}, [])


//------exibe modal
useEffect(() => {
  if (match === true) {
    setShow(true)
  }
  
}, [match])


 //------------------

 
const handleSubmit = async (event) => {
  event.preventDefault();
  setShow(false);

  try {
      const initialmessage = await api.post("/message", {recipientId: matchId, text: message} )
      setMessage({...initialmessage.data})
      console.log(initialmessage.data);
     

  }catch (err) {
      console.log(err)
  }
}

  //-----------------





  useEffect(() => {
    if (details === true) {
      setShowModal(true)
    }
  }, [details])



  const swiped = (direction, nameToDelete, skills, id) => {  
    console.log(nameToDelete);

    setMatch(false)
    setDetails(false)
    
    setLastDirection(direction)

    if (direction === "right" && loggedUserSkills === skills) {
      setMatch(true)
      setMatchId(id)

    }


if (direction === "up") {
  setDetails(true)
}

    console.log(direction)
  }



  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }




  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {visibleUsers.map((character) =>
          <>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name, character.skills, character._id)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.avatar + ')' }} className='card'>
              <h3>{character.name}</h3> <br />
              <h2>{character.skills}</h2>
              {match ?   <h1>It's a match!</h1>  : null}
            </div>
            {details ? <Modal show={showModal} onHide={handleClose}>
          <Modal.Title>{character.name}</Modal.Title>
        <Modal.Body>
         <img src={character.avatar} className='card' alt="avatar pic"></img>
          <h2>{character.skills}</h2>
          <h2>{character.adress}</h2>
          
        </Modal.Body>

      </Modal>

            : null}
          </TinderCard>
          </>
          
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>You swiped {lastDirection}</h2>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>It's a match!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> send a initial message</Form.Label>
              <Form.Control as="textarea" autoFocus rows={3} value={message}
          onChange={(e) => setMessage(e.target.value)} /> 
            </Form.Group>
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button button type="submit" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
     
      <MessageBar test={message} />

    </div>

  )
}

export default SwipeScreen;
