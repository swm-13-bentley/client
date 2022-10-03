import { atom, selector } from "recoil";

export const clickTimeState =  atom <string>({
    key: 'ClickTime',
    default: ''
})

export const clickParticipantState =  atom <string[]>({
    key: 'ClickParticipant',
    default: []
})

// export const testClickSelector = selector({
//     key: 'testClickSelector',
//     get: ({ get }) => {
//         console.log(get(clickTimeState))
//     }
// })