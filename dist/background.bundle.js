(()=>{importScripts("./p2p.js","./crypto.js");let t={};(async()=>{const{broadcast:e,onMessage:r}=await initP2P();r((async e=>{const{type:r,data:s}=e;if("REPORT"===r&&await verifyReport(s)){const{target:e,reporter:r}=s;t[e]=t[e]||{reports:0,reporters:new Set},t[e].reporters.has(r)||(t[e].reports++,t[e].reporters.add(r),console.log(`Updated reputation for ${e}: ${t[e].reports} reports`))}})),chrome.runtime.onMessage.addListener(((r,s,o)=>{if("REPORT_USER"===r.type){const{target:t}=r,a={target:t,reporter:s.id,timestamp:Date.now()};signReport(a).then((t=>{e({type:"REPORT",data:t}),o({success:!0})}))}else if("GET_REPUTATION"===r.type){const{username:e}=r;o({reputation:t[e]?.reports||0})}}))})()})();