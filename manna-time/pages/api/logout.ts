import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function logout (
    req: NextApiRequest,
    res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};