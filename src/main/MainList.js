import React from 'react';
import { Link } from 'react-router-dom';

function MainList() {
    return (
        <li>
            <Link to="/playlist/winter">
                <img src='imgs/winter.jpg'/>
                <h3>겨울</h3>
                <p>겨울 느낌나는 노래</p>
            </Link>
        </li>
    );
}

export default MainList;