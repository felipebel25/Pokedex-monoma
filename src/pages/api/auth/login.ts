import type { NextApiRequest, NextApiResponse } from 'next'
import { signToken } from 'utils';
import * as data from './jsonData/user.json';
type Data =
    | { message: string }
    | {
        token: string;
        user: {
            name: string,
            email: string
        }
    }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "POST":
            return loginUser(req, res)
            break;
        default:
            res.status(400).json({
                message: "Not methods or bad request"
            })
            break;
    }
}

const loginUser = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { email: emailReq = '', password: passwordReq = '' } = req.body as { email: string; password: string };
    const cookies = req.cookies

    const { name, email, password } = data;

    if (emailReq !== email || passwordReq !== password) {
        return res.status(401).json({
            message: "These credentials do not match our records."
        })
    }

    const token = signToken(email, name);

    res.status(200).json({
        token,
        user: {
            name,
            email
        }
    })


}