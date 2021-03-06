import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";

const AuthContext = createContext()

let magic;

export const AuthProvider = (props) => {

    const [user,setUser] = useState(null)
    const router = useRouter()

    /**
     * Adds email to user
     * @params {string} email
     */

    const loginUser = async (email) => {
        try{
            await magic.auth.loginWithMagicLink({ email })
            setUser({ email })
            router.push("/")
        } catch (errors) {
            setUser(null)
        }
    }

    /**
     *Sets the user to null
     */

    const logoutUser = async () => {
        try {
            await magic.user.logout()
            setUser(null)
            router.push("/")
        }
        catch (errors) {

        }
    }

    const checkUserLoggedIn = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn()

            if(isLoggedIn) {
                const { email } = await magic.user.getMetadata()
                setUser({email})
            }
        }
        catch (err) {

        }
    }

    useEffect(() => {
        magic = new Magic(MAGIC_PUBLIC_KEY)

        checkUserLoggedIn
    }, [])

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext