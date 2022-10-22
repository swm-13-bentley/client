import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { Link } from "react-scroll";
import { Box } from "@chakra-ui/react";
import Logo from "../public/streamlineLogo.png";
import { useTranslation } from "next-i18next";
import Feedback from "@/components/Molecule/Feedback/Feedback";
import { FeedbackState } from "@/src/state";
import { useRecoilState } from "recoil";
import styles from './TestNavbar.module.css'
import logo from '@/public/icons/navbar/logo.svg'
import gnbIcon1 from '@/public/icons/navbar/ico_gnb1.svg'
import gnbIcon2 from '@/public/icons/navbar/ico_gnb2.svg'
import gnbIcon3 from '@/public/icons/navbar/ico_gnb3.svg'
import gnbIcon4 from '@/public/icons/navbar/ico_gnb4.svg'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isFeedbackShown, setIsFeedbackShown] = useRecoilState(FeedbackState)
    const { t } = useTranslation(['common'])

    return (
        <>
            {isFeedbackShown && <Feedback />}
            <header id={styles.header}>
                <div className={`${styles.div} ${styles.inner} ${styles.clearfix}`}>
                    <h1 className={styles.h1}>
                        <a className={styles.a} href="./index.html">
                            <Image src={logo} alt="Mannatime" />
                        </a>
                    </h1>
                    <nav id={styles.nav} className={styles.only_pc}>
                        <ul className={styles.ul}>
                            <li className={styles.li}>
                                <Link className={styles.a} onClick={() => {
                                    window.location.href = `/ko/make-room`;
                                }} to="make-room">약속 만들기</Link>
                            </li>
                            {/* TODO: 로그인 후 
                            <li className={styles.li}><a className={styles.a} href="#n">내 약속</a></li>
                            <li className={styles.li}><a className={styles.a} href="#n">캘린더 관리</a></li>
                            //로그인 후 */}
                            <li className={styles.li}>
                                <a className={styles.a}
                                    onClick={() => {
                                        setIsFeedbackShown(true)
                                    }}
                                >피드백 보내기</a>
                            </li>
                        </ul>
                    </nav>
                    <span className={`${styles.span} ${styles.menu}`} onClick={() => { setMenuOpen(true) }}>메뉴</span>
                    <div className={`${styles.div} ${styles.right_hd} ${styles.only_pc}`}>
                        <div className={`${styles.div} ${styles.hd_login}`}>
                            <a className={styles.a} href="#n">로그인</a>
                            <a className={styles.a} href="#n">회원가입</a>
                            <div className={`${styles.div} ${styles.tooltip}`}>프리미엄 서비스가 무료!</div>
                        </div>
                        {/* TODO: 로그인 후   
                        <div class="user_box">
                            <div class="profile" style="background-image: url('/icons/navbar/profile.svg')"></div>
                            <h2>이영석님</h2>
                        </div>
                        //로그인 후 */}
                    </div>
                    <div className={menuOpen ? ` ${styles.div} ${styles.m_nav} ${styles.only_m} ${styles.on}` : `${styles.div} ${styles.m_nav} ${styles.only_m}`}>
                        <div className={`${styles.div} ${styles.gnb}`}>
                            <span className={`${styles.span} ${styles.close}`} onClick={() => { setMenuOpen(false) }}>닫기</span>
                            <div className={`${styles.div} ${styles.gnb_info}`}>
                                <button className={`${styles.button} ${styles.btn_blue}`}>로그인/회원가입</button>
                                {/* TODO: 로그인 후   
                                <div class="user_box">
                                    <div class="profile" style="background-image: url('/icons/navbar/profile.svg')"></div>
                                    <div>
                                        <h2>이영석님</h2>
                                        <p>lysuk96@yahoo.net</p>
                                    </div>
                                </div>
                                */}
                            </div>
                            <div className={`${styles.gnb_banner} ${styles.no_member}`}>
                                <p className={styles.p}>
                                    로그인만으로
                                    <br />
                                    프리미엄 서비스가 무료!
                                </p>
                            </div>
                            {/* TODO: 로그인 후   
                            <div class="gnb_banner member">
                                <p>
                                    베타 테스터로<br />
                                    프리미엄 서비스 무료 이용중
                                </p>
                            </div>
                            */}
                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <Link className={styles.a} onClick={() => {
                                        window.location.href = `/ko/make-room`;
                                    }} to="make-room">
                                        <Image src={gnbIcon1} alt="약속 만들기" />
                                        약속 만들기
                                    </Link>
                                </li>
                                <li className={styles.li}>
                                    <Link className={styles.a} href="/" to="my-plan">
                                        <Image src={gnbIcon2} alt="내 약속" />내 약속
                                    </Link>
                                </li>
                                <li className={styles.li}>
                                    <Link className={styles.a} href="/" to="my-calendar">
                                        <Image src={gnbIcon3} alt="캘린더 관리" />
                                        캘린더 관리
                                    </Link>
                                </li>
                                <li className={styles.li}>
                                    <a className={styles.a} onClick={() => setIsFeedbackShown(true)}>
                                        <Image src={gnbIcon4} alt="피드백 보내기" />
                                        피드백 보내기
                                    </a>
                                </li>
                            </ul>
                            {/* TODO: 로그인 후   
                            <span class="hd_logout">로그아웃</span>
                            */}
                        </div>
                        <div className={`${styles.div} ${styles.bg}`} />
                    </div>
                </div>
            </header>

        </>
    );
}

export default Navbar