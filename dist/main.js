(()=>{"use strict";var e=["second","minute","hour","day","week","month","year"],t=["秒","分钟","小时","天","周","个月","年"],n={},a=function(e,t){n[e]=t},r=[60,60,24,7,365/7/12,12];function s(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}a("en_US",(function(t,n){if(0===n)return["just now","right now"];var a=e[Math.floor(n/2)];return t>1&&(a+="s"),[t+" "+a+" ago","in "+t+" "+a]})),a("zh_CN",(function(e,n){if(0===n)return["刚刚","片刻后"];var a=t[~~(n/2)];return[e+" "+a+"前",e+" "+a+"后"]}));const o=140,l=e=>{const t=$(".new-tweet .error");t.children(".msg").html(e),t.slideDown(),$("#tweet-textarea").focus()},i=e=>{return`\n    <article class="tweet">\n      <header>\n        <div class="avatar-and-name">\n          <img src="${e.user.avatars}" alt="small-avatar" width="48" height="48">\n          <span class="name">${e.user.name}</span>\n        </div>\n        <div class="handle">\n          <span>${e.user.handle}</span>\n        </div>\n      </header>\n      <main>${(e=>{let t=document.createElement("div");return t.appendChild(document.createTextNode(e)),t.innerHTML})(e.content.text)}</main>\n      <footer>\n        <span class="date">${t=e.created_at,l=function(e,t){return(+(t?s(t):new Date)-+s(e))/1e3}(t,o&&o.relativeDate),function(e,t){for(var n=e<0?1:0,a=e=Math.abs(e),s=0;e>=r[s]&&s<r.length;s++)e/=r[s];return(e=Math.floor(e))>(0==(s*=2)?9:1)&&(s+=1),t(e,s,a)[n].replace("%s",e.toString())}(l,function(e){return n[e]||n.en_US}(a))}</span>\n        <div>\n          <i class="fa-solid fa-flag"></i>\n          <i class="fa-solid fa-retweet"></i>\n          <i class="fa-solid fa-heart"></i>\n        </div>\n      </footer>\n    </article>\n  `;var t,a,o,l},c=()=>{$.get("/tweets").then((e=>(e=>{let t="";e.forEach((e=>t+=i(e))),$("#tweets-container").html("").append(t)})(e))).catch((e=>{$(".new-tweet").slideDown(),l(`Error: Tweets aren't available at this time (${e.status} ${e.statusText})`)}))};$((()=>{c(),(()=>{const e=$("#nav-buttons");e.on("click",".toggle-tweet",(()=>{$(".new-tweet").slideToggle("slow"),$("#tweet-textarea").focus()})),e.on("click",".scroll-top",(e=>{const t=$(e.currentTarget),n=t.siblings(".toggle-tweet");$("html, body").animate({scrollTop:0}).promise().then((()=>{t.slideUp("slow"),n.slideDown("slow"),$(".new-tweet").slideDown("slow"),$("#tweet-textarea").focus()}))}))})(),$(window).on("scroll",(e=>{const t=$(e.currentTarget).scrollTop(),n=$(".scroll-top"),a=n.siblings(".toggle-tweet");t>150?(n.slideDown("slow"),a.slideUp()):(n.slideUp("slow"),a.slideDown("slow"))})),(()=>{const e=$("#tweet-form");e.on("submit keydown",(t=>{if("submit"===t.type||13===t.keyCode){const n=e.serialize(),a=e.children("#tweet-textarea").val();if(t.preventDefault(),!(e=>e?!(e.length>o&&(l("Tweets can't exceed 140 characters."),1)):(l("You can't send an empty tweet."),!1))(a))return!1;$.post("/tweets",n).then((()=>{c(),e.trigger("reset").find(".counter").text(o)})).catch((e=>l(`Error: Your tweet did not get sent (${e.status} ${e.statusText})`)))}})),e.on("input","#tweet-textarea",(t=>{const n=$(t.currentTarget).val(),a=e.find(".counter"),r=e.siblings(".error");n.length>o?(a.addClass("negative"),l("Tweets can't exceed 140 characters.")):(a.removeClass("negative"),r.slideUp()),a.text(o-n.length)}))})()}))})();