export const logoutFunc = (route:any)=>{
   localStorage.clear();
   route.push("/login");
}