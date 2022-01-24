import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/constants';

function MainList({ data }) {
    const { p_id, p_name, p_imgUrl, p_desc } = data;

    return (
        <li>
            <Link to={`/playlist/${p_id}`}>
                <div>
                    <img src={`${API_URL}/${p_imgUrl}`}/>
                </div>
                <h3>{p_name}</h3>
                <p>{p_desc}</p>
            </Link>
        </li>
    );
}

export default MainList;