import React from 'react';

function DetailPage(props) {
    return (
        <div>
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/xBa3YUgQeL4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0qTQR92UuUA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            {/* 유튜브 동영상이 음악 동영상이 아닌 다른 동영상 이라면 막을 방법은?*/}
        </div>
    );
}

export default DetailPage;