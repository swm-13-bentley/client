import ModalCard from "@/components/Atom/ModalCard/ModalCard"
import { NextPage } from "next"
import { useState } from "react"
import BlackBoard from "@/components/Atom/BlackBoard/BlackBoard"

const Feedback: NextPage = function () {
    const [isShown, setIsShown] = useState(true)

    return (<>
        <BlackBoard
            isShown={isShown}
            onClick={() => { setIsShown(!isShown) }}
        />
        <ModalCard
            isShown={isShown}
            onCancle={() => { setIsShown(!isShown) }}
        />
    </>)
}

export default Feedback