import React from 'react';
import { Link } from 'react-router-dom';

function MainList({ data }) {
    const { p_id, p_name, p_imgUrl, p_desc } = data;

    return (
        <li>
            <Link to={`/playlist/${p_id}`}>
                <div>
                    <img src={p_imgUrl}/>
                </div>
                <h3>{p_name}</h3>
                <p>{p_desc}</p>
            </Link>
        </li>
    );
}

export default MainList;