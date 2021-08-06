import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Chat.css';


function ChatScreen() {
    return (
        <div className="ChatScreen">
            <div className="chat__profile">
                <Avatar className="chat__image" alt="Remy Sharp" src="https://yt3.ggpht.com/ytc/AKedOLTNtWi13ujIRntu03WgZuFiCDJBFIXwf5406KOTWA=s900-c-k-c0x00ffffff-no-rj" />
                <h2>KSI</h2>
            </div>
            <div className="chat__messages">
                <Avatar className="chat__image" alt="Remy Sharp" src="https://yt3.ggpht.com/ytc/AKedOLTNtWi13ujIRntu03WgZuFiCDJBFIXwf5406KOTWA=s900-c-k-c0x00ffffff-no-rj" />
                <p className="chat__message">Eh yo, it's your boy KSI!</p>
                
            </div>
            <div className="chat__messages">
                <p className="chat__usermessage">Hey!</p>
            </div>
            <div className="chat__messages">
                <Avatar className="chat__image" alt="Remy Sharp" src="https://yt3.ggpht.com/ytc/AKedOLTNtWi13ujIRntu03WgZuFiCDJBFIXwf5406KOTWA=s900-c-k-c0x00ffffff-no-rj" />
                <p className="chat__message">How we doing, fam?</p>
            </div>
            <div className="chat__messages">
                <p className="chat__usermessage">We killing it!</p>
            </div>
        </div>
    )
}

export default ChatScreen
