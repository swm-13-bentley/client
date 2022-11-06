import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function alarm(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { uuid, count } = req.body
    const { token } = req.headers
    axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/room/alarm`, {
            roomUuid: uuid,
            alarmNumber: count
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
    )
        .then((result) => {
            console.log('result is :', result)
            res.status(200).json(result.data)
        })
        .catch((error) => {
            console.log('error is :', error)
            res.status(error.response.status || 500).end(error.response.data)
        })
};