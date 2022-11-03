
import { NextPage } from "next"
import { useRecoilValue } from "recoil"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import TabLayout from "@/components/Layout/TabLayout"
import { useEffect, useState } from "react"
import NoGnbLayout from "@/components/Layout/NoGnbLayout"
import axios from "axios"
import { tokenState } from "@/src/state/UserInfo"
import UncomfirmedPlanContainer from "@/components/Organism/PlanContainer/Uncomfirmed"
import { UnConfirmedPlan } from "@/components/Molecule/Plan/Unconfirmed"
import ComfirmedPlanContainer from "@/components/Organism/PlanContainer/Confirmed"
import { ConfirmedPlanProps } from "@/components/Molecule/Plan/Confirmed"

const Plans: NextPage = function () {
    const token = useRecoilValue(tokenState)

    const [tab, setTab] = useState(0)
    const [unconfirmedPlans, setUnconfirmedPlans] = useState<UnConfirmedPlan[]>([])
    const [confirmedPlans, setConfirmedPlans] = useState<ConfirmedPlanProps[]>([])

    useEffect(() => {
        axios.get(
            '/api/user/plans/unconfirmed',
            { headers: { token: `${token}` } }
        ).then((response) => {
            setUnconfirmedPlans(response.data)
        }).catch((e) => {
            alert('대기중 약속을 불러오는 중 오류가 발생했습니다. 관리자에게 문의하세요')
        })

        axios.get(
            '/api/user/plans/confirmed',
            { headers: { token: `${token}` } }
        ).then((response) => {
            setConfirmedPlans(response.data)
        }).catch((e) => {
            alert('확정된 약속을 불러오는 중 오류가 발생했습니다. 관리자에게 문의하세요')
        })
    }, [])


    return (
        <NoGnbLayout title={"내 약속"}>
            <TabLayout
                value={tab}
                tabLabel={["대기중인 약속", "확정된 약속"]}
                onChange={setTab}
            >
                <Background>
                    {
                        tab == 0 && <UncomfirmedPlanContainer plans={unconfirmedPlans} />
                    }
                    {
                        tab == 1 && <ComfirmedPlanContainer plans={confirmedPlans}/>
                    }
                </Background>
            </TabLayout>
        </NoGnbLayout>

    )
}


export default Plans