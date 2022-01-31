import React, { useState } from 'react';
import { ImShuffle } from "react-icons/im";
import './random.scss';
import CardSection from './CardSection';

function RandomPage() {
    // 곡 선택 input 값 상태 관리
    const [ songNum, setSongNum ] = useState(null);

    // form submit하면 실행되는 함수
    function onSubmit(e) {
        e.preventDefault();
        let inputNum = e.target.inputNum.value;
        setSongNum(inputNum);
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
