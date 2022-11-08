import { CustomBox } from "../Box"
import Skeleton from '@mui/material/Skeleton';

const ShimmerCard = () => {
    return (<CustomBox
        style="secondary"
    >
        <div style={{width: "100%", height:"270px"}}>
            <Skeleton variant="text" width={210} height={60} animation="wave" />
            <Skeleton variant="text" width={210} height={60} animation="wave" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    </CustomBox>)
}

export default ShimmerCard