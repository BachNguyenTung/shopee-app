import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeaderSimpleContent from "../components/HeaderSimpleContent";
import LoginContent from "../components/LoginContent";
const Login = () => {

  return (
    <>
      <Header
        headerClass="header--login"
        headerSimpleContent={
          <HeaderSimpleContent headerText="Đăng nhập"></HeaderSimpleContent>
        }
      ></Header>
      <LoginContent submitText="Đăng nhập" isLoginPage={true}></LoginContent>
    </>
  );
};

export default Login;
