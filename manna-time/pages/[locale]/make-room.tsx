import { Button, Circle, Flex, Heading, HStack, Input } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Layout from '../../components/Layout/Layout'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'


const MakeRoom = () => {
    const { t } = useTranslation(['make-room', 'common'])

    return (
        <>
            <Flex height="100vh" alignItems = "center" justifyContent="center">
                <Flex direction="column" background = "white" p ="20%" rounded={6}>
                    <Flex mb="10">
                        <HStack>
                            <Circle size='40px' bg='tomato' color='white' mr="5">
                                <h1>1</h1>
                            </Circle>
                            <h1>{t('set-date')}</h1>
                        </HStack>
                    </Flex>
                    <Flex mb="10">
                        <HStack>
                            <Circle size='40px' bg='tomato' color='white' mr="5">
                                <h1>2</h1>
                            </Circle>
                            <h1>{t('set-timezone')}</h1>
                        </HStack>
                    </Flex>
                    <Flex mb="10">
                        <HStack>
                            <Circle size='40px' bg='tomato' color='white' mr="5">
                                <h1>3</h1>
                            </Circle>
                            <h1>{t('set-event-name')}</h1>
                        </HStack>
                    </Flex>
                    <Heading mb={10} >Log in</Heading>
                    <Button colorScheme={"teal"}>여기 눌러방</Button>
                </Flex>
            </Flex>
        </>
    )
}

export default MakeRoom

const getStaticProps = makeStaticProps(['make-room', 'common'])
export { getStaticPaths, getStaticProps }