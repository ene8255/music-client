import React from 'react';
import './playlist.scss';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';
import PlaylistTable from './PlaylistTable';

// blur 배경 styled component로 생성하여 이미지 url을 props로 받기
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
    const navigate = useNavigate();

    // params로 id 받아오기
    const param = useParams();
    const { id } = param;

    // 특정 플레이리스트 정보 가져오기
    async function getPlaylist() {
        const response = await axios.get(
            `${API_URL}/playlist/${id}`
        )
        return response.data;
    }

    // useAsync로 data 받아오는 상태 관리
    const state = useAsync(getPlaylist);
    const { loading, error, data: playlist } = state;
    
    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!playlist) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    // 플레이리스트 삭제
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
        <main>
            <section id='listSection'>
                <BlurBg img={`${API_URL}/${playlist[0].p_imgUrl}`} />
                <div>
                    <img src={`${API_URL}/${playlist[0].p_imgUrl}`} />
                </div>
                <div id='listTitle'>
                    <p>PLAYLIST</p>
                    <h2>{playlist[0].p_name}</h2>
                    <p>{playlist[0].p_desc}</p>
                    <p>
                        <Link to={`/editPlaylist/${playlist[0].p_id}`}><button>수정하기</button></Link>
                        <button onClick={() => window.confirm("플레이리스트를 삭제하시겠습니까?") ? onDelete() : null}>삭제</button>
                    </p>
                </div>
            </section>
            <PlaylistTable p_category={playlist[0].p_category} />
        </main>
    );
}

export default PlaylistPage;