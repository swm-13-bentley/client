import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { Link } from "react-scroll";
import { Box } from "@chakra-ui/react";
import Logo from "../public/streamlineLogo.png";
import { useTranslation } from "next-i18next";
import Feedback from "@/components/Molecule/Feedback/Feedback";
import { FeedbackState } from "@/src/state";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from './TestNavbar.module.css'
import logo from '@/public/icons/navbar/logo.svg'
import gnbIcon1 from '@/public/icons/navbar/ico_gnb1.svg'
import gnbIcon2 from '@/public/icons/navbar/ico_gnb2.svg'
import gnbIcon3 from '@/public/icons/navbar/ico_gnb3.svg'
import gnbIcon4 from '@/public/icons/navbar/ico_gnb4.svg'
import profileIcon from '@/public/icons/navbar/profile.svg'
import { decodedTokenState, isLoggedInState, tokenState } from "@/src/state/UserInfo";
import { useRouter } from "next/router";

function Navbar() {
    const router = useRouter()

    const [menuOpen, setMenuOpen] = useState(false);
    const [isFeedbackShown, setIsFeedbackShown] = useRecoilState(FeedbackState)
    const { t } = useTranslation(['common'])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const flag = useRecoilValue(isLoggedInState)
    const decodedToken = useRecoilValue(decodedTokenState)
    const [token, setToken] = useRecoilState(tokenState)

    useEffect(() => {
        if (flag)
            setIsLoggedIn(true)
        else
            setIsLoggedIn(false)
    }, [flag])

    const pushLogin = () => {
        router.push({
            pathname: '/ko/login',
            query: {
                redirect: router.asPath
            }
        }, '/ko/login')
    }

    return (
        <>
            {isFeedbackShown && <Feedback />}
            <header id={styles.header}>
                <div className={`${styles.div} ${styles.inner} ${styles.clearfix}`}>
                    <h1 className={styles.h1}>
                        <Link className={styles.a} onClick={() => { window.location.href = "/" }} to="home">
                            <Image src={logo} alt="Mannatime" />
                        </Link>
                    </h1>
                    <nav id={styles.nav} className={styles.only_pc}>
                        <ul className={styles.ul}>
                            <li className={styles.li}>
                                <button className={styles.a} style={{fontWeight:"400", fontSize:"14px"}} onClick={() => {
                                    window.location.href = `/ko/make-room`;
                                }}>약속 만들기</button>
                            </li>
                            {/* TODO: 로그인 후  */}
                            {
                                isLoggedIn && (
                                    <>
                                        <li className={styles.li}><button style={{fontWeight:"400", fontSize:"14px"}} className={styles.a}>내 약속</button></li>
                                        <li className={styles.li}><button style={{fontWeight:"400", fontSize:"14px"}} className={styles.a}>캘린더 관리</button></li>
                                    </>
                                )
                            }

                            <li className={styles.li}>
                                <button className={styles.a} style={{fontWeight:"400", fontSize:"14px"}}
                                    onClick={() => {
                                        setIsFeedbackShown(true)
                                    }}
                                >피드백 보내기</button>
                            </li>
                        </ul>
                    </nav>
                    <span className={`${styles.span} ${styles.menu}`} onClick={() => { setMenuOpen(true) }}>메뉴</span>
                    <div className={`${styles.div} ${styles.right_hd} ${styles.only_pc}`}>

                        {
                            isLoggedIn
                                ?
                                (<div className={`${styles.div} ${styles.user_box}`}>
                                    <Image className={`${styles.div} ${styles.profile}`} src={profileIcon} alt="profile"></Image>
                                    <h2 className={`${styles.h2}`}>{decodedToken.sub}님</h2>
                                </div>)
                                :
                                (<div className={`${styles.div} ${styles.hd_login}`}>
                                    <Link className={styles.a} onClick={pushLogin} to="login">로그인</Link>
                                    <Link className={styles.a} onClick={pushLogin} to="login">회원가입</Link>
                                    <div className={`${styles.div} ${styles.tooltip}`}>프리미엄 서비스가 무료!</div>
                                </div>)
                        }
                    </div>
                    <div className={menuOpen ? ` ${styles.div} ${styles.m_nav} ${styles.only_m} ${styles.on}` : `${styles.div} ${styles.m_nav} ${styles.only_m}`}>
                        <div className={`${styles.div} ${styles.gnb}`}>
                            <span className={`${styles.span} ${styles.close}`} onClick={() => { setMenuOpen(false) }}>닫기</span>
                            <div className={`${styles.div} ${styles.gnb_info}`}>
                                {
                                    isLoggedIn
                                        ?
                                        <div className={`${styles.div} ${styles.user_box}`}>
                                            <Image className={`${styles.div} ${styles.profile}`} src={profileIcon} alt="profile" width="50px" height="50px"></Image>
                                            <div className={`ml-3`}>
                                                <h2 className={`${styles.h2}`}>{decodedToken.sub}님</h2>
                                                <p className={`${styles.p}`}>{decodedToken.email}</p>
                                            </div>
                                        </div>
                                        :
                                        <button className={`${styles.button} ${styles.btn_blue}`} onClick={pushLogin}>로그인/회원가입</button>

                                }
                            </div>
                            {
                                isLoggedIn
                                    ?
                                    <div className={`${styles.div} ${styles.gnb_banner} ${styles.member}`}>
                                        <p>
                                            베타 테스터로<br />
                                            프리미엄 서비스 무료 이용중
                                        </p>
                                    </div>
                                    :
                                    <div className={`${styles.gnb_banner} ${styles.no_member}`}>
                                        <p className={styles.p}>
                                            로그인만으로
                                            <br />
                                            프리미엄 서비스가 무료!
                                        </p>
                                    </div>
                            }

                            <ul className={styles.ul}>
                                <li className={styles.li}>
                                    <button className={styles.a} style={{fontWeight:"400", fontSize:"18px"}} onClick={() => {
                                        window.location.href = `/ko/make-room`;
                                    }}>
                                        <Image src={gnbIcon1} alt="약속 만들기" />
                                        약속 만들기
                                    </button>
                                </li>
                                <li className={styles.li}>
                                    <button className={styles.a} style={{fontWeight:"400", fontSize:"18px"}}>
                                        <Image src={gnbIcon2} alt="내 약속" />내 약속
                                    </button>
                                </li>
                                <li className={styles.li}>
                                    <button className={styles.a} style={{fontWeight:"400", fontSize:"18px"}}>
                                        <Image src={gnbIcon3} alt="캘린더 관리" />
                                        캘린더 관리
                                    </button>
                                </li>
                                <li className={styles.li}>
                                    <button className={styles.a} style={{fontWeight:"400", fontSize:"18px"}} onClick={() => setIsFeedbackShown(true)}>
                                        <Image src={gnbIcon4} alt="피드백 보내기" />
                                        피드백 보내기
                                    </button>
                                </li>
                            </ul>
                            {/* TODO: 로그인 후    */}
                            {
                                isLoggedIn && <span className={styles.hd_logout} onClick={()=>{setToken("")}}>로그아웃</span>
                            }

                        </div>
                        <div className={`${styles.div} ${styles.bg}`} />
                    </div>
                </div>
            </header>

        </>
    );
}

export default Navbar