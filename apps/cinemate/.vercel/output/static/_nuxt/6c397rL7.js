import{_ as p}from"./DVSH2alI.js";import{f as h,r as i,g as u,h as m,o as n,c,a as d,F as f,i as v,b as _,m as g,_ as S,j as y,w as k}from"./Dsxbz3Un.js";import{_ as w}from"./Dqt0ub_F.js";import{_ as M}from"./Ba36nEMu.js";const x=h("discover",()=>{const a=i([]),s=i([]),t=i(!1),o=i(null);return{movies:a,series:s,isLoading:t,error:o,fetchMovies:async()=>{t.value=!0,o.value=null;try{const e=await $fetch("api/movie/discover");e&&(a.value=e?e.movies.results:[])}catch(e){o.value=e,console.error("Error fetching movies and series:",e)}finally{t.value=!1}},fetchSeries:async()=>{t.value=!0,o.value=null;try{const e=await $fetch("api/series/discover");e&&(s.value=e?e.series.results:[])}catch(e){o.value=e,console.error("Error fetching series:",e)}finally{t.value=!1}}}}),$={class:"mb-12"},b={class:"grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"},C=u({__name:"DiscoverMovieSection",setup(a){const s=x(),t=i([]);return m(async()=>{await s.fetchMovies(),t.value=s.movies}),(o,r)=>{const l=p;return n(),c("section",$,[r[0]||(r[0]=d("h1",{class:"mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"}," Featured Movies ",-1)),d("div",b,[(n(!0),c(f,null,v(t.value,e=>(n(),c("div",{key:e.id},[_(l,g({ref_for:!0},e,{item:e}),null,16,["item"])]))),128))])])}}}),D={class:"mb-12"},B={class:"grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"},F=u({__name:"DiscoverSeriesSection",setup(a){const s=x(),t=i([]);return m(async()=>{await s.fetchSeries(),t.value=s.series}),(o,r)=>{const l=w;return n(),c("section",D,[r[0]||(r[0]=d("h1",{class:"mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"}," Featured Tv Series ",-1)),d("div",B,[(n(!0),c(f,null,v(t.value,e=>(n(),c("div",{key:e.id},[_(l,g({ref_for:!0},e,{item:e}),null,16,["item"])]))),128))])])}}}),E={};function L(a,s){const t=C,o=F,r=M;return n(),y(r,null,{default:k(()=>[_(t),_(o)]),_:1})}const T=S(E,[["render",L]]);export{T as default};
