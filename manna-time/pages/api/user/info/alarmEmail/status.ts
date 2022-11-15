import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function changeAlarmStatus(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { token } = req.headers
    const { email, receiveEmail } = req.body

    axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/alarmEmail/status`, {
            email: email,
            receiveEmail: receiveEmail
        },
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