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
    let changedDate = yyyymmdd.replace('-', '년 ').replace('-', '월 ') + '일 '
    
    return changedDate + `(${dayOfTheWeek[date.getDay()]})`
}