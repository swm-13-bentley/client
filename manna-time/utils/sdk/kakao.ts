export class Kakao {
    private static _instance: Kakao
    private kakao: any

    public static getInstance() {
        if (Kakao._instance == null)
            return (Kakao._instance = new Kakao());
        return this._instance;
    }

    public constructor() {
        //mixpanel instance가 중복으로 생기는 것을 방지. init을 한번만 하도록 수행
        if (Kakao._instance)
            throw new Error('Error: Instance creation of Kakao is not allowed. Use Kakao.getInstance instead.')
        this.kakaoInit()
    }

    public kakaoInit = () => {
        this.kakao = (window as any).Kakao
        this.kakao.init('0d144d8c4519eaf83b74b8163c5ef688')
        if (!this.kakao.isInitialized()) {
            this.kakao.init('JS Key를 입력하세요')
        }
        console.log(this.kakao)
    }

    public kakaoShare = () => {
        // console.log(this.kakao.isInitialized())
        // this.kakao.Share.createCustomButton({
        //                     container: '#kakaotalk-sharing-btn',
        //                     templateId: ${YOUR_TEMPLATE_ID},
        //                     templateArgs: {
        //                       title: '제목 영역입니다.',
        //                       description: '설명 영역입니다.',
        //                     },
        //                   });
        
        this.kakao.Share.createDefaultButton({
            container: '#kakaotalk-sharing-btn',
            objectType: 'feed',
            content: {
              title: '오늘의 디저트',
              description: '아메리카노, 빵, 케익',
              imageUrl:
                'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
              link: {
                mobileWebUrl: 'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com',
              },
            },
            itemContent: {
              profileText: 'Kakao',
              profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
              titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
              titleImageText: 'Cheese cake',
              titleImageCategory: 'Cake',
              items: [
                {
                  item: 'Cake1',
                  itemOp: '1000원',
                },
                {
                  item: 'Cake2',
                  itemOp: '2000원',
                },
                {
                  item: 'Cake3',
                  itemOp: '3000원',
                },
                {
                  item: 'Cake4',
                  itemOp: '4000원',
                },
                {
                  item: 'Cake5',
                  itemOp: '5000원',
                },
              ],
              sum: 'Total',
              sumOp: '15000원',
            },
            social: {
              likeCount: 10,
              commentCount: 20,
              sharedCount: 30,
            },
            buttons: [
              {
                title: '웹으로 이동',
                link: {
                  mobileWebUrl: 'https://developers.kakao.com',
                  webUrl: 'https://developers.kakao.com',
                },
              },
              {
                title: '앱으로 이동',
                link: {
                  mobileWebUrl: 'https://developers.kakao.com',
                  webUrl: 'https://developers.kakao.com',
                },
              },
            ],
          });
        
    }
}