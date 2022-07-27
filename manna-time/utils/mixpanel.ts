import mixpanel from "mixpanel-browser";

export class MixpanelTracking {
    private static _instance: MixpanelTracking;

    public static getInstance(): MixpanelTracking {
        if (MixpanelTracking._instance == null)
            return (MixpanelTracking._instance = new MixpanelTracking());
        return this._instance;
    }

    public constructor() {
        //mixpanel instance가 중복으로 생기는 것을 방지. init을 한번만 하도록 수행
        if (MixpanelTracking._instance)
            throw new Error('Error: Instance creation of MixpanelTracking is not allowed. Use Mixpanel.getInstance instead.')
        
        mixpanel.init(`${process.env.NEXT_PUBLIC_MIXPANEL_ID}`, {
            debug: false,
            ignore_dnt: true,
        })
    }

    protected track(name: string, data: object = {}) {
        mixpanel.track(name, data)
    }

    public pageViewed() {
        this.track("page_viewed")
    }

    public buttonClicked(usage:string) {
        this.track(usage+" 버튼 클릭")
    }

}