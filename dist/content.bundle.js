(()=>{function e(e){return new Promise((t=>{chrome.runtime.sendMessage({type:"GET_REPUTATION",username:e},(e=>t(e.reputation||0)))}))}(async()=>{const t=function(){const e=window.location.href.match(/https:\/\/x\.com\/([^\/]+)/);return e?e[1]:null}();t&&(await e(t),function(t){const n=document.querySelector('[data-testid="UserName"]');if(!n)return;const o=document.createElement("span");o.className="reputation-badge bg-danger text-white ms-2 px-2 rounded",o.textContent=`🚩 ${e(t)} Reports`,n.appendChild(o)}(t))})()})();