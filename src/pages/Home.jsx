import {Link} from 'react-router-dom';
const features=[['✓','Task Management','Create, update, complete and delete tasks from your dashboard.'],
['⚡','Priority Control','Mark tasks high, medium or low so you focus on what matters.'],
['📅','Deadlines','Set deadlines and get notified when dates are near.'],
['📊','Progress Tracking','Monitor completed and pending tasks with progress bars.'],
['↔','Drag & Drop','Reorder tasks and drop them onto Today, Tomorrow or Next week.'],
['👥','Task Sharing','Share tasks with teammates by email to collaborate.']];
export default function Home(){return <>
 <nav className="home-nav"><Link to="/" className="brand"><i className="brand-icon">✓</i>Task<span>Flow</span></Link>
  <div className="row"><a href="#features">Features</a><Link to="/login">Login</Link><Link className="btn" to="/signup">Sign up</Link></div></nav>
 <header className="hero"><h1>Organize your work,<br/>meet every deadline.</h1>
  <p>TaskFlow keeps projects, priorities, deadlines and teamwork in one simple dashboard.</p>
  <div className="row"><Link className="btn" to="/signup">Get started</Link><Link className="btn ghost" to="/login">Login</Link></div></header>
 <section id="features" className="features">{features.map(([i,t,d])=>
  <div className="card" key={t}><div className="brand-icon">{i}</div><h3>{t}</h3><p>{d}</p></div>)}</section>
 <footer className="footer">© 2026 TaskFlow. Task Management System.</footer></>;}
