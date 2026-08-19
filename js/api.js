const API_BASE = window.BIXOPLAYER_API_BASE || '/api';
async function request(path, options={}){
  const res=await fetch(`${API_BASE}${path}`,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
  let data=null; try{data=await res.json()}catch{}
  if(!res.ok){const err=new Error(data?.message||`Request failed (${res.status})`);err.status=res.status;throw err}
  return data;
}
export const api={
  getPlans:()=>request('/plans'), getMovies:()=>request('/movies'), getSeries:()=>request('/series'), getChannels:()=>request('/channels'), getSports:()=>request('/sports'),
  search:(q)=>request(`/search?q=${encodeURIComponent(q)}`),
  createCheckout:(payload)=>request('/create-checkout',{method:'POST',body:JSON.stringify(payload)}),
  chat:(payload)=>request('/chat',{method:'POST',body:JSON.stringify(payload)})
};
export function apiAvailable(){return location.protocol!=='file:'}
