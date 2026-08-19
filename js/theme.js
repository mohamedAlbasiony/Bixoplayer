export function initTheme(){
  const root=document.documentElement;
  const btn=document.getElementById('themeToggle');
  if(!btn) return;

  const saved=localStorage.getItem('bixo-theme');
  const initial=saved==='light'||saved==='dark'?saved:(window.matchMedia?.('(prefers-color-scheme: light)').matches?'light':'dark');

  const applyTheme=(theme)=>{
    root.dataset.theme=theme;
    root.style.colorScheme=theme;
    btn.textContent=theme==='dark'?'☼':'☾';
    btn.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');
    btn.setAttribute('title',theme==='dark'?'Light mode':'Dark mode');
  };

  applyTheme(initial);

  btn.addEventListener('click',()=>{
    const next=root.dataset.theme==='dark'?'light':'dark';
    root.classList.add('theme-changing');
    applyTheme(next);
    localStorage.setItem('bixo-theme',next);
    window.setTimeout(()=>root.classList.remove('theme-changing'),380);
  });
}
