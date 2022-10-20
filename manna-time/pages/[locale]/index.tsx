import { NextPage} from "next"

// const Test: NextPage = function ({ data }:InferGetStaticPropsType<typeof getStaticProps>) {
const Home: NextPage = function () {
    return (
        <iframe src="/landingPage/index.html" style={{ display: 'block', width: '100vw', height: "calc(100vh - 59px) !important" }}></iframe>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     console.log("hey")
//     return {
//         props: { data: "hihi" }
//     };
// };

export default Home
