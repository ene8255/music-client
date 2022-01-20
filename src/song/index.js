import React from 'react';
import styled from 'styled-components';
import './song.scss';

const AlbumBlurBg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background-image: url("../imgs/outoftime.png");
    filter: blur(30px);
    z-index: -1;
`;

function SongPage() {
    return (
        <main id='songMain'>
            <section>
                <div id='albumImg'>
                    <img src='../imgs/outoftime.png'/>
                    <AlbumBlurBg />
                </div>
            </section>
            <section id='songDesc'>
                <h2>Out of Time</h2>
                <h3>TheWeeknd</h3>
                <ul>
                    <li>앨범: Dawn FM(Alternate World)</li>
                    <li>발매연도: 2022</li>
                    <li>시간: 3:35</li>
                    <li><span>#겨울</span> <span>#신남</span></li>
                </ul>
            </section>
            <section id='youtube'>
                <iframe width="854" height="480" src="https://www.youtube-nocookie.com/embed/xBa3YUgQeL4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                {/* 유튜브 동영상이 음악 동영상이 아닌 다른 동영상 이라면 막을 방법은?*/}
            </section>
        </main>
    );
}

export default SongPage;