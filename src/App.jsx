import {createContext,useContext,useState} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import {getCurrentUser,createDefaultAdmin} from './store.js';
import Home from './pages/Home.jsx';import Auth from './pages/Auth.jsx';
import UserDashboard from './pages/UserDashboard.jsx';import AddTask from './pages/AddTask.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
createDefaultAdmin();
const AuthCtx=createContext();export const useAuth=()=>useContext(AuthCtx);
function Guard({role,children}){const {user}=useAuth();
 if(!user)return <Navigate to="/login" replace/>;
 if(role&&user.role!==role){alert('Access denied. Admin login required.');return <Navigate to="/login" replace/>}
 return children;}
export default function App(){
 const [user,setUser]=useState(getCurrentUser);
 const login=u=>{localStorage.setItem('currentUser',JSON.stringify(u));setUser(u)};
 const logout=()=>{localStorage.removeItem('currentUser');setUser(null)};
 return <AuthCtx.Provider value={{user,login,logout}}><Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Auth mode="login"/>}/>
  <Route path="/signup" element={<Auth mode="signup"/>}/>
  <Route path="/user/dashboard" element={<Guard><UserDashboard/></Guard>}/>
  <Route path="/user/add-task" element={<Guard><AddTask/></Guard>}/>
  <Route path="/admin/dashboard" element={<Guard role="admin"><AdminDashboard/></Guard>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/></Routes></AuthCtx.Provider>;}
