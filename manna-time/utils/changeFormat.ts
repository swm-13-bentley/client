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
    
    //2월 2일(수)
    return changedDate + `(${dayOfTheWeek[date.getDay()]})`
}

export const getKoDateTime = (availableDate: string, startTime: string, endTime: string) => {
    return `${changeDateFormat(availableDate)} ${changeTimeFormat(startTime)} ~ ${changeTimeFormat(endTime)}`
}

export const getKoDateRange = (dates: string[]) => {
    if (dates.length == 1)
        return `${dateConversion(dates[0])}`
    return `${changeDateToKorean(dates[0])} ~ ${dateConversion(dates[dates.length - 1])}`
}