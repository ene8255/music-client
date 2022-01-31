import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';
import { Link } from 'react-router-dom';

// 모든 노래 데이터 가져오기
async function getSongs() {
    const response = await axios.get(
        `${API_URL}/songs`
    )
    return response.data;
}

function CardSection({ songNum, setSongNum }) {
    // 데이터 가져오는 상태 관리
    const state = useAsync(getSongs);
    const { loading, error, data } = state;

    if(loading) return <section id="cardSection"><h3>로딩중...</h3></section>;
    if(error) return <section id="cardSection"><h3>오류가 발생했습니다.</h3></section>;
    if(!data) return null;

    // 입력한 숫자만큼 랜덤 인덱스 추출 (sameNum함수로 중복 방지)
    let ranIdxs = [];

    function sameNum(rand) {
        return ranIdxs.find((num) => (num === rand));
    }

    for(let i=0; i<songNum; i++) {
        let ranNum = Math.floor(Math.random() * data.length);
        if(ranIdxs.length !== 0) {
            if(!sameNum(ranNum)) {
                ranIdxs.push(ranNum);
            }else {
                i--;
            }
        }else {
            ranIdxs.push(ranNum);
        }
    }

    // 랜덤 인덱스의 데이터 추출
    const songs = ranIdxs.map(num => data[num]);

    // 노래 이름이 15자를 초과할 경우 짧게 나타내기 
    const name = songs.map(item => item.s_name.length > 15 ? item.s_name.slice(0, 15) + "..." : item.s_name);

    // 똑같은 숫자로 다시 실행시킬 경우를 위해 입력한 숫자 다시 세팅
    function resetSongNum() {
        setSongNum(ranIdxs.length);
    }
    resetSongNum();

    return (
        <section id="cardSection">
                {data ? 
                (songs.map((item, index) => (
                    <div className="song-card" key={index}>
                        <Link to={`/song/${item.s_id}`}>
                            <div className="card-img">
                                <img src={`${API_URL}/${item.s_imgUrl}`} alt="앨범 사진" />
                            </div>
                            <div className="card-text">
                                <h3>{name[index]}</h3>
                                <p>{item.s_artist}</p>
                                <p>{item.s_year}</p>
                            </div>
                        </Link>
                    </div>))
                ) :
                null }
        </section>
    );
}

export default CardSection;