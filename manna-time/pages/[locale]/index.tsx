import { FullButton } from "@/components/Atom/Button";
import { Headline3 } from "@/components/Atom/Letter";
import { Background } from "@/components/Layout/MainLayout/Wrapper";
import { MixpanelTracking } from "@/utils/sdk/mixpanel";
import { VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";

const StyledP = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 160%;
/* identical to box height, or 26px */

text-align: center;
letter-spacing: -0.003em;

color: #333333;
`

const CenterScreen = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
min-height: 90vh;
`

const Home: NextPage = () => {
    const router = useRouter()
    return (<>
        <Background>
            <CenterScreen>
                <VStack className=" items-center mb-4">
                    <Headline3>약속시간을 정하는</Headline3>
                    <Headline3>가장 쉬운 방법</Headline3>
                </VStack>
                <StyledP className="mb-10">약속 일정을 만들고 만날 시간을 함께 정해요</StyledP>
                <FullButton
                    onClick={() => {
                        MixpanelTracking.getInstance().buttonClicked("home: 약속 만들기")
                        router.push('/ko/make-room')
                    }}
                >약속 만들기</FullButton>
            </CenterScreen>
        </Background>
    </>)
}

export default Home