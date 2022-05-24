import React, { useContext } from 'react';
import { BiTrash } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';
import PSkeletonTable from '../Skeletons/PSkeletonTable';
import { MouseContext } from '../../context/mouse-context';

function PlaylistTable({ p_category }) {
    const { cursorChangeHandler } = useContext(MouseContext);

    let songNum = 1;

    async function getSongs() {
        const response = await axios.get(
            `${API_URL}/songs/${p_category}`
        )
        return await response.data;
    }

    const state = useAsync(getSongs);
    const { loading, error, data:songs } = state;
    if(loading) return <PSkeletonTable />;
    if(error) return <div>오류가 발생했습니다.</div>;
    if(!songs) return <div>데이터를 불러오지 못했습니다.</div>;

    // 특정 노래 삭제하기
    function onDelete(id) {
        axios.delete(`${API_URL}/song/${id}`)
        .then((result) => {
            console.log("삭제되었습니다.");
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }

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
                            <img src={`${song.s_imgUrl}`} alt='앨범 이미지'/>
                            <Link to={`/song/${song.s_id}`}
                                onMouseEnter={() => cursorChangeHandler("hovered")}
                                onMouseLeave={() => cursorChangeHandler("")}
                            >
                                {song.s_name}
                            </Link>
                        </td>
                        <td>{song.s_artist}</td>
                        <td>{song.s_year}</td>
                        <td>{song.s_time}</td>
                        <td onMouseEnter={() => cursorChangeHandler("hovered")}
                            onMouseLeave={() => cursorChangeHandler("")}
                        >
                            <BiTrash 
                                onClick={() => window.confirm("노래를 삭제하시겠습니까?") ? onDelete(song.s_id) : null}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PlaylistTable;