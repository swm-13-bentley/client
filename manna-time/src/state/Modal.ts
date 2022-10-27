import { atom } from "recoil";

export const ModalState = atom<boolean>({
    key: 'Modal',
    default: false,
})