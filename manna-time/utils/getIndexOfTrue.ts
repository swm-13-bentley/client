const getIndexOfTrue = (arr: boolean[]) => {
    let index: number[] = []

    index = arr.reduce((a:number[], v, i) => {
        if (v === true)
            a.push(i)
        return a
    }, [])
    return index
}

export default getIndexOfTrue