import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { userRegister, userLogin } from './UserFunctions.jsx';

export default function Home() {
   const navigate = useNavigate();
   const [modal, setModal] = useState(false);
   const [register, setRegister] = useState(false);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = async (evt)=>{
      evt.preventDefault();
      const data = {name, email, password};
      console.log(data);
      setRegister(false);
      setName("");
      setEmail("");
      setPassword("");
      if (!register){
         const user = await userLogin(data);
         if (user) {
            setModal(false);
            navigate("/dashboard");
            return;
         }
         return;
      }
      await userRegister(data)
      setModal(false);
   }

  return (
   <div className="contentWrapper">
      <Navigation setModal={setModal} />
      <div className="teaser">
      
      </div>
      {modal && <div className="modal">
         <form action="">
            <span onClick={()=>setModal(false)}>Close</span>
            <h3>{register ? "Sign up" : "Log into your account!"}</h3>
            {register && <><label>Name
               <input type="text" value={name} onChange={(evt)=>setName(evt.target.value)} />
            </label>
            </>}
            <label>Email
               <input type="email" value={email} onChange={(evt)=>setEmail(evt.target.value)}/>
            </label>
            <label >Password
               <input type="password" value={password} onChange={(evt)=>setPassword(evt.target.value)} />
            </label>
            <button onClick={handleSubmit}>{register ? "Create account" : "Sign in"}</button>
            {register ? <p className='register'><span onClick={()=>setRegister(false)}>To sign in</span></p> : <p className='register'>Not signed up yet? <span onClick={()=>setRegister(true)}>Sign up!</span></p>}
            <div className="footerWrapper">
            </div>
         </form>
     </div>}
 </div>
  )
}
