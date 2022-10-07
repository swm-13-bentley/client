export type GroupSchedule = {
    participantName: string
    availableDates: string[]
}

export type DateCriteria = {
    [availableDate: string]: string[]
}

type IndividualCriteria = {
    [participantName: string]: string[]
}

// export const convertDateCriteria = (groupSchedule: GroupSchedule[]) => {
//     let dateCriteria: DateCriteria = {}
//     groupSchedule.map((schedule) => {
//         schedule.availableDates.map((date) => {
//             if (dateCriteria[date] == undefined)
//                 dateCriteria[date] = []
//             dateCriteria[date].push(schedule.participantName)
//         })
//     })

//     return dateCriteria
// }

export const convertDateCriteria = (individualCriteria: IndividualCriteria) => {
    let dateCriteria : DateCriteria = {}
    for (let participant in individualCriteria) {
        const dates = individualCriteria[participant]
        dates.map((date) => {
            if (!(date in dateCriteria))
                dateCriteria[date] = []
            dateCriteria[date].push(participant)
        })
    }
    return dateCriteria
}

export const convertIndividualCriteria = (groupSchedule: GroupSchedule[]) => {
    let individualCriteria: IndividualCriteria = {}
    groupSchedule.map((schedule) => {
        individualCriteria[schedule.participantName] = schedule.availableDates
    })

    return individualCriteria
}

export const getFilteredSchedule = (
    groupSchedule: GroupSchedule[],
    participants: string[],
    filterChecked: boolean[]
) => {
    let individualCriteria = convertIndividualCriteria(groupSchedule)
    participants.map((participant, index) => {
        if (!filterChecked[index]) 
            individualCriteria[participant] = []
    })

    return convertDateCriteria(individualCriteria)
}
