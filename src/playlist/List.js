import React from 'react';
import { BiTrash } from "react-icons/bi";
import './playlist.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BlurBg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url("../imgs/winter.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    filter: blur(80px);
`;

function List() {
    return (
        <main>
            <section id='listSection'>
                <BlurBg />
                <div>
                    <img src="../imgs/winter.jpg"/>
                </div>
                <div id='listTitle'>
                    <p>PLAYLIST</p>
                    <h2>겨울</h2>
                    <p>겨울 느낌나는 노래</p>
                    <p>--곡, --분</p>
                    <Link to="/add"><button>노래 추가하기</button></Link>
                </div>
            </section>
            <table id='playlistTable'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TITLE</th>
                        <th>ARTIST</th>
                        <th>YEAR</th>
                        <th>TIME</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td className='songTitle'>
                            <img src='../imgs/outoftime.png' alt='앨범 이미지'/>
                            <Link to="/song/1">Out of Time</Link>
                        </td>
                        <td>TheWeeknd</td>
                        <td>2022</td>
                        <td>3:35</td>
                        <td><BiTrash/></td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td className='songTitle'>
                            <img src='../imgs/outoftime.png'/>
                            <Link to="/song/1">Out of Time</Link>
                        </td>
                        <td>TheWeeknd</td>
                        <td>2022</td>
                        <td>3:35</td>
                        <td><BiTrash/></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default List;