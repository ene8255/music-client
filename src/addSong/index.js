import React from 'react';

function AddPage() {
    return (
        <main>
            <h2>노래 추가하기</h2>
            <form>
                <tbody>
                    <tr>
                        <th>노래명</th>
                        <td><input type="text" name="s_name" /></td>
                    </tr>
                    <tr>
                        <th>가수명</th>
                        <td><input type="text" name="s_artist" /></td>
                    </tr>
                    <tr>
                        <th>앨범명</th>
                        <td><input type="text" name="s_album" /></td>
                    </tr>
                    <tr>
                        <th>발매연도</th>
                        <td><input type="text" name="s_year" /></td>
                    </tr>
                    <tr>
                        <th>시간</th>
                        <td><input type="text" name="s_time" /></td>
                    </tr>
                    <tr>
                        <th>앨범 사진</th>
                        <td><input type="file" name="s_imgUrl" /></td>
                    </tr>
                    <tr>
                        <td>
                            <button type='submit'>추가하기</button>
                            <button type='reset'>취소</button>
                        </td>
                    </tr>
                </tbody>
            </form>
        </main>
    );
}

export default AddPage;