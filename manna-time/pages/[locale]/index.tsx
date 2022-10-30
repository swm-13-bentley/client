import useViewport from "@/hooks/useViewport";
import _ from "lodash";
import { NextPage} from "next"
import { useEffect, useState } from "react";

// const Test: NextPage = function ({ data }:InferGetStaticPropsType<typeof getStaticProps>) {
const Home: NextPage = function () {
    const viewport = useViewport()

    const [navHeight, setNavHeight] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (viewport === 'mobile')
            setNavHeight(54)
        else
            setNavHeight(72)
        setHeight(window.innerHeight)
        window.addEventListener('resize', () => {
            setHeight(window.innerHeight)
        })
     }, [])
    return (
        <iframe src="/landingPage/index.html" style={{ display: 'block', width: '100vw', height: `calc(${height}px - ${navHeight}px)` }}></iframe>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     console.log("hey")
//     return {
//         props: { data: "hihi" }
//     };
// };

export default Home
