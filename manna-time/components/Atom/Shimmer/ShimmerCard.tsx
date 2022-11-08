import { CustomBox } from "../Box"
import Skeleton from '@mui/material/Skeleton';
import Line from "../Line";
import { Center } from "@chakra-ui/react";

const ShimmerCard = () => {
    return (<CustomBox
        style="secondary"
    >
        <div style={{ width: "100%"}}>
            <div className=" mb-4">
                <Skeleton variant="text" width={210} height={60} animation="wave" />
                <Skeleton />
            </div>
            <Line color={"lightgrey"} />
            <div className="mt-4 mb-4">
                <Skeleton />
            </div>
            <Line color={"lightgrey"} />
            <div className="mt-4 mb-4">
                <Skeleton />
            </div>
        </div>
    </CustomBox>)
}

export default ShimmerCard