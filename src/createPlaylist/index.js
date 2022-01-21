import React, { useState } from 'react';
import './create.scss';
import useAsync from '../hooks/useAsync';
import { API_URL } from '../config/constants';
import axios from 'axios';

// db에서 카테고리 data 가져오기
async function getCategories() {
    const response = await axios.get(
        `${API_URL}/categories`
    )
    return response.data;
}

function CreatePage() {
    // imgUrl 상태 관리
    const [ imgUrl, setImgUrl ] = useState(null);
    // selectValue 상태 관리
    const [ selectValue, setSelectValue ] = useState("");

    // select의 value에 변화가 생길때마다 setSelectValue로 selectValue값 업데이트
    function onChangeSelect(e) {
        setSelectValue(e.target.value);
    }

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
    if(!categories) return null;

    // 가져온 data 가공하기
    const sortedCat = new Object();
    categories[0].map(group => {
        categories[1].map(category => {
            if(group.c_group === category.c_group) {
                let newList = category.lists.split(',');
                sortedCat[group.c_group] = newList;
            }
        })
    })

    return (
        <main id="createMain">
            <h2>플레이리스트 생성하기</h2>
            <table>
                <tbody>
                    <tr>
                        <th>*플레이리스트 이름</th>
                        <td><input type="text" name="p_name" /></td>
                    </tr>
                    <tr>
                        <th>*플레이리스트 사진</th>
                        <td className="uploadTd">
                            <input type="file" accept="image/*" name="p_imgUrl" onChange={onLoadFile} />
                            <div className="imgPreview">
                                {imgUrl ? 
                                (<img src={`${imgUrl}`} alt="앨범 사진"/>) : 
                                (<p>이미지 미리보기</p>)}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>*플레이리스트 설명</th>
                        <td><textarea name="p_desc"></textarea></td>
                    </tr>
                    <tr>
                        <th>*태그 선택</th>
                        <td>
                            <select name="s_group" value={selectValue} onChange={onChangeSelect}>
                                <option value="">선택하기</option>
                                {Object.keys(sortedCat).map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>
                            <select name="s_category">
                                <option value="">선택하기</option>
                                {selectValue ? 
                                (sortedCat[selectValue].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))) : 
                                null
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='btnTd'>
                            <button type="submit">생성</button>
                            <button type="reset">취소</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default CreatePage;