import { atom } from "recoil";

export default atom<boolean>({
    key: 'feedbackState',
    default: false,
})