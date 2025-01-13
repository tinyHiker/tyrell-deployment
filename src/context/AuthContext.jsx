import { createContext, useContext, useState } from "react";
import {auth} from "../firebase/firebase.config"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {useEffect} from "react"
import getBaseUrl from "../utils/baseURL";
import Swal from "sweetalert2";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}

async function registerUserToMongo(username, email, uid) {
    let res = await fetch(`${getBaseUrl()}/api/real-users/create-real-user`, {
        method: "POST",
        body: JSON.stringify({
            email: email, uid: uid, username: username
        }),
        headers: {
            "Content-type": "application/json"
        }
    })

}


const googleProvider = new GoogleAuthProvider();

// AuthProvider
export const AuthProvide = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const registerUser = async (username, email, password) => {
        try {
            let response = await createUserWithEmailAndPassword(auth, email, password);
            let user = response.user

            console.log(user.displayName)
            console.log(user.photoURL)
            console.log(user.email)
            console.log(user.uid)

            await registerUserToMongo(username, user.email, user.uid)
            return response
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }


    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = async () => {
        try{
            let response = await signInWithPopup(auth, googleProvider)
            let user = response.user

            //console.log(user.displayName)
            //console.log(user.photoURL)
            let username = user.email.split('@')[0];

            await registerUserToMongo(username, user.email, user.uid)
            return response
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
        
    }

    const logout = () => {
        return signOut(auth)
        
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
        })

        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        loading,
        registerUser, 
        loginUser,
        signInWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}