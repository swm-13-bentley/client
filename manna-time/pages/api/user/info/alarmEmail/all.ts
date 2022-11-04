import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAlarmEmail(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { token } = req.headers
    axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/alarmEmail/all`, 
        { headers: { 'Authorization': `Bearer ${token}` } }
    )
        .then((result) => {
            res.status(200).json(result.data)
        })
        .catch((error) => {
            console.log('error is : ', error)
            res.status(error.response.status || 500).end(error.response.data)
        })
};