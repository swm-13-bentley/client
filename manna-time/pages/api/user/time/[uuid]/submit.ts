import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function submitSchedule(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { uuid } = req.query
    const { token } = req.headers
    axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/room/${uuid}/participant/available`,
        req.body,
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