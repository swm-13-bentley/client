import { atom } from "recoil";

export const DatePickerFilterState = atom<'range' | 'multiple'>({
    key: 'DatePickerFilter',
    default: 'range'
})