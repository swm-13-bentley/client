import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deletePlan(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { token, uuid } = req.headers
    axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/room/${uuid}/exit`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    )
        .then((result) => {
            console.log('result is :', result)
            res.status(200).json(result.data)
        })
        .catch((error) => {
            console.log('error is :', error)
            res.status(error.response.data.status || 500).end(error.response.data.error)
        })
};