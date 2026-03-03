import React, { useEffect } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

import Logout from "../components/Logout";
import Container from "../components/Container";

const Profile = () => {
   const token=localStorage.getItem("token");
  const navigate=useNavigate()
 useEffect(()=>{
  if(!token){
    navigate("/");
  }
 },[token]);
  return (
    <Container>
      <Title>Profile page</Title>
      <Logout/>
    </Container>
  );
};

export default Profile;