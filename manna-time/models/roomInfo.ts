export interface RoomInfo {
    title: string
    dates: string[]
    participants: string[]
    startTime: number
    endTime: number
}

export interface RoomInfoDayOnly {
    title: string
    dates: string[]
    participants: string[]
}