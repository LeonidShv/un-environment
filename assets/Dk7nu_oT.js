import{d as f,r as t}from"./nkGYWn5g.js";import{a as s}from"./rF1wdL6y.js";import"./FGtjmAml.js";const E=f("environment",()=>{const i=t({}),o=t([]);async function m(r,a,n){const e=await s.environment.readEnvironment(r,a,n);i.value=e.data.dataSets[0].series,o.value=e.data.structure.dimensions.series}const u=t({}),d=t([]);async function S(r,a,n){const e=await s.environment.readEnvironment(r,a,n);u.value=e.data.dataSets[0].series,d.value=e.data.structure.dimensions.series}const c=t({}),v=t([]);async function l(r,a,n){const e=await s.environment.readEnvironment(r,a,n);c.value=e.data.dataSets[0].series,v.value=e.data.structure.dimensions.series}return{readEnvironmentDefaultChart:m,dataSetsSeriesForDefaultChart:i,structureSeriesForDefaultChart:o,readEnvironmentPieChart:S,dataSetsSeriesForPieChart:u,structureSeriesForPieChart:d,readEnvironmentPieRelativeChart:l,dataSetsSeriesForPieRelativeChart:c,structureSeriesForPieRelativeChart:v}});export{E as useEnvironmentStore};
