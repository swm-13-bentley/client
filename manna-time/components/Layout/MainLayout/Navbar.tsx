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

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isFeedbackShown, setIsFeedbackShown] = useRecoilState(FeedbackState)
	const {t} = useTranslation(['common'])

	return (
		<>
			{isFeedbackShown && <Feedback />}
			<Box>
				<nav className=" shadow fixed w-full z-20 bg-white" >
					<div className="w-full">
						<div className="flex items-center h-20 w-full">
							<div className="flex items-center  mx-10  justify-between w-full">
								<div className="flex justify-center items-center flex-shrink-0 ">
									<h1 className="font-extrabold text-xl cursor-pointer"
									onClick={() => {
										window.location.href = `/`;
									}}
									>
										<span className="text-blue-500">언제만나</span>
									</h1>
								</div>
								<div className="hidden md:block">
									<div className="ml-10 flex items-baseline space-x-4">
										<Link
											onClick={() => {
												setIsFeedbackShown(true)
											}}
											activeClass="feedback"
											to="feedback"
											smooth={true}
											offset={50}
											duration={500}
											className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
										>
											피드백 보내기
										</Link>
										<Link
											onClick={() => {
												window.location.href = `/ko/privacy-policy`;
											}}
											activeClass="privacy-policy"
											to="/ko/privacy-policy"
											smooth={true}
											offset={50}
											duration={500}
											className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
										>
											개인정보처리방침
										</Link>
									</div>
								</div>
							</div>
							<div className="mr-10 flex md:hidden ">
								<button
									onClick={() => setIsOpen(!isOpen)}
									type="button"
									className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
									aria-controls="mobile-menu"
									aria-expanded="false"
								>
									<span className="sr-only">Open main menu</span>
									{!isOpen ? (
										<svg
											className="block h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									) : (
										<svg
											className="block h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>
					</div>

					<Transition
						show={isOpen}
						enter="transition ease-out duration-100 transform"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="transition ease-in duration-75 transform"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{(ref) => (
							<div className="md:hidden z-50" id="mobile-menu" >
								<div
									ref={React.createRef}
									className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
								>
									<Link
										onClick={() => {
											setIsFeedbackShown(true)
										}}
										activeClass="feedback"
										to="feedback"
										smooth={true}
										offset={50}
										duration={500}
										className="z-50 cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									>
										피드백 보내기
									</Link>
									<Link
										onClick={() => {
											window.location.href = `/ko/privacy-policy`;
										}}
										activeClass="privacy-policy"
										to="/ko/privacy-policy"
										smooth={true}
										offset={50}
										duration={500}
										className="z-50 cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									>
										개인정보처리방침
									</Link>
								</div>
							</div>
						)}
					</Transition>
				</nav>
			</Box>
		</>
	);
}

export default Navbar