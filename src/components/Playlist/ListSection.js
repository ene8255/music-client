import React from 'react';
import styled from 'styled-components';
import { API_URL } from '../../config/constants';
import { Link } from 'react-router-dom';

// blur 배경은 styled component로 생성하여 이미지 url을 props로 받음
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

function ListSection({ playlist, onDelete }) {
    // 삭제 버튼 클릭시 확인 후 함수 실행
    function deleteEvent() {
        if(window.confirm("플레이리스트를 삭제하시겠습니까?")) {
            onDelete();
        }
    }

    return (
        <section id="listSection">
            <BlurBg img={`${API_URL}/${playlist[0].p_imgUrl}`} />
            <div>
                <img src={`${API_URL}/${playlist[0].p_imgUrl}`} alt="플레이리스트 사진" />
            </div>
            <div id="listTitle">
                <p>PLAYLIST</p>
                <h2>{playlist[0].p_name}</h2>
                <p>{playlist[0].p_desc}</p>
                <p>
                    <Link to={`/editPlaylist/${playlist[0].p_id}`}>
                        <button>수정하기</button>
                    </Link>
                    <button onClick={deleteEvent}>삭제</button>
                </p>
            </div>
        </section>
    );
}

export default ListSection;