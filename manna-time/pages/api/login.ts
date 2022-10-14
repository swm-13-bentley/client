import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function login (
    req: NextApiRequest,
    res: NextApiResponse
) {
  console.log(req.body)
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", req.body.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};