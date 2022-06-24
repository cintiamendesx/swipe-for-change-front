import {  useState, useEffect } from "react";
import api from "../apis/api";

function MessageBar(props) {

  console.log(props.test);

  const [messageMatch, setMessageMatch ]  = useState([]);
  const [lastIndex, setLastIndex ] = useState(0);


  useEffect(() => {
    async function fetchMessages() {
      try {
        const allMessages = await api.get("/allmessages");
        setMessageMatch([...allMessages.data]) 
        setLastIndex(allMessages.data.length -1)

        console.log(allMessages.data.length -1);

      } catch (err) {
        console.error(err);
      }
    }
    fetchMessages();
  }, []);

console.log(messageMatch);


return (

    <div className=".requests__content">
   { messageMatch.length !== 0 ?  <div key={messageMatch[lastIndex]._id} className="main__left-message">
      <h1>{messageMatch[lastIndex].recipientId.name}</h1>
      <img src={messageMatch[lastIndex].recipientId.avatar} alt="avatar pic"></img>
      <p>{messageMatch[lastIndex].text}</p> 
      </div> : null}
    </div>
)


}
 

export default MessageBar;