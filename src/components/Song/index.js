import React from 'react';
import styled from 'styled-components';
import './song.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';

// blur 배경 styled component로 정의
const AlbumBlurBg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.url});
    filter: blur(20px);
    z-index: -1;
`;

function SongPage() {
    const navigate = useNavigate();

    // params id 받아오기
    const param = useParams();
    const { id } = param;

    // 받아온 id와 일치하는 노래 정보 가져오기
    async function getSong() {
        const response = await axios.get(
            `${API_URL}/song/${id}`
        )
        return response.data;
    }

    // useAsync로 데이터 받아오는 상태 관리
    const state = useAsync(getSong);
    const { loading, error, data: song } = state;

    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!song) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    // 카테고리 데이터는 따로 받아서 새로운 배열 생성
    const s_categories = [];
    s_categories.push(song[0].s_season, song[0].s_mood, song[0].s_situation);

    // 페이지 뒤로 가기 함수
    function onBackward() {
        navigate(-1);
    }

    return (
        <main id='songMain'>
            <section>
                <div id='albumImg'>
                    <img src={`${song[0].s_imgUrl}`} alt='앨범 사진'/>
                    <AlbumBlurBg url={`${API_URL}/${song[0].s_imgUrl}`} />
                </div>
            </section>
            <section id='songDesc'>
                <h2>{song[0].s_name}</h2>
                <h3>{song[0].s_artist}</h3>
                <ul>
                    <li>앨범: {song[0].s_album}</li>
                    <li>발매연도: {song[0].s_year}</li>
                    <li>시간: {song[0].s_time}</li>
                    <li>
                        {s_categories.map((category, index) => 
                            category ? <span key={index}>#{category}</span> : null
                        )}
                    </li>
                </ul>
            </section>
            <section id='youtube'>
                <iframe width="854" height="480" 
                src={`https://www.youtube-nocookie.com/embed/${song[0].s_youtubeUrl}`} title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
            </section>
            <section id='btn'>
                <Link to={`/editSong/${id}`}><button>수정하기</button></Link>
                <button onClick={onBackward}>리스트 보기</button>
            </section>
        </main>
    );
}

export default SongPage;