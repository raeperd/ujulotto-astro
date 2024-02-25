const m="modulepreload",h=function(l){return"/"+l},a={},v=function(u,o,d){let c=Promise.resolve();if(o&&o.length>0){const n=document.getElementsByTagName("link");c=Promise.all(o.map(e=>{if(e=h(e),e in a)return;a[e]=!0;const r=e.endsWith(".css"),f=r?'[rel="stylesheet"]':"";if(!!d)for(let s=n.length-1;s>=0;s--){const i=n[s];if(i.href===e&&(!r||i.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${f}`))return;const t=document.createElement("link");if(t.rel=r?"stylesheet":m,r||(t.as="script",t.crossOrigin=""),t.href=e,document.head.appendChild(t),r)return new Promise((s,i)=>{t.addEventListener("load",s),t.addEventListener("error",()=>i(new Error(`Unable to preload CSS for ${e}`)))})}))}return c.then(()=>u()).catch(n=>{const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=n,window.dispatchEvent(e),!e.defaultPrevented)throw n})},{signIn:E,signOut:g}=await v(()=>import("./client.BqElmF-z.js"),__vite__mapDeps([]));document.getElementById("login")?.addEventListener("click",()=>E("kakao",{redirect:!0,callbackUrl:"/"}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
