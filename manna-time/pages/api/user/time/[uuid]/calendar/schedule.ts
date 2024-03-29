import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getCalendarSchedule(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { uuid } = req.query
    const { token } = req.headers
    axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/calendar?roomUuid=${uuid}`,
        {
            headers: { 'Authorization': `Bearer ${token}` }
        }
    )
        .then((result) => {
            res.status(200).json(result.data)
        })
        .catch((error) => {
            console.log('error is : ', error.response)
            res.status(error.response.status || 500).end(error.response.data)
        })
};