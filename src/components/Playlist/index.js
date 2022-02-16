import React from 'react';
import './playlist.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';
import PlaylistTable from './PlaylistTable';
import ListSection from './ListSection';
import PlaylistSkeleton from '../Skeletons/PlaylistSkeleton';

function PlaylistPage() {
    const navigate = useNavigate();

    // params로 넘겨준 id 받아오기
    const param = useParams();
    const { id } = param;

    // 해당 id의 특정 플레이리스트 정보 가져오기
    async function getPlaylist() {
        const response = await axios.get(
            `${API_URL}/playlist/${id}`
        )
        return response.data;
    }

    // useAsync로 data 받아오는 상태 관리
    const state = useAsync(getPlaylist);
    const { loading, error, data: playlist } = state;
    
    if(loading) return <PlaylistSkeleton />;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!playlist) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    // 특정 플레이리스트 삭제
    function onDelete() {
        axios.delete(`${API_URL}/playlist/${id}`)
        .then((result) => {
            console.log("삭제되었습니다.");
            navigate(-1);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <main id="playlistMain">
            <ListSection playlist={playlist} onDelete={onDelete} />
            <PlaylistTable p_category={playlist[0].p_category} />
        </main>
    );
}

export default PlaylistPage;