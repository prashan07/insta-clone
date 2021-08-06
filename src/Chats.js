import React from 'react'
import './Chat.css';
import Chat from './Chat';

function Chats() {
    return (
        <div className="chats">
            <Chat
                name="KSI"
                message="Hey! What's up?"
                timestamp = "2 mins ago"
                profilepic ="https://yt3.ggpht.com/ytc/AKedOLTNtWi13ujIRntu03WgZuFiCDJBFIXwf5406KOTWA=s900-c-k-c0x00ffffff-no-rj"
            />
            <Chat
                name="Ethan"
                message="Hey dude!"
                timestamp = "1 hr ago"
                profilepic ="https://yt3.ggpht.com/ytc/AKedOLSSdp47CakpKgWUUMIegdeeP5UD_EP4tRQVa6WmUA=s900-c-k-c0x00ffffff-no-rj"
            />
            <Chat
                name="Tobi"
                message="Tonight 9pm, yeah?"
                timestamp = "2 hrs ago"
                profilepic ="https://biographymask.com/wp-content/uploads/2020/04/Tobi-Lerone-Youtube-star.jpg"
            />
        </div>
    )
}

export default Chats
