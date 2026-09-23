const $=x=>document.getElementById(x);
const video=$("video"),chat=$("chat"),reactions=$("reactions");
let stream=null,facing="user",baseViewers=0,viewerCount=0,startTime=0,timers=[],live=false,chatTimeout=null,reactionTimeout=null;

const users=[
"x7_nova","0xM4x","k1wi.exe","nrw_vibes","vanta_x9","l0stsignal","mx_17x","n0name.83",
"rxven_x","qbit_x","s1lent.wav","k4i_77","voidrunner","pxlghost","m0on_13","xq_91",
"byteb0y","lvx.wave","n3onflux","r4ndom.exe","ghostpacket","z3ro_17","m8trx","xx_nx_xx",
"vhs.1998","noir_x7","k0smos","ctrl_alt_x","frgmnt_09","w4ve_x","nxtlvl.7",
"r3dacted","lowkey_x","xeno.88","n1ghtshift","qwertz_x9","tmp_user17","nullbyte_x",
"f4ded","krptc_22","nx_vision","v0id.33","pixel_krank","zx81_x","u_nkn0wn",
"r00tless","blkbx_17","synth_xx","rawsignal","idk_883","xtrm_low","no_user_x","orbit_x",
"c0smicdust","w33kend.exe","user_7f3","n0_context","acidpixel","xoxo_x","lowbat.9",
"mallemodus","bierpilot","sunset.22","palma_x","vibezonly","nachtflug","br0ski_7",
"wavekid","pixelpaule","k1ngk0ng","bambule_x","partyunit","afterhourz","randomkai",
"m1dn1ght","palmtree_x","lostinpalma","urlaub.exe","bierchen_7","s0mmerkind","westside_x",
"heyitsmx","unknown.21","j4y_x","lucidwave","b0mbay_8","rheinland_x","mood.77",
"justwatching","sunnyside_x","nxtstop","nightowl.3","vibes_24","user_x81","offlinekid"
];

const plain=[
"wo seid ihr","was geht heute noch","stabil","grüße gehen raus",
"wo ist das","mach kamera mal nach hinten","zeig mal wo ihr seid","brooooo","HAHAHAHA",
"kamera drehen pls","heute wird teuer",
"wo kommt ihr her","NRW ist auch da","grüße aus köln","grüße aus düsseldorf",
"grüße aus hamburg","grüße aus berlin","grüße aus münchen","grüße aus dortmund",
"grüße aus essen","grüße aus frankfurt","grüße ausm pott","viel spaß euch",
"was ist der plan heute noch","wo gehts danach hin","wie lange bleibt ihr noch",
"wie lange seid ihr da","seid ihr morgen auch noch da","update pls","mehr updates pls",
"Baila Baila Baila","Saufi Saufi","Ballermann","Malle","heute MEGAPARK?","Megapark","Bambooooo","hey","hallo","Hallo","hi","PARTYYYY","Prost",
"ein bier geht noch","noch eine runde","wo sind die bier","prost jungs","abfahrt",
"vollgas","weiter gehts","nicht aufhören","lauter","das ist MEIN Song",
"Mallorca geht immer","Ballermann heute komplett voll",
"wer ist noch auf Malle","was trinkt ihr","welcher laden ist das","wo geht ihr später hin",
"wann gehts zum Bierkönig","seid ihr später noch unterwegs","bro was geht da ab",
"grüße an die jungs","viel spaß jungs","genießt den abend","gönnt euch",
"where are you guys","brooooo","have fun guys","where are you",
"what's the plan tonight","where are you going next","how long are you staying",
"cheers guys","have a good one","enjoy guys","turn the camera around",
"what are you drinking","Mallorca?","Malleeee","party time","let's goooo",
"what's next","update pls","more updates","where's the party","have fun"
];

const emojiOnly=["🍺","🍺🍺","🍻","🍻🍻","🔥","🔥🔥","🔥🔥🔥","🍺🔥","🔥🍺","🍻🔥","🔥🍻","🏝️🔥","🍺🍺🔥"];
const partyEmojiText=["Ballermann 🔥","Ballermann 🍺","Ballermann 🔥🍺","Malle 🔥","Malle 🍻","Saufi Saufi 🍺","Saufi Saufi 🔥","Prost 🍻","brooooo 🔥","viel spaß euch 🍻","Baila Baila Baila 🔥","heute MEGAPARK? 🔥","heute MEGAPARK? 🍺","heute MEGAPARK? 🥳","Megapark 🔥","Megapark 🍻","Megapark 🥳","Bambooooo 🔥","Bambooooo 🍺","Bambooooo 🥳","hey 👋","hey 🍺","hallo 👋","hallo 🍺","Hallo 👋","Hallo 🍻","hi 👋","hi 🍺"];

const secondPerson=["wer ist das","okay wer ist neu im bild","wer kam da gerade rein","wer ist der typ hinten","plot twist","jetzt wirds interessant","hahaha wer ist das denn","who just walked in","wait who's that","who is that guy","new character unlocked","okay who's the second guy","bro who is that","who just joined"];

function rand(a){return a[Math.floor(Math.random()*a.length)]}
function comment(){
 const r=Math.random();
 if(r<.72)return rand(plain);
 if(r<.88)return rand(emojiOnly);
 return rand(partyEmojiText);
}
function addMessage(text=null){
 const el=document.createElement("div");el.className="msg";el.innerHTML=`<b>${rand(users)}</b>${text||comment()}`;chat.appendChild(el);
 while(chat.children.length>8)chat.removeChild(chat.firstChild);
}
function heart(){const h=document.createElement("div");h.className="heart";h.textContent=rand(["♥","♡","🔥","👍"]);if(h.textContent==="♥"||h.textContent==="♡")h.classList.add("red-heart");h.style.setProperty("--drift",(Math.random()*60-30)+"px");h.style.left=Math.random()*25+"px";reactions.appendChild(h);setTimeout(()=>h.remove(),2400)}
function fmt(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function stopTimers(){
 timers.forEach(clearInterval);timers=[];
 if(chatTimeout){clearTimeout(chatTimeout);chatTimeout=null}
 if(reactionTimeout){clearTimeout(reactionTimeout);reactionTimeout=null}
}
function scheduleChat(){
 if(!live)return;
 // Usually 0.6–2.8 s, sometimes a short burst or a noticeable pause.
 const r=Math.random();
 let delay=r<.18?350+Math.random()*550:r<.86?900+Math.random()*1900:3000+Math.random()*3500;
 chatTimeout=setTimeout(()=>{if(!live)return;addMessage();if(Math.random()<.18)setTimeout(()=>live&&addMessage(),180+Math.random()*450);scheduleChat()},delay);
}
function scheduleReaction(){
 if(!live)return;
 // Frequent floating reactions, with occasional small bursts.
 const delay=350+Math.random()*900;
 reactionTimeout=setTimeout(()=>{if(!live)return;heart();if(Math.random()<.38){setTimeout(()=>live&&heart(),100);setTimeout(()=>live&&heart(),260)}scheduleReaction()},delay);
}
function validate(){const ok=$("nameInput").value.trim()&&Number($("viewerInput").value)>0;$("startBtn").disabled=!ok}
$("nameInput").oninput=validate;$("viewerInput").oninput=validate;

async function start(){
 try{
  if(stream)stream.getTracks().forEach(t=>t.stop());
  stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:facing},width:{ideal:1280},height:{ideal:720}},audio:false});
  video.srcObject=stream;video.style.transform=facing==="user"?"scaleX(-1)":"none";
  const name=$("nameInput").value.trim();baseViewers=Number($("viewerInput").value);viewerCount=baseViewers;
  $("displayName").textContent=name;$("avatar").textContent=name[0].toUpperCase();$("handle").textContent="@"+name.toLowerCase().replace(/[^a-z0-9_]/g,"_");
  $("setup").classList.add("hidden");$("ended").classList.add("hidden");$("viewers").textContent=viewerCount.toLocaleString("de-DE");
  chat.innerHTML='<div class="msg system">Du bist jetzt live.</div>';startTime=Date.now();live=true;stopTimers();
  scheduleChat();
  // Slow, small viewer changes every 7 seconds, gently returning toward the chosen starting number.
  timers.push(setInterval(()=>{let pull=viewerCount>baseViewers? -1:viewerCount<baseViewers?1:0;let delta=Math.floor(Math.random()*7)-3+pull;viewerCount=Math.max(1,viewerCount+delta);$("viewers").textContent=viewerCount.toLocaleString("de-DE")},7000));
  scheduleReaction();
 }catch(e){alert("Kamera konnte nicht geöffnet werden. Bitte Kameraberechtigung erlauben und die Seite über HTTPS oder localhost öffnen.")}
}
function endLive(){
 $("menuShade").classList.add("hidden");stopTimers();live=false;
 if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}video.srcObject=null;
$("finalViewers").textContent=viewerCount.toLocaleString("de-DE");$("ended").classList.remove("hidden");
}
$("startBtn").onclick=start;
$("restartBtn").onclick=()=>{$("ended").classList.add("hidden");$("setup").classList.remove("hidden");$("nameInput").value="";$("viewerInput").value="";$("startBtn").disabled=true};
$("cameraBtn").onclick=async()=>{if(!live)return;facing=facing==="user"?"environment":"user";try{stream?.getTracks().forEach(t=>t.stop());stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:facing}},audio:false});video.srcObject=stream;video.style.transform=facing==="user"?"scaleX(-1)":"none"}catch(e){}};
$("likeBtn").onclick=()=>{for(let i=0;i<4;i++)setTimeout(heart,i*100)};
$("fullscreenBtn").onclick=()=>!document.fullscreenElement?document.documentElement.requestFullscreen?.():document.exitFullscreen?.();
$("menuBtn").onclick=()=>{if(live)$("menuShade").classList.remove("hidden")};$("cancelBtn").onclick=()=>$("menuShade").classList.add("hidden");$("menuShade").onclick=e=>{if(e.target===$("menuShade"))$("menuShade").classList.add("hidden")};$("endBtn").onclick=endLive;
document.querySelectorAll(".dead").forEach(x=>x.onclick=()=>{});
window.addEventListener("pagehide",()=>stream?.getTracks().forEach(t=>t.stop()));

// Hook prepared for person detection: when a later local detector confirms a second person,
// call triggerSecondPersonComments(). No face identification is required.
window.triggerSecondPersonComments=()=>{if(!live)return;[2200,5700,10300].forEach(ms=>setTimeout(()=>{if(live)addMessage(rand(secondPerson))},ms))};
