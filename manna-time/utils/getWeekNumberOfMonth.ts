/* 출처 : https://blog.naver.com/PostView.naver?blogId=kwonhjae&logNo=222620941426&parentCategoryNo=&categoryNo=77&viewDate=&isShowPopularPosts=false&from=postView */

const weekNumOfMonth = (date: Date) => {
    const THURSDAY_NUM = 4;	// 첫째주의 기준은 목요일(4)이다.

    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayOfWeek = firstDate.getDay()

    let firstThursday = 1 + THURSDAY_NUM - firstDayOfWeek	// 첫째주 목요일
    if(firstThursday <= 0)
        firstThursday += + 7	// 한주는 7일
    
    const untilDateOfFirstWeek = firstThursday - 7 + 3 // 월요일기준으로 계산 (월요일부터 한주의 시작)
    const weekNum = Math.ceil((date.getDate()-untilDateOfFirstWeek) / 7) - 1

    if(weekNum < 0){	// 첫째주 이하일 경우 전월 마지막주 계산
        var lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 0)
        return weekNumOfMonth(lastDateOfMonth)
    }

    return `${(date.getMonth()+1)}월 ${weekNum+1}주차`;
}

export default weekNumOfMonth