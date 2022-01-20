import React from 'react';
import './create.scss';

function CreatePage() {
    return (
        <main id="createMain">
            <h2>플레이리스트 생성하기</h2>
            <table>
                <tbody>
                    <tr>
                        <th>플레이리스트 이름</th>
                        <td><input type="text" name="p_name" /></td>
                    </tr>
                    <tr>
                        <th>플레이리스트 사진</th>
                        <td>
                            <input type="file" name="p_imgUrl" />
                            {/* 이미지 미리보기 만들기 */}
                        </td>
                    </tr>
                    <tr>
                        <th>플레이리스트 설명</th>
                        <td><textarea name="p_desc"></textarea></td>
                    </tr>
                    <tr>
                        <th>카테고리 선택</th>
                        <td>
                            <select name="p_category">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} id='btnTd'>
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