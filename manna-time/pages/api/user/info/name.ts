import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function modifyName(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { token } = req.headers
    const { name } = req.body
    axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/username`, {
            newUsername: name
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