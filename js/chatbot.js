import {api} from './api.js';
import {CONTACT_CONFIG} from './config.js';

const quick=[
  ['💰 Pricing','What plans do you have?'],
  ['📺 Channels','How many channels are included?'],
  ['🎬 Movies','How many movies?'],
  ['📚 Series','How many series?'],
  ['💳 Payment','How can I subscribe?'],
  ['📱 WhatsApp Support','I need help.']
];

const fallback=(m)=>{
  const x=m.toLowerCase();
  if(x.includes('plan')||x.includes('price')) return 'We currently offer two yearly plans: Standard — $30/year and Pro — $45/year. Pro is our most popular plan.';
  if(x.includes('channel')) return 'Standard includes 5,000 channels, while Pro includes 16,000 channels.';
  if(x.includes('movie')) return 'Standard includes 16,000 movies and Pro includes 66,200 movies.';
  if(x.includes('series')) return 'Standard includes 5,800 series and Pro includes 16,509 series.';
  if(x.includes('subscribe')||x.includes('payment')) return 'Choose your plan and click Get Started. We will welcome you first, then you can contact our 24/7 customer service team on WhatsApp.';
  return 'Sure. I can help with plans, channels, movies, series, payments, or customer support.';
};

export function initChat(){
  const win=document.getElementById('chatWindow'),fab=document.getElementById('chatFab'),close=document.getElementById('closeChat'),msgs=document.getElementById('chatMessages'),form=document.getElementById('chatForm'),input=document.getElementById('chatInput'),quickBox=document.getElementById('quickActions');
  fab.onclick=()=>{win.classList.add('open');if(!msgs.children.length)addBot('Hi 👋 Welcome to BixoPlayer. How can I help you?')};
  close.onclick=()=>win.classList.remove('open');
  quickBox.innerHTML=quick.map(q=>`<button type="button" data-msg="${q[1]}">${q[0]}</button>`).join('');
  quickBox.querySelectorAll('button').forEach(b=>b.onclick=()=>send(b.dataset.msg));
  form.onsubmit=e=>{e.preventDefault();if(input.value.trim())send(input.value.trim())};

  async function send(text){
    addUser(text); input.value='';
    const typing=document.createElement('div'); typing.className='typing typing-dots'; typing.textContent='BixoPlayer is typing'; msgs.appendChild(typing); msgs.scrollTop=msgs.scrollHeight;
    try{
      const data=await api.chat({message:text,sessionId:sessionId()});
      typing.remove();
      const reply=data.reply||fallback(text);
      addBot(reply);
      if(isSupportRequest(text)) addSupportCta();
    }catch{
      setTimeout(()=>{
        typing.remove();
        addBot(fallback(text));
        if(isSupportRequest(text)) addSupportCta();
      },450);
    }
  }
  function addUser(t){add('user',t)}
  function addBot(t){add('bot',t)}
  function add(type,t){const d=document.createElement('div');d.className=`message ${type}`;d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
  function isSupportRequest(text){
    const x=text.toLowerCase();
    return /help|support|whatsapp|customer|مساعدة|مساعده|خدمة|خدمه|عملاء|دعم|مشكلة|مشکله|مشكله/.test(x);
  }

  function addSupportCta(){
    if(msgs.querySelector('.chat-inline-support')) return;
    const a=document.createElement('a'); a.className='chat-inline-support'; a.target='_blank'; a.rel='noopener'; a.href=CONTACT_CONFIG.whatsappSupportLink||'#'; a.textContent='💬 التواصل مع خدمة العملاء عبر WhatsApp'; msgs.appendChild(a); msgs.scrollTop=msgs.scrollHeight;
  }
  function sessionId(){let s=sessionStorage.getItem('bixo-chat-session');if(!s){s=crypto.randomUUID?.()||String(Date.now());sessionStorage.setItem('bixo-chat-session',s)}return s}
}
