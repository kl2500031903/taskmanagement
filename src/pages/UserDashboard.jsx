import {useEffect,useState} from 'react';import {Link,useNavigate} from 'react-router-dom';
import {getTasks,saveTasks,getUsers} from '../store.js';import {useAuth} from '../App.jsx';
const day=n=>{const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)};
const zones=[['Today',0],['Tomorrow',1],['Next week',7]];
export default function UserDashboard(){
 const {user,logout}=useAuth(),nav=useNavigate();
 const [tasks,setTasks]=useState(getTasks),[filter,setFilter]=useState('all'),[drag,setDrag]=useState(null);
 useEffect(()=>saveTasks(tasks),[tasks]);
 const mine=tasks.filter(t=>t.userId===user.id||t.sharedWith?.includes(user.id));
 const completed=mine.filter(t=>t.status==='completed'),pending=mine.filter(t=>t.status!=='completed');
 const high=pending.filter(t=>t.priority==='High').length,pct=mine.length?Math.round(completed.length/mine.length*100):0;
 const shown=filter==='completed'?completed:filter==='pending'?pending:mine;
 const soon=pending.filter(t=>t.deadline&&t.deadline<=day(2));
 const upd=(id,p)=>setTasks(ts=>ts.map(t=>t.id===id?{...t,...p}:t));
 const del=id=>{if(confirm('Are you sure you want to delete this task?'))setTasks(ts=>ts.filter(t=>t.id!==id))};
 const share=t=>{const m=prompt('Share with (email):')?.trim().toLowerCase();if(!m)return;
  const u=getUsers().find(x=>x.email.toLowerCase()===m);if(!u)return alert('No user with that email.');
  upd(t.id,{sharedWith:[...new Set([...(t.sharedWith||[]),u.id])]})};
 const reorder=id=>{if(!drag||drag===id)return;const a=[...tasks],[m]=a.splice(a.findIndex(t=>t.id===drag),1);
  a.splice(a.findIndex(t=>t.id===id),0,m);setTasks(a)};
 return <div className="layout"><div className="sidebar"><h3>TaskFlow</h3><p className="who">{user.name}</p>
  <Link to="/user/add-task">+ Add Task</Link><button onClick={()=>{logout();nav('/login')}}>Logout</button></div>
 <div className="content"><h1>Welcome, {user.name}</h1>
  <div className="stats">{[['📋','Total Tasks',mine.length],['✅','Completed',completed.length],['⏳','Pending',pending.length],['🔥','High Priority',high]]
   .map(([i,l,n])=><div className="stat-card" key={l}><div>{i}</div><h3>{n}</h3><p>{l}</p></div>)}</div>
  <div className="section"><div className="between"><span>Progress</span><strong>{pct}%</strong></div><div className="bar"><div style={{width:pct+'%'}}/></div></div>
  <div className={'notification'+(pending.length?'':' success')}>{pending.length?`🔔 You have ${pending.length} pending task(s).`:'🎉 Great job! You have no pending tasks.'}</div>
  {soon.map(t=><div className="notification warn" key={t.id}>⏰ “{t.title}” {t.deadline<day(0)?'is overdue':'is due '+t.deadline}</div>)}
  <div className="row wrap">{['all','pending','completed'].map(f=><button key={f} className={'chip'+(f===filter?' on':'')} onClick={()=>setFilter(f)}>{f[0].toUpperCase()+f.slice(1)}</button>)}
   <span className="note">{shown.length} task(s)</span></div>
  <div className="row">{zones.map(([l,n])=><div key={l} className="drop" onDragOver={e=>e.preventDefault()} onDrop={()=>{if(drag)upd(drag,{deadline:day(n)});setDrag(null)}}>Drop here → {l}</div>)}</div>
  {!shown.length&&<div className="empty-state"><h3>No tasks found</h3><p>Create your first task to get started.</p><Link to="/user/add-task" className="btn">+ Add Task</Link></div>}
  {shown.map(t=><div key={t.id} className={'task-card'+(t.status==='completed'?' completed':'')} draggable onDragStart={()=>setDrag(t.id)} onDragOver={e=>e.preventDefault()} onDrop={()=>reorder(t.id)}>
   <div className="grow"><div className="row"><h3>{t.title}</h3><span className={'priority '+t.priority.toLowerCase()}>{t.priority}</span></div>
    <p className="muted">{t.description||'No description'}</p>
    <div className="row wrap muted"><span>📁 {t.project}</span><span>📅 {t.deadline}</span><span>{t.status==='completed'?'✅ Completed':'⏳ Pending'}</span>
     {t.userId!==user.id&&<span>👤 shared by {t.userName}</span>}</div></div>
   <div className="row wrap">{t.status!=='completed'?<button className="b-green" onClick={()=>upd(t.id,{status:'completed'})}>✓ Complete</button>
    :<button className="b-amber" onClick={()=>upd(t.id,{status:'pending'})}>↩ Pending</button>}
    {t.userId===user.id&&<><button onClick={()=>share(t)}>👥 Share</button><button className="b-red" onClick={()=>del(t.id)}>🗑 Delete</button></>}</div></div>)}
 </div></div>;}
