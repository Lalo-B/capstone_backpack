import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import './Sockets.css';
let socket;


const Sockets = () => {

    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        // create websocket/connect
        socket = io('https://capstone-backpack.onrender.com')
        // socket = io('http://127.0.0.1:8000/');

        // we are connected message
        // socket.on('connect', function () {
        //     socket.emit('my event', { data: 'I\'m connected!' });
        //     console.log('sockets are on in front end')
        // })

        // listen for chat events
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chat });
        setChat("")
    }

    return (
        <div>
            <p>sockets baby</p>
            <div>
                {messages.map((message, i) => (
                    <div key={i}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                />
                <button>Send</button>
            </form>
        </div>
    )
}
export default Sockets;
