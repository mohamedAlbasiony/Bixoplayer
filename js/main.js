import {CONTACT_CONFIG, createWhatsAppLink} from './config.js';import {loadPlans,renderPlans} from './pricing.js';import {getMovies,renderMovies} from './movies.js';import {getSeries,renderSeries} from './series.js';import {initChat} from './chatbot.js';import {initTheme} from './theme.js';import {openModal,initModals} from './modal.js';import {toast} from './notifications.js';
const categories=[['Live TV','Thousands of channels, always on.','https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80'],['Movies','Blockbusters & hidden gems.','https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80'],['Series','Your next obsession awaits.','https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1000&q=80'],['Sports','Live action. No FOMO.','https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80']];
const sports=[['⚽','Football','Live matches & tournaments'],['🏀','Basketball','Courtside action'],['🎾','Tennis','Grand slams & tours'],['🏎️','Other Sports','Motorsport, combat & more']];
const channels=[['B1','Bixo One','Global','Entertainment'],['NEWS','Bixo News','International','News'],['SP','Bixo Sports','Global','Sports'],['CINE','Bixo Cinema','US / EU','Movies'],['KIDS','Bixo Kids','Global','Family'],['DOC','Bixo Docs','Global','Documentary'],['MIX','Bixo Mix','MENA','Lifestyle'],['LIVE','Bixo Live','Worldwide','Variety']];
const faqs=[['What is BixoPlayer?','BixoPlayer is a premium streaming platform concept with movies, series, live TV, sports, subscriptions, support, and a backend-ready API architecture.'],['What plans are available?','Standard is $30/year and Pro is $45/year. Pro is the most popular plan.'],['How do I subscribe?','Choose a plan, complete the subscription form, and the backend creates a checkout session with your configured payment provider.'],['What payment methods are supported?','The frontend is provider-agnostic. Stripe or a suitable local provider can be connected through the backend.'],['Can I use multiple devices?','Multi-device support is included in the Standard and Pro plan feature sets.'],['How many channels are available?','Standard includes 5,000 channels and Pro includes 16,000 channels.'],['How can I contact support?','Use WhatsApp, Telegram, Facebook, or email from the Contact section.'],['Is customer support available?','Yes. Customer support is included in the plans and can be routed through the configured support channels.']];
let selectedPlan=null;
function renderCategories(){document.getElementById('categoryGrid').innerHTML=categories.map(c=>`<article class="category-card">
<img
  src="${c[2]}"
  alt="BIXOPLAY ${c[0]} - ${c[1]}"
  loading="lazy"
  decoding="async"
>
<div class="category-info"><h3>${c[0]}</h3><span>${c[1]}</span></div><span class="arrow">→</span></article>`).join('')}
function renderSports(){document.getElementById('sportsGrid').innerHTML=sports.map(s=>`<article class="sport-card"><span class="sport-badge">● LIVE NOW</span><h3>${s[0]} ${s[1]}</h3><p>${s[2]}</p></article>`).join('')}
function renderChannels(){document.getElementById('channelsGrid').innerHTML=channels.map(c=>`<article class="channel-card"><div class="channel-logo">${c[0]}</div><div><h3>${c[1]}</h3><p>${c[2]} · ${c[3]}</p></div><span class="channel-live"><i></i>LIVE</span></article>`).join('')}
function renderFaq(){document.getElementById('faqList').innerHTML=faqs.map((f,i)=>`<div class="faq-item"><button class="faq-q" aria-expanded="false"><span>${f[0]}</span><span>+</span></button><div class="faq-a">${f[1]}</div></div>`).join('');document.querySelectorAll('.faq-q').forEach(q=>q.onclick=()=>{const item=q.parentElement;item.classList.toggle('open');q.setAttribute('aria-expanded',item.classList.contains('open'))})}

function setupContact() {
  const wa = CONTACT_CONFIG.whatsappSupportLink;

  const tg = CONTACT_CONFIG.telegram;
  const fb = CONTACT_CONFIG.facebook;

  const links = [
    ["whatsappLink", wa],
    ["footerWhatsapp", wa],
    ["telegramLink", tg],
    ["footerTelegram", tg],
    ["facebookLink", fb],
    ["footerFacebook", fb],
    ["floatingWhatsapp", wa],
    ["chatWhatsappSupport", wa],
    ["errorSupport", wa]
  ];

  links.forEach(([id, url]) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });

  // Preserve both official WhatsApp support numbers.
  document.querySelectorAll(".official-whatsapp")
    .forEach(link => {
      const number = link.href.match(/wa\.me\/(\d+)/)?.[1];

      if (!number) return;

      const message =
        "أهلًا BIXOPLAY 👋\n" +
        "أنا جاي من الموقع الرسمي، " +
        "وحابب أستفسر عن الباقات المتاحة.";

      link.href =
        `https://wa.me/${number}?text=` +
        encodeURIComponent(message);
    });
}

function openDetails(item){document.getElementById('detailsContent').innerHTML=`<img src="${item.poster}" alt="${item.title}"><span class="eyebrow">BIXOPLAYER FEATURE</span><h2>${item.title}</h2><div class="meta"><span>${item.year}</span><span class="rating">★ ${item.rating}</span><span>${item.genre||item.seasons||'Premium'}</span></div><p>${item.description||'Enjoy this title in a premium cinematic experience. Connect the video asset to your protected playback backend when the service is live.'}</p><button class="btn btn-primary" onclick="window.__playTitle()">▶ Watch Now</button>`;window.__playTitle=()=>toast('Playback endpoint ready — connect your protected video stream in the backend.');openModal('detailsModal')}
function openSubscription(plan){selectedPlan=plan;document.getElementById('selectedPlanSummary').innerHTML=`<div class="plan-summary"><strong>${plan.name}</strong><span class="summary-price">$${plan.price}/${plan.duration}</span><p class="price-sub">${plan.channels.toLocaleString()} channels · ${plan.movies.toLocaleString()} movies · ${plan.series.toLocaleString()} series</p></div>`;openModal('subscriptionModal')}

function openWhatsAppWelcome(plan) {
  const years = plan.selectedYears;
  const price = plan.selectedPrice;

  const duration =
    years === 1 ? "سنة واحدة" : `${years} سنوات`;

  const message =
    `أهلًا BIXOPLAY 👋\n\n` +
    `أنا جاي من موقع BIXOPLAY الرسمي.\n` +
    `وعايز أشترك في الباقة التالية:\n\n` +
    `📦 الباقة: ${plan.name.toUpperCase()}\n` +
    `📅 المدة: ${duration}\n` +
    `💰 السعر: ${price} دولار\n\n` +
    `ممكن أعرف خطوات الاشتراك؟`;

  const whatsappUrl = createWhatsAppLink(message);

  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );
}

async function submitSubscription(e){e.preventDefault();if(!selectedPlan)return;const form=new FormData(e.currentTarget);const payload={planId:selectedPlan.id,name:form.get('name'),email:form.get('email'),phone:form.get('phone'),country:form.get('country'),paymentMethod:form.get('paymentMethod')};try{const result=await api.createCheckout(payload);if(result?.checkoutUrl){location.href=result.checkoutUrl}else throw new Error('Backend did not return checkoutUrl')}catch(err){openModal('errorModal')}}
async function search(q){const status=document.getElementById('searchStatus'),out=document.getElementById('searchResults');if(!q.trim()){out.innerHTML='';status.textContent='';return}status.textContent='Searching…';try{const data=await api.search(q);const results=data.results||[];status.textContent=results.length?`${results.length} results`:'No results found.';out.innerHTML=results.map(r=>`<div class="search-result"><img src="${r.poster}" alt=""><h4>${r.title}</h4><p>${r.type||'Content'} · ${r.year||''}</p></div>`).join('')}catch{status.textContent='Unable to load content. Please try again.';out.innerHTML=''}}
async function init(){initTheme();initModals();initChat();renderCategories();renderSports();renderChannels();renderFaq();setupContact();const [plans,movies,series]=await Promise.all([loadPlans(),getMovies(),getSeries()]);renderPlans(plans,openWhatsAppWelcome);renderMovies(movies,document.getElementById('moviesGrid'),openDetails);renderSeries(series,document.getElementById('seriesGrid'),openDetails);document.getElementById('subscriptionForm').onsubmit=submitSubscription;document.getElementById('watchNow').onclick=()=>openDetails(movies[0]);document.getElementById('retryPayment').onclick=()=>{if(selectedPlan){document.getElementById('errorModal').classList.remove('open');openSubscription(selectedPlan)}};document.getElementById('errorSupport').href=CONTACT_CONFIG.whatsappSupportLink||'#';document.getElementById('searchToggle').onclick=()=>openModal('searchOverlay');document.getElementById('searchInput').oninput=e=>search(e.target.value);document.getElementById('menuBtn').onclick=()=>document.getElementById('mobileNav').classList.toggle('open');window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',scrollY>20));const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e))}
init();
