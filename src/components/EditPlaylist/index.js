import React, { useState } from 'react';
import { Form, Input, Button, Upload } from "antd";
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const { TextArea } = Input;

function EditPlaylistPage() {
    const navigate = useNavigate();

    // params id 받아오기
    const param = useParams();
    const { id } = param;

    // 해당 id의 플레이리스트 정보 가져오기
    async function getPlaylist() {
        const response = await axios.get(
            `${API_URL}/playlist/${id}`
        )
        return response.data;
    }

    // imgUrl 상태 관리
    const [ imgUrl, setImgUrl ] = useState(null);

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
    const state = useAsync(getPlaylist);
    const { loading, error, data: playlist } = state;

    if(loading) return <main><h3>로딩중...</h3></main>;
    if(error) return <main><h3>오류가 발생했습니다.</h3></main>;
    if(!playlist) return <main><h3>데이터를 불러오지 못했습니다.</h3></main>;

    // 체크박스의 checked 속성이 true이면 원래 imgUrl 가져오기
    function onChangeCk(e) {
        const checked = e.target.checked;
        checked ? setImgUrl(playlist[0].p_imgUrl) : setImgUrl(null);
    }

    // form submit 하면 실행되는 함수
    function onSubmit(values) {
        if(!imgUrl) {
            alert("사진 업로드를 해주세요!");
        }else {
            axios.put(`${API_URL}/playlist/${id}`, {
                p_name: values.p_name,
                p_imgUrl: imgUrl,
                p_desc: values.p_desc,
                p_group: playlist[0].p_group,
                p_category: playlist[0].p_category
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
        <main className="formStyle">
            <h2>플레이리스트 수정하기</h2>
            <div className="formDiv">
                <Form name="createForm" onFinish={onSubmit}
                    initialValues={{
                        p_name: playlist[0].p_name,
                        p_desc: playlist[0].p_desc,
                    }}
                >
                    <hr />
                    <Form.Item name="p_name" className="formItem"
                        label={<h3 className="form-label">플레이리스트 이름</h3>} 
                        rules={[{ required: true, message: "플레이리스트 이름을 입력해 주세요" }]}
                    >
                        <Input />
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem" 
                        label={<h3 className="form-label">플레이리스트 대표 사진</h3>}
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
                            (<img src={`${API_URL}/${imgUrl}`} alt="앨범 사진"/>) : 
                            (<p>이미지 미리보기</p>)}
                        </div>
                    </Form.Item>
                    <hr />
                    <Form.Item name="p_desc" className="formItem"
                        label={<h3 className="form-label">플레이리스트 설명</h3>} 
                        rules={[{ required: false }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem tags" 
                        label={<h3 className="form-label">태그 선택</h3>}
                    >
                        <Form.Item name="p_group" noStyle>
                            <select disabled>
                                <option value={playlist[0].p_group}>{playlist[0].p_group}</option>
                            </select>
                        </Form.Item>
                        <Form.Item name="p_category" noStyle>
                            <select disabled>
                                <option value={playlist[0].p_category}>{playlist[0].p_category}</option>
                            </select>
                        </Form.Item>
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

export default EditPlaylistPage;