import {useState} from 'react';import {Link,useNavigate} from 'react-router-dom';
import {getTasks,saveTasks} from '../store.js';import {useAuth} from '../App.jsx';
export default function AddTask(){
 const {user}=useAuth(),nav=useNavigate();
 const [f,setF]=useState({title:'',description:'',project:'',deadline:'',priority:'Medium',status:'pending'});
 const set=k=>e=>setF({...f,[k]:e.target.value});
 function submit(e){e.preventDefault();
  if(!f.title.trim()||!f.project.trim()||!f.deadline)return alert('Please fill all required fields.');
  saveTasks([...getTasks(),{id:Date.now().toString(),userId:user.id,userName:user.name,title:f.title.trim(),
   description:f.description.trim(),project:f.project.trim(),deadline:f.deadline,priority:f.priority,status:f.status,
   sharedWith:[],createdAt:new Date().toISOString()}]);
  alert('Task created successfully!');nav('/user/dashboard');}
 return <div className="auth"><form className="card auth-box" onSubmit={submit}>
  <h2>Add Task</h2>
  <input placeholder="Title *" value={f.title} onChange={set('title')} required/>
  <textarea placeholder="Description" value={f.description} onChange={set('description')}/>
  <input placeholder="Project *" value={f.project} onChange={set('project')} required/>
  <input type="date" value={f.deadline} onChange={set('deadline')} required/>
  <select value={f.priority} onChange={set('priority')}><option>High</option><option>Medium</option><option>Low</option></select>
  <select value={f.status} onChange={set('status')}><option value="pending">Pending</option><option value="completed">Completed</option></select>
  <button className="btn">Create Task</button><Link to="/user/dashboard" className="note">← Back to dashboard</Link></form></div>;}
