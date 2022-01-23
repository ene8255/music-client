import React from 'react';
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa"

function Footer() {
    return (
        <footer>
            <div id="footerMenu-top">
                <ul id="menuLists">
                    <li>회사
                        <ul className="submenu">
                            <li>상세정보</li>
                            <li>채용 정보</li>
                            <li>For the Record</li>
                        </ul>
                    </li>
                    <li>커뮤니티
                        <ul className="submenu">
                            <li>아티스트</li>
                            <li>개발자</li>
                            <li>투자자</li>
                            <li>공급업체</li>
                        </ul>
                    </li>
                    <li>유용한 링크
                        <ul className="submenu">
                            <li>지원</li>
                        </ul>
                    </li>
                </ul>
                <ul id="socialIcons">
                    <li><FaInstagram/></li>
                    <li><FaTwitter/></li>
                    <li><FaFacebookF/></li>
                </ul>
            </div>
            <div id="footerMenu-bottom">
                <ul>
                    <li>법률 정보</li>
                    <li>개인정보 보호 센터</li>
                    <li>개인정보 처리방침</li>
                </ul>
                <span>© 2022 Music</span>
            </div>
        </footer>
    );
}

export default Footer;