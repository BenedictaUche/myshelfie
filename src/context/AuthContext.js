import { useContext, createContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth } from '../firebase';


const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider)
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('User', currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, signUp, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}