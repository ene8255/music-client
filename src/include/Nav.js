import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

function Nav() {
    return (
        <div id="nav">
            <ul>
                <li><AiOutlineLeft/></li>
                <li><AiOutlineRight/></li>
            </ul>
        </div>
    );
}

export default Nav;