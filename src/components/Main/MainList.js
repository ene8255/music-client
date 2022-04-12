import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/constants';
import { MouseContext } from '../../context/mouse-context';

function MainList({ data }) {
    const { cursorChangeHandler } = useContext(MouseContext);

    const { p_id, p_name, p_imgUrl, p_desc } = data;

    return (
        <li>
            <Link to={`/playlist/${p_id}`}
                onMouseEnter={() => cursorChangeHandler("hovered")}
                onMouseLeave={() => cursorChangeHandler("")}
            >
                <div>
                    <img src={`${API_URL}/${p_imgUrl}`} alt='playlist' />
                </div>
                <h3>{p_name}</h3>
                <p>{p_desc}</p>
            </Link>
        </li>
    );
}

export default MainList;