import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdList, MdRecommend, MdSearch, MdAddBox, MdLibraryMusic, MdMenu, MdClose } from "react-icons/md";

export default function Header(){
    // 모바일 화면에서 메뉴 토글
    const [ on, setOn ] = useState(false);

    function onToggle() {
        setOn(!on);
    }

    return (
        <header className={on? "on" : ""}>
            <div id="mobileDiv">
                <h1>
                    <Link to="/">Music</Link>
                </h1>
                <div id="toggle" onClick={onToggle} >
                    {on ? <MdClose /> : <MdMenu /> }
                </div>
            </div>
            <div id="headerMenu" onClick={onToggle}>
                <ul>
                    <li>
                        <Link to="/">
                            <MdList/>
                            전체 리스트
                        </Link>
                    </li>
                    <li>
                        <Link to="/recommend">
                            <MdRecommend/>
                            랜덤 추천
                        </Link>
                    </li>
                    <li>
                        <Link to="/search">
                            <MdSearch/>
                            검색
                        </Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/create">
                            <MdAddBox/>
                            플레이리스트 생성
                        </Link>
                    </li>
                    <li>
                        <Link to="/add">
                            <MdLibraryMusic/>
                            노래 추가하기
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}