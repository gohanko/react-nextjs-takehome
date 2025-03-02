"use server"

import { getProfileByUserId } from '@/database/profile'
import { getUserById } from '@/database/user'
import { decrypt } from '@/utility/session'
import { Profile, User } from '@prisma/client'
import { cookies } from 'next/headers'

export type TUserAndProfile = {
    user: User,
    profile: Profile
}

export const getUserAndProfileData = async (): Promise<TUserAndProfile> => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    const emptyUser: User = {
        id: 0,
        email: '',
        hashed_password: ''
    };

    const emptyProfile: Profile = {
        id: 0,
        user_id: 0,
        first_name: '',
        last_name: '',
        date_of_birth: null,
        gender: 'Male',
        marital_status: "Single",
        spouse_first_name: null,
        spouse_last_name: null,
        salutations: 'Mr',
        spouse_salutation: 'Mr',
        street_number: null,
        street_name: null,
        postcode: null,
        city_town: null,
        state: null
    }

    const userId = Number(session?.userId)
    if (!userId) {
        return  { user: emptyUser, profile: emptyProfile }
    }

    const user = await getUserById(userId)
    if (!user) {
        return { user: emptyUser, profile: emptyProfile }
    }

    const profile = await getProfileByUserId(user.id)
    if (!profile) {
        return { user: user, profile: emptyProfile }
    }

    return {
        user: user,
        profile: profile
    }
}