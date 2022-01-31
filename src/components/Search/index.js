import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import './search.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';

function SearchPage() {
    // search input 값이 바뀔때마다 상태 관리
    const [ search, setSearch ] = useState(null);

    // 검색 결과 가져오기
    async function getResult(value) {
        const response = await axios.get(
            `${API_URL}/search/${value}`
        )
        return response.data;
    }

    // input의 값이 바뀔때마다 상태 업데이트
    function onChange(e) {
        const keyword = e.target.value;
        setSearch(keyword);
        // keyword가 없으면(input의 값을 다 지우면) 다시 null로 설정하기
        if(!keyword) setSearch(null);
    }

    // useAsync로 search 값이 바뀔때마다 데이터 가져오기
    const state = useAsync(() => getResult(search), [search]);
    const { data } = state;

    // form을 submit하면 페이지가 새로고침 되는 이벤트 방지
    function onSubmit(e) {
        e.preventDefault();
    }
    
    return (
        <main>
            <section id="inputSection">
                <form onSubmit={onSubmit}>
                    <input type="search" placeholder="음악, 아티스트, 앨범" onChange={onChange} />
                    <button type="submit"><FiSearch /></button>
                </form>
            </section>
            <section id="resultSection">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>TITLE/ARTIST</th>
                            <th>ALBUM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* data가 있으면 데이터를 나타내고 없으면 아무것도 나타내지 않기 */}
                        { data ?
                        (data.map(item => (
                            <tr key={item.s_id}>
                                <td className="imgTd">
                                    <img src={`${API_URL}/${item.s_imgUrl}`} alt="앨범 사진" />
                                </td>
                                <td>
                                    <p className="s_name">
                                        <Link to={`/song/${item.s_id}`}>{item.s_name}</Link>
                                    </p>
                                    <p className="s_artist">{item.s_artist}</p>
                                </td>
                                <td>{item.s_album}</td>
                            </tr>))
                        ) : 
                        null }
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default SearchPage;