import React from 'react';
import './main.scss';
import MainList from './MainList';

function MainPage() {
    return (
        <main>
            <section className='mainSection'>
                <h2>요즘 추천</h2>
                <ul>
                    <MainList />
                    <MainList />
                </ul>
            </section>
            <section className='mainSection'>
                <h2>mood</h2>
                <ul>
                    <MainList />
                    <MainList />
                </ul>
            </section>
        </main>
    );
}

export default MainPage;