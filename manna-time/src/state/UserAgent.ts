import { AppContextType } from "next/dist/shared/lib/utils";
import { atom, selector } from "recoil";

export const userAgentState = atom<string>({
    key: 'UserAgent',
    default: ''
})