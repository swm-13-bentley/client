const copyTextUrl = (textUrl: string) => {
    //기타 브라우저
    navigator.clipboard.writeText(textUrl).then(() => {
        alert("링크가 복사되었습니다. 약속 구성원에게 공유하세요.")
    })
        .catch(() => {
            //인앱 브라우저 : kakao, naver ...
            const inputElement = document.createElement("input")
            inputElement.readOnly = !0
            inputElement.value = textUrl
            document.body.appendChild(inputElement)
            inputElement.select()
            inputElement.setSelectionRange(0, inputElement.value.length)
            document.execCommand("Copy")
            document.body.removeChild(inputElement)
            alert("링크가 복사되었습니다. 약속 구성원에게 공유하세요.")
        })
}

export default copyTextUrl