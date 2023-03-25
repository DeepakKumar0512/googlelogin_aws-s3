import React,{useState} from 'react'
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import Upload from './Upload';

const Login = () => {

  const [login,setlogin] = useState(true)

  // function for logout user
  const Logout=()=>{
    googleLogout()
    setlogin(true)
    alert("Sucecessfully Logout")
  }

  return (
    <> 
      {login ?
      <div className='container' style={{textAlign:"-webkit-center",padding:"10px",fontSize:"xx-large",fontWeight:"bolder"}}>Login
      <div className='bg-info rounded text-white' style={{padding:"15%",width:"fit-content"}}><GoogleLogin
        onSuccess={credentialResponse => {
        console.log(credentialResponse);
        setlogin(false)
        }}
        onError={() => {
        alert('Login Failed || Please try after some time');
        }}
        />
      </div>
      </div>:
      <div>
        <button type="button" onClick={Logout} className="btn btn-primary m-3">Logout</button>
        <h2 className='container' style={{padding:"13px",textAlign:"-webkit-center",fontSize:"xx-large",fontWeight:"bolder"}}>File Upload</h2>
          <Upload/>
      </div>}   
    </>
  )
}

export default Login