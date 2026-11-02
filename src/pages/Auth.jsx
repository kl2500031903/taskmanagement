import {useState} from 'react';import {Link,useNavigate} from 'react-router-dom';
import {getUsers,saveUsers} from '../store.js';import {useAuth} from '../App.jsx';
export default function Auth({mode}){
 const signup=mode==='signup',nav=useNavigate(),{login}=useAuth();
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState('');
 function onSignup(e){e.preventDefault();
  if(!name.trim()||!email.trim()||!password)return alert('Please fill in all fields.');
  if(password.length<6)return alert('Password must contain at least 6 characters.');
  const users=getUsers();
  if(users.find(u=>u.email.toLowerCase()===email.trim().toLowerCase()))return alert('An account with this email already exists.');
  users.push({id:Date.now().toString(),name:name.trim(),email:email.trim(),password,role:'user'});saveUsers(users);
  alert('Account created successfully!');nav('/login');}
 function onLogin(e){e.preventDefault();
  if(!email.trim()||!password)return alert('Please enter email and password.');
  const user=getUsers().find(u=>u.email.toLowerCase()===email.trim().toLowerCase()&&u.password===password);
  if(!user)return alert('Invalid email or password.');
  login(user);nav(user.role==='admin'?'/admin/dashboard':'/user/dashboard');}
 return <div className="auth"><form className="card auth-box" onSubmit={signup?onSignup:onLogin}>
  <Link to="/" className="brand"><i className="brand-icon">✓</i>TaskFlow</Link>
  <h2>{signup?'Create Account':'Login'}</h2>
  {signup&&<input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required/>}
  <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
  <input type="password" placeholder="Password" minLength={signup?6:undefined} value={password} onChange={e=>setPassword(e.target.value)} required/>
  <button className="btn">{signup?'Create Account':'Login to TaskFlow'}</button>
  {!signup&&<small className="note">Demo Admin: admin@task.com / admin123</small>}
  <p>{signup?'Already have an account?':"Don't have an account?"} <Link to={signup?'/login':'/signup'}>{signup?'Login':'Create Account'}</Link></p></form></div>;}
