import { Link } from 'react-router-dom';
import { MdList, MdRecommend, MdSearch, MdAddBox, MdLibraryMusic } from "react-icons/md";

export default function Header(){
    return (
        <header>
            <h1><Link to="/">Music</Link></h1>
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
        </header>
    );
}