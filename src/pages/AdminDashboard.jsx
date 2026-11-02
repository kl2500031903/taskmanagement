import {useState} from 'react';import {useNavigate} from 'react-router-dom';
import {getUsers,saveUsers,getTasks,saveTasks} from '../store.js';import {useAuth} from '../App.jsx';
export default function AdminDashboard(){
 const {logout}=useAuth(),nav=useNavigate();
 const [users,setUsers]=useState(getUsers),[tasks,setTasks]=useState(getTasks);
 const done=tasks.filter(t=>t.status==='completed').length;
 function deleteUser(u){
  if(u.role==='admin')return alert('Admin account cannot be deleted.');
  if(!confirm(`Delete user "${u.name}" and all their tasks?`))return;
  const nu=users.filter(x=>x.id!==u.id),nt=tasks.filter(t=>t.userId!==u.id);
  saveUsers(nu);saveTasks(nt);setUsers(nu);setTasks(nt);alert('User deleted successfully.');}
 function deleteTask(id){if(!confirm('Are you sure you want to delete this task?'))return;
  const nt=tasks.filter(t=>t.id!==id);saveTasks(nt);setTasks(nt);alert('Task deleted successfully.');}
 const stats=[['👥','Total Users',users.filter(u=>u.role==='user').length],['📋','Total Tasks',tasks.length],['✅','Completed Tasks',done],['⏳','Pending Tasks',tasks.length-done]];
 return <><header className="header"><div className="logo">Task<span>Flow</span></div>
  <div className="row"><span className="admin-badge">👑 Administrator</span><button className="b-red solid" onClick={()=>{logout();nav('/login')}}>Logout</button></div></header>
 <div className="layout admin"><div className="sidebar"><h3>Admin Panel</h3>
  <a className="active" href="#top">📊 Dashboard</a><a href="#users">👥 Users</a><a href="#tasks">📋 Tasks</a><a href="#system">⚙️ System</a></div>
 <div className="content" id="top"><h1>Admin Dashboard</h1><p className="muted">Manage users, tasks and monitor the TaskFlow system.</p>
  <div className="stats">{stats.map(([i,l,n])=><div className="stat-card" key={l}><div>{i}</div><h3>{n}</h3><p>{l}</p></div>)}</div>
  <section className="section" id="users"><h2>👥 Registered Users</h2><div className="table-container"><table>
   <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead><tbody>
   {users.length?users.map(u=><tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td>
    <td><span className={'badge '+(u.role==='admin'?'badge-admin':'badge-user')}>{u.role}</span></td>
    <td>{u.role==='admin'?<span>Protected</span>:<button className="b-red" onClick={()=>deleteUser(u)}>🗑 Delete</button>}</td></tr>)
   :<tr><td colSpan="5">No users found.</td></tr>}</tbody></table></div></section>
  <section className="section" id="tasks"><h2>📋 All Tasks</h2><div className="table-container"><table>
   <thead><tr><th>Task</th><th>User</th><th>Project</th><th>Priority</th><th>Status</th><th>Deadline</th><th>Action</th></tr></thead><tbody>
   {tasks.length?tasks.map(t=><tr key={t.id}><td><strong>{t.title}</strong></td><td>{t.userName||'Unknown'}</td><td>{t.project||'-'}</td>
    <td><span className="badge">{t.priority||'-'}</span></td>
    <td><span className={'badge '+(t.status==='completed'?'badge-completed':'badge-pending')}>{t.status==='completed'?'Completed':'Pending'}</span></td>
    <td>{t.deadline||'-'}</td><td><button className="b-red" onClick={()=>deleteTask(t.id)}>🗑 Delete</button></td></tr>)
   :<tr><td colSpan="7">No tasks found.</td></tr>}</tbody></table></div></section>
  <section className="section" id="system"><h2>⚙️ System Information</h2><div className="stats">
   {[['💾 Storage','Data is stored locally using browser Local Storage.'],['🛠 Technology','React and JavaScript are used to build TaskFlow.'],['🔐 Authentication','Login and signup are managed using Local Storage.']]
    .map(([h,p])=><div className="info-box" key={h}><h4>{h}</h4><p className="muted">{p}</p></div>)}</div></section>
 </div></div></>;}
