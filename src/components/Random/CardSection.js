import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';

async function getSongs() {
    const response = await axios.get(
        `${API_URL}/songs`
    )
    return response.data;
}

function CardSection({ songNum }) {
    const state = useAsync(getSongs);
    const { loading, error, data } = state;
    if(loading) return <section id="cardSection"><h3>로딩중...</h3></section>;
    if(error) return <section id="cardSection"><h3>오류가 발생했습니다.</h3></section>;
    if(!data) return null;

    console.log(data);

    let ranIdxs = [];
    for(let i=0; i < songNum; i++) {
        let ranNum = Math.floor(Math.random() * data.length);
        ranIdxs.push(ranNum);
    }
    console.log(ranIdxs);
    // const songs = data.filter()

    const name = data.map(item => item.s_name.length > 15 ? item.s_name.slice(0, 15) + "..." : item.s_name);

    return (
        <section id="cardSection">
                {data ? 
                (
                    data.map((item, index) => (
                        <div className="song-card" key={item.s_id}>
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
                        </div>
                    ))
                ) :
                null }
        </section>
    );
}

export default CardSection;