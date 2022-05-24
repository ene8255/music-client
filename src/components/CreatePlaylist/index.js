import React, { useState } from 'react';
import './form.scss';
import { Form, Input, Button, Upload } from "antd";
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

// db에서 카테고리 data 가져오기
async function getCategories() {
    const response = await axios.get(
        `${API_URL}/categories`
    )
    return response.data;
}

function CreatePage() {
    const navigate = useNavigate();

    // imgUrl 상태 관리
    const [ imgUrl, setImgUrl ] = useState(null);
    // selectValue 상태 관리
    const [ selectValue, setSelectValue ] = useState("");

    // select의 value에 변화가 생길때마다 setSelectValue로 업데이트
    function onChangeSelect(e) {
        setSelectValue(e.target.value);
    }

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
    const sortedCat = new Object();
    categories[0].map(group => {
        categories[1].map(category => {
            if(group.c_group === category.c_group) {
                let newList = category.lists.split(',');
                sortedCat[group.c_group] = newList;
            }
        })
    })

    // form submit 되면 실행되는 함수
    function onSubmit(values) {
        if(!imgUrl) {
            alert("사진 업로드를 해주세요!");
        }else {
            axios.post(`${API_URL}/playlists`, {
                p_name: values.p_name,
                p_imgUrl: imgUrl,
                p_desc: values.p_desc,
                p_group: values.p_group,
                p_category: values.p_category
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
            <h2>플레이리스트 생성하기</h2>
            <div className="formDiv">
                <Form name="createForm" onFinish={onSubmit}>
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
                        <div className="imgPreview">
                            {imgUrl ? 
                            (<img src={`${imgUrl}`} alt="앨범 사진"/>) : 
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
                        <Form.Item name="p_group" noStyle
                            rules={[{ required: true, message: "태그를 선택해 주세요" }]}
                        >
                            <select value={selectValue} onChange={onChangeSelect}>
                                <option value="">선택하기</option>
                                {Object.keys(sortedCat).map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
                        </Form.Item>
                        <Form.Item name="p_category" noStyle
                            rules={[{ required: true, message: "태그를 선택해 주세요" }]}
                        >
                            <select>
                                <option value="">선택하기</option>
                                {selectValue ? 
                                (sortedCat[selectValue].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))) : 
                                null}
                            </select>
                        </Form.Item>
                    </Form.Item>
                    <hr />
                    <Form.Item className="formItem btnArea">
                        <Button htmlType="submit">생성하기</Button>
                        <Button htmlType="reset">리셋</Button>
                    </Form.Item>
                </Form>
            </div>
        </main>
    );
}

export default CreatePage;