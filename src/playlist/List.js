import React from 'react';
import { BiTrash } from "react-icons/bi";
import './playlist.scss';

function List(props) {
    return (
        <main>
            <section id='listSection'>
                <div>
                    <img src="../imgs/winter.jpg"/>
                </div>
                <div id='listTitle'>
                    <p>PLAYLIST</p>
                    <h2>겨울</h2>
                    <p>겨울 느낌나는 노래</p>
                    <p>--곡, --분</p>
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
                            <img src='../imgs/outoftime.png'/>
                            Out of Time
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
                            Out of Time
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