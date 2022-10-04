import { Rank, RankContainerProps } from "@/components/Organism/RankContainer"
import { RoomInfo } from "@/models/roomInfo"
import { getKoDateRange, getKoDateTime } from "@/utils/changeFormat"

interface Item {
    itemOp: string
    item: string
}

const templateExample = {
    objectType: 'feed',
    content: {
        title: '일정 등록한 인원 총 5명',
        description: '아메리카노, 빵, 케익, 가나다, 라마바, 이영석, 현성환, 어쩌고, 저쩌고, 쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라쏼라ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅁㄴㅇㄹㄴㅇㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
        imageUrl:
            'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
        },
    },
    itemContent: {
        titleImageText: '방 이름',
        titleImageCategory: '2022.09.10 ~ 2022.09.11\n11:00~21:00',
        sum: " ",
        sumOp: " ",
        items: [
            {
                itemOp: '09.01(월) 10:00~11:00',
                item: '총 5명',
            },
        ],

    },
    buttons: [
        {
            title: '자세히 보기',
            link: {
                mobileWebUrl: 'https://mannatime.io',
                webUrl: 'https://mannatime.io',
            },
        },
    ],
}



export function getShareTemplate (ranks: Rank[], roomInfo: RoomInfo, roomUid: string ) {
    let shareTemplate = { ...templateExample }
    const url = process.env.NEXT_PUBLIC_SERVICE_URL + '/ko/entry/' + roomUid

    const newItems = ranks?.reduce((arr: Item[], rank: Rank, index: number) => {
        if (index < 5) {
            const newItem = {
                itemOp: getKoDateTime(rank.availableDate, rank.startTime, rank.endTime),
                item: `${rank.participantNames.length}명`
            }
            arr.push(newItem)
        }
        return arr
    }, []) || []

    const newContent = {
        title: `참여자 총 ${roomInfo.participants.length}명`,
        description: `${roomInfo.participants.join(' ')}`,
        imageUrl:
            //이미지 규격 : 200 * 200 이상, 정사각형 준수할 이미지 추가할 것
            'https://www.mannatime.io/images/og_background.png',
        link: {
            mobileWebUrl: url,
            webUrl: url,
        },
    }

    const newItemContent = {
        titleImageText: roomInfo.title,
        titleImageCategory: getKoDateRange(roomInfo.dates),
        sum: " ",
        sumOp: " ",
        items: newItems
    }

    const newButtons = [
        {
            title: '확인하러 가기',
            link: {
                mobileWebUrl: url,
                webUrl: url,
            },
        },
    ]

    shareTemplate.content = newContent
    shareTemplate.itemContent = newItemContent
    shareTemplate.buttons = newButtons

    return shareTemplate
}