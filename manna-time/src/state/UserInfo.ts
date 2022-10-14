import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

interface UserInfo {
    accessToken: string | undefined
    name: string
    email: string
}

export const jwtState = atom<string>({
    key: 'jwt',
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const userInfoState =  atom <UserInfo>({
    key: 'UserInfo',
    default: {
        accessToken: undefined,
        name: "",
        email: ""
    },
    effects_UNSTABLE: [persistAtom]
})

// export const testClickSelector = selector({
//     key: 'testClickSelector',
//     get: ({ get }) => {
//         console.log(get(clickTimeState))
//     }
// })