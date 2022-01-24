import React, { useRef } from 'react';
import { BiTrash } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';

function PlaylistTable({ p_category }) {
    let songNum = 1;

    async function getSongs() {
        const response = await axios.get(
            `${API_URL}/songs/${p_category}`
        )
        return await response.data;
    }

    const state = useAsync(getSongs);
    const { loading, error, data:songs } = state;
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>오류가 발생했습니다.</div>;
    if(!songs) return <div>데이터를 불러오지 못했습니다.</div>;

    return (
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
                {songs.map(song => (
                    <tr key={song.s_id}>
                        <td>{songNum++}</td>
                        <td className='songTitle'>
                            <img src={`${API_URL}/${song.s_imgUrl}`} alt='앨범 이미지'/>
                            <Link to={`/song/${song.s_id}`}>{song.s_name}</Link>
                        </td>
                        <td>{song.s_artist}</td>
                        <td>{song.s_year}</td>
                        <td>{song.s_time}</td>
                        <td><BiTrash/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PlaylistTable;