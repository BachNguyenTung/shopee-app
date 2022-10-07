import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import useGetUserByObserver from "../hooks/useGetUserByObserver";
import axios from "../axios";

const UserContext = React.createContext();
export const useUser = () => {
  return useContext(UserContext);
};
const currentTimeinMs = new Date().valueOf();
const sessionExpinHour = 24;
const sessionExpinSec = sessionExpinHour * 3600;

const UserProvider = ({ children }) => {
  const { user, userLoading } = useGetUserByObserver();
  useEffect(() => {
    const checkFirebaseIdTokenAuthTime = async () => {
      if (!user) return;
      try {
        //revoke id token if expired
        // const idToken = await auth.currentUser.getIdToken(
        //   /* forceRefresh */ false
        // );
        const idToken = user._lat;
        const result = await axios({
          method: "POST",
          url: "/verify-id-token-by-firebase",
          data: { idToken },
        });
        if (result.data.revoked) {
          // never be called cause idToken auto refresh after 1 hour by fỉrebase sdk unless manual refresh
          alert("Id Token refreshed. Vui lòng đăng nhập lại!");
          //TODO: sign out with clear cart
          await signOut();
        }
        if (result.data.invalid) {
          alert("Token's invalid. Vui lòng đăng nhập lại!");
          await signOut();
        }
        if (result.data.succeeded) {
          const idToken = result.data.idToken;
          const authTime = idToken.auth_time; //auth time stay the same after idToken revoked
          if (
            Math.floor(currentTimeinMs / 1000) - authTime >=
            sessionExpinSec
          ) {
            alert(`Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!`);
            await signOut();
          }
        }
      } catch (error) {
        alert(error.message);
      }
    };
    checkFirebaseIdTokenAuthTime();
  }, [user]);

  const signOut = () => {
    return auth.signOut();
  };
  const signIn = ({ email, password }) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const register = ({ email, password }) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const value = { user, userLoading, signIn, signOut, register };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
