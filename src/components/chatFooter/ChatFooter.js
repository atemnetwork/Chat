import React, {useEffect, useState} from 'react';
import { useMoralis } from 'react-moralis';
import './chatFooter.css';
import ChatContent from '../chatContent/ChatContent';
function ChatFooter({ endOfMessagesRef, id }) {

    const { user, Moralis } = useMoralis();
    const [message, setMessage] = useState("");

    useEffect(() => {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" })
    })

    const sendMessage = (e) => {
        e.preventDefault();
        if(!message) return;

        const Message = Moralis.Object.extend('Messages');
        const messages = new Message();

        messages.save({
            message: message,
            username: user.getUsername(),
            ethAddress: user.get('ethAddress'),
            groupId: id,
        }).then((message) => {

        },
        (error) => {
            console.log(error.message);
        })
        endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });

        setMessage("");
    }

    
    return (
        <div className="content__footer">
        <form className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input className='chat_input' type="text" placeholder='Enter a Message' value={message} onChange={e => setMessage(e.target.value)}/>
          <button className="btnSendMsg" id="sendMsgBtn" type='submit' onClick={sendMessage}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>
    )
}

export default ChatFooter
