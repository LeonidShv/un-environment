import{C as P,a as k,r as R,D as L,i as U,E as V,G as D,q as I,H as O,I as A,J as q,K as j,L as F,A as _,M as N,N as H,O as $,P as M,Q as z,R as Q,c as G,h as J,w as K,o as W,b as f,B as C}from"./DzGl7Ao1.js";async function B(r,t=P()){const{path:i,matched:c}=t.resolve(r);if(!c.length||(t._routePreloaded||(t._routePreloaded=new Set),t._routePreloaded.has(i)))return;const e=t._preloadPromises=t._preloadPromises||[];if(e.length>4)return Promise.all(e).then(()=>B(r,t));t._routePreloaded.add(i);const l=c.map(s=>{var a;return(a=s.components)==null?void 0:a.default}).filter(s=>typeof s=="function");for(const s of l){const a=Promise.resolve(s()).catch(()=>{}).finally(()=>e.splice(e.indexOf(a)));e.push(a)}await Promise.all(e)}const X=(...r)=>r.find(t=>t!==void 0);function Y(r){const t=r.componentName||"NuxtLink";function i(e,l){if(!e||r.trailingSlash!=="append"&&r.trailingSlash!=="remove")return e;if(typeof e=="string")return w(e,r.trailingSlash);const s="path"in e&&e.path!==void 0?e.path:l(e).path;return{...e,name:void 0,path:w(s,r.trailingSlash)}}function c(e){const l=P(),s=M(),a=_(()=>{const g=e.to||e.href||"";return i(g,l.resolve)}),o=_(()=>typeof a.value=="string"&&N(a.value,{acceptRelative:!0})),p=_(()=>{var g;return typeof a.value=="object"?((g=l.resolve(a.value))==null?void 0:g.href)??null:a.value&&!e.external&&!o.value?i(H(s.app.baseURL,a.value),l.resolve):a.value}),v=q("RouterLink"),b=v&&typeof v!="string"?v.useLink:void 0,u=b==null?void 0:b({...e,to:a.value}),x=_(()=>e.target&&e.target!=="_self"),h=_(()=>e.external||x.value?!0:typeof a.value=="object"?!1:a.value===""||o.value);return{to:a,hasTarget:x,isAbsoluteUrl:o,isExternal:h,href:p,isActive:(u==null?void 0:u.isActive)??_(()=>a.value===l.currentRoute.value.path),isExactActive:(u==null?void 0:u.isExactActive)??_(()=>a.value===l.currentRoute.value.path),route:(u==null?void 0:u.route)??_(()=>l.resolve(a.value)),async navigate(){await $(p.value,{replace:e.replace,external:e.external})}}}return k({name:t,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},useLink:c,setup(e,{slots:l}){const s=P(),{to:a,href:o,navigate:p,isExternal:v,hasTarget:b,isAbsoluteUrl:u}=c(e),x=R(!1),h=R(null),g=d=>{var m;h.value=e.custom?(m=d==null?void 0:d.$el)==null?void 0:m.nextElementSibling:d==null?void 0:d.$el};if(e.prefetch!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!te()){const m=L();let y,n=null;U(()=>{const E=ee();V(()=>{y=D(()=>{var S;(S=h==null?void 0:h.value)!=null&&S.tagName&&(n=E.observe(h.value,async()=>{n==null||n(),n=null;const T=typeof a.value=="string"?a.value:s.resolve(a.value).fullPath;await Promise.all([m.hooks.callHook("link:prefetch",T).catch(()=>{}),!v.value&&B(a.value,s).catch(()=>{})]),x.value=!0}))})})}),I(()=>{y&&O(y),n==null||n(),n=null})}return()=>{var y;if(!v.value){const n={ref:g,to:a.value,activeClass:e.activeClass||r.activeClass,exactActiveClass:e.exactActiveClass||r.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(x.value&&(n.class=e.prefetchedClass||r.prefetchedClass),n.rel=e.rel||void 0),A(q("RouterLink"),n,l.default)}const d=e.target||null,m=X(e.noRel?"":e.rel,r.externalRelAttribute,u.value||b.value?"noopener noreferrer":"")||null;return e.custom?l.default?l.default({href:o.value,navigate:p,get route(){if(!o.value)return;const n=new URL(o.value,window.location.href);return{path:n.pathname,fullPath:n.pathname,get query(){return j(n.search)},hash:n.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:o.value}},rel:m,target:d,isExternal:v.value,isActive:!1,isExactActive:!1}):null:A("a",{ref:h,href:o.value||null,rel:m,target:d},(y=l.default)==null?void 0:y.call(l))}}})}const Z=Y(F);function w(r,t){const i=t==="append"?z:Q;return N(r)&&!r.startsWith("http")?r:i(r,!0)}function ee(){const r=L();if(r._observer)return r._observer;let t=null;const i=new Map,c=(l,s)=>(t||(t=new IntersectionObserver(a=>{for(const o of a){const p=i.get(o.target);(o.isIntersecting||o.intersectionRatio>0)&&p&&p()}})),i.set(l,s),t.observe(l),()=>{i.delete(l),t.unobserve(l),i.size===0&&(t.disconnect(),t=null)});return r._observer={observe:c}}function te(){const r=navigator.connection;return!!(r&&(r.saveData||/2g/.test(r.effectiveType)))}const ae={class:"blog__list"},re={class:"card__author"},le={class:"card__info-wrapper wrap d-flex gap-2"},ne={class:"card__title"},se={class:"card__description"},ie=["src","alt"],oe={class:"card__footer d-flex gap-1"},ue={class:"card__footer-text"},ce={class:"card__footer-text"},fe=k({__name:"TheCard",props:{id:{default:""},author:{default:""},title:{default:""},description:{default:[]},imgSrc:{default:""},imgAlt:{default:""},timeRead:{default:""},date:{default:""}},setup(r){return(t,i)=>{const c=Z;return W(),G("div",ae,[J(c,{to:`/blog/${t.id}`,class:"bload__list-card card"},{default:K(()=>[f("p",re,C(t.author),1),f("section",le,[f("div",null,[f("h3",ne,C(t.title),1),f("p",se,C(t.description[0]),1)]),f("img",{class:"card__img",src:`/un-environment${t.imgSrc}`,alt:t.imgAlt},null,8,ie)]),f("div",oe,[f("p",ue,C(t.timeRead),1),f("p",ce,C(t.date),1)])]),_:1},8,["to"])])}}});export{fe as _};