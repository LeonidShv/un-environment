import{t as d,c as s,g as h,a as u}from"./FGtjmAml.js";import"./nkGYWn5g.js";function C(){function l(r){const a=[],e=[],n=[];let t=0;for(const c in r){const i=Object.entries(r[c].observations).sort((o,b)=>Number(o[0])-Number(b[0])).map(o=>Math.round(o[1][0]*d));a.push(i[0]),e.push(s[t]||u),n.push(s[t]||u),t++}return[{data:a,backgroundColor:e,borderColor:n}]}function f(r,a){const e=h(a),n=[];let t=0;for(const c in r){const i=Object.entries(r[c].observations).sort((o,b)=>Number(o[0])-Number(b[0])).map(o=>Math.round(o[1][0]*d));n.push({data:i,label:e?e[t]:"",backgroundColor:s[t]||u,borderColor:s[t]||u}),t++}return n}return{getPieChartData:l,getDefaultChartData:f}}export{C as useDashboard};
