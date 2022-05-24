import React, { useState } from 'react';
import '../CreatePlaylist/form.scss';
import { Form, Input, Button, Upload } from "antd";
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

// db에서 카테고리 data 가져오기
async function getCategories() {
    const response = await axios.get(
        `${API_URL}/categories`
    )
    return response.data;
}

function EditSongPage() {
    const navigate = useNavigate();

    // params id 받아오기
    const param = useParams();
    const { id } = param;

    // 해당 id의 노래 정보 가져오기
    async function getSong() {
        const response = await axios.get(
            `${API_URL}/song/${id}`
        )
        return response.data;
    }

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
    const stateCat = useAsync(getCategories);
    const stateSong = useAsync(getSong);
    const { loading: lSong, error: eSong, data: song } = stateSong;
    const { loading: lCat, error: eCat, data: categories } = stateCat;

    if(lSong || lCat) return <main><h3>로딩중...</h3></main>;
    if(eSong || eCat) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!song || !categories) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

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

    // 체크박스의 checked 속성이 true이면 원래 imgUrl 가져오기
    function onChangeCk(e) {
        const checked = e.target.checked;
        checked? setImgUrl(song[0].s_imgUrl) : setImgUrl(null);
    }

    // youtubeUrl 데이터 가공 + 상태 업데이트
    function onChangeYUrl(e) {
        const urlSplit = e.target.value.split('v=');
        setYoutubeUrl(urlSplit[1]);
    }

    // form submit 하면 수행되는 함수
    function onSubmit(values) {
        if(!imgUrl) {
            alert("사진 업로드를 해주세요!");
        }else if(values.s_youtubeUrl.indexOf("youtube") === -1) {
            alert("유튜브 동영상 url만 입력 가능합니다!");
        }else {
            axios.put(`${API_URL}/song/${id}`, {
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
            <h2>노래 정보 수정하기</h2>
            <div className="formDiv">
                <Form name="createForm" onFinish={onSubmit}
                    initialValues={{
                        s_name: song[0].s_name,
                        s_artist: song[0].s_artist,
                        s_album: song[0].s_album,
                        s_year: song[0].s_year,
                        s_time: song[0].s_time,
                        s_youtubeUrl: `https://www.youtube.com/watch?v=${song[0].s_youtubeUrl}`,
                        s_season: song[0].s_season || "",
                        s_mood: song[0].s_mood || "",
                        s_situation: song[0].s_situation || ""
                    }}
                >
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
                        <Form.Item name="upload" valuePropName="fileList" 
                        getValueFromEvent={normFile} noStyle>
                            <Upload name="image"
                                accept="image/*"
                                action={`${API_URL}/image`}
                                listType="picture"
                                showUploadList = {false}
                            >
                                <Button>사진 업로드</Button>
                            </Upload>
                        </Form.Item>
                        <div className="originalImg">
                            <input type="checkbox" onChange={onChangeCk} /> 
                            <span>원래 사진 사용하기</span>
                        </div>
                        <div className="imgPreview">
                            {imgUrl ? 
                            (<img src={`${imgUrl}`} alt="앨범 사진"/>) : 
                            (<p>이미지 미리보기</p>)}
                        </div>
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem tags" 
                        label={<h3 className="form-label">태그 선택</h3>}
                    >
                        {groups.map((group, index) => (
                            <Form.Item className="tagSelect" key={index} 
                            name={groups_name[index]} label={<h4>{group}</h4>}>
                            <select defaultValue="">
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
                        <Input type="url" value={youtubeUrl ? youtubeUrl : setYoutubeUrl(song[0].s_youtubeUrl)} onChange={onChangeYUrl}/>
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem btnArea">
                        <Button htmlType="submit">수정하기</Button>
                        <Button htmlType="reset">원래대로</Button>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
}

export default EditSongPage;