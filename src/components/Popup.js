import { useState } from "react";




const Popup = ({msg}) => {
    return ( 
        <div id="popup-body" className={msg.type}>
            <h3>{msg.title}</h3>
            <p>{msg.text}</p>
        </div>
     );
}
 
export default Popup;