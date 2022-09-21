import { atom } from "recoil";

export const clickTimeState =  atom <string>({
    key: 'ClickTime',
    default: ''
})

export const clickParticipantState =  atom <string[]>({
    key: 'ClickParticipant',
    default: []
})