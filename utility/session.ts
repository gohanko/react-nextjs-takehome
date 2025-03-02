import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
    userId: number,
    expiresAt: Date
}

export const encrypt = async (payload: SessionPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export const decrypt = async (session: string | undefined = ''): Promise<JWTPayload | undefined> => {
    try {
        const { payload } = await jwtVerify(
            session,
            encodedKey, 
            {
                algorithms: ['HS256'],
            }
        )
        
        return payload
    } catch {
        
    }
}
 
export const createSession = async (userId: number) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })
    const cookieStore = await cookies()
    
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export const updateSession = async () => {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)
   
    if (!session || !payload) {
        return null
    }
   
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
   
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export const deleteSession = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}
