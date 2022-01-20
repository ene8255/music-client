import React from 'react';
import { Link } from 'react-router-dom';

function MainList() {
    return (
        <li>
            <Link to="/playlist/winter">
                <img src='imgs/winter.jpg'/>
                {/* 플레이리스트 이미지가 목록의 첫번째 앨범 이미지로 나오게 하는 거 가능?? */}
                <h3>겨울</h3>
                <p>겨울 느낌나는 노래</p>
            </Link>
        </li>
    );
}

export default MainList;