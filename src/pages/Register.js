import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderSimpleContent from "../components/HeaderSimpleContent";
import LoginContent from "../components/LoginContent";
const Register = () => {
  const [isRegisterPage, setIsRegisterPage] = useState(false);

  useEffect(() => {
    setIsRegisterPage(true);
  }, []);
  return (
    <>
      <Header
        isRegisterPage={isRegisterPage}
        headerSimpleContent={
          <HeaderSimpleContent
            isRegisterPage={isRegisterPage}
          ></HeaderSimpleContent>
        }
      ></Header>
      <LoginContent isRegisterPage={isRegisterPage}></LoginContent>
    </>
  );
};

export default Register;