import React from 'react';
import { BiTrash } from "react-icons/bi";
import './playlist.scss';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync'

const BlurBg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url('${(props) => props.img}');
    background-repeat: no-repeat;
    background-size: 100%;
    filter: blur(80px);
`;

function PlaylistPage() {
    const param = useParams();
    const { id } = param;

    async function getPlaylist() {
        const response = await axios.get(
            `${API_URL}/playlist/${id}`
        )
        return response.data;
    }

    const state = useAsync(getPlaylist);
    const { loading, error, data: playlist } = state;
    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!playlist) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    return (
        <main>
            <section id='listSection'>
                <BlurBg img={playlist[0].p_imgUrl} />
                <div>
                    <img src={playlist[0].p_imgUrl} />
                </div>
                <div id='listTitle'>
                    <p>PLAYLIST</p>
                    <h2>{playlist[0].p_name}</h2>
                    <p>{playlist[0].p_desc}</p>
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

export default PlaylistPage;