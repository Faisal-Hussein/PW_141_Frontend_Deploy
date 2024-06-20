import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "react-bootstrap/Container";
import { UserContext } from "../../contexts/UserContext";

export default function RegisterForm() {

  const [user, setUser] = useState({});
  const { user: userContextData} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if (userContextData.accessToken) navigate('/');
  }, [])

  async function registerUser(){
    const res = await fetch('https://pw-141-flask-capstone.onrender.com/user',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user) 
    })
    if (res.ok){
      const data = await res.json();
      console.log(data);
      toast.success(`User: ${user.username} Registered`)
      navigate('/login')
    } else console.error("Login Failed")
  }

  function handleRegisterFormSubmit(e) {
    e.preventDefault();

    if (user.password !== user.confirmPassword ) {
      window.alert("Passwords Must Match")
      return;
    }
    delete user.confirmPassword;
    console.log(user, 'submitted');
    console.log("submitting form");
    registerUser();
  }

  return (
    <Container>
      <h3>Register</h3>
      <form action="" onSubmit={handleRegisterFormSubmit}>
        <label htmlFor="username">username</label><br />
        <input type="text" name='username' value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} required/><br />
        <label htmlFor="email">email</label><br />
        <input type="text" name='email' value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} required/><br />
        <label htmlFor="password">password</label><br />
        <input type="password" name='password' value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} required/><br />
        <label htmlFor="confirm-password">confirm-password</label><br />
        <input type="password" name='confirm-password' onChange={(e) => { setUser({ ...user, confirmPassword: e.target.value }) }} value={user.confirmPassword} required/><br />

        <input type="submit" name='Register' value='Register' />
      </form>
    </Container>
  )

}