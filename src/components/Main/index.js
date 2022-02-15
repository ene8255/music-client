import React from 'react';
import './main.scss';
import MainList from './MainList';
import MainSkeleton from '../Skeletons/MainSkeleton';
import axios from 'axios';
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';

// 전체 플레이리스트 data 가져오기
async function getPlaylists() {
    const response = await axios.get(
        `${API_URL}/playlists`
    )
    return response.data;
}

function MainPage() {
    // useAsync로 data 받아오는 상태 관리
    const state = useAsync(getPlaylists);
    const { loading, error, data: playlists } = state;
    
    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!playlists) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    // 플레이리스트 데이터 중에서 group만 분류 (중복 제외)
    const groups = playlists.map(playlist => playlist.p_group);
    const filteredGroups = groups.filter((item, index) => groups.indexOf(item) === index);

    return (
        // <main>
        //     {filteredGroups.map(group => (
        //         <section className='mainSection' key={group}>
        //             <h2>{group}에 맞는 플레이리스트</h2>
        //             <ul>
        //                 {playlists.map(item => 
        //                     group === item.p_group ? 
        //                     <MainList key={item.p_id} data={item} /> : 
        //                     null
        //                 )}
        //             </ul>
        //         </section>
        //     ))}
        // </main>
        <MainSkeleton />
    );
}

export default MainPage;