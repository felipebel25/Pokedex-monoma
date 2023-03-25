import type { NextApiRequest, NextApiResponse } from 'next'

import { signToken } from 'utils';
import { isValidToken } from 'utils/jwt';

type Data =
    | { message: string }
    | {
        token?: boolean;
        user: {
            name: string;
            email: string;
        }
    }
    | {
        token: boolean;
        user?: {

        }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return checkJWT(req, res)
            break;

        default:
            return res.status(400).json({
                message: "Not methods or bad request"
            })
            break;
    }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = '' } = req.cookies;

    let user_id = {} as { name: string, email: string }

    // user_id = await isValidToken(token)

    try {
        user_id = await isValidToken(token)
    } catch (error) {
        if (error) {
            return res.status(401).json({
                token: false,
            })
        }
    }
    
    const { name, email } = user_id
    return res.status(200).json({
        user: {
            name,
            email
        }
    })


}