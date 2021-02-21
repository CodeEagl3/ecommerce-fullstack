import { createContext, useState } from 'react'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export const AuthProvider = (props) => {

    const [user,setUser] = useState(null)

    /**
     * Adds email to user
     * @params {string} email
     */

    const loginUser = async (email) => {
        setUser({ email })
        router.push("/")
    }

    /**
     *Sets the user to null
     */

    const logoutUser = async (email) => {
        setUser(null)
        router.push("/")
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext