// Same localStorage keys as your auth.js / user.js / admin.js: "users", "tasks", "currentUser"
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
export const getUsers=()=>read('users',[]);
export const saveUsers=u=>localStorage.setItem('users',JSON.stringify(u));
export const getTasks=()=>read('tasks',[]);
export const saveTasks=t=>localStorage.setItem('tasks',JSON.stringify(t));
export const getCurrentUser=()=>read('currentUser',null);
export function createDefaultAdmin(){
 const users=getUsers();
 if(!users.some(u=>u.email==='admin@task.com')){
  users.push({id:'admin',name:'Administrator',email:'admin@task.com',password:'admin123',role:'admin'});saveUsers(users);}}
