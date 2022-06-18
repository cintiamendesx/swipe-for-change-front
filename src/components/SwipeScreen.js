import React, { useState , useEffect, useContext} from 'react'
import api from "../apis/api";
import TinderCard from 'react-tinder-card'
import { AuthContext } from '../contexts/authContext';
import {Button , Form , Modal } from 'react-bootstrap';


function SwipeScreen () {
    const [visibleUsers, setVisibleUsers ] = useState ([]);
    const [lastDirection, setLastDirection] = useState()
    const [match, setMatch] = useState(false)
    const [details, setDetails] = useState(false)
    let loggedUserSkills = useContext (AuthContext).loggedInUser.user.skills;
//------modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
//------message
    const [ message, setMessage ] = useState ([]);


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

 //-----loggedin

 //------------------
 async function sendMessage() {
  try {
      const initialmessage = await api.post("/message")
      setMessage(initialmessage.data)
  
  }catch (err) {
      console.log(err)
  }
};

useEffect(() => {
  sendMessage();
  
}, [])
 //-----------------


  const swiped = (direction, nameToDelete, skills) => {  
    console.log(nameToDelete);

    setMatch(false)
    setDetails(false)
    
    setLastDirection(direction)

    if (direction === "right" && loggedUserSkills === skills) {
      setMatch(true)
      setShow(true)
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
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name, character.skills)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.avatar + ')' }} className='card'>
              <h3>{character.name}</h3> <br />
              <h2>{character.skills}</h2>
              {match ?               <>

                <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>It's a match!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>You and <b>{character.name}</b> are perfect for each other, send a message!!</Form.Label>
              <Form.Control as="textarea" autoFocus rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={message}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>

      </> : null}
            </div>
            {details ? <h1>wait</h1>

            : null}
          </TinderCard>

          </>

          
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}

    </div>
  )
}

export default SwipeScreen;