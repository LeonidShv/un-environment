import{l as k,r as x,m as B,n as L,q as S,t as w,v as M,x as T,y as U,a as C,z as D,A as E,c as i,b as a,B as d,u as n,F as I,e as F,o as l,p as P,g as R,_ as j}from"./BgU7VtgD.js";import{a as q}from"./Duz-BQAt.js";function z(t,s={}){const e=s.head||k();if(e)return e.ssr?e.push(t,s):N(e,t,s)}function N(t,s,e={}){const c=x(!1),r=x({});B(()=>{r.value=c.value?{}:U(s)});const o=t.push(r.value,e);return L(r,_=>{o.patch(_)}),T()&&(S(()=>{o.dispose()}),w(()=>{c.value=!0}),M(()=>{c.value=!1})),o}const V=t=>(P("data-v-3f0319ee"),t=t(),R(),t),$={class:"article p-t-2 p-b-4"},G={class:"article__title m-b-1"},J={class:"article__author"},K={class:"article__header d-flex gap-1"},O={class:"article__header-text"},Q={class:"article__header-text"},W=V(()=>a("div",{class:"devider m-t-1 m-b-1"},null,-1)),X={class:"article__info"},Y=["src","alt"],Z=["innerHTML"],ee=["innerHTML"],te=C({__name:"ArticlePage",setup(t){var c,r,o,u,_;const s=D(),e=E(()=>q.articles.find(({id:m})=>m===s.params.id));return z({title:(c=e.value)==null?void 0:c.title,meta:[{name:"description",content:(r=e.value)==null?void 0:r.description[0]},{property:"og:type",content:"article"},{property:"article:published_time",content:(o=e.value)==null?void 0:o.date},{property:"og:title",content:(u=e.value)==null?void 0:u.title},{name:"author",content:(_=e.value)==null?void 0:_.author}],htmlAttrs:{lang:"en"}}),(m,ae)=>{var h,v,f,g,y,b,H;return l(),i("section",$,[a("h2",G,d((h=n(e))==null?void 0:h.title),1),a("p",J,d((v=n(e))==null?void 0:v.author),1),a("div",K,[a("p",O,d((f=n(e))==null?void 0:f.timeRead),1),a("p",Q,d((g=n(e))==null?void 0:g.date),1)]),W,a("div",X,[a("img",{class:"article__img m-b-2",src:`/un-environment${(y=n(e))==null?void 0:y.imgSrc}`,alt:(b=n(e))==null?void 0:b.imgAlt},null,8,Y),(l(!0),i(I,null,F((H=n(e))==null?void 0:H.description,(p,A)=>(l(),i(I,{key:A},[p.includes("</ul>")?(l(),i("div",{key:1,class:"article__description-wrapper m-b-1",innerHTML:p},null,8,ee)):(l(),i("p",{key:0,class:"article__description m-b-1",innerHTML:p},null,8,Z))],64))),128))])])}}}),ce=j(te,[["__scopeId","data-v-3f0319ee"]]);export{ce as default};
