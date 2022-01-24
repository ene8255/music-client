import React, { useEffect } from 'react';
import './main.scss';
import MainList from './MainList';
import axios from 'axios';
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';

async function getPlaylists() {
    const response = await axios.get(
        `${API_URL}/playlists`
    )
    return response.data;
}

function MainPage() {
    // useAsync로 data 받아오는 상태 관리
    const state = useAsync(getPlaylists);
    const { loading, error, data } = state;
    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!data) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    const playlists = data;
    const groups = playlists.map(playlist => 
        playlist.p_group
    );
    const filteredGroups = groups.filter((item, index) => groups.indexOf(item) === index);
    console.log(filteredGroups);

    return (
        <main>
            {filteredGroups.map(group => (
                <section className='mainSection' key={group}>
                    <h2>{group}</h2>
                    <ul>
                        {data.map(item => 
                            group === item.p_group ? <MainList key={item.p_id} data={item} /> : null
                        )}
                    </ul>
                </section>
            ))}
        </main>
    );
}

export default MainPage;