import ModalCard from "@/components/Atom/ModalCard/ModalCard"
import { NextPage } from "next"
import { useState } from "react"
import BlackBoard from "@/components/Atom/BlackBoard/BlackBoard"
import { useRecoilState } from "recoil"
import { FeedbackState } from "@/src/state";


const Feedback: NextPage = function () {
    const [isShown, setIsShown] = useRecoilState(FeedbackState)

    return (<>
        <BlackBoard
            isShown={isShown}
            onClick={() => { setIsShown(false) }}
        />
        <ModalCard
            isShown={isShown}
            onCancle={() => { setIsShown(false) }}
        />
    </>)
}

export default Feedback