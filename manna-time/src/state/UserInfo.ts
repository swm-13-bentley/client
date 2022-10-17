import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

interface UserInfo {
    name: string
    email: string
}

function parseJwt (token : string) {
    try {
        let base64 = token.split('.')[1]
        let jsonPayload = Buffer.from(base64, 'base64').toString()
        return JSON.parse(jsonPayload);
    } catch {
        return {}
    }

};

export const tokenState = atom<string>({
    key: 'token',
    default: "",
    effects_UNSTABLE: [persistAtom]
})

export const decodedTokenState = selector({
    key: 'decodedTokenState',
    get: ({ get }) => {
        const jwt = get(tokenState)
        if (jwt == "") {
            return {}
        }
        else {
            const payload = parseJwt(jwt)
            return payload
        }
    }
})