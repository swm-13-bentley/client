import hours from "@/components/Molecule/Scheduler/Hours"

const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토']

export const changeDateFormat = (yyyymmdd: string) => {
    const date = new Date(yyyymmdd)
    let changedDate = yyyymmdd.substring(5).replace('-', '.') + `(${dayOfTheWeek[date.getDay()]})`
    return changedDate
}

export const changeTimeFormat = (hhmmss: string) => {
    return hhmmss.substring(0, 5)
}

export const changeDateToKorean = (yyyymmdd: string) => {
    const date = new Date(yyyymmdd)
    let changedDate = yyyymmdd.replace('-', '년 ').replace('-', '월 ') + '일'
    
    //2022년 2월 2일 (수)
    return changedDate + `(${dayOfTheWeek[date.getDay()]})`
}

export const dateConversion = (yyyymmdd: string) => {
    const date = new Date(yyyymmdd)
    let changedDate = yyyymmdd.substring(5).replace('-', '월 ') + '일'
    
    //02월 02일(수)
    return changedDate + `(${dayOfTheWeek[date.getDay()]})`
}

export const getKoDateTime = (availableDate: string, startTime: string, endTime: string) => {
    return `${changeDateFormat(availableDate)} ${changeTimeFormat(startTime)} ~ ${changeTimeFormat(endTime)}`
}

export const getKoDateRange = (dates: string[]) => {
    if (dates.length == 1)
        return `${dateConversion(dates[0])}`
    // 2022년 11월 02일(수) ~ 11월 05일(토)
    return `${changeDateToKorean(dates[0])} ~ ${dateConversion(dates[dates.length - 1])}`
}

export const timeStringToIndex = (hhmmss: string) => {
    const hhmm = changeTimeFormat(hhmmss)
    const obj = hours.find(element => element.realTime == hhmm)
    if (obj == undefined)
        return
    return obj.id
}

export const getServerTimeFormat = (index: number) => {
    let hhmm = hours[index].realTime
    return hhmm+':00'
}