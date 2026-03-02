const s=async()=>{if("serviceWorker"in navigator)try{const t="/sw.js",e=await fetch(t,{method:"HEAD"}).catch(()=>null);if(!e||!e.ok)return;const n=await navigator.serviceWorker.register(t,{scope:"/"});return n.addEventListener("updatefound",()=>{const i=n.installing;i&&i.addEventListener("statechange",()=>{i.state==="installed"&&navigator.serviceWorker.controller&&r(n)})}),n}catch(t){return console.error("SW: Registration failed",t),null}},r=t=>{const e=document.createElement("div");e.className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-3 z-50 text-center",e.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;margin-right:6px"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    <span>Nuova versione disponibile!</span>
    <button id="sw-update-btn" class="ml-3 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">
      Aggiorna
    </button>
    <button id="sw-dismiss-btn" class="ml-2 text-blue-200 text-sm">
      &times;
    </button>
  `,document.body.appendChild(e),document.getElementById("sw-update-btn").addEventListener("click",()=>{t.waiting&&(t.waiting.postMessage({type:"SKIP_WAITING"}),window.location.reload())}),document.getElementById("sw-dismiss-btn").addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},1e4)};export{s as registerServiceWorker};
