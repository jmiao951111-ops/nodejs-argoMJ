const e=require("express"),a=e(),r=require("axios"),o=require("os"),f=require("fs"),p=require("path"),{promisify:l}=require("util"),c=l(require("child_process").exec),{execSync:s}=require("child_process"),u=process.env.UPLOAD_URL||"",j=process.env.PROJECT_URL||"",d=process.env.AUTO_ACCESS||!1,h=process.env.FILE_PATH||"./tmp",m=process.env.SUB_PATH||"1995",g=process.env.SERVER_PORT||process.env.PORT||3000,v=process.env.UUID||"c74a1b75-e7c9-4000-8b16-d4a9b5ac5484",b=process.env.NEZHA_SERVER||"",w=process.env.NEZHA_PORT||"",y=process.env.NEZHA_KEY||"",k=process.env.ARGO_DOMAIN||"1995mj.mj1111.dpdns.org",x=process.env.ARGO_AUTH||"eyJhIjoiOTMyYTA2YzFhMjM2YTZhYmRkOWVhZDVlMzU4ZGVlZWUiLCJ0IjoiYjcwMDA1NzItZjk2My00YmU5LTlhY2ItNWJkM2E3MjhkYzQyIiwicyI6Ik9EWTBPVFEwTVdFdE1tSm1PQzAwWXpReExXRXlPVGd0TlRaak0yTmhNR0ZrWVRabSJ9",A=process.env.ARGO_PORT||8001,C=process.env.CFIP||"cdns.doon.eu.org",D=process.env.CFPORT||443,E=process.env.NAME||"mj";  
f.existsSync(h)||f.mkdirSync(h);

function F(){const e="abcdefghijklmnopqrstuvwxyz";let a="";for(let r=0;r<6;r++)a+=e.charAt(Math.floor(Math.random()*e.length));return a}

const G=F(),H=F(),I=F(),J=F(),
K=p.join(h,G),L=p.join(h,J),M=p.join(h,H),N=p.join(h,I),
O=p.join(h,"sub.txt"),P=p.join(h,"list.txt"),
Q=p.join(h,"boot.log"),R=p.join(h,"config.json");

function S(){try{if(!u||!f.existsSync(O))return;let e;try{e=f.readFileSync(O,"utf-8")}catch{return null}
const a=Buffer.from(e,"base64").toString("utf-8")
.split("\n").filter(e=>/(vless|vmess|trojan|hysteria2|tuic):\/\//.test(e));
if(0===a.length)return;
r.post(`${u}/api/delete-nodes`,JSON.stringify({nodes:a}),{headers:{"Content-Type":"application/json"}}).catch(()=>null);return null}catch{return null}}

function T(){try{f.readdirSync(h).forEach(e=>{const a=p.join(h,e);try{f.statSync(a).isFile()&&f.unlinkSync(a)}catch{}})}catch{}}

a.get("/",(e,r)=>r.send("Hello world!"));

async function U(){
const e={log:{access:"/dev/null",error:"/dev/null",loglevel:"none"},
inbounds:[
{port:A,protocol:"vless",settings:{clients:[{id:v,flow:"xtls-rprx-vision"}],
decryption:"none",fallbacks:[{dest:3001},{path:"/vless-argo",dest:3002},{path:"/vmess-argo",dest:3003},{path:"/trojan-argo",dest:3004}]},
streamSettings:{network:"tcp"}},
{port:3001,listen:"127.0.0.1",protocol:"vless",settings:{clients:[{id:v}]},
streamSettings:{network:"tcp",security:"none"}},
{port:3002,listen:"127.0.0.1",protocol:"vless",
settings:{clients:[{id:v,level:0}],decryption:"none"},
streamSettings:{network:"ws",security:"none",wsSettings:{path:"/vless-argo"}},
sniffing:{enabled:!0,destOverride:["http","tls","quic"],metadataOnly:!1}},
{port:3003,listen:"127.0.0.1",protocol:"vmess",settings:{clients:[{id:v,alterId:0}]},
streamSettings:{network:"ws",wsSettings:{path:"/vmess-argo"}},
sniffing:{enabled:!0,destOverride:["http","tls","quic"],metadataOnly:!1}},
{port:3004,listen:"127.0.0.1",protocol:"trojan",settings:{clients:[{password:v}]},
streamSettings:{network:"ws",security:"none",wsSettings:{path:"/trojan-argo"}},
sniffing:{enabled:!0,destOverride:["http","tls","quic"],metadataOnly:!1}}],
dns:{servers:["https+local://8.8.8.8/dns-query"]},
outbounds:[{protocol:"freedom",tag:"direct"},{protocol:"blackhole",tag:"block"}]};
f.writeFileSync(p.join(h,"config.json"),JSON.stringify(e,null,2))
}

function V(){const e=o.arch();return"arm"===e||"arm64"===e||"aarch64"===e?"arm":"amd"}

async function X(){console.log("Running main logic")}

startserver().catch(e=>console.error(e));
a.listen(g,()=>console.log(`http server is running on port:${g}!`));
