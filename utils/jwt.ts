import jwt from 'jsonwebtoken'

// firma del token
export const signToken = (email: string, name: string) => {
    const sign = process.env.JWT_SECRET_SEED
    if (!sign) throw new Error('Ther isnt seed of JWT in .env')

    return jwt.sign(
        //payload
        {
            email,
            name
        },
        //seed
        sign,
        //options
        {
            expiresIn: "30d"
        }
    )
}

// validar token
export const isValidToken = (token: string): Promise<{ name: string; email: any; }> => {
    const sign = process.env.JWT_SECRET_SEED
    if (!sign) throw new Error('Ther isnt seed of JWT in .env')

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, sign || '', (err, payload) => {
                const { email: emailJwt, name } = payload as { email: string, name: string };
                resolve({ name: name, email: emailJwt })
            })
        } catch (error) {
            reject(false)
        }
    })

}
