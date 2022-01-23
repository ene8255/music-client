import React, { useState } from 'react';
import '../CreatePlaylist/create.scss';
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';
import axios from 'axios';

// db에서 카테고리 data 가져오기
async function getCategories() {
    const response = await axios.get(
        `${API_URL}/categories`
    )
    return response.data;
}

function AddPage() {
    // imgUrl 상태 관리
    const [ imgUrl, setImgUrl ] = useState(null);

    // 이미지 파일 미리보기
    function onLoadFile(e) {
        const files = e.target.files;
        const reader = new FileReader();
        // readAsDataURL로 파일을 읽어오면 result에 결과를 담음
        reader.readAsDataURL(files[0]);
        // result의 값을 imgUrl값으로 넣어줌
        reader.onload = () => {
            setImgUrl(reader.result);
        }
    }

    // useAsync로 data 받아오는 상태 관리
    const state = useAsync(getCategories);
    const { loading, error, data: categories } = state;
    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!categories) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    // 가져온 data 가공하기
    const groups = new Array;
    const sortedCat = new Object();
    categories[0].map(group => {
        groups.push(group.c_group);
        categories[1].map(category => {
            if(group.c_group === category.c_group) {
                let newList = category.lists.split(',');
                sortedCat[group.c_group] = newList;
            }
        })
    })
    const firtstCat = groups.shift();

    return (
        <main id="addMain">
            <h2>노래 추가하기</h2>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <th>*노래명</th>
                            <td><input type="text" name="s_name" /></td>
                        </tr>
                        <tr>
                            <th>*가수명</th>
                            <td><input type="text" name="s_artist" /></td>
                        </tr>
                        <tr>
                            <th>*앨범명</th>
                            <td><input type="text" name="s_album" /></td>
                        </tr>
                        <tr>
                            <th>*발매연도</th>
                            <td><input type="number" name="s_year" min="1900" max="2022" defaultValue="2022" /></td>
                        </tr>
                        <tr>
                            <th>*시간</th>
                            <td><input type="text" name="s_time" placeholder="'분:초' 형태로 입력해 주세요." /></td>
                        </tr>
                        <tr>
                            <th>*앨범 사진</th>
                            <td className="uploadTd">
                                <input type="file" accept="image/*" name="s_imgUrl" onChange={onLoadFile} />
                                <div className="imgPreview">
                                    {imgUrl ? 
                                    (<img src={`${imgUrl}`} alt="앨범 사진"/>) : 
                                    (<p>이미지 미리보기</p>)}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th rowSpan={3}>
                                태그 선택 <br />
                                <span id="TagDesc">(여러개 선택 가능)</span>
                            </th>
                            <td>
                                <strong>{firtstCat}</strong>
                                <select name={firtstCat}>
                                    <option value="">선택하기</option>
                                    {sortedCat[firtstCat].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>))}
                                </select>
                            </td>
                        </tr>
                    {groups.map(group => (
                        <tr key={group}>
                            <td>
                                <strong>{group}</strong>
                                <select name={group}>
                                    <option value="">선택하기</option>
                                {sortedCat[group].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                        <tr>
                            <td colSpan={2} className="btnTd">
                                <button type='submit'>추가하기</button>
                                <button type='reset'>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </main>
    );
}

export default AddPage;