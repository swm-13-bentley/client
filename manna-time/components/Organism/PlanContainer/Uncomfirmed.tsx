import { FullButton } from "@/components/Atom/Button"
import FilterGroup from "@/components/Molecule/FilterGroup"
import { UnconfirmedPlan } from "@/components/Molecule/Plan"
import { UnConfirmedPlan } from "@/components/Molecule/Plan/unConfirmed"
import { VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UncomfirmedPlanContainer = ({ plans }: { plans: UnConfirmedPlan[] }) => {
    const router= useRouter()
    const filterNames = ["전체", "시간대", "날짜"]

    const [filterChecked, setFilterChecked] = useState([true, false, false])
    const [unconfirmedPlans, setUnconfirmedPlans] = useState<UnConfirmedPlan[]>(plans)
    const [showingUnconfirmed, setShowingUnconfirmed] = useState<UnConfirmedPlan[]>([])

    useEffect(() => {
        setUnconfirmedPlans(plans)
        setShowingUnconfirmed(plans)
    }, [plans])

    useEffect(() => {
        if (filterChecked[0] == true) {
            setShowingUnconfirmed(unconfirmedPlans)
        } else if (filterChecked[1] == true) {
            const newValue = unconfirmedPlans.filter((plan) => { return plan.isDayOnly == false })
            setShowingUnconfirmed(newValue)
        } else if (filterChecked[2] == true) {
            const newValue = unconfirmedPlans.filter((plan) => { return plan.isDayOnly == true })
            setShowingUnconfirmed(newValue)
        }

    }, [filterChecked])

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
            <VStack gap="12px">
                {showingUnconfirmed.map((plan, index) => {
                    return (<UnconfirmedPlan plan={plan} key={plan.roomUuid} />)
                })}
            </VStack>
            {/* <EmptyPlan /> */}
            <VStack w="100%" className=" mt-10 mb-20">
                <FullButton style="secondary"
                    onClick={() => {
                        router.push('/ko/make-room')
                    }}
                >약속 만들기</FullButton>
            </VStack>
        </>
    )
}

export default UncomfirmedPlanContainer