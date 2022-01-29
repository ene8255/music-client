import React, { useState } from 'react';
import '../CreatePlaylist/form.scss';
import { Form, Input, Button, Upload } from "antd";
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// db에서 카테고리 data 가져오기
async function getCategories() {
    const response = await axios.get(
        `${API_URL}/categories`
    )
    return response.data;
}

function AddPage() {
    const navigate = useNavigate();

    // imgUrl 상태 관리
    const [ imgUrl, setImgUrl ] = useState(null);
    // youtubeUrl 상태 관리
    const [ youtubeUrl, setYoutubeUrl ] = useState(null);

    // 이미지 처리함수
    const normFile = (e) => {
        // 파일이 업로드 중일때
        if(e.file.status === 'uploading'){
            return;
        }
        // 파일이 업로드 완료되었을때
        if(e.file.status === 'done'){
            const response = e.file.response;
            const imageUrl = response.imageUrl;
            setImgUrl(imageUrl);
        }
    };

    // useAsync로 data 받아오는 상태 관리
    const state = useAsync(getCategories);
    const { loading, error, data: categories } = state;
    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!categories) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    // 가져온 data 가공하기
    const groups = new Array();
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
    const groups_name = ["s_season", "s_mood", "s_situation"];

    // youtubeUrl 데이터 가공 + 상태 업데이트
    function onChangeYUrl(e) {
        const urlSplit = e.target.value.split('v=');
        setYoutubeUrl(urlSplit[1]);
    }

    function onSubmit(values) {
        if(!imgUrl) {
            alert("사진 업로드를 해주세요!");
        }else if(values.s_youtubeUrl.indexOf("youtube") === -1) {
            alert("유튜브 동영상 url만 입력 가능합니다!");
        }else {
            axios.post(`${API_URL}/songs`, {
                s_name: values.s_name,
                s_artist: values.s_artist,
                s_album: values.s_album,
                s_year: values.s_year,
                s_time: values.s_time,
                s_imgUrl: imgUrl,
                s_season: values.s_season,
                s_mood: values.s_mood,
                s_situation: values.s_situation,
                s_youtubeUrl: youtubeUrl
            }).then((result) => {
                console.log(result);
                navigate(-1);
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    return (
        <main className="formStyle songForm">
            <h2>노래 추가하기</h2>
            <div className="formDiv">
                <Form name="createForm" onFinish={onSubmit}>
                    <hr />
                    <Form.Item name="s_name" className="formItem"
                        label={<h3 className="form-label">노래명</h3>} 
                        rules={[{ required: true, message: "노래명을 입력해 주세요" }]}
                    >
                        <Input />
                    </Form.Item>
                    <hr />
                    <Form.Item name="s_artist" className="formItem"
                        label={<h3 className="form-label">가수명</h3>} 
                        rules={[{ required: true, message: "가수명을 입력해 주세요" }]}
                    >
                        <Input />
                    </Form.Item>
                    <hr />
                    <Form.Item name="s_album" className="formItem"
                        label={<h3 className="form-label">앨범명</h3>} 
                        rules={[{ required: true, message: "앨범명을 입력해 주세요" }]}
                    >
                        <Input />
                    </Form.Item>
                    <hr />
                    <Form.Item name="s_year" className="formItem"
                        label={<h3 className="form-label">발매연도</h3>} 
                        rules={[{ required: true, message: "발매연도를 숫자만 입력해 주세요" }]}
                    >
                        <Input placeholder='(예시) 2022'/>
                    </Form.Item>
                    <hr />
                    <Form.Item name="s_time" className="formItem"
                        label={<h3 className="form-label">재생시간</h3>} 
                        rules={[{ required: true, message: "'분:초' 형태로 입력해 주세요." }]}
                    >
                        <Input placeholder='(예시) 3:20'/>
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem" 
                        label={<h3 className="form-label">앨범 사진</h3>}
                    >
                        <Form.Item name="upload" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload name="image"
                                accept="image/*"
                                action={`${API_URL}/image`}
                                listType="picture"
                                showUploadList = {false}
                            >
                                <Button>사진 업로드</Button>
                            </Upload>
                        </Form.Item>
                        <div className="imgPreview">
                            {imgUrl ? 
                            (<img src={`${API_URL}/${imgUrl}`} alt="앨범 사진"/>) : 
                            (<p>이미지 미리보기</p>)}
                        </div>
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem tags" 
                        label={<h3 className="form-label">태그 선택</h3>}
                    >
                        <span>(중복선택 가능)</span>
                        {groups.map((group, index) => (
                            <Form.Item className="tagSelect" key={index} name={groups_name[index]} label={<h4>{group}</h4>}>
                            <select>
                                <option value="">선택하기</option>
                                {sortedCat[group].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            </Form.Item> 
                        ))}
                    </Form.Item>
                    <hr />
                    <Form.Item name="s_youtubeUrl" className="formItem"
                        label={<h3 className="form-label">YouTube 동영상 주소</h3>} 
                        rules={[{ required: true, message: "(예시)https://www.youtube.com/watch?v=7Qp5vcuMIlk" }]}
                    >
                        <Input type="url" value={youtubeUrl} onChange={onChangeYUrl}/>
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem btnArea">
                        <Button htmlType="submit">추가하기</Button>
                        <Button htmlType="reset">리셋</Button>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
}

export default AddPage;