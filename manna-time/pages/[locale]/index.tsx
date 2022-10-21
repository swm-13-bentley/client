import _ from "lodash";
import { NextPage} from "next"
import { useEffect, useState } from "react";

// const Test: NextPage = function ({ data }:InferGetStaticPropsType<typeof getStaticProps>) {
const Home: NextPage = function () {
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(window.innerHeight)
        window.addEventListener('resize', () => {
            setHeight(window.innerHeight)
        })
     }, [])
    return (
        <iframe src="/landingPage/index.html" style={{ display: 'block', width: '100vw', height: `calc(${height}px - 59px)` }}></iframe>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     console.log("hey")
//     return {
//         props: { data: "hihi" }
//     };
// };

export default Home
