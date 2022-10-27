import ModalCard from "@/components/Atom/ModalCard/ModalCard"
import BlackBoard from "@/components/Atom/BlackBoard/BlackBoard"
import { useRecoilState } from "recoil"
import CenterBox from "@/components/Atom/CenterBox"
import { ModalState } from "@/src/state/Modal"
import { ScriptProps } from "next/script"


const ModalLayout = ({children}: ScriptProps) => {
    const [isShown, setIsShown] = useRecoilState(ModalState)

    return (<>
        <BlackBoard
            isShown={isShown}
            onClick={() => { setIsShown(false) }}
        />
        <CenterBox
            isShown={isShown}
        >
            {children}
        </CenterBox>
    </>)
}

export default ModalLayout