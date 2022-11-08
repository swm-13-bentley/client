import { FullButton } from "@/components/Atom/Button"
import ShimmerContainer from "@/components/Atom/Shimmer/ShimmerContainer"
import FilterGroup from "@/components/Molecule/FilterGroup"
import { ConfirmedPlan } from "@/components/Molecule/Plan"
import { ConfirmedPlanProps } from "@/components/Molecule/Plan/Confirmed"
import { UnConfirmedPlan } from "@/components/Molecule/Plan/Unconfirmed"
import { tokenState } from "@/src/state/UserInfo"
import { VStack } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import EmptyPlan from "../EmptyPlan"

const ComfirmedPlanContainer = ({ plans, isLoader }: { plans: ConfirmedPlanProps[], isLoader: boolean }) => {
    const router = useRouter()
    const filterNames = ["전체", "시간대", "날짜"]

    const [filterChecked, setFilterChecked] = useState([true, false, false])
    const [confirmedPlans, setConfirmedPlans] = useState<ConfirmedPlanProps[]>(plans)
    const [showingConfirmed, setShowingConfirmed] = useState<ConfirmedPlanProps[]>([])

    useEffect(() => {
        setConfirmedPlans(plans)
        setShowingConfirmed(plans)
    }, [plans])

    useEffect(() => {
        if (filterChecked[0] == true) {
            setShowingConfirmed(confirmedPlans)
        } else if (filterChecked[1] == true) {
            const newValue = confirmedPlans.filter((plan) => { return plan.isDayOnly == false })
            setShowingConfirmed(newValue)
        } else if (filterChecked[2] == true) {
            const newValue = confirmedPlans.filter((plan) => { return plan.isDayOnly == true })
            setShowingConfirmed(newValue)
        }
    }, [filterChecked, confirmedPlans])

    const PlansContainer = () => {
        if (showingConfirmed.length == 0)
            return <EmptyPlan type={"confirmed"} />
        else if (showingConfirmed.length > 0)
            return (
                <VStack gap="12px" mb="80px">
                    {showingConfirmed.map((plan, index) => {
                        return (<ConfirmedPlan plan={plan} key={plan.roomUuid}
                        />)
                    })}
                </VStack>
            )
        else return <></>
    }

    return (
        <>
            <div className=" mt-16 mb-7">
                <FilterGroup
                    filterNames={filterNames}
                    isChecked={filterChecked}
                    onChange={function (checked: boolean[]): void {
                        setFilterChecked(checked)
                    }} />
            </div>
            {
                isLoader
                    ?
                    <ShimmerContainer />
                    :
                    <PlansContainer/>
            }
        </>
    )
}

export default ComfirmedPlanContainer