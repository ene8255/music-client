import React, { useState } from 'react';
import { ImShuffle } from "react-icons/im";
import './random.scss';
import CardSection from './CardSection';

function RandomPage() {
    const [ songNum, setSongNum ] = useState(null);

    function onSubmit(e) {
        e.preventDefault();
        let inputNum = e.target.inputNum.value;
        setSongNum(inputNum);
        // if(inputNum === songNum) {
        // }
    }

    return (
        <main>
            <section id="titleSection">
                <h2>랜덤 추천</h2>
                <form onSubmit={onSubmit}>
                    <input name="inputNum" type="number" min={1} max={30} defaultValue={1} /> 곡
                    <button type="submit">선택 <ImShuffle /></button>
                </form>
            </section>
            <CardSection songNum={songNum} setSongNum={setSongNum} />
        </main>
    );
}

export default RandomPage;
