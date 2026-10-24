import{c as u,r as t}from"./index-D4PxVgk-.js";import{f,a as h}from"./api-yCPy5mam.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z",key:"17jzev"}]],p=u("Thermometer",i);function v(){const[o,c]=t.useState(f),[n,r]=t.useState(!0),[l,s]=t.useState(null),a=t.useCallback(async()=>{r(!0),s(null);try{const e=await h();c(e)}catch(e){s(e instanceof Error?e.message:"Failed to fetch weather")}finally{r(!1)}},[]);return t.useEffect(()=>{a();const e=setInterval(a,300*1e3);return()=>clearInterval(e)},[a]),{weather:o,loading:n,error:l,refresh:a}}export{p as T,v as u};
