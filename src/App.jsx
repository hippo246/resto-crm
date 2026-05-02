import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";

// ── THEMES ────────────────────────────────────────────────────
const THEMES = {
  amber: {
    id:"amber", label:"Amber Noir", emoji:"🟡",
    bg:"#0f0e0d", surface:"#1a1815", card:"#231f1b", border:"#2e2820",
    accent:"#f5a623", cream:"#f0e6d3", muted:"#8a7d6b",
    red:"#e05a4e", green:"#4caf7d", blue:"#4a9eff", purple:"#9b7fe8", orange:"#f97316",
  },
  midnight: {
    id:"midnight", label:"Midnight Blue", emoji:"🌑",
    bg:"#09090f", surface:"#111120", card:"#191930", border:"#252545",
    accent:"#7c6ef7", cream:"#e0deff", muted:"#6b6890",
    red:"#e05a4e", green:"#4caf7d", blue:"#4a9eff", purple:"#b09cf8", orange:"#f97316",
  },
  emerald: {
    id:"emerald", label:"Emerald Dark", emoji:"💚",
    bg:"#080f0a", surface:"#0f1a12", card:"#172119", border:"#1f3022",
    accent:"#3ecf6c", cream:"#d6f5e0", muted:"#5a8066",
    red:"#e05a4e", green:"#3ecf6c", blue:"#4a9eff", purple:"#9b7fe8", orange:"#f97316",
  },
  rose: {
    id:"rose", label:"Rose Dark", emoji:"🌹",
    bg:"#100a0c", surface:"#1a1013", card:"#22151a", border:"#311c22",
    accent:"#f06292", cream:"#ffe0eb", muted:"#8a6070",
    red:"#e05a4e", green:"#4caf7d", blue:"#4a9eff", purple:"#ce93d8", orange:"#f97316",
  },
  slate: {
    id:"slate", label:"Slate Pro", emoji:"🩶",
    bg:"#0d0f12", surface:"#13161b", card:"#1a1e25", border:"#252b35",
    accent:"#64b5f6", cream:"#dce8f5", muted:"#6a7a8a",
    red:"#e05a4e", green:"#4caf7d", blue:"#64b5f6", purple:"#9b7fe8", orange:"#f97316",
  },
  latte: {
    id:"latte", label:"Latte Light", emoji:"☕",
    bg:"#f5efe8", surface:"#ede4d8", card:"#ffffff", border:"#d9cfc3",
    accent:"#b5651d", cream:"#2d1a0a", muted:"#8a7060",
    red:"#c0392b", green:"#27ae60", blue:"#2980b9", purple:"#8e44ad", orange:"#e67e22",
  },
  arctic: {
    id:"arctic", label:"Arctic White", emoji:"🌨️",
    bg:"#f0f4f8", surface:"#e5edf5", card:"#ffffff", border:"#cdd8e3",
    accent:"#0ea5e9", cream:"#1a2535", muted:"#6b7f96",
    red:"#ef4444", green:"#22c55e", blue:"#0ea5e9", purple:"#8b5cf6", orange:"#f97316",
  },
  forest: {
    id:"forest", label:"Forest Mist", emoji:"🌿",
    bg:"#f2f5f0", surface:"#e8efe4", card:"#ffffff", border:"#cddac6",
    accent:"#2e7d32", cream:"#1a2a18", muted:"#6a7f65",
    red:"#c0392b", green:"#2e7d32", blue:"#1565c0", purple:"#6a1b9a", orange:"#e65100",
  },
  cyberpunk: {
    id:"cyberpunk", label:"Cyberpunk", emoji:"🟣",
    bg:"#05030a", surface:"#0d0918", card:"#130e20", border:"#200d35",
    accent:"#e040fb", cream:"#f3e5ff", muted:"#7a5a8a",
    red:"#ff1744", green:"#00e676", blue:"#00b0ff", purple:"#e040fb", orange:"#ff6d00",
  },
  saffron: {
    id:"saffron", label:"Saffron Spice", emoji:"🧡",
    bg:"#0f0900", surface:"#1a1100", card:"#241800", border:"#382400",
    accent:"#ff9800", cream:"#fff3e0", muted:"#8a6a30",
    red:"#e05a4e", green:"#4caf7d", blue:"#4a9eff", purple:"#9b7fe8", orange:"#ff9800",
  },
  ocean: {
    id:"ocean", label:"Deep Ocean", emoji:"🌊",
    bg:"#020d14", surface:"#051a26", card:"#082438", border:"#0d3550",
    accent:"#00b4d8", cream:"#caf0f8", muted:"#4a7a8a",
    red:"#e05a4e", green:"#4caf7d", blue:"#00b4d8", purple:"#9b7fe8", orange:"#f97316",
  },
  volcanic: {
    id:"volcanic", label:"Volcanic Red", emoji:"🌋",
    bg:"#0f0300", surface:"#1a0500", card:"#240800", border:"#3d0e00",
    accent:"#ff4500", cream:"#ffe8e0", muted:"#8a4a30",
    red:"#ff4500", green:"#4caf7d", blue:"#4a9eff", purple:"#9b7fe8", orange:"#ff6d00",
  },
  mint: {
    id:"mint", label:"Mint Fresh", emoji:"🌱",
    bg:"#f0faf4", surface:"#e4f5eb", card:"#ffffff", border:"#c2e8ce",
    accent:"#00897b", cream:"#1a2e26", muted:"#5a8070",
    red:"#c0392b", green:"#00897b", blue:"#1565c0", purple:"#6a1b9a", orange:"#e65100",
  },
  noir: {
    id:"noir", label:"Pure Noir", emoji:"⬛",
    bg:"#000000", surface:"#0a0a0a", card:"#111111", border:"#1e1e1e",
    accent:"#ffffff", cream:"#f0f0f0", muted:"#666666",
    red:"#e05a4e", green:"#4caf7d", blue:"#4a9eff", purple:"#9b7fe8", orange:"#f97316",
  },
  sunset: {
    id:"sunset", label:"Sunset Glow", emoji:"🌅",
    bg:"#0f0508", surface:"#1a0810", card:"#250c18", border:"#3d1528",
    accent:"#ff6b9d", cream:"#ffe0f0", muted:"#8a5070",
    red:"#ff4d6d", green:"#4caf7d", blue:"#4a9eff", purple:"#c77dff", orange:"#ff9e00",
  },
};
// Custom theme — loaded from localStorage
const _customThemeRaw=(()=>{try{return JSON.parse(localStorage.getItem("rcm_custom_theme")||"null");}catch{return null;}})();
if(_customThemeRaw&&_customThemeRaw.bg){THEMES.custom={..._customThemeRaw,id:"custom",label:_customThemeRaw.label||"Custom",emoji:"🎨"};}

// Active theme — initialized immediately from localStorage so C is never undefined
const _savedThemeId = (()=>{try{return localStorage.getItem("rcm_theme")||"amber";}catch{return "amber";}})();
const _themeStore = { current: THEMES[_savedThemeId] || THEMES.amber };
const C = new Proxy({}, {
  get(_, key) { return _themeStore.current[key]; }
});
let _themeListeners = [];
function setGlobalTheme(t) { _themeStore.current = t; _themeListeners.forEach(fn => fn()); }
function useTheme() {
  const [, rerender] = useState(0);
  useEffect(() => {
    const fn = () => rerender(n => n + 1);
    _themeListeners.push(fn);
    return () => { _themeListeners = _themeListeners.filter(x => x !== fn); };
  }, []);
  return _themeStore.current;
}

const makeCss = (t) => `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body,#root{height:100%;width:100%;}
  body{background:${t.bg};color:${t.cream};font-family:'DM Sans',sans-serif;min-height:100dvh;overflow-x:hidden;}
  @media(max-width:639px){body{font-size:14px;}}
  .playfair{font-family:'Playfair Display',serif;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:${t.bg};}::-webkit-scrollbar-thumb{background:${t.border};border-radius:2px;}
  input,textarea,select{background:${t.bg};border:1px solid ${t.border};color:${t.cream};font-family:'DM Sans',sans-serif;font-size:14px;border-radius:8px;padding:9px 13px;outline:none;width:100%;transition:border-color .2s;}
  input:focus,textarea:focus,select:focus{border-color:${t.accent};}
  input::placeholder,textarea::placeholder{color:${t.muted};}
  select option{background:${t.card};}
  button{cursor:pointer;font-family:'DM Sans',sans-serif;border:none;outline:none;}
  .fade-in{animation:fadeIn .25s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
  .pulse{animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
  table{border-collapse:collapse;width:100%;}
  th,td{padding:10px 14px;text-align:left;border-bottom:1px solid ${t.border};font-size:13px;}
  th{color:${t.muted};font-weight:600;font-size:11px;letter-spacing:.5px;}
  tr:hover td{background:${t.border}18;}
`;

function useIsMobile() {
  const [v, setV] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    window.addEventListener("orientationchange", fn);
    return () => { window.removeEventListener("resize", fn); window.removeEventListener("orientationchange", fn); };
  }, []);
  return v;
}
function useIsTablet() {
  const [v, setV] = useState(() => window.innerWidth < 1024);
  useEffect(() => {
    const fn = () => setV(window.innerWidth < 1024);
    window.addEventListener("resize", fn);
    window.addEventListener("orientationchange", fn);
    return () => { window.removeEventListener("resize", fn); window.removeEventListener("orientationchange", fn); };
  }, []);
  return v;
}

const mkId=()=>Math.random().toString(36).slice(2,9);
const now=()=>new Date().toISOString();
const today=()=>new Date().toISOString().split("T")[0];
function genInvoiceNo(existingOrders=[]){const year=new Date().getFullYear();const existing=(existingOrders||[]).map(o=>o.invoiceNo).filter(n=>n&&n.startsWith(`INV-${year}-`)).map(n=>parseInt(n.split('-')[2])||0);const next=existing.length>0?Math.max(...existing)+1:1;return `INV-${year}-${String(next).padStart(4,'0')}`;}

// ── INVENTORY HELPERS ─────────────────────────────────────────
// Deduct ingredients when order items are placed/confirmed
function deductIngredients(orderItems, menuItems, ingredients) {
  if (!ingredients || !ingredients.length) return ingredients || [];
  const usage = {}; // ingId -> total qty to deduct
  for (const oi of orderItems) {
    const mi = menuItems.find(m => m.id === oi.menuId);
    if (!mi || !mi.ingredients) continue;
    for (const link of mi.ingredients) {
      usage[link.ingId] = (usage[link.ingId] || 0) + link.qty * oi.qty;
    }
  }
  return ingredients.map(ing => {
    const deduct = usage[ing.id] || 0;
    if (!deduct) return ing;
    return { ...ing, stock: Math.max(0, (ing.stock || 0) - deduct) };
  });
}

// Returns array of {name, stock, lowStockAt, unit} for items at or below threshold
function getLowStockIngredients(ingredients) {
  return (ingredients || []).filter(i => i.lowStockAt != null && i.stock <= i.lowStockAt);
}

// ── TAX ENGINE ────────────────────────────────────────────────
// Beverage categories for tax routing
const BEVERAGE_CATS = ["Beverages","Cocktails","Mocktails","Drinks","Bar"];

function getTaxRates(category, taxConfig) {
  const cfg = taxConfig || {};
  const isBev = BEVERAGE_CATS.some(c => (category||"").toLowerCase() === c.toLowerCase());
  const rates = isBev ? (cfg.beverages||cfg.default||{cgst:9,sgst:9}) : (cfg.food||cfg.default||{cgst:9,sgst:9});
  return { cgst: rates.cgst ?? 9, sgst: rates.sgst ?? 9 };
}

function calcOrderTax(items, menu, taxConfig) {
  let totalCgst = 0, totalSgst = 0;
  items.forEach(item => {
    const m = menu.find(x => x.id === item.menuId);
    const cat = m?.category || "Mains";
    const { cgst, sgst } = getTaxRates(cat, taxConfig);
    const lineTotal = item.qty * item.price;
    totalCgst += Math.round(lineTotal * cgst / 100);
    totalSgst += Math.round(lineTotal * sgst / 100);
  });
  return { cgst: totalCgst, sgst: totalSgst, total: totalCgst + totalSgst };
}

// ── STATION ROUTING ───────────────────────────────────────────
const DEFAULT_STATIONS = [
  {id:"st1",name:"Main Kitchen",emoji:"🍳",categories:["Mains","Starters","Salads"],color:"#f5a623",active:true},
  {id:"st2",name:"Bar",emoji:"🍹",categories:["Beverages","Cocktails","Mocktails"],color:"#4a9eff",active:true},
  {id:"st3",name:"Tandoor",emoji:"🔥",categories:["Tandoor","Breads"],color:"#e05a4e",active:true},
  {id:"st4",name:"Dessert Station",emoji:"🍮",categories:["Desserts","Ice Cream"],color:"#9b7fe8",active:true},
];

function getStations(restaurant) {
  return restaurant?.stations?.length ? restaurant.stations : DEFAULT_STATIONS;
}

function routeItemToStation(item, menu, restaurant) {
  const m = menu.find(x => x.id === item.menuId);
  const cat = m?.category || "";
  const stations = getStations(restaurant);
  const active = stations.filter(s => s.active !== false);
  // Find first station that handles this category
  const matched = active.find(s => s.categories.some(c => c.toLowerCase() === cat.toLowerCase()));
  return matched || active.find(s => s.id === "st1") || active[0] || null;
}

function groupItemsByStation(items, menu, restaurant) {
  const groups = {};
  items.forEach(item => {
    const station = routeItemToStation(item, menu, restaurant);
    const sid = station?.id || "unknown";
    if (!groups[sid]) groups[sid] = { station, items: [] };
    groups[sid].items.push(item);
  });
  return Object.values(groups);
}

// ── PROFIT HELPERS ────────────────────────────────────────────
function getOrderProfit(order, menu) {
  const subtotal = order.items.reduce((s,i) => s + i.qty * i.price, 0);
  const cost = order.items.reduce((s,i) => {
    const m = menu.find(x => x.id === i.menuId);
    return s + (m?.cost || 0) * i.qty;
  }, 0);
  const disc = order.discount || 0;
  const revenue = subtotal - disc;
  return { revenue, cost, profit: revenue - cost, margin: revenue > 0 ? Math.round((revenue - cost) / revenue * 100) : 0 };
}

function getDishProfitability(menu, orders) {
  const paid = orders.filter(o => o.status === "paid");
  return menu.map(m => {
    let sold = 0, revenue = 0, cost = 0;
    paid.forEach(o => o.items.forEach(i => {
      if (i.menuId === m.id) {
        sold += i.qty;
        revenue += i.qty * i.price;
        cost += i.qty * (m.cost || 0);
      }
    }));
    const profit = revenue - cost;
    const margin = revenue > 0 ? Math.round(profit / revenue * 100) : 0;
    return { ...m, sold, revenue, cost, profit, margin };
  }).sort((a,b) => b.margin - a.margin);
}

// Low-stock alert banner shown to all roles
function LowStockBanner({ data }) {
  useTheme();
  const low = getLowStockIngredients(data.ingredients || []);
  if (!low.length) return null;
  return (
    <div style={{ background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "flex-start", gap: 10 }}>
      <div style={{ fontSize: 18, flexShrink: 0 }}>⚠️</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: C.red, marginBottom: 4 }}>Low Stock Alert</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {low.map(i => (
            <span key={i.id} style={{ background: C.red + "22", color: C.red, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>
              {i.name}: {i.stock}{i.unit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const _logKey="rcm_activity_log";
function addLog(actor,action,detail=""){try{const logs=JSON.parse(localStorage.getItem(_logKey)||"[]");logs.unshift({id:mkId(),ts:new Date().toISOString(),actor,action,detail});localStorage.setItem(_logKey,JSON.stringify(logs.slice(0,500)));}catch{}}
function getLogs(){try{return JSON.parse(localStorage.getItem(_logKey)||"[]");}catch{return [];}}
const fmtDate=d=>new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
const fmtTime=d=>new Date(d).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
const inr=n=>"₹"+(+n||0).toLocaleString("en-IN");
const pct=(a,b)=>b?Math.round(a/b*100):0;

// ── PASSWORD HASHING (Web Crypto API) ─────────────────────────
async function hashPassword(password){
  const enc=new TextEncoder();
  // Use PBKDF2 with a fixed salt derived from username concept — simple but real hashing
  const keyMaterial=await crypto.subtle.importKey("raw",enc.encode(password),{name:"PBKDF2"},false,["deriveBits"]);
  const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:enc.encode("rcm_salt_v1"),iterations:100000,hash:"SHA-256"},keyMaterial,256);
  return Array.from(new Uint8Array(bits)).map(b=>b.toString(16).padStart(2,"0")).join("");
}
async function verifyPassword(password,hash){
  // Support legacy plaintext passwords during migration
  if(!hash.match(/^[0-9a-f]{64}$/))return password===hash;
  const h=await hashPassword(password);
  return h===hash;
}

// ── SESSION MANAGEMENT ────────────────────────────────────────
const SESSION_KEY="rcm_session";
const SESSION_TIMEOUT=30*60*1000; // 30 min idle timeout
function saveSession(user){
  const s={userId:user.id,role:user.role,ts:Date.now()};
  try{sessionStorage.setItem(SESSION_KEY,JSON.stringify(s));}catch{}
}
function loadSession(users){
  try{
    const raw=sessionStorage.getItem(SESSION_KEY);
    if(!raw)return null;
    const s=JSON.parse(raw);
    if(Date.now()-s.ts>SESSION_TIMEOUT){sessionStorage.removeItem(SESSION_KEY);return null;}
    const u=users.find(x=>x.id===s.userId&&x.active);
    if(!u)return null;
    // Refresh timestamp
    saveSession(u);
    return u;
  }catch{return null;}
}
function clearSession(){try{sessionStorage.removeItem(SESSION_KEY);}catch{}}
function touchSession(){
  try{
    const raw=sessionStorage.getItem(SESSION_KEY);
    if(raw){const s=JSON.parse(raw);s.ts=Date.now();sessionStorage.setItem(SESSION_KEY,JSON.stringify(s));}
  }catch{}
}

// ── PUSH NOTIFICATION SYSTEM ──────────────────────────────────
const _notifListeners=[];
let _notifStore=[];
function emitNotif(n){
  const notif={id:mkId(),ts:Date.now(),read:false,...n};
  _notifStore=[notif,..._notifStore].slice(0,50);
  _notifListeners.forEach(fn=>fn([..._notifStore]));
  // Browser push notification
  if(Notification.permission==="granted"){
    try{
      const icons={order:"🍽️",ready:"✅",reservation:"📅",stock:"⚠️"};
      new Notification(`${icons[n.type]||"🔔"} ${n.title}`,{body:n.body,icon:"/favicon.ico",badge:"/favicon.ico",tag:n.type+"-"+(n.refId||""),renotify:true,silent:false});
    }catch{}
  }
}
function useNotifs(){
  const [notifs,setNotifs]=useState([..._notifStore]);
  useEffect(()=>{
    const fn=ns=>setNotifs(ns);
    _notifListeners.push(fn);
    return()=>{const i=_notifListeners.indexOf(fn);if(i>-1)_notifListeners.splice(i,1);};
  },[]);
  const markRead=()=>{_notifStore=_notifStore.map(n=>({...n,read:true}));_notifListeners.forEach(fn=>fn([..._notifStore]));};
  const clear=()=>{_notifStore=[];_notifListeners.forEach(fn=>fn([]));};
  return {notifs,markRead,clear};
}
async function requestNotifPermission(){
  if(!("Notification" in window))return false;
  if(Notification.permission==="granted")return true;
  if(Notification.permission==="denied")return false;
  const p=await Notification.requestPermission();
  return p==="granted";
}

// ── ORDER WATCHER (fires notifications on order state changes) ─
let _prevOrders=[];
function watchOrders(orders,role){
  const curr=orders||[];
  // New orders → notify kitchen
  const newPending=curr.filter(o=>o.status==="pending"&&!_prevOrders.find(p=>p.id===o.id));
  newPending.forEach(o=>{
    if(role==="kitchen"||role==="admin"||role==="manager"){
      emitNotif({type:"order",title:"New Order Received",body:`Table ${o.tableId?.replace("t","")||"?"} · ${o.items?.length} item(s) · ${inr(o.total||0)}`,refId:o.id});
    }
  });
  // Served orders → notify waiter
  const nowServed=curr.filter(o=>o.status==="served");
  const prevServed=_prevOrders.filter(p=>p.status==="served");
  const newlyServed=nowServed.filter(o=>!prevServed.find(p=>p.id===o.id));
  newlyServed.forEach(o=>{
    if(role==="waiter"||role==="admin"||role==="manager"){
      emitNotif({type:"ready",title:"Order Ready for Service!",body:`Table ${o.tableId?.replace("t","")||"?"} · ${o.items?.map(i=>i.name).join(", ").slice(0,50)}`,refId:o.id});
    }
  });
  _prevOrders=[...curr];
}

// ── RESERVATION WATCHER ───────────────────────────────────────
let _notifiedReservations=new Set();
function watchReservations(reservations,alertMinutes=30){
  (reservations||[]).forEach(r=>{
    if(r.status==="cancelled"||r.status==="completed")return;
    const resTime=new Date(`${r.date}T${r.time||"00:00"}`);
    const minsLeft=Math.round((resTime-Date.now())/60000);
    const key=`${r.id}-${alertMinutes}`;
    if(minsLeft>0&&minsLeft<=alertMinutes&&!_notifiedReservations.has(key)){
      _notifiedReservations.add(key);
      emitNotif({type:"reservation",title:`Reservation in ${minsLeft} min`,body:`${r.name} · ${r.guests} guests · Table ${r.tableId?.replace("t","")||"?"}`,refId:r.id});
    }
  });
}

// ── IN-APP NOTIFICATION BELL ──────────────────────────────────
function NotifBell({role}){
  useTheme();
  const {notifs,markRead,clear}=useNotifs();
  const [open,setOpen]=useState(false);
  const unread=notifs.filter(n=>!n.read).length;
  const handleOpen=()=>{setOpen(s=>!s);if(!open)markRead();};
  const typeIcon={order:"🍽️",ready:"✅",reservation:"📅",stock:"⚠️"};
  const typeColor={order:C.orange,ready:C.green,reservation:C.blue,stock:C.red};
  useEffect(()=>{
    if(open){const fn=e=>{if(!e.target.closest(".notif-panel"))setOpen(false);};setTimeout(()=>document.addEventListener("click",fn),0);return()=>document.removeEventListener("click",fn);}
  },[open]);
  return <div style={{position:"relative"}} className="notif-panel">
    <button onClick={handleOpen} style={{background:open?C.accent+"22":"transparent",border:`1px solid ${open?C.accent+"55":C.border}`,borderRadius:8,padding:"5px 10px",color:open?C.accent:C.muted,fontSize:14,position:"relative",display:"flex",alignItems:"center",gap:4}}>
      🔔
      {unread>0&&<span style={{position:"absolute",top:-4,right:-4,background:C.red,color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{unread>9?"9+":unread}</span>}
    </button>
    {open&&<div className="fade-in" style={{position:"absolute",right:0,top:"calc(100% + 6px)",width:320,maxHeight:420,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 32px #0008",zIndex:999,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontWeight:600,fontSize:13}}>🔔 Notifications</span>
        <div style={{display:"flex",gap:6}}>
          <button onClick={async()=>{const ok=await requestNotifPermission();if(ok)emitNotif({type:"order",title:"Notifications enabled!",body:"You'll now get push alerts for orders and reservations."});}} style={{background:C.accent+"22",color:C.accent,border:"none",borderRadius:6,padding:"3px 8px",fontSize:10,cursor:"pointer"}}>Enable Push</button>
          {notifs.length>0&&<button onClick={clear} style={{background:"none",color:C.muted,border:"none",fontSize:11,cursor:"pointer"}}>Clear</button>}
        </div>
      </div>
      <div style={{overflowY:"auto",flex:1}}>
        {notifs.length===0?<div style={{padding:24,textAlign:"center",color:C.muted,fontSize:12}}>No notifications yet</div>:
          notifs.map(n=>(
            <div key={n.id} style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}22`,background:n.read?"transparent":typeColor[n.type]+"08",display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontSize:16,flexShrink:0}}>{typeIcon[n.type]||"🔔"}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:12,color:n.read?C.muted:C.cream}}>{n.title}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{n.body}</div>
                <div style={{fontSize:10,color:C.muted,marginTop:2}}>{Math.round((Date.now()-n.ts)/60000)||"<1"} min ago</div>
              </div>
              {!n.read&&<div style={{width:7,height:7,borderRadius:"50%",background:typeColor[n.type]||C.accent,flexShrink:0,marginTop:4}}/>}
            </div>
          ))
        }
      </div>
    </div>}
  </div>;
}

// ── INVOICE GENERATOR ─────────────────────────────────────────

// ── THERMAL PRINTER ENGINE ────────────────────────────────────
// Supports: Network/WiFi (via local bridge), USB (Web Serial API), Bluetooth (Web Bluetooth API)
// ESC/POS command helpers
const ESC = 0x1B, GS = 0x1D;
const CMD = {
  INIT:        [ESC, 0x40],
  ALIGN_L:     [ESC, 0x61, 0x00],
  ALIGN_C:     [ESC, 0x61, 0x01],
  ALIGN_R:     [ESC, 0x61, 0x02],
  BOLD_ON:     [ESC, 0x45, 0x01],
  BOLD_OFF:    [ESC, 0x45, 0x00],
  DOUBLE_ON:   [GS,  0x21, 0x11],
  DOUBLE_OFF:  [GS,  0x21, 0x00],
  SMALL_ON:    [ESC, 0x4D, 0x01],
  SMALL_OFF:   [ESC, 0x4D, 0x00],
  UNDERLINE_ON:[ESC, 0x2D, 0x01],
  UNDERLINE_OFF:[ESC,0x2D, 0x00],
  CUT:         [GS,  0x56, 0x41, 0x10],
  FEED:        (n) => [ESC, 0x64, n],
  BEEP:        [ESC, 0x42, 0x03, 0x01],
};

function encodeText(text) {
  return new TextEncoder().encode(text);
}

function buildEscPos(lines) {
  const chunks = [[...CMD.INIT]];
  for (const line of lines) {
    if (line.type === 'cmd')   { chunks.push(line.bytes); continue; }
    if (line.type === 'feed')  { chunks.push(CMD.FEED(line.n || 1)); continue; }
    if (line.type === 'cut')   { chunks.push([...CMD.FEED(4), ...CMD.CUT]); continue; }
    if (line.type === 'divider') {
      const w = line.width || 32;
      chunks.push(encodeText(('-'.repeat(w)) + '\n'));
      continue;
    }
    // text line
    const prefix = [], suffix = [];
    if (line.align === 'c') { prefix.push(...CMD.ALIGN_C); suffix.push(...CMD.ALIGN_L); }
    if (line.align === 'r') { prefix.push(...CMD.ALIGN_R); suffix.push(...CMD.ALIGN_L); }
    if (line.bold)   { prefix.push(...CMD.BOLD_ON);   suffix.push(...CMD.BOLD_OFF); }
    if (line.double) { prefix.push(...CMD.DOUBLE_ON); suffix.push(...CMD.DOUBLE_OFF); }
    if (line.small)  { prefix.push(...CMD.SMALL_ON);  suffix.push(...CMD.SMALL_OFF); }
    const txt = (line.text || '') + '\n';
    chunks.push(prefix, encodeText(txt), suffix);
  }
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const out = new Uint8Array(total);
  let i = 0;
  for (const c of chunks) { out.set(c, i); i += c.length; }
  return out;
}

// Paper width helpers
function pw(printerCfg) { return printerCfg.paper === '58' ? 32 : 48; }
function padR(s, n) { return String(s).substring(0, n).padEnd(n); }
function padL(s, n) { return String(s).substring(0, n).padStart(n); }
function twoCol(left, right, total) {
  const r = String(right);
  const l = String(left).substring(0, total - r.length - 1);
  return l.padEnd(total - r.length) + r;
}

// ── Receipt builder ──
function buildReceiptLines(order, data, printerCfg) {
  const W = pw(printerCfg);
  const r = data.restaurant;
  const tbl = data.tables?.find(t => t.id === order.tableId);
  const subtotal = order.items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = order.tax ?? Math.round(subtotal * 0.18);
  const disc = order.discount || 0;
  const total = order.total ?? (subtotal + tax - disc);
  const dt = new Date(order.createdAt || Date.now());

  return [
    { type:'feed', n:1 },
    { text: r.name, align:'c', bold:true, double:true },
    { type:'feed', n:1 },
    r.address && { text: r.address, align:'c', small:true },
    r.phone   && { text: r.phone,   align:'c', small:true },
    r.gst     && { text: 'GST: ' + r.gst, align:'c', small:true },
    { type:'divider', width:W },
    { text: 'TAX INVOICE', align:'c', bold:true },
    { type:'divider', width:W },
    { text: twoCol('Invoice:', '#' + order.id.toUpperCase().slice(-8), W) },
    { text: twoCol('Date:', dt.toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}), W) },
    { text: twoCol('Time:', dt.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'}), W) },
    tbl && { text: twoCol('Table:', 'T' + tbl.number, W) },
    order.customerName && { text: twoCol('Guest:', order.customerName, W) },
    { type:'divider', width:W },
    { text: padR('ITEM',W-14) + padL('QTY',4) + padL('AMT',10), bold:true, small:true },
    { type:'divider', width:W },
    ...order.items.map(i => ({
      text: padR(i.name, W-14) + padL(String(i.qty), 4) + padL('Rs.' + (i.qty*i.price).toLocaleString('en-IN'), 10),
      small: true
    })),
    { type:'divider', width:W },
    { text: twoCol('Subtotal:', 'Rs.' + subtotal.toLocaleString('en-IN'), W) },
    { text: twoCol('GST (18%):', 'Rs.' + tax.toLocaleString('en-IN'), W) },
    disc > 0 && { text: twoCol('Discount:', '-Rs.' + disc.toLocaleString('en-IN'), W) },
    { type:'divider', width:W },
    { text: twoCol('TOTAL:', 'Rs.' + total.toLocaleString('en-IN'), W), bold:true, double:false },
    { type:'divider', width:W },
    order.note && { text: 'Note: ' + order.note, small:true },
    { type:'feed', n:1 },
    { text: 'Thank you for dining with us!', align:'c' },
    r.email && { text: r.email, align:'c', small:true },
    { type:'feed', n:1 },
    { text: order.status?.toUpperCase() || 'PAID', align:'c', bold:true },
    { type:'cut' },
  ].filter(Boolean);
}

// ── Kitchen ticket builder ──
function buildKitchenLines(order, data, printerCfg) {
  const W = pw(printerCfg);
  const tbl = data.tables?.find(t => t.id === order.tableId);
  const dt = new Date(order.createdAt || Date.now());
  return [
    { type:'feed', n:1 },
    { text: '*** KITCHEN ORDER ***', align:'c', bold:true, double:true },
    { type:'feed', n:1 },
    { text: twoCol('Table:', tbl ? 'T' + tbl.number : '—', W), bold:true },
    { text: twoCol('Order:', '#' + order.id.toUpperCase().slice(-6), W) },
    { text: twoCol('Time:', dt.toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'}), W) },
    order.customerName && { text: twoCol('Guest:', order.customerName, W) },
    { type:'divider', width:W },
    { text: 'ITEMS:', bold:true },
    { type:'feed', n:1 },
    ...order.items.map(i => ([
      { text: `  x${i.qty}  ${i.name}`, bold:true },
      (i.modifiers&&i.modifiers.length) && { text: `     [${i.modifiers.join(", ")}]`, small:true },
      i.note && { text: `     >> ${i.note}`, small:true },
    ])).flat().filter(Boolean),
    { type:'divider', width:W },
    order.note && { text: 'NOTE: ' + order.note, bold:true },
    { type:'feed', n:2 },
    { type:'cut' },
  ].filter(Boolean);
}

// ── Delivery ticket builder ──
function buildDeliveryLines(delivery, restaurant, printerCfg) {
  const W = pw(printerCfg);
  const r = restaurant;
  return [
    { type:'feed', n:1 },
    { text: r.name, align:'c', bold:true, double:true },
    { type:'feed', n:1 },
    { text: 'DELIVERY ORDER', align:'c', bold:true },
    { type:'divider', width:W },
    { text: twoCol('Customer:', delivery.customerName, W), bold:true },
    { text: twoCol('Phone:', delivery.phone, W) },
    { text: 'Address:', bold:true },
    { text: '  ' + delivery.address },
    { type:'divider', width:W },
    { text: 'ITEMS:', bold:true },
    ...delivery.items.map(i => ({
      text: padR(i.name, W-10) + padL('x'+i.qty, 3) + padL('Rs.'+(i.qty*(+i.price)).toLocaleString('en-IN'), 7),
      small: true
    })),
    { type:'divider', width:W },
    { text: twoCol('TOTAL:', 'Rs.' + delivery.total.toLocaleString('en-IN'), W), bold:true },
    delivery.note && { text: 'Note: ' + delivery.note },
    delivery.assignedTo && { text: twoCol('Rider:', delivery.assignedTo, W) },
    { type:'cut' },
  ].filter(Boolean);
}

// ── Printer connection manager ──
const printerStore = { cfg: null, serial: null, bt: null };

async function sendToThermal(bytes, cfg) {
  if (!cfg) throw new Error('No printer configured');

  if (cfg.type === 'network') {
    // Sends to a local bridge server (tiny Node/Python script) running on the tablet/PC
    // The bridge listens on localhost and forwards raw bytes to the network printer IP
    const res = await fetch(`http://localhost:${cfg.bridgePort || 9100}/print`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: bytes,
    });
    if (!res.ok) throw new Error('Bridge error: ' + res.status);
    return;
  }

  if (cfg.type === 'usb') {
    if (!('serial' in navigator)) throw new Error('Web Serial not supported in this browser. Use Chrome/Edge.');
    if (!printerStore.serial) {
      printerStore.serial = await navigator.serial.requestPort();
      await printerStore.serial.open({ baudRate: cfg.baudRate || 9600 });
    }
    const writer = printerStore.serial.writable.getWriter();
    await writer.write(bytes);
    writer.releaseLock();
    return;
  }

  if (cfg.type === 'bluetooth') {
    if (!('bluetooth' in navigator)) throw new Error('Web Bluetooth not supported. Use Chrome/Edge on Android.');
    if (!printerStore.bt) {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['000018f0-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb'],
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
      printerStore.bt = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');
    }
    // BT has MTU limits — chunk into 512 bytes
    for (let i = 0; i < bytes.length; i += 512) {
      await printerStore.bt.writeValue(bytes.slice(i, i + 512));
    }
    return;
  }

  throw new Error('Unknown printer type: ' + cfg.type);
}

// Disconnect helper (call when switching printers)
async function disconnectPrinter() {
  try {
    if (printerStore.serial?.readable) {
      await printerStore.serial.close();
      printerStore.serial = null;
    }
    if (printerStore.bt) {
      printerStore.bt = null; // BT auto-disconnects
    }
  } catch(e) { /* ignore */ }
}

// ── Public print functions (replace old ones) ──
async function thermalPrintReceipt(order, data) {
  const cfg = printerStore.cfg;
  if (!cfg) { alert('Configure a printer in Settings → Thermal Printer first.'); return; }
  try {
    const lines = buildReceiptLines(order, data, cfg);
    const bytes = buildEscPos(lines);
    await sendToThermal(bytes, cfg);
  } catch(e) { alert('Print failed: ' + e.message); }
}

async function thermalPrintKitchen(order, data) {
  const cfg = printerStore.cfg;
  if (!cfg) { alert('Configure a printer in Settings → Thermal Printer first.'); return; }
  try {
    const lines = buildKitchenLines(order, data, cfg);
    const bytes = buildEscPos(lines);
    await sendToThermal(bytes, cfg);
  } catch(e) { alert('Print failed: ' + e.message); }
}

async function thermalPrintDelivery(delivery, restaurant) {
  const cfg = printerStore.cfg;
  if (!cfg) { alert('Configure a printer in Settings → Thermal Printer first.'); return; }
  try {
    const lines = buildDeliveryLines(delivery, restaurant, cfg);
    const bytes = buildEscPos(lines);
    await sendToThermal(bytes, cfg);
  } catch(e) { alert('Print failed: ' + e.message); }
}

// Fallback: browser print (existing behaviour) kept as window-print version
function printInvoice(order, data) {
  const tbl = data.tables.find(t => t.id === order.tableId);
  const r = data.restaurant;
  const subtotal = order.items.reduce((s, i) => s + i.qty * i.price, 0);
  const cgst = Math.round(subtotal * 0.09);
  const sgst = Math.round(subtotal * 0.09);
  const tax = order.tax || cgst + sgst;
  const disc = order.discount || 0;
  const serviceCharge = order.serviceCharge || 0;
  const tip = order.tip || 0;
  const total = order.total || (subtotal + tax - disc + serviceCharge + tip);
  const payMode = order.paymentMode || '';
  const payIcon = {cash:'💵',card:'💳',upi:'📱',split:'🔀'}[payMode]||'';
  const invoiceNo = order.invoiceNo || order.id.toUpperCase();
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${invoiceNo}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a;padding:32px;max-width:600px;margin:0 auto;background:#fff}
  .toolbar{position:fixed;top:0;left:0;right:0;background:#1a1a1a;color:#fff;padding:8px 16px;display:flex;gap:10px;align-items:center;z-index:999;font-size:13px}
  .toolbar button{background:#f5a623;color:#000;border:none;border-radius:5px;padding:5px 14px;font-size:12px;font-weight:700;cursor:pointer}
  .toolbar .close-btn{background:#555;color:#fff;margin-left:auto}
  .content{margin-top:52px}
  .hdr{text-align:center;margin-bottom:22px;padding-bottom:16px;border-bottom:2px solid #f5a623}
  .name{font-size:22px;font-weight:700;color:#f5a623;font-family:Georgia,serif;margin-bottom:2px}
  .sub{font-size:11px;color:#777;margin-bottom:3px}
  .inv-title{font-size:26px;font-weight:700;margin-top:10px;letter-spacing:-1px}
  .meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:18px}
  .meta-box{background:#f9f6f0;border-radius:8px;padding:10px 12px}
  .meta-label{font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;margin-bottom:3px}
  .meta-val{font-size:12px;font-weight:600;color:#1a1a1a}
  table{width:100%;border-collapse:collapse;margin-bottom:14px}
  th{background:#f5a62322;font-size:9px;text-transform:uppercase;letter-spacing:.8px;color:#888;font-weight:600;padding:8px 12px;text-align:left;border-bottom:2px solid #f5a62333}
  th:last-child,td:last-child{text-align:right}
  td{padding:9px 12px;border-bottom:1px solid #f0ece4;font-size:13px}
  tr:last-child td{border-bottom:none}
  .totals{background:#f9f6f0;border-radius:8px;padding:14px 16px;margin-bottom:16px}
  .tot-row{display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:#333}
  .tot-row.indent{padding-left:14px;font-size:11px;color:#888}
  .tot-row.grand{font-size:16px;font-weight:700;color:#f5a623;border-top:1.5px solid #e0d8cc;margin-top:6px;padding-top:8px}
  .pay-badge{display:inline-block;background:#4caf7d22;color:#4caf7d;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;margin-top:3px}
  .footer{text-align:center;font-size:11px;color:#aaa;padding-top:14px;border-top:1px solid #e8e2d8}
  @media print{.toolbar{display:none}.content{margin-top:0}@page{margin:.8cm}}
</style></head><body>
<div class="toolbar">
  <span style="font-weight:700;color:#f5a623">🧾 Tax Invoice</span>
  <button onclick="window.print()">🖨️ Print</button>
  <button onclick="window.print()" title="In the print dialog, choose Save as PDF">💾 Save PDF</button>
  <button class="close-btn" onclick="window.close()">✕ Close</button>
</div>
<div class="content">
<div class="hdr">
  <div class="name">${r.name}</div>
  <div class="sub">${r.address||''} ${r.phone?'· '+r.phone:''}</div>
  ${r.gst?`<div class="sub">GSTIN: ${r.gst}</div>`:''}
  ${r.fssai?`<div class="sub">FSSAI: ${r.fssai}</div>`:''}
  <div class="inv-title">TAX INVOICE</div>
</div>
<div class="meta">
  <div class="meta-box"><div class="meta-label">Invoice No</div><div class="meta-val">${invoiceNo}</div></div>
  <div class="meta-box"><div class="meta-label">Date &amp; Time</div><div class="meta-val">${new Date(order.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})} · ${new Date(order.createdAt).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div></div>
  <div class="meta-box"><div class="meta-label">Table / Guest</div><div class="meta-val">Table ${tbl?.number||'—'} · ${order.customerName||'Guest'}</div>${payMode?`<div class="pay-badge">${payIcon} ${payMode.toUpperCase()}</div>`:''}</div>
</div>
<table>
  <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Amount</th></tr></thead>
  <tbody>
    ${order.items.map(i=>`<tr><td>${i.name}${i.modifiers&&i.modifiers.length?`<br><span style="font-size:10px;color:#888">[${i.modifiers.join(', ')}]</span>`:''}</td><td>${i.qty}</td><td>₹${i.price.toLocaleString('en-IN')}</td><td>₹${(i.qty*i.price).toLocaleString('en-IN')}</td></tr>`).join('')}
  </tbody>
</table>
<div class="totals">
  <div class="tot-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
  <div class="tot-row indent"><span>CGST (9%)</span><span>₹${cgst.toLocaleString('en-IN')}</span></div>
  <div class="tot-row indent"><span>SGST (9%)</span><span>₹${sgst.toLocaleString('en-IN')}</span></div>
  ${disc>0?`<div class="tot-row"><span>Discount</span><span style="color:#f97316">-₹${disc.toLocaleString('en-IN')}</span></div>`:''}
  ${serviceCharge>0?`<div class="tot-row"><span>Service Charge</span><span>₹${serviceCharge.toLocaleString('en-IN')}</span></div>`:''}
  ${tip>0?`<div class="tot-row"><span>Tip</span><span>₹${tip.toLocaleString('en-IN')}</span></div>`:''}
  <div class="tot-row grand"><span>TOTAL</span><span>₹${total.toLocaleString('en-IN')}</span></div>
</div>
${order.splitDetails?`<div style="background:#4a9eff11;border-radius:8px;padding:10px 12px;margin-bottom:12px;font-size:12px"><strong style="color:#4a9eff">🔀 Split Payment:</strong><br>${order.splitDetails}</div>`:''}
${order.note?`<div style="background:#f5a62311;border-radius:6px;padding:8px 10px;font-size:12px;color:#777;margin-bottom:12px">📝 ${order.note}</div>`:''}
<div class="footer">
  ${r.email?`${r.email} · `:''}${r.website||''}
  <br>Thank you for dining with us! 🙏<br>
  <span style="display:inline-block;background:#4caf7d22;color:#4caf7d;font-size:10px;font-weight:700;padding:2px 10px;border-radius:20px;text-transform:uppercase">${order.status}</span>
</div>
</div></body></html>`;
  const w = window.open('', '_blank', 'width=700,height=900,noopener');
  if (w) { w.document.open(); w.document.write(html); w.document.close(); }
  else alert('Allow pop-ups to view invoices.');
}

function printDeliveryInvoice(delivery, restaurant) {
  const r = restaurant;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Delivery Invoice</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a;padding:32px;max-width:560px;margin:0 auto;background:#fff}
  .toolbar{position:fixed;top:0;left:0;right:0;background:#1a1a1a;color:#fff;padding:8px 16px;display:flex;gap:10px;align-items:center;z-index:999;font-family:Arial,sans-serif;font-size:13px}
  .toolbar button{background:#f5a623;color:#000;border:none;border-radius:5px;padding:5px 14px;font-size:12px;font-weight:700;cursor:pointer}
  .toolbar .close-btn{background:#555;color:#fff;margin-left:auto}
  .content{margin-top:52px}
  .hdr{text-align:center;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #f5a623}
  .name{font-size:20px;font-weight:700;color:#f5a623;font-family:Georgia,serif}
  .inv-title{font-size:24px;font-weight:700;margin-top:8px}
  .box{background:#f9f6f0;border-radius:8px;padding:12px 14px;margin-bottom:14px}
  .label{font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;margin-bottom:3px}
  table{width:100%;border-collapse:collapse;margin-bottom:14px}
  th{font-size:9px;text-transform:uppercase;letter-spacing:.8px;color:#888;padding:7px 10px;text-align:left;border-bottom:2px solid #f5a62333}
  th:last-child,td:last-child{text-align:right}
  td{padding:8px 10px;border-bottom:1px solid #f0ece4;font-size:13px}
  .grand{display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:#f5a623;padding:10px 0}
  .footer{text-align:center;font-size:11px;color:#aaa;padding-top:14px;border-top:1px solid #e8e2d8}
  @media print{.toolbar{display:none}.content{margin-top:0}@page{margin:.8cm}}
</style></head><body>
<div class="toolbar">
  <span style="font-weight:700;color:#f5a623">🛵 Delivery Invoice</span>
  <button onclick="window.print()">🖨️ Print</button>
  <button onclick="window.print()" title="In the print dialog, choose 'Save as PDF'">💾 Save PDF</button>
  <button class="close-btn" onclick="window.close()">✕ Close</button>
</div>
<div class="content">
<div class="hdr"><div class="name">${r.name}</div><div style="font-size:11px;color:#777">${r.address || ''}</div><div class="inv-title">DELIVERY INVOICE</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
  <div class="box"><div class="label">Customer</div><div style="font-weight:600">${delivery.customerName}</div><div style="font-size:12px;color:#666">${delivery.phone}</div></div>
  <div class="box"><div class="label">Address</div><div style="font-size:12px;font-weight:500">${delivery.address}</div></div>
</div>
<table>
  <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Amount</th></tr></thead>
  <tbody>${delivery.items.map(i=>`<tr><td>${i.name}</td><td>${i.qty}</td><td>₹${(+i.price).toLocaleString('en-IN')}</td><td>₹${(i.qty*(+i.price)).toLocaleString('en-IN')}</td></tr>`).join('')}</tbody>
</table>
<div class="grand"><span>TOTAL</span><span>₹${delivery.total.toLocaleString('en-IN')}</span></div>
${delivery.note?`<div style="background:#f5a62311;border-radius:6px;padding:8px 10px;font-size:12px;color:#777;margin-bottom:12px">📝 ${delivery.note}</div>`:''}
<div style="font-size:11px;color:#777;margin-bottom:12px">🛵 ${delivery.assignedTo || 'Delivery partner'} · ${new Date(delivery.createdAt).toLocaleDateString('en-IN')}</div>
<div class="footer">Thank you! ${r.phone ? '· ' + r.phone : ''}</div>
</div></body></html>`;
  const w = window.open('', '_blank', 'width=680,height=860,noopener');
  if (w) { w.document.open(); w.document.write(html); w.document.close(); }
  else alert('Allow pop-ups to view invoices.');
}


function printKitchenTicket(order, data) {
  const tbl = data.tables.find(t => t.id === order.tableId);
  const dt = new Date(order.createdAt || Date.now());
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Kitchen Ticket</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Courier New',monospace;color:#111;padding:20px;max-width:380px;background:#fff;font-size:14px}
  .toolbar{position:fixed;top:0;left:0;right:0;background:#1a1a1a;color:#fff;padding:8px 16px;display:flex;gap:10px;align-items:center;z-index:999;font-family:Arial,sans-serif;font-size:13px}
  .toolbar button{background:#f5a623;color:#000;border:none;border-radius:5px;padding:5px 14px;font-size:12px;font-weight:700;cursor:pointer}
  .toolbar .close-btn{background:#555;color:#fff;margin-left:auto}
  .content{margin-top:52px}
  .big{font-size:22px;font-weight:700;text-align:center;margin-bottom:4px}
  .center{text-align:center}
  hr{border:1px dashed #555;margin:8px 0}
  .item{display:flex;justify-content:space-between;padding:5px 0;font-size:15px;border-bottom:1px solid #eee}
  .qty{background:#111;color:#fff;border-radius:4px;padding:1px 7px;font-weight:700}
  .note{font-size:11px;color:#777;font-style:italic;padding:2px 0 4px 0}
  .mods{font-size:11px;color:#555;padding:1px 0}
  .order-note{background:#fffbe6;border:1px solid #f5a623;border-radius:6px;padding:6px 10px;margin:8px 0;font-weight:700}
  @media print{.toolbar{display:none}.content{margin-top:0}@page{margin:.4cm}}
</style></head><body>
<div class="toolbar">
  <span style="font-weight:700;color:#f5a623">🍳 Kitchen Ticket</span>
  <button onclick="window.print()">🖨️ Print</button>
  <button onclick="window.print()" title="In the print dialog, choose 'Save as PDF'">💾 Save PDF</button>
  <button class="close-btn" onclick="window.close()">✕ Close</button>
</div>
<div class="content">
<div class="big">*** KITCHEN ORDER ***</div>
<hr>
<div style="display:flex;justify-content:space-between;font-size:13px;padding:3px 0">
  <span><b>Table ${tbl ? tbl.number : '?'}</b></span>
  <span>#${order.id.toUpperCase().slice(-6)}</span>
</div>
<div style="display:flex;justify-content:space-between;font-size:12px;color:#555;padding:2px 0">
  <span>${dt.toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</span>
  <span>${dt.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</span>
</div>
${order.customerName ? `<div style="font-size:12px;color:#555">Guest: ${order.customerName}</div>` : ''}
<hr>
<div style="font-weight:700;font-size:12px;margin-bottom:4px">ITEMS:</div>
${order.items.map(i => `
  <div class="item">
    <span>${i.name}</span>
    <span class="qty">×${i.qty}</span>
  </div>
  ${i.modifiers && i.modifiers.length ? `<div class="mods">&nbsp;&nbsp;[${i.modifiers.join(', ')}]</div>` : ''}
  ${i.note ? `<div class="note">&nbsp;&nbsp;→ ${i.note}</div>` : ''}
`).join('')}
<hr>
${order.note ? `<div class="order-note">📝 NOTE: ${order.note}</div>` : ''}
<div style="text-align:center;font-size:11px;color:#aaa;margin-top:10px">${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div>
</div></body></html>`;
  const w = window.open('', '_blank', 'width=480,height=700,noopener');
  if (w) { w.document.open(); w.document.write(html); w.document.close(); }
  else alert('Allow pop-ups to view kitchen tickets.');
}

const PERMS = {
  admin:{tabs:["dashboard","tables","orders","orderboard","menu","combos","qrordering","reservations","staff","customers","expenses","deliveries","inventory","analytics","settings"],canEditMenu:true,canEditStaff:true,canEditUsers:true,canDelete:true,canSeeFinancials:true},
  manager:{tabs:["dashboard","tables","orders","orderboard","menu","combos","qrordering","reservations","staff","customers","expenses","deliveries","inventory","analytics"],canEditMenu:true,canEditStaff:true,canEditUsers:false,canDelete:true,canSeeFinancials:true},
  waiter:{tabs:["dashboard","tables","orders","orderboard","reservations","customers","inventory"],canEditMenu:false,canEditStaff:false,canEditUsers:false,canDelete:false,canSeeFinancials:false},
  kitchen:{tabs:["kitchen"],canEditMenu:false,canEditStaff:false,canEditUsers:false,canDelete:false,canSeeFinancials:false},
};

const D_USERS=[
  {id:"u1",username:"admin",password:"admin123",role:"admin",name:"Admin",active:true},
  {id:"u2",username:"kitchen",password:"kitchen123",role:"kitchen",name:"Kitchen Display",active:true},
  {id:"u3",username:"waiter",password:"waiter123",role:"waiter",name:"Waiter",active:true},
  {id:"u4",username:"manager",password:"manager123",role:"manager",name:"Manager",active:true},
];

const D_DATA={
  restaurant:{name:"The Golden Fork",address:"12 Marine Drive, Mumbai",phone:"+91 98765 43210",email:"hello@goldenfork.in",cuisine:"Multi-cuisine",gst:"27AABCU9603R1ZX",openTime:"11:00",closeTime:"23:00",dailyGoal:50000,
    serviceChargeEnabled:true, serviceChargePct:5,
    taxConfig:{food:{cgst:9,sgst:9},beverages:{cgst:9,sgst:9},default:{cgst:9,sgst:9}},
    stations:[
      {id:"st1",name:"Main Kitchen",emoji:"🍳",categories:["Mains","Starters","Salads"],color:"#f5a623",active:true},
      {id:"st2",name:"Bar",emoji:"🍹",categories:["Beverages","Cocktails","Mocktails"],color:"#4a9eff",active:true},
      {id:"st3",name:"Tandoor",emoji:"🔥",categories:["Tandoor","Breads"],color:"#e05a4e",active:true},
      {id:"st4",name:"Dessert Station",emoji:"🍮",categories:["Desserts","Ice Cream"],color:"#9b7fe8",active:true},
    ],
  },
  combos:[
    {id:"c1",name:"Thali Combo",emoji:"🍱",description:"Main + 2 Breads + Dessert",bundlePrice:520,available:true,items:[{menuId:"m1",qty:1},{menuId:"m3",qty:2},{menuId:"m5",qty:1}]},
    {id:"c2",name:"Chai & Snack",emoji:"☕",description:"Paneer Tikka + Masala Chai",bundlePrice:299,available:true,items:[{menuId:"m7",qty:1},{menuId:"m4",qty:1}]},
  ],
  tables:[
    {id:"t1",number:1,capacity:2,floor:"Ground",status:"available",note:""},
    {id:"t2",number:2,capacity:4,floor:"Ground",status:"occupied",note:""},
    {id:"t3",number:3,capacity:4,floor:"Ground",status:"reserved",note:"Anniversary"},
    {id:"t4",number:4,capacity:6,floor:"Ground",status:"available",note:""},
    {id:"t5",number:5,capacity:8,floor:"First",status:"available",note:""},
    {id:"t6",number:6,capacity:2,floor:"First",status:"occupied",note:""},
  ],
  menu:[
    {id:"m1",name:"Butter Chicken",category:"Mains",price:380,cost:120,available:true,description:"Creamy tomato-based curry",tag:"bestseller",stock:12,lowStockAt:5,ingredients:[{ingId:"ing2",qty:0.25,unit:"kg"},{ingId:"ing1",qty:0.1,unit:"kg"},{ingId:"ing3",qty:0.05,unit:"kg"},{ingId:"ing4",qty:0.1,unit:"litre"}]},
    {id:"m2",name:"Dal Makhani",category:"Mains",price:280,cost:60,available:true,description:"Slow cooked black lentils",tag:"veg",stock:3,lowStockAt:5,ingredients:[{ingId:"ing5",qty:0.15,unit:"kg"},{ingId:"ing3",qty:0.03,unit:"kg"},{ingId:"ing4",qty:0.05,unit:"litre"}]},
    {id:"m3",name:"Garlic Naan",category:"Breads",price:60,cost:15,available:true,description:"Tandoor baked flatbread",tag:"",stock:40,lowStockAt:10,ingredients:[{ingId:"ing7",qty:0.1,unit:"kg"},{ingId:"ing6",qty:0.01,unit:"kg"},{ingId:"ing3",qty:0.01,unit:"kg"}]},
    {id:"m4",name:"Masala Chai",category:"Beverages",price:80,cost:20,available:true,description:"Spiced milk tea",tag:"",stock:2,lowStockAt:5,ingredients:[{ingId:"ing8",qty:0.15,unit:"litre"},{ingId:"ing9",qty:0.02,unit:"kg"}]},
    {id:"m5",name:"Gulab Jamun",category:"Desserts",price:120,cost:30,available:true,description:"Fried milk solids in syrup",tag:"",stock:8,lowStockAt:5,ingredients:[{ingId:"ing8",qty:0.1,unit:"litre"},{ingId:"ing9",qty:0.05,unit:"kg"},{ingId:"ing7",qty:0.05,unit:"kg"}]},
    {id:"m6",name:"Caesar Salad",category:"Starters",price:220,cost:70,available:true,description:"Romaine, croutons, parmesan",tag:"",stock:4,lowStockAt:5,ingredients:[{ingId:"ing11",qty:0.15,unit:"kg"}]},
    {id:"m7",name:"Paneer Tikka",category:"Starters",price:260,cost:80,available:true,description:"Grilled cottage cheese",tag:"veg",stock:15,lowStockAt:5,ingredients:[{ingId:"ing10",qty:0.2,unit:"kg"},{ingId:"ing1",qty:0.05,unit:"kg"}]},
    {id:"m8",name:"Mango Lassi",category:"Beverages",price:90,cost:25,available:true,description:"Sweet yoghurt drink",tag:"",stock:0,lowStockAt:3,ingredients:[{ingId:"ing12",qty:0.15,unit:"litre"},{ingId:"ing8",qty:0.1,unit:"litre"},{ingId:"ing9",qty:0.02,unit:"kg"}]},
  ],
  orders:[
    {id:"o1",tableId:"t2",items:[{menuId:"m1",name:"Butter Chicken",qty:2,price:380},{menuId:"m3",name:"Garlic Naan",qty:3,price:60}],status:"paid",createdAt:new Date(Date.now()-3600000).toISOString(),total:940,note:"",customerName:"Arjun Shah",discount:0,tax:169},
    {id:"o2",tableId:"t6",items:[{menuId:"m2",name:"Dal Makhani",qty:1,price:280},{menuId:"m4",name:"Masala Chai",qty:2,price:80}],status:"preparing",createdAt:new Date(Date.now()-1800000).toISOString(),total:440,note:"Less spicy",customerName:"Priya Mehta",discount:0,tax:79},
  ],
  reservations:[
    {id:"r1",name:"Rahul Verma",phone:"+91 99887 76655",date:new Date(Date.now()+86400000).toISOString().split("T")[0],time:"19:30",guests:4,tableId:"t3",status:"confirmed",note:"Anniversary dinner",deposit:500,depositPaid:true},
  ],
  staff:[
    {id:"s1",name:"Ravi Kumar",role:"Head Chef",phone:"+91 91234 56789",email:"ravi@goldenfork.in",salary:45000,shiftStart:"09:00",shiftEnd:"18:00",status:"active",joinDate:"2024-01-15",dob:"1985-06-12",address:"Andheri, Mumbai",emergency:"Wife - +91 99887 11223",attendance:[]},
    {id:"s2",name:"Meena Sharma",role:"Waiter",phone:"+91 98123 45678",email:"meena@goldenfork.in",salary:18000,shiftStart:"12:00",shiftEnd:"22:00",status:"active",joinDate:"2024-03-01",dob:"1998-11-20",address:"Bandra, Mumbai",emergency:"Brother - +91 91234 00001",attendance:[]},
    {id:"s3",name:"Deepak Joshi",role:"Cashier",phone:"+91 87654 32109",email:"deepak@goldenfork.in",salary:20000,shiftStart:"10:00",shiftEnd:"20:00",status:"active",joinDate:"2024-02-10",dob:"1992-03-05",address:"Dadar, Mumbai",emergency:"Mother - +91 98765 55555",attendance:[]},
  ],
  customers:[
    {id:"c1",name:"Arjun Shah",phone:"+91 98765 43210",email:"arjun@email.com",visits:12,totalSpent:14200,lastVisit:new Date(Date.now()-86400000).toISOString(),note:"No onion, prefers window seat",birthday:"1990-04-15",address:"Colaba, Mumbai",tags:["VIP","Regular"]},
    {id:"c2",name:"Priya Mehta",phone:"+91 87654 32109",email:"priya@email.com",visits:7,totalSpent:8900,lastVisit:new Date(Date.now()-3*86400000).toISOString(),note:"Vegetarian, allergic to nuts",birthday:"1995-09-22",address:"Juhu, Mumbai",tags:["Vegetarian"]},
    {id:"c3",name:"Rahul Verma",phone:"+91 99887 76655",email:"rahul@email.com",visits:3,totalSpent:4100,lastVisit:new Date(Date.now()-7*86400000).toISOString(),note:"",birthday:"1988-12-01",address:"",tags:[]},
  ],
  expenses:[
    {id:"e1",title:"Vegetables & Groceries",amount:12000,category:"Supplies",date:today(),note:"Weekly supply",vendor:"Fresh Farms",paid:true},
    {id:"e2",title:"Staff Salaries",amount:83000,category:"Payroll",date:today(),note:"April 2026",vendor:"",paid:true},
    {id:"e3",title:"Electricity Bill",amount:8500,category:"Utilities",date:today(),note:"April 2026",vendor:"MSEDCL",paid:false},
  ],
  deliveries:[
    {id:"d1",customerName:"Rohan Nair",phone:"+91 98001 23456",address:"45 Palm St, Andheri",items:[{name:"Butter Chicken",qty:1,price:380},{name:"Garlic Naan",qty:2,price:60}],total:500,status:"delivered",assignedTo:"Vikram (Swiggy)",createdAt:new Date(Date.now()-1800000).toISOString(),note:"Ring bell",deliveredAt:new Date(Date.now()-900000).toISOString()},
  ],
  wastage:[
    {id:"w1",item:"Tomatoes",qty:"2 kg",cost:80,reason:"Expired",date:today(),recordedBy:"Ravi Kumar"},
  ],
  ingredients:[
    {id:"ing1",name:"Tomatoes",unit:"kg",stock:8,lowStockAt:2,cost:30,category:"Vegetables",supplier:"Fresh Farms"},
    {id:"ing2",name:"Chicken",unit:"kg",stock:5,lowStockAt:2,cost:200,category:"Meat",supplier:"City Meat"},
    {id:"ing3",name:"Butter",unit:"kg",stock:3,lowStockAt:0.5,cost:450,category:"Dairy",supplier:"Amul"},
    {id:"ing4",name:"Cream",unit:"litre",stock:2,lowStockAt:0.5,cost:120,category:"Dairy",supplier:"Amul"},
    {id:"ing5",name:"Black Lentils",unit:"kg",stock:10,lowStockAt:2,cost:90,category:"Pulses",supplier:"Fresh Farms"},
    {id:"ing6",name:"Garlic",unit:"kg",stock:2,lowStockAt:0.3,cost:80,category:"Vegetables",supplier:"Fresh Farms"},
    {id:"ing7",name:"Flour",unit:"kg",stock:15,lowStockAt:3,cost:40,category:"Grains",supplier:"Fresh Farms"},
    {id:"ing8",name:"Milk",unit:"litre",stock:5,lowStockAt:1,cost:60,category:"Dairy",supplier:"Amul"},
    {id:"ing9",name:"Sugar",unit:"kg",stock:8,lowStockAt:1,cost:45,category:"Pantry",supplier:"Fresh Farms"},
    {id:"ing10",name:"Paneer",unit:"kg",stock:3,lowStockAt:0.5,cost:320,category:"Dairy",supplier:"Amul"},
    {id:"ing11",name:"Romaine Lettuce",unit:"kg",stock:1.5,lowStockAt:0.5,cost:80,category:"Vegetables",supplier:"Fresh Farms"},
    {id:"ing12",name:"Mango Pulp",unit:"litre",stock:4,lowStockAt:1,cost:90,category:"Fruits",supplier:"Fresh Farms"},
  ],
};

// ── CLOUD STORAGE HELPERS ─────────────────────────────────────
async function cloudGet(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function cloudSet(key, value) {
  try { await window.storage.set(key, JSON.stringify(value)); } catch {}
}
// Keys that stay local (preferences, not shared data)
const LOCAL_ONLY_KEYS = new Set(["rcm_theme","rcm_custom_theme","rcm_printer","rcm_normal_printer","rcm_delivery_api","rcm_activity_log"]);

function useStore(key, def) {
  const isLocal = LOCAL_ONLY_KEYS.has(key);
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; } catch { return def; }
  });

  // Load from cloud on mount
  useEffect(() => {
    if (isLocal) return;
    cloudGet(key).then(remote => { if (remote !== null) setVal(remote); });
  }, [key]);

  const set = useCallback(next => {
    setVal(prev => {
      const n = typeof next === "function" ? next(prev) : next;
      if (isLocal) {
        try { localStorage.setItem(key, JSON.stringify(n)); } catch {}
      } else {
        cloudSet(key, n);
        try { localStorage.setItem(key, JSON.stringify(n)); } catch {}
      }
      return n;
    });
  }, [key]);

  // Cross-tab sync
  useEffect(() => {
    if (!isLocal) return;
    const handler = e => { if (e.key === key && e.newValue) { try { setVal(JSON.parse(e.newValue)); } catch {} } };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key]);

  // Poll cloud every 5s for real-time multi-device sync
  useEffect(() => {
    if (isLocal) return;
    const id = setInterval(async () => {
      const remote = await cloudGet(key);
      if (remote !== null) {
        setVal(prev => {
          const remoteStr = JSON.stringify(remote);
          const prevStr = JSON.stringify(prev);
          if (prevStr !== remoteStr) { try { localStorage.setItem(key, remoteStr); } catch {} return remote; }
          return prev;
        });
      }
    }, 5000);
    return () => clearInterval(id);
  }, [key]);

  return [val, set];
}

// ── UI PRIMITIVES ─────────────────────────────────────────────
function Btn({children,onClick,variant="primary",size="md",full=false,disabled=false}){
  const v={primary:{background:C.accent,color:C.bg,fontWeight:600},ghost:{background:"transparent",color:C.cream,border:`1px solid ${C.border}`},danger:{background:C.red,color:"#fff",fontWeight:600},success:{background:C.green,color:"#fff",fontWeight:600},subtle:{background:C.border,color:C.cream}};
  const s={sm:"4px 10px",md:"8px 16px",lg:"11px 24px"};
  return <button onClick={onClick} disabled={disabled} style={{...v[variant],padding:s[size],borderRadius:8,fontSize:size==="sm"?12:14,width:full?"100%":"auto",opacity:disabled?.45:1,transition:"opacity .15s"}}>{children}</button>;
}
function Card({children,style={},...rest}){return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18,...style}} {...rest}>{children}</div>;}
function Badge({label,color=C.accent}){return <span style={{background:color+"22",color,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap"}}>{String(label).toUpperCase()}</span>;}
function Modal({title,onClose,children,wide=false}){
  const isMobile = useIsMobile();
  return <div style={{position:"fixed",inset:0,background:"#000c",zIndex:1000,display:"flex",alignItems:isMobile?"flex-end":"center",justifyContent:"center",padding:isMobile?0:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div className="fade-in" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:isMobile?"20px 20px 0 0":14,width:"100%",maxWidth:isMobile?"100%":wide?740:500,maxHeight:isMobile?"92dvh":"90vh",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        <span className="playfair" style={{fontSize:17,fontWeight:600}}>{title}</span>
        <button onClick={onClose} style={{background:"none",color:C.muted,fontSize:18,lineHeight:1}}>✕</button>
      </div>
      <div style={{padding:18,overflowY:"auto"}}>{children}</div>
    </div>
  </div>;
}
function Field({label,children,half=false}){return <div style={{marginBottom:12,width:half?"48%":"100%"}}><div style={{color:C.muted,fontSize:11,marginBottom:5,fontWeight:600,letterSpacing:.3}}>{label}</div>{children}</div>;}
function Row({children}){return <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>{children}</div>;}
function Divider(){return <div style={{borderTop:`1px solid ${C.border}`,margin:"14px 0"}} />;}
function SearchBar({value,onChange,placeholder="Search..."}){
  return <div style={{position:"relative",marginBottom:14}}>
    <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:14}}>🔍</span>
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{paddingLeft:34}} />
  </div>;
}
function StatCard({icon,label,value,sub,color=C.accent,onClick}){
  return <Card style={{display:"flex",alignItems:"flex-start",gap:12,cursor:onClick?"pointer":"default"}} onClick={onClick}>
    <div style={{fontSize:20,width:40,height:40,background:color+"18",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{icon}</div>
    <div><div style={{color:C.muted,fontSize:11,marginBottom:3}}>{label}</div><div className="playfair" style={{fontSize:20,color,fontWeight:700}}>{value}</div>{sub&&<div style={{color:C.muted,fontSize:11,marginTop:1}}>{sub}</div>}</div>
  </Card>;
}

// ── EXPORT HELPERS ────────────────────────────────────────────

// Load jsPDF + autoTable from CDN once
let _jsPDFPromise = null;
function loadJsPDF() {
  if (_jsPDFPromise) return _jsPDFPromise;
  _jsPDFPromise = new Promise((resolve, reject) => {
    if (window.jspdf) { resolve(window.jspdf.jsPDF); return; }
    const s1 = document.createElement('script');
    s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js';
      s2.onload = () => resolve(window.jspdf.jsPDF);
      s2.onerror = reject;
      document.head.appendChild(s2);
    };
    s1.onerror = reject;
    document.head.appendChild(s1);
  });
  return _jsPDFPromise;
}

// Load SheetJS from CDN once
let _xlsxPromise = null;
function loadXLSX() {
  if (_xlsxPromise) return _xlsxPromise;
  _xlsxPromise = new Promise((resolve, reject) => {
    if (window.XLSX) { resolve(window.XLSX); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    s.onload = () => resolve(window.XLSX);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return _xlsxPromise;
}

async function exportExcel(rows, fname) {
  if (!rows || rows.length === 0) { alert('No data to export.'); return; }
  try {
    const XLSX = await loadXLSX();
    const ws = XLSX.utils.json_to_sheet(rows);
    const cols = Object.keys(rows[0]).map(k => ({ wch: Math.max(k.length, ...rows.map(r => String(r[k] ?? '').length)) + 2 }));
    ws['!cols'] = cols;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, fname + '_' + today() + '.xlsx');
  } catch(e) { alert('Excel export failed: ' + e.message); }
}

// jsPDF doesn't support ₹ in built-in fonts — use Rs. instead
const rs = (n) => 'Rs.' + Number(n).toLocaleString('en-IN');

function pdfSave(doc, fname) {
  // Force download via blob URL instead of relying on doc.save() behaviour
  try {
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fname + '_' + today() + '.pdf';
    document.body.appendChild(a); a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
  } catch(e) { doc.save(fname + '_' + today() + '.pdf'); }
}

async function exportPDF(rows, title, fname) {
  if (!rows || rows.length === 0) { alert('No data to export.'); return; }
  try {
    const JsPDF = await loadJsPDF();
    const doc = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    doc.setFillColor(26, 24, 21);
    doc.rect(0, 0, 210, 22, 'F');
    doc.setTextColor(245, 166, 35);
    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text(title, 14, 14);
    doc.setTextColor(150, 140, 130); doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.text('Generated ' + new Date().toLocaleString('en-IN'), 196, 14, { align: 'right' });
    const headers = Object.keys(rows[0]).map(k => k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
    // Replace any ₹ symbols in values with Rs.
    const body = rows.map(r => Object.values(r).map(v => String(v ?? '').replace(/₹/g, 'Rs.')));
    doc.autoTable({
      startY: 28, head: [headers], body,
      styles: { fontSize: 9, cellPadding: 3, textColor: [30, 28, 25] },
      headStyles: { fillColor: [245, 166, 35], textColor: [20, 18, 15], fontStyle: 'bold', fontSize: 9 },
      alternateRowStyles: { fillColor: [250, 247, 243] },
      tableLineColor: [220, 215, 205], tableLineWidth: 0.2,
      margin: { left: 14, right: 14 },
    });
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i); doc.setFontSize(7); doc.setTextColor(160, 150, 140);
      doc.text(`Page ${i} of ${pageCount}`, 196, 290, { align: 'right' });
    }
    pdfSave(doc, fname);
  } catch(e) { alert('PDF export failed: ' + e.message); }
}

async function exportInvoicePDF(invoiceData, fname) {
  try {
    const JsPDF = await loadJsPDF();
    const doc = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const { order, tbl, subtotal, tax, disc, total, r } = invoiceData;
    const cgst = Math.round(subtotal * 0.09);
    const sgst = Math.round(subtotal * 0.09);
    const serviceCharge = order.serviceCharge || 0;
    const tip = order.tip || 0;
    const invoiceNo = order.invoiceNo || order.id.toUpperCase().slice(-8);
    const payMode = order.paymentMode || '';
    // Dark header bar
    doc.setFillColor(26, 24, 21);
    doc.rect(0, 0, 210, 34, 'F');
    doc.setTextColor(245, 166, 35); doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text(r.name || 'Restaurant', 14, 13);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(160, 150, 130);
    if (r.address) doc.text(r.address, 14, 19);
    if (r.phone) doc.text(r.phone, 14, 24);
    if (r.gst) doc.text('GSTIN: ' + r.gst, 14, 29);
    doc.setTextColor(245, 166, 35); doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', 196, 13, { align: 'right' });
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(200, 190, 170);
    doc.text(invoiceNo, 196, 20, { align: 'right' });
    doc.text(order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '', 196, 26, { align: 'right' });
    if (payMode) doc.text(payMode.toUpperCase(), 196, 31, { align: 'right' });
    // Info boxes
    doc.setFillColor(249, 246, 240);
    doc.roundedRect(14, 39, 56, 16, 2, 2, 'F');
    doc.roundedRect(76, 39, 56, 16, 2, 2, 'F');
    doc.roundedRect(138, 39, 58, 16, 2, 2, 'F');
    doc.setFontSize(7); doc.setTextColor(160, 140, 110); doc.setFont('helvetica', 'normal');
    doc.text('TABLE / GUEST', 17, 44); doc.text('DATE', 79, 44); doc.text('STATUS', 141, 44);
    doc.setFontSize(9); doc.setTextColor(30, 28, 25); doc.setFont('helvetica', 'bold');
    const guestLabel = `T${tbl?.number || '?'} - ${order.customerName || 'Guest'}`;
    doc.text(guestLabel.slice(0, 22), 17, 51);
    doc.text(order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : '', 79, 51);
    doc.text((order.status || '').toUpperCase(), 141, 51);
    // Items table
    doc.autoTable({
      startY: 61,
      head: [['Item', 'Qty', 'Unit Price', 'Amount']],
      body: order.items.map(i => [
        i.name + (i.modifiers && i.modifiers.length ? `\n[${i.modifiers.join(', ')}]` : ''),
        String(i.qty), rs(i.price), rs(i.qty * i.price)
      ]),
      styles: { fontSize: 9, cellPadding: 3, textColor: [30, 28, 25] },
      headStyles: { fillColor: [245, 166, 35], textColor: [20, 18, 15], fontStyle: 'bold' },
      columnStyles: { 1: { halign: 'center' }, 2: { halign: 'right' }, 3: { halign: 'right' } },
      alternateRowStyles: { fillColor: [250, 247, 243] },
      margin: { left: 14, right: 14 },
    });
    // Totals block
    const finalY = (doc.lastAutoTable?.finalY ?? 120) + 8;
    const extraRows = (disc > 0 ? 1 : 0) + (serviceCharge > 0 ? 1 : 0) + (tip > 0 ? 1 : 0);
    const boxH = 48 + extraRows * 7;
    doc.setFillColor(249, 246, 240);
    doc.roundedRect(118, finalY, 78, boxH, 2, 2, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(80, 75, 65);
    let y = finalY + 9;
    doc.text('Subtotal', 122, y); doc.text(rs(subtotal), 192, y, { align: 'right' }); y += 7;
    doc.setTextColor(120, 110, 100);
    doc.text('  CGST (9%)', 122, y); doc.text(rs(cgst), 192, y, { align: 'right' }); y += 6;
    doc.text('  SGST (9%)', 122, y); doc.text(rs(sgst), 192, y, { align: 'right' }); y += 7;
    doc.setTextColor(80, 75, 65);
    if (disc > 0) { doc.setTextColor(249, 115, 22); doc.text('Discount', 122, y); doc.text('-' + rs(disc), 192, y, { align: 'right' }); y += 7; doc.setTextColor(80, 75, 65); }
    if (serviceCharge > 0) { doc.text('Service Charge', 122, y); doc.text(rs(serviceCharge), 192, y, { align: 'right' }); y += 7; }
    if (tip > 0) { doc.text('Tip', 122, y); doc.text(rs(tip), 192, y, { align: 'right' }); y += 7; }
    doc.setDrawColor(220, 210, 195); doc.line(122, y - 1, 192, y - 1);
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(245, 166, 35);
    doc.text('TOTAL', 122, y + 5); doc.text(rs(total), 192, y + 5, { align: 'right' });
    // Footer
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(160, 150, 130);
    if (r.gst) doc.text('GSTIN: ' + r.gst, 105, 279, { align: 'center' });
    doc.text('Thank you for dining with us!', 105, 285, { align: 'center' });
    pdfSave(doc, fname);
  } catch(e) { alert('PDF export failed: ' + e.message); }
}

function exportWord(rows, fname) {
  if (!rows || rows.length === 0) { alert('No data to export.'); return; }
  const keys = Object.keys(rows[0]);
  const headers = keys.map(k => k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  const tableRows = rows.map(r => `<tr>${keys.map(k => `<td>${r[k] ?? ''}</td>`).join('')}</tr>`).join('');
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
  <head><meta charset="utf-8"><title>${fname}</title>
  <style>
    body{font-family:Calibri,Arial,sans-serif;color:#111;padding:20px}
    h2{color:#c47d10;font-size:18px;margin-bottom:4px;border-bottom:2px solid #f5a623;padding-bottom:6px}
    .sub{color:#888;font-size:11px;margin-bottom:16px}
    table{border-collapse:collapse;width:100%;margin-top:12px}
    th{background:#fff3cd;border:1px solid #ddd;padding:7px 10px;text-align:left;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.5px}
    td{border:1px solid #eee;padding:7px 10px;font-size:12px}
    tr:nth-child(even) td{background:#faf7f0}
  </style></head>
  <body>
    <h2>${fname.replace(/_/g, ' ')}</h2>
    <div class="sub">Generated ${new Date().toLocaleString('en-IN')}</div>
    <table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${tableRows}</tbody></table>
  </body></html>`;
  const blob = new Blob([html], { type: 'application/msword' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = fname + '_' + today() + '.doc';
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 200);
}

function openPrintWindow(htmlBody, title = 'Report') {
  // Do NOT use noopener — it breaks window.print() in the popup
  const w = window.open('', '_blank', 'width=820,height=960');
  if (!w) { alert('Please allow pop-ups in your browser to print.'); return; }
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a;padding:32px;max-width:680px;margin:0 auto;background:#fff}
    .toolbar{position:fixed;top:0;left:0;right:0;background:#1a1a1a;padding:10px 18px;display:flex;gap:10px;align-items:center;z-index:999;box-shadow:0 2px 12px #0004}
    .toolbar span{font-weight:700;color:#f5a623;font-size:14px}
    .toolbar button{background:#f5a623;color:#111;border:none;border-radius:6px;padding:6px 16px;font-size:12px;font-weight:700;cursor:pointer}
    .toolbar button:hover{background:#e09010}
    .toolbar .close{background:#444;color:#fff;margin-left:auto}
    .toolbar .close:hover{background:#666}
    .content{margin-top:56px}
    .title{font-size:20px;font-weight:700;margin-bottom:4px}
    .sub{color:#888;font-size:12px;margin-bottom:16px}
    table{width:100%;border-collapse:collapse;margin:14px 0}
    th{background:#f9f6f0;font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#888;padding:8px 12px;text-align:left;border-bottom:2px solid #f5a623}
    th:last-child,td:last-child{text-align:right}
    td{padding:8px 12px;border-bottom:1px solid #f0ece4;font-size:13px}
    tr:last-child td{border-bottom:none}
    tr:nth-child(even) td{background:#faf7f2}
    @media print{.toolbar{display:none!important}.content{margin-top:0}@page{margin:1cm}}
  </style>
  </head>
  <body>
  <div class="toolbar">
    <span>📄 ${title}</span>
    <button onclick="window.print()">🖨️ Print</button>
    <button class="close" onclick="window.close()">✕ Close</button>
  </div>
  <div class="content">${htmlBody}</div>
  </body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
}

// ── EXPORT MENU COMPONENT ─────────────────────────────────────
function ExportMenu({ label = "Export", csvRows, csvName, wordHtml, wordName, printHtml, printName, size = "sm" }) {
  useTheme();
  const [open, setOpen] = useState(false);
  const hasOptions = csvRows || wordHtml || printHtml;
  if (!hasOptions) return null;
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Btn size={size} variant="ghost" onClick={() => setOpen(o => !o)}>
        ⬇ {label} ▾
      </Btn>
      {open && <>
        <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setOpen(false)} />
        <div style={{
          position: 'absolute', right: 0, top: '110%', zIndex: 999,
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
          padding: '6px 0', minWidth: 190, boxShadow: '0 8px 24px #0006',
        }}>
          {printHtml && (
            <button onClick={() => { setOpen(false); openPrintWindow(printHtml, printName || label); }}
              style={{ width: '100%', padding: '9px 16px', background: 'none', color: C.cream, textAlign: 'left', fontSize: 13, border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = C.border}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              🖨️ Print
            </button>
          )}
          {csvRows && (
            <button onClick={() => { setOpen(false); exportPDF(csvRows, printName || label, csvName || 'export'); }}
              style={{ width: '100%', padding: '9px 16px', background: 'none', color: C.cream, textAlign: 'left', fontSize: 13, border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = C.border}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              📄 Save as PDF
            </button>
          )}
          {csvRows && (
            <button onClick={() => { setOpen(false); exportExcel(csvRows, csvName || 'export'); }}
              style={{ width: '100%', padding: '9px 16px', background: 'none', color: C.cream, textAlign: 'left', fontSize: 13, border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = C.border}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              📊 Export Excel (.xlsx)
            </button>
          )}
          {csvRows && (
            <button onClick={() => { setOpen(false); exportWord(csvRows, csvName || 'export'); }}
              style={{ width: '100%', padding: '9px 16px', background: 'none', color: C.cream, textAlign: 'left', fontSize: 13, border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = C.border}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              📝 Export Word (.doc)
            </button>
          )}
        </div>
      </>}
    </div>
  );
}

// ── INVOICE MENU (per-order dropdown) ─────────────────────────
function InvoiceMenu({ order, data, label = "🧾 Receipt" }) {
  useTheme();
  const [open, setOpen] = useState(false);
  const tbl = data.tables.find(t => t.id === order.tableId);
  const subtotal = order.items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = order.tax || Math.round(subtotal * 0.18);
  const disc = order.discount || 0;
  const total = order.total || (subtotal + tax - disc);
  const r = data.restaurant;

  const invoiceHtml = () => {
    const body = `
<div style="text-align:center;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid #f5a623">
  <div style="font-size:20px;font-weight:700;color:#f5a623;font-family:Georgia,serif">${r.name}</div>
  <div style="font-size:11px;color:#777">${r.address||''} ${r.phone?'· '+r.phone:''}</div>
  ${r.gst?`<div style="font-size:11px;color:#777">GST: ${r.gst}</div>`:''}
  <div style="font-size:26px;font-weight:700;margin-top:8px;letter-spacing:-1px">TAX INVOICE</div>
</div>
<div style="display:flex;gap:10px;margin-bottom:18px">
  <div style="flex:1;background:#f9f6f0;border-radius:8px;padding:10px 12px">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;margin-bottom:3px">Invoice #</div>
    <div style="font-size:13px;font-weight:600">${order.id.toUpperCase()}</div>
  </div>
  <div style="flex:1;background:#f9f6f0;border-radius:8px;padding:10px 12px">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;margin-bottom:3px">Date</div>
    <div style="font-size:13px;font-weight:600">${new Date(order.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
  </div>
  <div style="flex:1;background:#f9f6f0;border-radius:8px;padding:10px 12px">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#999;font-weight:600;margin-bottom:3px">Table / Guest</div>
    <div style="font-size:13px;font-weight:600">T${tbl?.number||'?'} · ${order.customerName||'Guest'}</div>
  </div>
</div>
<table><thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Amount</th></tr></thead><tbody>
${order.items.map(i=>`<tr><td>${i.name}</td><td>${i.qty}</td><td>₹${i.price.toLocaleString('en-IN')}</td><td>₹${(i.qty*i.price).toLocaleString('en-IN')}</td></tr>`).join('')}
</tbody></table>
<div style="background:#f9f6f0;border-radius:8px;padding:12px 14px;margin-bottom:16px">
  <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
  <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px"><span>GST (18%)</span><span>₹${tax.toLocaleString('en-IN')}</span></div>
  ${disc>0?`<div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px"><span>Discount</span><span style="color:#f97316">-₹${disc.toLocaleString('en-IN')}</span></div>`:''}
  <div style="display:flex;justify-content:space-between;padding:8px 0 3px;font-size:16px;font-weight:700;color:#f5a623;border-top:1px solid #ddd;margin-top:6px"><span>TOTAL</span><span>₹${total.toLocaleString('en-IN')}</span></div>
</div>
${order.note?`<div style="background:#f5a62311;border-radius:6px;padding:8px 10px;font-size:12px;color:#777;margin-bottom:12px">📝 ${order.note}</div>`:''}
<div style="text-align:center;font-size:11px;color:#aaa;padding-top:14px;border-top:1px solid #e8e2d8">${r.email?r.email+' · ':''} Thank you for dining with us! 🙏</div>`;
    return body;
  };

  const csvRows = order.items.map(i => ({
    invoice: order.id.toUpperCase(), date: order.createdAt?.split('T')[0]||'',
    table: tbl?.number||'', customer: order.customerName||'',
    item: i.name, qty: i.qty, unit_price: i.price, amount: i.qty*i.price,
    subtotal, gst: tax, discount: disc, total, status: order.status
  }));

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Btn size="sm" variant="ghost" onClick={() => setOpen(o => !o)}>{label} ▾</Btn>
      {open && <>
        <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setOpen(false)} />
        <div style={{
          position: 'absolute', right: 0, top: '110%', zIndex: 999,
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
          padding: '6px 0', minWidth: 190, boxShadow: '0 8px 24px #0006',
        }}>
          {[
            ['🖨️ Print', () => openPrintWindow(invoiceHtml(), 'Tax Invoice — ' + r.name)],
            ['📄 Save as PDF', () => exportInvoicePDF({ order, tbl, subtotal, tax, disc, total, r }, 'invoice_' + order.id.slice(-6))],
            ['📊 Export Excel (.xlsx)', () => exportExcel(csvRows, 'invoice_' + order.id.slice(-6))],
            ['📝 Export Word (.doc)', () => exportWord(csvRows, 'Invoice_' + order.id.slice(-6))],
          ].map(([label, action]) => (
            <button key={label} onClick={() => { setOpen(false); action(); }}
              style={{ width: '100%', padding: '9px 16px', background: 'none', color: C.cream, textAlign: 'left', fontSize: 13, border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = C.border}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              {label}
            </button>
          ))}
        </div>
      </>}
    </div>
  );
}

// ── DELIVERY INVOICE MENU ─────────────────────────────────────
function DeliveryInvoiceMenu({ delivery: d, restaurant: r }) {
  useTheme();
  const [open, setOpen] = useState(false);

  const invoiceHtml = () => `
<div style="text-align:center;margin-bottom:18px;padding-bottom:14px;border-bottom:2px solid #f5a623">
  <div style="font-size:20px;font-weight:700;color:#f5a623;font-family:Georgia,serif">${r.name}</div>
  <div style="font-size:11px;color:#777">${r.address||''}</div>
  <div style="font-size:24px;font-weight:700;margin-top:8px">DELIVERY INVOICE</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
  <div style="background:#f9f6f0;border-radius:8px;padding:10px 12px">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:3px">Customer</div>
    <div style="font-weight:600">${d.customerName}</div>
    <div style="font-size:12px;color:#666">${d.phone}</div>
  </div>
  <div style="background:#f9f6f0;border-radius:8px;padding:10px 12px">
    <div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#999;margin-bottom:3px">Address</div>
    <div style="font-size:12px;font-weight:500">${d.address}</div>
  </div>
</div>
<table><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Amount</th></tr></thead><tbody>
${d.items.map(i=>`<tr><td>${i.name}</td><td>${i.qty}</td><td>₹${(+i.price).toLocaleString('en-IN')}</td><td>₹${(i.qty*(+i.price)).toLocaleString('en-IN')}</td></tr>`).join('')}
</tbody></table>
<div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:#f5a623;padding:10px 0;border-top:2px solid #f5a62333">
  <span>TOTAL</span><span>₹${d.total.toLocaleString('en-IN')}</span>
</div>
${d.note?`<div style="background:#f5a62311;border-radius:6px;padding:8px 10px;font-size:12px;color:#777;margin-bottom:10px">📝 ${d.note}</div>`:''}
<div style="text-align:center;font-size:11px;color:#aaa;margin-top:12px;padding-top:10px;border-top:1px solid #e8e2d8">
  🛵 ${d.assignedTo||'Delivery partner'} · ${new Date(d.createdAt||Date.now()).toLocaleDateString('en-IN')} · Thank you!
</div>`;

  const csvRows = d.items.map(i => ({
    customer: d.customerName, phone: d.phone, address: d.address,
    item: i.name, qty: i.qty, unit_price: +i.price, amount: i.qty*(+i.price),
    total: d.total, status: d.status, rider: d.assignedTo||'',
  }));

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Btn size="sm" variant="ghost" onClick={() => setOpen(o => !o)}>🧾 Receipt ▾</Btn>
      {open && <>
        <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setOpen(false)} />
        <div style={{
          position: 'absolute', right: 0, top: '110%', zIndex: 999,
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
          padding: '6px 0', minWidth: 190, boxShadow: '0 8px 24px #0006',
        }}>
          {[
            ['🖨️ Print', () => openPrintWindow(invoiceHtml(), 'Delivery Invoice — ' + r.name)],
            ['📄 Save as PDF', () => exportPDF(csvRows, 'Delivery Invoice — ' + r.name, 'delivery_invoice_' + d.id.slice(-6))],
            ['📊 Export Excel (.xlsx)', () => exportExcel(csvRows, 'delivery_invoice_' + d.id.slice(-6))],
            ['📝 Export Word (.doc)', () => exportWord(csvRows, 'Delivery_Invoice_' + d.id.slice(-6))],
          ].map(([lbl, action]) => (
            <button key={lbl} onClick={() => { setOpen(false); action(); }}
              style={{ width: '100%', padding: '9px 16px', background: 'none', color: C.cream, textAlign: 'left', fontSize: 13, border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = C.border}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              {lbl}
            </button>
          ))}
        </div>
      </>}
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────
function Login({users,onLogin}){
  useTheme();
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  const attempt=async()=>{
    if(loading)return;
    setLoading(true); setErr("");
    try{
      const user=users.find(x=>x.username===u.trim()&&x.active);
      if(!user){setErr("Invalid username or password.");setLoading(false);return;}
      const ok=await verifyPassword(p,user.password);
      if(ok){saveSession(user);onLogin(user);}
      else setErr("Invalid username or password.");
    }catch{setErr("Login failed. Please try again.");}
    setLoading(false);
  };
  const roleColor={admin:C.accent,kitchen:C.red,waiter:C.green,manager:C.blue};
  // Show plaintext passwords only for legacy unhashed accounts (demo mode)
  const isLegacy=pw=>!pw?.match(/^[0-9a-f]{64}$/);
  return <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg}}>
    <style>{makeCss(C)}</style>
    <div className="fade-in" style={{width:"100%",maxWidth:380,padding:16}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:42,marginBottom:8}}>🍴</div>
        <div className="playfair" style={{fontSize:26,color:C.accent,fontWeight:700}}>Restaurant CRM</div>
        <div style={{color:C.muted,fontSize:13,marginTop:3}}>Sign in to continue</div>
      </div>
      <Card>
        <Field label="USERNAME"><input value={u} onChange={e=>setU(e.target.value)} placeholder="e.g. admin" onKeyDown={e=>e.key==="Enter"&&attempt()} autoFocus /></Field>
        <Field label="PASSWORD"><input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&attempt()} /></Field>
        {err&&<div style={{color:C.red,fontSize:13,marginBottom:10,textAlign:"center"}}>{err}</div>}
        <Btn full onClick={attempt} disabled={loading}>{loading?"Verifying…":"Sign In"}</Btn>
      </Card>
      <div style={{marginTop:14,background:C.surface,borderRadius:10,padding:12,border:`1px solid ${C.border}`}}>
        <div style={{color:C.muted,fontSize:10,fontWeight:600,marginBottom:8,letterSpacing:.5}}>DEMO ACCOUNTS — click to fill</div>
        {users.filter(x=>x.active).map(x=>(
          <div key={x.id} onClick={()=>{setU(x.username);setP(isLegacy(x.password)?x.password:"");}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:`1px solid ${C.border}44`,cursor:"pointer",fontSize:12}}>
            <span style={{color:C.cream,fontWeight:500}}>{x.username}</span>
            <span style={{color:C.muted,fontFamily:"monospace"}}>{isLegacy(x.password)?x.password:"[hashed]"}</span>
            <Badge label={x.role} color={roleColor[x.role]||C.muted} />
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ── KITCHEN DISPLAY ───────────────────────────────────────────
// ── KITCHEN WORKFLOW ENGINE ───────────────────────────────────

// Prep-time estimates per category (minutes per item, scaled by qty)
const DISH_PREP_TIMES = {
  "Starters":  8,
  "Mains":    18,
  "Breads":    6,
  "Desserts":  7,
  "Beverages": 3,
  "Sides":     5,
  "default":  12,
};

function getDishPrepTime(menuItem, qty = 1) {
  const base = DISH_PREP_TIMES[menuItem?.category] || DISH_PREP_TIMES.default;
  // Each additional unit adds 40% of base time (parallel cooking discount)
  return Math.round(base + (qty - 1) * base * 0.4);
}

function getOrderEstimate(order, menuItems) {
  // Total estimate = time of the slowest dish (they cook in parallel, mostly)
  if (!order.items?.length) return 0;
  const times = order.items.map(it => {
    const mi = menuItems.find(m => m.id === it.menuId);
    return getDishPrepTime(mi, it.qty);
  });
  return Math.max(...times);
}

// Stage pipeline — each dish progresses independently
// Stored as order.dishStages = { "itemIndex-dishKey": "queued"|"cooking"|"plating"|"ready" }
const DISH_STAGES = ["queued", "cooking", "plating", "ready"];
const STAGE_COLORS = (C) => ({
  queued:  { bg: C.border,  text: C.muted,   label: "Queued",  icon: "⏳" },
  cooking: { bg: C.orange+"33", text: C.orange, label: "Cooking", icon: "🔥" },
  plating: { bg: C.purple+"33", text: C.purple, label: "Plating", icon: "🍽️" },
  ready:   { bg: C.green+"33",  text: C.green,  label: "Ready",   icon: "✅" },
});

function nextStage(s) {
  const i = DISH_STAGES.indexOf(s);
  return DISH_STAGES[Math.min(i + 1, DISH_STAGES.length - 1)];
}
function prevStage(s) {
  const i = DISH_STAGES.indexOf(s);
  return DISH_STAGES[Math.max(i - 1, 0)];
}

function dishKey(itemIdx) { return `dish_${itemIdx}`; }

function getOrderStage(order) {
  // Derive order-level stage from dish stages
  const stages = order.dishStages || {};
  const count = order.items?.length || 0;
  if (count === 0) return "queued";
  const vals = order.items.map((_, i) => stages[dishKey(i)] || "queued");
  if (vals.every(s => s === "ready")) return "ready";
  if (vals.every(s => s === "queued")) return "queued";
  if (vals.some(s => s === "plating" || s === "ready")) return "plating";
  return "cooking";
}

function isVip(order, customers) {
  if (!order.customerName) return false;
  return customers?.some(c =>
    c.name?.toLowerCase() === order.customerName?.toLowerCase() &&
    (c.tags?.includes("VIP") || c.visits >= 10)
  );
}

// ── KITCHEN DISPLAY ──────────────────────────────────────────

// Allergy/special keywords that should be highlighted
const ALLERGY_KEYWORDS = ["allergy","allergic","nut","peanut","lactose","dairy","gluten","vegan","halal","kosher","shellfish","egg","soy","sesame","no onion","no garlic","no sugar","diabetic"];
function hasAllergyFlag(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return ALLERGY_KEYWORDS.some(k => lower.includes(k));
}

function KitchenOrderCard({ order, data, setData, now, bumpMode }) {
  const t = _themeStore.current;
  const sc = STAGE_COLORS(t);
  const tbl = data.tables.find(x => x.id === order.tableId);
  const ageMs = now - new Date(order.createdAt).getTime();
  const ageMin = Math.floor(ageMs / 60000);
  const estimate = getOrderEstimate(order, data.menu);
  const orderStage = getOrderStage(order);
  const vip = isVip(order, data.customers);
  const overdue = ageMin > estimate && orderStage !== "ready";
  const alerting = ageMin > 20 && orderStage !== "ready";
  const minsLeft = Math.max(0, estimate - ageMin);
  // Allergy check across order note + item notes
  const allergyNote = [order.note, ...(order.items || []).map(i => i.note)].filter(Boolean).find(n => hasAllergyFlag(n));
  // Per-dish cooking timers: stored as order.dishStartedAt = { dish_0: isoString }
  const dishStartedAt = order.dishStartedAt || {};

  // Border & glow by urgency
  const borderColor = vip ? t.purple
    : overdue ? t.red
    : alerting ? t.orange
    : orderStage === "ready" ? t.green
    : orderStage === "cooking" ? t.orange
    : orderStage === "plating" ? t.purple
    : t.border;

  const cardGlow = vip ? `0 0 0 2px ${t.purple}44, 0 4px 20px ${t.purple}22`
    : overdue ? `0 0 0 2px ${t.red}44, 0 4px 20px ${t.red}22`
    : "none";

  function advanceDish(itemIdx) {
    setData(d => {
      const orders = d.orders.map(o => {
        if (o.id !== order.id) return o;
        const ds = { ...(o.dishStages || {}) };
        const dsa = { ...(o.dishStartedAt || {}) };
        const key = dishKey(itemIdx);
        const prev = ds[key] || "queued";
        ds[key] = nextStage(prev);
        // Record when cooking starts
        if (prev === "queued" && ds[key] === "cooking") dsa[key] = new Date().toISOString();
        const allReady = o.items.every((_, i) => (ds[dishKey(i)]) === "ready");
        return { ...o, dishStages: ds, dishStartedAt: dsa, status: allReady ? "served" : o.status === "pending" ? "preparing" : o.status };
      });
      return { ...d, orders };
    });
  }

  function retreatDish(itemIdx) {
    setData(d => {
      const orders = d.orders.map(o => {
        if (o.id !== order.id) return o;
        const ds = { ...(o.dishStages || {}) };
        const key = dishKey(itemIdx);
        ds[key] = prevStage(ds[key] || "queued");
        return { ...o, dishStages: ds, status: o.status === "served" ? "preparing" : o.status };
      });
      return { ...d, orders };
    });
  }

  function startAll() {
    setData(d => {
      const orders = d.orders.map(o => {
        if (o.id !== order.id) return o;
        const ds = {};
        o.items.forEach((_, i) => { ds[dishKey(i)] = "cooking"; });
        return { ...o, dishStages: ds, status: "preparing", kitchenStartedAt: o.kitchenStartedAt || new Date().toISOString() };
      });
      return { ...d, orders };
    });
  }

  function markAllReady() {
    setData(d => {
      const orders = d.orders.map(o => {
        if (o.id !== order.id) return o;
        const ds = {};
        o.items.forEach((_, i) => { ds[dishKey(i)] = "ready"; });
        return { ...o, dishStages: ds, status: "served", kitchenDoneAt: new Date().toISOString() };
      });
      return { ...d, orders };
    });
  }

  const elapsedStr = ageMin < 1 ? "just now" : ageMin < 60 ? `${ageMin}m` : `${Math.floor(ageMin/60)}h ${ageMin%60}m`;
  const stageLabel = { queued: "Queued", cooking: "Cooking", plating: "Plating", ready: "Ready" }[orderStage] || orderStage;

  // Bump mode = compact single card
  if (bumpMode) {
    return (
      <div style={{ background: t.card, border: `3px solid ${overdue ? t.red : orderStage === "ready" ? t.green : t.accent}`, borderRadius: 18, overflow: "hidden" }}>
        <div style={{ background: (overdue ? t.red : orderStage === "ready" ? t.green : t.accent) + "22", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="playfair" style={{ fontSize: 32, fontWeight: 700 }}>Table {tbl?.number || "?"}</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: overdue ? t.red : t.orange }}>⏱ {ageMin}m</div>
            <div style={{ fontSize: 12, color: t.muted }}>est. {estimate}m</div>
          </div>
        </div>
        {allergyNote && <div style={{ background: t.red, color: "#fff", padding: "6px 18px", fontWeight: 700, fontSize: 13 }}>⚠️ ALLERGY: {allergyNote}</div>}
        <div style={{ padding: "12px 18px" }}>
          {order.items.map((it, i) => {
            const stage = (order.dishStages || {})[dishKey(i)] || "queued";
            const st = sc[stage];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${t.border}33` }}>
                <div style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>{it.name} <span style={{ color: t.accent }}>×{it.qty}</span></div>
                <span style={{ background: st.bg, color: st.text, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{st.icon} {st.label}</span>
                {stage !== "ready" && <button onClick={() => advanceDish(i)} style={{ background: st.text, color: t.bg, border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 14, cursor: "pointer", fontWeight: 700 }}>→</button>}
              </div>
            );
          })}
        </div>
        <div style={{ padding: "10px 18px", display: "flex", gap: 8 }}>
          {orderStage === "queued" && <button onClick={startAll} style={{ flex: 1, background: t.accent, color: t.bg, border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>🔥 START ALL</button>}
          {orderStage !== "queued" && orderStage !== "ready" && <button onClick={markAllReady} style={{ flex: 1, background: t.green, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>✅ ALL DONE</button>}
          {orderStage === "ready" && <div style={{ flex: 1, background: t.green + "22", color: t.green, borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 16, textAlign: "center" }}>✅ Ready to Serve!</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: t.card,
      border: `2px solid ${borderColor}`,
      borderRadius: 16,
      padding: 0,
      boxShadow: cardGlow,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      transition: "box-shadow .3s, border-color .3s",
      animation: overdue ? "pulse 2s infinite" : "none",
    }}>

      {/* Header */}
      <div style={{ padding: "12px 14px 10px", background: borderColor + "18", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span className="playfair" style={{ fontSize: 20, fontWeight: 700, color: t.cream }}>
                Table {tbl?.number || "?"}
              </span>
              {vip && (
                <span style={{ background: t.purple + "33", color: t.purple, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, letterSpacing: .5 }}>
                  👑 VIP
                </span>
              )}
              {overdue && (
                <span style={{ background: t.red + "33", color: t.red, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>
                  🔴 OVERDUE
                </span>
              )}
              {alerting && !overdue && (
                <span style={{ background: t.orange + "33", color: t.orange, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>
                  ⚠️ LONG WAIT
                </span>
              )}
            </div>
            <div style={{ color: t.muted, fontSize: 11, marginTop: 2 }}>
              {order.customerName || "—"} · #{order.id.slice(-5).toUpperCase()}
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: borderColor, background: borderColor + "22", padding: "2px 9px", borderRadius: 20, marginBottom: 3 }}>
              {sc[orderStage]?.icon} {stageLabel}
            </div>
            <div style={{ fontSize: 10, color: t.muted }}>{elapsedStr} ago</div>
          </div>
        </div>

        {/* Time estimate bar */}
        <div style={{ marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: t.muted, marginBottom: 3 }}>
            <span>⏱ Est. {estimate}m total</span>
            <span style={{ color: overdue ? t.red : minsLeft === 0 ? t.green : t.cream, fontWeight: 600 }}>
              {orderStage === "ready" ? "Done ✓" : minsLeft === 0 ? "Due now!" : `~${minsLeft}m left`}
            </span>
          </div>
          <div style={{ background: t.border, borderRadius: 4, height: 5, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${Math.min(100, (ageMin / Math.max(estimate, 1)) * 100)}%`,
              background: overdue ? t.red : ageMin / estimate > 0.8 ? t.orange : t.green,
              borderRadius: 4,
              transition: "width 1s linear",
            }} />
          </div>
        </div>

        {order.note && (
          <div style={{ marginTop: 7, background: t.accent + "11", borderRadius: 6, padding: "4px 9px", fontSize: 11, color: t.accent }}>
            📝 {order.note}
          </div>
        )}
        {allergyNote && (
          <div style={{ marginTop: 6, background: t.red, borderRadius: 6, padding: "5px 10px", fontSize: 12, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
            ⚠️ ALLERGY ALERT: {allergyNote}
          </div>
        )}
      </div>

      {/* Dish list */}
      <div style={{ padding: "10px 14px", flex: 1 }}>
        {order.items.map((it, i) => {
          const stage = (order.dishStages || {})[dishKey(i)] || "queued";
          const st = sc[stage];
          const mi = data.menu.find(m => m.id === it.menuId);
          const prepTime = getDishPrepTime(mi, it.qty);
          const isReady = stage === "ready";
          const cookStarted = dishStartedAt[dishKey(i)];
          const cookMin = cookStarted ? Math.floor((now - new Date(cookStarted).getTime()) / 60000) : null;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "7px 0",
              borderBottom: i < order.items.length - 1 ? `1px solid ${t.border}33` : "none",
            }}>
              {/* Stage dot */}
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: st.text, flexShrink: 0, boxShadow: `0 0 6px ${st.text}88` }} />

              {/* Dish name */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: isReady ? t.muted : t.cream, textDecoration: isReady ? "line-through" : "none" }}>
                  {it.name}
                </div>
                <div style={{ fontSize: 10, color: t.muted, marginTop: 1, display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                  {(()=>{const stn=routeItemToStation(it,data.menu,data.restaurant);return stn?<span style={{background:stn.color+"22",color:stn.color,borderRadius:10,padding:"0 5px",fontWeight:700}}>{stn.emoji} {stn.name}</span>:null;})()}
                  <span>{mi?.category || ""} · ~{prepTime}m</span>
                  {cookMin !== null && stage !== "ready" && <span style={{ color: cookMin > prepTime ? t.red : t.orange, fontWeight: 700 }}>🔥 {cookMin}m cooking</span>}
                  {it.note && <span style={{ color: hasAllergyFlag(it.note) ? t.red : t.muted, fontWeight: hasAllergyFlag(it.note) ? 700 : 400 }}>{hasAllergyFlag(it.note) ? "⚠️" : "📝"} {it.note}</span>}
                </div>
              </div>

              {/* Qty badge */}
              <span style={{ background: t.accent + "22", color: t.accent, borderRadius: 6, padding: "1px 8px", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                ×{it.qty}
              </span>

              {/* Stage chip + advance button */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <span style={{ background: st.bg, color: st.text, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, whiteSpace: "nowrap" }}>
                  {st.icon} {st.label}
                </span>
                {stage !== "ready" && (
                  <button onClick={() => advanceDish(i)} title="Advance stage" style={{ background: st.text + "22", color: st.text, border: "none", borderRadius: 6, padding: "2px 7px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>
                    →
                  </button>
                )}
                {stage !== "queued" && (
                  <button onClick={() => retreatDish(i)} title="Go back" style={{ background: t.border, color: t.muted, border: "none", borderRadius: 6, padding: "2px 6px", fontSize: 10, cursor: "pointer" }}>
                    ←
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div style={{ padding: "10px 14px", borderTop: `1px solid ${t.border}`, display: "flex", gap: 6 }}>
        {orderStage === "queued" && (
          <button onClick={startAll} style={{ flex: 1, background: t.accent, color: t.bg, border: "none", borderRadius: 8, padding: "8px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            🔥 Start All
          </button>
        )}
        {orderStage !== "queued" && orderStage !== "ready" && (
          <button onClick={markAllReady} style={{ flex: 1, background: t.green, color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            ✅ All Ready
          </button>
        )}
        {orderStage === "ready" && (
          <div style={{ flex: 1, background: t.green + "22", color: t.green, borderRadius: 8, padding: "8px 0", fontWeight: 700, fontSize: 13, textAlign: "center" }}>
            ✅ Ready to Serve
          </div>
        )}
      </div>
    </div>
  );
}

function KitchenDisplay({ data, setData, onLogout }) {
  useTheme();
  const [now, setNow] = useState(Date.now());
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [stationView, setStationView] = useState("all");
  const [kitchenTab, setKitchenTab] = useState("orders"); // orders | bump | done | inventory | stats
  const [bumpIdx, setBumpIdx] = useState(0);

  // Tick every 5s for snappy timers
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(id);
  }, []);

  const active = data.orders.filter(o => ["pending", "preparing", "served"].includes(o.status));
  const queue = data.orders.filter(o => ["pending", "preparing"].includes(o.status));
  const cooking = queue.filter(o => getOrderStage(o) === "cooking");
  const plating = queue.filter(o => getOrderStage(o) === "plating");
  const readyToServe = data.orders.filter(o => o.status === "served" && getOrderStage(o) === "ready");
  const doneToday = data.orders.filter(o => o.status === "paid" && (o.createdAt || "").startsWith(today()));

  function priorityScore(o) {
    const age = Math.floor((now - new Date(o.createdAt).getTime()) / 60000);
    const est = getOrderEstimate(o, data.menu);
    const vip = isVip(o, data.customers) ? -1000 : 0;
    const overdue = age > est ? -500 : 0;
    return vip + overdue - age;
  }

  const stations = getStations(data.restaurant);
  const activeStations = stations.filter(s => s.active !== false);

  let shown = [...queue];
  if (filter !== "all") shown = shown.filter(o => getOrderStage(o) === filter);
  if (stationView !== "all") {
    shown = shown.filter(o => o.items.some(item => {
      const routed = routeItemToStation(item, data.menu, data.restaurant);
      return routed?.id === stationView;
    }));
  }
  shown.sort((a, b) => {
    if (sortBy === "priority") return priorityScore(a) - priorityScore(b);
    if (sortBy === "time") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "table") {
      const ta = data.tables.find(t => t.id === a.tableId)?.number || 99;
      const tb = data.tables.find(t => t.id === b.tableId)?.number || 99;
      return ta - tb;
    }
    return 0;
  });

  const vipCount = queue.filter(o => isVip(o, data.customers)).length;
  const overdueCount = queue.filter(o => {
    const age = Math.floor((now - new Date(o.createdAt).getTime()) / 60000);
    const est = getOrderEstimate(o, data.menu);
    return age > est;
  }).length;
  const allergyCount = queue.filter(o =>
    [o.note, ...(o.items || []).map(i => i.note)].some(n => hasAllergyFlag(n))
  ).length;

  const stages = [
    { key: "all", label: "All", count: queue.length, color: C.cream },
    { key: "queued", label: "⏳ Queued", count: queue.filter(o => getOrderStage(o) === "queued").length, color: C.muted },
    { key: "cooking", label: "🔥 Cooking", count: cooking.length, color: C.orange },
    { key: "plating", label: "🍽️ Plating", count: plating.length, color: C.purple },
    { key: "ready", label: "✅ Ready", count: readyToServe.length, color: C.green },
  ];

  // Avg ticket time for done today
  const avgTicketMin = (() => {
    const timed = doneToday.filter(o => o.kitchenStartedAt && o.kitchenDoneAt);
    if (!timed.length) return null;
    const total = timed.reduce((s, o) => s + (new Date(o.kitchenDoneAt) - new Date(o.kitchenStartedAt)) / 60000, 0);
    return Math.round(total / timed.length);
  })();

  // Low stock ingredients
  const lowStock = getLowStockIngredients(data.ingredients || []);

  const kitchenTabs = [
    { id: "orders", label: "🍳 Orders", badge: queue.length },
    { id: "bump", label: "⚡ Bump", badge: shown.length },
    { id: "done", label: "✅ Done Today", badge: doneToday.length },
    { id: "inventory", label: "📦 Inventory", badge: lowStock.length || null },
    { id: "stats", label: "📊 Stats" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      <style>{makeCss(C)}</style>

      {/* Top header */}
      <div style={{ padding: "12px 18px 0", background: C.surface, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
          <div>
            <div className="playfair" style={{ fontSize: 22, color: C.accent }}>🍳 Kitchen Display</div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>
              {data.restaurant.name} · {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              {vipCount > 0 && <span style={{ color: C.purple, marginLeft: 8, fontWeight: 700 }}>· 👑 {vipCount} VIP</span>}
              {overdueCount > 0 && <span style={{ color: C.red, marginLeft: 8, fontWeight: 700 }}>· 🔴 {overdueCount} overdue</span>}
              {allergyCount > 0 && <span style={{ color: C.red, marginLeft: 8, fontWeight: 700 }}>· ⚠️ {allergyCount} allergy</span>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* Quick stats pills */}
            {[
              { label: "Queue", val: queue.length, color: C.orange },
              { label: "Done", val: doneToday.length, color: C.green },
            ].map(s => (
              <div key={s.label} style={{ background: s.color + "18", border: `1px solid ${s.color}33`, borderRadius: 20, padding: "3px 12px", fontSize: 12 }}>
                <span style={{ fontWeight: 700, color: s.color }}>{s.val}</span>
                <span style={{ color: C.muted, marginLeft: 4 }}>{s.label}</span>
              </div>
            ))}
            <Btn variant="ghost" size="sm" onClick={onLogout}>Sign Out</Btn>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 2 }}>
          {kitchenTabs.map(kt => (
            <button key={kt.id} onClick={() => setKitchenTab(kt.id)} style={{
              padding: "8px 16px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700,
              background: kitchenTab === kt.id ? C.bg : "transparent",
              color: kitchenTab === kt.id ? C.accent : C.muted,
              borderBottom: kitchenTab === kt.id ? `2px solid ${C.accent}` : "2px solid transparent",
              borderRadius: "8px 8px 0 0", position: "relative", transition: "all .12s",
            }}>
              {kt.label}
              {kt.badge ? <span style={{ marginLeft: 5, background: C.accent, color: C.bg, borderRadius: 20, padding: "0 6px", fontSize: 10, fontWeight: 700 }}>{kt.badge}</span> : null}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>

        {/* ── ORDERS TAB ── */}
        {kitchenTab === "orders" && <>
          {/* Stage filter */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
            {stages.map(s => (
              <button key={s.key} onClick={() => setFilter(s.key)} style={{
                padding: "5px 13px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
                background: filter === s.key ? s.color + "33" : C.border + "44",
                color: filter === s.key ? s.color : C.muted,
                outline: filter === s.key ? `2px solid ${s.color}55` : "none",
              }}>
                {s.label}
                <span style={{ marginLeft: 5, background: s.color + "22", color: s.color, borderRadius: 20, padding: "0 6px", fontSize: 11 }}>{s.count}</span>
              </button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, background: C.surface, color: C.cream, border: `1px solid ${C.border}`, width: "auto" }}>
                <option value="priority">Sort: Priority</option>
                <option value="time">Sort: Oldest first</option>
                <option value="table">Sort: Table</option>
              </select>
            </div>
          </div>

          {/* Station filter */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: .5 }}>STATION:</span>
            <button onClick={() => setStationView("all")} style={{ padding: "4px 11px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer", background: stationView === "all" ? C.cream + "22" : "transparent", color: stationView === "all" ? C.cream : C.muted, border: `1px solid ${stationView === "all" ? C.cream + "55" : C.border}` }}>🍽️ All</button>
            {activeStations.map(st => {
              const cnt = queue.filter(o => o.items.some(item => routeItemToStation(item, data.menu, data.restaurant)?.id === st.id)).length;
              return (
                <button key={st.id} onClick={() => setStationView(st.id)} style={{ padding: "4px 11px", borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: "pointer", background: stationView === st.id ? st.color + "33" : "transparent", color: stationView === st.id ? st.color : C.muted, border: `1px solid ${stationView === st.id ? st.color + "55" : C.border}` }}>
                  {st.emoji} {st.name} {cnt > 0 && <span style={{ background: st.color + "22", color: st.color, borderRadius: 20, padding: "0 5px", fontSize: 10, marginLeft: 3 }}>{cnt}</span>}
                </button>
              );
            })}
          </div>

          {/* Stage legend */}
          <div style={{ display: "flex", gap: 4, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
            {DISH_STAGES.map((s, i) => {
              const st = STAGE_COLORS(C)[s];
              return (
                <React.Fragment key={s}>
                  <span style={{ background: st.bg, color: st.text, fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>{st.icon} {st.label}</span>
                  {i < DISH_STAGES.length - 1 && <span style={{ color: C.muted, fontSize: 12 }}>→</span>}
                </React.Fragment>
              );
            })}
            <span style={{ color: C.muted, fontSize: 10, marginLeft: 8 }}>tap → to advance</span>
          </div>

          {shown.length === 0
            ? <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
                <div className="playfair" style={{ fontSize: 20 }}>{filter === "all" ? "All caught up!" : `No orders in ${filter} stage`}</div>
              </div>
            : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
                {shown.map(o => <KitchenOrderCard key={o.id} order={o} data={data} setData={setData} now={now} />)}
              </div>
          }

          {readyToServe.length > 0 && filter === "all" && (
            <div style={{ marginTop: 20, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 10 }}>✅ READY TO SERVE ({readyToServe.length})</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {readyToServe.map(o => {
                  const tbl = data.tables.find(t => t.id === o.tableId);
                  return (
                    <div key={o.id} style={{ background: C.green + "18", border: `1px solid ${C.green}44`, borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 700, color: C.green }}>Table {tbl?.number || "?"}</span>
                      <span style={{ color: C.muted, fontSize: 11 }}>{o.items?.length} dish(es)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>}

        {/* ── BUMP MODE TAB ── */}
        {kitchenTab === "bump" && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div className="playfair" style={{ fontSize: 20 }}>⚡ Bump Screen</div>
              <div style={{ color: C.muted, fontSize: 12 }}>Focus mode — one order at a time</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => setBumpIdx(i => Math.max(0, i - 1))} disabled={bumpIdx === 0} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.cream, borderRadius: 8, padding: "6px 14px", cursor: bumpIdx === 0 ? "not-allowed" : "pointer", opacity: bumpIdx === 0 ? 0.4 : 1 }}>← Prev</button>
              <span style={{ color: C.muted, fontSize: 13, minWidth: 60, textAlign: "center" }}>{shown.length > 0 ? `${bumpIdx + 1} / ${shown.length}` : "No orders"}</span>
              <button onClick={() => setBumpIdx(i => Math.min(shown.length - 1, i + 1))} disabled={bumpIdx >= shown.length - 1} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.cream, borderRadius: 8, padding: "6px 14px", cursor: bumpIdx >= shown.length - 1 ? "not-allowed" : "pointer", opacity: bumpIdx >= shown.length - 1 ? 0.4 : 1 }}>Next →</button>
            </div>
          </div>
          {shown.length === 0
            ? <div style={{ textAlign: "center", padding: 80, color: C.muted }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
                <div className="playfair" style={{ fontSize: 22 }}>Queue is empty!</div>
              </div>
            : <div style={{ maxWidth: 560, margin: "0 auto" }}>
                <KitchenOrderCard order={shown[Math.min(bumpIdx, shown.length - 1)]} data={data} setData={setData} now={now} bumpMode />
                {/* Mini queue strip */}
                {shown.length > 1 && (
                  <div style={{ marginTop: 18 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 8 }}>UP NEXT</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {shown.slice(0, 6).map((o, idx) => {
                        const tbl = data.tables.find(t => t.id === o.tableId);
                        const age = Math.floor((now - new Date(o.createdAt).getTime()) / 60000);
                        const isActive = idx === bumpIdx;
                        return (
                          <button key={o.id} onClick={() => setBumpIdx(idx)} style={{
                            background: isActive ? C.accent + "22" : C.surface,
                            border: `2px solid ${isActive ? C.accent : C.border}`,
                            borderRadius: 10, padding: "8px 14px", cursor: "pointer", textAlign: "center",
                          }}>
                            <div style={{ fontWeight: 700, color: isActive ? C.accent : C.cream }}>T{tbl?.number || "?"}</div>
                            <div style={{ fontSize: 10, color: C.muted }}>{age}m · {o.items.length} items</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
          }
        </>}

        {/* ── DONE TODAY TAB ── */}
        {kitchenTab === "done" && <>
          <div style={{ display: "flex", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
            {[
              { label: "Orders Done", val: doneToday.length, color: C.green, icon: "✅" },
              { label: "Covers", val: doneToday.reduce((s, o) => s + (o.items?.length || 0), 0), color: C.blue, icon: "🍽️" },
              { label: "Avg Ticket Time", val: avgTicketMin !== null ? `${avgTicketMin}m` : "—", color: C.accent, icon: "⏱" },
              { label: "Revenue", val: inr(doneToday.reduce((s, o) => s + (o.total || 0), 0)), color: C.purple, icon: "💰" },
            ].map(s => (
              <div key={s.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", minWidth: 130 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
          {doneToday.length === 0
            ? <div style={{ color: C.muted, textAlign: "center", padding: 48 }}>No completed orders yet today</div>
            : <div style={{ display: "grid", gap: 8 }}>
                {[...doneToday].reverse().map(o => {
                  const tbl = data.tables.find(t => t.id === o.tableId);
                  const ticketMin = o.kitchenStartedAt && o.kitchenDoneAt
                    ? Math.round((new Date(o.kitchenDoneAt) - new Date(o.kitchenStartedAt)) / 60000)
                    : null;
                  return (
                    <div key={o.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, color: C.green, minWidth: 60 }}>Table {tbl?.number || "?"}</span>
                      <span style={{ color: C.muted, fontSize: 12 }}>{o.items?.map(i => `${i.name}×${i.qty}`).join(", ")}</span>
                      <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                        {ticketMin !== null && <span style={{ fontSize: 11, color: ticketMin > 25 ? C.red : C.green, fontWeight: 700 }}>⏱ {ticketMin}m</span>}
                        <span style={{ fontSize: 11, color: C.muted }}>{fmtTime(o.createdAt)}</span>
                        <span style={{ color: C.accent, fontWeight: 700 }}>{inr(o.total)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
          }
        </>}

        {/* ── INVENTORY TAB ── */}
        {kitchenTab === "inventory" && <>
          <div className="playfair" style={{ fontSize: 20, marginBottom: 14 }}>📦 Ingredient Stock</div>
          {lowStock.length > 0 && (
            <div style={{ background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: C.red, fontSize: 13, marginBottom: 6 }}>⚠️ Low Stock — Tell manager ASAP</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {lowStock.map(i => (
                  <span key={i.id} style={{ background: C.red + "22", color: C.red, fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>
                    {i.name}: {i.stock}{i.unit}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
            {(data.ingredients || []).map(ing => {
              const isLow = ing.lowStockAt != null && ing.stock <= ing.lowStockAt;
              const isOut = ing.stock === 0;
              const pct = ing.lowStockAt ? Math.min(100, Math.round((ing.stock / (ing.lowStockAt * 3)) * 100)) : 100;
              return (
                <div key={ing.id} style={{ background: C.card, border: `1px solid ${isOut ? C.red : isLow ? C.orange : C.border}`, borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{ing.name}</div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: isOut ? C.red : isLow ? C.orange : C.green }}>
                      {isOut ? "OUT" : `${ing.stock}${ing.unit}`}
                    </span>
                  </div>
                  <div style={{ background: C.border, borderRadius: 4, height: 4 }}>
                    <div style={{ height: 4, borderRadius: 4, width: `${pct}%`, background: isOut ? C.red : isLow ? C.orange : C.green, transition: "width .3s" }} />
                  </div>
                  {isLow && !isOut && <div style={{ fontSize: 10, color: C.orange, marginTop: 4 }}>Low — threshold: {ing.lowStockAt}{ing.unit}</div>}
                </div>
              );
            })}
            {(data.ingredients || []).length === 0 && <div style={{ color: C.muted, fontSize: 13, gridColumn: "1/-1", textAlign: "center", padding: 32 }}>No ingredients tracked yet</div>}
          </div>
        </>}

        {/* ── STATS TAB ── */}
        {kitchenTab === "stats" && <>
          <div className="playfair" style={{ fontSize: 20, marginBottom: 16 }}>📊 Kitchen Stats</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
            {[
              { label: "Orders in Queue", val: queue.length, color: C.orange, icon: "🍳" },
              { label: "Cooking Now", val: cooking.length, color: C.red, icon: "🔥" },
              { label: "Plating", val: plating.length, color: C.purple, icon: "🍽️" },
              { label: "Ready to Serve", val: readyToServe.length, color: C.green, icon: "✅" },
              { label: "Done Today", val: doneToday.length, color: C.blue, icon: "💯" },
              { label: "Allergy Orders", val: allergyCount, color: allergyCount > 0 ? C.red : C.green, icon: "⚠️" },
              { label: "Overdue", val: overdueCount, color: overdueCount > 0 ? C.red : C.green, icon: "🔴" },
              { label: "VIP Tables", val: vipCount, color: C.purple, icon: "👑" },
            ].map(s => (
              <div key={s.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Top dishes today */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🏆 Top Dishes Today</div>
            {(() => {
              const map = {};
              doneToday.forEach(o => o.items.forEach(i => { map[i.name] = (map[i.name] || 0) + i.qty; }));
              const top = Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 8);
              if (!top.length) return <div style={{ color: C.muted, fontSize: 12 }}>No data yet</div>;
              const max = top[0][1];
              return top.map(([name, qty]) => (
                <div key={name} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{name}</span>
                    <span style={{ color: C.accent, fontWeight: 700 }}>{qty}×</span>
                  </div>
                  <div style={{ background: C.border, borderRadius: 4, height: 6 }}>
                    <div style={{ height: 6, borderRadius: 4, width: `${Math.round(qty / max * 100)}%`, background: C.accent }} />
                  </div>
                </div>
              ));
            })()}
          </div>
        </>}

      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────

// ── STOCK ALERT BANNER ───────────────────────────────────────
function StockAlertBanner({menu}){
  useTheme();
  const [dismissed,setDismissed]=useState(false);
  const low=menu.filter(m=>m.stock!=null && m.stock<=( m.lowStockAt||5));
  if(!low.length||dismissed)return null;
  const outOf=low.filter(m=>m.stock===0);
  return <div style={{background:C.red+"18",border:`1px solid ${C.red}44`,borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
      <span style={{fontSize:16}}>🔔</span>
      <span style={{fontWeight:600,color:C.red,fontSize:13}}>
        {outOf.length>0?`${outOf.length} item(s) out of stock · `:""}{low.length} item(s) low on stock
      </span>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {low.map(m=>(
          <span key={m.id} style={{background:m.stock===0?C.red+"33":C.orange+"22",color:m.stock===0?C.red:C.orange,fontSize:11,fontWeight:600,padding:"1px 8px",borderRadius:20}}>
            {m.name}: {m.stock===0?"OUT":m.stock+" left"}
          </span>
        ))}
      </div>
    </div>
    <button onClick={()=>setDismissed(true)} style={{background:"none",color:C.muted,fontSize:15,flexShrink:0}}>✕</button>
  </div>;
}


// ── SHIFT SUMMARY REPORT ─────────────────────────────────────
function ShiftSummary({data, onClose}){
  useTheme();
  const [range, setRange] = useState("today"); // today | week | month | custom
  const [from, setFrom] = useState(today());
  const [to, setTo]     = useState(today());

  const dateFrom = range==="today"  ? today()
                 : range==="week"   ? new Date(Date.now()-6*864e5).toISOString().split("T")[0]
                 : range==="month"  ? new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().split("T")[0]
                 : from;
  const dateTo = range==="custom" ? to : today();

  const orders = data.orders.filter(o=>{
    const d = (o.createdAt||"").split("T")[0];
    return d>=dateFrom && d<=dateTo;
  });
  const paid     = orders.filter(o=>o.status==="paid");
  const revenue  = paid.reduce((s,o)=>s+o.total,0);
  const tax      = paid.reduce((s,o)=>s+(o.tax||0),0);
  const disc     = paid.reduce((s,o)=>s+(o.discount||0),0);
  const avgOrder = paid.length ? Math.round(revenue/paid.length) : 0;
  const cancelled= orders.filter(o=>o.status==="cancelled").length;
  const expenses = data.expenses.filter(e=>{const d=(e.date||"");return d>=dateFrom&&d<=dateTo;}).reduce((s,e)=>s+ +e.amount,0);
  const profit   = revenue - expenses;

  // top items
  const itemMap={};
  paid.forEach(o=>o.items.forEach(i=>{itemMap[i.name]=(itemMap[i.name]||{qty:0,rev:0});itemMap[i.name].qty+=i.qty;itemMap[i.name].rev+=i.qty*i.price;}));
  const topItems=Object.entries(itemMap).sort((a,b)=>b[1].qty-a[1].qty).slice(0,5);

  // orders by status
  const byStatus={pending:0,preparing:0,served:0,paid:paid.length,cancelled};
  orders.forEach(o=>{if(o.status!=="paid"&&o.status!=="cancelled")byStatus[o.status]=(byStatus[o.status]||0)+1;});

  const printReport = () => {
    const r = data.restaurant;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Shift Summary</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;color:#111;padding:28px;max-width:600px;margin:0 auto}
.toolbar{position:fixed;top:0;left:0;right:0;background:#1a1a1a;color:#fff;padding:8px 16px;display:flex;gap:10px;align-items:center;z-index:999;font-size:13px}
.toolbar button{background:#f5a623;color:#000;border:none;border-radius:5px;padding:5px 14px;font-size:12px;font-weight:700;cursor:pointer}
.toolbar .close-btn{background:#555;color:#fff;margin-left:auto}
.content{margin-top:52px}
h1{font-size:22px;margin-bottom:2px}h2{font-size:15px;margin:14px 0 6px;border-bottom:1px solid #ddd;padding-bottom:4px}
.row{display:flex;justify-content:space-between;padding:4px 0;font-size:13px;border-bottom:1px solid #f0f0f0}
.big{font-size:22px;font-weight:700;color:#f5a623}.sub{font-size:11px;color:#888;margin-top:2px}
.grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px}
.stat{background:#f9f9f9;border-radius:6px;padding:10px;text-align:center}
@media print{.toolbar{display:none}.content{margin-top:0}@page{margin:.6cm}}
</style></head><body>
<div class="toolbar">
  <span style="font-weight:700;color:#f5a623">📅 Shift Summary</span>
  <button onclick="window.print()">🖨️ Print</button>
  <button onclick="window.print()" title="Save as PDF via print dialog">💾 Save PDF</button>
  <button class="close-btn" onclick="window.close()">✕ Close</button>
</div>
<div class="content">
<div style="text-align:center;margin-bottom:18px;padding-bottom:14px;border-bottom:2px solid #f5a623">
<div style="font-size:20px;font-weight:700;color:#f5a623">${r.name}</div>
<h1>Shift Summary Report</h1>
<div style="font-size:12px;color:#888">${dateFrom===dateTo?dateFrom:dateFrom+" to "+dateTo}</div></div>
<div class="grid">
  <div class="stat"><div class="big">${revenue.toLocaleString("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0})}</div><div class="sub">Revenue</div></div>
  <div class="stat"><div class="big">${paid.length}</div><div class="sub">Orders Paid</div></div>
  <div class="stat"><div class="big">${revenue.toLocaleString("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0})}</div><div class="sub">Avg Order Value</div></div>
</div>
<h2>Financials</h2>
<div class="row"><span>Gross Revenue</span><span>₹${revenue.toLocaleString("en-IN")}</span></div>
<div class="row"><span>Tax Collected</span><span>₹${tax.toLocaleString("en-IN")}</span></div>
<div class="row"><span>Discounts Given</span><span>-₹${disc.toLocaleString("en-IN")}</span></div>
<div class="row"><span>Expenses</span><span>-₹${expenses.toLocaleString("en-IN")}</span></div>
<div class="row" style="font-weight:700;font-size:15px"><span>Net Profit</span><span style="color:${profit>=0?"#4caf7d":"#e05a4e"}">₹${profit.toLocaleString("en-IN")}</span></div>
<h2>Orders</h2>
<div class="row"><span>Total Orders</span><span>${orders.length}</span></div>
<div class="row"><span>Paid</span><span>${paid.length}</span></div>
<div class="row"><span>Cancelled</span><span>${cancelled}</span></div>
<div class="row"><span>Average Order Value</span><span>₹${avgOrder.toLocaleString("en-IN")}</span></div>
<h2>Top Items</h2>
${topItems.map(([name,{qty,rev}])=>`<div class="row"><span>${name}</span><span>${qty} sold · ₹${rev.toLocaleString("en-IN")}</span></div>`).join("")}
<div style="text-align:center;font-size:11px;color:#aaa;margin-top:20px;padding-top:12px;border-top:1px solid #eee">
Generated ${new Date().toLocaleString("en-IN")} · ${r.name}</div>
</div></body></html>`;
    const w=window.open("","_blank","width=700,height=900,noopener");
    if(w){w.document.open();w.document.write(html);w.document.close();}
    else alert("Allow pop-ups to print.");
  };

  const rangeLabels={today:"Today",week:"Last 7 Days",month:"This Month",custom:"Custom"};
  const statRow=(label,value,color=C.cream)=><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}22`,fontSize:13}}>
    <span style={{color:C.muted}}>{label}</span><span style={{fontWeight:600,color}}>{value}</span>
  </div>;

  return <Modal title="📅 Shift Summary" onClose={onClose} wide>
    {/* Range picker */}
    <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
      {Object.entries(rangeLabels).map(([k,l])=>(
        <button key={k} onClick={()=>setRange(k)} style={{padding:"5px 12px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",background:range===k?C.accent+"22":"transparent",color:range===k?C.accent:C.muted,border:`1px solid ${range===k?C.accent:C.border}`}}>{l}</button>
      ))}
      {range==="custom"&&<div style={{display:"flex",gap:6,alignItems:"center",marginTop:4,width:"100%"}}>
        <input type="date" value={from} onChange={e=>setFrom(e.target.value)} style={{fontSize:12,flex:1}} />
        <span style={{color:C.muted,fontSize:12}}>to</span>
        <input type="date" value={to} onChange={e=>setTo(e.target.value)} style={{fontSize:12,flex:1}} />
      </div>}
    </div>

    {/* Big numbers */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
      {[
        {label:"Revenue", value:inr(revenue), color:C.accent},
        {label:"Orders Paid", value:paid.length, color:C.green},
        {label:"Avg Order", value:inr(avgOrder), color:C.blue},
      ].map(s=><div key={s.label} style={{background:C.surface,borderRadius:9,padding:"10px 12px",textAlign:"center"}}>
        <div style={{fontSize:18,fontWeight:700,color:s.color}}>{s.value}</div>
        <div style={{fontSize:10,color:C.muted,marginTop:2}}>{s.label}</div>
      </div>)}
    </div>

    {/* Financials */}
    <div style={{fontWeight:600,fontSize:12,color:C.muted,marginBottom:6,letterSpacing:.4}}>FINANCIALS</div>
    <Card style={{marginBottom:12,padding:"10px 14px"}}>
      {statRow("Gross Revenue", inr(revenue))}
      {statRow("Tax Collected", inr(tax))}
      {statRow("Discounts Given", "-"+inr(disc), C.orange)}
      {statRow("Expenses", "-"+inr(expenses), C.red)}
      <div style={{display:"flex",justifyContent:"space-between",paddingTop:8,marginTop:4,fontWeight:700,fontSize:14}}>
        <span>Net Profit</span>
        <span style={{color:profit>=0?C.green:C.red}}>{inr(profit)}</span>
      </div>
    </Card>

    {/* Orders breakdown */}
    <div style={{fontWeight:600,fontSize:12,color:C.muted,marginBottom:6,letterSpacing:.4}}>ORDERS</div>
    <Card style={{marginBottom:12,padding:"10px 14px"}}>
      {statRow("Total Orders", orders.length)}
      {statRow("Paid", paid.length, C.green)}
      {statRow("Cancelled", cancelled, cancelled>0?C.red:C.muted)}
      {statRow("Avg Order Value", inr(avgOrder))}
    </Card>

    {/* Top items */}
    {topItems.length>0&&<>
      <div style={{fontWeight:600,fontSize:12,color:C.muted,marginBottom:6,letterSpacing:.4}}>TOP ITEMS</div>
      <Card style={{marginBottom:14,padding:"10px 14px"}}>
        {topItems.map(([name,{qty,rev}])=>statRow(name, `${qty} sold · ${inr(rev)}`, C.accent))}
      </Card>
    </>}

    <div style={{display:"flex",gap:8}}>
      <Btn onClick={printReport}>🖨️ Print Report</Btn>
      <Btn variant="ghost" onClick={onClose}>Close</Btn>
    </div>
  </Modal>;
}

function Dashboard({data,perms}){
  useTheme();
  const [showShift,setShowShift]=useState(false);
  const todayO=data.orders.filter(o=>o.createdAt.startsWith(today()));
  const todayRev=todayO.filter(o=>o.status==="paid").reduce((s,o)=>s+o.total,0);
  const occupied=data.tables.filter(t=>t.status==="occupied").length;
  const active=data.orders.filter(o=>["pending","preparing"].includes(o.status)).length;
  const unpaidExp=data.expenses.filter(e=>!e.paid).reduce((s,e)=>s+ +e.amount,0);
  const catSales={};data.orders.forEach(o=>o.items.forEach(i=>{catSales[i.name]=(catSales[i.name]||0)+i.qty;}));
  const top=Object.entries(catSales).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxQ=top[0]?.[1]||1;
  const sc={served:C.green,preparing:C.accent,pending:C.muted,paid:C.blue,cancelled:C.red};
  const todayRes=data.reservations.filter(r=>r.date===today()).length;
  return <div className="fade-in">
    <StockAlertBanner menu={data.menu} />
    {showShift&&<ShiftSummary data={data} onClose={()=>setShowShift(false)} />}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
      <div className="playfair" style={{fontSize:26}}>Good {new Date().getHours()<12?"Morning":new Date().getHours()<17?"Afternoon":"Evening"} 👋</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <ExportMenu
          label="Export"
          csvRows={data.orders.map(o=>({date:o.createdAt.split("T")[0],customer:o.customerName||"",table:data.tables.find(t=>t.id===o.tableId)?.number||"",items:o.items.map(i=>`${i.name}×${i.qty}`).join("; "),total:o.total,status:o.status}))}
          csvName="dashboard_orders"
          printHtml={`<div class="title">${data.restaurant.name} — Dashboard Summary</div><div class="sub">Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Date</th><th>Customer</th><th>Table</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>${data.orders.map(o=>`<tr><td>${o.createdAt.split("T")[0]}</td><td>${o.customerName||"—"}</td><td>${data.tables.find(t=>t.id===o.tableId)?.number||"—"}</td><td>${o.items.map(i=>i.name+"×"+i.qty).join(", ")}</td><td>₹${o.total.toLocaleString("en-IN")}</td><td>${o.status}</td></tr>`).join("")}</tbody></table>`}
          printName="Dashboard Orders"
          wordHtml={`<div class="title">${data.restaurant.name} — Dashboard Summary</div><div class="sub">Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Date</th><th>Customer</th><th>Table</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>${data.orders.map(o=>`<tr><td>${o.createdAt.split("T")[0]}</td><td>${o.customerName||"—"}</td><td>${data.tables.find(t=>t.id===o.tableId)?.number||"—"}</td><td>${o.items.map(i=>i.name+"×"+i.qty).join(", ")}</td><td>₹${o.total.toLocaleString("en-IN")}</td><td>${o.status}</td></tr>`).join("")}</tbody></table>`}
          wordName="Dashboard_Orders"
        />
        {perms.canSeeFinancials&&<Btn variant="ghost" size="sm" onClick={()=>setShowShift(true)}>📅 Shift Report</Btn>}
      </div>
    </div>
    <div style={{color:C.muted,marginBottom:18,fontSize:12}}>{data.restaurant.name} · {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:10,marginBottom:16}}>
      {perms.canSeeFinancials&&<StatCard icon="💰" label="Today's Revenue" value={inr(todayRev)} sub={`${todayO.length} orders`} color={C.accent} />}
      <StatCard icon="🪑" label="Tables Occupied" value={`${occupied}/${data.tables.length}`} sub="right now" color={C.blue} />
      <StatCard icon="📋" label="Kitchen Queue" value={active} sub="pending/preparing" color={C.purple} />
      <StatCard icon="📅" label="Today's Bookings" value={todayRes} sub="reservations" color={C.green} />
      {perms.canSeeFinancials&&unpaidExp>0&&<StatCard icon="⚠️" label="Unpaid Expenses" value={inr(unpaidExp)} sub="outstanding" color={C.red} />}
    </div>
    {perms.canSeeFinancials&&data.restaurant.dailyGoal>0&&(()=>{
      const goal=data.restaurant.dailyGoal;
      const progress=Math.min(100,Math.round(todayRev/goal*100));
      const color=progress>=100?C.green:progress>=60?C.accent:C.blue;
      return <Card style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontWeight:600,fontSize:14}}>🎯 Daily Revenue Goal</div>
          <div style={{fontSize:12,color:C.muted}}>{inr(todayRev)} <span style={{color:C.muted}}>/ {inr(goal)}</span></div>
        </div>
        <div style={{background:C.border,borderRadius:6,height:10,marginBottom:6,overflow:"hidden"}}>
          <div style={{background:color,borderRadius:6,height:10,width:`${progress}%`,transition:"width .6s ease"}} />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
          <span style={{color,fontWeight:700}}>{progress}% achieved</span>
          <span style={{color:C.muted}}>{progress<100?`${inr(goal-todayRev)} to go`:"🎉 Goal reached!"}</span>
        </div>
      </Card>;
    })()}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
      <Card>
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>🔥 Recent Orders</div>
        {data.orders.length===0?<div style={{color:C.muted,fontSize:13}}>No orders yet.</div>:[...data.orders].reverse().slice(0,6).map(o=>{
          const tbl=data.tables.find(t=>t.id===o.tableId);
          return <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
            <div><div style={{fontSize:13,fontWeight:500}}>{o.customerName||`Table ${tbl?.number}`}</div><div style={{fontSize:11,color:C.muted}}>{fmtTime(o.createdAt)}</div></div>
            <div style={{textAlign:"right",display:"flex",gap:8,alignItems:"center"}}>
              {perms.canSeeFinancials&&<span style={{color:C.accent,fontWeight:600,fontSize:13}}>{inr(o.total)}</span>}
              <Badge label={o.status} color={sc[o.status]} />
            </div>
          </div>;
        })}
      </Card>
      <Card>
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>🏆 Top Dishes</div>
        {top.length===0?<div style={{color:C.muted,fontSize:13}}>No orders yet.</div>:top.map(([name,qty])=>(
          <div key={name} style={{marginBottom:9}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span>{name}</span><span style={{color:C.accent}}>{qty} sold</span></div>
            <div style={{background:C.border,borderRadius:4,height:4}}><div style={{background:C.accent,borderRadius:4,height:4,width:`${pct(qty,maxQ)}%`,transition:"width .5s"}} /></div>
          </div>
        ))}
      </Card>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Card>
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>📅 Upcoming Reservations</div>
        {data.reservations.filter(r=>r.date>=today()).slice(0,4).map(r=>(
          <div key={r.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
            <div><div style={{fontWeight:500}}>{r.name}</div><div style={{color:C.muted,fontSize:11}}>{r.date} · {r.time} · {r.guests} guests</div></div>
            <Badge label={r.status} color={{confirmed:C.green,pending:C.accent,cancelled:C.red,seated:C.blue}[r.status]} />
          </div>
        ))}
        {data.reservations.filter(r=>r.date>=today()).length===0&&<div style={{color:C.muted,fontSize:13}}>No upcoming reservations.</div>}
      </Card>
      <Card>
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>👥 Top Customers</div>
        {[...data.customers].sort((a,b)=>b.totalSpent-a.totalSpent).slice(0,4).map(c=>(
          <div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:C.accent,fontWeight:700,flexShrink:0}}>{c.name[0]}</div>
              <div><div style={{fontWeight:500}}>{c.name}</div><div style={{color:C.muted,fontSize:11}}>{c.visits} visits</div></div>
            </div>
            {perms.canSeeFinancials&&<span style={{color:C.accent,fontWeight:600}}>{inr(c.totalSpent)}</span>}
          </div>
        ))}
      </Card>
    </div>
  </div>;
}

// ── BILL MODAL ────────────────────────────────────────────────
function BillModal({order:o,data,setData,onClose,sess}){
  useTheme();
  const tbl=data.tables.find(t=>t.id===o.tableId);
  const r=data.restaurant||{};
  const subtotal=o.items.reduce((s,i)=>s+i.qty*i.price,0);
  // Smart tax: per-category CGST/SGST
  const taxBreakdown=calcOrderTax(o.items,data.menu,r.taxConfig);
  const cgst=taxBreakdown.cgst;
  const sgst=taxBreakdown.sgst;
  const tax=cgst+sgst;
  const disc=o.discount||0;
  const [payMode,setPayMode]=useState(o.paymentMode||'cash');
  // Service charge: use restaurant default % if enabled, else 0
  const scDefault=r.serviceChargeEnabled ? Math.round(subtotal*(r.serviceChargePct||5)/100) : 0;
  const [serviceCharge,setServiceCharge]=useState(o.serviceCharge!=null?o.serviceCharge:scDefault);
  const [scEnabled,setScEnabled]=useState(o.serviceCharge!=null?o.serviceCharge>0:!!r.serviceChargeEnabled);
  const effectiveSc=scEnabled?(+serviceCharge||0):0;
  const [tip,setTip]=useState(o.tip||0);
  const [splitDetails,setSplitDetails]=useState(o.splitDetails||'');
  const total=subtotal+tax-disc+effectiveSc+(+tip||0);
  const payModes=[{id:'cash',icon:'💵',label:'Cash'},{id:'card',icon:'💳',label:'Card'},{id:'upi',icon:'📱',label:'UPI'},{id:'split',icon:'🔀',label:'Split'}];
  const confirmPay=()=>{
    const invoiceNo=o.invoiceNo||genInvoiceNo(data.orders);
    const paid={...o,status:'paid',paymentMode:payMode,serviceCharge:effectiveSc,tip:+tip||0,splitDetails:payMode==='split'?splitDetails:'',tax,cgst,sgst,total,invoiceNo,paidAt:new Date().toISOString()};
    setData(d=>({...d,
      orders:d.orders.map(x=>x.id===o.id?paid:x),
      tables:d.tables.map(t=>{
        if(t.id!==o.tableId)return t;
        const remaining=d.orders.filter(x=>x.id!==o.id&&x.tableId===t.id&&['pending','preparing','served'].includes(x.status));
        if(remaining.length===0)return{...t,status:'available',occupiedAt:null,sessionStart:null,mergedWith:null};
        return t;
      }),
    }));
    addLog(sess?.name||'Staff','Payment received',`${invoiceNo} · ${inr(total)} via ${payMode}`);
    printInvoice(paid,{...data,orders:data.orders.map(x=>x.id===o.id?paid:x)});
    onClose();
  };
  // Tax breakdown by category for display
  const taxByCategory=useMemo(()=>{
    const cats={};
    o.items.forEach(item=>{
      const m=data.menu.find(x=>x.id===item.menuId);
      const cat=m?.category||"Other";
      const isBev=BEVERAGE_CATS.some(c=>c.toLowerCase()===cat.toLowerCase());
      const group=isBev?"Beverages":"Food";
      if(!cats[group])cats[group]={subtotal:0,cgst:0,sgst:0,cgstRate:0,sgstRate:0};
      const {cgst:cr,sgst:sr}=getTaxRates(cat,r.taxConfig);
      const line=item.qty*item.price;
      cats[group].subtotal+=line;
      cats[group].cgst+=Math.round(line*cr/100);
      cats[group].sgst+=Math.round(line*sr/100);
      cats[group].cgstRate=cr;cats[group].sgstRate=sr;
    });
    return Object.entries(cats);
  },[o.items,data.menu,r.taxConfig]);
  return <Modal title="💳 Settle Bill" onClose={onClose} wide>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
      <div>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:8}}>ORDER SUMMARY</div>
        <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,padding:'10px 12px',marginBottom:12}}>
          {o.items.map((item,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'4px 0',borderBottom:`1px solid ${C.border}33`}}>
              <span style={{color:C.cream}}>{item.name} ×{item.qty}</span>
              <span style={{color:C.muted}}>{inr(item.qty*item.price)}</span>
            </div>
          ))}
          <div style={{marginTop:8,paddingTop:6,borderTop:`1px solid ${C.border}`}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'2px 0'}}><span style={{color:C.muted}}>Subtotal</span><span>{inr(subtotal)}</span></div>
            {taxByCategory.map(([group,t])=>(
              <div key={group}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,padding:'1px 0',paddingLeft:8,color:C.muted}}><span>CGST {t.cgstRate}% ({group})</span><span>{inr(t.cgst)}</span></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:10,padding:'1px 0',paddingLeft:8,color:C.muted}}><span>SGST {t.sgstRate}% ({group})</span><span>{inr(t.sgst)}</span></div>
              </div>
            ))}
            {disc>0&&<div style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'2px 0'}}><span style={{color:C.muted}}>Discount</span><span style={{color:C.red}}>-{inr(disc)}</span></div>}
          </div>
        </div>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:6}}>EXTRA CHARGES</div>
        <div style={{marginBottom:10,background:C.surface,borderRadius:8,padding:'8px 10px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:scEnabled?6:0}}>
            <div>
              <div style={{fontSize:12,fontWeight:600}}>Service Charge {r.serviceChargePct||5}%</div>
              <div style={{fontSize:10,color:C.muted}}>Configurable in Settings</div>
            </div>
            <button onClick={()=>{setScEnabled(s=>{if(!s)setServiceCharge(Math.round(subtotal*(r.serviceChargePct||5)/100));return !s;})}}
              style={{width:38,height:20,borderRadius:10,background:scEnabled?C.accent:C.border,border:'none',cursor:'pointer',position:'relative',transition:'background .2s',flexShrink:0}}>
              <div style={{width:14,height:14,borderRadius:'50%',background:'#fff',position:'absolute',top:3,left:scEnabled?21:3,transition:'left .2s'}}/>
            </button>
          </div>
          {scEnabled&&<input type="number" min="0" value={serviceCharge} onChange={e=>setServiceCharge(e.target.value)} placeholder="0" style={{fontSize:13,width:'100%'}} />}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:C.muted,marginBottom:4}}>Tip (₹)</div>
          <input type="number" min="0" value={tip} onChange={e=>setTip(e.target.value)} placeholder="0" style={{fontSize:13}} />
        </div>
        <div style={{background:C.accent+'18',border:`1px solid ${C.accent}33`,borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
          <div style={{color:C.muted,fontSize:11,marginBottom:4}}>GRAND TOTAL</div>
          <div className="playfair" style={{color:C.accent,fontSize:28,fontWeight:700}}>{inr(total)}</div>
          {tbl&&<div style={{color:C.muted,fontSize:12,marginTop:4}}>Table {tbl.number} · {o.customerName||'Guest'}</div>}
        </div>
      </div>
      <div>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:8}}>PAYMENT MODE</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
          {payModes.map(m=>(
            <button key={m.id} onClick={()=>setPayMode(m.id)} style={{padding:'12px 8px',borderRadius:10,textAlign:'center',cursor:'pointer',background:payMode===m.id?C.accent+'22':C.surface,border:`2px solid ${payMode===m.id?C.accent:C.border}`,color:payMode===m.id?C.accent:C.cream,transition:'all .15s'}}>
              <div style={{fontSize:22,marginBottom:4}}>{m.icon}</div>
              <div style={{fontSize:12,fontWeight:700}}>{m.label}</div>
            </button>
          ))}
        </div>
        {payMode==='split'&&<div style={{marginBottom:14}}>
          <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:6}}>SPLIT DETAILS</div>
          <textarea value={splitDetails} onChange={e=>setSplitDetails(e.target.value)} placeholder={"e.g. Cash ₹500 + UPI ₹300\nor Guest 1: ₹400, Guest 2: ₹400"} rows={4} style={{fontSize:12,resize:'vertical'}} />
        </div>}
        {payMode==='upi'&&<div style={{background:C.surface,borderRadius:8,padding:'10px 12px',marginBottom:14,fontSize:12,color:C.muted}}>
          📱 Collect via UPI · Show QR or enter UPI ID
          {data.restaurant.upiId&&<div style={{color:C.accent,fontWeight:700,marginTop:4,fontSize:13}}>UPI: {data.restaurant.upiId}</div>}
        </div>}
        {tbl&&<div style={{background:C.green+'18',border:`1px solid ${C.green}33`,borderRadius:8,padding:'8px 12px',marginBottom:14,fontSize:12,color:C.green}}>
          ✅ Table {tbl.number} will be marked <strong>available</strong> after payment.
        </div>}
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <Btn full onClick={confirmPay}>✓ Confirm Payment &amp; Print Invoice</Btn>
          <Btn full variant="ghost" onClick={()=>{const invoiceNo=o.invoiceNo||genInvoiceNo(data.orders);const preview={...o,paymentMode:payMode,serviceCharge:effectiveSc,tip:+tip||0,tax,cgst,sgst,total,invoiceNo};printInvoice(preview,data);}}>🖨️ Preview Invoice (don't mark paid)</Btn>
          <Btn full variant="ghost" onClick={onClose}>Cancel</Btn>
        </div>
      </div>
    </div>
  </Modal>;
}

// ── TABLE SESSION ─────────────────────────────────────────────
function TableSession({table:t,data,setData,perms,sess}){
  useTheme();
  const [showMerge,setShowMerge]=useState(false);
  const [showTransfer,setShowTransfer]=useState(false);
  const [transferTarget,setTransferTarget]=useState('');
  const [mergeTables,setMergeTables]=useState([]);
  const activeOrders=(data.orders||[]).filter(o=>o.tableId===t.id&&['pending','preparing','served'].includes(o.status));
  const sessionOrders=(data.orders||[]).filter(o=>o.tableId===t.id&&t.sessionStart&&new Date(o.createdAt)>=new Date(t.sessionStart));
  const runningTotal=sessionOrders.filter(o=>o.status!=='cancelled').reduce((s,o)=>s+(o.total||0),0);
  const sessionDuration=t.sessionStart?(()=>{const mins=Math.floor((Date.now()-new Date(t.sessionStart))/60000);return mins<60?`${mins}m`:`${Math.floor(mins/60)}h ${mins%60}m`;})():null;
  const mergedNums=(t.mergedWith||[]).map(id=>data.tables.find(x=>x.id===id)).filter(Boolean).map(x=>`T${x.number}`).join(', ');
  const openSession=()=>{setData(d=>({...d,tables:d.tables.map(x=>x.id===t.id?{...x,status:'occupied',occupiedAt:Date.now(),sessionStart:new Date().toISOString(),mergedWith:[]}:x)}));addLog(sess?.name||'Staff','Opened table session',`Table ${t.number}`);};
  const closeSession=()=>{if(activeOrders.length>0&&!window.confirm(`Table ${t.number} has ${activeOrders.length} unpaid order(s). Close session anyway?`))return;setData(d=>({...d,tables:d.tables.map(x=>{if(x.id!==t.id&&!(t.mergedWith||[]).includes(x.id))return x;return{...x,status:'cleaning',occupiedAt:null,sessionStart:null,mergedWith:null};})}));addLog(sess?.name||'Staff','Closed table session',`Table ${t.number} · ${inr(runningTotal)} total`);};
  const doMerge=()=>{if(mergeTables.length===0)return;setData(d=>({...d,tables:d.tables.map(x=>{if(x.id===t.id)return{...x,mergedWith:[...(x.mergedWith||[]),...mergeTables]};if(mergeTables.includes(x.id))return{...x,status:'occupied',mergedWith:[t.id],occupiedAt:Date.now()};return x;}),orders:d.orders.map(o=>mergeTables.includes(o.tableId)&&['pending','preparing','served'].includes(o.status)?{...o,tableId:t.id,mergedFromTable:o.tableId}:o)}));addLog(sess?.name||'Staff','Merged tables',`T${t.number} ← ${mergeTables.map(id=>'T'+(data.tables.find(x=>x.id===id)?.number||'?')).join(', ')}`);setMergeTables([]);setShowMerge(false);};
  const doTransfer=()=>{if(!transferTarget)return;const targetTable=data.tables.find(x=>x.id===transferTarget);setData(d=>({...d,orders:d.orders.map(o=>o.tableId===t.id&&['pending','preparing','served'].includes(o.status)?{...o,tableId:transferTarget}:o),tables:d.tables.map(x=>{if(x.id===t.id)return{...x,status:'available',occupiedAt:null,sessionStart:null};if(x.id===transferTarget)return{...x,status:'occupied',occupiedAt:x.occupiedAt||Date.now()};return x;})}));addLog(sess?.name||'Staff','Transferred orders',`T${t.number} → T${targetTable?.number}`);setTransferTarget('');setShowTransfer(false);};
  return <div style={{background:C.surface,borderRadius:10,padding:'12px 14px',marginBottom:14,border:`1px solid ${C.border}`}}>
    <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:10}}>TABLE SESSION</div>
    {t.sessionStart?(
      <>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
          <div>
            <div style={{fontSize:12,color:C.green,fontWeight:700}}>● Session Active</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>Started {new Date(t.sessionStart).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})} · {sessionDuration}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:11,color:C.muted}}>Running Bill</div>
            <div style={{color:C.accent,fontWeight:700,fontSize:16}}>{inr(runningTotal)}</div>
          </div>
        </div>
        {mergedNums&&<div style={{background:C.blue+'18',border:`1px solid ${C.blue}33`,borderRadius:6,padding:'5px 10px',fontSize:11,color:C.blue,marginBottom:8}}>🔗 Merged with: {mergedNums}</div>}
        <div style={{fontSize:11,color:C.muted,marginBottom:8}}>{sessionOrders.length} order(s) · {activeOrders.length} active</div>
        {perms.canDelete&&<div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          <Btn size="sm" variant="ghost" onClick={()=>setShowMerge(s=>!s)}>🔗 Merge Table</Btn>
          <Btn size="sm" variant="ghost" onClick={()=>setShowTransfer(s=>!s)}>↔️ Transfer</Btn>
          <Btn size="sm" variant="danger" onClick={closeSession}>🔒 Close Session</Btn>
        </div>}
      </>
    ):(
      <div>
        <div style={{color:C.muted,fontSize:12,marginBottom:10}}>No active session. Open one to track time and running bill.</div>
        {perms.canDelete&&<Btn size="sm" onClick={openSession}>▶ Open Session</Btn>}
      </div>
    )}
    {showMerge&&<div style={{marginTop:12,padding:'10px 12px',background:C.card,borderRadius:8,border:`1px solid ${C.border}`}}>
      <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:8}}>SELECT TABLES TO MERGE WITH T{t.number}</div>
      <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:10}}>
        {data.tables.filter(x=>x.id!==t.id&&!(t.mergedWith||[]).includes(x.id)).map(x=>{const sel=mergeTables.includes(x.id);return(
          <button key={x.id} onClick={()=>setMergeTables(m=>sel?m.filter(id=>id!==x.id):[...m,x.id])} style={{padding:'4px 10px',borderRadius:6,fontSize:11,fontWeight:700,cursor:'pointer',background:sel?C.accent+'33':C.surface,border:`1px solid ${sel?C.accent:C.border}`,color:sel?C.accent:C.cream}}>T{x.number} {x.status==='occupied'?'🔴':'🟢'}</button>
        );})}
      </div>
      <div style={{display:'flex',gap:6}}>
        <Btn size="sm" onClick={doMerge} disabled={mergeTables.length===0}>Merge</Btn>
        <Btn size="sm" variant="ghost" onClick={()=>{setShowMerge(false);setMergeTables([]);}}>Cancel</Btn>
      </div>
    </div>}
    {showTransfer&&<div style={{marginTop:12,padding:'10px 12px',background:C.card,borderRadius:8,border:`1px solid ${C.border}`}}>
      <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:8}}>TRANSFER ALL ACTIVE ORDERS TO</div>
      <select value={transferTarget} onChange={e=>setTransferTarget(e.target.value)} style={{marginBottom:10}}>
        <option value="">Select target table...</option>
        {data.tables.filter(x=>x.id!==t.id).map(x=><option key={x.id} value={x.id}>Table {x.number} ({x.status}){x.floor?' · '+x.floor:''}</option>)}
      </select>
      <div style={{display:'flex',gap:6}}>
        <Btn size="sm" onClick={doTransfer} disabled={!transferTarget}>Transfer →</Btn>
        <Btn size="sm" variant="ghost" onClick={()=>{setShowTransfer(false);setTransferTarget('');}}>Cancel</Btn>
      </div>
    </div>}
  </div>;
}

// ── TABLES ────────────────────────────────────────────────────

// ── TABLE TIMER ──────────────────────────────────────────────
function TableTimer({occupiedAt}){
  const [now,setNow]=useState(Date.now());
  useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),30000);return()=>clearInterval(id);},[]);
  if(!occupiedAt)return null;
  const mins=Math.floor((now-occupiedAt)/60000);
  const hrs=Math.floor(mins/60);const m=mins%60;
  const label=hrs>0?`${hrs}h ${m}m`:`${mins}m`;
  const color=mins>90?C.red:mins>45?C.orange:C.green;
  return <div style={{fontSize:10,color,fontWeight:700,marginTop:3}}>⏱ {label}</div>;
}

function Tables({data,setData,perms,sess}){
  useTheme();
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState(null); // table id for detail popover
  const [hovered,setHovered]=useState(null);   // table id for hover tooltip
  const [floorFilter,setFloorFilter]=useState("all");
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const sc={available:C.green,occupied:C.red,reserved:C.accent,cleaning:C.purple};
  const floors=[...new Set(data.tables.map(t=>t.floor))];

  // All staff for server assignment
  const staffList=(data.staff||[]).filter(s=>s.status==="active");

  const save=()=>{
    if(modal==="add"){
      setData(d=>({...d,tables:[...d.tables,{
        id:mkId(),...form,
        number:+form.number,capacity:+form.capacity,
        status:"available",note:form.note||"",
        section:form.section||"",
        shape:form.shape||"square",
        minCovers:+form.minCovers||1,
        maxCovers:+form.capacity||form.capacity,
        server:form.server||"",
        posX:form.posX||"",posY:form.posY||"",
        tags:form.tags||"",
      }]}));
    } else {
      setData(d=>({...d,tables:d.tables.map(t=>{
        if(t.id!==form.id)return t;
        const wasOccupied=t.status==="occupied";
        const nowOccupied=form.status==="occupied";
        return {...t,...form,number:+form.number,capacity:+form.capacity,
          occupiedAt:nowOccupied&&!wasOccupied?Date.now():nowOccupied?t.occupiedAt:null};
      })}));
    }
    setModal(null);
  };

  // Per-table revenue and order stats from ALL orders (synced)
  const tableStats=useMemo(()=>{
    const stats={};
    (data.orders||[]).forEach(o=>{
      if(!o.tableId)return;
      if(!stats[o.tableId])stats[o.tableId]={revenue:0,orders:0,cancelled:0,discounts:0,avgOrder:0,items:{}};
      const s=stats[o.tableId];
      s.orders++;
      if(o.status==="cancelled"){s.cancelled++;return;}
      s.revenue+=(o.total||0);
      s.discounts+=(o.discount||0);
      (o.items||[]).forEach(i=>{
        s.items[i.name]=(s.items[i.name]||0)+i.qty;
      });
    });
    Object.values(stats).forEach(s=>{if(s.orders>s.cancelled)s.avgOrder=Math.round(s.revenue/(s.orders-s.cancelled));});
    return stats;
  },[data.orders]);

  const summary={
    available:data.tables.filter(t=>t.status==="available").length,
    occupied:data.tables.filter(t=>t.status==="occupied").length,
    reserved:data.tables.filter(t=>t.status==="reserved").length,
    cleaning:data.tables.filter(t=>t.status==="cleaning").length,
  };

  const totalRevenue=Object.values(tableStats).reduce((s,st)=>s+st.revenue,0);

  // Search + floor filter
  const filtered=data.tables.filter(t=>{
    const q=search.toLowerCase();
    const matchSearch=!q||
      String(t.number).includes(q)||
      (t.floor||"").toLowerCase().includes(q)||
      (t.note||"").toLowerCase().includes(q)||
      (t.server||"").toLowerCase().includes(q)||
      (t.section||"").toLowerCase().includes(q)||
      (t.tags||"").toLowerCase().includes(q);
    const matchFloor=floorFilter==="all"||t.floor===floorFilter;
    return matchSearch&&matchFloor;
  });

  // Active order for a table (synced with orders tab)
  const activeOrder=tid=>
    (data.orders||[]).find(o=>o.tableId===tid&&["pending","preparing","served"].includes(o.status));

  // All orders for a table
  const tableOrders=tid=>(data.orders||[]).filter(o=>o.tableId===tid);

  const selectedTable=selected?data.tables.find(t=>t.id===selected):null;

  return <div className="fade-in">
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div>
        <div className="playfair" style={{fontSize:24,color:C.cream}}>Tables & Floor Plan</div>
        <div style={{color:C.muted,fontSize:12,marginTop:2}}>
          {data.tables.length} tables · {inr(totalRevenue)} total revenue
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <ExportMenu
          label="Export"
          csvRows={data.tables.map(t=>({table:t.number,floor:t.floor,capacity:t.capacity,status:t.status,section:t.section||"",server:t.server||"",note:t.note||""}))}
          csvName="tables"
          printHtml={`<div class="title">Tables & Floor Plan</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Table</th><th>Floor</th><th>Capacity</th><th>Status</th><th>Section</th><th>Server</th><th>Note</th></tr></thead><tbody>${data.tables.map(t=>`<tr><td>T${t.number}</td><td>${t.floor}</td><td>${t.capacity}</td><td>${t.status}</td><td>${t.section||"—"}</td><td>${t.server||"—"}</td><td>${t.note||"—"}</td></tr>`).join("")}</tbody></table>`}
          printName="Tables Report"
          wordHtml={`<div class="title">Tables & Floor Plan</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Table</th><th>Floor</th><th>Capacity</th><th>Status</th><th>Section</th><th>Server</th></tr></thead><tbody>${data.tables.map(t=>`<tr><td>T${t.number}</td><td>${t.floor}</td><td>${t.capacity}</td><td>${t.status}</td><td>${t.section||"—"}</td><td>${t.server||"—"}</td></tr>`).join("")}</tbody></table>`}
          wordName="Tables_Report"
        />
        {perms.canDelete&&<Btn onClick={()=>{setForm({number:"",capacity:"",floor:"Ground",note:"",section:"",shape:"square",server:"",tags:"",minCovers:1});setModal("add");}}>+ Add Table</Btn>}
      </div>
    </div>

    {/* Summary pills */}
    <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
      {Object.entries(summary).filter(([,v])=>v>0).map(([k,v])=>(
        <div key={k} style={{background:sc[k]+"18",border:`1px solid ${sc[k]}33`,borderRadius:20,padding:"5px 14px",fontSize:12,cursor:"pointer",
          outline:floorFilter===k?`2px solid ${sc[k]}`:undefined}}
          onClick={()=>setFloorFilter(f=>f===k?"all":k)}>
          <span style={{color:sc[k],fontWeight:700}}>{v}</span>
          <span style={{color:C.muted,marginLeft:4}}>{k}</span>
        </div>
      ))}
      <div style={{background:C.accent+"18",border:`1px solid ${C.accent}33`,borderRadius:20,padding:"5px 14px",fontSize:12}}>
        <span style={{color:C.accent,fontWeight:700}}>{inr(totalRevenue)}</span>
        <span style={{color:C.muted,marginLeft:4}}>all time</span>
      </div>
    </div>

    {/* Search + floor filter */}
    <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:200,position:"relative"}}>
        <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:13,pointerEvents:"none"}}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by table, floor, server, section, tag..." style={{paddingLeft:32,borderRadius:8}} />
        {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",color:C.muted,fontSize:12}}>✕</button>}
      </div>
      <div style={{display:"flex",gap:6}}>
        {["all",...floors].map(f=>(
          <button key={f} onClick={()=>setFloorFilter(f)}
            style={{padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",
              background:floorFilter===f?C.accent+"22":"transparent",
              border:`1px solid ${floorFilter===f?C.accent:C.border}`,
              color:floorFilter===f?C.accent:C.muted}}>
            {f==="all"?"All Floors":f}
          </button>
        ))}
      </div>
    </div>

    {/* Floor sections */}
    {(floorFilter==="all"?floors:floors.filter(f=>f===floorFilter)).map(floor=>{
      const floorTables=filtered.filter(t=>t.floor===floor);
      if(floorTables.length===0)return null;
      const floorRev=floorTables.reduce((s,t)=>s+(tableStats[t.id]?.revenue||0),0);
      return (
        <div key={floor} style={{marginBottom:28}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{color:C.muted,fontSize:11,fontWeight:700,letterSpacing:1}}>{floor.toUpperCase()} FLOOR</div>
            <div style={{color:C.muted,fontSize:11}}>{floorTables.length} tables · {inr(floorRev)} revenue</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:12}}>
            {floorTables.map(t=>{
              const order=activeOrder(t.id);
              const stats=tableStats[t.id]||{revenue:0,orders:0};
              const borderColor=sc[t.status]||C.border;
              const isSelected=selected===t.id;
              return (
                <Card key={t.id} style={{
                  cursor:"pointer",
                  border:`1.5px solid ${isSelected?C.accent:borderColor}55`,
                  padding:14,position:"relative",
                  background:isSelected?C.accent+"10":C.card,
                  transition:"all .15s",
                  outline:isSelected?`2px solid ${C.accent}44`:"none",
                }}
                  onMouseEnter={()=>setHovered(t.id)}
                  onMouseLeave={()=>setHovered(null)}
                  onClick={()=>setSelected(s=>s===t.id?null:t.id)}>
                  {/* Live pulse */}
                  {order&&<div style={{position:"absolute",top:8,right:8,width:8,height:8,borderRadius:"50%",background:C.accent}} className="pulse" />}
                  {/* Edit button */}
                  {perms.canDelete&&<button
                    onClick={e=>{e.stopPropagation();setForm({...t});setModal("edit");}}
                    style={{position:"absolute",top:7,left:8,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,borderRadius:5,padding:"1px 6px",fontSize:10,lineHeight:1.6}}>✏️</button>}

                  {/* Table shape icon */}
                  <div style={{fontSize:t.shape==="round"?24:22,marginBottom:4,marginTop:6,textAlign:"center"}}>
                    {t.shape==="round"?"⭕":t.shape==="long"?"🟥":"🟫"}
                  </div>
                  <div className="playfair" style={{fontSize:20,fontWeight:700,textAlign:"center",color:C.cream}}>T{t.number}</div>
                  <div style={{color:C.muted,fontSize:11,textAlign:"center",marginBottom:6}}>{t.capacity} seats{t.section?` · ${t.section}`:""}</div>
                  <div style={{textAlign:"center",marginBottom:6}}><Badge label={t.status} color={borderColor} /></div>
                  {t.server&&<div style={{fontSize:10,color:C.blue,textAlign:"center",marginBottom:4}}>👤 {t.server}</div>}
                  {t.note&&<div style={{color:C.muted,fontSize:10,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:4}}>{t.note}</div>}
                  {order&&<div style={{fontSize:10,color:C.accent,textAlign:"center",fontWeight:600}}>🍽 {order.status} · {order.items?.length||0} items</div>}
                  <TableTimer occupiedAt={t.occupiedAt} />
                  {/* Mini stats */}
                  {stats.orders>0&&<div style={{marginTop:6,paddingTop:6,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",fontSize:10}}>
                    <span style={{color:C.muted}}>{stats.orders} orders</span>
                    <span style={{color:C.green,fontWeight:600}}>{inr(stats.revenue)}</span>
                  </div>}

                  {/* Hover order tooltip */}
                  {hovered===t.id&&!isSelected&&(
                    <div style={{
                      position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",
                      background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:10,
                      padding:"10px 12px",minWidth:200,maxWidth:260,zIndex:400,
                      boxShadow:"0 8px 24px rgba(0,0,0,.5)",pointerEvents:"none",
                    }}>
                      {/* Arrow */}
                      <div style={{position:"absolute",bottom:-6,left:"50%",transform:"translateX(-50%)",
                        width:12,height:6,overflow:"hidden"}}>
                        <div style={{width:10,height:10,background:C.surface,border:`1px solid ${C.accent}44`,
                          transform:"rotate(45deg)",marginTop:-5,marginLeft:1}}/>
                      </div>
                      <div style={{fontWeight:700,fontSize:12,color:C.accent,marginBottom:6}}>
                        Table {t.number} {order?"· Active Order":"· No Active Order"}
                      </div>
                      {order?(
                        <>
                          {order.customerName&&<div style={{color:C.muted,fontSize:11,marginBottom:4}}>👤 {order.customerName}</div>}
                          <div style={{color:C.muted,fontSize:10,fontWeight:700,letterSpacing:.5,marginBottom:4}}>STATUS: <span style={{color:C.accent}}>{order.status.toUpperCase()}</span></div>
                          {(order.items||[]).slice(0,4).map((item,i)=>(
                            <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:11,padding:"2px 0",borderBottom:`1px solid ${C.border}33`}}>
                              <span style={{color:C.cream}}>{item.name} ×{item.qty}</span>
                              <span style={{color:C.green,fontWeight:600}}>{inr(item.qty*item.price)}</span>
                            </div>
                          ))}
                          {(order.items||[]).length>4&&<div style={{color:C.muted,fontSize:10,marginTop:3}}>+{order.items.length-4} more items</div>}
                          <div style={{display:"flex",justifyContent:"space-between",marginTop:6,paddingTop:4,borderTop:`1px solid ${C.border}44`,fontWeight:700,fontSize:12}}>
                            <span style={{color:C.muted}}>Total</span>
                            <span style={{color:C.accent}}>{inr(order.total)}</span>
                          </div>
                          {order.note&&<div style={{color:C.muted,fontSize:10,marginTop:4}}>📝 {order.note}</div>}
                        </>
                      ):(
                        <div style={{color:C.muted,fontSize:11}}>Click to see table details & order history.</div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      );
    })}

    {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:C.muted}}>
      <div style={{fontSize:36,marginBottom:8}}>🪑</div>
      <div>No tables match your search.</div>
    </div>}

    {/* TABLE DETAIL PANEL — shows on click, synced with orders */}
    {selectedTable&&(()=>{
      const t=selectedTable;
      const order=activeOrder(t.id);
      const allOrders=tableOrders(t.id);
      const stats=tableStats[t.id]||{revenue:0,orders:0,cancelled:0,discounts:0,avgOrder:0,items:{}};
      const topItems=Object.entries(stats.items||{}).sort((a,b)=>b[1]-a[1]).slice(0,5);
      return (
        <div style={{position:"fixed",right:0,top:0,bottom:0,width:340,background:C.surface,borderLeft:`1px solid ${C.border}`,zIndex:500,display:"flex",flexDirection:"column",overflowY:"auto",boxShadow:"-8px 0 32px rgba(0,0,0,.4)"}}>
          <div style={{padding:"16px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
            <div>
              <div className="playfair" style={{fontSize:20,color:C.cream}}>Table {t.number}</div>
              <div style={{color:C.muted,fontSize:12}}>{t.floor} Floor{t.section?` · ${t.section}`:""}</div>
            </div>
            <button onClick={()=>setSelected(null)} style={{background:C.card,border:`1px solid ${C.border}`,color:C.muted,borderRadius:6,padding:"4px 10px",fontSize:13}}>✕</button>
          </div>
          <div style={{padding:"14px 18px",flex:1}}>
            {/* Info row */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              {[
                ["Capacity",`${t.capacity} seats`],
                ["Status",t.status],
                ["Shape",t.shape||"square"],
                ["Server",t.server||"—"],
                ["Section",t.section||"—"],
                ["Tags",t.tags||"—"],
              ].map(([k,v])=>(
                <div key={k} style={{background:C.card,borderRadius:8,padding:"8px 10px"}}>
                  <div style={{color:C.muted,fontSize:10,fontWeight:700,letterSpacing:.5,textTransform:"uppercase"}}>{k}</div>
                  <div style={{color:C.cream,fontSize:13,fontWeight:600,marginTop:2}}>{v}</div>
                </div>
              ))}
            </div>

            {/* Revenue stats */}
            <div style={{background:C.card,borderRadius:10,padding:12,marginBottom:14}}>
              <div style={{color:C.muted,fontSize:10,fontWeight:700,letterSpacing:.5,marginBottom:8}}>REVENUE STATS</div>
              {[
                ["Total Revenue",inr(stats.revenue),C.green],
                ["Total Orders",stats.orders,C.accent],
                ["Cancelled",stats.cancelled,C.red],
                ["Discounts Given",inr(stats.discounts),C.orange],
                ["Avg Order Value",inr(stats.avgOrder),C.blue],
              ].map(([k,v,color])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.border}22`,fontSize:12}}>
                  <span style={{color:C.muted}}>{k}</span>
                  <span style={{color,fontWeight:700}}>{v}</span>
                </div>
              ))}
            </div>

            {/* Table Session */}
            <TableSession table={t} data={data} setData={setData} perms={perms} sess={sess} />

            {/* Active order — synced live */}
            {order?(
              <div style={{background:C.accent+"15",border:`1px solid ${C.accent}33`,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{color:C.accent,fontSize:11,fontWeight:700,letterSpacing:.5}}>ACTIVE ORDER</div>
                  <Badge label={order.status} color={C.accent} />
                </div>
                {order.customerName&&<div style={{color:C.cream,fontSize:12,marginBottom:6}}>👤 {order.customerName}</div>}
                {(order.items||[]).map((item,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"3px 0",borderBottom:`1px solid ${C.border}22`}}>
                    <span style={{color:C.cream}}>{item.name} ×{item.qty}</span>
                    <span style={{color:C.accent,fontWeight:600}}>{inr(item.qty*item.price)}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontWeight:700}}>
                  <span style={{color:C.muted,fontSize:12}}>Total</span>
                  <span style={{color:C.accent}}>{inr(order.total)}</span>
                </div>
                {order.note&&<div style={{color:C.muted,fontSize:11,marginTop:6}}>📝 {order.note}</div>}
                <TableTimer occupiedAt={t.occupiedAt} />
              </div>
            ):(
              <div style={{background:C.card,borderRadius:10,padding:12,marginBottom:14,textAlign:"center",color:C.muted,fontSize:12}}>
                No active order on this table
              </div>
            )}

            {/* Top items ordered */}
            {topItems.length>0&&(
              <div style={{background:C.card,borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{color:C.muted,fontSize:10,fontWeight:700,letterSpacing:.5,marginBottom:8}}>TOP ITEMS ORDERED</div>
                {topItems.map(([name,qty])=>(
                  <div key={name} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.border}22`,fontSize:12}}>
                    <span style={{color:C.cream}}>{name}</span>
                    <span style={{color:C.muted,fontWeight:600}}>{qty}×</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent orders */}
            {allOrders.length>0&&(
              <div>
                <div style={{color:C.muted,fontSize:10,fontWeight:700,letterSpacing:.5,marginBottom:8}}>ORDER HISTORY</div>
                {allOrders.slice(-10).reverse().map(o=>(
                  <div key={o.id} style={{background:C.card,borderRadius:8,padding:"8px 10px",marginBottom:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                      <span style={{color:C.cream,fontWeight:600}}>{o.customerName||"Guest"}</span>
                      <span style={{color:o.status==="cancelled"?C.red:C.green,fontWeight:700}}>{inr(o.total)}</span>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:3,fontSize:11}}>
                      <span style={{color:C.muted}}>{fmtDate(o.createdAt)} · {fmtTime(o.createdAt)}</span>
                      <Badge label={o.status} color={o.status==="cancelled"?C.red:o.status==="paid"?C.green:C.accent} />
                    </div>
                    {(o.items||[]).length>0&&<div style={{color:C.muted,fontSize:10,marginTop:3}}>{o.items.map(i=>`${i.name}×${i.qty}`).join(", ")}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Quick actions */}
            <div style={{marginTop:14,display:"flex",gap:8,flexWrap:"wrap"}}>
              {perms.canDelete&&<Btn size="sm" onClick={()=>{setForm({...t});setModal("edit");setSelected(null);}}>✏️ Edit Table</Btn>}
              <Btn size="sm" variant="ghost" onClick={()=>setSelected(null)}>Close</Btn>
            </div>
          </div>
        </div>
      );
    })()}

    {/* ADD / EDIT MODAL */}
    {modal&&<Modal title={modal==="add"?"Add Table":"Edit Table"} onClose={()=>setModal(null)}>
      <Row>
        <Field label="TABLE NUMBER" half><input value={form.number||""} onChange={sf("number")} type="number" placeholder="e.g. 1" /></Field>
        <Field label="CAPACITY (seats)" half><input value={form.capacity||""} onChange={sf("capacity")} type="number" placeholder="e.g. 4" /></Field>
      </Row>
      <Row>
        <Field label="FLOOR" half><input value={form.floor||""} onChange={sf("floor")} placeholder="Ground / First / Terrace" /></Field>
        <Field label="SECTION (optional)" half><input value={form.section||""} onChange={sf("section")} placeholder="e.g. Outdoor, Bar, VIP" /></Field>
      </Row>
      <Row>
        <Field label="TABLE SHAPE" half>
          <select value={form.shape||"square"} onChange={sf("shape")}>
            <option value="square">Square</option>
            <option value="round">Round</option>
            <option value="long">Long / Rectangular</option>
          </select>
        </Field>
        <Field label="MIN COVERS" half><input value={form.minCovers||""} onChange={sf("minCovers")} type="number" placeholder="1" /></Field>
      </Row>
      <Field label="SERVER / ASSIGNED STAFF (optional)">
        <select value={form.server||""} onChange={sf("server")}>
          <option value="">— Unassigned —</option>
          {staffList.map(s=><option key={s.id} value={s.name}>{s.name} ({s.role})</option>)}
          <option value="__custom">Custom name...</option>
        </select>
        {form.server==="__custom"&&<input value={form.serverCustom||""} onChange={e=>setForm(f=>({...f,server:e.target.value,serverCustom:e.target.value}))} placeholder="Enter staff name" style={{marginTop:6}} />}
      </Field>
      <Field label="TAGS (optional)"><input value={form.tags||""} onChange={sf("tags")} placeholder="e.g. window, booth, outdoor, accessible" /></Field>
      <Field label="NOTE"><input value={form.note||""} onChange={sf("note")} placeholder="e.g. Near window, private booth..." /></Field>
      {modal==="edit"&&(
        <Field label="STATUS">
          <select value={form.status||"available"} onChange={sf("status")}>
            <option>available</option><option>occupied</option><option>reserved</option><option>cleaning</option>
          </select>
        </Field>
      )}
      <Divider />
      <div style={{display:"flex",gap:8}}>
        <Btn full onClick={save}>{modal==="add"?"Add Table":"Save Changes"}</Btn>
        {modal==="edit"&&perms.canDelete&&<Btn variant="danger" onClick={()=>{setData(d=>({...d,tables:d.tables.filter(t=>t.id!==form.id)}));setModal(null);}}>Delete</Btn>}
      </div>
    </Modal>}
  </div>;
}


// ── SPLIT BILL ───────────────────────────────────────────────
function SplitBill({order, onClose, data}){
  useTheme();
  const [guests,setGuests]=useState(2);
  const [customGuests,setCustomGuests]=useState("");
  const [mode,setMode]=useState("equal"); // equal | byItem | custom | percentage
  const [assign,setAssign]=useState({});
  const [customAmts,setCustomAmts]=useState({});
  const [pcts,setPcts]=useState({});
  const [guestNames,setGuestNames]=useState({});
  const total=order.total||0;
  const numGuests=parseInt(customGuests)||guests;

  const guestTotals=Array.from({length:numGuests},(_,gi)=>{
    if(mode==="equal")return Math.ceil(total/numGuests);
    if(mode==="byItem")return order.items.reduce((s,item,ii)=>assign[ii]===gi?s+item.qty*item.price:s,0);
    if(mode==="custom")return parseFloat(customAmts[gi])||0;
    if(mode==="percentage"){const p=parseFloat(pcts[gi])||0;return Math.round(total*p/100);}
    return 0;
  });

  const totalAssigned=guestTotals.reduce((s,a)=>s+a,0);
  const remainder=total-totalAssigned;
  const gColors=[C.accent,C.blue,C.green,C.purple,C.orange,C.red,"#ff6b6b","#48cae4","#a8dadc","#f4a261"];

  const printSplit=()=>{
    const tbl=data?.tables?.find(t=>t.id===order.tableId);
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Split Bill</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;color:#111;padding:24px;max-width:500px;background:#fff}
.toolbar{position:fixed;top:0;left:0;right:0;background:#1a1a1a;color:#fff;padding:8px 16px;display:flex;gap:10px;align-items:center;z-index:999;font-size:13px}
.toolbar button{background:#f5a623;color:#000;border:none;border-radius:5px;padding:5px 14px;font-size:12px;font-weight:700;cursor:pointer}
.toolbar .close{background:#555;color:#fff;margin-left:auto}
.wrap{margin-top:52px}
h2{font-size:18px;margin-bottom:2px}h3{font-size:13px;margin:12px 0 6px;border-bottom:1px solid #eee;padding-bottom:3px}
.row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px;border-bottom:1px solid #f5f5f5}
.guest{background:#f9f9f9;border-radius:8px;padding:10px 12px;margin-bottom:8px}
.gname{font-weight:700;font-size:14px}.gamt{font-size:18px;font-weight:700;color:#f5a623}
@media print{.toolbar{display:none}.wrap{margin-top:0}@page{margin:.6cm}}</style></head><body>
<div class="toolbar">
  <span style="font-weight:700;color:#f5a623">💳 Split Bill</span>
  <button onclick="window.print()">🖨️ Print</button>
  <button onclick="window.print()" title="Save as PDF via print dialog">💾 Save PDF</button>
  <button class="close" onclick="window.close()">✕ Close</button>
</div>
<div class="wrap">
<div style="text-align:center;margin-bottom:16px;padding-bottom:12px;border-bottom:2px solid #f5a623">
<h2>Split Bill — Table ${tbl?.number||'?'}</h2>
<div style="font-size:12px;color:#888">Order #${order.id.toUpperCase().slice(-6)} · Total: ₹${total.toLocaleString('en-IN')}</div></div>
<h3>Per Guest</h3>
${guestTotals.map((amt,gi)=>`<div class="guest"><div style="display:flex;justify-content:space-between;align-items:center"><div class="gname">${guestNames[gi]||'Guest '+(gi+1)}</div><div class="gamt">₹${amt.toLocaleString('en-IN')}</div></div></div>`).join('')}
${mode==="byItem"?`<h3>Item Assignment</h3>${order.items.map((item,ii)=>`<div class="row"><span>${item.name} ×${item.qty}</span><span>${guestNames[assign[ii]]||('Guest '+(assign[ii]+1)||'Unassigned')} · ₹${(item.qty*item.price).toLocaleString('en-IN')}</span></div>`).join('')}`:''}
<div style="text-align:center;font-size:11px;color:#aaa;margin-top:16px;padding-top:10px;border-top:1px solid #eee">Printed ${new Date().toLocaleString('en-IN')}</div>
</div></body></html>`;
    const w=window.open('','_blank','width=600,height=800,noopener');
    if(w){w.document.open();w.document.write(html);w.document.close();}
  };

  return <Modal title="💳 Split Bill" onClose={onClose} wide>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
      {/* Left panel — settings */}
      <div>
        <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.5}}>SPLIT MODE</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
          {[["equal","⚖️ Equal"],["byItem","🍽️ By Item"],["custom","✏️ Custom ₹"],["percentage","% Split"]].map(([v,l])=>(
            <button key={v} onClick={()=>setMode(v)} style={{background:mode===v?C.accent+"22":C.surface,border:`1.5px solid ${mode===v?C.accent:C.border}`,borderRadius:8,padding:"7px",cursor:"pointer",fontSize:11,fontWeight:600,color:mode===v?C.accent:C.cream}}>{l}</button>
          ))}
        </div>

        <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.5}}>NUMBER OF GUESTS</div>
        <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
          {[2,3,4,5,6,8,10].map(n=>(
            <button key={n} onClick={()=>{setGuests(n);setCustomGuests("");}} style={{width:34,height:34,borderRadius:8,background:(numGuests===n&&!customGuests)?C.accent:C.surface,border:`1px solid ${numGuests===n&&!customGuests?C.accent:C.border}`,cursor:"pointer",fontWeight:700,color:(numGuests===n&&!customGuests)?C.bg:C.cream,fontSize:12}}>{n}</button>
          ))}
        </div>
        <input type="number" min="2" max="50" value={customGuests} onChange={e=>setCustomGuests(e.target.value)} placeholder="Custom number..." style={{marginBottom:14,fontSize:13}} />

        {/* Guest name labels */}
        <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.5}}>GUEST NAMES (optional)</div>
        <div style={{display:"grid",gap:4,marginBottom:14}}>
          {Array.from({length:numGuests},(_,gi)=>(
            <div key={gi} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:gColors[gi%gColors.length],flexShrink:0}} />
              <input value={guestNames[gi]||""} onChange={e=>setGuestNames(g=>({...g,[gi]:e.target.value}))} placeholder={`Guest ${gi+1}`} style={{fontSize:12,padding:"4px 8px"}} />
            </div>
          ))}
        </div>

        {mode==="byItem"&&<>
          <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.5}}>ASSIGN ITEMS</div>
          {order.items.map((item,ii)=>(
            <div key={ii} style={{marginBottom:8,padding:"7px 10px",background:C.surface,borderRadius:8,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:12,fontWeight:600,marginBottom:5}}>{item.name} ×{item.qty} — {inr(item.qty*item.price)}</div>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                {Array.from({length:numGuests},(_,gi)=>(
                  <button key={gi} onClick={()=>setAssign(a=>({...a,[ii]:gi}))} style={{padding:"2px 8px",borderRadius:6,background:assign[ii]===gi?gColors[gi%gColors.length]:C.bg,border:`1px solid ${assign[ii]===gi?gColors[gi%gColors.length]:C.border}`,cursor:"pointer",fontSize:11,fontWeight:700,color:assign[ii]===gi?C.bg:C.muted}}>{guestNames[gi]||`G${gi+1}`}</button>
                ))}
              </div>
            </div>
          ))}
        </>}

        {mode==="custom"&&<>
          <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.5}}>ENTER AMOUNTS (₹)</div>
          {Array.from({length:numGuests},(_,gi)=>(
            <div key={gi} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:gColors[gi%gColors.length],flexShrink:0}} />
              <span style={{fontSize:12,minWidth:60}}>{guestNames[gi]||`Guest ${gi+1}`}</span>
              <input type="number" value={customAmts[gi]||""} onChange={e=>setCustomAmts(a=>({...a,[gi]:e.target.value}))} placeholder="₹0" style={{fontSize:13,flex:1}} />
            </div>
          ))}
          {Math.abs(remainder)>0&&<div style={{fontSize:12,color:remainder>0?C.orange:C.red,marginTop:4}}>
            {remainder>0?`₹${remainder.toLocaleString('en-IN')} unallocated`:`Over by ₹${Math.abs(remainder).toLocaleString('en-IN')}`}
          </div>}
        </>}

        {mode==="percentage"&&<>
          <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.5}}>ENTER PERCENTAGES</div>
          {Array.from({length:numGuests},(_,gi)=>(
            <div key={gi} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:gColors[gi%gColors.length],flexShrink:0}} />
              <span style={{fontSize:12,minWidth:60}}>{guestNames[gi]||`Guest ${gi+1}`}</span>
              <input type="number" min="0" max="100" value={pcts[gi]||""} onChange={e=>setPcts(p=>({...p,[gi]:e.target.value}))} placeholder="%" style={{fontSize:13,flex:1}} />
              <span style={{fontSize:11,color:C.muted}}>%</span>
            </div>
          ))}
          <div style={{fontSize:12,color:Object.values(pcts).reduce((s,v)=>s+(parseFloat(v)||0),0)===100?C.green:C.orange,marginTop:4}}>
            Total: {Object.values(pcts).reduce((s,v)=>s+(parseFloat(v)||0),0).toFixed(1)}% {Object.values(pcts).reduce((s,v)=>s+(parseFloat(v)||0),0)===100?"✓":"(must = 100%)"}
          </div>
        </>}
      </div>

      {/* Right panel — summary */}
      <div>
        <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:8,letterSpacing:.5}}>BILL SUMMARY</div>
        <div style={{background:C.surface,borderRadius:10,padding:12,marginBottom:12}}>
          {guestTotals.map((amt,gi)=>(
            <div key={gi} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}22`}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:gColors[gi%gColors.length]}} />
                <span style={{fontSize:13}}>{guestNames[gi]||`Guest ${gi+1}`}</span>
              </div>
              <div style={{textAlign:"right"}}>
                <span style={{fontWeight:700,color:gColors[gi%gColors.length],fontSize:15}}>{inr(amt)}</span>
                {mode!=="equal"&&total>0&&<div style={{fontSize:10,color:C.muted}}>{Math.round(amt/total*100)}%</div>}
              </div>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",paddingTop:10,marginTop:4,fontWeight:700}}>
            <span>Total</span><span style={{color:C.accent}}>{inr(total)}</span>
          </div>
        </div>

        {/* Order items reference */}
        <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.5}}>ORDER ITEMS</div>
        <div style={{background:C.surface,borderRadius:10,padding:10,marginBottom:12}}>
          {order.items.map((item,i)=>(
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.border}22`,fontSize:12}}>
              <span>{item.name} ×{item.qty}</span>
              <span style={{color:C.accent,fontWeight:600}}>{inr(item.qty*item.price)}</span>
            </div>
          ))}
          {order.tax>0&&<div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:11,color:C.muted}}>
            <span>GST (18%)</span><span>{inr(order.tax)}</span>
          </div>}
          {order.discount>0&&<div style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:11,color:C.orange}}>
            <span>Discount</span><span>-{inr(order.discount)}</span>
          </div>}
        </div>

        <div style={{display:"flex",gap:8}}>
          <Btn full onClick={printSplit}>🖨️ Print Split</Btn>
          <Btn variant="ghost" onClick={onClose}>Close</Btn>
        </div>
      </div>
    </div>
  </Modal>;
}

// ── MODIFIER PICKER ───────────────────────────────────────────
function ModifierPicker({ menuItem, onConfirm, onClose }) {
  useTheme();
  const isMobile = useIsMobile();
  const groups = menuItem.modifierGroups || [];
  const [selected, setSelected] = useState(() => {
    const s = {};
    groups.forEach(g => { s[g.id] = []; });
    return s;
  });

  const toggle = (gid, opt, type) => {
    setSelected(prev => {
      const cur = prev[gid] || [];
      if (type === "single") return { ...prev, [gid]: cur.some(o=>o.id===opt.id) ? [] : [opt] };
      return { ...prev, [gid]: cur.some(o=>o.id===opt.id) ? cur.filter(o=>o.id!==opt.id) : [...cur, opt] };
    });
  };

  const extraTotal = Object.values(selected).flat().reduce((s,o)=>s+(+o.price||0),0);
  const selectedList = Object.values(selected).flat();

  if (groups.length === 0) { onConfirm([], 0); return null; }

  return (
    <div style={{position:"fixed",inset:0,background:"#000c",zIndex:1100,display:"flex",alignItems:isMobile?"flex-end":"center",justifyContent:"center",padding:isMobile?0:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="fade-in" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:isMobile?"20px 20px 0 0":14,width:"100%",maxWidth:420,maxHeight:isMobile?"85dvh":"80vh",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <div className="playfair" style={{fontSize:16,fontWeight:600}}>{menuItem.name}</div>
            <div style={{fontSize:12,color:C.muted,marginTop:1}}>Customise your order</div>
          </div>
          <button onClick={onClose} style={{background:"none",color:C.muted,fontSize:18,border:"none",cursor:"pointer"}}>✕</button>
        </div>
        <div style={{padding:16,overflowY:"auto",flex:1}}>
          {groups.map(grp => (
            <div key={grp.id} style={{marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:.5,marginBottom:8}}>
                {grp.name.toUpperCase()} {grp.type==="single"?"(choose one)":"(optional)"}
              </div>
              <div style={{display:"grid",gap:6}}>
                {(grp.options||[]).map(opt => {
                  const on = (selected[grp.id]||[]).some(o=>o.id===opt.id);
                  return (
                    <button key={opt.id} onClick={()=>toggle(grp.id,opt,grp.type)} style={{
                      display:"flex",justifyContent:"space-between",alignItems:"center",
                      padding:"10px 14px",borderRadius:9,cursor:"pointer",textAlign:"left",
                      background:on?C.accent+"22":C.surface,
                      border:`1.5px solid ${on?C.accent:C.border}`,transition:"all .12s"
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:18,height:18,borderRadius:grp.type==="single"?"50%":4,border:`2px solid ${on?C.accent:C.muted}`,background:on?C.accent:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          {on&&<span style={{color:C.bg,fontSize:11,fontWeight:700}}>✓</span>}
                        </div>
                        <span style={{fontSize:13,fontWeight:600,color:on?C.cream:C.cream}}>{opt.name}</span>
                      </div>
                      {(+opt.price||0)>0&&<span style={{color:C.accent,fontWeight:700,fontSize:13}}>+{inr(+opt.price)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,flexShrink:0}}>
          {extraTotal>0&&<div style={{fontSize:12,color:C.muted,marginBottom:8}}>Extra: <span style={{color:C.accent,fontWeight:700}}>+{inr(extraTotal)}</span></div>}
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>onConfirm([],0)} style={{flex:1,padding:"11px",borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,cursor:"pointer",fontSize:13,fontWeight:600}}>Skip</button>
            <button onClick={()=>onConfirm(selectedList,extraTotal)} style={{flex:2,padding:"11px",borderRadius:10,border:"none",background:C.accent,color:C.bg,cursor:"pointer",fontSize:13,fontWeight:700}}>
              Add to Order {extraTotal>0?`(+${inr(extraTotal)})`:""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── QUICK POS / RUSH MODE ─────────────────────────────────────
function QuickPOS({ data, setData, onClose }) {
  useTheme();
  const isMobile = useIsMobile();
  const [mode, setMode] = useState(null); // null = picker, "express" | "pro"

  if (!mode) return <POSModePicker onPick={setMode} onClose={onClose} isMobile={isMobile} />;
  if (mode === "express") return <POSExpress data={data} setData={setData} onClose={onClose} onSwitch={() => setMode(null)} isMobile={isMobile} />;
  return <POSPro data={data} setData={setData} onClose={onClose} onSwitch={() => setMode(null)} isMobile={isMobile} />;
}

// ── Mode Picker ───────────────────────────────────────────────
function POSModePicker({ onPick, onClose, isMobile }) {
  useTheme();
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:C.bg+"ee", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, animation:"fadeIn .18s ease" }}>
      <button onClick={onClose} style={{ position:"absolute", top:16, right:16, background:C.border, color:C.muted, border:"none", borderRadius:8, padding:"7px 14px", fontSize:12, cursor:"pointer" }}>✕ Close</button>
      <div style={{ fontSize:32, marginBottom:8 }}>⚡</div>
      <div className="playfair" style={{ fontSize: isMobile?22:28, fontWeight:700, color:C.accent, marginBottom:6, textAlign:"center" }}>Point of Sale</div>
      <div style={{ color:C.muted, fontSize:13, marginBottom:32, textAlign:"center" }}>Choose your mode</div>
      <div style={{ display:"flex", gap:isMobile?14:20, flexDirection:isMobile?"column":"row", width:"100%", maxWidth:640 }}>
        {/* Express */}
        <button onClick={() => onPick("express")} style={{
          flex:1, background:C.card, border:`2px solid ${C.green}44`, borderRadius:18,
          padding: isMobile?"20px 18px":"28px 24px", cursor:"pointer", textAlign:"left",
          transition:"all .15s", display:"flex", flexDirection:"column", gap:10
        }} onMouseEnter={e=>{ e.currentTarget.style.border=`2px solid ${C.green}`; e.currentTarget.style.background=C.green+"11"; }}
           onMouseLeave={e=>{ e.currentTarget.style.border=`2px solid ${C.green}44`; e.currentTarget.style.background=C.card; }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:28 }}>🟢</div>
            <div>
              <div className="playfair" style={{ fontSize:isMobile?17:20, fontWeight:700, color:C.green }}>Express</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>For new staff</div>
            </div>
          </div>
          <div style={{ color:C.muted, fontSize:12, lineHeight:1.7 }}>
            ✦ Guided step-by-step flow<br/>
            ✦ Big tap-friendly buttons<br/>
            ✦ No clutter — just essentials<br/>
            ✦ Clear confirmations
          </div>
          <div style={{ background:C.green+"22", color:C.green, fontSize:12, fontWeight:700, padding:"8px 14px", borderRadius:9, textAlign:"center", marginTop:4 }}>
            Start Express →
          </div>
        </button>
        {/* Pro */}
        <button onClick={() => onPick("pro")} style={{
          flex:1, background:C.card, border:`2px solid ${C.accent}44`, borderRadius:18,
          padding: isMobile?"20px 18px":"28px 24px", cursor:"pointer", textAlign:"left",
          transition:"all .15s", display:"flex", flexDirection:"column", gap:10
        }} onMouseEnter={e=>{ e.currentTarget.style.border=`2px solid ${C.accent}`; e.currentTarget.style.background=C.accent+"11"; }}
           onMouseLeave={e=>{ e.currentTarget.style.border=`2px solid ${C.accent}44`; e.currentTarget.style.background=C.card; }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontSize:28 }}>⚡</div>
            <div>
              <div className="playfair" style={{ fontSize:isMobile?17:20, fontWeight:700, color:C.accent }}>Pro</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>For experienced staff</div>
            </div>
          </div>
          <div style={{ color:C.muted, fontSize:12, lineHeight:1.7 }}>
            ✦ Full menu grid at once<br/>
            ✦ Category filters + search<br/>
            ✦ Notes, discounts & more<br/>
            ✦ Maximum speed
          </div>
          <div style={{ background:C.accent+"22", color:C.accent, fontSize:12, fontWeight:700, padding:"8px 14px", borderRadius:9, textAlign:"center", marginTop:4 }}>
            Launch Pro →
          </div>
        </button>
      </div>
    </div>
  );
}

// ── EXPRESS POS (guided, newbie-friendly) ─────────────────────
function POSExpress({ data, setData, onClose, onSwitch, isMobile }) {
  useTheme();
  const [step, setStep] = useState(1); // 1=table, 2=items, 3=review
  const [tableId, setTableId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [placed, setPlaced] = useState(false);

  const cats = ["All", ...new Set(data.menu.map(m => m.category))];
  const visible = data.menu.filter(m =>
    m.available &&
    (catFilter === "All" || m.category === catFilter) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()))
  );

  const addItem = m => setItems(prev => {
    const ex = prev.find(i => i.menuId === m.id);
    if (ex) return prev.map(i => i.menuId === m.id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { menuId: m.id, name: m.name, qty: 1, price: m.price }];
  });
  const chQty = (menuId, delta) => setItems(prev =>
    prev.map(i => i.menuId === menuId ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0)
  );

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const placeOrder = () => {
    setData(d => ({
      ...d,
      orders: [...d.orders, { id:mkId(), tableId, items, customerName, note:"", tax, total, discount:0, createdAt:now(), status:"pending" }],
      tables: d.tables.map(t => t.id===tableId ? {...t, status:"occupied", occupiedAt:t.occupiedAt||Date.now()} : t),
      ingredients: deductIngredients(items, d.menu, d.ingredients||[])
    }));
    addLog(customerName||"POS", "Express Order", `Table ${data.tables.find(t=>t.id===tableId)?.number} · ${inr(total)}`);
    emitNotif({ type:"order", title:"Order placed!", body:`Table ${data.tables.find(t=>t.id===tableId)?.number} · ${items.length} items · ${inr(total)}` });
    setPlaced(true);
    setTimeout(() => { setItems([]); setTableId(""); setCustomerName(""); setStep(1); setPlaced(false); }, 1600);
  };

  const stepLabels = ["Table", "Items", "Review"];
  const pad = isMobile ? "10px 14px" : "12px 22px";

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:C.bg, display:"flex", flexDirection:"column", animation:"fadeIn .18s ease" }}>
      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:pad, background:C.surface, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ fontSize:18 }}>🟢</div>
        <div className="playfair" style={{ fontSize:16, fontWeight:700, color:C.green }}>Express POS</div>
        <div style={{ flex:1 }} />
        <button onClick={onSwitch} style={{ background:C.border, color:C.muted, border:"none", borderRadius:7, padding:"5px 11px", fontSize:11, cursor:"pointer" }}>Switch Mode</button>
        <button onClick={onClose} style={{ background:C.border, color:C.muted, border:"none", borderRadius:7, padding:"5px 11px", fontSize:11, cursor:"pointer" }}>✕</button>
      </div>

      {/* Step indicator */}
      <div style={{ display:"flex", alignItems:"center", padding:"10px 22px", background:C.surface, borderBottom:`1px solid ${C.border}`, flexShrink:0, gap:0 }}>
        {stepLabels.map((label, i) => {
          const s = i + 1;
          const done = step > s; const active = step === s;
          return <React.Fragment key={s}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700,
                background: done ? C.green : active ? C.accent : C.border,
                color: done||active ? C.bg : C.muted }}>
                {done ? "✓" : s}
              </div>
              <span style={{ fontSize:12, color:active?C.cream:C.muted, fontWeight:active?600:400 }}>{label}</span>
            </div>
            {i < 2 && <div style={{ flex:1, height:2, background:done?C.green:C.border, margin:"0 8px", borderRadius:2 }} />}
          </React.Fragment>;
        })}
      </div>

      {/* Step content */}
      <div style={{ flex:1, overflowY:"auto", padding: isMobile?"14px":"24px" }}>

        {/* STEP 1: Table selection */}
        {step === 1 && (
          <div className="fade-in" style={{ maxWidth:500, margin:"0 auto" }}>
            <div className="playfair" style={{ fontSize:20, marginBottom:4 }}>Which table?</div>
            <div style={{ color:C.muted, fontSize:13, marginBottom:20 }}>Select the table for this order</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:10, marginBottom:20 }}>
              {data.tables.filter(t=>t.status!=="reserved").map(t => (
                <button key={t.id} onClick={()=>setTableId(t.id)} style={{
                  padding:"18px 10px", borderRadius:14, border:`2px solid ${tableId===t.id?C.accent:C.border}`,
                  background:tableId===t.id?C.accent+"22":C.card, cursor:"pointer",
                  color:tableId===t.id?C.accent:C.cream, fontWeight:700, fontSize:16, transition:"all .12s"
                }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>🪑</div>
                  <div>Table {t.number}</div>
                  <div style={{ fontSize:10, color:t.status==="occupied"?C.orange:C.green, marginTop:3 }}>{t.status}</div>
                </button>
              ))}
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ color:C.muted, fontSize:11, fontWeight:600, marginBottom:6 }}>CUSTOMER NAME (OPTIONAL)</div>
              <input value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="e.g. John" style={{ fontSize:14 }} />
            </div>
            <button onClick={()=>setStep(2)} disabled={!tableId} style={{
              width:"100%", padding:"15px", borderRadius:12, border:"none", fontSize:15, fontWeight:700, cursor:tableId?"pointer":"not-allowed",
              background:tableId?C.accent:C.border, color:tableId?C.bg:C.muted, transition:"all .15s"
            }}>Next: Choose Items →</button>
          </div>
        )}

        {/* STEP 2: Item selection */}
        {step === 2 && (
          <div className="fade-in">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12, flexWrap:"wrap", gap:8 }}>
              <div>
                <div className="playfair" style={{ fontSize:18 }}>What would they like?</div>
                <div style={{ color:C.muted, fontSize:12 }}>Table {data.tables.find(t=>t.id===tableId)?.number}{customerName?` · ${customerName}`:""}</div>
              </div>
              {items.length > 0 && (
                <div style={{ background:C.accent+"22", color:C.accent, fontSize:12, fontWeight:700, padding:"6px 14px", borderRadius:20 }}>
                  {items.reduce((s,i)=>s+i.qty,0)} items · {inr(subtotal)}
                </div>
              )}
            </div>
            {/* Search */}
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search..." style={{ marginBottom:10, fontSize:13 }} />
            {/* Category pills */}
            <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
              {cats.map(c=>(
                <button key={c} onClick={()=>setCatFilter(c)} style={{
                  padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:600, border:"none", cursor:"pointer",
                  background:catFilter===c?C.accent:C.surface, color:catFilter===c?C.bg:C.muted
                }}>{c}</button>
              ))}
            </div>
            {/* Menu grid — bigger tap targets */}
            <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fill,minmax(${isMobile?"130px":"170px"},1fr))`, gap:10, marginBottom:16 }}>
              {visible.map(m => {
                const inCart = items.find(i=>i.menuId===m.id);
                return (
                  <button key={m.id} onClick={()=>addItem(m)} style={{
                    background:inCart?C.accent+"22":C.card, border:`2px solid ${inCart?C.accent:C.border}`,
                    borderRadius:14, padding: isMobile?"16px 10px":"18px 12px", cursor:"pointer", textAlign:"left",
                    position:"relative", transition:"all .12s"
                  }}>
                    {inCart && <div style={{ position:"absolute", top:-9, right:-9, background:C.accent, color:C.bg, borderRadius:"50%", width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700 }}>{inCart.qty}</div>}
                    <div style={{ fontSize:14, fontWeight:600, marginBottom:4, lineHeight:1.3 }}>{m.name}</div>
                    {m.category && <div style={{ fontSize:10, color:C.muted, marginBottom:5 }}>{m.category}</div>}
                    <div style={{ color:C.accent, fontWeight:700, fontSize:16 }}>{inr(m.price)}</div>
                  </button>
                );
              })}
            </div>
            {/* Cart summary bar */}
            {items.length > 0 && (
              <div style={{ position:"sticky", bottom:0, background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"10px 14px", marginTop:8 }}>
                <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:8 }}>CART</div>
                {items.map(item=>(
                  <div key={item.menuId} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <span style={{ flex:1, fontSize:13 }}>{item.name}</span>
                    <button onClick={()=>chQty(item.menuId,-1)} style={{ width:28, height:28, borderRadius:7, background:C.border, color:C.cream, border:"none", cursor:"pointer", fontSize:16 }}>−</button>
                    <span style={{ fontWeight:700, minWidth:20, textAlign:"center" }}>{item.qty}</span>
                    <button onClick={()=>chQty(item.menuId,1)} style={{ width:28, height:28, borderRadius:7, background:C.border, color:C.cream, border:"none", cursor:"pointer", fontSize:16 }}>+</button>
                    <span style={{ color:C.accent, fontWeight:600, fontSize:13, minWidth:54, textAlign:"right" }}>{inr(item.qty*item.price)}</span>
                    <button onClick={()=>setItems(prev=>prev.filter(i=>i.menuId!==item.menuId))} style={{ width:24, height:24, borderRadius:5, background:C.red+"22", color:C.red, border:"none", cursor:"pointer", fontSize:12 }}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display:"flex", gap:10, marginTop:14 }}>
              <button onClick={()=>setStep(1)} style={{ padding:"13px 20px", borderRadius:12, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, cursor:"pointer", fontSize:14, fontWeight:600 }}>← Back</button>
              <button onClick={()=>setStep(3)} disabled={items.length===0} style={{
                flex:1, padding:"13px", borderRadius:12, border:"none", fontSize:15, fontWeight:700, cursor:items.length>0?"pointer":"not-allowed",
                background:items.length>0?C.accent:C.border, color:items.length>0?C.bg:C.muted
              }}>Review Order →</button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Place */}
        {step === 3 && (
          <div className="fade-in" style={{ maxWidth:480, margin:"0 auto" }}>
            <div className="playfair" style={{ fontSize:20, marginBottom:4 }}>Review & Confirm</div>
            <div style={{ color:C.muted, fontSize:13, marginBottom:18 }}>Double-check before sending to kitchen</div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:16, marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.muted, marginBottom:12 }}>
                <span>Table {data.tables.find(t=>t.id===tableId)?.number}</span>
                {customerName && <span>{customerName}</span>}
              </div>
              {items.map(item=>(
                <div key={item.menuId} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}22` }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14 }}>{item.name}</div>
                    <div style={{ fontSize:12, color:C.muted }}>x{item.qty} · {inr(item.price)} each</div>
                  </div>
                  <div style={{ color:C.accent, fontWeight:700 }}>{inr(item.qty*item.price)}</div>
                </div>
              ))}
              <div style={{ marginTop:14, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:C.muted, marginBottom:4 }}><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:C.muted, marginBottom:8 }}><span>GST (18%)</span><span>{inr(tax)}</span></div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:800, color:C.accent }}><span>Total</span><span>{inr(total)}</span></div>
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setStep(2)} style={{ padding:"13px 20px", borderRadius:12, border:`1px solid ${C.border}`, background:"transparent", color:C.muted, cursor:"pointer", fontSize:14, fontWeight:600 }}>← Edit</button>
              <button onClick={placeOrder} disabled={placed} style={{
                flex:1, padding:"16px", borderRadius:12, border:"none", fontSize:16, fontWeight:800, cursor:"pointer",
                background:placed?C.green:C.accent, color:C.bg, transition:"all .2s",
                transform:placed?"scale(0.97)":"scale(1)"
              }}>
                {placed ? "✅ Order Sent to Kitchen!" : "✅ Confirm & Send →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PRO POS (advanced, fast, full-featured) ───────────────────
function POSPro({ data, setData, onClose, onSwitch, isMobile }) {
  useTheme();
  const [items, setItems] = useState([]);
  const [tableId, setTableId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [discount, setDiscount] = useState(0);
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [placed, setPlaced] = useState(false);
  const [showCart, setShowCart] = useState(false); // mobile cart toggle
  const [modifierTarget, setModifierTarget] = useState(null); // {menuItem}
  const searchRef = useRef(null);

  useEffect(() => { if (!isMobile) searchRef.current?.focus(); }, []);
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const cats = ["All", "🍱 Combos", ...new Set(data.menu.map(m => m.category))];
  const combos = (data.combos || []).filter(c => c.available !== false && (!search || c.name.toLowerCase().includes(search.toLowerCase())));
  const visible = data.menu.filter(m =>
    m.available &&
    (catFilter === "All" || catFilter === "🍱 Combos" || m.category === catFilter) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()))
  );

  const addCombo = combo => {
    setItems(prev => {
      const ex = prev.find(i => i.comboId === combo.id);
      if (ex) return prev.map(i => i.comboId === combo.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { comboId: combo.id, menuId: combo.id, name: combo.name + " " + (combo.emoji||"🍱"), qty: 1, price: combo.bundlePrice, isCombo: true }];
    });
  };

  const addItem = m => {
    if (m.modifierGroups && m.modifierGroups.length > 0) { setModifierTarget(m); return; }
    setItems(prev => {
      const ex = prev.find(i => i.menuId === m.id && !i.modifiers?.length);
      if (ex) return prev.map(i => (i.menuId === m.id && !i.modifiers?.length) ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { menuId: m.id, name: m.name, qty: 1, price: m.price }];
    });
  };
  const addItemWithModifiers = (m, modifiers, extraPrice) => {
    setModifierTarget(null);
    const key = JSON.stringify(modifiers.map(o=>o.id).sort());
    setItems(prev => {
      const ex = prev.find(i => i.menuId === m.id && JSON.stringify((i.modifierExtras||[]).map(o=>o.id).sort()) === key);
      if (ex) return prev.map(i => (i.menuId === m.id && JSON.stringify((i.modifierExtras||[]).map(o=>o.id).sort()) === key) ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { menuId: m.id, name: m.name, qty: 1, price: m.price + extraPrice, basePrice: m.price, modifiers: modifiers.map(o=>o.name), modifierExtras: modifiers }];
    });
  };
  const removeItem = menuId => setItems(prev => prev.filter(i => i.menuId !== menuId));
  const chQty = (menuId, delta) => setItems(prev =>
    prev.map(i => i.menuId === menuId ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0)
  );

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const discAmt = Math.min(Math.round(subtotal * discount / 100), subtotal);
  const tax = Math.round((subtotal - discAmt) * 0.18);
  const total = subtotal - discAmt + tax;
  const canPlace = tableId && items.length > 0;

  const placeOrder = () => {
    if (!canPlace) return;
    setData(d => ({
      ...d,
      orders: [...d.orders, { id:mkId(), tableId, items, customerName, note, tax, total, discount:discAmt, createdAt:now(), status:"pending" }],
      tables: d.tables.map(t => t.id===tableId ? {...t, status:"occupied", occupiedAt:t.occupiedAt||Date.now()} : t),
      ingredients: deductIngredients(items, d.menu, d.ingredients||[])
    }));
    addLog(customerName||"POS", "Pro Order", `Table ${data.tables.find(t=>t.id===tableId)?.number} · ${inr(total)}`);
    emitNotif({ type:"order", title:"Order placed", body:`Table ${data.tables.find(t=>t.id===tableId)?.number} · ${items.length} items · ${inr(total)}` });
    setPlaced(true);
    setTimeout(() => { setItems([]); setTableId(""); setCustomerName(""); setNote(""); setDiscount(0); setPlaced(false); setShowCart(false); }, 1400);
  };

  const cartCount = items.reduce((s,i)=>s+i.qty,0);

  // Mobile: stacked layout with floating cart button
  // Desktop: side-by-side
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:C.bg, display:"flex", flexDirection:"column", animation:"fadeIn .18s ease" }}>
      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding: isMobile?"9px 12px":"10px 18px", background:C.surface, borderBottom:`1px solid ${C.border}`, flexShrink:0, flexWrap:"wrap" }}>
        <div style={{ fontSize:18 }}>⚡</div>
        <div className="playfair" style={{ fontSize:16, fontWeight:700, color:C.accent }}>Pro POS</div>
        {!isMobile && (
          <input ref={searchRef} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search menu... (Esc to close)"
            style={{ marginLeft:8, width:200, fontSize:12, padding:"6px 11px", borderRadius:8, background:C.bg, border:`1px solid ${C.border}`, color:C.cream }} />
        )}
        <div style={{ flex:1 }} />
        <button onClick={onSwitch} style={{ background:C.border, color:C.muted, border:"none", borderRadius:7, padding:"5px 11px", fontSize:11, cursor:"pointer" }}>Switch Mode</button>
        <button onClick={onClose} style={{ background:C.border, color:C.muted, border:"none", borderRadius:7, padding:"5px 11px", fontSize:11, cursor:"pointer" }}>✕</button>
      </div>

      <div style={{ display:"flex", flex:1, overflow:"hidden", position:"relative" }}>
        {/* Menu panel */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", borderRight: isMobile?"none":`1px solid ${C.border}` }}>
          {/* Mobile search */}
          {isMobile && (
            <div style={{ padding:"8px 12px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search menu..." style={{ fontSize:13 }} />
            </div>
          )}
          {/* Category pills */}
          <div style={{ display:"flex", gap:6, padding: isMobile?"8px 12px":"10px 14px", overflowX:"auto", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setCatFilter(c)} style={{
                padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:600, border:"none", cursor:"pointer", whiteSpace:"nowrap",
                background:catFilter===c?C.accent:C.surface, color:catFilter===c?C.bg:C.muted
              }}>{c}</button>
            ))}
          </div>
          {/* Menu grid */}
          <div style={{ flex:1, overflowY:"auto", padding: isMobile?10:14, display:"grid", gridTemplateColumns:`repeat(auto-fill,minmax(${isMobile?"130px":"155px"},1fr))`, gap:8, alignContent:"start", paddingBottom: isMobile?80:14 }}>
            {/* Combo cards */}
            {(catFilter==="All"||catFilter==="🍱 Combos")&&combos.map(combo => {
              const inCart = items.find(i=>i.comboId===combo.id);
              const origPrice = (combo.items||[]).reduce((s,ci)=>{const mi=data.menu.find(m=>m.id===ci.menuId);return s+(mi?mi.price*ci.qty:0);},0);
              return (
                <button key={combo.id} onClick={()=>addCombo(combo)} style={{
                  background:inCart?C.purple+"22":C.card, border:`2px solid ${inCart?C.purple:C.purple+"55"}`,
                  borderRadius:12, padding: isMobile?"12px 8px":"13px 10px", cursor:"pointer", textAlign:"left",
                  transition:"all .12s", position:"relative"
                }}>
                  {inCart && <div style={{ position:"absolute", top:-8, right:-8, background:C.purple, color:"#fff", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>{inCart.qty}</div>}
                  <div style={{ fontSize:16, marginBottom:3 }}>{combo.emoji||"🍱"}</div>
                  <div style={{ fontSize:12, fontWeight:700, marginBottom:2, lineHeight:1.3, color:C.purple }}>{combo.name}</div>
                  {combo.description&&<div style={{fontSize:10,color:C.muted,marginBottom:4,lineHeight:1.3}}>{combo.description}</div>}
                  <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
                    {origPrice>0&&<div style={{fontSize:10,color:C.muted,textDecoration:"line-through"}}>{inr(origPrice)}</div>}
                    <div style={{ color:C.purple, fontWeight:700, fontSize:14 }}>{inr(combo.bundlePrice)}</div>
                  </div>
                </button>
              );
            })}
            {catFilter!=="🍱 Combos"&&visible.map(m => {
              const inCart = items.find(i=>i.menuId===m.id && !i.comboId);
              return (
                <button key={m.id} onClick={()=>addItem(m)} style={{
                  background:inCart?C.accent+"22":C.card, border:`2px solid ${inCart?C.accent:C.border}`,
                  borderRadius:12, padding: isMobile?"12px 8px":"13px 10px", cursor:"pointer", textAlign:"left",
                  transition:"all .12s", position:"relative", transform:inCart?"scale(1.02)":"scale(1)"
                }}>
                  {inCart && <div style={{ position:"absolute", top:-8, right:-8, background:C.accent, color:C.bg, borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>{inCart.qty}</div>}
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:3, lineHeight:1.3 }}>{m.name}</div>
                  {m.tag && <div style={{ fontSize:10, color:C.muted, marginBottom:4 }}>[{m.tag}]</div>}
                  <div style={{ color:C.accent, fontWeight:700, fontSize:14 }}>{inr(m.price)}</div>
                </button>
              );
            })}
            {catFilter==="🍱 Combos"&&combos.length===0&&<div style={{ gridColumn:"1/-1", color:C.muted, textAlign:"center", padding:40, fontSize:13 }}>No combos set up yet. Add them in Menu → Combos.</div>}
            {catFilter!=="🍱 Combos"&&visible.length === 0 && <div style={{ gridColumn:"1/-1", color:C.muted, textAlign:"center", padding:40, fontSize:13 }}>No items found</div>}
          </div>
        </div>

        {/* Desktop: Order panel (right sidebar) */}
        {!isMobile && (
          <div style={{ width:300, display:"flex", flexDirection:"column", overflow:"hidden", flexShrink:0 }}>
            <div style={{ padding:"12px 14px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
              <div style={{ fontSize:11, color:C.muted, fontWeight:700, letterSpacing:.5, marginBottom:6 }}>TABLE</div>
              <select value={tableId} onChange={e=>setTableId(e.target.value)} style={{ fontSize:13, marginBottom:7 }}>
                <option value="">Select table...</option>
                {data.tables.filter(t=>t.status!=="reserved").map(t=>(
                  <option key={t.id} value={t.id}>Table {t.number} ({t.status})</option>
                ))}
              </select>
              <input value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="Customer name (optional)" style={{ fontSize:12, marginBottom:6 }} />
              <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Kitchen note..." style={{ fontSize:12, marginBottom:6 }} />
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ fontSize:11, color:C.muted, fontWeight:600, whiteSpace:"nowrap" }}>DISCOUNT %</div>
                <input type="number" value={discount} onChange={e=>setDiscount(Math.min(100,Math.max(0,+e.target.value)))} min={0} max={100} style={{ fontSize:12, width:64 }} />
              </div>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"8px 14px" }}>
              {items.length===0
                ? <div style={{ color:C.muted, textAlign:"center", fontSize:13, paddingTop:36 }}>← Tap items to add</div>
                : items.map((item,idx)=>(
                  <div key={idx} style={{ padding:"6px 0", borderBottom:`1px solid ${C.border}22` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                      <div style={{ flex:1, fontSize:12, fontWeight:500 }}>{item.name}</div>
                      <button onClick={()=>setItems(p=>p.map((x,i)=>i===idx?{...x,qty:Math.max(0,x.qty-1)}:x).filter(x=>x.qty>0))} style={{ width:24, height:24, borderRadius:5, background:C.border, color:C.cream, border:"none", cursor:"pointer", fontSize:14 }}>−</button>
                      <span style={{ fontSize:12, fontWeight:700, minWidth:16, textAlign:"center" }}>{item.qty}</span>
                      <button onClick={()=>setItems(p=>p.map((x,i)=>i===idx?{...x,qty:x.qty+1}:x))} style={{ width:24, height:24, borderRadius:5, background:C.border, color:C.cream, border:"none", cursor:"pointer", fontSize:14 }}>+</button>
                      <span style={{ color:C.accent, fontWeight:600, fontSize:12, minWidth:46, textAlign:"right" }}>{inr(item.qty*item.price)}</span>
                      <button onClick={()=>setItems(p=>p.filter((_,i)=>i!==idx))} style={{ width:20, height:20, borderRadius:4, background:C.red+"22", color:C.red, border:"none", cursor:"pointer", fontSize:10 }}>✕</button>
                    </div>
                    {item.modifiers&&item.modifiers.length>0&&<div style={{fontSize:10,color:C.accent,paddingLeft:4,marginTop:2}}>{item.modifiers.join(", ")}</div>}
                  </div>
                ))
              }
            </div>
            <div style={{ padding:"12px 14px", borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
              {items.length > 0 && (
                <div style={{ marginBottom:10, fontSize:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", color:C.muted, marginBottom:2 }}><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                  {discAmt>0 && <div style={{ display:"flex", justifyContent:"space-between", color:C.green, marginBottom:2 }}><span>Discount ({discount}%)</span><span>−{inr(discAmt)}</span></div>}
                  <div style={{ display:"flex", justifyContent:"space-between", color:C.muted, marginBottom:4 }}><span>GST (18%)</span><span>{inr(tax)}</span></div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontWeight:700, color:C.accent, fontSize:16, borderTop:`1px solid ${C.border}`, paddingTop:6 }}><span>Total</span><span>{inr(total)}</span></div>
                  {items.length>0&&(()=>{const est=getOrderEstimate({items},data.menu);return<div style={{marginTop:6,background:C.orange+"18",border:`1px solid ${C.orange}33`,borderRadius:7,padding:"5px 9px",fontSize:11,color:C.orange,display:"flex",alignItems:"center",gap:5}}>⏱ Est. wait: <strong>{est} min</strong></div>;})()}
                </div>
              )}
              <button onClick={placeOrder} disabled={!canPlace} style={{
                width:"100%", padding:"13px", borderRadius:11, border:"none", cursor:canPlace?"pointer":"not-allowed",
                background:placed?C.green:canPlace?C.accent:C.border,
                color:canPlace?C.bg:C.muted, fontWeight:700, fontSize:15, transition:"all .2s"
              }}>
                {placed?"✅ Order Placed!":"⚡ Place Order"}
              </button>
            </div>
          </div>
        )}

        {/* Mobile: floating cart button + slide-up cart sheet */}
        {isMobile && (
          <>
            {cartCount > 0 && !showCart && (
              <button onClick={()=>setShowCart(true)} style={{
                position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)",
                background:C.accent, color:C.bg, border:"none", borderRadius:30,
                padding:"12px 28px", fontSize:14, fontWeight:800, cursor:"pointer",
                boxShadow:`0 4px 20px ${C.accent}66`, zIndex:50,
                display:"flex", alignItems:"center", gap:10, whiteSpace:"nowrap"
              }}>
                🛒 View Cart ({cartCount}) · {inr(subtotal)}
              </button>
            )}
            {showCart && (
              <div style={{
                position:"absolute", inset:0, zIndex:100,
                background:C.bg, display:"flex", flexDirection:"column"
              }}>
                <div style={{ display:"flex", alignItems:"center", padding:"12px 14px", background:C.surface, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
                  <button onClick={()=>setShowCart(false)} style={{ background:"none", color:C.muted, border:"none", fontSize:20, cursor:"pointer", marginRight:10 }}>←</button>
                  <div className="playfair" style={{ fontSize:16, fontWeight:700 }}>Your Cart</div>
                </div>
                <div style={{ flex:1, overflowY:"auto", padding:"12px 14px" }}>
                  {/* Table & details */}
                  <div style={{ marginBottom:14 }}>
                    <div style={{ fontSize:11, color:C.muted, fontWeight:600, marginBottom:6 }}>TABLE</div>
                    <select value={tableId} onChange={e=>setTableId(e.target.value)} style={{ fontSize:13, marginBottom:8 }}>
                      <option value="">Select table...</option>
                      {data.tables.filter(t=>t.status!=="reserved").map(t=>(
                        <option key={t.id} value={t.id}>Table {t.number} ({t.status})</option>
                      ))}
                    </select>
                    <input value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="Customer name (optional)" style={{ fontSize:13, marginBottom:8 }} />
                    <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Kitchen note..." style={{ fontSize:13, marginBottom:8 }} />
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:12, color:C.muted, fontWeight:600 }}>DISCOUNT %</span>
                      <input type="number" value={discount} onChange={e=>setDiscount(Math.min(100,Math.max(0,+e.target.value)))} style={{ width:64, fontSize:13 }} />
                    </div>
                  </div>
                  {/* Cart items */}
                  {items.map(item=>(
                    <div key={item.menuId} style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 0", borderBottom:`1px solid ${C.border}22` }}>
                      <div style={{ flex:1, fontSize:13, fontWeight:500 }}>{item.name}</div>
                      <button onClick={()=>chQty(item.menuId,-1)} style={{ width:30, height:30, borderRadius:7, background:C.border, color:C.cream, border:"none", cursor:"pointer", fontSize:16 }}>−</button>
                      <span style={{ fontWeight:700, minWidth:20, textAlign:"center" }}>{item.qty}</span>
                      <button onClick={()=>chQty(item.menuId,1)} style={{ width:30, height:30, borderRadius:7, background:C.border, color:C.cream, border:"none", cursor:"pointer", fontSize:16 }}>+</button>
                      <span style={{ color:C.accent, fontWeight:600, fontSize:13, minWidth:54, textAlign:"right" }}>{inr(item.qty*item.price)}</span>
                      <button onClick={()=>removeItem(item.menuId)} style={{ width:26, height:26, borderRadius:6, background:C.red+"22", color:C.red, border:"none", cursor:"pointer", fontSize:12 }}>✕</button>
                    </div>
                  ))}
                  {/* Totals */}
                  <div style={{ marginTop:16, padding:"12px", background:C.card, borderRadius:12, border:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:C.muted, marginBottom:4 }}><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                    {discAmt>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:C.green, marginBottom:4 }}><span>Discount ({discount}%)</span><span>−{inr(discAmt)}</span></div>}
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:C.muted, marginBottom:8 }}><span>GST (18%)</span><span>{inr(tax)}</span></div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:18, fontWeight:800, color:C.accent }}><span>Total</span><span>{inr(total)}</span></div>
                  </div>
                </div>
                <div style={{ padding:"12px 14px", borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
                  <button onClick={placeOrder} disabled={!canPlace} style={{
                    width:"100%", padding:"15px", borderRadius:12, border:"none", fontSize:16, fontWeight:800,
                    cursor:canPlace?"pointer":"not-allowed", background:placed?C.green:canPlace?C.accent:C.border, color:canPlace?C.bg:C.muted
                  }}>
                    {placed?"✅ Order Placed!":"⚡ Place Order"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    {modifierTarget && <ModifierPicker menuItem={modifierTarget} onConfirm={(mods,extra)=>addItemWithModifiers(modifierTarget,mods,extra)} onClose={()=>setModifierTarget(null)} />}
  );
}

// ── KITCHEN PICKUP ────────────────────────────────────────────
// Lets waiters mark individual items they've picked up from the kitchen to serve
function KitchenPickup({ data, setData, waiterName }) {
  useTheme();
  const readyOrders = data.orders.filter(o => o.status === "served" || (o.status === "preparing" && getOrderStage(o) === "ready"));
  if (!readyOrders.length) return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🍽️ Kitchen Pickup</div>
      <div style={{ color: C.muted, fontSize: 12 }}>No orders ready for pickup right now. Items marked ready in the kitchen will appear here.</div>
    </div>
  );
  return (
    <div style={{ background: C.card, border: `1px solid ${C.green}44`, borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: C.green }}>🍽️ Kitchen Pickup — Ready to Serve</div>
      {readyOrders.map(order => {
        const tbl = data.tables.find(t => t.id === order.tableId);
        const pickedUp = order.pickedUp || {};
        const allPicked = order.items.every((_, i) => pickedUp[i]);
        return (
          <div key={order.id} style={{ background: C.surface, borderRadius: 10, padding: "12px 14px", marginBottom: 10, border: `1px solid ${allPicked ? C.green : C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Table {tbl?.number || "?"} — #{order.id.slice(-5).toUpperCase()}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {!allPicked && <button onClick={() => {
                  const picked = {};
                  order.items.forEach((_, i) => { picked[i] = true; });
                  setData(d => ({ ...d, orders: d.orders.map(o => o.id === order.id ? { ...o, pickedUp: picked, pickedUpBy: waiterName, pickedUpAt: now() } : o) }));
                }} style={{ fontSize: 11, background: C.green + "22", color: C.green, border: `1px solid ${C.green}44`, borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontWeight: 600 }}>✅ Pick All</button>}
                {allPicked && <span style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>✅ All Picked Up{order.pickedUpBy ? ` by ${order.pickedUpBy}` : ""}</span>}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {order.items.map((item, idx) => {
                const picked = pickedUp[idx];
                return (
                  <button key={idx} onClick={() => {
                    const newPickedUp = { ...(order.pickedUp || {}), [idx]: !picked };
                    const allNowPicked = order.items.every((_, i) => newPickedUp[i]);
                    setData(d => ({ ...d, orders: d.orders.map(o => o.id === order.id ? {
                      ...o, pickedUp: newPickedUp,
                      pickedUpBy: allNowPicked ? waiterName : o.pickedUpBy,
                      pickedUpAt: allNowPicked ? now() : o.pickedUpAt,
                    } : o) }));
                  }} style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                    background: picked ? C.green + "22" : C.card,
                    color: picked ? C.green : C.cream,
                    border: `1px solid ${picked ? C.green : C.border}`,
                    textDecoration: picked ? "line-through" : "none",
                    opacity: picked ? 0.7 : 1,
                  }}>
                    {picked ? "✓ " : ""}{item.name} ×{item.qty}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── LIVE ORDER BOARD ──────────────────────────────────────────
function LiveOrderBoard({ data, setData }) {
  useTheme();
  const [now2, setNow2] = useState(Date.now());
  const [stationFilter, setStationFilter] = useState("all");
  const [onlyActive, setOnlyActive] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setNow2(Date.now()), 10000);
    return () => clearInterval(iv);
  }, []);

  const sc = { pending: C.muted, preparing: C.orange, served: C.blue, paid: C.green, cancelled: C.red };
  const stageIcon = { queued: "⏳", cooking: "🔥", plating: "🍽️", ready: "✅" };
  const stageColor = { queued: C.muted, cooking: C.orange, plating: C.purple, ready: C.green };

  const activeOrders = data.orders.filter(o =>
    (onlyActive ? ["pending", "preparing", "served"].includes(o.status) : o.status !== "cancelled") &&
    (stationFilter === "all" || (() => {
      const station = routeItemToStation({ menuId: o.items[0]?.menuId }, data.menu, data.restaurant);
      return station?.id === stationFilter;
    })())
  );

  const stations = getStations(data.restaurant);

  const markStatus = (orderId, status) => {
    setData(d => ({ ...d, orders: d.orders.map(o => o.id === orderId ? { ...o, status } : o) }));
  };

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div className="playfair" style={{ fontSize: 24 }}>Live Order Board</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          {/* Active-only toggle */}
          <button onClick={() => setOnlyActive(s => !s)} style={{
            padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
            background: onlyActive ? C.accent + "22" : C.surface,
            color: onlyActive ? C.accent : C.muted,
            border: `1px solid ${onlyActive ? C.accent + "44" : C.border}`
          }}>{onlyActive ? "● Active Only" : "○ All Orders"}</button>
          {/* Station filters */}
          {[{ id: "all", name: "All Stations", emoji: "📋" }, ...stations].map(s => (
            <button key={s.id} onClick={() => setStationFilter(s.id)} style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
              background: stationFilter === s.id ? (s.color || C.accent) + "22" : "transparent",
              color: stationFilter === s.id ? (s.color || C.accent) : C.muted,
              border: `1px solid ${stationFilter === s.id ? (s.color || C.accent) + "44" : C.border}`
            }}>{s.emoji} {s.name}</button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10, marginBottom: 18 }}>
        {[
          { label: "Pending", count: data.orders.filter(o => o.status === "pending").length, color: C.muted },
          { label: "Preparing", count: data.orders.filter(o => o.status === "preparing").length, color: C.orange },
          { label: "Served", count: data.orders.filter(o => o.status === "served").length, color: C.blue },
          { label: "Paid Today", count: data.orders.filter(o => o.status === "paid" && o.createdAt?.startsWith(today())).length, color: C.green },
        ].map(stat => (
          <div key={stat.label} style={{ background: C.card, borderRadius: 10, padding: "10px 14px", border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.count}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {activeOrders.length === 0 && (
        <div style={{ color: C.muted, textAlign: "center", padding: 48, fontSize: 13 }}>No active orders right now 🎉</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        {[...activeOrders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(o => {
          const tbl = data.tables.find(t => t.id === o.tableId);
          const ageMs = now2 - new Date(o.createdAt).getTime();
          const ageMin = Math.floor(ageMs / 60000);
          const estimate = getOrderEstimate(o, data.menu);
          const overdue = ageMin > estimate && o.status !== "served" && o.status !== "paid";
          const orderStage = getOrderStage(o);
          const vip = isVip(o, data.customers);
          const urgencyColor = vip ? C.purple : overdue ? C.red : ageMin > 20 ? C.orange : C.border;
          const stationsUsed = [...new Set(o.items.map(it => routeItemToStation(it, data.menu, data.restaurant)?.name).filter(Boolean))];

          return (
            <div key={o.id} style={{
              background: C.card,
              border: `2px solid ${urgencyColor}55`,
              borderRadius: 14, padding: 14,
              boxShadow: overdue ? `0 0 0 1px ${C.red}33, 0 4px 16px ${C.red}11` : vip ? `0 0 0 1px ${C.purple}33` : "none",
              transition: "all .2s"
            }}>
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span className="playfair" style={{ fontSize: 16, fontWeight: 700 }}>
                      {tbl ? `Table ${tbl.number}` : "—"}
                    </span>
                    {vip && <span style={{ fontSize: 10, background: C.purple + "22", color: C.purple, padding: "2px 7px", borderRadius: 20, fontWeight: 700 }}>⭐ VIP</span>}
                    {overdue && <span style={{ fontSize: 10, background: C.red + "22", color: C.red, padding: "2px 7px", borderRadius: 20, fontWeight: 700 }}>⚠️ OVERDUE</span>}
                  </div>
                  {o.customerName && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>👤 {o.customerName}</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: overdue ? C.red : ageMin > 20 ? C.orange : C.muted, fontWeight: 700 }}>⏱ {ageMin}m</div>
                  <div style={{ fontSize: 10, color: C.muted }}>est. {estimate}m</div>
                </div>
              </div>

              {/* Stage progress bar */}
              <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                {["queued", "cooking", "plating", "ready"].map(stage => {
                  const stageIdx = ["queued", "cooking", "plating", "ready"].indexOf(stage);
                  const curIdx = ["queued", "cooking", "plating", "ready"].indexOf(orderStage);
                  const active = stageIdx <= curIdx;
                  return (
                    <div key={stage} style={{ flex: 1, height: 4, borderRadius: 2, background: active ? stageColor[stage] : C.border, transition: "background .3s" }} />
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: stageColor[orderStage], fontWeight: 600, marginBottom: 8 }}>
                {stageIcon[orderStage]} {orderStage.charAt(0).toUpperCase() + orderStage.slice(1)}
              </div>

              {/* Items */}
              <div style={{ marginBottom: 10 }}>
                {o.items.map((item, idx) => {
                  const dishStage = (o.dishStages || {})[`dish_${idx}`] || "queued";
                  return (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: `1px solid ${C.border}22`, fontSize: 12 }}>
                      <span style={{ color: C.cream }}>{item.name} <span style={{ color: C.muted }}>×{item.qty}</span></span>
                      <span style={{ fontSize: 10, color: stageColor[dishStage], fontWeight: 600, background: stageColor[dishStage] + "22", padding: "2px 7px", borderRadius: 10 }}>
                        {stageIcon[dishStage]} {dishStage}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Station tags */}
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                {stationsUsed.map(s => (
                  <span key={s} style={{ fontSize: 10, color: C.blue, background: C.blue + "18", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>{s}</span>
                ))}
              </div>

              {/* Status badge + quick action */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Badge label={o.status} color={sc[o.status]} />
                <div style={{ display: "flex", gap: 6 }}>
                  {o.status === "pending" && (
                    <button onClick={() => markStatus(o.id, "preparing")} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 7, background: C.orange + "22", color: C.orange, border: `1px solid ${C.orange}44`, cursor: "pointer", fontWeight: 600 }}>
                      Start
                    </button>
                  )}
                  {o.status === "preparing" && (
                    <button onClick={() => markStatus(o.id, "served")} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 7, background: C.blue + "22", color: C.blue, border: `1px solid ${C.blue}44`, cursor: "pointer", fontWeight: 600 }}>
                      Served
                    </button>
                  )}
                  {o.status === "served" && (
                    <span style={{ fontSize: 10, color: C.muted }}>Awaiting payment</span>
                  )}
                </div>
              </div>
              {o.note && <div style={{ marginTop: 8, fontSize: 11, color: C.muted, background: C.surface, borderRadius: 6, padding: "4px 8px" }}>📝 {o.note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ORDERS ────────────────────────────────────────────────────
function Orders({data,setData,perms,sess,activeWaiter}){
  const effectiveWaiter = (data.restaurant?.waiterMode==="picker" && activeWaiter) ? activeWaiter : (sess?.name||"");
  const [modal,setModal]=useState(null);const [form,setForm]=useState({tableId:"",items:[],customerName:"",note:"",discount:0});
  const [filter,setFilter]=useState("all");const [search,setSearch]=useState("");
  const [splitOrder,setSplitOrder]=useState(null);
  const [confirmPay,setConfirmPay]=useState(null); // order to confirm payment for
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const sc={pending:C.muted,preparing:C.accent,served:C.blue,paid:C.green,cancelled:C.red};
  const addItem=m=>{setForm(f=>{const ex=f.items.find(i=>i.menuId===m.id);if(ex)return{...f,items:f.items.map(i=>i.menuId===m.id?{...i,qty:i.qty+1}:i)};return{...f,items:[...f.items,{menuId:m.id,name:m.name,qty:1,price:m.price}]};});};
  const chQty=(menuId,delta)=>setForm(f=>({...f,items:f.items.map(i=>i.menuId===menuId?{...i,qty:Math.max(0,i.qty+delta)}:i).filter(i=>i.qty>0)}));
  const rmItem=menuId=>setForm(f=>({...f,items:f.items.filter(i=>i.menuId!==menuId)}));
  const subtotal=form.items.reduce((s,i)=>s+i.qty*i.price,0);
  const tax=Math.round(subtotal*0.18);
  const disc=+form.discount||0;
  const total=subtotal+tax-disc;
  const cats=[...new Set(data.menu.map(m=>m.category))];
  const filtered=data.orders.filter(o=>{
    const matchF=filter==="all"||o.status===filter;
    const matchS=!search||o.customerName?.toLowerCase().includes(search.toLowerCase())||o.id.includes(search);
    return matchF&&matchS;
  });
  return <div className="fade-in">
    {/* Kitchen Pickup for waiters */}
    {(sess?.role==="waiter"||sess?.role==="admin"||sess?.role==="manager")&&<KitchenPickup data={data} setData={setData} waiterName={effectiveWaiter} />}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div className="playfair" style={{fontSize:24}}>Orders</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <ExportMenu
          label="Export"
          csvRows={data.orders.map(o=>({id:o.id,date:o.createdAt.split("T")[0],time:fmtTime(o.createdAt),customer:o.customerName||"",table:data.tables.find(t=>t.id===o.tableId)?.number||"",items:o.items.map(i=>`${i.name}×${i.qty}`).join("; "),subtotal:o.items.reduce((s,i)=>s+i.qty*i.price,0),tax:o.tax||0,discount:o.discount||0,total:o.total,status:o.status,note:o.note||""}))}
          csvName="orders"
          printHtml={`<div class="title">Orders Report</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>ID</th><th>Date</th><th>Customer</th><th>Table</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>${data.orders.map(o=>`<tr><td>#${o.id.slice(-6).toUpperCase()}</td><td>${o.createdAt.split("T")[0]}</td><td>${o.customerName||"—"}</td><td>${data.tables.find(t=>t.id===o.tableId)?.number||"—"}</td><td>${o.items.map(i=>i.name+"×"+i.qty).join(", ")}</td><td>₹${o.total?.toLocaleString("en-IN")}</td><td>${o.status}</td></tr>`).join("")}</tbody></table>`}
          printName="Orders Report"
          wordHtml={`<div class="title">Orders Report</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>ID</th><th>Date</th><th>Customer</th><th>Table</th><th>Total</th><th>Status</th></tr></thead><tbody>${data.orders.map(o=>`<tr><td>#${o.id.slice(-6).toUpperCase()}</td><td>${o.createdAt.split("T")[0]}</td><td>${o.customerName||"—"}</td><td>${data.tables.find(t=>t.id===o.tableId)?.number||"—"}</td><td>₹${o.total?.toLocaleString("en-IN")}</td><td>${o.status}</td></tr>`).join("")}</tbody></table>`}
          wordName="Orders_Report"
        />
        <Btn onClick={()=>{setForm({tableId:"",items:[],customerName:"",note:"",discount:0});setModal("new");}}>+ New Order</Btn>
      </div>
    </div>
    <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
      {["all","pending","preparing","served","paid","cancelled"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?C.accent+"22":"transparent",color:filter===f?C.accent:C.muted,border:`1px solid ${filter===f?C.accent+"44":"${C.border}"}`,borderRadius:6,padding:"4px 10px",fontSize:12}}>{f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)} {f!=="all"?`(${data.orders.filter(o=>o.status===f).length})`:""}</button>)}
    </div>
    <SearchBar value={search} onChange={setSearch} placeholder="Search by customer name or order ID..." />
    <div style={{display:"grid",gap:8}}>
      {filtered.length===0&&<div style={{color:C.muted,fontSize:13,textAlign:"center",padding:24}}>No orders found.</div>}
      {[...filtered].reverse().map(o=>{
        const tbl=data.tables.find(t=>t.id===o.tableId);
        const elapsed=(ts)=>{const m=Math.floor((Date.now()-new Date(ts))/60000);return m<1?"just now":m<60?`${m}m ago`:m<1440?`${Math.floor(m/60)}h ${m%60}m ago`:`${Math.floor(m/1440)}d ago`;};
        const ageMin=Math.floor((Date.now()-new Date(o.createdAt))/60000);
        const ageColor=ageMin>60?C.red:ageMin>30?C.orange:C.muted;
        return <Card key={o.id} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
              <span style={{fontWeight:600}}>{o.customerName||`Table ${tbl?.number}`}</span>
              <Badge label={o.status} color={sc[o.status]} />
              {o.discount>0&&<Badge label={`-${inr(o.discount)}`} color={C.orange} />}
              {o.note&&<span style={{color:C.muted,fontSize:11}}>📝 {o.note}</span>}
            </div>
            <div style={{color:C.muted,fontSize:11,marginBottom:6,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              <span>{fmtDate(o.createdAt)} · {fmtTime(o.createdAt)}</span>
              <span style={{color:ageColor,fontWeight:600}}>⏱ {elapsed(o.createdAt)}</span>
              <span>Table {tbl?.number}</span>
              <span style={{color:C.muted}}>#{o.id.slice(-6)}</span>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{o.items.map((i,idx)=>(
              <span key={idx} style={{background:C.border,borderRadius:5,padding:"2px 8px",fontSize:11,display:"inline-flex",alignItems:"center",gap:4}}>
                {i.name} ×{i.qty}
                {((i.modifiers&&i.modifiers.length)||(i.note))&&<span style={{color:C.accent,fontSize:10}}>
                  {[...(i.modifiers||[]),i.note].filter(Boolean).join(", ")}
                </span>}
              </span>
            ))}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            {perms.canSeeFinancials&&<div style={{color:C.accent,fontWeight:700,fontSize:16,marginBottom:6}}>{inr(o.total)}</div>}
            <select value={o.status} style={{fontSize:12,padding:"4px 8px",marginBottom:6}} onChange={e=>setData(d=>({...d,orders:d.orders.map(x=>x.id===o.id?{...x,status:e.target.value}:x)}))}>
              <option>pending</option><option>preparing</option><option>served</option><option>paid</option><option>cancelled</option>
            </select>
            <div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>
              <InvoiceMenu order={o} data={data} />
              <Btn size="sm" variant="ghost" onClick={()=>printerStore.cfg ? thermalPrintKitchen(o,data) : printKitchenTicket(o,data)}>🍳 Kitchen</Btn>
              <Btn size="sm" variant="ghost" onClick={()=>setSplitOrder(o)}>💳 Split</Btn>
              <Btn size="sm" variant="ghost" onClick={()=>{setForm({...o,discount:o.discount||0,note:o.note||""});setModal("edit");}}>✏️ Edit</Btn>
              {o.status!=="paid"&&<Btn size="sm" variant="success" onClick={()=>setConfirmPay(o)}>✓ Paid</Btn>}
              <Btn size="sm" variant="ghost" onClick={()=>{const newO={...o,id:mkId(),createdAt:now(),status:"pending"};setData(d=>({...d,orders:[...d.orders,newO]}));}}>📋 Duplicate</Btn>
              {perms.canDelete&&<Btn size="sm" variant="danger" onClick={()=>setData(d=>({...d,orders:d.orders.filter(x=>x.id!==o.id)}))}>Delete</Btn>}
            </div>
          </div>
        </Card>;
      })}
    </div>
    {splitOrder&&<SplitBill order={splitOrder} onClose={()=>setSplitOrder(null)} data={data} />}
    {confirmPay&&<BillModal order={confirmPay} data={data} setData={setData} onClose={()=>setConfirmPay(null)} sess={sess} />}
    {modal==="edit"&&<Modal title="Edit Order" onClose={()=>setModal(null)} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        <div>
          <div style={{fontWeight:600,marginBottom:8,fontSize:11,color:C.muted,letterSpacing:.5}}>ADD FROM MENU</div>
          <div style={{maxHeight:260,overflowY:"auto",marginBottom:12}}>
            {cats.map(cat=>(
              <div key={cat} style={{marginBottom:8}}>
                <div style={{fontSize:10,color:C.muted,fontWeight:600,letterSpacing:.5,marginBottom:3}}>{cat.toUpperCase()}</div>
                {data.menu.filter(m=>m.category===cat&&m.available).map(m=>(
                  <div key={m.id} onClick={()=>setForm(f=>{const ex=f.items.find(i=>i.menuId===m.id);if(ex)return{...f,items:f.items.map(i=>i.menuId===m.id?{...i,qty:i.qty+1}:i)};return{...f,items:[...f.items,{menuId:m.id,name:m.name,qty:1,price:m.price}]};})}
                    style={{display:"flex",justifyContent:"space-between",padding:"5px 8px",borderRadius:6,marginBottom:2,background:C.bg,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:12}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                    <span>{m.name}</span><span style={{color:C.accent,fontWeight:600}}>{inr(m.price)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Field label="CUSTOMER NAME (optional)"><input value={form.customerName||""} onChange={sf("customerName")} placeholder="Leave blank for anonymous" /></Field>
          <Field label="TABLE"><select value={form.tableId||""} onChange={sf("tableId")}><option value="">Select table</option>{data.tables.map(t=><option key={t.id} value={t.id}>Table {t.number}</option>)}</select></Field>
          <Field label="STATUS"><select value={form.status||"pending"} onChange={sf("status")}><option>pending</option><option>preparing</option><option>served</option><option>paid</option><option>cancelled</option></select></Field>
          <Field label="DISCOUNT (₹)"><input type="number" value={form.discount||""} onChange={sf("discount")} placeholder="0" /></Field>
          <Field label="KITCHEN NOTE (no limit)"><textarea value={form.note||""} onChange={sf("note")} placeholder="Special instructions, allergies, preferences..." rows={3} style={{resize:"vertical"}} /></Field>
        </div>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontWeight:600,fontSize:11,color:C.muted,letterSpacing:.5}}>ITEMS ({(form.items||[]).length})</div>
            <Btn size="sm" variant="ghost" onClick={()=>setForm(f=>({...f,items:[...f.items,{name:"",qty:1,price:0,menuId:mkId()}]}))}>+ Custom Item</Btn>
          </div>
          <div style={{maxHeight:340,overflowY:"auto"}}>
            {(form.items||[]).map((item,i)=>(
              <div key={i} style={{marginBottom:8,padding:"8px 10px",background:C.surface,borderRadius:8,border:`1px solid ${C.border}`}}>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:4,marginBottom:5}}>
                  <input placeholder="Item name" value={item.name||""} onChange={e=>setForm(f=>({...f,items:f.items.map((x,j)=>j===i?{...x,name:e.target.value}:x)}))} style={{fontSize:12}} />
                  <input placeholder="Qty" type="number" value={item.qty||""} onChange={e=>setForm(f=>({...f,items:f.items.map((x,j)=>j===i?{...x,qty:+e.target.value}:x)}))} style={{fontSize:12}} />
                  <input placeholder="₹" type="number" value={item.price||""} onChange={e=>setForm(f=>({...f,items:f.items.map((x,j)=>j===i?{...x,price:+e.target.value}:x)}))} style={{fontSize:12}} />
                  <button onClick={()=>setForm(f=>({...f,items:f.items.filter((_,j)=>j!==i)}))} style={{background:C.red+"22",color:C.red,borderRadius:6,padding:"0 8px",fontSize:14}}>✕</button>
                </div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:4}}>
                  {["No onion","No garlic","Extra spicy","Mild","No ice","Extra cheese","Less oil","No sugar","Well done","Medium","Rare","No salt"].map(p=>{
                    const active=(item.modifiers||[]).includes(p);
                    return <button key={p} onClick={()=>setForm(f=>({...f,items:f.items.map((x,j)=>j===i?{...x,modifiers:active?(x.modifiers||[]).filter(m=>m!==p):[...(x.modifiers||[]),p]}:x)}))}
                      style={{fontSize:9,padding:"1px 6px",borderRadius:20,background:active?C.accent+"33":"transparent",color:active?C.accent:C.muted,border:`1px solid ${active?C.accent:C.border}`,cursor:"pointer"}}>{p}</button>;
                  })}
                </div>
                <textarea value={item.note||""} onChange={e=>setForm(f=>({...f,items:f.items.map((x,j)=>j===i?{...x,note:e.target.value}:x)}))}
                  placeholder="Item note (no limit)..." rows={2} style={{fontSize:11,width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,color:C.cream,resize:"vertical",padding:"4px 8px"}} />
              </div>
            ))}
          </div>
          {(()=>{
            const items=form.items||[];const sub=items.reduce((s,i)=>s+i.qty*(+i.price),0);const t=Math.round(sub*0.18);const d=+form.discount||0;const tot=sub+t-d;
            return <div style={{background:C.surface,borderRadius:8,padding:"8px 12px",marginTop:8,fontSize:12}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:C.muted}}>Subtotal</span><span>{inr(sub)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:C.muted}}>GST 18%</span><span>{inr(t)}</span></div>
              {d>0&&<div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:C.muted}}>Discount</span><span style={{color:C.orange}}>-{inr(d)}</span></div>}
              <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,color:C.accent,borderTop:`1px solid ${C.border}`,paddingTop:5,marginTop:4,fontSize:14}}><span>Total</span><span>{inr(tot)}</span></div>
            </div>;
          })()}
          <div style={{marginTop:10}}>
            <Btn full onClick={()=>{
              const items=form.items||[];
              const subtotal=items.reduce((s,i)=>s+i.qty*i.price,0);
              const tax=Math.round(subtotal*0.18);
              const disc=+form.discount||0;
              const total=subtotal+tax-disc;
              setData(d=>({...d,orders:d.orders.map(o=>o.id===form.id?{...form,tax,total,discount:disc}:o),tables:d.tables.map(t=>t.id===form.tableId&&form.status==="paid"?{...t,status:"available",occupiedAt:null}:t)}));
              setModal(null);
            }}>Save Changes</Btn>
          </div>
        </div>
      </div>
    </Modal>}
    {modal==="new"&&<Modal title="New Order" onClose={()=>setModal(null)} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        <div style={{maxHeight:480,overflowY:"auto",paddingRight:6}}>
          <div style={{fontWeight:600,marginBottom:8,fontSize:11,color:C.muted,letterSpacing:.5}}>MENU — click to add</div>
          {cats.map(cat=>(
            <div key={cat} style={{marginBottom:10}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:600,letterSpacing:.5,marginBottom:4}}>{cat.toUpperCase()}</div>
              {data.menu.filter(m=>m.category===cat&&m.available).map(m=>(
                <div key={m.id} onClick={()=>addItem(m)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",borderRadius:7,marginBottom:3,background:C.bg,border:`1px solid ${C.border}`,cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent} onMouseLeave={e=>e.currentTarget.style.borderColor="${C.border}"}>
                  <div><span style={{fontSize:12}}>{m.name}</span>{m.tag&&<span style={{fontSize:10,color:C.muted,marginLeft:5}}>[{m.tag}]</span>}</div>
                  <span style={{color:C.accent,fontSize:12,fontWeight:600}}>{inr(m.price)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div style={{fontWeight:600,marginBottom:8,fontSize:11,color:C.muted,letterSpacing:.5}}>ORDER</div>
          {form.items.length===0
            ?<div style={{color:C.muted,fontSize:13,textAlign:"center",padding:"20px 0"}}>← Click items to add</div>
            :<div style={{marginBottom:10}}>
              {form.items.map(item=>(
                <div key={item.menuId} style={{padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <div style={{flex:1,fontSize:12,fontWeight:500}}>{item.name}</div>
                    <button onClick={()=>chQty(item.menuId,-1)} style={{width:24,height:24,borderRadius:5,background:C.border,color:C.cream,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:13,fontWeight:600,minWidth:16,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={()=>chQty(item.menuId,1)} style={{width:24,height:24,borderRadius:5,background:C.border,color:C.cream,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    <div style={{color:C.accent,fontSize:12,fontWeight:600,minWidth:44,textAlign:"right"}}>{inr(item.qty*item.price)}</div>
                    <button onClick={()=>rmItem(item.menuId)} style={{width:22,height:22,borderRadius:5,background:C.red+"22",color:C.red,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                  </div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:3}}>
                    {["No onion","No garlic","Extra spicy","Mild","No ice","Extra cheese","Less oil","No sugar"].map(p=>{
                      const active=(item.modifiers||[]).includes(p);
                      return <button key={p} onClick={()=>setForm(f=>({...f,items:f.items.map(x=>x.menuId===item.menuId?{...x,modifiers:active?(x.modifiers||[]).filter(m=>m!==p):[...(x.modifiers||[]),p]}:x)}))}
                        style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:active?C.accent+"33":"transparent",color:active?C.accent:C.muted,border:`1px solid ${active?C.accent:C.border}`,cursor:"pointer",transition:"all .1s"}}>{p}</button>;
                    })}
                  </div>
                  <input value={item.note||""} onChange={e=>setForm(f=>({...f,items:f.items.map(x=>x.menuId===item.menuId?{...x,note:e.target.value}:x)}))}
                    placeholder="Custom note (optional)..." style={{fontSize:11,padding:"4px 8px",width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,color:C.cream}} />
                </div>
              ))}
              <div style={{marginTop:8,fontSize:12,color:C.muted}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span>Subtotal</span><span style={{color:C.cream}}>{inr(subtotal)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span>GST (18%)</span><span style={{color:C.cream}}>{inr(tax)}</span></div>
                {disc>0&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span>Discount</span><span style={{color:C.orange}}>-{inr(disc)}</span></div>}
                <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,color:C.accent,fontSize:14,marginTop:4,paddingTop:4,borderTop:`1px solid ${C.border}`}}><span>Total</span><span>{inr(total)}</span></div>
              </div>
            </div>}
          <Field label="CUSTOMER NAME (optional)"><input value={form.customerName} onChange={sf("customerName")} placeholder="Leave blank if not needed" /></Field>
          <Field label="TABLE"><select value={form.tableId} onChange={sf("tableId")}><option value="">Select table</option>{data.tables.map(t=><option key={t.id} value={t.id}>Table {t.number} ({t.status})</option>)}</select></Field>
          <Field label="DISCOUNT (₹)"><input type="number" value={form.discount||""} onChange={sf("discount")} placeholder="0" /></Field>
          <Field label="KITCHEN NOTE"><textarea value={form.note} onChange={sf("note")} placeholder="Less spicy, no onion, allergies..." rows={3} style={{resize:"vertical",minHeight:60}} /></Field>
          <Btn full onClick={()=>{setData(d=>({...d,orders:[...d.orders,{id:mkId(),...form,discount:disc,tax,total,createdAt:now(),status:"pending",waiterName:effectiveWaiter}],tables:d.tables.map(t=>t.id===form.tableId?{...t,status:"occupied",occupiedAt:t.occupiedAt||Date.now()}:t),ingredients:deductIngredients(form.items,d.menu,d.ingredients||[])}));setModal(null);}} disabled={!form.tableId||form.items.length===0}>Place Order →</Btn>
        </div>
      </div>
    </Modal>}
  </div>;
}

// ── MENU ──────────────────────────────────────────────────────
// Helpers for availability scheduling
function isMenuItemAvailableNow(m) {
  if (!m.available) return false;
  if (!m.scheduleEnabled || !m.scheduleSlots || m.scheduleSlots.length === 0) return true;
  const now = new Date();
  const day = now.getDay(); // 0=Sun,6=Sat
  const mins = now.getHours() * 60 + now.getMinutes();
  const dayNames = ["sun","mon","tue","wed","thu","fri","sat"];
  return m.scheduleSlots.some(slot => {
    if (!slot.days || !slot.days.includes(dayNames[day])) return false;
    const [sh, sm] = (slot.from || "00:00").split(":").map(Number);
    const [eh, em] = (slot.to   || "23:59").split(":").map(Number);
    const start = sh * 60 + sm, end = eh * 60 + em;
    return mins >= start && mins <= end;
  });
}

function ScheduleEditor({slots, onChange}) {
  useTheme();
  const days = ["mon","tue","wed","thu","fri","sat","sun"];
  const addSlot = () => onChange([...slots, {id:mkId(), days:["mon","tue","wed","thu","fri"], from:"11:00", to:"22:00"}]);
  const removeSlot = id => onChange(slots.filter(s => s.id !== id));
  const updateSlot = (id, key, val) => onChange(slots.map(s => s.id===id ? {...s,[key]:val} : s));
  const toggleDay = (id, day) => {
    const slot = slots.find(s=>s.id===id);
    const days = slot.days.includes(day) ? slot.days.filter(d=>d!==day) : [...slot.days, day];
    updateSlot(id, "days", days);
  };
  return <div>
    {slots.map(slot => (
      <div key={slot.id} style={{background:C.surface, borderRadius:9, padding:"10px 12px", marginBottom:8, border:`1px solid ${C.border}`}}>
        <div style={{display:"flex", gap:4, flexWrap:"wrap", marginBottom:8}}>
          {days.map(d => {
            const on = slot.days.includes(d);
            return <button key={d} onClick={() => toggleDay(slot.id, d)}
              style={{padding:"3px 8px", borderRadius:5, fontSize:11, fontWeight:700, cursor:"pointer",
                background: on ? C.accent+"33" : "transparent",
                color: on ? C.accent : C.muted,
                border: `1px solid ${on ? C.accent : C.border}`}}>{d.toUpperCase()}</button>;
          })}
        </div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:10, color:C.muted, marginBottom:3}}>FROM</div>
            <input type="time" value={slot.from||"11:00"} onChange={e=>updateSlot(slot.id,"from",e.target.value)} style={{fontSize:12}} />
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:10, color:C.muted, marginBottom:3}}>TO</div>
            <input type="time" value={slot.to||"22:00"} onChange={e=>updateSlot(slot.id,"to",e.target.value)} style={{fontSize:12}} />
          </div>
          <button onClick={()=>removeSlot(slot.id)} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:12,marginTop:14}}>✕</button>
        </div>
      </div>
    ))}
    <button onClick={addSlot} style={{fontSize:12, color:C.accent, background:C.accent+"11", border:`1px dashed ${C.accent}`, borderRadius:7, padding:"5px 14px", cursor:"pointer", width:"100%"}}>+ Add Time Slot</button>
  </div>;
}

function MenuItemModal({item, modal, onSave, onDelete, perms, onClose}) {
  useTheme();
  const isNew = modal === "add";
  const [form, setForm] = useState(() => item ? {
    ...item,
    price: String(item.price||""),
    cost: String(item.cost||""),
    scheduleSlots: item.scheduleSlots || [],
    scheduleEnabled: item.scheduleEnabled || false,
    variants: item.variants || [],
    modifierGroups: item.modifierGroups || [],
    allergens: item.allergens || [],
    spiceLevel: item.spiceLevel || "none",
    isVeg: item.isVeg ?? false,
    calories: item.calories || "",
    preparationTime: item.preparationTime || "",
    ingredients: item.ingredients || [],
  } : {
    name:"", category:"Mains", price:"", cost:"", description:"", tag:"",
    available:true, stock:"", lowStockAt:"", scheduleEnabled:false, scheduleSlots:[],
    variants:[], modifierGroups:[], allergens:[], spiceLevel:"none", isVeg:false, calories:"", preparationTime:"",
    ingredients:[],
  });
  const sf = k => e => setForm(f => ({...f, [k]: e.target.value}));
  const [tab, setTab] = useState("basic");

  const ALLERGENS = ["Gluten","Dairy","Nuts","Eggs","Soy","Shellfish","Fish","Sesame"];
  const toggleAllergen = a => setForm(f => ({...f, allergens: f.allergens.includes(a) ? f.allergens.filter(x=>x!==a) : [...f.allergens,a]}));

  const addVariant = () => setForm(f => ({...f, variants:[...f.variants,{id:mkId(),name:"",price:"",available:true}]}));
  const updateVariant = (id,k,v) => setForm(f => ({...f, variants:f.variants.map(x=>x.id===id?{...x,[k]:v}:x)}));
  const removeVariant = id => setForm(f => ({...f, variants:f.variants.filter(x=>x.id!==id)}));

  const save = () => {
    if (!form.name.trim() || !form.price) return alert("Name and price are required.");
    onSave({
      ...form,
      price: +form.price, cost: +form.cost || 0,
      stock: form.stock !== "" ? +form.stock : null,
      lowStockAt: form.lowStockAt !== "" ? +form.lowStockAt : null,
      calories: form.calories ? +form.calories : null,
      preparationTime: form.preparationTime ? +form.preparationTime : null,
      variants: form.variants.map(v=>({...v, price:+v.price||0})),
      modifierGroups: form.modifierGroups.map(g=>({...g, options: g.options.map(o=>({...o, price:+o.price||0}))})),
    });
  };

  const tabs = [{id:"basic",label:"📋 Basic"},{id:"ingredients",label:"🧄 Ingredients"},{id:"schedule",label:"🕐 Schedule"},{id:"variants",label:"🍴 Variants"},{id:"modifiers",label:"✏️ Modifiers"},{id:"details",label:"ℹ️ Details"}];

  return <Modal title={isNew ? "Add Menu Item" : `Edit — ${item?.name}`} onClose={onClose} wide>
    {/* Tab bar */}
    <div style={{display:"flex",gap:4,marginBottom:16,borderBottom:`1px solid ${C.border}`,paddingBottom:10,flexWrap:"wrap"}}>
      {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)}
        style={{padding:"5px 12px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",border:"none",
          background:tab===t.id?C.accent+"22":"transparent",color:tab===t.id?C.accent:C.muted}}>{t.label}</button>)}
    </div>

    {/* ── BASIC TAB ── */}
    {tab==="basic"&&<div className="fade-in">
      <Row>
        <Field label="ITEM NAME" half><input value={form.name} onChange={sf("name")} placeholder="e.g. Butter Chicken" autoFocus /></Field>
        <Field label="CATEGORY" half>
          <input value={form.category} onChange={sf("category")} list="cat-list" placeholder="Mains / Starters..." />
        </Field>
      </Row>
      <Row>
        <Field label="PRICE (₹)" half><input type="number" value={form.price} onChange={sf("price")} placeholder="0" /></Field>
        <Field label="COST PRICE (₹)" half><input type="number" value={form.cost} onChange={sf("cost")} placeholder="0" /></Field>
      </Row>
      <Row>
        <Field label="STOCK QTY" half><input type="number" value={form.stock??""} onChange={sf("stock")} placeholder="Leave blank = unlimited" /></Field>
        <Field label="LOW STOCK ALERT AT" half><input type="number" value={form.lowStockAt??""} onChange={sf("lowStockAt")} placeholder="e.g. 5" /></Field>
      </Row>
      <Field label="DESCRIPTION"><textarea value={form.description} onChange={sf("description")} rows={2} placeholder="Brief description shown to staff..." /></Field>
      <Row>
        <Field label="TAG" half><input value={form.tag} onChange={sf("tag")} placeholder="bestseller / veg / spicy / new" /></Field>
        <Field label="AVAILABLE NOW" half>
          <select value={form.available?"yes":"no"} onChange={e=>setForm(f=>({...f,available:e.target.value==="yes"}))}>
            <option value="yes">✅ Yes — Available</option>
            <option value="no">❌ No — 86'd</option>
          </select>
        </Field>
      </Row>
      <Row>
        <Field label="IS VEG?" half>
          <select value={form.isVeg?"yes":"no"} onChange={e=>setForm(f=>({...f,isVeg:e.target.value==="yes"}))}>
            <option value="yes">🟢 Vegetarian</option>
            <option value="no">🔴 Non-Veg</option>
          </select>
        </Field>
        <Field label="SPICE LEVEL" half>
          <select value={form.spiceLevel} onChange={sf("spiceLevel")}>
            <option value="none">None</option>
            <option value="mild">🌶 Mild</option>
            <option value="medium">🌶🌶 Medium</option>
            <option value="hot">🌶🌶🌶 Hot</option>
            <option value="extra">🌶🌶🌶🌶 Extra Hot</option>
          </select>
        </Field>
      </Row>
    </div>}

    {/* ── INGREDIENTS TAB ── */}
    {tab==="ingredients"&&<div className="fade-in">
      <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.6}}>
        Link ingredients to this dish. Stock will be auto-deducted when orders are placed.
      </div>
      {(form.ingredients||[]).map((link,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr auto",gap:6,marginBottom:8,alignItems:"center"}}>
          <select value={link.ingId||""} onChange={e=>setForm(f=>({...f,ingredients:f.ingredients.map((x,j)=>j===i?{...x,ingId:e.target.value}:x)}))}>
            <option value="">Select ingredient...</option>
            {/* ingredients come from data but MenuItemModal doesn't receive data — we pass via context trick */}
            {(window.__rcm_ingredients||[]).map(ing=><option key={ing.id} value={ing.id}>{ing.name} ({ing.unit})</option>)}
          </select>
          <input type="number" min="0" step="0.01" value={link.qty||""} onChange={e=>setForm(f=>({...f,ingredients:f.ingredients.map((x,j)=>j===i?{...x,qty:+e.target.value}:x)}))} placeholder="Qty" style={{fontSize:12}} />
          <span style={{fontSize:11,color:C.muted,padding:"0 4px"}}>{(window.__rcm_ingredients||[]).find(x=>x.id===link.ingId)?.unit||"unit"} per serving</span>
          <button onClick={()=>setForm(f=>({...f,ingredients:f.ingredients.filter((_,j)=>j!==i)}))} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"8px 10px",cursor:"pointer"}}>✕</button>
        </div>
      ))}
      <button onClick={()=>setForm(f=>({...f,ingredients:[...(f.ingredients||[]),{ingId:"",qty:""}]}))} style={{fontSize:12,color:C.accent,background:C.accent+"11",border:`1px dashed ${C.accent}`,borderRadius:7,padding:"6px 14px",cursor:"pointer",width:"100%",marginTop:4}}>+ Link Ingredient</button>
    </div>}

    {/* ── SCHEDULE TAB ── */}
    {tab==="schedule"&&<div className="fade-in">
      <div style={{background:C.surface,borderRadius:9,padding:"10px 14px",marginBottom:12,fontSize:12,color:C.muted,lineHeight:1.6}}>
        ⏰ Set time windows when this item is available. Outside these windows it will automatically show as unavailable.<br/>
        <strong style={{color:C.cream}}>Leave disabled to use the manual Available toggle instead.</strong>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
        <span style={{fontWeight:600,fontSize:13}}>Enable Availability Schedule</span>
        <button onClick={()=>setForm(f=>({...f,scheduleEnabled:!f.scheduleEnabled}))}
          style={{width:44,height:24,borderRadius:12,background:form.scheduleEnabled?C.accent:C.border,border:"none",cursor:"pointer",position:"relative",transition:"background .2s"}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form.scheduleEnabled?23:3,transition:"left .2s"}} />
        </button>
      </div>
      {form.scheduleEnabled&&<ScheduleEditor slots={form.scheduleSlots} onChange={slots=>setForm(f=>({...f,scheduleSlots:slots}))} />}
      {form.scheduleEnabled&&form.scheduleSlots.length>0&&(()=>{
        const avail=isMenuItemAvailableNow({...form,available:true});
        return <div style={{marginTop:10,padding:"8px 12px",background:avail?C.green+"18":C.red+"18",borderRadius:8,fontSize:12,color:avail?C.green:C.red,fontWeight:600}}>
          {avail?"✅ Currently within an active schedule window":"⛔ Currently outside all schedule windows — item will show as unavailable"}
        </div>;
      })()}
    </div>}

    {/* ── VARIANTS TAB ── */}
    {tab==="variants"&&<div className="fade-in">
      <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.6}}>
        Add size or style variants (e.g. Half / Full, Small / Large). Each variant can have its own price.
      </div>
      {form.variants.map(v=>(
        <div key={v.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr auto auto",gap:6,marginBottom:8,alignItems:"center"}}>
          <input value={v.name} onChange={e=>updateVariant(v.id,"name",e.target.value)} placeholder="Variant name (e.g. Half)" style={{fontSize:12}} />
          <input type="number" value={v.price} onChange={e=>updateVariant(v.id,"price",e.target.value)} placeholder="Price (₹)" style={{fontSize:12}} />
          <select value={v.available?"yes":"no"} onChange={e=>updateVariant(v.id,"available",e.target.value==="yes")} style={{fontSize:12,padding:"9px 8px"}}>
            <option value="yes">On</option><option value="no">Off</option>
          </select>
          <button onClick={()=>removeVariant(v.id)} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"8px 10px",cursor:"pointer"}}>✕</button>
        </div>
      ))}
      <button onClick={addVariant} style={{fontSize:12,color:C.accent,background:C.accent+"11",border:`1px dashed ${C.accent}`,borderRadius:7,padding:"6px 14px",cursor:"pointer",width:"100%",marginTop:4}}>+ Add Variant</button>
    </div>}

    {/* ── MODIFIERS TAB ── */}
    {tab==="modifiers"&&<div className="fade-in">
      <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.6}}>
        Add modifier groups (e.g. "Extras", "Add-ons"). Each option has a name and an extra charge. Guests can pick modifiers when ordering.
      </div>
      {(form.modifierGroups||[]).map((grp,gi)=>(
        <div key={grp.id} style={{background:C.surface,borderRadius:10,padding:"10px 12px",marginBottom:10,border:`1px solid ${C.border}`}}>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
            <input value={grp.name} onChange={e=>setForm(f=>({...f,modifierGroups:f.modifierGroups.map((g,i)=>i===gi?{...g,name:e.target.value}:g)}))} placeholder="Group name (e.g. Extras)" style={{flex:1,fontSize:13,fontWeight:600}} />
            <select value={grp.type||"multi"} onChange={e=>setForm(f=>({...f,modifierGroups:f.modifierGroups.map((g,i)=>i===gi?{...g,type:e.target.value}:g)}))} style={{fontSize:12,padding:"9px 8px",width:120}}>
              <option value="multi">Multi-select</option>
              <option value="single">Single-select</option>
            </select>
            <button onClick={()=>setForm(f=>({...f,modifierGroups:f.modifierGroups.filter((_,i)=>i!==gi)}))} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"6px 10px",cursor:"pointer",fontSize:12}}>✕ Group</button>
          </div>
          {(grp.options||[]).map((opt,oi)=>(
            <div key={opt.id} style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:6,marginBottom:6,alignItems:"center"}}>
              <input value={opt.name} onChange={e=>setForm(f=>({...f,modifierGroups:f.modifierGroups.map((g,i)=>i!==gi?g:{...g,options:g.options.map((o,j)=>j===oi?{...o,name:e.target.value}:o)})}))} placeholder="Option name (e.g. Add Cheese)" style={{fontSize:12}} />
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <span style={{fontSize:11,color:C.muted,flexShrink:0}}>+₹</span>
                <input type="number" value={opt.price||""} onChange={e=>setForm(f=>({...f,modifierGroups:f.modifierGroups.map((g,i)=>i!==gi?g:{...g,options:g.options.map((o,j)=>j===oi?{...o,price:e.target.value}:o)})}))} placeholder="0" style={{fontSize:12,width:70}} />
              </div>
              <button onClick={()=>setForm(f=>({...f,modifierGroups:f.modifierGroups.map((g,i)=>i!==gi?g:{...g,options:g.options.filter((_,j)=>j!==oi)})}))} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"6px 8px",cursor:"pointer",fontSize:11}}>✕</button>
            </div>
          ))}
          <button onClick={()=>setForm(f=>({...f,modifierGroups:f.modifierGroups.map((g,i)=>i!==gi?g:{...g,options:[...(g.options||[]),{id:mkId(),name:"",price:""}]})}))} style={{fontSize:11,color:C.accent,background:C.accent+"11",border:`1px dashed ${C.accent}`,borderRadius:6,padding:"4px 12px",cursor:"pointer",width:"100%",marginTop:4}}>+ Add Option</button>
        </div>
      ))}
      <button onClick={()=>setForm(f=>({...f,modifierGroups:[...(f.modifierGroups||[]),{id:mkId(),name:"",type:"multi",options:[]}]}))} style={{fontSize:12,color:C.accent,background:C.accent+"11",border:`1px dashed ${C.accent}`,borderRadius:7,padding:"6px 14px",cursor:"pointer",width:"100%",marginTop:4}}>+ Add Modifier Group</button>
    </div>}

    {/* ── DETAILS TAB ── */}
    {tab==="details"&&<div className="fade-in">
      <Row>
        <Field label="CALORIES (kcal)" half><input type="number" value={form.calories||""} onChange={sf("calories")} placeholder="e.g. 450" /></Field>
        <Field label="PREP TIME (mins)" half><input type="number" value={form.preparationTime||""} onChange={sf("preparationTime")} placeholder="e.g. 15" /></Field>
      </Row>
      <Field label="ALLERGENS">
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>
          {ALLERGENS.map(a=>{
            const on=form.allergens.includes(a);
            return <button key={a} onClick={()=>toggleAllergen(a)}
              style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",
                background:on?C.red+"22":"transparent",color:on?C.red:C.muted,border:`1px solid ${on?C.red:C.border}`}}>{a}</button>;
          })}
        </div>
      </Field>
    </div>}

    <Divider />
    <div style={{display:"flex",gap:8}}>
      <Btn full onClick={save}>{isNew?"Add to Menu":"Save Changes"}</Btn>
      {!isNew&&perms.canDelete&&<Btn variant="danger" onClick={onDelete}>🗑 Delete</Btn>}
    </div>
  </Modal>;
}

function Menu({data,setData,perms}){
  useTheme();
  // Expose ingredients globally for MenuItemModal ingredient picker
  useEffect(()=>{ window.__rcm_ingredients = data.ingredients || []; },[data.ingredients]);
  const [modal,setModal]=useState(null); // "add"|"edit"
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState("");
  const [catFilter,setCatFilter]=useState("all");
  const [view,setView]=useState("grid"); // "grid"|"list"|"heatmap"
  const [now,setNow]=useState(Date.now());

  // Tick every minute to re-evaluate schedule availability
  useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),60000);return()=>clearInterval(id);},[]);

  const cats=[...new Set(data.menu.map(m=>m.category))];
  const margin=m=>m.cost>0?Math.round((m.price-m.cost)/m.price*100):null;

  const filtered=useMemo(()=>data.menu.filter(m=>{
    const matchC=catFilter==="all"||m.category===catFilter;
    const matchS=!search||m.name.toLowerCase().includes(search.toLowerCase())||m.description?.toLowerCase().includes(search.toLowerCase())||m.category.toLowerCase().includes(search.toLowerCase());
    return matchC&&matchS;
  }),[data.menu,catFilter,search,now]);

  const effectiveAvail = m => isMenuItemAvailableNow(m);

  const handleSave = form => {
    if(modal==="add") setData(d=>({...d,menu:[...d.menu,{id:mkId(),...form}]}));
    else setData(d=>({...d,menu:d.menu.map(m=>m.id===form.id?form:m)}));
    setModal(null); setSelected(null);
  };
  const handleDelete = () => {
    setData(d=>({...d,menu:d.menu.filter(m=>m.id!==selected.id)}));
    setModal(null); setSelected(null);
  };
  const quickToggle = (e,m) => {
    e.stopPropagation();
    setData(d=>({...d,menu:d.menu.map(x=>x.id===m.id?{...x,available:!x.available}:x)}));
  };

  // heatmap data
  const salesMap={};
  data.orders.filter(o=>o.status==="paid").forEach(o=>o.items.forEach(i=>{
    if(!salesMap[i.menuId])salesMap[i.menuId]={qty:0,rev:0};
    salesMap[i.menuId].qty+=i.qty; salesMap[i.menuId].rev+=i.qty*i.price;
  }));
  const maxSales=Math.max(1,...Object.values(salesMap).map(s=>s.qty));
  const heatColor=qty=>qty===0?C.border:qty/maxSales<0.33?C.blue:qty/maxSales<0.66?C.accent:C.red;

  const spiceIcon={none:"",mild:"🌶",medium:"🌶🌶",hot:"🌶🌶🌶",extra:"🌶🌶🌶🌶"};

  return <div className="fade-in">
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
      <div className="playfair" style={{fontSize:24}}>Menu Management</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <ExportMenu
          label="Export"
          csvRows={data.menu.map(m=>({name:m.name,category:m.category,price:m.price,cost:m.cost||0,margin:m.cost?(Math.round((m.price-m.cost)/m.price*100)+"%"):"",available:m.available?"Yes":"No",stock:m.stock??"∞",tag:m.tag||""}))}
          csvName="menu"
          printHtml={`<div class="title">Menu</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Cost</th><th>Margin</th><th>Stock</th><th>Available</th><th>Tag</th></tr></thead><tbody>${data.menu.map(m=>`<tr><td>${m.name}</td><td>${m.category}</td><td>₹${m.price}</td><td>₹${m.cost||0}</td><td>${m.cost?Math.round((m.price-m.cost)/m.price*100)+"%":"—"}</td><td>${m.stock??'∞'}</td><td>${m.available?"✅":"❌"}</td><td>${m.tag||"—"}</td></tr>`).join("")}</tbody></table>`}
          printName="Menu Report"
          wordHtml={`<div class="title">Menu</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Available</th></tr></thead><tbody>${data.menu.map(m=>`<tr><td>${m.name}</td><td>${m.category}</td><td>₹${m.price}</td><td>${m.available?"Yes":"No"}</td></tr>`).join("")}</tbody></table>`}
          wordName="Menu"
        />
        {/* View toggle */}
        <div style={{display:"flex",border:`1px solid ${C.border}`,borderRadius:7,overflow:"hidden"}}>
          {[["grid","⊞"],["list","☰"],["heatmap","🌡️"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:"6px 11px",fontSize:13,background:view===v?C.accent:"transparent",color:view===v?C.bg:C.muted,border:"none",cursor:"pointer"}}>{l}</button>
          ))}
        </div>
        {perms.canEditMenu&&<Btn onClick={()=>{setSelected(null);setModal("add");}}>+ Add Item</Btn>}
      </div>
    </div>

    {/* Search + category filter */}
    <SearchBar value={search} onChange={setSearch} placeholder="Search name, description, category..." />
    <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
      {["all",...cats].map(c=>(
        <button key={c} onClick={()=>setCatFilter(c)}
          style={{background:catFilter===c?C.accent+"22":"transparent",color:catFilter===c?C.accent:C.muted,
            border:`1px solid ${catFilter===c?C.accent:C.border}`,borderRadius:6,padding:"3px 10px",fontSize:12,cursor:"pointer"}}>
          {c==="all"?"All (" + data.menu.length + ")":c+" ("+data.menu.filter(x=>x.category===c).length+")"}
        </button>
      ))}
    </div>

    {/* ── GRID VIEW ── */}
    {view==="grid"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:10}}>
      {filtered.map(m=>{
        const mg=margin(m); const avail=effectiveAvail(m); const sales=salesMap[m.id];
        return <Card key={m.id} style={{cursor:"pointer",opacity:avail?1:.6,transition:"all .2s",position:"relative"}}
          onClick={()=>{if(perms.canEditMenu){setSelected(m);setModal("edit");}}}>
          {/* Quick toggle */}
          {perms.canEditMenu&&<button onClick={e=>quickToggle(e,m)}
            style={{position:"absolute",top:8,right:8,width:28,height:16,borderRadius:8,border:"none",cursor:"pointer",
              background:m.available?C.green:C.red,transition:"background .2s"}}
            title={m.available?"Click to 86":"Click to restore"}>
            <div style={{width:12,height:12,borderRadius:"50%",background:"#fff",position:"absolute",top:2,left:m.available?14:2,transition:"left .2s"}} />
          </button>}
          <div style={{paddingRight:36}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2,flexWrap:"wrap"}}>
              {m.isVeg?<span style={{color:C.green,fontSize:11}}>🟢</span>:<span style={{color:C.red,fontSize:11}}>🔴</span>}
              <div style={{fontWeight:600,fontSize:14,flex:1}}>{m.name}</div>
            </div>
            <div style={{color:C.accent,fontWeight:700,fontSize:15,marginBottom:4}}>{inr(m.price)}</div>
          </div>
          {m.description&&<div style={{color:C.muted,fontSize:11,marginBottom:6,lineHeight:1.4}}>{m.description}</div>}
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:5}}>
            <Badge label={avail?"available":"86'd"} color={avail?C.green:C.red} />
            {m.tag&&<Badge label={m.tag} color={C.purple} />}
            {m.spiceLevel&&m.spiceLevel!=="none"&&<span style={{fontSize:11}}>{spiceIcon[m.spiceLevel]}</span>}
            {m.scheduleEnabled&&<Badge label="⏰ sched" color={C.blue} />}
          </div>
          {m.variants?.length>0&&<div style={{fontSize:10,color:C.muted,marginBottom:4}}>Variants: {m.variants.map(v=>v.name).join(", ")}</div>}
          {m.allergens?.length>0&&<div style={{fontSize:10,color:C.orange}}>⚠ {m.allergens.join(", ")}</div>}
          {m.stock!=null&&<div style={{fontSize:10,fontWeight:700,color:m.stock===0?C.red:m.stock<=(m.lowStockAt||5)?C.orange:C.green,marginTop:3}}>
            {m.stock===0?"⚠️ OUT OF STOCK":m.stock<=(m.lowStockAt||5)?`⚠️ Low: ${m.stock} left`:`Stock: ${m.stock}`}
          </div>}
          {perms.canSeeFinancials&&<div style={{display:"flex",justifyContent:"space-between",marginTop:5,fontSize:10,color:C.muted}}>
            <span>Cost: {inr(m.cost||0)}</span>
            {mg!==null&&<span style={{color:mg>50?C.green:mg>30?C.accent:C.red}}>Margin: {mg}%</span>}
          </div>}
          {sales&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>{sales.qty} sold · {inr(sales.rev)}</div>}
          {(m.calories||m.preparationTime)&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>
            {m.calories&&`${m.calories} kcal`}{m.calories&&m.preparationTime?" · ":""}{m.preparationTime&&`${m.preparationTime} min prep`}
          </div>}
        </Card>;
      })}
    </div>}

    {/* ── LIST VIEW ── */}
    {view==="list"&&<Card style={{padding:0,overflow:"hidden"}}>
      <table>
        <thead><tr>
          <th>Item</th><th>Category</th><th>Price</th>
          {perms.canSeeFinancials&&<th>Cost</th>}
          {perms.canSeeFinancials&&<th>Margin</th>}
          <th>Stock</th><th>Status</th><th>Schedule</th>
          {perms.canEditMenu&&<th>Actions</th>}
        </tr></thead>
        <tbody>
          {filtered.map(m=>{
            const mg=margin(m); const avail=effectiveAvail(m);
            return <tr key={m.id}>
              <td>
                <div style={{fontWeight:600,fontSize:13}}>{m.isVeg?"🟢":"🔴"} {m.name}</div>
                {m.tag&&<Badge label={m.tag} color={C.purple} />}
                {m.spiceLevel&&m.spiceLevel!=="none"&&<span style={{fontSize:10,marginLeft:4}}>{spiceIcon[m.spiceLevel]}</span>}
                {m.variants?.length>0&&<div style={{fontSize:10,color:C.muted}}>+{m.variants.length} variant{m.variants.length>1?"s":""}</div>}
              </td>
              <td style={{fontSize:12,color:C.muted}}>{m.category}</td>
              <td style={{color:C.accent,fontWeight:700}}>{inr(m.price)}</td>
              {perms.canSeeFinancials&&<td style={{fontSize:12}}>{inr(m.cost||0)}</td>}
              {perms.canSeeFinancials&&<td style={{fontSize:12,color:mg>50?C.green:mg>30?C.accent:C.red}}>{mg!=null?mg+"%":"—"}</td>}
              <td style={{fontSize:12,color:m.stock===0?C.red:m.stock!=null&&m.stock<=(m.lowStockAt||5)?C.orange:C.green}}>
                {m.stock==null?"∞":m.stock}
              </td>
              <td>
                {perms.canEditMenu
                  ? <button onClick={e=>quickToggle(e,m)} style={{background:m.available?C.green+"22":C.red+"22",color:m.available?C.green:C.red,border:`1px solid ${m.available?C.green:C.red}44`,borderRadius:5,padding:"2px 8px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                      {avail?"✅ On":"❌ Off"}
                    </button>
                  : <Badge label={avail?"on":"off"} color={avail?C.green:C.red} />}
              </td>
              <td style={{fontSize:11,color:m.scheduleEnabled?C.blue:C.muted}}>{m.scheduleEnabled?`⏰ ${m.scheduleSlots?.length||0} slot${m.scheduleSlots?.length!==1?"s":""}` : "Manual"}</td>
              {perms.canEditMenu&&<td>
                <Btn size="sm" variant="ghost" onClick={()=>{setSelected(m);setModal("edit");}}>✏️ Edit</Btn>
              </td>}
            </tr>;
          })}
        </tbody>
      </table>
      {filtered.length===0&&<div style={{padding:20,textAlign:"center",color:C.muted,fontSize:13}}>No items match your filter.</div>}
    </Card>}

    {/* ── HEATMAP VIEW ── */}
    {view==="heatmap"&&<div className="fade-in">
      <div style={{color:C.muted,fontSize:12,marginBottom:12}}>Based on all paid orders. Hotter colour = more popular.</div>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
        {[[C.border,"No sales"],[C.blue,"Low"],[C.accent,"Medium"],[C.red,"🔥 Top"]].map(([col,lbl])=>(
          <div key={lbl} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:12,height:12,borderRadius:3,background:col}} />
            <span style={{fontSize:11,color:C.muted}}>{lbl}</span>
          </div>
        ))}
      </div>
      {cats.map(cat=>(
        <div key={cat} style={{marginBottom:18}}>
          <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:.5,marginBottom:8}}>{cat.toUpperCase()}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8}}>
            {data.menu.filter(m=>m.category===cat).map(m=>{
              const s=salesMap[m.id]||{qty:0,rev:0};
              const col=heatColor(s.qty); const p=s.qty/maxSales;
              return <div key={m.id} style={{borderRadius:10,padding:"12px",background:col+"33",border:`2px solid ${col}`,cursor:perms.canEditMenu?"pointer":"default"}}
                onClick={()=>{if(perms.canEditMenu){setSelected(m);setModal("edit");}}}>
                <div style={{fontSize:12,fontWeight:700,color:C.cream,marginBottom:4,lineHeight:1.3}}>{m.name}</div>
                <div style={{fontSize:11,color:col,fontWeight:700}}>{s.qty} sold</div>
                <div style={{fontSize:10,color:C.muted,marginBottom:6}}>{inr(s.rev)}</div>
                <div style={{background:C.border,borderRadius:3,height:4}}>
                  <div style={{background:col,borderRadius:3,height:4,width:`${p*100}%`,transition:"width .5s"}} />
                </div>
              </div>;
            })}
          </div>
        </div>
      ))}
    </div>}

    {/* ── MODAL ── */}
    {modal&&<MenuItemModal
      item={selected}
      modal={modal}
      onSave={handleSave}
      onDelete={handleDelete}
      perms={perms}
      onClose={()=>{setModal(null);setSelected(null);}}
    />}
  </div>;
}

// ── COMBO MANAGER ─────────────────────────────────────────────
function ComboManager({ data, setData, perms }) {
  useTheme();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name:"", emoji:"🍱", description:"", bundlePrice:"", available:true, items:[] });
  const combos = data.combos || [];

  const openAdd = () => {
    setForm({ name:"", emoji:"🍱", description:"", bundlePrice:"", available:true, items:[] });
    setModal("add");
  };
  const openEdit = c => { setForm({...c, bundlePrice:String(c.bundlePrice)}); setModal("edit"); };

  const save = () => {
    if (!form.name.trim() || !form.bundlePrice) return alert("Name and bundle price required.");
    const entry = { ...form, bundlePrice: +form.bundlePrice, id: form.id || mkId() };
    if (modal === "add") setData(d => ({ ...d, combos: [...(d.combos||[]), entry] }));
    else setData(d => ({ ...d, combos: (d.combos||[]).map(c => c.id === entry.id ? entry : c) }));
    setModal(null);
  };

  const del = id => { setData(d => ({ ...d, combos: (d.combos||[]).filter(c => c.id !== id) })); setModal(null); };

  const addComboItem = menuId => {
    const mi = data.menu.find(m => m.id === menuId);
    if (!mi) return;
    setForm(f => ({ ...f, items: [...f.items, { menuId: mi.id, qty: 1 }] }));
  };

  const origPrice = (items) => (items||[]).reduce((s,ci)=>{ const mi=data.menu.find(m=>m.id===ci.menuId); return s+(mi?mi.price*ci.qty:0); }, 0);

  return (
    <div className="fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div>
          <div className="playfair" style={{ fontSize:22, marginBottom:2 }}>🍱 Combo & Meal Deals</div>
          <div style={{ color:C.muted, fontSize:12 }}>Bundle items at a set price. Appears in POS under "Combos".</div>
        </div>
        {perms.canEditMenu && <Btn onClick={openAdd}>+ New Combo</Btn>}
      </div>

      {combos.length === 0 && (
        <Card style={{ textAlign:"center", padding:40, color:C.muted }}>
          <div style={{ fontSize:32, marginBottom:8 }}>🍱</div>
          <div style={{ fontSize:14, marginBottom:4 }}>No combos yet</div>
          <div style={{ fontSize:12 }}>Create meal deals to bundle items at a special price.</div>
        </Card>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:12 }}>
        {combos.map(combo => {
          const orig = origPrice(combo.items);
          const saving = orig - combo.bundlePrice;
          return (
            <Card key={combo.id} style={{ opacity: combo.available ? 1 : 0.6 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:24 }}>{combo.emoji||"🍱"}</span>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15 }}>{combo.name}</div>
                    {combo.description && <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{combo.description}</div>}
                  </div>
                </div>
                {perms.canEditMenu && <button onClick={()=>openEdit(combo)} style={{ background:"none", color:C.muted, fontSize:13, border:"none", cursor:"pointer" }}>✏️</button>}
              </div>
              <div style={{ display:"flex", gap:8, marginBottom:10, flexWrap:"wrap" }}>
                {(combo.items||[]).map((ci,i) => {
                  const mi = data.menu.find(m => m.id === ci.menuId);
                  return mi ? <span key={i} style={{ background:C.surface, borderRadius:5, padding:"2px 8px", fontSize:11 }}>{mi.name} ×{ci.qty}</span> : null;
                })}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  {orig > 0 && <div style={{ fontSize:11, color:C.muted, textDecoration:"line-through" }}>{inr(orig)}</div>}
                  <div style={{ fontSize:18, fontWeight:700, color:C.accent }}>{inr(combo.bundlePrice)}</div>
                  {saving > 0 && <div style={{ fontSize:11, color:C.green }}>Save {inr(saving)}</div>}
                </div>
                <Badge label={combo.available?"active":"off"} color={combo.available?C.green:C.muted} />
              </div>
            </Card>
          );
        })}
      </div>

      {modal && (
        <Modal title={modal==="add"?"New Combo Deal":"Edit Combo Deal"} onClose={()=>setModal(null)} wide>
          <Row>
            <Field label="EMOJI" half><input value={form.emoji} onChange={e=>setForm(f=>({...f,emoji:e.target.value}))} style={{fontSize:20}} /></Field>
            <Field label="COMBO NAME" half><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Family Feast" /></Field>
          </Row>
          <Field label="DESCRIPTION (shown in POS)"><input value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="e.g. 2 Mains + 3 Breads + Dessert" /></Field>
          <Row>
            <Field label="BUNDLE PRICE (₹)" half><input type="number" value={form.bundlePrice} onChange={e=>setForm(f=>({...f,bundlePrice:e.target.value}))} placeholder="0" /></Field>
            <Field label="AVAILABLE" half>
              <select value={form.available?"yes":"no"} onChange={e=>setForm(f=>({...f,available:e.target.value==="yes"}))}>
                <option value="yes">✅ Active</option>
                <option value="no">❌ Hidden</option>
              </select>
            </Field>
          </Row>
          <Divider />
          <div style={{ fontWeight:600, fontSize:13, marginBottom:10 }}>Items in this combo</div>
          {(form.items||[]).map((ci,i) => {
            const mi = data.menu.find(m => m.id === ci.menuId);
            return (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                <span style={{ flex:1, fontSize:13 }}>{mi?.name||"Unknown"}</span>
                <input type="number" value={ci.qty} min="1" onChange={e=>setForm(f=>({...f,items:f.items.map((x,j)=>j===i?{...x,qty:+e.target.value}:x)}))} style={{ width:56, fontSize:12 }} />
                <button onClick={()=>setForm(f=>({...f,items:f.items.filter((_,j)=>j!==i)}))} style={{ background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"6px 10px",cursor:"pointer",fontSize:12 }}>✕</button>
              </div>
            );
          })}
          <select defaultValue="" onChange={e=>{ if(e.target.value) addComboItem(e.target.value); e.target.value=""; }} style={{ marginTop:4, fontSize:12 }}>
            <option value="">+ Add menu item to combo...</option>
            {data.menu.map(m=><option key={m.id} value={m.id}>{m.name} — {inr(m.price)}</option>)}
          </select>
          {form.items?.length>0&&(()=>{const orig=origPrice(form.items);const bp=+form.bundlePrice||0;return(
            <div style={{marginTop:10,background:C.surface,borderRadius:8,padding:"8px 12px",fontSize:12}}>
              <div style={{color:C.muted}}>Original total: <strong>{inr(orig)}</strong></div>
              {bp>0&&<div style={{color:bp<orig?C.green:C.red}}>Bundle price: <strong>{inr(bp)}</strong> {bp<orig?`(save ${inr(orig-bp)})`:"(no discount)"}</div>}
            </div>
          );})()}
          <Divider />
          <div style={{ display:"flex", gap:8 }}>
            <Btn full onClick={save}>{modal==="add"?"Create Combo":"Save Changes"}</Btn>
            {modal==="edit"&&perms.canDelete&&<Btn variant="danger" onClick={()=>del(form.id)}>🗑 Delete</Btn>}
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── QR CODE TABLE ORDERING ────────────────────────────────────
function QRTableOrdering({ data, setData }) {
  useTheme();
  const [selectedTable, setSelectedTable] = useState(null);
  const [showGuestView, setShowGuestView] = useState(false);

  // Generate a simple QR code as SVG using QR code URL service (no library needed)
  const getQRUrl = (tableId) => {
    const tableNum = data.tables.find(t=>t.id===tableId)?.number || "?";
    // We encode a URL that would represent the guest ordering page
    const orderUrl = `${window.location.origin}${window.location.pathname}?table=${tableId}&guest=1`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(orderUrl)}`;
  };

  return (
    <div className="fade-in">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:10 }}>
        <div>
          <div className="playfair" style={{ fontSize:22, marginBottom:2 }}>📱 QR Code Table Ordering</div>
          <div style={{ color:C.muted, fontSize:12 }}>Guests scan QR codes at their table to browse the menu and place orders directly.</div>
        </div>
      </div>

      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 16px", marginBottom:16, fontSize:12, color:C.muted, lineHeight:1.7 }}>
        💡 Each table gets a unique QR code. When scanned, guests see your menu and can place orders directly to the kitchen — no waiter needed. Orders appear in your Orders tab as <strong style={{color:C.cream}}>"QR Order"</strong> status.
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12 }}>
        {data.tables.map(table => (
          <Card key={table.id} style={{ textAlign:"center", cursor:"pointer" }} onClick={()=>setSelectedTable(table)}>
            <div style={{ fontSize:22, marginBottom:6 }}>🪑</div>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:2 }}>Table {table.number}</div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>{table.floor} · {table.capacity} seats</div>
            <div style={{ background:C.accent+"18", border:`1px solid ${C.accent}33`, borderRadius:8, padding:"5px 10px", fontSize:11, color:C.accent, fontWeight:600 }}>
              📱 View QR Code
            </div>
          </Card>
        ))}
      </div>

      {selectedTable && (
        <Modal title={`QR Code — Table ${selectedTable.number}`} onClose={()=>setSelectedTable(null)}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:13, color:C.muted, marginBottom:14 }}>
              Place this at Table {selectedTable.number}. Guests scan to order.
            </div>
            <div style={{ background:"#fff", borderRadius:12, padding:16, display:"inline-block", marginBottom:14 }}>
              <img
                src={getQRUrl(selectedTable.id)}
                alt={`QR Code for Table ${selectedTable.number}`}
                style={{ width:200, height:200, display:"block" }}
                onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="block"; }}
              />
              <div style={{ display:"none", width:200, height:200, background:"#f0f0f0", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#666" }}>
                Connect to internet<br/>to load QR code
              </div>
            </div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>
              {data.restaurant.name} · Table {selectedTable.number}
            </div>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <button onClick={()=>{
                const w = window.open("","_blank","width=400,height=500");
                w.document.write(`<!DOCTYPE html><html><head><title>Table ${selectedTable.number} QR</title><style>body{font-family:sans-serif;text-align:center;padding:30px;background:#fff}h2{margin:0 0 6px}p{color:#666;font-size:13px;margin:0 0 20px}.toolbar{position:fixed;top:0;left:0;right:0;background:#1a1a1a;padding:10px;display:flex;gap:8px;justify-content:center}.toolbar button{background:#f5a623;color:#000;border:none;border-radius:5px;padding:6px 16px;font-size:12px;font-weight:700;cursor:pointer}</style></head><body><div class="toolbar"><button onclick="window.print()">🖨️ Print</button><button onclick="window.close()">✕</button></div><div style="margin-top:60px"><h2>${data.restaurant.name}</h2><p>Table ${selectedTable.number} — Scan to order</p><img src="${getQRUrl(selectedTable.id)}" width="220" height="220"/><p style="margin-top:16px;font-size:12px;color:#999">Scan with your phone camera</p></div></body></html>`);
                w.document.close();
              }} style={{ background:C.accent+"22", color:C.accent, border:`1px solid ${C.accent}44`, borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                🖨️ Print QR
              </button>
              <button onClick={()=>setShowGuestView(true)} style={{ background:C.surface, color:C.cream, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                👁️ Preview Guest View
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showGuestView && selectedTable && (
        <GuestOrderView table={selectedTable} data={data} setData={setData} onClose={()=>setShowGuestView(false)} />
      )}
    </div>
  );
}

// ── GUEST ORDER VIEW (what customer sees after scanning QR) ────
function GuestOrderView({ table, data, setData, onClose }) {
  useTheme();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [placed, setPlaced] = useState(false);
  const [step, setStep] = useState("menu"); // menu | review | done

  const cats = ["All", ...new Set(data.menu.filter(m=>m.available).map(m=>m.category))];
  const [cat, setCat] = useState("All");
  const visible = data.menu.filter(m => m.available && (cat==="All" || m.category===cat));

  const add = m => setItems(prev => {
    const ex = prev.find(i=>i.menuId===m.id);
    if (ex) return prev.map(i=>i.menuId===m.id?{...i,qty:i.qty+1}:i);
    return [...prev, {menuId:m.id, name:m.name, qty:1, price:m.price}];
  });
  const chQty = (menuId, d) => setItems(prev => prev.map(i=>i.menuId===menuId?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0));
  const subtotal = items.reduce((s,i)=>s+i.qty*i.price,0);
  const tax = Math.round(subtotal*0.18);
  const total = subtotal+tax;
  const est = items.length>0 ? getOrderEstimate({items}, data.menu) : 0;

  const placeOrder = () => {
    setData(d => ({
      ...d,
      orders: [...d.orders, { id:mkId(), tableId:table.id, items, customerName:name||"QR Guest", note:"[QR Order] "+note, tax, total, discount:0, createdAt:now(), status:"pending", isQROrder:true }],
      tables: d.tables.map(t=>t.id===table.id?{...t,status:"occupied",occupiedAt:t.occupiedAt||Date.now()}:t),
    }));
    emitNotif({type:"order",title:"New QR Order!",body:`Table ${table.number} · ${items.length} items · ${inr(total)}`});
    setStep("done");
  };

  const r = data.restaurant;
  const bg = "#0f0e0d", surface="#1a1815", card="#231f1b", accent="#f5a623", cream="#f0e6d3", muted="#8a7d6b", border="#2e2820";

  return (
    <div style={{position:"fixed",inset:0,zIndex:2000,background:bg,display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif",color:cream}}>
      {/* Header */}
      <div style={{background:surface,borderBottom:`1px solid ${border}`,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:accent}}>{r.name}</div>
          <div style={{fontSize:12,color:muted,marginTop:1}}>📍 Table {table.number}</div>
        </div>
        <button onClick={onClose} style={{background:border,color:muted,border:"none",borderRadius:7,padding:"5px 11px",fontSize:12,cursor:"pointer"}}>✕ Close Preview</button>
      </div>

      {step==="done"&&(
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"}}>
          <div style={{fontSize:64,marginBottom:16}}>✅</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:accent,marginBottom:8}}>Order Placed!</div>
          <div style={{fontSize:14,color:muted,marginBottom:6}}>Your order is being prepared.</div>
          <div style={{background:"#f5a62318",border:"1px solid #f5a62344",borderRadius:10,padding:"10px 20px",fontSize:13,color:accent,marginBottom:24}}>
            ⏱ Estimated wait: <strong>{est} minutes</strong>
          </div>
          <div style={{fontSize:12,color:muted}}>Thank you for dining with us 🙏</div>
          <button onClick={()=>{setStep("menu");setItems([]);setName("");setNote("");}} style={{marginTop:24,background:accent,color:"#0f0e0d",border:"none",borderRadius:10,padding:"12px 28px",fontWeight:700,fontSize:14,cursor:"pointer"}}>Order Again</button>
        </div>
      )}

      {step==="review"&&(
        <div style={{flex:1,overflowY:"auto",padding:18}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,marginBottom:4}}>Review & Confirm</div>
          <div style={{fontSize:13,color:muted,marginBottom:16}}>Table {table.number}</div>
          <div style={{background:card,border:`1px solid ${border}`,borderRadius:12,padding:14,marginBottom:14}}>
            {items.map((item,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${border}22`}}>
                <div><div style={{fontSize:13,fontWeight:600}}>{item.name}</div><div style={{fontSize:11,color:muted}}>×{item.qty}</div></div>
                <div style={{color:accent,fontWeight:700}}>{inr(item.qty*item.price)}</div>
              </div>
            ))}
            <div style={{paddingTop:10,display:"flex",justifyContent:"space-between",color:muted,fontSize:12,marginBottom:4}}><span>GST (18%)</span><span>{inr(tax)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontWeight:700,color:accent,fontSize:17,borderTop:`1px solid ${border}`,paddingTop:8}}><span>Total</span><span>{inr(total)}</span></div>
          </div>
          <div style={{background:"#f5a62318",border:"1px solid #f5a62344",borderRadius:10,padding:"10px 14px",fontSize:13,color:accent,marginBottom:14}}>
            ⏱ Est. wait: <strong>{est} min</strong>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:11,color:muted,fontWeight:600,marginBottom:5}}>YOUR NAME (OPTIONAL)</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Rahul" style={{background:card,border:`1px solid ${border}`,color:cream,borderRadius:8,padding:"9px 13px",outline:"none",width:"100%",fontSize:13}} />
          </div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,color:muted,fontWeight:600,marginBottom:5}}>SPECIAL REQUESTS</div>
            <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="No onions, less spicy..." rows={2} style={{background:card,border:`1px solid ${border}`,color:cream,borderRadius:8,padding:"9px 13px",outline:"none",width:"100%",fontSize:13,resize:"none"}} />
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setStep("menu")} style={{flex:1,padding:"13px",borderRadius:11,border:`1px solid ${border}`,background:"transparent",color:muted,cursor:"pointer",fontSize:14,fontWeight:600}}>← Back</button>
            <button onClick={placeOrder} style={{flex:2,padding:"13px",borderRadius:11,border:"none",background:accent,color:"#0f0e0d",cursor:"pointer",fontSize:14,fontWeight:700}}>✅ Place Order</button>
          </div>
        </div>
      )}

      {step==="menu"&&<>
        {/* Category pills */}
        <div style={{display:"flex",gap:6,padding:"10px 14px",overflowX:"auto",borderBottom:`1px solid ${border}`,flexShrink:0}}>
          {cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{padding:"5px 14px",borderRadius:20,fontSize:12,fontWeight:600,border:"none",cursor:"pointer",whiteSpace:"nowrap",background:cat===c?accent:surface,color:cat===c?"#0f0e0d":muted}}>{c}</button>)}
        </div>
        {/* Menu */}
        <div style={{flex:1,overflowY:"auto",padding:"14px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,alignContent:"start",paddingBottom:100}}>
          {visible.map(m=>{
            const inCart=items.find(i=>i.menuId===m.id);
            return(
              <button key={m.id} onClick={()=>add(m)} style={{background:inCart?accent+"22":card,border:`2px solid ${inCart?accent:border}`,borderRadius:12,padding:"14px 10px",cursor:"pointer",textAlign:"left",position:"relative"}}>
                {inCart&&<div style={{position:"absolute",top:-8,right:-8,background:accent,color:"#0f0e0d",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{inCart.qty}</div>}
                <div style={{fontSize:m.isVeg?"11px":"11px",marginBottom:3}}>{m.isVeg?"🟢":"🔴"}</div>
                <div style={{fontSize:13,fontWeight:600,marginBottom:4,lineHeight:1.3,color:cream}}>{m.name}</div>
                <div style={{color:accent,fontWeight:700,fontSize:14}}>{inr(m.price)}</div>
              </button>
            );
          })}
        </div>
        {/* Bottom cart bar */}
        {items.length>0&&(
          <div style={{position:"sticky",bottom:0,background:surface,borderTop:`1px solid ${border}`,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:700,color:cream}}>{items.reduce((s,i)=>s+i.qty,0)} items</div>
              <div style={{fontSize:13,color:accent,fontWeight:700}}>{inr(subtotal)}</div>
            </div>
            <button onClick={()=>setStep("review")} style={{background:accent,color:"#0f0e0d",border:"none",borderRadius:10,padding:"11px 24px",fontWeight:700,fontSize:14,cursor:"pointer"}}>
              Review Order →
            </button>
          </div>
        )}
      </>}
    </div>
  );
}

// ── RESERVATIONS ──────────────────────────────────────────────
const BOOKING_STATUSES = ["pending","confirmed","seated","completed","cancelled","no-show","waitlist"];
const STATUS_COLORS = {confirmed:C.green,pending:C.accent,seated:C.blue,completed:C.muted,cancelled:C.red,"no-show":C.red,waitlist:C.purple};
const STATUS_ICONS  = {confirmed:"✅",pending:"⏳",seated:"🪑",completed:"✔️",cancelled:"✗","no-show":"👻",waitlist:"📋"};
const OCCASION_OPTS = ["","Birthday 🎂","Anniversary 💍","Business Dinner 💼","Date Night 🌹","Celebration 🎉","Other"];
const SOURCES       = ["","Walk-in","Phone","Website","Zomato","Swiggy","Google","Instagram","Other"];

const emptyBooking = () => ({
  name:"", phone:"", email:"", date:"", time:"19:00", guests:"2",
  tableId:"", note:"", occasion:"", source:"",
  depositEnabled:false, deposit:"", depositPaid:false, depositMethod:"",
  reminderSent:false, checkedIn:false, specialRequests:"",
  tags:[],
});

function BookingModal({booking, isNew, data, perms, onSave, onDelete, onClose}){
  useTheme();
  const [form,setForm]=useState(()=>booking ? {
    ...booking,
    guests:String(booking.guests||2),
    deposit:String(booking.deposit||""),
  } : emptyBooking());
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const [tab,setTab]=useState("info");

  const TAGS=["VIP","Regular","First Visit","Allergy","Loud","Quiet Seating","Outdoor","Window Seat","High Chair","Wheelchair"];
  const toggleTag=t=>setForm(f=>({...f,tags:f.tags?.includes(t)?f.tags.filter(x=>x!==t):[...(f.tags||[]),t]}));

  // Suggest tables based on guest count
  const suggestedTables=data.tables.filter(t=>t.capacity>=(+form.guests||1)&&t.status!=="occupied").sort((a,b)=>a.capacity-b.capacity);

  const save=()=>{
    if(!form.name.trim())return alert("Guest name is required.");
    if(!form.date)return alert("Date is required.");
    if(!form.time)return alert("Time is required.");
    onSave({
      ...form,
      guests:+form.guests||1,
      deposit:form.depositEnabled?(+form.deposit||0):0,
      depositPaid:form.depositEnabled?form.depositPaid:false,
      status:isNew?"pending":form.status,
      createdAt:booking?.createdAt||now(),
    });
  };

  const tabs=[{id:"info",label:"👤 Guest"},{id:"booking",label:"📅 Booking"},{id:"deposit",label:"💳 Deposit"},{id:"extras",label:"✨ Extras"}];

  return <Modal title={isNew?"New Booking":`${booking?.name} — Edit`} onClose={onClose} wide>
    <div style={{display:"flex",gap:4,marginBottom:14,borderBottom:`1px solid ${C.border}`,paddingBottom:10,flexWrap:"wrap"}}>
      {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)}
        style={{padding:"5px 12px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",border:"none",
          background:tab===t.id?C.accent+"22":"transparent",color:tab===t.id?C.accent:C.muted}}>{t.label}</button>)}
    </div>

    {/* ── GUEST TAB ── */}
    {tab==="info"&&<div className="fade-in">
      <Row>
        <Field label="GUEST NAME *" half><input value={form.name} onChange={sf("name")} placeholder="Full name" autoFocus /></Field>
        <Field label="PHONE" half><input value={form.phone} onChange={sf("phone")} placeholder="+91 ..." /></Field>
      </Row>
      <Row>
        <Field label="EMAIL" half><input type="email" value={form.email||""} onChange={sf("email")} placeholder="optional" /></Field>
        <Field label="OCCASION" half>
          <select value={form.occasion||""} onChange={sf("occasion")}>
            {OCCASION_OPTS.map(o=><option key={o} value={o}>{o||"— None —"}</option>)}
          </select>
        </Field>
      </Row>
      <Field label="TAGS">
        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4}}>
          {TAGS.map(t=>{
            const on=(form.tags||[]).includes(t);
            return <button key={t} onClick={()=>toggleTag(t)}
              style={{padding:"3px 9px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",
                background:on?C.accent+"33":"transparent",color:on?C.accent:C.muted,border:`1px solid ${on?C.accent:C.border}`}}>{t}</button>;
          })}
        </div>
      </Field>
      <Field label="SPECIAL REQUESTS">
        <textarea value={form.specialRequests||""} onChange={sf("specialRequests")} rows={2}
          placeholder="Dietary requirements, allergies, seating preferences..." />
      </Field>
    </div>}

    {/* ── BOOKING TAB ── */}
    {tab==="booking"&&<div className="fade-in">
      <Row>
        <Field label="DATE *" half><input type="date" value={form.date} onChange={sf("date")} /></Field>
        <Field label="TIME *" half><input type="time" value={form.time} onChange={sf("time")} /></Field>
      </Row>
      <Row>
        <Field label="NUMBER OF GUESTS" half><input type="number" min="1" value={form.guests} onChange={sf("guests")} /></Field>
        <Field label="BOOKING SOURCE" half>
          <select value={form.source||""} onChange={sf("source")}>
            {SOURCES.map(s=><option key={s} value={s}>{s||"— Select —"}</option>)}
          </select>
        </Field>
      </Row>
      <Field label="TABLE ASSIGNMENT">
        <select value={form.tableId||""} onChange={sf("tableId")}>
          <option value="">— Assign later / TBD —</option>
          {data.tables.map(t=>{
            const suggested=suggestedTables.find(s=>s.id===t.id);
            return <option key={t.id} value={t.id}>
              T{t.number} · {t.capacity} seats · {t.status}{suggested?" ✓ Fits":""}
            </option>;
          })}
        </select>
        {suggestedTables.length>0&&<div style={{fontSize:11,color:C.green,marginTop:4}}>
          ✓ Suggested for {form.guests} guests: {suggestedTables.slice(0,3).map(t=>`T${t.number}`).join(", ")}
        </div>}
      </Field>
      {!isNew&&<Field label="STATUS">
        <select value={form.status||"pending"} onChange={sf("status")}>
          {BOOKING_STATUSES.map(s=><option key={s} value={s}>{STATUS_ICONS[s]} {s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
      </Field>}
      <Field label="INTERNAL NOTE">
        <textarea value={form.note||""} onChange={sf("note")} rows={2} placeholder="Staff-only note (not shown to guest)..." />
      </Field>
    </div>}

    {/* ── DEPOSIT TAB ── */}
    {tab==="deposit"&&<div className="fade-in">
      <div style={{background:C.surface,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:12,color:C.muted,lineHeight:1.6}}>
        💳 Deposits are completely optional. Enable only if you require one for this booking.
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <span style={{fontWeight:600,fontSize:13}}>Require a Deposit</span>
        <button onClick={()=>setForm(f=>({...f,depositEnabled:!f.depositEnabled}))}
          style={{width:44,height:24,borderRadius:12,background:form.depositEnabled?C.accent:C.border,border:"none",cursor:"pointer",position:"relative",transition:"background .2s"}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form.depositEnabled?23:3,transition:"left .2s"}} />
        </button>
      </div>
      {form.depositEnabled&&<>
        <Row>
          <Field label="DEPOSIT AMOUNT (₹)" half>
            <input type="number" value={form.deposit||""} onChange={sf("deposit")} placeholder="e.g. 500" />
          </Field>
          <Field label="PAYMENT METHOD" half>
            <select value={form.depositMethod||""} onChange={sf("depositMethod")}>
              <option value="">— Select —</option>
              <option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option><option>Other</option>
            </select>
          </Field>
        </Row>
        <Field label="DEPOSIT STATUS">
          <div style={{display:"flex",gap:8,marginTop:4}}>
            {[["yes","✅ Paid"],["no","⏳ Pending"],["refunded","↩️ Refunded"]].map(([v,l])=>(
              <button key={v} onClick={()=>setForm(f=>({...f,depositPaid:v==="yes",depositRefunded:v==="refunded"}))}
                style={{flex:1,padding:"8px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,border:"none",
                  background:(form.depositPaid&&v==="yes")||(!form.depositPaid&&!form.depositRefunded&&v==="no")||(form.depositRefunded&&v==="refunded")?C.accent+"22":"transparent",
                  color:(form.depositPaid&&v==="yes")||(!form.depositPaid&&!form.depositRefunded&&v==="no")||(form.depositRefunded&&v==="refunded")?C.accent:C.muted,
                  outline:`1px solid ${(form.depositPaid&&v==="yes")||(!form.depositPaid&&!form.depositRefunded&&v==="no")||(form.depositRefunded&&v==="refunded")?C.accent:C.border}`}}>
                {l}
              </button>
            ))}
          </div>
        </Field>
      </>}
    </div>}

    {/* ── EXTRAS TAB ── */}
    {tab==="extras"&&<div className="fade-in">
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {[
          ["checkedIn","✅ Guest has checked in / arrived","Marks this booking as arrived"],
          ["reminderSent","📲 Reminder sent to guest","Track if reminder call/SMS was done"],
        ].map(([key,label,desc])=>(
          <div key={key} style={{background:C.surface,borderRadius:9,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontWeight:600,fontSize:13}}>{label}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{desc}</div>
            </div>
            <button onClick={()=>setForm(f=>({...f,[key]:!f[key]}))}
              style={{width:44,height:24,borderRadius:12,background:form[key]?C.accent:C.border,border:"none",cursor:"pointer",position:"relative",flexShrink:0,transition:"background .2s"}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form[key]?23:3,transition:"left .2s"}} />
            </button>
          </div>
        ))}
        {!isNew&&<div style={{background:C.surface,borderRadius:9,padding:"10px 14px"}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:2}}>BOOKING ID</div>
          <div style={{fontFamily:"monospace",fontSize:12,color:C.cream}}>{booking?.id}</div>
          {booking?.createdAt&&<div style={{fontSize:11,color:C.muted,marginTop:4}}>Created: {new Date(booking.createdAt).toLocaleString("en-IN")}</div>}
        </div>}
      </div>
    </div>}

    <Divider />
    <div style={{display:"flex",gap:8}}>
      <Btn full onClick={save}>{isNew?"Create Booking":"Save Changes"}</Btn>
      {!isNew&&perms?.canDelete&&<Btn variant="danger" onClick={onDelete}>🗑 Delete</Btn>}
    </div>
  </Modal>;
}

function Reservations({data,setData,perms}){
  useTheme();
  const [modal,setModal]=useState(null); // "add"|"edit"
  const [selected,setSelected]=useState(null);
  const [filter,setFilter]=useState("upcoming");
  const [search,setSearch]=useState("");
  const [view,setView]=useState("cards"); // "cards"|"timeline"

  const sc=STATUS_COLORS;

  const filtered=useMemo(()=>{
    let list=[...data.reservations];
    if(filter==="upcoming") list=list.filter(r=>r.date>=today()&&r.status!=="cancelled"&&r.status!=="completed");
    else if(filter==="today") list=list.filter(r=>r.date===today());
    else if(filter==="pending") list=list.filter(r=>r.status==="pending");
    else if(filter==="confirmed") list=list.filter(r=>r.status==="confirmed");
    else if(filter==="waitlist") list=list.filter(r=>r.status==="waitlist");
    if(search) list=list.filter(r=>r.name.toLowerCase().includes(search.toLowerCase())||r.phone?.includes(search));
    return list.sort((a,b)=>a.date!==b.date?a.date>b.date?1:-1:a.time>b.time?1:-1);
  },[data.reservations,filter,search]);

  const counts=useMemo(()=>{
    const today_=today();
    return {
      upcoming:data.reservations.filter(r=>r.date>=today_&&r.status!=="cancelled"&&r.status!=="completed").length,
      today:data.reservations.filter(r=>r.date===today_).length,
      pending:data.reservations.filter(r=>r.status==="pending").length,
      waitlist:data.reservations.filter(r=>r.status==="waitlist").length,
    };
  },[data.reservations]);

  const handleSave=form=>{
    if(modal==="add") setData(d=>({...d,reservations:[...d.reservations,{id:mkId(),...form}]}));
    else setData(d=>({...d,reservations:d.reservations.map(r=>r.id===form.id?form:r)}));
    setModal(null); setSelected(null);
  };
  const handleDelete=()=>{
    setData(d=>({...d,reservations:d.reservations.filter(r=>r.id!==selected.id)}));
    setModal(null); setSelected(null);
  };
  const quickStatus=(r,status)=>setData(d=>({...d,reservations:d.reservations.map(x=>x.id===r.id?{...x,status}:x)}));

  const FILTERS=[
    {id:"upcoming",label:"Upcoming",count:counts.upcoming},
    {id:"today",label:"Today",count:counts.today},
    {id:"pending",label:"Pending",count:counts.pending},
    {id:"waitlist",label:"Waitlist",count:counts.waitlist},
    {id:"all",label:"All"},
  ];

  return <div className="fade-in">
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
      <div className="playfair" style={{fontSize:24}}>Reservations & Bookings</div>
      <div style={{display:"flex",gap:8}}>
        <ExportMenu
          label="Export"
          csvRows={data.reservations.map(r=>({name:r.name,phone:r.phone||"",date:r.date,time:r.time,guests:r.guests,table:data.tables.find(t=>t.id===r.tableId)?.number||"TBD",status:r.status,deposit:r.deposit||0,depositPaid:r.depositPaid?"Yes":"No",note:r.note||""}))}
          csvName="reservations"
          printHtml={`<div class="title">Reservations & Bookings</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Guest</th><th>Phone</th><th>Date</th><th>Time</th><th>Guests</th><th>Table</th><th>Status</th><th>Deposit</th></tr></thead><tbody>${data.reservations.map(r=>`<tr><td>${r.name}</td><td>${r.phone||"—"}</td><td>${r.date}</td><td>${r.time}</td><td>${r.guests}</td><td>${data.tables.find(t=>t.id===r.tableId)?.number||"TBD"}</td><td>${r.status}</td><td>${r.deposit?("₹"+r.deposit+(r.depositPaid?" ✅":" ⏳")):"—"}</td></tr>`).join("")}</tbody></table>`}
          printName="Reservations Report"
          wordHtml={`<div class="title">Reservations Report</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Guest</th><th>Date</th><th>Time</th><th>Guests</th><th>Status</th></tr></thead><tbody>${data.reservations.map(r=>`<tr><td>${r.name}</td><td>${r.date}</td><td>${r.time}</td><td>${r.guests}</td><td>${r.status}</td></tr>`).join("")}</tbody></table>`}
          wordName="Reservations_Report"
        />
        <div style={{display:"flex",border:`1px solid ${C.border}`,borderRadius:7,overflow:"hidden"}}>
          {[["cards","⊞"],["timeline","≡"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:"6px 11px",fontSize:13,background:view===v?C.accent:"transparent",color:view===v?C.bg:C.muted,border:"none",cursor:"pointer"}}>{l}</button>
          ))}
        </div>
        <Btn onClick={()=>{setSelected(null);setModal("add");}}>+ New Booking</Btn>
      </div>
    </div>

    {/* Search */}
    <SearchBar value={search} onChange={setSearch} placeholder="Search by name or phone..." />

    {/* Filter tabs */}
    <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
      {FILTERS.map(f=>(
        <button key={f.id} onClick={()=>setFilter(f.id)}
          style={{background:filter===f.id?C.accent+"22":"transparent",color:filter===f.id?C.accent:C.muted,
            border:`1px solid ${filter===f.id?C.accent:C.border}`,borderRadius:6,padding:"4px 11px",fontSize:12,cursor:"pointer"}}>
          {f.label}{f.count!=null?` (${f.count})`:""}
        </button>
      ))}
    </div>

    {/* Stats bar */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
      {[
        {label:"Today",value:counts.today,color:C.accent},
        {label:"Upcoming",value:counts.upcoming,color:C.green},
        {label:"Pending",value:counts.pending,color:C.orange},
        {label:"Waitlist",value:counts.waitlist,color:C.purple},
      ].map(s=>(
        <div key={s.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 10px",textAlign:"center"}}>
          <div style={{fontSize:18,fontWeight:700,color:s.color}}>{s.value}</div>
          <div style={{fontSize:10,color:C.muted}}>{s.label}</div>
        </div>
      ))}
    </div>

    {filtered.length===0&&<div style={{color:C.muted,fontSize:13,textAlign:"center",padding:30}}>No bookings found.</div>}

    {/* ── CARDS VIEW ── */}
    {view==="cards"&&<div style={{display:"grid",gap:8}}>
      {filtered.map(r=>{
        const tbl=data.tables.find(t=>t.id===r.tableId);
        const isToday=r.date===today();
        return <Card key={r.id} style={{borderLeft:`3px solid ${sc[r.status]||C.border}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:200}}>
              {/* Name + badges */}
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:5,flexWrap:"wrap"}}>
                <span style={{fontWeight:700,fontSize:14}}>{r.name}</span>
                <Badge label={`${STATUS_ICONS[r.status]||""} ${r.status}`} color={sc[r.status]||C.muted} />
                {isToday&&<Badge label="TODAY" color={C.blue} />}
                {r.checkedIn&&<Badge label="✅ Arrived" color={C.green} />}
                {r.occasion&&<span style={{fontSize:11}}>{r.occasion}</span>}
                {(r.tags||[]).map(t=><span key={t} style={{fontSize:10,color:C.purple,background:C.purple+"18",padding:"1px 6px",borderRadius:10}}>{t}</span>)}
              </div>
              {/* Core info */}
              <div style={{color:C.muted,fontSize:12,marginBottom:3,display:"flex",gap:10,flexWrap:"wrap"}}>
                <span>📅 {r.date}</span>
                <span>🕐 {r.time}</span>
                <span>👥 {r.guests} guest{r.guests!==1?"s":""}</span>
                <span>🪑 {tbl?`T${tbl.number}`:"TBD"}</span>
              </div>
              {r.phone&&<div style={{color:C.muted,fontSize:12}}>📱 {r.phone}{r.email?` · ✉️ ${r.email}`:""}</div>}
              {r.source&&<div style={{color:C.muted,fontSize:11,marginTop:2}}>Source: {r.source}</div>}
              {r.note&&<div style={{color:C.muted,fontSize:11,marginTop:3,fontStyle:"italic"}}>📝 {r.note}</div>}
              {r.specialRequests&&<div style={{color:C.orange,fontSize:11,marginTop:2}}>⚠️ {r.specialRequests}</div>}
              {/* Deposit */}
              {r.depositEnabled&&r.deposit>0&&<div style={{display:"flex",gap:6,alignItems:"center",marginTop:4}}>
                <Badge label={r.depositRefunded?"↩️ Refunded":r.depositPaid?"Deposit Paid":"Deposit Due"} color={r.depositRefunded?C.muted:r.depositPaid?C.green:C.orange} />
                <span style={{fontSize:11,color:C.muted}}>{inr(r.deposit)}{r.depositMethod?` · ${r.depositMethod}`:""}</span>
              </div>}
              {r.reminderSent&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>📲 Reminder sent</div>}
            </div>
            {/* Actions */}
            <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
              <Btn size="sm" variant="ghost" onClick={()=>{setSelected(r);setModal("edit");}}>✏️ Edit</Btn>
              {/* Quick status buttons */}
              <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
                {r.status==="pending"&&<>
                  <button onClick={()=>quickStatus(r,"confirmed")} style={{fontSize:10,padding:"3px 7px",borderRadius:5,background:C.green+"22",color:C.green,border:`1px solid ${C.green}44`,cursor:"pointer"}}>✅ Confirm</button>
                  <button onClick={()=>quickStatus(r,"waitlist")} style={{fontSize:10,padding:"3px 7px",borderRadius:5,background:C.purple+"22",color:C.purple,border:`1px solid ${C.purple}44`,cursor:"pointer"}}>📋 Waitlist</button>
                </>}
                {r.status==="confirmed"&&<>
                  <button onClick={()=>quickStatus(r,"seated")} style={{fontSize:10,padding:"3px 7px",borderRadius:5,background:C.blue+"22",color:C.blue,border:`1px solid ${C.blue}44`,cursor:"pointer"}}>🪑 Seat</button>
                  <button onClick={()=>quickStatus(r,"no-show")} style={{fontSize:10,padding:"3px 7px",borderRadius:5,background:C.red+"22",color:C.red,border:`1px solid ${C.red}44`,cursor:"pointer"}}>👻 No-show</button>
                </>}
                {r.status==="seated"&&<button onClick={()=>quickStatus(r,"completed")} style={{fontSize:10,padding:"3px 7px",borderRadius:5,background:C.muted+"22",color:C.muted,border:`1px solid ${C.border}`,cursor:"pointer"}}>✔️ Complete</button>}
                {["pending","confirmed"].includes(r.status)&&<button onClick={()=>quickStatus(r,"cancelled")} style={{fontSize:10,padding:"3px 7px",borderRadius:5,background:C.red+"22",color:C.red,border:`1px solid ${C.red}44`,cursor:"pointer"}}>✕ Cancel</button>}
              </div>
            </div>
          </div>
        </Card>;
      })}
    </div>}

    {/* ── TIMELINE VIEW ── */}
    {view==="timeline"&&<Card style={{padding:0,overflow:"hidden"}}>
      <table>
        <thead><tr>
          <th>Guest</th><th>Date & Time</th><th>Guests</th><th>Table</th><th>Status</th><th>Deposit</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {filtered.map(r=>{
            const tbl=data.tables.find(t=>t.id===r.tableId);
            return <tr key={r.id}>
              <td>
                <div style={{fontWeight:600,fontSize:13}}>{r.name}</div>
                {r.phone&&<div style={{fontSize:11,color:C.muted}}>{r.phone}</div>}
                {(r.tags||[]).length>0&&<div style={{fontSize:10,color:C.purple}}>{r.tags.join(", ")}</div>}
                {r.occasion&&<div style={{fontSize:10,color:C.accent}}>{r.occasion}</div>}
              </td>
              <td>
                <div style={{fontSize:13,fontWeight:500}}>{r.date}</div>
                <div style={{fontSize:11,color:C.muted}}>{r.time}</div>
              </td>
              <td style={{fontSize:13,textAlign:"center"}}>{r.guests}</td>
              <td style={{fontSize:13}}>{tbl?`T${tbl.number}`:<span style={{color:C.muted}}>TBD</span>}</td>
              <td>
                <span style={{background:(sc[r.status]||C.muted)+"22",color:sc[r.status]||C.muted,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20}}>
                  {STATUS_ICONS[r.status]} {r.status}
                </span>
              </td>
              <td style={{fontSize:11}}>
                {r.depositEnabled&&r.deposit>0
                  ? <span style={{color:r.depositPaid?C.green:C.orange}}>{r.depositPaid?"✅":"⏳"} {inr(r.deposit)}</span>
                  : <span style={{color:C.muted}}>—</span>}
              </td>
              <td><Btn size="sm" variant="ghost" onClick={()=>{setSelected(r);setModal("edit");}}>✏️ Edit</Btn></td>
            </tr>;
          })}
        </tbody>
      </table>
      {filtered.length===0&&<div style={{padding:20,textAlign:"center",color:C.muted,fontSize:13}}>No bookings match.</div>}
    </Card>}

    {/* Modal */}
    {modal&&<BookingModal
      booking={selected}
      isNew={modal==="add"}
      data={data}
      perms={perms}
      onSave={handleSave}
      onDelete={handleDelete}
      onClose={()=>{setModal(null);setSelected(null);}}
    />}
  </div>;
}

// ── STAFF ─────────────────────────────────────────────────────
function Staff({data,setData,perms}){
  useTheme();
  const [modal,setModal]=useState(null);const [form,setForm]=useState({});const [view,setView]=useState(null);const [search,setSearch]=useState("");
  const [confirmDel,setConfirmDel]=useState(null);
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const SHIFT_PRESETS={"Morning (6–14)":["06:00","14:00"],"Afternoon (14–22)":["14:00","22:00"],"Night (22–6)":["22:00","06:00"],"Full Day (9–18)":["09:00","18:00"],"Half Day AM (9–13)":["09:00","13:00"],"Half Day PM (13–17)":["13:00","17:00"],"Custom":null};
  const save=()=>{
    const base={...form,salary:+form.salary||0,holidays:+form.holidays||0,absences:+form.absences||0,salaryCut:+form.salaryCut||0};
    if(modal==="add")setData(d=>({...d,staff:[...d.staff,{id:mkId(),...base,status:"active",salaryPaid:false,attendance:[],salaryHistory:[]}]}));
    else setData(d=>({...d,staff:d.staff.map(s=>s.id===form.id?{...s,...base}:s)}));
    setModal(null);
  };
  const markAttendance=(staffId,type)=>{
    setData(d=>({...d,staff:d.staff.map(s=>s.id===staffId?{...s,
      attendance:[...(s.attendance||[]),{date:today(),type,time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}],
      absences:type==="absent"?(+s.absences||0)+1:(+s.absences||0),
    }:s)}));
    if(view?.id===staffId)setView(v=>v?{...v,
      attendance:[...(v.attendance||[]),{date:today(),type,time:new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}],
      absences:type==="absent"?(+v.absences||0)+1:(+v.absences||0),
    }:v);
  };
  const toggleSalaryPaid=(s)=>{
    if(!s.salaryPaid){
      const net=(+s.salary||0)-(+s.salaryCut||0);
      const entry={date:today(),net,cut:+s.salaryCut||0,month:new Date().toLocaleString("en-IN",{month:"long",year:"numeric"})};
      setData(d=>({...d,staff:d.staff.map(x=>x.id===s.id?{...x,salaryPaid:true,salaryHistory:[...(x.salaryHistory||[]),entry]}:x)}));
      if(view?.id===s.id)setView(v=>v?{...v,salaryPaid:true,salaryHistory:[...(v.salaryHistory||[]),entry]}:v);
    } else {
      setData(d=>({...d,staff:d.staff.map(x=>x.id===s.id?{...x,salaryPaid:false}:x)}));
      if(view?.id===s.id)setView(v=>v?{...v,salaryPaid:false}:v);
    }
  };
  const filtered=data.staff.filter(s=>!search||s.name.toLowerCase().includes(search.toLowerCase())||s.role.toLowerCase().includes(search.toLowerCase()));
  const totalPayroll=data.staff.reduce((s,x)=>s+ +x.salary,0);
  return <div className="fade-in">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
      <div className="playfair" style={{fontSize:24}}>Staff & Shifts</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <ExportMenu
          label="Export"
          csvRows={data.staff.map(s=>({name:s.name,role:s.role,phone:s.phone,email:s.email||"",salary:s.salary,shift:`${s.shiftStart}–${s.shiftEnd}`,status:s.status,joinDate:s.joinDate||""}))}
          csvName="staff"
          printHtml={`<div class="title">Staff & Shifts Report</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Shift</th><th>Salary</th><th>Status</th></tr></thead><tbody>${data.staff.map(s=>`<tr><td>${s.name}</td><td>${s.role}</td><td>${s.phone}</td><td>${s.shiftStart}–${s.shiftEnd}</td><td>₹${(+s.salary).toLocaleString("en-IN")}</td><td>${s.status}</td></tr>`).join("")}</tbody></table>`}
          printName="Staff Report"
          wordHtml={`<div class="title">Staff & Shifts Report</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Name</th><th>Role</th><th>Phone</th><th>Shift</th><th>Salary</th><th>Status</th></tr></thead><tbody>${data.staff.map(s=>`<tr><td>${s.name}</td><td>${s.role}</td><td>${s.phone}</td><td>${s.shiftStart}–${s.shiftEnd}</td><td>₹${(+s.salary).toLocaleString("en-IN")}</td><td>${s.status}</td></tr>`).join("")}</tbody></table>`}
          wordName="Staff_Report"
        />
        {perms.canEditStaff&&<Btn onClick={()=>{setForm({name:"",role:"",phone:"",email:"",salary:"",shiftStart:"09:00",shiftEnd:"18:00",joinDate:today(),dob:"",address:"",emergency:""});setModal("add");}}>+ Add Staff</Btn>}
      </div>
    </div>
    <div style={{display:"flex",gap:10,marginBottom:12}}>
      {perms.canSeeFinancials&&<div style={{background:C.accent+"18",border:"1px solid #f5a62333",borderRadius:8,padding:"6px 14px",fontSize:12}}><span style={{color:C.accent,fontWeight:600}}>{inr(totalPayroll)}</span> <span style={{color:C.muted}}>monthly payroll</span></div>}
      <div style={{background:C.green+"18",border:"1px solid #4caf7d33",borderRadius:8,padding:"6px 14px",fontSize:12}}><span style={{color:C.green,fontWeight:600}}>{data.staff.filter(s=>s.status==="active").length}</span> <span style={{color:C.muted}}>active</span></div>
    </div>
    <SearchBar value={search} onChange={setSearch} placeholder="Search staff..." />
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
      {filtered.map(s=>{
        const todayAtt=s.attendance?.find(a=>a.date===today());
        return <Card key={s.id} style={{cursor:"pointer"}} onClick={()=>setView(s)}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:C.blue+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:C.blue,fontWeight:700}}>{s.name[0]}</div>
              <div><div style={{fontWeight:600,fontSize:14}}>{s.name}</div><div style={{color:C.muted,fontSize:11}}>{s.role}</div></div>
            </div>
            <Badge label={s.status} color={s.status==="active"?C.green:C.red} />
          </div>
          <div style={{color:C.muted,fontSize:12,marginBottom:2}}>📱 {s.phone}</div>
          <div style={{color:C.muted,fontSize:12,marginBottom:2}}>🕐 {s.shiftStart} – {s.shiftEnd}</div>
          {perms.canSeeFinancials&&<div style={{color:C.accent,fontWeight:600,marginTop:6,fontSize:13}}>{inr(s.salary)}<span style={{color:C.muted,fontWeight:400,fontSize:11}}>/mo</span></div>}
          {todayAtt&&<div style={{marginTop:6}}><Badge label={`${todayAtt.type} ${todayAtt.time}`} color={todayAtt.type==="checkin"?C.green:C.orange} /></div>}
        </Card>;
      })}
    </div>

    {/* Staff detail view */}
    {view&&<Modal title={view.name} onClose={()=>setView(null)} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div>
          <div style={{fontWeight:600,marginBottom:10,color:C.muted,fontSize:11,letterSpacing:.5}}>DETAILS</div>
          {[["Role",view.role],["Phone",view.phone],["Email",view.email||"—"],["Salary",perms.canSeeFinancials?inr(view.salary):"—"],["Shift",`${view.shiftStart} – ${view.shiftEnd}`],["Join Date",view.joinDate||"—"],["DOB",view.dob||"—"],["Address",view.address||"—"],["Emergency",view.emergency||"—"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <span style={{color:C.muted}}>{k}</span><span>{v}</span>
            </div>
          ))}
          <div style={{marginTop:12,display:"flex",gap:8}}>
            {perms.canEditStaff&&<Btn size="sm" onClick={()=>{setForm({...view,salary:String(view.salary)});setModal("edit");setView(null);}}>Edit</Btn>}
            <Btn size="sm" variant="success" onClick={()=>markAttendance(view.id,"checkin")}>✓ Check In</Btn>
            <Btn size="sm" variant="subtle" onClick={()=>markAttendance(view.id,"checkout")}>Check Out</Btn>
          </div>
        </div>
        <div>
          <div style={{fontWeight:600,marginBottom:10,color:C.muted,fontSize:11,letterSpacing:.5}}>ATTENDANCE LOG</div>
          <div style={{maxHeight:240,overflowY:"auto"}}>
            {(view.attendance||[]).length===0?<div style={{color:C.muted,fontSize:12}}>No attendance recorded yet.</div>:[...(view.attendance||[])].reverse().map((a,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}`,fontSize:12}}>
                <span style={{color:C.muted}}>{a.date}</span>
                <span>{a.time}</span>
                <Badge label={a.type} color={a.type==="checkin"?C.green:C.orange} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>}

    {modal&&<Modal title={modal==="add"?"Add Staff Member":"Edit Staff Member"} onClose={()=>setModal(null)}>
      <Row><Field label="FULL NAME" half><input value={form.name||""} onChange={sf("name")} /></Field>
      <Field label="ROLE" half><input value={form.role||""} onChange={sf("role")} placeholder="Chef / Waiter..." /></Field></Row>
      <Row><Field label="PHONE" half><input value={form.phone||""} onChange={sf("phone")} /></Field>
      <Field label="EMAIL" half><input value={form.email||""} onChange={sf("email")} /></Field></Row>
      <Row><Field label="SALARY (₹/month)" half><input type="number" value={form.salary||""} onChange={sf("salary")} /></Field>
      <Field label="STATUS" half><select value={form.status||"active"} onChange={sf("status")}><option>active</option><option>inactive</option><option>on leave</option></select></Field></Row>
      <Row><Field label="SHIFT START" half><input type="time" value={form.shiftStart||""} onChange={sf("shiftStart")} /></Field>
      <Field label="SHIFT END" half><input type="time" value={form.shiftEnd||""} onChange={sf("shiftEnd")} /></Field></Row>
      <Row><Field label="JOIN DATE" half><input type="date" value={form.joinDate||""} onChange={sf("joinDate")} /></Field>
      <Field label="DATE OF BIRTH" half><input type="date" value={form.dob||""} onChange={sf("dob")} /></Field></Row>
      <Field label="ADDRESS"><input value={form.address||""} onChange={sf("address")} placeholder="Residential address" /></Field>
      <Field label="EMERGENCY CONTACT"><input value={form.emergency||""} onChange={sf("emergency")} placeholder="Name - Phone" /></Field>
      <Divider />
      <div style={{display:"flex",gap:8}}>
        <Btn full onClick={save}>Save</Btn>
        {modal==="edit"&&perms.canDelete&&<Btn variant="danger" onClick={()=>{setData(d=>({...d,staff:d.staff.filter(s=>s.id!==form.id)}));setModal(null);}}>Delete</Btn>}
      </div>
    </Modal>}
  </div>;
}

// ── CUSTOMERS ─────────────────────────────────────────────────
function Customers({data,setData,perms}){
  useTheme();
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [view,setView]=useState(null);
  const [search,setSearch]=useState("");
  const [tagFilter,setTagFilter]=useState("all");
  const [confirmDel,setConfirmDel]=useState(null);
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const LOYALTY=["Bronze","Silver","Gold","Platinum","VIP"];

  const save=()=>{
    if(modal==="add"){
      setData(d=>({...d,customers:[...d.customers,{
        id:mkId(),...form,
        visits:0,totalSpent:0,lastVisit:now(),
        firstVisit:now(),
        tags:form.tags||[],
        allergies:form.allergies||[],
        preferences:form.preferences||"",
        loyalty:form.loyalty||"Bronze",
        dob:form.dob||"",
        gender:form.gender||"",
        occupation:form.occupation||"",
        language:form.language||"",
        instagram:form.instagram||"",
        note:form.note||"",
        internalNote:form.internalNote||"",
        blacklisted:false,
      }]}));
    } else {
      setData(d=>({...d,customers:d.customers.map(c=>c.id===form.id?{
        ...c,...form,
        visits:+form.visits||c.visits,
        totalSpent:+form.totalSpent||c.totalSpent,
        tags:form.tags||[],
        allergies:form.allergies||[],
      }:c)}));
      if(view?.id===form.id)setView(v=>v?{...v,...form,tags:form.tags||[],allergies:form.allergies||[]}:v);
    }
    setModal(null);
  };

  const deleteCustomer=id=>{setData(d=>({...d,customers:d.customers.filter(c=>c.id!==id)}));setConfirmDel(null);setView(null);};

  const addVisit=c=>{
    const updated={...c,visits:c.visits+1,lastVisit:now()};
    setData(d=>({...d,customers:d.customers.map(x=>x.id===c.id?updated:x)}));
    setView(updated);
  };

  const allTags=[...new Set(data.customers.flatMap(c=>c.tags||[]))];
  const filtered=data.customers.filter(c=>{
    const matchS=!search||c.name.toLowerCase().includes(search.toLowerCase())||c.phone?.includes(search)||c.email?.toLowerCase().includes(search.toLowerCase());
    const matchT=tagFilter==="all"||(c.tags||[]).includes(tagFilter);
    return matchS&&matchT;
  });
  const custOrders=c=>data.orders.filter(o=>o.customerName===c.name);

  const loyaltyColor={Bronze:C.orange,Silver:C.muted,Gold:"#f5c518",Platinum:C.blue,VIP:C.purple};

  return <div className="fade-in">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div>
        <div className="playfair" style={{fontSize:24}}>Customer Loyalty</div>
        <div style={{color:C.muted,fontSize:12,marginTop:2}}>{data.customers.length} customers in database</div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <ExportMenu
          label="Export"
          csvRows={data.customers.map(c=>({name:c.name,phone:c.phone||"",email:c.email||"",birthday:c.dob||"",gender:c.gender||"",visits:c.visits,totalSpent:c.totalSpent,firstVisit:c.firstVisit?.split("T")[0]||"",lastVisit:c.lastVisit?.split("T")[0]||"",loyalty:c.loyalty||"Bronze",tags:(c.tags||[]).join("; "),allergies:(c.allergies||[]).join("; "),preferences:c.preferences||"",note:c.note||""}))}
          csvName="customers"
          printHtml={`<div class="title">Customer Loyalty Report</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Name</th><th>Phone</th><th>Loyalty</th><th>Visits</th><th>Total Spent</th><th>Last Visit</th><th>Allergies</th></tr></thead><tbody>${data.customers.map(c=>`<tr><td>${c.name}</td><td>${c.phone||"—"}</td><td>${c.loyalty||"Bronze"}</td><td>${c.visits}</td><td>₹${c.totalSpent.toLocaleString("en-IN")}</td><td>${c.lastVisit?.split("T")[0]||"—"}</td><td>${(c.allergies||[]).join(", ")||"—"}</td></tr>`).join("")}</tbody></table>`}
          printName="Customers Report"
          wordHtml={`<div class="title">Customer Loyalty Report</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Name</th><th>Phone</th><th>Loyalty</th><th>Visits</th><th>Total Spent</th></tr></thead><tbody>${data.customers.map(c=>`<tr><td>${c.name}</td><td>${c.phone||"—"}</td><td>${c.loyalty||"Bronze"}</td><td>${c.visits}</td><td>₹${c.totalSpent.toLocaleString("en-IN")}</td></tr>`).join("")}</tbody></table>`}
          wordName="Customers_Report"
        />
        <Btn onClick={()=>{setForm({name:"",phone:"",email:"",note:"",internalNote:"",dob:"",gender:"",occupation:"",language:"",instagram:"",address:"",preferences:"",loyalty:"Bronze",tags:[],allergies:[]});setModal("add");}}>+ Add Customer</Btn>
      </div>
    </div>

    <SearchBar value={search} onChange={setSearch} placeholder="Search by name, phone, or email..." />
    {allTags.length>0&&<div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
      {["all",...allTags].map(t=><button key={t} onClick={()=>setTagFilter(t)} style={{background:tagFilter===t?C.purple+"22":"transparent",color:tagFilter===t?C.purple:C.muted,border:`1px solid ${tagFilter===t?C.purple+"44":C.border}`,borderRadius:6,padding:"3px 9px",fontSize:11}}>{t}</button>)}
    </div>}

    <div style={{display:"grid",gap:8}}>
      {filtered.length===0&&<div style={{color:C.muted,fontSize:13,textAlign:"center",padding:20}}>No customers found.</div>}
      {[...filtered].sort((a,b)=>b.totalSpent-a.totalSpent).map(c=>(
        <Card key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",position:"relative"}} onClick={()=>setView(c)}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:C.accent,fontWeight:700,flexShrink:0}}>{c.name[0]}</div>
            <div>
              <div style={{fontWeight:600,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                {c.name}
                {c.blacklisted&&<Badge label="Blacklisted" color={C.red}/>}
                <Badge label={c.loyalty||"Bronze"} color={loyaltyColor[c.loyalty||"Bronze"]}/>
                {(c.tags||[]).map(t=><Badge key={t} label={t} color={C.purple}/>)}
              </div>
              <div style={{color:C.muted,fontSize:11}}>{c.phone||"—"}{c.email?` · ${c.email}`:""}</div>
              {(c.allergies||[]).length>0&&<div style={{color:C.red,fontSize:10,marginTop:1}}>⚠️ {c.allergies.join(", ")}</div>}
              {c.note&&<div style={{color:C.muted,fontSize:10,marginTop:1}}>📝 {c.note}</div>}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{color:C.accent,fontWeight:700}}>{inr(c.totalSpent)}</div>
            <div style={{color:C.muted,fontSize:11}}>{c.visits} visits</div>
            <div style={{color:C.muted,fontSize:10}}>Last: {fmtDate(c.lastVisit)}</div>
          </div>
          {perms?.canDelete&&<div style={{position:"absolute",top:8,right:8,display:"flex",gap:4}} onClick={e=>e.stopPropagation()}>
            <button onClick={()=>{setForm({...c,visits:String(c.visits),totalSpent:String(c.totalSpent),tags:c.tags||[],allergies:c.allergies||[]});setModal("edit");}}
              style={{background:C.surface,border:`1px solid ${C.border}`,color:C.muted,borderRadius:5,padding:"2px 7px",fontSize:10}}>✏️</button>
            <button onClick={()=>setConfirmDel(c)}
              style={{background:C.red+"22",border:`1px solid ${C.red}44`,color:C.red,borderRadius:5,padding:"2px 7px",fontSize:10}}>🗑</button>
          </div>}
        </Card>
      ))}
    </div>

    {/* ── CUSTOMER DETAIL VIEW ── */}
    {view&&<Modal title={view.name} onClose={()=>setView(null)} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div>
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            <Badge label={view.loyalty||"Bronze"} color={loyaltyColor[view.loyalty||"Bronze"]}/>
            {view.blacklisted&&<Badge label="⛔ Blacklisted" color={C.red}/>}
            {(view.tags||[]).map(t=><Badge key={t} label={t} color={C.purple}/>)}
          </div>
          {[
            ["📱 Phone",view.phone||"—"],
            ["📧 Email",view.email||"—"],
            ["🎂 Birthday",view.dob||"—"],
            ["👤 Gender",view.gender||"—"],
            ["💼 Occupation",view.occupation||"—"],
            ["🗣 Language",view.language||"—"],
            ["📍 Address",view.address||"—"],
            ["📸 Instagram",view.instagram||"—"],
            ["📅 First Visit",view.firstVisit?fmtDate(view.firstVisit):"—"],
            ["📅 Last Visit",fmtDate(view.lastVisit)],
            ["🔁 Total Visits",view.visits],
            ["💰 Total Spent",inr(view.totalSpent)],
          ].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}`,fontSize:12}}>
              <span style={{color:C.muted}}>{k}</span><span style={{textAlign:"right",maxWidth:"55%",wordBreak:"break-word"}}>{v}</span>
            </div>
          ))}
          {(view.allergies||[]).length>0&&<div style={{marginTop:8,background:C.red+"15",border:`1px solid ${C.red}33`,borderRadius:8,padding:"8px 10px"}}>
            <div style={{color:C.red,fontSize:10,fontWeight:700,letterSpacing:.5,marginBottom:4}}>⚠️ ALLERGIES / INTOLERANCES</div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{(view.allergies||[]).map(a=><Badge key={a} label={a} color={C.red}/>)}</div>
          </div>}
          {view.preferences&&<div style={{marginTop:8,background:C.accent+"11",borderRadius:8,padding:"8px 10px",fontSize:12,color:C.accent}}>🍽 {view.preferences}</div>}
          {view.note&&<div style={{marginTop:6,background:C.blue+"11",borderRadius:8,padding:"8px 10px",fontSize:12,color:C.blue}}>📝 {view.note}</div>}
          {view.internalNote&&<div style={{marginTop:6,background:C.orange+"11",borderRadius:8,padding:"8px 10px",fontSize:12,color:C.orange}}>🔒 Staff note: {view.internalNote}</div>}
          <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
            <Btn size="sm" onClick={()=>{setForm({...view,visits:String(view.visits),totalSpent:String(view.totalSpent),tags:view.tags||[],allergies:view.allergies||[]});setModal("edit");setView(null);}}>✏️ Edit</Btn>
            <Btn size="sm" variant="success" onClick={()=>addVisit(view)}>+1 Visit</Btn>
            {perms?.canDelete&&<Btn size="sm" variant="danger" onClick={()=>setConfirmDel(view)}>🗑 Delete</Btn>}
            {perms?.canDelete&&<Btn size="sm" variant="ghost" onClick={()=>{const updated={...view,blacklisted:!view.blacklisted};setData(d=>({...d,customers:d.customers.map(c=>c.id===view.id?updated:c)}));setView(updated);}}>{view.blacklisted?"✅ Unblacklist":"⛔ Blacklist"}</Btn>}
          </div>
        </div>
        <div>
          <div style={{fontWeight:600,marginBottom:10,color:C.muted,fontSize:11,letterSpacing:.5}}>ORDER HISTORY</div>
          <div style={{maxHeight:380,overflowY:"auto"}}>
            {custOrders(view).length===0
              ?<div style={{color:C.muted,fontSize:12}}>No orders found for this customer.</div>
              :[...custOrders(view)].reverse().map(o=>(
              <div key={o.id} style={{padding:"8px 0",borderBottom:`1px solid ${C.border}`,fontSize:12}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{color:C.cream}}>{fmtDate(o.createdAt)} · {fmtTime(o.createdAt)}</span>
                  <span style={{color:C.accent,fontWeight:600}}>{inr(o.total)}</span>
                </div>
                <div style={{color:C.muted,fontSize:11,marginTop:2}}>{o.items.map(i=>`${i.name}×${i.qty}`).join(", ")}</div>
                <Badge label={o.status} color={o.status==="paid"?C.green:o.status==="cancelled"?C.red:C.accent}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>}

    {/* ── ADD / EDIT MODAL ── */}
    {modal&&<Modal title={modal==="add"?"Add Customer":"Edit Customer"} onClose={()=>setModal(null)} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Field label="NAME"><input value={form.name||""} onChange={sf("name")} placeholder="Full name" /></Field>
        <Field label="PHONE (optional)"><input value={form.phone||""} onChange={sf("phone")} placeholder="+91 ..." /></Field>
        <Field label="EMAIL (optional)"><input value={form.email||""} onChange={sf("email")} /></Field>
        <Field label="BIRTHDAY (optional)"><input type="date" value={form.dob||""} onChange={sf("dob")} /></Field>
        <Field label="GENDER (optional)">
          <select value={form.gender||""} onChange={sf("gender")}>
            <option value="">— Select —</option>
            <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
          </select>
        </Field>
        <Field label="LOYALTY TIER">
          <select value={form.loyalty||"Bronze"} onChange={sf("loyalty")}>
            {["Bronze","Silver","Gold","Platinum","VIP"].map(l=><option key={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="OCCUPATION (optional)"><input value={form.occupation||""} onChange={sf("occupation")} placeholder="e.g. Doctor, Engineer..." /></Field>
        <Field label="PREFERRED LANGUAGE (optional)"><input value={form.language||""} onChange={sf("language")} placeholder="e.g. Hindi, English..." /></Field>
        <Field label="INSTAGRAM (optional)"><input value={form.instagram||""} onChange={sf("instagram")} placeholder="@handle" /></Field>
        <Field label="ADDRESS (optional)"><input value={form.address||""} onChange={sf("address")} /></Field>
      </div>
      <Field label="ALLERGIES / INTOLERANCES (comma separated)">
        <input value={(form.allergies||[]).join(",")} onChange={e=>setForm(f=>({...f,allergies:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)}))} placeholder="e.g. Nuts, Gluten, Dairy, Shellfish..." />
      </Field>
      <Field label="DIETARY PREFERENCES / NOTES (optional)">
        <input value={form.preferences||""} onChange={sf("preferences")} placeholder="e.g. Vegetarian, No onion, Extra spicy..." />
      </Field>
      <Field label="TAGS (comma separated)">
        <input value={(form.tags||[]).join(",")} onChange={e=>setForm(f=>({...f,tags:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)}))} placeholder="VIP, Regular, Corporate..." />
      </Field>
      <Field label="PUBLIC NOTE"><textarea value={form.note||""} onChange={sf("note")} rows={2} placeholder="Visible note about this customer..." /></Field>
      <Field label="INTERNAL STAFF NOTE (optional)"><textarea value={form.internalNote||""} onChange={sf("internalNote")} rows={2} placeholder="Private note — only visible to staff..." /></Field>
      {modal==="edit"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Field label="TOTAL VISITS"><input type="number" value={form.visits||0} onChange={sf("visits")} /></Field>
        <Field label="TOTAL SPENT (₹)"><input type="number" value={form.totalSpent||0} onChange={sf("totalSpent")} /></Field>
      </div>}
      <Divider />
      <div style={{display:"flex",gap:8}}>
        <Btn full onClick={save}>Save Customer</Btn>
        {modal==="edit"&&perms?.canDelete&&<Btn variant="danger" onClick={()=>{setConfirmDel({id:form.id,name:form.name});setModal(null);}}>Delete</Btn>}
      </div>
    </Modal>}

    {/* ── DELETE CONFIRM ── */}
    {confirmDel&&<Modal title="Delete Customer?" onClose={()=>setConfirmDel(null)}>
      <div style={{textAlign:"center",padding:"8px 0 16px"}}>
        <div style={{fontSize:32,marginBottom:8}}>🗑️</div>
        <div style={{color:C.cream,fontWeight:600,marginBottom:6}}>Remove <span style={{color:C.accent}}>{confirmDel.name}</span> from the database?</div>
        <div style={{color:C.muted,fontSize:12,marginBottom:16}}>This will permanently delete their profile and cannot be undone.</div>
        <div style={{display:"flex",gap:8}}>
          <Btn variant="ghost" full onClick={()=>setConfirmDel(null)}>Cancel</Btn>
          <Btn variant="danger" full onClick={()=>deleteCustomer(confirmDel.id)}>Yes, Delete</Btn>
        </div>
      </div>
    </Modal>}
  </div>;
}

// ── EXPENSES ──────────────────────────────────────────────────
function Expenses({data,setData,perms}){
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");
  const [expTab,setExpTab]=useState("list"); // "overview" | "list"
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const save=()=>{
    if(modal==="add")setData(d=>({...d,expenses:[...d.expenses,{id:mkId(),...form,amount:+form.amount,paid:form.paid||false,recurring:form.recurring||false}]}));
    else setData(d=>({...d,expenses:d.expenses.map(e=>e.id===form.id?{...form,amount:+form.amount}:e)}));
    setModal(null);
  };
  const cats=["Supplies","Payroll","Utilities","Equipment","Marketing","Maintenance","Rent","Tax","Insurance","Other"];
  const payMethods=["Cash","UPI","Bank Transfer","Credit Card","Debit Card","Cheque","Other"];
  const priorities=["Low","Medium","High","Urgent"];
  const total=data.expenses.reduce((s,e)=>s+ +e.amount,0);
  const paid=data.expenses.filter(e=>e.paid).reduce((s,e)=>s+ +e.amount,0);
  const unpaid=data.expenses.filter(e=>!e.paid).reduce((s,e)=>s+ +e.amount,0);
  const byCat=data.expenses.reduce((acc,e)=>{acc[e.category]=(acc[e.category]||0)+ +e.amount;return acc;},{});
  const byMonth=data.expenses.reduce((acc,e)=>{const m=(e.date||"").slice(0,7);if(m)acc[m]=(acc[m]||0)+ +e.amount;return acc;},{});
  const recurring=data.expenses.filter(e=>e.recurring).reduce((s,e)=>s+ +e.amount,0);
  const filtered=data.expenses.filter(e=>{
    const matchF=filter==="all"||(filter==="unpaid"&&!e.paid)||(filter==="paid"&&e.paid)||(filter==="recurring"&&e.recurring)||e.category===filter;
    const matchS=!search||e.title.toLowerCase().includes(search.toLowerCase())||e.vendor?.toLowerCase().includes(search.toLowerCase())||(e.receiptNo||"").toLowerCase().includes(search.toLowerCase());
    return matchF&&matchS;
  });
  const priorityColor={Low:C.muted,Medium:C.blue,High:C.orange,Urgent:C.red};
  const catColors=[C.accent,C.blue,C.green,C.purple,C.orange,C.red,"#f06292","#4dd0e1","#aed581","#ffb74d"];

  const openAdd=()=>{setForm({title:"",amount:"",category:"Supplies",date:today(),note:"",vendor:"",paid:false,paymentMethod:"Cash",receiptNo:"",dueDate:"",priority:"Medium",recurring:false,recurringFreq:"Monthly"});setModal("add");};
  const openEdit=(e)=>{setForm({...e,amount:String(e.amount)});setModal("edit");};

  // sub-tab pill style
  const tabPill=(id,label,icon)=>(
    <button onClick={()=>setExpTab(id)} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:expTab===id?600:400,background:expTab===id?C.accent+"22":"transparent",color:expTab===id?C.accent:C.muted,border:`1px solid ${expTab===id?C.accent+"55":C.border}`,transition:"all .15s"}}>
      <span>{icon}</span>{label}
    </button>
  );

  return <div className="fade-in">
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div className="playfair" style={{fontSize:24}}>Expenses</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <ExportMenu
          label="Export"
          csvRows={data.expenses.map(e=>({title:e.title,amount:e.amount,category:e.category,date:e.date,vendor:e.vendor||"",paid:e.paid?"Yes":"No",paymentMethod:e.paymentMethod||"",receiptNo:e.receiptNo||"",priority:e.priority||"",recurring:e.recurring?"Yes":"No",note:e.note||""}))}
          csvName="expenses"
          printHtml={`<div class="title">Expenses Report</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Title</th><th>Category</th><th>Vendor</th><th>Date</th><th>Amount</th><th>Method</th><th>Paid</th></tr></thead><tbody>${data.expenses.map(e=>`<tr><td>${e.title}</td><td>${e.category}</td><td>${e.vendor||"—"}</td><td>${e.date}</td><td>₹${(+e.amount).toLocaleString("en-IN")}</td><td>${e.paymentMethod||"—"}</td><td>${e.paid?"✅ Yes":"⏳ No"}</td></tr>`).join("")}</tbody></table><p style="margin-top:14px;font-weight:700">Total: ₹${data.expenses.reduce((s,e)=>s+(+e.amount),0).toLocaleString("en-IN")}</p>`}
          printName="Expenses Report"
          wordHtml={`<div class="title">Expenses Report</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Amount</th><th>Paid</th></tr></thead><tbody>${data.expenses.map(e=>`<tr><td>${e.title}</td><td>${e.category}</td><td>${e.date}</td><td>₹${(+e.amount).toLocaleString("en-IN")}</td><td>${e.paid?"Yes":"No"}</td></tr>`).join("")}</tbody></table>`}
          wordName="Expenses_Report"
        />
        <Btn onClick={openAdd}>+ Add Expense</Btn>
      </div>
    </div>

    {/* Summary chips */}
    {perms.canSeeFinancials&&<div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
      <div style={{background:C.red+"15",border:`1px solid ${C.red}33`,borderRadius:8,padding:"7px 14px",fontSize:12,minWidth:110}}>
        <div style={{color:C.muted,fontSize:10,marginBottom:1}}>TOTAL</div>
        <div style={{color:C.red,fontWeight:700,fontSize:15}}>{inr(total)}</div>
      </div>
      <div style={{background:C.green+"15",border:`1px solid ${C.green}33`,borderRadius:8,padding:"7px 14px",fontSize:12,minWidth:110}}>
        <div style={{color:C.muted,fontSize:10,marginBottom:1}}>PAID</div>
        <div style={{color:C.green,fontWeight:700,fontSize:15}}>{inr(paid)}</div>
      </div>
      {unpaid>0&&<div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,borderRadius:8,padding:"7px 14px",fontSize:12,minWidth:110}}>
        <div style={{color:C.muted,fontSize:10,marginBottom:1}}>UNPAID</div>
        <div style={{color:C.orange,fontWeight:700,fontSize:15}}>{inr(unpaid)}</div>
      </div>}
      {recurring>0&&<div style={{background:C.purple+"15",border:`1px solid ${C.purple}33`,borderRadius:8,padding:"7px 14px",fontSize:12,minWidth:110}}>
        <div style={{color:C.muted,fontSize:10,marginBottom:1}}>RECURRING/MO</div>
        <div style={{color:C.purple,fontWeight:700,fontSize:15}}>{inr(recurring)}</div>
      </div>}
    </div>}

    {/* Sub-tabs */}
    <div style={{display:"flex",gap:6,marginBottom:14}}>
      {tabPill("list","All Expenses","📋")}
      {tabPill("overview","Overview","📊")}
    </div>

    {/* ── OVERVIEW TAB ── */}
    {expTab==="overview"&&<div className="fade-in" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {/* By Category */}
      <Card>
        <div style={{fontWeight:600,marginBottom:12,fontSize:13}}>💰 By Category</div>
        {Object.entries(byCat).length===0&&<div style={{color:C.muted,fontSize:12}}>No data yet.</div>}
        {Object.entries(byCat).sort((a,b)=>b[1]-a[1]).map(([cat,amt],i)=>(
          <div key={cat} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
              <span style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:catColors[i%catColors.length],display:"inline-block"}}/>
                <span style={{color:C.cream}}>{cat}</span>
              </span>
              <span style={{color:C.red,fontWeight:600}}>{inr(amt)}</span>
            </div>
            <div style={{background:C.border,borderRadius:4,height:5}}>
              <div style={{background:catColors[i%catColors.length],borderRadius:4,height:5,width:`${pct(amt,total)}%`,transition:"width .3s"}}/>
            </div>
            <div style={{color:C.muted,fontSize:10,marginTop:2}}>{pct(amt,total)}% of total</div>
          </div>
        ))}
      </Card>

      {/* By Month */}
      <Card>
        <div style={{fontWeight:600,marginBottom:12,fontSize:13}}>📅 By Month</div>
        {Object.entries(byMonth).length===0&&<div style={{color:C.muted,fontSize:12}}>No data yet.</div>}
        {Object.entries(byMonth).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,6).map(([month,amt])=>(
          <div key={month} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
            <span style={{color:C.muted,fontSize:12}}>{new Date(month+"-01").toLocaleDateString("en-IN",{month:"long",year:"numeric"})}</span>
            <span style={{color:C.cream,fontWeight:600,fontSize:13}}>{inr(amt)}</span>
          </div>
        ))}
      </Card>

      {/* Paid vs Unpaid */}
      <Card>
        <div style={{fontWeight:600,marginBottom:12,fontSize:13}}>✅ Payment Status</div>
        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1,background:C.green+"15",border:`1px solid ${C.green}33`,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
            <div style={{color:C.green,fontWeight:700,fontSize:17}}>{inr(paid)}</div>
            <div style={{color:C.muted,fontSize:10,marginTop:2}}>Paid ({data.expenses.filter(e=>e.paid).length})</div>
          </div>
          <div style={{flex:1,background:C.orange+"15",border:`1px solid ${C.orange}33`,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
            <div style={{color:C.orange,fontWeight:700,fontSize:17}}>{inr(unpaid)}</div>
            <div style={{color:C.muted,fontSize:10,marginTop:2}}>Unpaid ({data.expenses.filter(e=>!e.paid).length})</div>
          </div>
        </div>
        {total>0&&<div style={{background:C.border,borderRadius:6,height:10,overflow:"hidden"}}>
          <div style={{background:C.green,height:10,width:`${pct(paid,total)}%`,borderRadius:6,transition:"width .3s"}}/>
        </div>}
        {total>0&&<div style={{color:C.muted,fontSize:11,marginTop:4,textAlign:"center"}}>{pct(paid,total)}% settled</div>}
      </Card>

      {/* Recurring */}
      <Card>
        <div style={{fontWeight:600,marginBottom:12,fontSize:13}}>🔁 Recurring Expenses</div>
        {data.expenses.filter(e=>e.recurring).length===0&&<div style={{color:C.muted,fontSize:12}}>No recurring expenses set.</div>}
        {data.expenses.filter(e=>e.recurring).map(e=>(
          <div key={e.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}`}}>
            <div>
              <div style={{fontSize:12,fontWeight:500}}>{e.title}</div>
              <div style={{fontSize:10,color:C.muted}}>{e.recurringFreq||"Monthly"} · {e.category}</div>
            </div>
            <span style={{color:C.purple,fontWeight:600,fontSize:13}}>{inr(e.amount)}</span>
          </div>
        ))}
      </Card>
    </div>}

    {/* ── LIST TAB ── */}
    {expTab==="list"&&<div className="fade-in">
      <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180}}><SearchBar value={search} onChange={setSearch} placeholder="Search by title, vendor, receipt…" /></div>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:12,flexWrap:"wrap"}}>
        {["all","unpaid","paid","recurring",...cats].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?C.accent+"22":"transparent",color:filter===f?C.accent:C.muted,border:`1px solid ${filter===f?C.accent+"55":C.border}`,borderRadius:6,padding:"3px 9px",fontSize:11,transition:"all .12s"}}>{f}</button>
        ))}
      </div>
      <div style={{display:"grid",gap:8}}>
        {filtered.length===0&&<div style={{color:C.muted,fontSize:13,textAlign:"center",padding:30}}>No expenses found.</div>}
        {[...filtered].reverse().map(e=>(
          <Card key={e.id} style={{padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              {/* Left info */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                  <span style={{fontWeight:600,fontSize:13}}>{e.title}</span>
                  {e.recurring&&<Badge label="🔁 recurring" color={C.purple}/>}
                  {e.priority&&e.priority!=="Medium"&&<Badge label={e.priority} color={priorityColor[e.priority]||C.muted}/>}
                  <Badge label={e.paid?"✅ paid":"⏳ unpaid"} color={e.paid?C.green:C.orange}/>
                </div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <span style={{color:C.muted,fontSize:11}}>📂 {e.category}</span>
                  <span style={{color:C.muted,fontSize:11}}>📅 {e.date}</span>
                  {e.vendor&&<span style={{color:C.muted,fontSize:11}}>🏪 {e.vendor}</span>}
                  {e.paymentMethod&&<span style={{color:C.muted,fontSize:11}}>💳 {e.paymentMethod}</span>}
                  {e.receiptNo&&<span style={{color:C.muted,fontSize:11}}>🧾 #{e.receiptNo}</span>}
                  {e.dueDate&&!e.paid&&<span style={{color:C.red,fontSize:11}}>⚠️ Due {e.dueDate}</span>}
                </div>
                {e.note&&<div style={{color:C.muted,fontSize:11,marginTop:4,fontStyle:"italic"}}>"{e.note}"</div>}
              </div>
              {/* Right actions */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
                {perms.canSeeFinancials&&<div style={{color:C.red,fontWeight:700,fontSize:16}}>{inr(e.amount)}</div>}
                <div style={{display:"flex",gap:5}}>
                  <button
                    onClick={()=>setData(d=>({...d,expenses:d.expenses.map(x=>x.id===e.id?{...x,paid:!x.paid}:x)}))}
                    style={{background:e.paid?C.red+"22":C.green+"22",color:e.paid?C.red:C.green,borderRadius:6,padding:"3px 9px",fontSize:11,border:"none",cursor:"pointer"}}>
                    {e.paid?"Unpaid":"Mark Paid"}
                  </button>
                  <button
                    onClick={()=>openEdit(e)}
                    style={{background:C.border,color:C.cream,borderRadius:6,padding:"3px 9px",fontSize:11,border:"none",cursor:"pointer"}}>
                    ✏️ Edit
                  </button>
                  {perms.canDelete&&<button
                    onClick={()=>{if(window.confirm("Delete this expense?"))setData(d=>({...d,expenses:d.expenses.filter(x=>x.id!==e.id)}));}}
                    style={{background:C.red+"22",color:C.red,borderRadius:6,padding:"3px 9px",fontSize:11,border:"none",cursor:"pointer"}}>
                    🗑
                  </button>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>}

    {/* ── ADD / EDIT MODAL ── */}
    {modal&&<Modal title={modal==="add"?"➕ Add Expense":"✏️ Edit Expense"} onClose={()=>setModal(null)}>
      {/* Core fields */}
      <Row>
        <Field label="TITLE" half><input value={form.title||""} onChange={sf("title")} placeholder="e.g. Weekly Vegetables" /></Field>
        <Field label="AMOUNT (₹)" half><input type="number" value={form.amount||""} onChange={sf("amount")} placeholder="0" /></Field>
      </Row>
      <Row>
        <Field label="CATEGORY" half>
          <select value={form.category||"Supplies"} onChange={sf("category")}>
            {cats.map(c=><option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="DATE" half><input type="date" value={form.date||""} onChange={sf("date")} /></Field>
      </Row>
      <Row>
        <Field label="VENDOR / SUPPLIER" half><input value={form.vendor||""} onChange={sf("vendor")} placeholder="e.g. Fresh Farms" /></Field>
        <Field label="RECEIPT / INVOICE NO." half><input value={form.receiptNo||""} onChange={sf("receiptNo")} placeholder="e.g. INV-2024" /></Field>
      </Row>
      <Row>
        <Field label="PAYMENT METHOD" half>
          <select value={form.paymentMethod||"Cash"} onChange={sf("paymentMethod")}>
            {payMethods.map(m=><option key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="PAID?" half>
          <select value={form.paid?"yes":"no"} onChange={e=>setForm(f=>({...f,paid:e.target.value==="yes"}))}>
            <option value="yes">✅ Yes — Settled</option>
            <option value="no">⏳ No — Pending</option>
          </select>
        </Field>
      </Row>
      {!form.paid&&<Row>
        <Field label="DUE DATE (optional)" half><input type="date" value={form.dueDate||""} onChange={sf("dueDate")} /></Field>
        <Field label="PRIORITY" half>
          <select value={form.priority||"Medium"} onChange={sf("priority")}>
            {priorities.map(p=><option key={p}>{p}</option>)}
          </select>
        </Field>
      </Row>}
      <Row>
        <Field label="RECURRING?" half>
          <select value={form.recurring?"yes":"no"} onChange={e=>setForm(f=>({...f,recurring:e.target.value==="yes"}))}>
            <option value="no">One-time</option>
            <option value="yes">🔁 Recurring</option>
          </select>
        </Field>
        {form.recurring&&<Field label="FREQUENCY" half>
          <select value={form.recurringFreq||"Monthly"} onChange={sf("recurringFreq")}>
            {["Daily","Weekly","Bi-weekly","Monthly","Quarterly","Yearly"].map(f=><option key={f}>{f}</option>)}
          </select>
        </Field>}
      </Row>
      <Field label="NOTES (optional)"><input value={form.note||""} onChange={sf("note")} placeholder="Any additional details…" /></Field>
      <Divider/>
      <div style={{display:"flex",gap:8}}>
        <Btn full onClick={save}>Save Expense</Btn>
        {modal==="edit"&&perms.canDelete&&<Btn variant="danger" onClick={()=>{if(window.confirm("Delete this expense?"))setData(d=>({...d,expenses:d.expenses.filter(e=>e.id!==form.id)}));setModal(null);}}>Delete</Btn>}
      </div>
    </Modal>}
  </div>;
}

// ── DELIVERY PLATFORM API LAYER ───────────────────────────────
// Ready-to-wire integration layer for Zomato & Swiggy.
// When official API keys are available, replace the mock fetch calls below
// with real endpoints. The rest of the CRM (state, UI, export) needs no changes.

const DELIVERY_PLATFORMS = {
  zomato: {
    id: "zomato", name: "Zomato", color: "#e23744", emoji: "🔴",
    // Real endpoint once keys are provided:
    // baseUrl: "https://api.zomato.com/v2/restaurant/orders",
    // authHeader: (key) => ({ "X-Zomato-Token": key }),
    mockOrders: () => [
      { externalId: "ZMT-"+mkId(), customerName: "Simran Kaur", phone: "+91 90001 11222", address: "B-12 Malviya Nagar, Mumbai", items: [{name:"Butter Chicken",qty:1,price:380},{name:"Garlic Naan",qty:2,price:60}], note: "Extra gravy", total: 500 },
      { externalId: "ZMT-"+mkId(), customerName: "Aditya Rao", phone: "+91 80002 22333", address: "Flat 4A, Oberoi Splendour, Jogeshwari", items: [{name:"Dal Makhani",qty:2,price:280},{name:"Masala Chai",qty:1,price:80}], note: "", total: 640 },
    ],
  },
  swiggy: {
    id: "swiggy", name: "Swiggy", color: "#fc8019", emoji: "🟠",
    // Real endpoint once keys are provided:
    // baseUrl: "https://partner.swiggy.com/api/v1/orders/active",
    // authHeader: (key) => ({ "Authorization": "Bearer " + key }),
    mockOrders: () => [
      { externalId: "SWG-"+mkId(), customerName: "Neha Joshi", phone: "+91 70003 33444", address: "301 Sea Breeze, Bandra West", items: [{name:"Paneer Tikka",qty:1,price:260},{name:"Mango Lassi",qty:2,price:90}], note: "No onion", total: 440 },
    ],
  },
};

async function fetchPlatformOrders(platformId, apiKey) {
  // ── REAL API HOOK ──────────────────────────────────────────
  // Swap the mock below for real API calls when keys are live:
  //
  // const p = DELIVERY_PLATFORMS[platformId];
  // const res = await fetch(p.baseUrl, { headers: p.authHeader(apiKey) });
  // const json = await res.json();
  // return json.orders.map(o => ({ ...o, platform: platformId }));
  //
  // ── MOCK (remove once real API is wired) ──────────────────
  await new Promise(r => setTimeout(r, 800)); // simulate network delay
  return DELIVERY_PLATFORMS[platformId].mockOrders().map(o => ({ ...o, platform: platformId }));
}

// ── DELIVERIES ────────────────────────────────────────────────
function Deliveries({ data, setData, perms }) {
  useTheme();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ items: [] });
  const [search, setSearch] = useState("");
  const [delTab, setDelTab] = useState("all"); // "all" | "zomato" | "swiggy" | "direct"
  const [syncStatus, setSyncStatus] = useState({}); // { zomato: "idle"|"syncing"|"ok"|"error", swiggy: ... }
  const [lastSync, setLastSync] = useState({});
  const [apiModal, setApiModal] = useState(null); // "zomato"|"swiggy"|null
  const [apiForm, setApiForm] = useState({});

  const sf = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const formTotal = (form.items || []).reduce((s, i) => s + +i.qty * +i.price, 0);
  const sc = { placed: C.blue, accepted: C.purple, preparing: C.accent, out_for_delivery: C.orange, delivered: C.green, cancelled: C.red, pending: C.muted, out: C.accent };
  const DELIVERY_STATUSES = ["placed","accepted","preparing","out_for_delivery","delivered","cancelled"];
  const STATUS_LABELS = {placed:"📋 Placed",accepted:"✅ Accepted",preparing:"🍳 Preparing",out_for_delivery:"🛵 Out for Delivery",delivered:"✅ Delivered",cancelled:"❌ Cancelled"};
  const platformColor = { zomato: DELIVERY_PLATFORMS.zomato.color, swiggy: DELIVERY_PLATFORMS.swiggy.color, direct: C.blue };

  // Load saved API config from localStorage
  const [apiCfg, setApiCfg] = useState(() => {
    try { return JSON.parse(localStorage.getItem("rcm_delivery_api") || "{}"); } catch { return {}; }
  });
  const saveApiCfg = (cfg) => {
    setApiCfg(cfg);
    try { localStorage.setItem("rcm_delivery_api", JSON.stringify(cfg)); } catch {}
  };

  // Auto-sync: poll enabled platforms every 90s
  useEffect(() => {
    const enabledPlatforms = ["zomato", "swiggy"].filter(p => apiCfg[p]?.enabled);
    if (!enabledPlatforms.length) return;
    const doSync = async () => {
      for (const pid of enabledPlatforms) {
        setSyncStatus(s => ({ ...s, [pid]: "syncing" }));
        try {
          const orders = await fetchPlatformOrders(pid, apiCfg[pid]?.key || "");
          setData(d => {
            const existingIds = new Set(d.deliveries.map(x => x.externalId).filter(Boolean));
            const newOrders = orders
              .filter(o => !existingIds.has(o.externalId))
              .map(o => ({ id: mkId(), ...o, status: "pending", createdAt: now(), assignedTo: DELIVERY_PLATFORMS[pid].name }));
            return newOrders.length ? { ...d, deliveries: [...d.deliveries, ...newOrders] } : d;
          });
          setSyncStatus(s => ({ ...s, [pid]: "ok" }));
          setLastSync(s => ({ ...s, [pid]: new Date() }));
        } catch {
          setSyncStatus(s => ({ ...s, [pid]: "error" }));
        }
      }
    };
    doSync();
    const id = setInterval(doSync, 90000);
    return () => clearInterval(id);
  }, [apiCfg]);

  const manualSync = async (pid) => {
    setSyncStatus(s => ({ ...s, [pid]: "syncing" }));
    try {
      const orders = await fetchPlatformOrders(pid, apiCfg[pid]?.key || "");
      setData(d => {
        const existingIds = new Set(d.deliveries.map(x => x.externalId).filter(Boolean));
        const newOrders = orders
          .filter(o => !existingIds.has(o.externalId))
          .map(o => ({ id: mkId(), ...o, status: "pending", createdAt: now(), assignedTo: DELIVERY_PLATFORMS[pid].name }));
        return newOrders.length ? { ...d, deliveries: [...d.deliveries, ...newOrders] } : d;
      });
      setSyncStatus(s => ({ ...s, [pid]: "ok" }));
      setLastSync(s => ({ ...s, [pid]: new Date() }));
    } catch {
      setSyncStatus(s => ({ ...s, [pid]: "error" }));
    }
  };

  const filteredAll = data.deliveries.filter(d => {
    const matchSearch = !search || d.customerName.toLowerCase().includes(search.toLowerCase()) || (d.phone || "").includes(search) || (d.address || "").toLowerCase().includes(search.toLowerCase());
    const matchTab = delTab === "all" || (delTab === "direct" ? !d.platform || d.platform === "direct" : d.platform === delTab);
    return matchSearch && matchTab;
  });

  const tabPill = (id, label, count) => (
    <button onClick={() => setDelTab(id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: delTab === id ? 600 : 400, background: delTab === id ? C.accent + "22" : "transparent", color: delTab === id ? C.accent : C.muted, border: `1px solid ${delTab === id ? C.accent + "55" : C.border}`, transition: "all .15s", cursor: "pointer" }}>
      {label} {count !== undefined && <span style={{ background: C.border, borderRadius: 10, padding: "0 6px", fontSize: 10, fontWeight: 700 }}>{count}</span>}
    </button>
  );

  const syncIcon = (pid) => {
    const s = syncStatus[pid];
    if (s === "syncing") return <span className="pulse">⏳</span>;
    if (s === "ok") return "✅";
    if (s === "error") return "❌";
    return "🔄";
  };

  return (
    <div className="fade-in">
      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div className="playfair" style={{ fontSize: 24 }}>Deliveries</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <ExportMenu
            label="Export"
            csvRows={data.deliveries.map(d => ({ customer: d.customerName, phone: d.phone, address: d.address, platform: d.platform || "direct", items: d.items.map(i => `${i.name}×${i.qty}`).join("; "), total: d.total, status: d.status, assignedTo: d.assignedTo || "", date: d.createdAt?.split("T")[0] || "", note: d.note || "" }))}
            csvName="deliveries"
            printHtml={`<div class="title">Deliveries Report</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Customer</th><th>Phone</th><th>Platform</th><th>Items</th><th>Total</th><th>Status</th><th>Rider</th></tr></thead><tbody>${data.deliveries.map(d => `<tr><td>${d.customerName}</td><td>${d.phone}</td><td>${d.platform || "Direct"}</td><td>${d.items.map(i => i.name + "×" + i.qty).join(", ")}</td><td>₹${d.total.toLocaleString("en-IN")}</td><td>${d.status}</td><td>${d.assignedTo || "—"}</td></tr>`).join("")}</tbody></table>`}
            printName="Deliveries Report"
            wordHtml={`<div class="title">Deliveries Report</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Customer</th><th>Platform</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>${data.deliveries.map(d => `<tr><td>${d.customerName}</td><td>${d.platform || "Direct"}</td><td>${d.items.map(i => i.name + "×" + i.qty).join(", ")}</td><td>₹${d.total.toLocaleString("en-IN")}</td><td>${d.status}</td></tr>`).join("")}</tbody></table>`}
            wordName="Deliveries_Report"
          />
          <Btn onClick={() => { setForm({ customerName: "", phone: "", address: "", items: [{ name: "", qty: 1, price: "" }], note: "", assignedTo: "", platform: "direct" }); setModal("add"); }}>+ New Delivery</Btn>
        </div>
      </div>

      {/* ── PLATFORM INTEGRATION CARDS ── */}
      {(data.deliverySettings?.showPlatforms !== false) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {["zomato", "swiggy"].map(pid => {
            const p = DELIVERY_PLATFORMS[pid];
            const cfg = apiCfg[pid] || {};
            const isEnabled = cfg.enabled;
            const count = data.deliveries.filter(d => d.platform === pid).length;
            const revenue = data.deliveries.filter(d => d.platform === pid && d.status === "delivered").reduce((s, d) => s + d.total, 0);
            return (
              <Card key={pid} style={{ border: `1.5px solid ${isEnabled ? p.color + "55" : C.border}`, position: "relative", padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontSize: 22 }}>{p.emoji}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: p.color }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{isEnabled ? "Integration active" : "Not connected"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {isEnabled && (
                      <button onClick={() => manualSync(pid)} title="Sync now" style={{ background: p.color + "22", color: p.color, border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 12, cursor: "pointer" }}>
                        {syncIcon(pid)} Sync
                      </button>
                    )}
                    {perms?.canEditMenu && (
                      <button onClick={() => { setApiForm({ ...cfg }); setApiModal(pid); }} style={{ background: C.border, color: C.cream, border: "none", borderRadius: 6, padding: "4px 9px", fontSize: 11, cursor: "pointer" }}>⚙️ Setup</button>
                    )}
                  </div>
                </div>
                {isEnabled ? (
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ fontSize: 11, color: C.muted }}><span style={{ color: p.color, fontWeight: 700, fontSize: 15 }}>{count}</span> orders</div>
                    <div style={{ fontSize: 11, color: C.muted }}><span style={{ color: C.green, fontWeight: 700, fontSize: 15 }}>{inr(revenue)}</span> delivered</div>
                    {lastSync[pid] && <div style={{ fontSize: 10, color: C.muted, alignSelf: "center" }}>Last sync: {fmtTime(lastSync[pid])}</div>}
                  </div>
                ) : (
                  <div style={{ fontSize: 11, color: C.muted, fontStyle: "italic" }}>Add your {p.name} API key to enable live order sync.</div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* ── STATUS CHIPS ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {DELIVERY_STATUSES.map(s => (
          <div key={s} style={{ background: (sc[s]||C.muted) + "18", border: `1px solid ${(sc[s]||C.muted)}33`, borderRadius: 8, padding: "5px 12px", fontSize: 11 }}>
            <span style={{ color: sc[s]||C.muted, fontWeight: 600 }}>{data.deliveries.filter(d => d.status === s).length}</span> <span style={{ color: C.muted }}>{STATUS_LABELS[s]||s}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 11, color: C.muted, alignSelf: "center" }}>
          Revenue: <span style={{ color: C.green, fontWeight: 600 }}>{inr(data.deliveries.filter(d => d.status === "delivered").reduce((s, d) => s + d.total, 0))}</span>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {tabPill("all", "All", data.deliveries.length)}
        {tabPill("direct", "🏠 Direct", data.deliveries.filter(d => !d.platform || d.platform === "direct").length)}
        {(apiCfg.zomato?.enabled || data.deliveries.some(d => d.platform === "zomato")) && tabPill("zomato", "🔴 Zomato", data.deliveries.filter(d => d.platform === "zomato").length)}
        {(apiCfg.swiggy?.enabled || data.deliveries.some(d => d.platform === "swiggy")) && tabPill("swiggy", "🟠 Swiggy", data.deliveries.filter(d => d.platform === "swiggy").length)}
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search deliveries..." />

      {/* ── DELIVERY CARDS ── */}
      <div style={{ display: "grid", gap: 8 }}>
        {[...filteredAll].reverse().map(d => {
          const pColor = d.platform && platformColor[d.platform] ? platformColor[d.platform] : C.muted;
          const pEmoji = d.platform === "zomato" ? "🔴" : d.platform === "swiggy" ? "🟠" : "🏠";
          return (
            <Card key={d.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, borderLeft: `3px solid ${pColor}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600 }}>{d.customerName}</span>
                  <Badge label={d.status} color={sc[d.status]} />
                  <span style={{ fontSize: 10, background: pColor + "22", color: pColor, padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>{pEmoji} {d.platform ? d.platform.charAt(0).toUpperCase() + d.platform.slice(1) : "Direct"}</span>
                  {d.externalId && <span style={{ fontSize: 10, color: C.muted }}>{d.externalId}</span>}
                </div>
                <div style={{ color: C.muted, fontSize: 12 }}>📍 {d.address} · 📱 {d.phone}</div>
                {d.assignedTo && <div style={{ color: C.muted, fontSize: 12 }}>🛵 {d.assignedTo}</div>}
                <div style={{ color: C.muted, fontSize: 11 }}>{fmtDate(d.createdAt)} · {fmtTime(d.createdAt)}{d.deliveredAt ? ` · Delivered: ${fmtTime(d.deliveredAt)}` : ""}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 5 }}>
                  {d.items.map((i, idx) => <span key={idx} style={{ background: C.border, borderRadius: 5, padding: "2px 8px", fontSize: 11 }}>{i.name} ×{i.qty}</span>)}
                </div>
                {d.note && <div style={{ color: C.muted, fontSize: 11, marginTop: 3 }}>📝 {d.note}</div>}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ color: C.accent, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{inr(d.total)}</div>
                <div style={{ marginBottom: 6 }}>
                  <DeliveryInvoiceMenu delivery={d} restaurant={data.restaurant} />
                </div>
                {/* Status flow stepper */}
                <div style={{ display: "flex", gap: 2, marginBottom: 8, flexWrap: "wrap" }}>
                  {["placed","accepted","preparing","out_for_delivery","delivered"].map((s,i,arr) => {
                    const idx = arr.indexOf(d.status);
                    const done = i <= idx;
                    const current = s === d.status;
                    return (
                      <button key={s} onClick={() => setData(dx => ({ ...dx, deliveries: dx.deliveries.map(x => x.id === d.id ? { ...x, status: s, deliveredAt: s === "delivered" ? now() : x.deliveredAt, acceptedAt: s === "accepted" ? now() : x.acceptedAt } : x) }))}
                        title={STATUS_LABELS[s]}
                        style={{ fontSize: 9, padding: "2px 5px", borderRadius: 4, border: `1px solid ${done ? sc[s]||C.accent : C.border}`, background: current ? (sc[s]||C.accent)+"33" : done ? (sc[s]||C.accent)+"11" : "transparent", color: done ? sc[s]||C.accent : C.muted, cursor: "pointer", fontWeight: current ? 700 : 400 }}>
                        {STATUS_LABELS[s].split(" ")[0]}
                      </button>
                    );
                  })}
                  <button onClick={() => setData(dx => ({ ...dx, deliveries: dx.deliveries.map(x => x.id === d.id ? { ...x, status: "cancelled" } : x) }))}
                    style={{ fontSize: 9, padding: "2px 5px", borderRadius: 4, border: `1px solid ${d.status==="cancelled"?C.red:C.border}`, background: d.status==="cancelled"?C.red+"22":"transparent", color: d.status==="cancelled"?C.red:C.muted, cursor: "pointer" }}>❌</button>
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  <Btn size="sm" variant="ghost" onClick={() => { setForm({ ...d, items: [...d.items] }); setModal("edit"); }}>✏️ Edit</Btn>
                  {perms?.canDelete && <Btn size="sm" variant="danger" onClick={() => setData(dx => ({ ...dx, deliveries: dx.deliveries.filter(x => x.id !== d.id) }))}>🗑</Btn>}
                </div>
              </div>
            </Card>
          );
        })}
        {filteredAll.length === 0 && <div style={{ padding: 30, textAlign: "center", color: C.muted, fontSize: 13 }}>No deliveries found.</div>}
      </div>

      {/* ── API SETUP MODAL ── */}
      {apiModal && (
        <Modal title={`⚙️ ${DELIVERY_PLATFORMS[apiModal].name} Integration`} onClose={() => setApiModal(null)}>
          <div style={{ background: C.surface, borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
            <div style={{ color: C.cream, fontWeight: 600, marginBottom: 4 }}>🔌 How to connect</div>
            {apiModal === "zomato" && <>1. Log into your <strong>Zomato for Restaurants</strong> portal<br />2. Go to Settings → API Access → Generate Token<br />3. Paste the token below<br /><em>Note: Zomato's official API is invite-only. Mock sync is active until your key is approved.</em></>}
            {apiModal === "swiggy" && <>1. Log into <strong>Swiggy Partner Portal</strong><br />2. Go to Integrations → API Keys → Create New Key<br />3. Paste the key below<br /><em>Note: Swiggy API requires business verification. Mock sync is active until then.</em></>}
          </div>
          <Field label={`${DELIVERY_PLATFORMS[apiModal].name.toUpperCase()} API KEY`}>
            <input value={apiForm.key || ""} onChange={e => setApiForm(f => ({ ...f, key: e.target.value }))} placeholder="Paste your API key here..." type="password" />
          </Field>
          <Field label="RESTAURANT ID (from portal)">
            <input value={apiForm.restaurantId || ""} onChange={e => setApiForm(f => ({ ...f, restaurantId: e.target.value }))} placeholder="e.g. 12345678" />
          </Field>
          <Field label="AUTO-SYNC INTERVAL">
            <select value={apiForm.interval || "90"} onChange={e => setApiForm(f => ({ ...f, interval: e.target.value }))}>
              <option value="30">Every 30 seconds</option>
              <option value="60">Every 1 minute</option>
              <option value="90">Every 90 seconds</option>
              <option value="300">Every 5 minutes</option>
            </select>
          </Field>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, padding: "10px 12px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Enable {DELIVERY_PLATFORMS[apiModal].name} Integration</div>
              <div style={{ fontSize: 11, color: C.muted }}>Live order sync, revenue tracking, and platform tagging</div>
            </div>
            <button onClick={() => setApiForm(f => ({ ...f, enabled: !f.enabled }))} style={{ width: 42, height: 24, borderRadius: 12, background: apiForm.enabled ? DELIVERY_PLATFORMS[apiModal].color : C.border, border: "none", cursor: "pointer", position: "relative", transition: "background .2s" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: apiForm.enabled ? 21 : 3, transition: "left .2s" }} />
            </button>
          </div>
          <Divider />
          <div style={{ display: "flex", gap: 8 }}>
            <Btn full onClick={() => { saveApiCfg({ ...apiCfg, [apiModal]: { ...apiForm } }); setApiModal(null); }}>Save Integration</Btn>
            {apiCfg[apiModal]?.enabled && <Btn variant="ghost" onClick={() => { saveApiCfg({ ...apiCfg, [apiModal]: { ...apiCfg[apiModal], enabled: false } }); setApiModal(null); }}>Disable</Btn>}
          </div>
        </Modal>
      )}

      {/* ── EDIT MODAL ── */}
      {modal === "edit" && (
        <Modal title="Edit Delivery" onClose={() => setModal(null)}>
          <Row>
            <Field label="CUSTOMER NAME" half><input value={form.customerName || ""} onChange={sf("customerName")} /></Field>
            <Field label="PHONE" half><input value={form.phone || ""} onChange={sf("phone")} /></Field>
          </Row>
          <Field label="ADDRESS"><textarea value={form.address || ""} onChange={sf("address")} rows={2} /></Field>
          <Row>
            <Field label="PLATFORM" half>
              <select value={form.platform || "direct"} onChange={sf("platform")}>
                <option value="direct">🏠 Direct</option>
                <option value="zomato">🔴 Zomato</option>
                <option value="swiggy">🟠 Swiggy</option>
              </select>
            </Field>
            <Field label="ASSIGN TO / RIDER" half><input value={form.assignedTo || ""} onChange={sf("assignedTo")} placeholder="Rider / platform" /></Field>
          </Row>
          <Field label="STATUS">
            <select value={form.status || "placed"} onChange={sf("status")}>
              {DELIVERY_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
          </Field>
          <Field label="ITEMS">
            {(form.items || []).map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: 6, marginBottom: 6 }}>
                <input placeholder="Item name" value={item.name || ""} onChange={e => setForm(f => ({ ...f, items: f.items.map((x, j) => j === i ? { ...x, name: e.target.value } : x) }))} />
                <input placeholder="Qty" type="number" value={item.qty || ""} onChange={e => setForm(f => ({ ...f, items: f.items.map((x, j) => j === i ? { ...x, qty: +e.target.value } : x) }))} />
                <input placeholder="₹" type="number" value={item.price || ""} onChange={e => setForm(f => ({ ...f, items: f.items.map((x, j) => j === i ? { ...x, price: +e.target.value } : x) }))} />
                <button onClick={() => setForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) }))} style={{ background: C.red + "22", color: C.red, borderRadius: 6, padding: "0 9px", fontSize: 15, border: "none", cursor: "pointer" }}>✕</button>
              </div>
            ))}
            <Btn size="sm" variant="ghost" onClick={() => setForm(f => ({ ...f, items: [...f.items, { name: "", qty: 1, price: "" }] }))}>+ Add Item</Btn>
          </Field>
          <Field label="NOTE"><input value={form.note || ""} onChange={sf("note")} /></Field>
          <Divider />
          <Btn full onClick={() => {
            const items = form.items || [];
            const total = items.reduce((s, i) => s + (+i.qty) * (+i.price), 0);
            setData(d => ({ ...d, deliveries: d.deliveries.map(x => x.id === form.id ? { ...form, total } : x) }));
            setModal(null);
          }}>Save Changes</Btn>
        </Modal>
      )}

      {/* ── ADD MODAL ── */}
      {modal === "add" && (
        <Modal title="New Delivery" onClose={() => setModal(null)}>
          <Row>
            <Field label="CUSTOMER NAME" half><input value={form.customerName || ""} onChange={sf("customerName")} /></Field>
            <Field label="PHONE" half><input value={form.phone || ""} onChange={sf("phone")} /></Field>
          </Row>
          <Field label="ADDRESS"><textarea value={form.address || ""} onChange={sf("address")} rows={2} /></Field>
          <Row>
            <Field label="PLATFORM" half>
              <select value={form.platform || "direct"} onChange={sf("platform")}>
                <option value="direct">🏠 Direct</option>
                <option value="zomato">🔴 Zomato</option>
                <option value="swiggy">🟠 Swiggy</option>
              </select>
            </Field>
            <Field label="ASSIGN TO / RIDER" half><input value={form.assignedTo || ""} onChange={sf("assignedTo")} placeholder="Rider name" /></Field>
          </Row>
          <Field label="ITEMS">
            {(form.items || []).map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: 6, marginBottom: 6 }}>
                <input placeholder="Item name" value={item.name} onChange={e => setForm(f => ({ ...f, items: f.items.map((x, j) => j === i ? { ...x, name: e.target.value } : x) }))} />
                <input placeholder="Qty" type="number" value={item.qty} onChange={e => setForm(f => ({ ...f, items: f.items.map((x, j) => j === i ? { ...x, qty: e.target.value } : x) }))} />
                <input placeholder="₹" type="number" value={item.price} onChange={e => setForm(f => ({ ...f, items: f.items.map((x, j) => j === i ? { ...x, price: e.target.value } : x) }))} />
                <button onClick={() => setForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) }))} style={{ background: C.red + "22", color: C.red, borderRadius: 6, padding: "0 9px", fontSize: 15, border: "none", cursor: "pointer" }}>✕</button>
              </div>
            ))}
            <Btn size="sm" variant="ghost" onClick={() => setForm(f => ({ ...f, items: [...f.items, { name: "", qty: 1, price: "" }] }))}>+ Add Item</Btn>
          </Field>
          {(form.items || []).length > 0 && <div style={{ color: C.accent, fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Total: {inr(formTotal)}</div>}
          <Field label="NOTE"><input value={form.note || ""} onChange={sf("note")} placeholder="Ring bell, leave at door..." /></Field>
          <Divider />
          <Btn full onClick={() => { setData(d => ({ ...d, deliveries: [...d.deliveries, { id: mkId(), ...form, total: formTotal, createdAt: now(), status: "placed" }] })); setModal(null); setForm({ items: [] }); }} disabled={!form.customerName || !form.address}>Place Delivery</Btn>
        </Modal>
      )}
    </div>
  );
}

// ── INVENTORY ────────────────────────────────────────────────
function Inventory({ data, setData, perms }) {
  useTheme();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [reorderModal, setReorderModal] = useState(null); // ingredient to restock
  const [restockQty, setRestockQty] = useState("");
  const sf = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const ings = data.ingredients || [];
  const cats = [...new Set(ings.map(i => i.category || "Other"))];
  const low = getLowStockIngredients(ings);

  const filtered = ings.filter(i => {
    const matchS = !search || i.name.toLowerCase().includes(search.toLowerCase()) || (i.category||"").toLowerCase().includes(search.toLowerCase());
    const matchC = catFilter === "all" || i.category === catFilter;
    return matchS && matchC;
  });

  const save = () => {
    if (!form.name) return alert("Name required.");
    const ing = { ...form, stock: +form.stock || 0, lowStockAt: form.lowStockAt !== "" ? +form.lowStockAt : 0, cost: +form.cost || 0 };
    if (modal === "add") setData(d => ({ ...d, ingredients: [...(d.ingredients||[]), { id: mkId(), ...ing }] }));
    else setData(d => ({ ...d, ingredients: (d.ingredients||[]).map(x => x.id === form.id ? { ...x, ...ing } : x) }));
    setModal(null);
  };

  const doRestock = () => {
    const qty = parseFloat(restockQty);
    if (!qty || qty <= 0) return;
    setData(d => ({ ...d, ingredients: (d.ingredients||[]).map(x => x.id === reorderModal.id ? { ...x, stock: Math.round((x.stock + qty) * 100) / 100 } : x) }));
    setReorderModal(null); setRestockQty("");
  };

  const stockColor = ing => {
    if (!ing.lowStockAt) return C.green;
    if (ing.stock <= 0) return C.red;
    if (ing.stock <= ing.lowStockAt) return C.orange;
    if (ing.stock <= ing.lowStockAt * 2) return C.accent;
    return C.green;
  };

  // Which menu items use this ingredient
  const usedIn = ingId => (data.menu || []).filter(m => (m.ingredients||[]).some(l => l.ingId === ingId)).map(m => m.name);

  return <div className="fade-in">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <div className="playfair" style={{ fontSize: 24 }}>Inventory</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ExportMenu
          label="Export"
          csvRows={ings.map(i => ({ name: i.name, category: i.category||"", unit: i.unit, stock: i.stock, lowStockAt: i.lowStockAt||0, cost: i.cost||0, supplier: i.supplier||"", status: i.stock <= 0 ? "OUT" : i.stock <= (i.lowStockAt||0) ? "LOW" : "OK" }))}
          csvName="inventory"
          printHtml={`<div class="title">Inventory Report</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Ingredient</th><th>Category</th><th>Stock</th><th>Unit</th><th>Low At</th><th>Cost/Unit</th><th>Supplier</th><th>Status</th></tr></thead><tbody>${ings.map(i=>`<tr><td>${i.name}</td><td>${i.category||""}</td><td>${i.stock}</td><td>${i.unit}</td><td>${i.lowStockAt||0}</td><td>₹${i.cost||0}</td><td>${i.supplier||"—"}</td><td>${i.stock<=0?"🔴 OUT":i.stock<=(i.lowStockAt||0)?"🟠 LOW":"🟢 OK"}</td></tr>`).join("")}</tbody></table>`}
          printName="Inventory"
          wordHtml={`<div class="title">Inventory</div><table><thead><tr><th>Ingredient</th><th>Stock</th><th>Unit</th><th>Status</th></tr></thead><tbody>${ings.map(i=>`<tr><td>${i.name}</td><td>${i.stock}</td><td>${i.unit}</td><td>${i.stock<=0?"OUT":i.stock<=(i.lowStockAt||0)?"LOW":"OK"}</td></tr>`).join("")}</tbody></table>`}
          wordName="Inventory"
        />
        {perms.canEditMenu && <Btn onClick={() => { setForm({ name: "", category: "Vegetables", unit: "kg", stock: "", lowStockAt: "", cost: "", supplier: "" }); setModal("add"); }}>+ Add Ingredient</Btn>}
      </div>
    </div>

    {/* Low stock summary */}
    {low.length > 0 && (
      <div style={{ background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: C.red, fontSize: 13, marginBottom: 6 }}>⚠️ {low.length} item{low.length > 1 ? "s" : ""} at or below reorder level</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {low.map(i => (
            <button key={i.id} onClick={() => { setReorderModal(i); setRestockQty(""); }}
              style={{ background: C.red + "22", color: C.red, border: `1px solid ${C.red}44`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              {i.name}: {i.stock}{i.unit} ↗ Restock
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginBottom: 14 }}>
      <StatCard icon="📦" label="Total Ingredients" value={ings.length} color={C.blue} />
      <StatCard icon="🟢" label="In Stock" value={ings.filter(i => i.stock > (i.lowStockAt || 0)).length} color={C.green} />
      <StatCard icon="🟠" label="Low Stock" value={low.filter(i => i.stock > 0).length} color={C.orange} />
      <StatCard icon="🔴" label="Out of Stock" value={ings.filter(i => i.stock <= 0).length} color={C.red} />
      {perms.canSeeFinancials && <StatCard icon="💰" label="Inventory Value" value={inr(ings.reduce((s, i) => s + (i.stock * (i.cost || 0)), 0))} color={C.accent} />}
    </div>

    {/* Filters */}
    <SearchBar value={search} onChange={setSearch} placeholder="Search ingredient, category..." />
    <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
      {["all", ...cats].map(c => (
        <button key={c} onClick={() => setCatFilter(c)} style={{ background: catFilter === c ? C.accent + "22" : "transparent", color: catFilter === c ? C.accent : C.muted, border: `1px solid ${catFilter === c ? C.accent : C.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 12, cursor: "pointer" }}>
          {c === "all" ? `All (${ings.length})` : `${c} (${ings.filter(x => x.category === c).length})`}
        </button>
      ))}
    </div>

    {/* Ingredient table */}
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Unit</th>
            <th>Low Alert</th>
            {perms.canSeeFinancials && <th>Cost/Unit</th>}
            <th>Supplier</th>
            <th>Used In</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && <tr><td colSpan={9} style={{ textAlign: "center", color: C.muted, padding: 24 }}>No ingredients found.</td></tr>}
          {filtered.map(ing => {
            const color = stockColor(ing);
            const pct = ing.lowStockAt ? Math.min(100, Math.round(ing.stock / (ing.lowStockAt * 3) * 100)) : 100;
            const dishes = usedIn(ing.id);
            return (
              <tr key={ing.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{ing.name}</div>
                  <div style={{ width: 80, background: C.border, borderRadius: 3, height: 4, marginTop: 4 }}>
                    <div style={{ width: `${pct}%`, background: color, height: 4, borderRadius: 3, transition: "width .3s" }} />
                  </div>
                </td>
                <td><Badge label={ing.category || "Other"} color={C.blue} /></td>
                <td>
                  <span style={{ color, fontWeight: 700, fontSize: 14 }}>{ing.stock}</span>
                  {ing.stock <= 0 && <span style={{ color: C.red, fontSize: 10, marginLeft: 4 }}>OUT</span>}
                  {ing.stock > 0 && ing.lowStockAt && ing.stock <= ing.lowStockAt && <span style={{ color: C.orange, fontSize: 10, marginLeft: 4 }}>LOW</span>}
                </td>
                <td style={{ color: C.muted }}>{ing.unit}</td>
                <td style={{ color: C.muted }}>{ing.lowStockAt ?? "—"} {ing.unit}</td>
                {perms.canSeeFinancials && <td style={{ color: C.muted }}>₹{ing.cost || 0}</td>}
                <td style={{ color: C.muted, fontSize: 12 }}>{ing.supplier || "—"}</td>
                <td style={{ maxWidth: 120 }}>
                  {dishes.length > 0
                    ? <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                        {dishes.slice(0, 2).map(d => <span key={d} style={{ background: C.border, borderRadius: 4, padding: "1px 6px", fontSize: 10 }}>{d}</span>)}
                        {dishes.length > 2 && <span style={{ color: C.muted, fontSize: 10 }}>+{dishes.length - 2}</span>}
                      </div>
                    : <span style={{ color: C.muted, fontSize: 11 }}>—</span>}
                </td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Btn size="sm" variant="ghost" onClick={() => { setReorderModal(ing); setRestockQty(""); }}>↗ Restock</Btn>
                    {perms.canEditMenu && <Btn size="sm" variant="ghost" onClick={() => { setForm({ ...ing, stock: String(ing.stock), lowStockAt: String(ing.lowStockAt ?? ""), cost: String(ing.cost || "") }); setModal("edit"); }}>✏️</Btn>}
                    {perms.canDelete && <Btn size="sm" variant="danger" onClick={() => { if (window.confirm("Delete ingredient?")) setData(d => ({ ...d, ingredients: (d.ingredients||[]).filter(x => x.id !== ing.id) })); }}>🗑</Btn>}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>

    {/* Restock modal */}
    {reorderModal && (
      <Modal title={`↗ Restock — ${reorderModal.name}`} onClose={() => setReorderModal(null)}>
        <div style={{ background: C.surface, borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13 }}>
          <div style={{ color: C.muted, fontSize: 11, marginBottom: 4 }}>CURRENT STOCK</div>
          <div style={{ color: stockColor(reorderModal), fontWeight: 700, fontSize: 22 }}>{reorderModal.stock} {reorderModal.unit}</div>
          {reorderModal.lowStockAt != null && <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>Reorder level: {reorderModal.lowStockAt} {reorderModal.unit}</div>}
        </div>
        <Field label={`ADD QUANTITY (${reorderModal.unit})`}>
          <input type="number" min="0" step="0.1" value={restockQty} onChange={e => setRestockQty(e.target.value)} placeholder={`e.g. 5 ${reorderModal.unit}`} autoFocus />
        </Field>
        {reorderModal.cost > 0 && restockQty > 0 && (
          <div style={{ background: C.accent + "11", borderRadius: 7, padding: "8px 12px", fontSize: 12, color: C.muted, marginBottom: 10 }}>
            Cost estimate: <strong style={{ color: C.accent }}>₹{(reorderModal.cost * +restockQty).toLocaleString("en-IN")}</strong>
          </div>
        )}
        {reorderModal.supplier && <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>🏪 Supplier: {reorderModal.supplier}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <Btn full onClick={doRestock} disabled={!restockQty || +restockQty <= 0}>↗ Add to Stock</Btn>
          <Btn variant="ghost" onClick={() => setReorderModal(null)}>Cancel</Btn>
        </div>
      </Modal>
    )}

    {/* Add/Edit modal */}
    {modal && (
      <Modal title={modal === "add" ? "➕ Add Ingredient" : `✏️ Edit — ${form.name}`} onClose={() => setModal(null)}>
        <Row>
          <Field label="NAME" half><input value={form.name || ""} onChange={sf("name")} placeholder="e.g. Tomatoes" /></Field>
          <Field label="CATEGORY" half>
            <input value={form.category || ""} onChange={sf("category")} list="ing-cat-list" placeholder="Vegetables, Dairy..." />
            <datalist id="ing-cat-list">
              {["Vegetables","Meat","Dairy","Grains","Pulses","Spices","Fruits","Pantry","Beverages"].map(c => <option key={c} value={c} />)}
            </datalist>
          </Field>
        </Row>
        <Row>
          <Field label="CURRENT STOCK" half><input type="number" min="0" step="0.1" value={form.stock ?? ""} onChange={sf("stock")} placeholder="e.g. 10" /></Field>
          <Field label="UNIT" half>
            <input value={form.unit || ""} onChange={sf("unit")} list="unit-list" placeholder="kg, litre, pcs..." />
            <datalist id="unit-list">{["kg","g","litre","ml","pcs","dozen","box","bag","bottle"].map(u => <option key={u} value={u} />)}</datalist>
          </Field>
        </Row>
        <Row>
          <Field label="LOW STOCK ALERT AT" half><input type="number" min="0" step="0.1" value={form.lowStockAt ?? ""} onChange={sf("lowStockAt")} placeholder="e.g. 2" /></Field>
          <Field label="COST PER UNIT (₹)" half><input type="number" min="0" value={form.cost || ""} onChange={sf("cost")} placeholder="e.g. 30" /></Field>
        </Row>
        <Field label="SUPPLIER (optional)"><input value={form.supplier || ""} onChange={sf("supplier")} placeholder="e.g. Fresh Farms" /></Field>
        <Divider />
        <div style={{ display: "flex", gap: 8 }}>
          <Btn full onClick={save}>{modal === "add" ? "Add Ingredient" : "Save Changes"}</Btn>
          {modal === "edit" && perms.canDelete && <Btn variant="danger" onClick={() => { if (window.confirm("Delete?")) { setData(d => ({ ...d, ingredients: (d.ingredients||[]).filter(x => x.id !== form.id) })); setModal(null); } }}>Delete</Btn>}
        </div>
      </Modal>
    )}
  </div>;
}

// ── WASTAGE ───────────────────────────────────────────────────
function Wastage({data,setData,perms}){
  const [modal,setModal]=useState(null);const [form,setForm]=useState({});
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const totalCost=data.wastage.reduce((s,w)=>s+ +w.cost,0);
  const save=()=>{
    if(modal==="add")setData(d=>({...d,wastage:[...d.wastage,{id:mkId(),...form,cost:+form.cost}]}));
    else setData(d=>({...d,wastage:d.wastage.map(w=>w.id===form.id?{...form,cost:+form.cost}:w)}));
    setModal(null);
  };
  return <div className="fade-in">
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <div className="playfair" style={{fontSize:24}}>Wastage Log</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <ExportMenu
          label="Export"
          csvRows={data.wastage.map(w=>({item:w.item,qty:w.qty,cost:w.cost,reason:w.reason,date:w.date,recordedBy:w.recordedBy||""}))}
          csvName="wastage"
          printHtml={`<div class="title">Wastage Log</div><div class="sub">${data.restaurant.name} · Generated ${new Date().toLocaleString("en-IN")}</div><table><thead><tr><th>Item</th><th>Qty</th><th>Reason</th><th>Date</th><th>Recorded By</th><th>Cost</th></tr></thead><tbody>${data.wastage.map(w=>`<tr><td>${w.item}</td><td>${w.qty}</td><td>${w.reason}</td><td>${w.date}</td><td>${w.recordedBy||"—"}</td><td>₹${(+w.cost).toLocaleString("en-IN")}</td></tr>`).join("")}</tbody></table><p style="margin-top:14px;font-weight:700">Total Wastage Cost: ₹${data.wastage.reduce((s,w)=>s+(+w.cost),0).toLocaleString("en-IN")}</p>`}
          printName="Wastage Log"
          wordHtml={`<div class="title">Wastage Log</div><div class="sub">${data.restaurant.name}</div><table><thead><tr><th>Item</th><th>Qty</th><th>Reason</th><th>Date</th><th>Cost</th></tr></thead><tbody>${data.wastage.map(w=>`<tr><td>${w.item}</td><td>${w.qty}</td><td>${w.reason}</td><td>${w.date}</td><td>₹${(+w.cost).toLocaleString("en-IN")}</td></tr>`).join("")}</tbody></table>`}
          wordName="Wastage_Log"
        />
        <Btn onClick={()=>{setForm({item:"",qty:"",cost:"",reason:"Expired",date:today(),recordedBy:""});setModal("add");}}>+ Log Wastage</Btn>
      </div>
    </div>
    {perms.canSeeFinancials&&<div style={{background:C.red+"18",border:"1px solid #e05a4e33",borderRadius:8,padding:"8px 14px",fontSize:12,marginBottom:14,display:"inline-block"}}>
      <span style={{color:C.red,fontWeight:600}}>{inr(totalCost)}</span> <span style={{color:C.muted}}>total wastage cost</span>
    </div>}
    <table>
      <thead><tr><th>Item</th><th>Qty</th><th>Reason</th><th>Date</th><th>Recorded By</th>{perms.canSeeFinancials&&<th>Cost</th>}<th></th></tr></thead>
      <tbody>
        {[...data.wastage].reverse().map(w=>(
          <tr key={w.id}>
            <td style={{fontWeight:500}}>{w.item}</td>
            <td style={{color:C.muted}}>{w.qty}</td>
            <td><Badge label={w.reason} color={C.orange} /></td>
            <td style={{color:C.muted,fontSize:12}}>{w.date}</td>
            <td style={{color:C.muted,fontSize:12}}>{w.recordedBy}</td>
            {perms.canSeeFinancials&&<td style={{color:C.red,fontWeight:600}}>{inr(w.cost)}</td>}
            <td><Btn size="sm" variant="ghost" onClick={()=>{setForm({...w,cost:String(w.cost)});setModal("edit");}}>Edit</Btn></td>
          </tr>
        ))}
        {data.wastage.length===0&&<tr><td colSpan={7} style={{textAlign:"center",color:C.muted,padding:20}}>No wastage recorded.</td></tr>}
      </tbody>
    </table>
    {modal&&<Modal title={modal==="add"?"Log Wastage":"Edit Wastage"} onClose={()=>setModal(null)}>
      <Row><Field label="ITEM" half><input value={form.item||""} onChange={sf("item")} placeholder="e.g. Tomatoes" /></Field>
      <Field label="QUANTITY" half><input value={form.qty||""} onChange={sf("qty")} placeholder="e.g. 2 kg" /></Field></Row>
      <Row><Field label="COST (₹)" half><input type="number" value={form.cost||""} onChange={sf("cost")} /></Field>
      <Field label="DATE" half><input type="date" value={form.date||""} onChange={sf("date")} /></Field></Row>
      <Row><Field label="REASON" half><select value={form.reason||"Expired"} onChange={sf("reason")}><option>Expired</option><option>Damaged</option><option>Overcooked</option><option>Customer return</option><option>Other</option></select></Field>
      <Field label="RECORDED BY" half><input value={form.recordedBy||""} onChange={sf("recordedBy")} placeholder="Staff name" /></Field></Row>
      <Divider />
      <div style={{display:"flex",gap:8}}>
        <Btn full onClick={save}>Save</Btn>
        {modal==="edit"&&perms.canDelete&&<Btn variant="danger" onClick={()=>{setData(d=>({...d,wastage:d.wastage.filter(w=>w.id!==form.id)}));setModal(null);}}>Delete</Btn>}
      </div>
    </Modal>}
  </div>;
}

// ── ANALYTICS ─────────────────────────────────────────────────
// ── MINI SVG BAR CHART ────────────────────────────────────────
function BarChart({bars,height=80,color,labelKey="label",valueKey="value"}){
  useTheme();
  if(!bars||bars.length===0)return <div style={{color:C.muted,fontSize:12,padding:"20px 0",textAlign:"center"}}>No data yet.</div>;
  const max=Math.max(1,...bars.map(b=>b[valueKey]||0));
  const w=Math.max(18,Math.floor(320/bars.length)-3);
  return <div style={{display:"flex",alignItems:"flex-end",gap:3,height:height+28,overflowX:"auto",paddingBottom:2}}>
    {bars.map((b,i)=>(
      <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0,width:w}}>
        <div style={{fontSize:9,color:C.muted,fontWeight:600,minHeight:14}}>{b[valueKey]>0?inr(b[valueKey]).replace("₹",""):""}</div>
        <div style={{width:"100%",background:C.border,borderRadius:"3px 3px 0 0",height:height,display:"flex",alignItems:"flex-end",overflow:"hidden"}}>
          <div style={{width:"100%",background:color||C.accent,borderRadius:"3px 3px 0 0",height:`${Math.max(2,Math.round(b[valueKey]/max*height))}px`,transition:"height .4s ease",opacity:0.85+(i/bars.length*0.15)}} />
        </div>
        <div style={{fontSize:9,color:C.muted,textAlign:"center",lineHeight:1.2,maxWidth:w+6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b[labelKey]}</div>
      </div>
    ))}
  </div>;
}

function Analytics({data,perms}){
  useTheme();
  const [period,setPeriod]=useState("daily"); // daily | weekly | monthly
  const [aTab,setATab]=useState("overview"); // overview | revenue | categories | peak | profit

  const paidOrders=data.orders.filter(o=>o.status==="paid");
  const allOrders=data.orders;
  const revenue=paidOrders.reduce((s,o)=>s+o.total,0);
  const totalExpenses=data.expenses.reduce((s,e)=>s+(+e.amount||0),0);
  const totalCost=paidOrders.reduce((s,o)=>s+o.items.reduce((ss,i)=>{const m=data.menu.find(x=>x.id===i.menuId);return ss+(m?.cost||0)*i.qty;},0),0);
  const grossProfit=revenue-totalCost;
  const netProfit=revenue-totalExpenses;
  const avgOrder=paidOrders.length?Math.round(revenue/paidOrders.length):0;

  // ── Period buckets ──
  const now2=new Date();
  function getBuckets(){
    if(period==="daily"){
      // Last 14 days
      return Array.from({length:14},(_,i)=>{
        const d=new Date(now2);d.setDate(d.getDate()-(13-i));
        const key=d.toISOString().split("T")[0];
        const label=d.toLocaleDateString("en-IN",{day:"numeric",month:"short"});
        return {key,label};
      });
    }
    if(period==="weekly"){
      // Last 8 weeks
      return Array.from({length:8},(_,i)=>{
        const end=new Date(now2);end.setDate(end.getDate()-i*7);
        const start=new Date(end);start.setDate(start.getDate()-6);
        const key=start.toISOString().split("T")[0];
        const label=`${start.getDate()}/${start.getMonth()+1}`;
        return {key,label,start,end};
      }).reverse();
    }
    // monthly — last 6 months
    return Array.from({length:6},(_,i)=>{
      const d=new Date(now2.getFullYear(),now2.getMonth()-5+i,1);
      const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
      const label=d.toLocaleDateString("en-IN",{month:"short",year:"2-digit"});
      return {key,label,month:d.getMonth(),year:d.getFullYear()};
    });
  }

  const buckets=useMemo(()=>getBuckets(),[period]);

  const revenueByBucket=useMemo(()=>buckets.map(b=>{
    let val=0;
    if(period==="daily"){
      val=paidOrders.filter(o=>o.createdAt.startsWith(b.key)).reduce((s,o)=>s+o.total,0);
    } else if(period==="weekly"){
      val=paidOrders.filter(o=>{const d=new Date(o.createdAt);return d>=b.start&&d<=b.end;}).reduce((s,o)=>s+o.total,0);
    } else {
      val=paidOrders.filter(o=>o.createdAt.startsWith(b.key)).reduce((s,o)=>s+o.total,0);
    }
    return {...b,value:val};
  }),[buckets,paidOrders]);

  const ordersByBucket=useMemo(()=>buckets.map(b=>{
    let val=0;
    if(period==="daily") val=allOrders.filter(o=>o.createdAt.startsWith(b.key)).length;
    else if(period==="weekly") val=allOrders.filter(o=>{const d=new Date(o.createdAt);return d>=b.start&&d<=b.end;}).length;
    else val=allOrders.filter(o=>o.createdAt.startsWith(b.key)).length;
    return {...b,value:val};
  }),[buckets,allOrders]);

  // ── Category breakdown ──
  const catData=useMemo(()=>{
    const rev={},qty={},orders={};
    paidOrders.forEach(o=>o.items.forEach(i=>{
      const m=data.menu.find(x=>x.id===i.menuId);
      const cat=m?.category||"Other";
      rev[cat]=(rev[cat]||0)+i.qty*i.price;
      qty[cat]=(qty[cat]||0)+i.qty;
      orders[cat]=(orders[cat]||0)+1;
    }));
    return Object.entries(rev).sort((a,b)=>b[1]-a[1]).map(([cat,r])=>({cat,rev:r,qty:qty[cat]||0,orders:orders[cat]||0}));
  },[paidOrders,data.menu]);

  // ── Peak hours ──
  const peakHours=useMemo(()=>{
    const hrs=Array.from({length:24},(_,h)=>({hour:h,orders:0,revenue:0}));
    allOrders.forEach(o=>{
      const h=new Date(o.createdAt).getHours();
      hrs[h].orders++;
      hrs[h].revenue+=(o.total||0);
    });
    return hrs.filter(h=>h.hour>=7&&h.hour<=23).map(h=>({
      ...h,
      label:`${h.hour%12||12}${h.hour<12?"am":"pm"}`,
      value:h.orders,
    }));
  },[allOrders]);

  const peakHour=peakHours.reduce((a,b)=>b.orders>a.orders?b:a,{orders:0,label:"—"});

  // ── Best items ──
  const itemSales=useMemo(()=>{
    const s={};
    paidOrders.forEach(o=>o.items.forEach(i=>{s[i.name]=(s[i.name]||0)+i.qty;}));
    return Object.entries(s).sort((a,b)=>b[1]-a[1]).slice(0,8);
  },[paidOrders]);

  // ── Profit P&L breakdown ──
  const expByCategory=useMemo(()=>{
    const e={};
    data.expenses.forEach(exp=>{e[exp.category]=(e[exp.category]||0)+(+exp.amount||0);});
    return Object.entries(e).sort((a,b)=>b[1]-a[1]);
  },[data.expenses]);

  const catColors=[C.accent,C.blue,C.green,C.purple,C.orange,C.red,"#48cae4","#f4a261"];

  const periodPill=(id,label)=>(
    <button onClick={()=>setPeriod(id)} style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:period===id?700:400,background:period===id?C.accent+"22":"transparent",color:period===id?C.accent:C.muted,border:`1px solid ${period===id?C.accent+"55":C.border}`,cursor:"pointer",transition:"all .15s"}}>{label}</button>
  );
  const tabPill=(id,label)=>(
    <button onClick={()=>setATab(id)} style={{padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:aTab===id?600:400,background:aTab===id?C.accent+"22":"transparent",color:aTab===id?C.accent:C.muted,border:`1px solid ${aTab===id?C.accent+"55":C.border}`,cursor:"pointer",transition:"all .15s"}}>{label}</button>
  );

  return <div className="fade-in">
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
      <div className="playfair" style={{fontSize:24}}>Analytics & Reports</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{display:"flex",gap:4}}>{periodPill("daily","Daily")}{periodPill("weekly","Weekly")}{periodPill("monthly","Monthly")}</div>
        <ExportMenu label="Export Orders"
          csvRows={paidOrders.map(o=>({id:o.id,customer:o.customerName||"",table:data.tables.find(t=>t.id===o.tableId)?.number||"",total:o.total,status:o.status,date:o.createdAt.split("T")[0]}))}
          csvName="orders" printName="Orders Report"
          printHtml={`<div class="title">Orders</div><table><thead><tr><th>ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>${paidOrders.map(o=>`<tr><td>#${o.id.slice(-6)}</td><td>${o.createdAt.split("T")[0]}</td><td>${o.customerName||"—"}</td><td>₹${o.total?.toLocaleString("en-IN")}</td><td>${o.status}</td></tr>`).join("")}</tbody></table>`}
          wordHtml={`<div class="title">Orders</div><table><thead><tr><th>Date</th><th>Customer</th><th>Total</th></tr></thead><tbody>${paidOrders.map(o=>`<tr><td>${o.createdAt.split("T")[0]}</td><td>${o.customerName||"—"}</td><td>₹${o.total?.toLocaleString("en-IN")}</td></tr>`).join("")}</tbody></table>`}
          wordName="Orders"
        />
      </div>
    </div>

    {/* KPI row */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:14}}>
      <StatCard icon="💰" label="Total Revenue" value={inr(revenue)} sub={`${paidOrders.length} paid orders`} color={C.green}/>
      <StatCard icon="📈" label="Gross Profit" value={inr(grossProfit)} sub={`${revenue>0?Math.round(grossProfit/revenue*100):0}% margin`} color={grossProfit>=0?C.green:C.red} onClick={()=>setATab("profit")}/>
      <StatCard icon="💸" label="Total Expenses" value={inr(totalExpenses)} sub="all categories" color={C.red}/>
      <StatCard icon="📈" label="Net Profit" value={inr(netProfit)} sub={netProfit>=0?"In the green":"At a loss"} color={netProfit>=0?C.green:C.red}/>
      <StatCard icon="🧾" label="Avg Order" value={inr(avgOrder)} sub="per paid order" color={C.accent}/>
      <StatCard icon="⏰" label="Peak Hour" value={peakHour.label} sub={`${peakHour.orders} orders`} color={C.purple}/>
    </div>

    {/* Sub tabs */}
    <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
      {tabPill("overview","📊 Overview")}
      {tabPill("revenue","💰 Revenue")}
      {tabPill("categories","🗂 Categories")}
      {tabPill("peak","⏰ Peak Hours")}
      {tabPill("profit","📈 Profit & Loss")}
      {tabPill("waiters","🤵 Waiters")}
    </div>

    {/* ── OVERVIEW ── */}
    {aTab==="overview"&&<div className="fade-in">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <Card>
          <div style={{fontWeight:600,fontSize:13,marginBottom:10}}>📦 Orders — {period}</div>
          <BarChart bars={ordersByBucket} color={C.blue} height={70}/>
        </Card>
        <Card>
          <div style={{fontWeight:600,fontSize:13,marginBottom:10}}>💰 Revenue — {period}</div>
          <BarChart bars={revenueByBucket} color={C.green} height={70}/>
        </Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Card>
          <div style={{fontWeight:600,marginBottom:12,fontSize:13}}>🏆 Best Selling Items</div>
          {itemSales.length===0?<div style={{color:C.muted,fontSize:12}}>No sales yet.</div>:itemSales.map(([name,qty],i)=>(
            <div key={name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{width:20,fontSize:11,color:C.muted,fontWeight:700}}>#{i+1}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}><span>{name}</span><span style={{color:C.accent,fontWeight:600}}>{qty} sold</span></div>
                <div style={{background:C.border,borderRadius:3,height:4}}><div style={{background:C.accent,borderRadius:3,height:4,width:`${pct(qty,itemSales[0][1])}%`,transition:"width .4s"}}/></div>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{fontWeight:600,marginBottom:12,fontSize:13}}>🪑 Table Utilisation</div>
          {(()=>{const tu={};data.tables.forEach(t=>{tu[t.status]=(tu[t.status]||0)+1;});const sc={available:C.green,occupied:C.red,reserved:C.accent,cleaning:C.purple};return Object.entries(tu).map(([st,cnt])=>(
            <div key={st} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <Badge label={st} color={sc[st]||C.muted}/>
              <span style={{fontWeight:600}}>{cnt} <span style={{color:C.muted,fontSize:11,fontWeight:400}}>({pct(cnt,data.tables.length)}%)</span></span>
            </div>
          ));})()}
          <div style={{marginTop:10,padding:"7px 10px",background:C.green+"11",borderRadius:6,fontSize:12,color:C.green,fontWeight:600}}>
            Occupancy: {pct(data.tables.filter(t=>t.status==="occupied").length,data.tables.length)}%
          </div>
        </Card>
      </div>
    </div>}

    {/* ── REVENUE ── */}
    {aTab==="revenue"&&<div className="fade-in">
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>💰 Revenue Trend — {period.charAt(0).toUpperCase()+period.slice(1)}</div>
        <BarChart bars={revenueByBucket} color={C.green} height={120}/>
      </Card>
      <Card>
        <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>📋 Orders Trend — {period.charAt(0).toUpperCase()+period.slice(1)}</div>
        <BarChart bars={ordersByBucket} color={C.blue} height={120}/>
      </Card>
    </div>}

    {/* ── CATEGORIES ── */}
    {aTab==="categories"&&<div className="fade-in">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <Card>
          <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>💰 Revenue by Category</div>
          {catData.length===0?<div style={{color:C.muted,fontSize:12}}>No data yet.</div>:catData.map(({cat,rev},i)=>(
            <div key={cat} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:10,height:10,borderRadius:2,background:catColors[i%catColors.length],flexShrink:0}}/>
                  <span style={{fontWeight:500}}>{cat}</span>
                </div>
                <span style={{color:catColors[i%catColors.length],fontWeight:700}}>{inr(rev)}</span>
              </div>
              <div style={{background:C.border,borderRadius:3,height:6}}>
                <div style={{background:catColors[i%catColors.length],borderRadius:3,height:6,width:`${pct(rev,catData[0].rev)}%`,transition:"width .4s"}}/>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>🍽️ Items Sold by Category</div>
          {catData.length===0?<div style={{color:C.muted,fontSize:12}}>No data yet.</div>:catData.map(({cat,qty},i)=>(
            <div key={cat} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:10,height:10,borderRadius:2,background:catColors[i%catColors.length],flexShrink:0}}/>
                  <span style={{fontWeight:500}}>{cat}</span>
                </div>
                <span style={{color:catColors[i%catColors.length],fontWeight:700}}>{qty} items</span>
              </div>
              <div style={{background:C.border,borderRadius:3,height:6}}>
                <div style={{background:catColors[i%catColors.length],borderRadius:3,height:6,width:`${pct(qty,Math.max(1,...catData.map(c=>c.qty)))}%`,transition:"width .4s"}}/>
              </div>
            </div>
          ))}
        </Card>
      </div>
      {/* Category table */}
      <Card style={{padding:0,overflow:"hidden"}}>
        <table>
          <thead><tr><th>Category</th><th>Revenue</th><th>Items Sold</th><th>% of Revenue</th><th>Avg/Item</th></tr></thead>
          <tbody>
            {catData.map(({cat,rev,qty},i)=>(
              <tr key={cat}>
                <td><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:10,height:10,borderRadius:2,background:catColors[i%catColors.length]}}/>{cat}</div></td>
                <td style={{color:C.green,fontWeight:600}}>{inr(rev)}</td>
                <td>{qty}</td>
                <td><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:40,background:C.border,borderRadius:3,height:5}}><div style={{background:catColors[i%catColors.length],height:5,borderRadius:3,width:`${pct(rev,revenue||1)}%`}}/></div>{pct(rev,revenue||1)}%</div></td>
                <td style={{color:C.muted}}>{qty>0?inr(Math.round(rev/qty)):"—"}</td>
              </tr>
            ))}
            {catData.length===0&&<tr><td colSpan={5} style={{textAlign:"center",color:C.muted,padding:20}}>No category data yet.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>}

    {/* ── PEAK HOURS ── */}
    {aTab==="peak"&&<div className="fade-in">
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>⏰ Orders by Hour of Day</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:12}}>Based on all {allOrders.length} orders placed so far</div>
        <BarChart bars={peakHours} color={C.purple} height={130}/>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        <Card style={{textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:4}}>🔥</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:3}}>BUSIEST HOUR</div>
          <div style={{fontSize:22,fontWeight:700,color:C.purple}}>{peakHour.label}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>{peakHour.orders} orders</div>
        </Card>
        <Card style={{textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:4}}>😴</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:3}}>SLOWEST HOUR</div>
          {(()=>{const s=peakHours.reduce((a,b)=>b.orders<a.orders&&b.orders>0?b:a,peakHours.find(h=>h.orders>0)||{label:"—",orders:0});return<><div style={{fontSize:22,fontWeight:700,color:C.blue}}>{s.label}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{s.orders} orders</div></>;})()} 
        </Card>
        <Card style={{textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:4}}>📊</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:3}}>PEAK REVENUE HOUR</div>
          {(()=>{const p=peakHours.reduce((a,b)=>b.revenue>a.revenue?b:a,{label:"—",revenue:0});return<><div style={{fontSize:22,fontWeight:700,color:C.green}}>{p.label}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{inr(Math.round(p.revenue))}</div></>;})()} 
        </Card>
      </div>
    </div>}

    {/* ── PROFIT & LOSS ── */}
    {aTab==="profit"&&<div className="fade-in">
      {/* P&L Summary */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
        <Card style={{borderLeft:`3px solid ${C.green}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>GROSS REVENUE</div>
          <div style={{fontSize:24,fontWeight:700,color:C.green}}>{inr(revenue)}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>{paidOrders.length} paid orders</div>
        </Card>
        <Card style={{borderLeft:`3px solid ${C.orange}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>COST OF GOODS</div>
          <div style={{fontSize:24,fontWeight:700,color:C.orange}}>{inr(totalCost)}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>from menu cost prices</div>
        </Card>
        <Card style={{borderLeft:`3px solid ${C.accent}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>GROSS PROFIT</div>
          <div style={{fontSize:24,fontWeight:700,color:grossProfit>=0?C.accent:C.red}}>{inr(grossProfit)}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>margin: {revenue>0?Math.round(grossProfit/revenue*100):0}%</div>
        </Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <Card style={{borderLeft:`3px solid ${C.red}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>TOTAL EXPENSES</div>
          <div style={{fontSize:24,fontWeight:700,color:C.red}}>{inr(totalExpenses)}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>{data.expenses.length} expense entries</div>
        </Card>
        <Card style={{borderLeft:`3px solid ${netProfit>=0?C.green:C.red}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:4}}>NET PROFIT / LOSS</div>
          <div style={{fontSize:24,fontWeight:700,color:netProfit>=0?C.green:C.red}}>{inr(netProfit)}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>{netProfit>=0?"▲ Profitable":"▼ Running at loss"}</div>
        </Card>
      </div>
      {/* Waterfall summary */}
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:14}}>📊 P&L Breakdown</div>
        {[
          {label:"Gross Revenue",value:revenue,color:C.green,sign:"+"},
          {label:"Cost of Goods Sold",value:-totalCost,color:C.orange,sign:"-"},
          {label:"Gross Profit",value:grossProfit,color:C.accent,sign:"=",bold:true},
          {label:"Operating Expenses",value:-totalExpenses,color:C.red,sign:"-"},
          {label:"Net Profit / Loss",value:netProfit,color:netProfit>=0?C.green:C.red,sign:"=",bold:true},
        ].map((row,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}`,fontSize:13,fontWeight:row.bold?700:400}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:row.color,fontSize:11,fontWeight:700,width:14}}>{row.sign}</span>
              <span style={{color:row.bold?C.cream:C.muted}}>{row.label}</span>
            </div>
            <span style={{color:row.color,fontWeight:row.bold?700:600}}>{row.value<0?"-":""}{inr(Math.abs(row.value))}</span>
          </div>
        ))}
      </Card>
      {/* Expense breakdown */}
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:12}}>💸 Expenses by Category</div>
        {expByCategory.length===0?<div style={{color:C.muted,fontSize:12}}>No expenses recorded.</div>:expByCategory.map(([cat,amt],i)=>(
          <div key={cat} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:10,height:10,borderRadius:2,background:catColors[i%catColors.length]}}/>
                <span>{cat}</span>
              </div>
              <span style={{color:catColors[i%catColors.length],fontWeight:600}}>{inr(amt)} <span style={{color:C.muted,fontWeight:400}}>({pct(amt,totalExpenses||1)}%)</span></span>
            </div>
            <div style={{background:C.border,borderRadius:3,height:5}}>
              <div style={{background:catColors[i%catColors.length],borderRadius:3,height:5,width:`${pct(amt,expByCategory[0][1]||1)}%`,transition:"width .4s"}}/>
            </div>
          </div>
        ))}
      </Card>

      {/* ── Dish Profitability Ranking ── */}
      {(()=>{
        const dishes=getDishProfitability(data.menu,data.orders).filter(d=>d.sold>0);
        const highMargin=dishes.filter(d=>d.margin>=50);
        const lowMargin=dishes.filter(d=>d.margin<30&&d.sold>0);
        return <Card style={{marginBottom:12}}>
          <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>📊 Dish Profitability Ranking</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:12}}>Based on menu cost prices · sorted by margin %</div>
          {dishes.length===0&&<div style={{color:C.muted,fontSize:12}}>No sales data yet.</div>}
          {dishes.length>0&&<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              <div style={{background:C.green+"11",borderRadius:8,padding:"8px 12px",border:`1px solid ${C.green}33`}}>
                <div style={{fontSize:10,color:C.green,fontWeight:700,marginBottom:4}}>🟢 HIGH MARGIN (≥50%)</div>
                {highMargin.length===0?<div style={{fontSize:11,color:C.muted}}>None yet</div>:highMargin.slice(0,4).map(d=>(
                  <div key={d.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"2px 0"}}>
                    <span style={{color:C.cream}}>{d.name}</span>
                    <span style={{color:C.green,fontWeight:700}}>{d.margin}%</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.red+"11",borderRadius:8,padding:"8px 12px",border:`1px solid ${C.red}33`}}>
                <div style={{fontSize:10,color:C.red,fontWeight:700,marginBottom:4}}>🔴 LOW MARGIN (&lt;30%)</div>
                {lowMargin.length===0?<div style={{fontSize:11,color:C.muted}}>None—great!</div>:lowMargin.slice(0,4).map(d=>(
                  <div key={d.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"2px 0"}}>
                    <span style={{color:C.cream}}>{d.name}</span>
                    <span style={{color:C.red,fontWeight:700}}>{d.margin}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Dish","Category","Sold","Revenue","Cost","Profit","Margin"].map(h=>(
                      <th key={h} style={{padding:"5px 8px",textAlign:"left",color:C.muted,fontWeight:600,fontSize:10,letterSpacing:.3,whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dishes.map((d,i)=>{
                    const mc=d.margin>=50?C.green:d.margin>=30?C.accent:C.red;
                    return <tr key={d.id} style={{borderBottom:`1px solid ${C.border}22`}}>
                      <td style={{padding:"6px 8px",fontWeight:500,color:C.cream}}>{d.name}</td>
                      <td style={{padding:"6px 8px",color:C.muted}}>{d.category}</td>
                      <td style={{padding:"6px 8px",color:C.muted}}>{d.sold}</td>
                      <td style={{padding:"6px 8px",color:C.green}}>{inr(d.revenue)}</td>
                      <td style={{padding:"6px 8px",color:C.orange}}>{inr(d.cost)}</td>
                      <td style={{padding:"6px 8px",color:d.profit>=0?C.green:C.red,fontWeight:600}}>{inr(d.profit)}</td>
                      <td style={{padding:"6px 8px"}}>
                        <span style={{background:mc+"22",color:mc,borderRadius:20,padding:"2px 8px",fontWeight:700,fontSize:11}}>{d.margin}%</span>
                      </td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          </>}
        </Card>;
      })()}

      {/* ── Per-Order Profit (recent 10) ── */}
      <Card>
        <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>🧾 Per-Order Profit</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:12}}>Last 10 paid orders · revenue minus ingredient cost</div>
        {paidOrders.length===0?<div style={{color:C.muted,fontSize:12}}>No paid orders yet.</div>:<div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr style={{borderBottom:`1px solid ${C.border}`}}>
                {["Order","Customer","Revenue","Cost","Profit","Margin"].map(h=>(
                  <th key={h} style={{padding:"5px 8px",textAlign:"left",color:C.muted,fontWeight:600,fontSize:10,letterSpacing:.3}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...paidOrders].reverse().slice(0,10).map(o=>{
                const p=getOrderProfit(o,data.menu);
                const mc=p.margin>=50?C.green:p.margin>=30?C.accent:C.red;
                return <tr key={o.id} style={{borderBottom:`1px solid ${C.border}22`}}>
                  <td style={{padding:"5px 8px",color:C.muted,fontFamily:"monospace",fontSize:11}}>#{o.id.slice(-5).toUpperCase()}</td>
                  <td style={{padding:"5px 8px",color:C.cream}}>{o.customerName||"Guest"}</td>
                  <td style={{padding:"5px 8px",color:C.green}}>{inr(p.revenue)}</td>
                  <td style={{padding:"5px 8px",color:C.orange}}>{inr(p.cost)}</td>
                  <td style={{padding:"5px 8px",color:p.profit>=0?C.green:C.red,fontWeight:600}}>{inr(p.profit)}</td>
                  <td style={{padding:"5px 8px"}}>
                    <span style={{background:mc+"22",color:mc,borderRadius:20,padding:"2px 7px",fontWeight:700,fontSize:11}}>{p.margin}%</span>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>}
      </Card>
    </div>}

    {/* ── WAITERS TAB ── */}
    {aTab==="waiters"&&<div className="fade-in">
      <div style={{color:C.muted,fontSize:12,marginBottom:14}}>Order and revenue breakdown by waiter. Tracks both individual logins and picker-mode selections.</div>
      {(()=>{
        const waiterMap={};
        allOrders.forEach(o=>{
          const w=o.waiterName||o.customerName||"Unknown";
          if(!waiterMap[w])waiterMap[w]={name:w,orders:0,revenue:0,paid:0,tables:new Set()};
          waiterMap[w].orders++;
          if(o.status==="paid"){waiterMap[w].revenue+=o.total||0;waiterMap[w].paid++;}
          if(o.tableId)waiterMap[w].tables.add(o.tableId);
        });
        const waiters=Object.values(waiterMap).sort((a,b)=>b.revenue-a.revenue);
        if(!waiters.length)return <div style={{color:C.muted,fontSize:13,textAlign:"center",padding:40}}>No waiter data yet. Orders placed will be attributed to the serving waiter.</div>;
        return <div style={{display:"grid",gap:10}}>
          {waiters.map((w,i)=>(
            <Card key={w.name} style={{display:"flex",gap:14,alignItems:"center"}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:C.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:C.accent,flexShrink:0}}>{w.name[0]||"?"}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14}}>{w.name}</div>
                <div style={{color:C.muted,fontSize:11}}>{w.orders} orders · {w.tables.size} tables served</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:C.green,fontWeight:700,fontSize:16}}>{inr(w.revenue)}</div>
                <div style={{color:C.muted,fontSize:11}}>{w.paid} paid</div>
              </div>
              {i===0&&<Badge label="🏆 Top" color={C.accent}/>}
            </Card>
          ))}
        </div>;
      })()}
    </div>}
  </div>;
}


// ── PRINTER SETTINGS COMPONENT ───────────────────────────────
function PrinterSettings({printerType="thermal",sess}) {
  useTheme();
  const storageKey = printerType==="thermal" ? "rcm_printer" : "rcm_normal_printer";
  const [cfg, setCfg] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { return null; }
  });
  const defForm = printerType==="thermal"
    ? { type:'network', paper:'80', ip:'192.168.1.100', port:'9100', bridgePort:'9100', baudRate:'9600', autoprint:false, copies:1 }
    : { type:'system', printerName:'', paperSize:'A4', orientation:'portrait', margins:'normal', copies:1, autoprint:false, colorMode:'color' };
  const [form, setForm] = useState(cfg || defForm);
  const [status, setStatus] = useState('');
  const sf = k => e => setForm(f => ({...f, [k]: e.target.value}));

  const save = () => {
    if(printerType==="thermal") printerStore.cfg = form;
    localStorage.setItem(storageKey, JSON.stringify(form));
    setCfg(form);
    setStatus('✅ Saved!');
    addLog(sess?.name||"System",`Saved ${printerType} printer config`,form.type||form.printerName||"");
    setTimeout(() => setStatus(''), 2000);
  };

  const testPrint = async () => {
    if(printerType==="thermal"){
      setStatus('🖨️ Sending test...');
      const testOrder = { id:'TEST001', createdAt:Date.now(), status:'paid', tableId:null, customerName:'Test Guest', items:[{name:'Test Item',qty:1,price:100}], tax:18, discount:0, total:118 };
      const testData = { restaurant:{name:'Test Restaurant',address:'123 Test St',phone:'+91 99999 99999',gst:'TEST123'}, tables:[] };
      try { printerStore.cfg=form; await thermalPrintReceipt(testOrder,testData); setStatus('✅ Test sent!'); }
      catch(e){ setStatus('❌ '+e.message); }
    } else {
      setStatus('🖨️ Opening print dialog...');
      const w=window.open('','_blank','width=600,height=400');
      if(w){ w.document.write(`<html><head><title>Test Print</title></head><body><h2>Test Print</h2><p>Normal printer test from Restaurant CRM.</p><p>Printer: ${form.printerName||'Default'} · Paper: ${form.paperSize||'A4'}</p><script>window.print();setTimeout(()=>window.close(),1000);</script></body></html>`);w.document.close(); setStatus('✅ Print dialog opened.');}
      else { setStatus('❌ Pop-ups blocked.'); }
    }
    setTimeout(() => setStatus(''), 4000);
  };

  const disconnect = async () => { await disconnectPrinter(); setStatus('🔌 Disconnected'); setTimeout(()=>setStatus(''),2000); };

  if(printerType==="normal") return <div>
    <div style={{background:C.surface,borderRadius:8,padding:'10px 14px',fontSize:11,color:C.muted,marginBottom:14,lineHeight:1.6}}>
      ℹ️ Normal printers use your browser's built-in print dialog. All invoices, reports, and PDFs can be sent to any printer connected to this device.
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
      <Field label="DEFAULT PRINTER NAME"><input value={form.printerName||''} onChange={sf('printerName')} placeholder="e.g. HP LaserJet Pro"/></Field>
      <Field label="PAPER SIZE">
        <select value={form.paperSize||'A4'} onChange={sf('paperSize')}>
          {['A4','A5','Letter','Legal','A3'].map(s=><option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="ORIENTATION">
        <select value={form.orientation||'portrait'} onChange={sf('orientation')}>
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </Field>
      <Field label="COLOR MODE">
        <select value={form.colorMode||'color'} onChange={sf('colorMode')}>
          <option value="color">Color</option>
          <option value="bw">Black & White</option>
        </select>
      </Field>
      <Field label="COPIES">
        <select value={form.copies||1} onChange={sf('copies')}>
          {[1,2,3,4,5].map(n=><option key={n}>{n}</option>)}
        </select>
      </Field>
      <Field label="MARGINS">
        <select value={form.margins||'normal'} onChange={sf('margins')}>
          {['none','minimal','normal','wide'].map(m=><option key={m}>{m}</option>)}
        </select>
      </Field>
    </div>
    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
      <Btn onClick={save}>💾 Save</Btn>
      <Btn variant="ghost" onClick={testPrint}>🖨️ Test Print</Btn>
      {status&&<span style={{fontSize:12,color:C.muted}}>{status}</span>}
    </div>
    {cfg&&<div style={{padding:'8px 12px',background:C.green+'18',borderRadius:8,fontSize:11,color:C.green}}>
      ✅ Configured: {cfg.printerName||'Default'} · {cfg.paperSize} · {cfg.orientation}
    </div>}
  </div>;

  // ── THERMAL ──
  const typeInfo = {
    network:  { icon:'📡', title:'Network/WiFi', desc:'Printer on same WiFi. Needs the RestoCRM bridge app running.' },
    usb:      { icon:'🔌', title:'USB/Serial',   desc:'USB cable. Chrome/Edge only (Web Serial API).' },
    bluetooth:{ icon:'🦷', title:'Bluetooth',     desc:'Wireless BT printer. Chrome on Android or Chrome/Edge desktop.' },
  };
  return <div>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:14}}>
      {Object.entries(typeInfo).map(([k,v]) => (
        <button key={k} onClick={() => setForm(f => ({...f, type:k}))}
          style={{background:form.type===k?C.accent+'22':C.surface, border:`1.5px solid ${form.type===k?C.accent:C.border}`, borderRadius:9, padding:'10px 8px', cursor:'pointer', textAlign:'center', transition:'all .15s'}}>
          <div style={{fontSize:20,marginBottom:4}}>{v.icon}</div>
          <div style={{fontSize:11,fontWeight:700,color:form.type===k?C.accent:C.cream}}>{v.title}</div>
        </button>
      ))}
    </div>
    <div style={{background:C.surface,borderRadius:8,padding:'8px 12px',fontSize:11,color:C.muted,marginBottom:14,lineHeight:1.5}}>
      ℹ️ {typeInfo[form.type]?.desc}
    </div>
    <div style={{marginBottom:12}}>
      <div style={{fontSize:11,color:C.muted,fontWeight:600,marginBottom:6,letterSpacing:.3}}>PAPER WIDTH</div>
      <div style={{display:'flex',gap:8}}>
        {[['58','58mm — Small'],['80','80mm — Standard']].map(([v,l]) => (
          <button key={v} onClick={() => setForm(f => ({...f, paper:v}))}
            style={{flex:1,background:form.paper===v?C.accent+'22':C.surface,border:`1.5px solid ${form.paper===v?C.accent:C.border}`,borderRadius:8,padding:'8px 12px',cursor:'pointer',fontSize:12,fontWeight:600,color:form.paper===v?C.accent:C.cream,transition:'all .15s'}}>
            {l}
          </button>
        ))}
      </div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
      <Field label="COPIES">
        <select value={form.copies||1} onChange={sf('copies')}>
          {[1,2,3].map(n=><option key={n}>{n}</option>)}
        </select>
      </Field>
      <Field label="AUTO-PRINT ON ORDER PAID?">
        <select value={form.autoprint?"yes":"no"} onChange={e=>setForm(f=>({...f,autoprint:e.target.value==="yes"}))}>
          <option value="yes">✅ Yes — auto print</option>
          <option value="no">❌ No — manual only</option>
        </select>
      </Field>
    </div>
    {form.type==='network'&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
      <Field label="PRINTER IP"><input value={form.ip||''} onChange={sf('ip')} placeholder="192.168.1.100"/></Field>
      <Field label="PORT"><input value={form.port||'9100'} onChange={sf('port')} placeholder="9100"/></Field>
      <Field label="BRIDGE PORT"><input value={form.bridgePort||'9100'} onChange={sf('bridgePort')} placeholder="9100"/></Field>
    </div>}
    {form.type==='usb'&&<div style={{marginBottom:12}}>
      <Field label="BAUD RATE">
        <select value={form.baudRate||'9600'} onChange={sf('baudRate')}>
          {['9600','19200','38400','57600','115200'].map(b=><option key={b}>{b}</option>)}
        </select>
      </Field>
      <div style={{fontSize:11,color:C.muted,marginTop:8}}>Click Save then Test Print — browser will ask you to select the USB port.</div>
    </div>}
    {form.type==='bluetooth'&&<div style={{marginBottom:12,fontSize:11,color:C.muted}}>Click Test Print — browser will scan for Bluetooth printers to pair.</div>}
    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:4}}>
      <Btn onClick={save}>💾 Save</Btn>
      <Btn variant="ghost" onClick={testPrint}>🖨️ Test Print</Btn>
      {(printerStore.serial||printerStore.bt)&&<Btn variant="subtle" onClick={disconnect}>🔌 Disconnect</Btn>}
      {status&&<span style={{fontSize:12,color:C.muted}}>{status}</span>}
    </div>
    {cfg&&<div style={{marginTop:12,padding:'8px 12px',background:C.green+'18',borderRadius:8,fontSize:11,color:C.green}}>
      ✅ Configured: {typeInfo[cfg.type]?.title} · {cfg.paper}mm · {cfg.autoprint?"Auto-print on":"Manual"}
    </div>}
    {form.type==='network'&&<details style={{marginTop:12}}>
      <summary style={{fontSize:11,color:C.accent,cursor:'pointer',fontWeight:600}}>📋 Network bridge setup guide</summary>
      <div style={{fontSize:11,color:C.muted,marginTop:8,lineHeight:1.7,background:C.surface,borderRadius:8,padding:10}}>
        <strong style={{color:C.cream}}>Option A — Node.js:</strong> Install Node.js, run <code style={{background:C.border,padding:'1px 5px',borderRadius:4}}>npx restocrm-bridge</code><br/><br/>
        <strong style={{color:C.cream}}>Option B — QZ Tray:</strong> Download from qz.io — bridges browser to network/USB printers.<br/><br/>
        <strong style={{color:C.cream}}>Option C — Python:</strong> <code style={{background:C.border,padding:'2px 6px',borderRadius:4}}>python3 -m restocrm_bridge</code>
      </div>
    </details>}
  </div>;
}


// ── USER ACCOUNT MODAL (sub-component so hooks are valid) ────
function UserAccountModal({modal,form,setForm,sf,onSave,onDelete,sess,pwStrength,roleColor}){
  useTheme();
  const [uTab,setUTab]=useState("identity");
  const isAdd=modal==="addUser";
  const tabs=[{id:"identity",label:"👤 Identity"},{id:"security",label:"🔐 Security"},{id:"work",label:"🏢 Work Info"},{id:"access",label:"⚙️ Access"}];
  return <Modal title={isAdd?"➕ Add Account":`✏️ Edit — ${form.name||"Account"}`} onClose={()=>onSave(null)} wide>
    <div style={{display:"flex",gap:4,marginBottom:16,borderBottom:`1px solid ${C.border}`,paddingBottom:10,flexWrap:"wrap"}}>
      {tabs.map(t=><button key={t.id} onClick={()=>setUTab(t.id)} style={{padding:"5px 12px",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer",border:"none",background:uTab===t.id?C.accent+"22":"transparent",color:uTab===t.id?C.accent:C.muted}}>{t.label}</button>)}
    </div>
    {uTab==="identity"&&<div className="fade-in">
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:(roleColor[form.role||"waiter"]||C.muted)+"22",border:`2px solid ${(roleColor[form.role||"waiter"]||C.muted)}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
          {form.avatar?<img src={form.avatar} style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} />:({admin:"👑",manager:"📊",waiter:"🤵",kitchen:"👨‍🍳"}[form.role]||"👤")}
        </div>
        <div>
          <div style={{fontWeight:600,fontSize:14,color:C.cream}}>{form.name||"New Account"}</div>
          <div style={{color:C.muted,fontSize:11}}>@{form.username||"username"} · {form.role||"waiter"}</div>
        </div>
      </div>
      <Row>
        <Field label="DISPLAY NAME *" half><input value={form.name||""} onChange={sf("name")} placeholder="e.g. Chef Ravi" autoFocus /></Field>
        <Field label="ROLE *" half>
          <select value={form.role||"waiter"} onChange={sf("role")}>
            <option value="admin">👑 Admin — Full access</option>
            <option value="manager">📊 Manager — Most access</option>
            <option value="waiter">🤵 Waiter — Front of house</option>
            <option value="kitchen">👨‍🍳 Kitchen — KDS only</option>
          </select>
        </Field>
      </Row>
      <Row>
        <Field label="PHONE (optional)" half><input value={form.phone||""} onChange={sf("phone")} placeholder="+91 98765 43210" /></Field>
        <Field label="EMAIL (optional)" half><input type="email" value={form.email||""} onChange={sf("email")} placeholder="staff@restaurant.com" /></Field>
      </Row>
      <Field label="AVATAR URL (optional)"><input value={form.avatar||""} onChange={sf("avatar")} placeholder="https://... (photo URL)" /></Field>
    </div>}
    {uTab==="security"&&<div className="fade-in">
      <Row>
        <Field label="USERNAME *" half><input value={form.username||""} onChange={sf("username")} placeholder="e.g. chef_ravi" /></Field>
        <Field label={isAdd?"PASSWORD *":"NEW PASSWORD (leave blank to keep)"} half>
          <input type="text" value={form.password||""} onChange={sf("password")} placeholder={isAdd?"Set password":"Enter to change..."} />
        </Field>
      </Row>
      {form.password&&(()=>{const s=pwStrength(form.password);return <div style={{marginTop:-6,marginBottom:14,display:"flex",gap:8,alignItems:"center"}}><div style={{flex:1,height:4,background:C.border,borderRadius:3}}><div style={{width:`${(s.score/5)*100}%`,height:4,background:s.color,borderRadius:3,transition:"width .3s"}} /></div><span style={{fontSize:11,color:s.color,fontWeight:600,minWidth:70}}>{s.label}</span></div>})()}
      <Row>
        <Field label="4-DIGIT PIN (optional)" half><input type="number" maxLength={4} value={form.pin||""} onChange={sf("pin")} placeholder="e.g. 1234" /></Field>
        <Field label="SESSION TIMEOUT" half>
          <select value={form.sessionTimeout||"30"} onChange={sf("sessionTimeout")}>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes (default)</option>
            <option value="60">1 hour</option>
            <option value="480">8 hours</option>
            <option value="0">Never (not recommended)</option>
          </select>
        </Field>
      </Row>
      <div style={{background:C.surface,borderRadius:9,padding:"10px 14px",marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:12,marginBottom:8}}>Security Toggles</div>
        {[
          ["mustChangePassword","Force password change on next login","User must update password when they sign in"],
          ["twoFAEnabled","Two-factor authentication ready","Mark as 2FA enabled (manual — no email integration)"],
          ["canLoginMultiDevice","Allow multi-device login","User can be logged in on multiple devices simultaneously"],
        ].map(([key,label,desc])=>(
          <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}22`}}>
            <div>
              <div style={{fontSize:12,fontWeight:600}}>{label}</div>
              <div style={{fontSize:10,color:C.muted}}>{desc}</div>
            </div>
            <button onClick={()=>setForm(f=>({...f,[key]:!f[key]}))} style={{width:38,height:22,borderRadius:11,background:form[key]?C.accent:C.border,border:"none",cursor:"pointer",position:"relative",flexShrink:0,transition:"background .2s"}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form[key]?19:3,transition:"left .2s"}} />
            </button>
          </div>
        ))}
      </div>
      {!isAdd&&<div style={{fontSize:11,color:C.muted,padding:"8px 12px",background:C.surface,borderRadius:7}}>
        Last login: {form.lastLogin?new Date(form.lastLogin).toLocaleString("en-IN"):"Never"} ·
        Total logins: {form.loginCount||0} ·
        Failed attempts: <span style={{color:(form.failedLogins||0)>=3?C.red:C.muted}}>{form.failedLogins||0}</span>
        {(form.failedLogins||0)>=3&&<button onClick={()=>setForm(f=>({...f,failedLogins:0}))} style={{marginLeft:8,background:C.green+"22",color:C.green,border:"none",borderRadius:4,padding:"1px 6px",fontSize:10,cursor:"pointer"}}>Unlock</button>}
      </div>}
    </div>}
    {uTab==="work"&&<div className="fade-in">
      <Row>
        <Field label="DEPARTMENT" half><input value={form.department||""} onChange={sf("department")} placeholder="e.g. Kitchen, Front of House..." /></Field>
        <Field label="SHIFT PREFERENCE" half>
          <select value={form.shiftPreference||""} onChange={sf("shiftPreference")}>
            <option value="">— Select shift —</option>
            <option>Morning (6–14)</option>
            <option>Afternoon (14–22)</option>
            <option>Night (22–6)</option>
            <option>Full Day (9–18)</option>
            <option>Flexible</option>
          </select>
        </Field>
      </Row>
      <Row>
        <Field label="EMPLOYEE ID (optional)" half><input value={form.employeeId||""} onChange={sf("employeeId")} placeholder="e.g. EMP-001" /></Field>
        <Field label="JOIN DATE (optional)" half><input type="date" value={form.joinDate||""} onChange={sf("joinDate")} /></Field>
      </Row>
      <Field label="EMERGENCY CONTACT (optional)"><input value={form.emergencyContact||""} onChange={sf("emergencyContact")} placeholder="Name — Phone — Relationship" /></Field>
      <Field label="INTERNAL NOTES (optional)"><textarea value={form.notes||""} onChange={sf("notes")} rows={3} placeholder="Any staff notes, special instructions..." style={{resize:"vertical"}} /></Field>
    </div>}
    {uTab==="access"&&<div className="fade-in">
      <div style={{background:C.surface,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:12,color:C.muted,lineHeight:1.6}}>
        Permissions are automatically assigned based on the selected role. Custom overrides can be set via Settings → Tab Access.
      </div>
      <div style={{fontWeight:600,fontSize:12,marginBottom:8,color:C.muted}}>PERMISSIONS FOR THIS ROLE</div>
      {(()=>{
        const r=form.role||"waiter";
        const permsMap={admin:["All tabs","All actions","User management","Settings","Activity log","Financials","Delete records"],manager:["Most tabs","Edit menu & staff","See financials","Delete records","No user management","No settings"],waiter:["Dashboard, Tables, Orders","Reservations, Customers","Inventory view","No financials","No editing menu"],kitchen:["Kitchen display only","Order management","Inventory alerts","No financial data"]};
        return <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 14px"}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><Badge label={r} color={roleColor[r]||C.muted} /><span style={{fontSize:12,fontWeight:600}}>{r.charAt(0).toUpperCase()+r.slice(1)} access level</span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {(permsMap[r]||[]).map(p=><span key={p} style={{background:(roleColor[r]||C.muted)+"18",color:roleColor[r]||C.muted,fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20}}>{p}</span>)}
          </div>
        </div>;
      })()}
      {!isAdd&&<div style={{marginTop:12}}>
        <Field label="ACCOUNT STATUS">
          <select value={form.active?"yes":"no"} onChange={e=>setForm(f=>({...f,active:e.target.value==="yes"}))}>
            <option value="yes">✅ Active — can log in</option>
            <option value="no">❌ Disabled — access blocked</option>
          </select>
        </Field>
      </div>}
    </div>}
    <Divider/>
    <div style={{display:"flex",gap:8}}>
      <Btn full onClick={()=>onSave(form)}>💾 {isAdd?"Create Account":"Save Changes"}</Btn>
      {!isAdd&&form.role!=="admin"&&sess?.role==="admin"&&<Btn variant="danger" onClick={()=>onDelete(form)}>🗑 Delete</Btn>}
    </div>
  </Modal>;
}

// ── SETTINGS ──────────────────────────────────────────────────
function Settings({data,setData,users,setUsers,activeThemeId,onThemeChange,sess,roleTabOverrides,setRoleTabOverrides}){
  useTheme();
  const [sTab,setSTab]=useState("restaurant"); // restaurant | appearance | printer | accounts | activity | tabs
  const [modal,setModal]=useState(null);
  const [form,setForm]=useState({});
  const [rForm,setRForm]=useState({...data.restaurant,openingHours:data.restaurant.openingHours||[{day:"Mon–Fri",open:"09:00",close:"22:00"}],stations:data.restaurant.stations||DEFAULT_STATIONS,taxConfig:data.restaurant.taxConfig||{food:{cgst:9,sgst:9},beverages:{cgst:9,sgst:9},default:{cgst:9,sgst:9}},serviceChargeEnabled:data.restaurant.serviceChargeEnabled??true,serviceChargePct:data.restaurant.serviceChargePct||5});
  const [showPw,setShowPw]=useState({});
  const [accSearch,setAccSearch]=useState("");
  const [accFilter,setAccFilter]=useState("all"); // all | active | disabled | role
  const [accView,setAccView]=useState("cards"); // cards | table
  const [selectedUsers,setSelectedUsers]=useState([]); // bulk selection
  const [permModal,setPermModal]=useState(null); // role whose perms to view
  const [customTheme,setCustomTheme]=useState(THEMES.custom||{label:"My Theme",emoji:"🎨",bg:"#0f0e0d",surface:"#1a1815",card:"#231f1b",border:"#2e2820",accent:"#f5a623",cream:"#f0e6d3",muted:"#8a7d6b",red:"#e05a4e",green:"#4caf7d",blue:"#4a9eff",purple:"#9b7fe8",orange:"#f97316"});
  const [themeHover,setThemeHover]=useState(null);
  const [logs,setLogs]=useState(getLogs);
  const [logSearch,setLogSearch]=useState("");
  const [printerTab,setPrinterTab]=useState("thermal"); // thermal | normal
  const sf=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const roleColor={admin:C.accent,manager:C.blue,waiter:C.green,kitchen:C.red};

  const saveUser=async()=>{
    const isAdd=modal==="addUser";
    if(!form.username?.trim())return alert("Username required.");
    if(isAdd&&!form.password?.trim())return alert("Password required.");
    // Hash password if changed or new
    let passwordToSave=form.password;
    if(form.password&&!form.password.match(/^[0-9a-f]{64}$/)){
      try{passwordToSave=await hashPassword(form.password);}catch{passwordToSave=form.password;}
    }
    const userData={...form,password:passwordToSave};
    if(isAdd){
      const nu={id:mkId(),...userData,active:true,createdAt:now(),lastLogin:null,loginCount:0,failedLogins:0,lastPasswordChange:now()};
      setUsers(u=>[...u,nu]);
      addLog(sess?.name||"Admin","Created account",`@${form.username} (${form.role})`);
    } else {
      setUsers(u=>u.map(x=>x.id===form.id?{...x,...userData,lastPasswordChange:form.password!==x.password?now():x.lastPasswordChange}:x));
      addLog(sess?.name||"Admin","Edited account",`@${form.username}`);
    }
    setModal(null);
  };
  // Password strength checker
  const pwStrength=pw=>{
    if(!pw)return{score:0,label:"",color:C.muted};
    let s=0;
    if(pw.length>=8)s++;if(pw.length>=12)s++;
    if(/[A-Z]/.test(pw))s++;if(/[0-9]/.test(pw))s++;if(/[^A-Za-z0-9]/.test(pw))s++;
    const labels=["Very Weak","Weak","Fair","Good","Strong","Very Strong"];
    const colors=[C.red,C.red,C.orange,C.accent,C.green,C.green];
    return{score:s,label:labels[s]||"Strong",color:colors[s]||C.green};
  };
  // Bulk actions
  const bulkDisable=()=>{setUsers(u=>u.map(x=>selectedUsers.includes(x.id)?{...x,active:false}:x));setSelectedUsers([]);addLog(sess?.name||"Admin","Bulk disabled accounts",selectedUsers.length+" accounts");};
  const bulkEnable=()=>{setUsers(u=>u.map(x=>selectedUsers.includes(x.id)?{...x,active:true}:x));setSelectedUsers([]);addLog(sess?.name||"Admin","Bulk enabled accounts",selectedUsers.length+" accounts");};
  const bulkDelete=()=>{if(!window.confirm(`Delete ${selectedUsers.length} account(s)?`))return;setUsers(u=>u.filter(x=>!selectedUsers.includes(x.id)||x.role==="admin"));setSelectedUsers([]);addLog(sess?.name||"Admin","Bulk deleted accounts",selectedUsers.length+" accounts");};
  // Reset failed logins
  const resetFailedLogins=(uid)=>setUsers(u=>u.map(x=>x.id===uid?{...x,failedLogins:0}:x));
  // Force password reset flag
  const forcePasswordReset=(uid)=>{setUsers(u=>u.map(x=>x.id===uid?{...x,mustChangePassword:true}:x));addLog(sess?.name||"Admin","Forced password reset","User "+uid);};

  const saveRestaurant=()=>{
    setData(d=>({...d,restaurant:{...rForm}}));
    addLog(sess?.name||"Admin","Updated restaurant info",rForm.name);
  };

  const saveCustomTheme=()=>{
    const t={...customTheme,id:"custom",label:customTheme.label||"Custom",emoji:"🎨"};
    THEMES.custom=t;
    try{localStorage.setItem("rcm_custom_theme",JSON.stringify(t));}catch{}
    onThemeChange("custom");
    addLog(sess?.name||"Admin","Saved custom theme",t.label);
  };

  const addOpenHour=()=>setRForm(f=>({...f,openingHours:[...(f.openingHours||[]),{day:"",open:"09:00",close:"22:00"}]}));
  const removeOpenHour=i=>setRForm(f=>({...f,openingHours:f.openingHours.filter((_,j)=>j!==i)}));
  const updateOpenHour=(i,k,v)=>setRForm(f=>({...f,openingHours:f.openingHours.map((h,j)=>j===i?{...h,[k]:v}:h)}));

  const handleLogo=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>setRForm(f=>({...f,logo:ev.target.result}));
    reader.readAsDataURL(file);
  };

  const filteredLogs=logs.filter(l=>!logSearch||l.actor.toLowerCase().includes(logSearch.toLowerCase())||l.action.toLowerCase().includes(logSearch.toLowerCase())||l.detail.toLowerCase().includes(logSearch.toLowerCase()));

  // Tab pills for settings sub-nav
  const sTabPill=(id,label,icon)=>(
    <button onClick={()=>setSTab(id)} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 13px",borderRadius:8,fontSize:12,fontWeight:sTab===id?600:400,background:sTab===id?C.accent+"22":"transparent",color:sTab===id?C.accent:C.muted,border:`1px solid ${sTab===id?C.accent+"55":C.border}`,transition:"all .15s",whiteSpace:"nowrap"}}>
      <span>{icon}</span>{label}
    </button>
  );

  return <div className="fade-in">
    <div className="playfair" style={{fontSize:24,marginBottom:14}}>Settings</div>

    {/* Sub-nav */}
    <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
      {sTabPill("restaurant","Restaurant","🏠")}
      {sTabPill("appearance","Appearance","🎨")}
      {sTabPill("printer","Printers","🖨️")}
      {sTabPill("accounts","Accounts","👤")}
      {sTabPill("waitermode","Waiter Mode","🤵")}
      {sTabPill("tabs","Tab Access","📑")}
      {sTabPill("stations","Stations & Tax","🏪")}
      {sTabPill("activity","Activity Log","📋")}
    </div>

    {/* ══ RESTAURANT INFO ══ */}
    {sTab==="restaurant"&&<div className="fade-in">
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,marginBottom:14,fontSize:13}}>🏠 Basic Info</div>
        {/* Logo */}
        <div style={{marginBottom:14,display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:70,height:70,borderRadius:10,border:`2px dashed ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:C.bg,flexShrink:0}}>
            {rForm.logo?<img src={rForm.logo} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:28}}>🏪</span>}
          </div>
          <div>
            <label style={{display:"inline-block",padding:"6px 14px",background:C.accent+"22",color:C.accent,borderRadius:7,fontSize:12,cursor:"pointer",border:`1px solid ${C.accent}44`}}>
              📁 Upload Logo<input type="file" accept="image/*" style={{display:"none"}} onChange={handleLogo}/>
            </label>
            {rForm.logo&&<button onClick={()=>setRForm(f=>({...f,logo:""}))} style={{marginLeft:8,background:"none",color:C.red,fontSize:12,border:"none",cursor:"pointer"}}>✕ Remove</button>}
            <div style={{color:C.muted,fontSize:10,marginTop:4}}>PNG/JPG · shown on invoices & reports</div>
          </div>
        </div>
        <Row>
          <Field label="RESTAURANT NAME" half><input value={rForm.name||""} onChange={e=>setRForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Spice Garden"/></Field>
          <Field label="CUISINE TYPE" half><input value={rForm.cuisine||""} onChange={e=>setRForm(f=>({...f,cuisine:e.target.value}))} placeholder="e.g. Indian, Chinese"/></Field>
        </Row>
        <Field label="ADDRESS"><input value={rForm.address||""} onChange={e=>setRForm(f=>({...f,address:e.target.value}))} placeholder="Full address"/></Field>
        <Row>
          <Field label="CITY" half><input value={rForm.city||""} onChange={e=>setRForm(f=>({...f,city:e.target.value}))} placeholder="Mumbai"/></Field>
          <Field label="PINCODE" half><input value={rForm.pincode||""} onChange={e=>setRForm(f=>({...f,pincode:e.target.value}))} placeholder="400001"/></Field>
        </Row>
        <Row>
          <Field label="PHONE" half><input value={rForm.phone||""} onChange={e=>setRForm(f=>({...f,phone:e.target.value}))} placeholder="+91 98765 43210"/></Field>
          <Field label="ALTERNATE PHONE" half><input value={rForm.phone2||""} onChange={e=>setRForm(f=>({...f,phone2:e.target.value}))} placeholder="Optional"/></Field>
        </Row>
        <Row>
          <Field label="EMAIL" half><input value={rForm.email||""} onChange={e=>setRForm(f=>({...f,email:e.target.value}))} placeholder="contact@restaurant.com"/></Field>
          <Field label="WEBSITE" half><input value={rForm.website||""} onChange={e=>setRForm(f=>({...f,website:e.target.value}))} placeholder="www.restaurant.com"/></Field>
        </Row>
        <Row>
          <Field label="GST NUMBER" half><input value={rForm.gst||""} onChange={e=>setRForm(f=>({...f,gst:e.target.value}))} placeholder="22AAAAA0000A1Z5"/></Field>
          <Field label="FSSAI LICENSE" half><input value={rForm.fssai||""} onChange={e=>setRForm(f=>({...f,fssai:e.target.value}))} placeholder="FSSAI number"/></Field>
        </Row>
        <Row>
          <Field label="PAN NUMBER" half><input value={rForm.pan||""} onChange={e=>setRForm(f=>({...f,pan:e.target.value}))} placeholder="ABCDE1234F"/></Field>
          <Field label="TABLE CAPACITY" half><input type="number" value={rForm.tableCapacity||""} onChange={e=>setRForm(f=>({...f,tableCapacity:+e.target.value}))} placeholder="e.g. 80"/></Field>
        </Row>
        <Row>
          <Field label="DAILY REVENUE GOAL (₹)" half><input type="number" value={rForm.dailyGoal||""} onChange={e=>setRForm(f=>({...f,dailyGoal:+e.target.value}))} placeholder="50000"/></Field>
          <Field label="CURRENCY" half>
            <select value={rForm.currency||"INR"} onChange={e=>setRForm(f=>({...f,currency:e.target.value}))}>
              {["INR","USD","GBP","EUR","AED","SGD"].map(c=><option key={c}>{c}</option>)}
            </select>
          </Field>
        </Row>
        <Field label="INVOICE FOOTER MESSAGE"><input value={rForm.invoiceFooter||""} onChange={e=>setRForm(f=>({...f,invoiceFooter:e.target.value}))} placeholder="Thank you for dining with us!"/></Field>
        <Row>
          <Field label="SERVICE CHARGE %" half><input type="number" value={rForm.serviceCharge||""} onChange={e=>setRForm(f=>({...f,serviceCharge:+e.target.value}))} placeholder="e.g. 5"/></Field>
          <Field label="DEFAULT TAX %" half><input type="number" value={rForm.defaultTax||""} onChange={e=>setRForm(f=>({...f,defaultTax:+e.target.value}))} placeholder="18"/></Field>
        </Row>
        <Field label="SOCIAL MEDIA / UPI HANDLE"><input value={rForm.social||""} onChange={e=>setRForm(f=>({...f,social:e.target.value}))} placeholder="@restaurant on Instagram · UPI: restaurant@upi"/></Field>
      </Card>

      <Card style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontWeight:600,fontSize:13}}>🕐 Opening Hours</div>
          <Btn size="sm" variant="ghost" onClick={addOpenHour}>+ Add Slot</Btn>
        </div>
        {(rForm.openingHours||[]).map((h,i)=>(
          <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
            <input value={h.day} onChange={e=>updateOpenHour(i,"day",e.target.value)} placeholder="Mon–Fri" style={{flex:2,fontSize:12}}/>
            <input type="time" value={h.open} onChange={e=>updateOpenHour(i,"open",e.target.value)} style={{flex:1,fontSize:12}}/>
            <span style={{color:C.muted,fontSize:12}}>–</span>
            <input type="time" value={h.close} onChange={e=>updateOpenHour(i,"close",e.target.value)} style={{flex:1,fontSize:12}}/>
            <button onClick={()=>removeOpenHour(i)} style={{background:"none",color:C.red,fontSize:14,border:"none",cursor:"pointer",flexShrink:0}}>✕</button>
          </div>
        ))}
        {(!rForm.openingHours||rForm.openingHours.length===0)&&<div style={{color:C.muted,fontSize:12}}>No hours added — click "+ Add Slot".</div>}
      </Card>

      <Btn onClick={saveRestaurant}>💾 Save Restaurant Info</Btn>
    </div>}

    {/* ══ APPEARANCE ══ */}
    {sTab==="appearance"&&<div className="fade-in">
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,marginBottom:14,fontSize:13}}>🎨 Choose Theme</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:8}}>
          {Object.values(THEMES).filter(t=>t.id!=="custom").map(t=>{
            const active=activeThemeId===t.id;
            const hovered=themeHover===t.id;
            return <button key={t.id} onClick={()=>{onThemeChange(t.id);addLog(sess?.name||"?","Changed theme",t.label);}}
              onMouseEnter={()=>setThemeHover(t.id)} onMouseLeave={()=>setThemeHover(null)}
              style={{background:t.card,border:`2px solid ${active?t.accent:hovered?t.accent+"88":t.border}`,borderRadius:12,padding:"10px 8px",textAlign:"center",transition:"all .18s",transform:hovered&&!active?"translateY(-2px)":"none",boxShadow:hovered?"0 4px 16px #0005":"none"}}>
              <div style={{fontSize:20,marginBottom:5}}>{t.emoji}</div>
              <div style={{display:"flex",gap:3,justifyContent:"center",marginBottom:5}}>
                {[t.accent,t.green,t.blue,t.red].map((col,i)=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:col}}/>)}
              </div>
              <div style={{fontSize:10,fontWeight:600,color:t.cream,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.label}</div>
              {active&&<div style={{fontSize:9,color:t.accent,fontWeight:700,marginTop:3,letterSpacing:.5}}>✓ ACTIVE</div>}
            </button>;
          })}
        </div>
      </Card>

      <Card>
        <div style={{fontWeight:600,marginBottom:14,fontSize:13}}>🎨 Custom Theme Builder</div>
        <Row>
          <Field label="THEME NAME" half><input value={customTheme.label||""} onChange={e=>setCustomTheme(t=>({...t,label:e.target.value}))} placeholder="My Theme"/></Field>
          <Field label="ACCENT COLOR" half><div style={{display:"flex",gap:8,alignItems:"center"}}><input type="color" value={customTheme.accent||"#f5a623"} onChange={e=>setCustomTheme(t=>({...t,accent:e.target.value}))} style={{width:44,height:36,padding:2,cursor:"pointer"}}/><input value={customTheme.accent||""} onChange={e=>setCustomTheme(t=>({...t,accent:e.target.value}))} placeholder="#f5a623" style={{flex:1}}/></div></Field>
        </Row>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
          {[["bg","Background","#0f0e0d"],["surface","Surface","#1a1815"],["card","Card","#231f1b"],["border","Border","#2e2820"],["cream","Text","#f0e6d3"],["muted","Muted text","#8a7d6b"]].map(([k,label,ph])=>(
            <div key={k}>
              <div style={{color:C.muted,fontSize:10,marginBottom:4,letterSpacing:.3}}>{label.toUpperCase()}</div>
              <div style={{display:"flex",gap:5,alignItems:"center"}}>
                <input type="color" value={customTheme[k]||ph} onChange={e=>setCustomTheme(t=>({...t,[k]:e.target.value}))} style={{width:32,height:32,padding:1,cursor:"pointer",borderRadius:4,border:`1px solid ${C.border}`}}/>
                <input value={customTheme[k]||""} onChange={e=>setCustomTheme(t=>({...t,[k]:e.target.value}))} placeholder={ph} style={{flex:1,fontSize:11}}/>
              </div>
            </div>
          ))}
        </div>
        {/* Live preview */}
        <div style={{background:customTheme.card,border:`2px solid ${customTheme.accent}`,borderRadius:10,padding:12,marginBottom:12}}>
          <div style={{color:customTheme.accent,fontWeight:700,fontSize:14,marginBottom:4}}>Preview · {customTheme.label||"Custom"}</div>
          <div style={{display:"flex",gap:6,marginBottom:8}}>
            {[customTheme.accent,customTheme.green||"#4caf7d",customTheme.blue||"#4a9eff",customTheme.red||"#e05a4e"].map((c,i)=>(
              <div key={i} style={{flex:1,background:c+"33",border:`1px solid ${c}55`,borderRadius:6,padding:"6px 0",textAlign:"center",fontSize:11,color:c,fontWeight:600}}>{["Accent","Success","Info","Danger"][i]}</div>
            ))}
          </div>
          <div style={{color:customTheme.cream,fontSize:12}}>Text in custom theme · <span style={{color:customTheme.muted}}>Muted text here</span></div>
        </div>
        <Btn onClick={saveCustomTheme}>💾 Save & Apply Custom Theme</Btn>
        {activeThemeId==="custom"&&<span style={{marginLeft:10,color:C.green,fontSize:12}}>✓ Active</span>}
      </Card>
    </div>}

    {/* ══ PRINTERS ══ */}
    {sTab==="printer"&&<div className="fade-in">
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {[["thermal","🧾 Thermal Printer"],["normal","🖨️ Normal Printer"]].map(([id,label])=>(
          <button key={id} onClick={()=>setPrinterTab(id)} style={{padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:printerTab===id?600:400,background:printerTab===id?C.accent+"22":"transparent",color:printerTab===id?C.accent:C.muted,border:`1px solid ${printerTab===id?C.accent+"55":C.border}`}}>
            {label}
          </button>
        ))}
      </div>
      <PrinterSettings printerType={printerTab} sess={sess}/>
    </div>}

    {/* ══ ACCOUNTS ══ */}
    {sTab==="accounts"&&<div className="fade-in">

      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontWeight:700,fontSize:15,color:C.cream}}>👤 User Accounts</div>
          <div style={{color:C.muted,fontSize:11,marginTop:2}}>{users.length} accounts · {users.filter(u=>u.active).length} active · {users.filter(u=>!u.active).length} disabled</div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {/* View toggle */}
          <div style={{display:"flex",border:`1px solid ${C.border}`,borderRadius:7,overflow:"hidden"}}>
            {[["cards","⊞"],["table","☰"]].map(([v,l])=>(
              <button key={v} onClick={()=>setAccView(v)} style={{padding:"5px 10px",fontSize:12,background:accView===v?C.accent:C.surface,color:accView===v?C.bg:C.muted,border:"none",cursor:"pointer"}}>{l}</button>
            ))}
          </div>
          <Btn size="sm" onClick={()=>{setForm({username:"",password:"",name:"",role:"waiter",phone:"",email:"",pin:"",notes:"",avatar:"",department:"",shiftPreference:"",emergencyContact:""});setModal("addUser");}}>+ Add Account</Btn>
        </div>
      </div>

      {/* Stats row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:14}}>
        {[
          {label:"Total Accounts",value:users.length,color:C.accent,icon:"👥"},
          {label:"Admins & Managers",value:users.filter(u=>u.role==="admin"||u.role==="manager").length,color:C.blue,icon:"👑"},
          {label:"Kitchen Staff",value:users.filter(u=>u.role==="kitchen").length,color:C.red,icon:"👨‍🍳"},
          {label:"Active Sessions",value:users.filter(u=>u.active&&u.lastLogin&&(Date.now()-new Date(u.lastLogin))<24*3600*1000).length,color:C.green,icon:"🟢"},
        ].map(s=>(
          <div key={s.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 12px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{color:C.muted,fontSize:10,marginBottom:4}}>{s.label.toUpperCase()}</div>
                <div style={{fontSize:20,fontWeight:700,color:s.color}}>{s.value}</div>
              </div>
              <span style={{fontSize:18,opacity:.6}}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180,position:"relative"}}>
          <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:13,pointerEvents:"none"}}>🔍</span>
          <input value={accSearch} onChange={e=>setAccSearch(e.target.value)} placeholder="Search by name, username, email, role..." style={{paddingLeft:32}} />
          {accSearch&&<button onClick={()=>setAccSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",color:C.muted,fontSize:12,border:"none",cursor:"pointer"}}>✕</button>}
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          {["all","active","disabled","admin","manager","waiter","kitchen"].map(f=>(
            <button key={f} onClick={()=>setAccFilter(f)} style={{padding:"5px 10px",borderRadius:6,fontSize:11,background:accFilter===f?C.accent+"22":"transparent",color:accFilter===f?C.accent:C.muted,border:`1px solid ${accFilter===f?C.accent+"55":C.border}`,cursor:"pointer"}}>
              {f==="all"?"All":f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk actions bar */}
      {selectedUsers.length>0&&(
        <div style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"8px 14px",marginBottom:10,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{color:C.accent,fontWeight:600,fontSize:12}}>{selectedUsers.length} selected</span>
          <Btn size="sm" variant="success" onClick={bulkEnable}>✅ Enable All</Btn>
          <Btn size="sm" variant="subtle" onClick={bulkDisable}>⏸ Disable All</Btn>
          <Btn size="sm" variant="danger" onClick={bulkDelete}>🗑 Delete Selected</Btn>
          <button onClick={()=>setSelectedUsers([])} style={{background:"none",color:C.muted,border:"none",fontSize:11,cursor:"pointer",marginLeft:"auto"}}>Clear selection</button>
        </div>
      )}

      {/* Role permissions matrix — collapsible */}
      <details style={{marginBottom:14}}>
        <summary style={{cursor:"pointer",fontSize:12,fontWeight:600,color:C.accent,padding:"8px 12px",background:C.surface,borderRadius:8,border:`1px solid ${C.border}`,userSelect:"none",listStyle:"none"}}>
          📊 Role Permissions Matrix (click to expand)
        </summary>
        <div style={{marginTop:8,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
          <table>
            <thead>
              <tr>
                <th style={{textAlign:"left"}}>Permission</th>
                {["admin","manager","waiter","kitchen"].map(r=>(
                  <th key={r} style={{textAlign:"center"}}>
                    <Badge label={r} color={roleColor[r]}/>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["View Dashboard","✅","✅","✅","❌"],
                ["Manage Tables","✅","✅","✅","❌"],
                ["Create Orders","✅","✅","✅","❌"],
                ["Edit Menu","✅","✅","❌","❌"],
                ["View Analytics","✅","✅","❌","❌"],
                ["See Financials","✅","✅","❌","❌"],
                ["Manage Staff","✅","✅","❌","❌"],
                ["Manage Users","✅","❌","❌","❌"],
                ["Delete Records","✅","✅","❌","❌"],
                ["Settings Access","✅","❌","❌","❌"],
                ["Kitchen Display","✅","❌","❌","✅"],
                ["Inventory Mgmt","✅","✅","✅","❌"],
              ].map(([perm,...vals])=>(
                <tr key={perm}>
                  <td style={{fontSize:12,color:C.muted}}>{perm}</td>
                  {vals.map((v,i)=>(
                    <td key={i} style={{textAlign:"center",fontSize:14}}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {/* ── CARD VIEW ── */}
      {accView==="cards"&&(()=>{
        const filtered=users.filter(u=>{
          const matchS=!accSearch||u.name?.toLowerCase().includes(accSearch.toLowerCase())||u.username?.toLowerCase().includes(accSearch.toLowerCase())||u.email?.toLowerCase().includes(accSearch.toLowerCase())||u.role?.toLowerCase().includes(accSearch.toLowerCase());
          const matchF=accFilter==="all"||(accFilter==="active"&&u.active)||(accFilter==="disabled"&&!u.active)||u.role===accFilter;
          return matchS&&matchF;
        });
        return <div style={{display:"grid",gap:10}}>
          {filtered.length===0&&<div style={{textAlign:"center",padding:30,color:C.muted,fontSize:13}}>No accounts match your filter.</div>}
          {filtered.map(u=>{
            const isSel=selectedUsers.includes(u.id);
            const lastLoginAgo=u.lastLogin?Math.round((Date.now()-new Date(u.lastLogin))/60000):null;
            const lastLoginStr=lastLoginAgo===null?"Never":lastLoginAgo<1?"Just now":lastLoginAgo<60?`${lastLoginAgo}m ago`:lastLoginAgo<1440?`${Math.floor(lastLoginAgo/60)}h ago`:`${Math.floor(lastLoginAgo/1440)}d ago`;
            const isLocked=u.failedLogins>=5;
            const roleEmoji={admin:"👑",manager:"📊",waiter:"🤵",kitchen:"👨‍🍳"}[u.role]||"👤";
            return <div key={u.id} style={{background:C.card,border:`1.5px solid ${isSel?C.accent:isLocked?C.red:C.border}`,borderRadius:12,padding:"14px 16px",transition:"border-color .15s",position:"relative"}}>
              {/* Select checkbox */}
              {sess?.role==="admin"&&<div style={{position:"absolute",top:12,left:12}} onClick={e=>e.stopPropagation()}>
                <input type="checkbox" checked={isSel} onChange={()=>setSelectedUsers(s=>isSel?s.filter(id=>id!==u.id):[...s,u.id])} style={{cursor:"pointer"}} />
              </div>}
              <div style={{marginLeft:sess?.role==="admin"?24:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
                  {/* Left — identity */}
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:roleColor[u.role]+"22",border:`2px solid ${roleColor[u.role]}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                      {u.avatar?<img src={u.avatar} style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}/>:roleEmoji}
                    </div>
                    <div>
                      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                        <span style={{fontWeight:700,fontSize:14,color:C.cream}}>{u.name}</span>
                        <Badge label={u.role} color={roleColor[u.role]}/>
                        <Badge label={u.active?"active":"disabled"} color={u.active?C.green:C.red}/>
                        {isLocked&&<Badge label="🔒 locked" color={C.red}/>}
                        {u.mustChangePassword&&<Badge label="⚠️ pw reset" color={C.orange}/>}
                      </div>
                      <div style={{color:C.muted,fontSize:11}}>@{u.username}{u.email?` · ${u.email}`:""}</div>
                      {u.phone&&<div style={{color:C.muted,fontSize:11}}>📱 {u.phone}</div>}
                      {u.department&&<div style={{color:C.blue,fontSize:11}}>🏢 {u.department}</div>}
                    </div>
                  </div>

                  {/* Right — stats + actions */}
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                    {/* Actions */}
                    <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                      <Btn size="sm" variant="ghost" onClick={()=>{setForm({...u,_origPassword:u.password});setModal("editUser");}}>✏️ Edit</Btn>
                      {u.active&&u.id!==sess?.id&&<button onClick={()=>setUsers(us=>us.map(x=>x.id===u.id?{...x,active:false}:x))} style={{background:C.orange+"22",color:C.orange,border:`1px solid ${C.orange}44`,borderRadius:6,padding:"3px 8px",fontSize:11,cursor:"pointer"}}>Disable</button>}
                      {!u.active&&<button onClick={()=>setUsers(us=>us.map(x=>x.id===u.id?{...x,active:true}:x))} style={{background:C.green+"22",color:C.green,border:`1px solid ${C.green}44`,borderRadius:6,padding:"3px 8px",fontSize:11,cursor:"pointer"}}>Enable</button>}
                      {sess?.role==="admin"&&<button onClick={()=>{setForm({...u,_origPassword:u.password,password:""});setModal("resetPw");}} style={{background:C.purple+"22",color:C.purple,border:`1px solid ${C.purple}44`,borderRadius:6,padding:"3px 8px",fontSize:11,cursor:"pointer"}}>🔑 Reset Pw</button>}
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginTop:12,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                  {[
                    {label:"Last Login",value:lastLoginStr,color:lastLoginAgo===null?C.muted:lastLoginAgo<60?C.green:C.muted},
                    {label:"Login Count",value:u.loginCount||0,color:C.accent},
                    {label:"Failed Logins",value:u.failedLogins||0,color:(u.failedLogins||0)>=3?C.red:(u.failedLogins||0)>=1?C.orange:C.muted},
                    {label:"Created",value:u.createdAt?new Date(u.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"2-digit"}):"—",color:C.muted},
                  ].map(s=>(
                    <div key={s.label} style={{background:C.surface,borderRadius:7,padding:"6px 8px",textAlign:"center"}}>
                      <div style={{fontSize:10,color:C.muted,marginBottom:2}}>{s.label}</div>
                      <div style={{fontSize:12,fontWeight:600,color:s.color}}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Password + extra info row */}
                <div style={{display:"flex",gap:10,alignItems:"center",marginTop:8,flexWrap:"wrap"}}>
                  <div style={{display:"flex",gap:6,alignItems:"center",fontSize:11,color:C.muted}}>
                    <span>Password:</span>
                    <span style={{fontFamily:"monospace",letterSpacing:1}}>{showPw[u.id]?u.password:"•".repeat(Math.min(u.password?.length||8,12))}</span>
                    <button onClick={()=>setShowPw(s=>({...s,[u.id]:!s[u.id]}))} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",padding:"0 4px"}}>{showPw[u.id]?"🙈":"👁"}</button>
                  </div>
                  {u.pin&&<div style={{fontSize:11,color:C.muted}}>PIN: {showPw[u.id]?u.pin:"••••"}</div>}
                  {u.shiftPreference&&<div style={{fontSize:11,color:C.blue}}>⏰ {u.shiftPreference}</div>}
                  {(u.failedLogins||0)>=3&&<button onClick={()=>resetFailedLogins(u.id)} style={{background:C.red+"18",color:C.red,border:`1px solid ${C.red}44`,borderRadius:5,padding:"2px 7px",fontSize:10,cursor:"pointer"}}>🔓 Unlock</button>}
                  {u.notes&&<div style={{fontSize:11,color:C.muted,marginLeft:"auto",fontStyle:"italic"}}>📝 {u.notes}</div>}
                </div>
              </div>
            </div>;
          })}
        </div>;
      })()}

      {/* ── TABLE VIEW ── */}
      {accView==="table"&&<Card style={{padding:0,overflow:"hidden"}}>
        <table>
          <thead>
            <tr>
              {sess?.role==="admin"&&<th style={{width:30}}><input type="checkbox" onChange={e=>setSelectedUsers(e.target.checked?users.map(u=>u.id):[])} /></th>}
              <th>Name</th><th>Username</th><th>Role</th><th>Status</th><th>Last Login</th><th>Logins</th><th>Failed</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(u=>{
              const matchS=!accSearch||u.name?.toLowerCase().includes(accSearch.toLowerCase())||u.username?.toLowerCase().includes(accSearch.toLowerCase());
              const matchF=accFilter==="all"||(accFilter==="active"&&u.active)||(accFilter==="disabled"&&!u.active)||u.role===accFilter;
              return matchS&&matchF;
            }).map(u=>{
              const isSel=selectedUsers.includes(u.id);
              const lastLoginAgo=u.lastLogin?Math.round((Date.now()-new Date(u.lastLogin))/60000):null;
              const lastLoginStr=lastLoginAgo===null?"Never":lastLoginAgo<60?`${lastLoginAgo}m ago`:lastLoginAgo<1440?`${Math.floor(lastLoginAgo/60)}h ago`:`${Math.floor(lastLoginAgo/1440)}d ago`;
              return <tr key={u.id} style={{background:isSel?C.accent+"08":"transparent"}}>
                {sess?.role==="admin"&&<td><input type="checkbox" checked={isSel} onChange={()=>setSelectedUsers(s=>isSel?s.filter(id=>id!==u.id):[...s,u.id])} /></td>}
                <td>
                  <div style={{fontWeight:600,fontSize:12}}>{u.name}</div>
                  {u.email&&<div style={{fontSize:10,color:C.muted}}>{u.email}</div>}
                </td>
                <td><span style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>@{u.username}</span></td>
                <td><Badge label={u.role} color={roleColor[u.role]}/></td>
                <td><Badge label={u.active?"active":"disabled"} color={u.active?C.green:C.red}/></td>
                <td style={{fontSize:11,color:C.muted}}>{lastLoginStr}</td>
                <td style={{textAlign:"center",fontSize:12,color:C.accent}}>{u.loginCount||0}</td>
                <td style={{textAlign:"center",fontSize:12,color:(u.failedLogins||0)>=3?C.red:C.muted}}>{u.failedLogins||0}</td>
                <td>
                  <div style={{display:"flex",gap:4}}>
                    <Btn size="sm" variant="ghost" onClick={()=>{setForm({...u,_origPassword:u.password});setModal("editUser");}}>✏️</Btn>
                    <button onClick={()=>setUsers(us=>us.map(x=>x.id===u.id?{...x,active:!x.active}:x))} style={{background:(u.active?C.orange:C.green)+"22",color:u.active?C.orange:C.green,border:`1px solid ${(u.active?C.orange:C.green)}44`,borderRadius:5,padding:"2px 7px",fontSize:10,cursor:"pointer"}}>{u.active?"Disable":"Enable"}</button>
                  </div>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </Card>}

      {/* ── Account Security Overview ── */}
      <div style={{marginTop:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <Card>
          <div style={{fontWeight:600,fontSize:12,marginBottom:10,color:C.muted}}>🔐 SECURITY OVERVIEW</div>
          {[
            {label:"Accounts with hashed passwords",value:users.filter(u=>u.password?.match(/^[0-9a-f]{64}$/)).length+"/"+users.length,color:C.green},
            {label:"Accounts with PIN set",value:users.filter(u=>u.pin).length,color:C.blue},
            {label:"Accounts with 2FA ready",value:users.filter(u=>u.twoFAEnabled).length,color:C.purple},
            {label:"Locked accounts (5+ failed)",value:users.filter(u=>(u.failedLogins||0)>=5).length,color:C.red},
            {label:"Force-reset password",value:users.filter(u=>u.mustChangePassword).length,color:C.orange},
          ].map(r=>(
            <div key={r.label} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}22`,fontSize:12}}>
              <span style={{color:C.muted}}>{r.label}</span>
              <span style={{fontWeight:600,color:r.color}}>{r.value}</span>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{fontWeight:600,fontSize:12,marginBottom:10,color:C.muted}}>⚡ QUICK ACTIONS</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            <button onClick={()=>setAccSearch("")||setAccFilter("disabled")} style={{background:C.orange+"18",color:C.orange,border:`1px solid ${C.orange}33`,borderRadius:7,padding:"7px 12px",fontSize:11,fontWeight:600,cursor:"pointer",textAlign:"left"}}>
              ⏸ View disabled accounts ({users.filter(u=>!u.active).length})
            </button>
            <button onClick={()=>{users.filter(u=>(u.failedLogins||0)>=3).forEach(u=>resetFailedLogins(u.id));}} style={{background:C.red+"18",color:C.red,border:`1px solid ${C.red}33`,borderRadius:7,padding:"7px 12px",fontSize:11,fontWeight:600,cursor:"pointer",textAlign:"left"}}>
              🔓 Unlock all locked accounts ({users.filter(u=>(u.failedLogins||0)>=5).length} locked)
            </button>
            <button onClick={()=>{const csv=users.map(u=>`${u.name},${u.username},${u.role},${u.email||""},${u.phone||""},${u.active?"active":"disabled"},${u.loginCount||0},${u.createdAt?.split("T")[0]||""}`).join("\n");const blob=new Blob(["Name,Username,Role,Email,Phone,Status,LoginCount,Created\n"+csv],{type:"text/csv"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="accounts_export.csv";a.click();}} style={{background:C.green+"18",color:C.green,border:`1px solid ${C.green}33`,borderRadius:7,padding:"7px 12px",fontSize:11,fontWeight:600,cursor:"pointer",textAlign:"left"}}>
              📊 Export accounts to CSV
            </button>
            <button onClick={()=>setForm({username:"",password:"",name:"",role:"kitchen",phone:"",email:"",pin:"",notes:"",department:"Kitchen",shiftPreference:"Morning (9–17)"})||setModal("addUser")} style={{background:C.red+"18",color:C.red,border:`1px solid ${C.red}33`,borderRadius:7,padding:"7px 12px",fontSize:11,fontWeight:600,cursor:"pointer",textAlign:"left"}}>
              👨‍🍳 Quick-add Kitchen account
            </button>
          </div>
        </Card>
      </div>
    </div>}

    {/* ══ TAB ACCESS CONTROL ══ */}
    {sTab==="tabs"&&<div className="fade-in">
      <div style={{color:C.muted,fontSize:12,marginBottom:14}}>Control which tabs each role can access. Changes take effect on next login.</div>
      {["manager","waiter","kitchen"].map(role=>{
        const defaults={manager:["dashboard","tables","orders","menu","reservations","staff","customers","expenses","deliveries","analytics","wastage"],waiter:["dashboard","tables","orders","reservations","customers"],kitchen:["kitchen"]};
        const current=roleTabOverrides?.[role]||PERMS[role]?.tabs||defaults[role]||[];
        return <Card key={role} style={{marginBottom:12}}>
          <div style={{fontWeight:600,fontSize:13,marginBottom:10,display:"flex",gap:8,alignItems:"center"}}>
            <Badge label={role} color={roleColor[role]}/> Tab Access
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["dashboard","tables","orders","menu","reservations","staff","customers","expenses","deliveries","wastage","analytics"].map(tabId=>{
              const on=current.includes(tabId);
              return <button key={tabId} onClick={()=>{
                const next=on?current.filter(x=>x!==tabId):[...current,tabId];
                setRoleTabOverrides(prev=>({...prev,[role]:next}));
                addLog(sess?.name||"Admin",`${on?"Removed":"Added"} tab for ${role}`,tabId);
              }} style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:on?600:400,background:on?roleColor[role]+"22":"transparent",color:on?roleColor[role]:C.muted,border:`1px solid ${on?roleColor[role]+"44":C.border}`,transition:"all .12s"}}>
                {on?"✓ ":""}{tabId}
              </button>;
            })}
          </div>
        </Card>;
      })}
    </div>}

    {/* ══ STATIONS & TAX ══ */}
    {sTab==="stations"&&<div className="fade-in">

      {/* ── Kitchen Stations ── */}
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>🏪 Kitchen Stations</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:14}}>Define stations and which menu categories they handle. Orders are automatically routed to the right station.</div>
        {(rForm.stations||DEFAULT_STATIONS).map((st,idx)=>(
          <div key={st.id} style={{background:C.surface,borderRadius:10,padding:"12px 14px",marginBottom:8,border:`1.5px solid ${st.active!==false?st.color+"44":C.border}`}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
              <input value={st.emoji||"🍳"} onChange={e=>setRForm(f=>({...f,stations:f.stations.map((s,i)=>i===idx?{...s,emoji:e.target.value}:s)}))}
                style={{width:40,fontSize:18,textAlign:"center",padding:"3px 4px"}} maxLength={2}/>
              <input value={st.name} onChange={e=>setRForm(f=>({...f,stations:f.stations.map((s,i)=>i===idx?{...s,name:e.target.value}:s)}))}
                style={{flex:1,fontSize:13,fontWeight:600,minWidth:120}} placeholder="Station name"/>
              <input type="color" value={st.color||"#f5a623"} onChange={e=>setRForm(f=>({...f,stations:f.stations.map((s,i)=>i===idx?{...s,color:e.target.value}:s)}))}
                style={{width:32,height:32,borderRadius:6,border:`1px solid ${C.border}`,cursor:"pointer",padding:2}}/>
              <button onClick={()=>setRForm(f=>({...f,stations:f.stations.map((s,i)=>i===idx?{...s,active:!s.active}:s)}))}
                style={{background:st.active!==false?C.green+"22":C.border,color:st.active!==false?C.green:C.muted,border:"none",borderRadius:6,padding:"4px 10px",fontSize:11,cursor:"pointer",fontWeight:600}}>
                {st.active!==false?"● Active":"○ Off"}
              </button>
              {(rForm.stations||[]).length>1&&<button onClick={()=>setRForm(f=>({...f,stations:f.stations.filter((_,i)=>i!==idx)}))}
                style={{background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"4px 9px",fontSize:12,cursor:"pointer"}}>✕</button>}
            </div>
            <div style={{fontSize:10,color:C.muted,marginBottom:5,fontWeight:700,letterSpacing:.3}}>HANDLES CATEGORIES</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:6}}>
              {(st.categories||[]).map((cat,ci)=>(
                <span key={ci} style={{background:st.color+"22",color:st.color,fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20,display:"flex",alignItems:"center",gap:4}}>
                  {cat}
                  <button onClick={()=>setRForm(f=>({...f,stations:f.stations.map((s,i)=>i===idx?{...s,categories:s.categories.filter((_,j)=>j!==ci)}:s)}))}
                    style={{background:"none",border:"none",color:st.color,cursor:"pointer",fontSize:12,lineHeight:1,padding:0}}>✕</button>
                </span>
              ))}
            </div>
            <div style={{display:"flex",gap:6}}>
              <input placeholder="Add category e.g. Mains" id={`cat-input-${idx}`}
                style={{flex:1,fontSize:12}} onKeyDown={e=>{if(e.key==="Enter"&&e.target.value.trim()){setRForm(f=>({...f,stations:f.stations.map((s,i)=>i===idx?{...s,categories:[...s.categories,e.target.value.trim()]}:s)}));e.target.value="";}}}/>
              <Btn size="sm" variant="ghost" onClick={()=>{const inp=document.getElementById(`cat-input-${idx}`);if(inp?.value.trim()){setRForm(f=>({...f,stations:f.stations.map((s,i)=>i===idx?{...s,categories:[...s.categories,inp.value.trim()]}:s)}));inp.value="";}}}>+ Add</Btn>
            </div>
          </div>
        ))}
        <button onClick={()=>setRForm(f=>({...f,stations:[...(f.stations||DEFAULT_STATIONS),{id:"st"+Date.now(),name:"New Station",emoji:"🍳",categories:[],color:"#4caf7d",active:true}]}))}
          style={{width:"100%",padding:"9px",borderRadius:8,border:`1.5px dashed ${C.accent}`,background:C.accent+"11",color:C.accent,fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:0}}>
          + Add Station
        </button>
      </Card>

      {/* ── Tax Configuration ── */}
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>🧾 Tax Configuration</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:14}}>CGST + SGST rates per category. Food and Beverage can have different rates.</div>
        {[{key:"food",label:"Food Items",icon:"🍛",desc:"Mains, Starters, Breads, Desserts etc."},
          {key:"beverages",label:"Beverages",icon:"🍹",desc:"Drinks, Bar, Cocktails etc."},
        ].map(({key,label,icon,desc})=>{
          const tc=(rForm.taxConfig||{})[key]||{cgst:9,sgst:9};
          return <div key={key} style={{background:C.surface,borderRadius:10,padding:"12px 14px",marginBottom:10,border:`1px solid ${C.border}`}}>
            <div style={{fontWeight:600,fontSize:12,marginBottom:2}}>{icon} {label}</div>
            <div style={{fontSize:11,color:C.muted,marginBottom:10}}>{desc}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <div style={{fontSize:10,color:C.muted,marginBottom:4}}>CGST %</div>
                <input type="number" min="0" max="28" step="0.5" value={tc.cgst} onChange={e=>setRForm(f=>({...f,taxConfig:{...(f.taxConfig||{}), [key]:{...(f.taxConfig||{})[key],cgst:+e.target.value}}}))}
                  style={{fontSize:14,fontWeight:700}} />
              </div>
              <div>
                <div style={{fontSize:10,color:C.muted,marginBottom:4}}>SGST %</div>
                <input type="number" min="0" max="28" step="0.5" value={tc.sgst} onChange={e=>setRForm(f=>({...f,taxConfig:{...(f.taxConfig||{}), [key]:{...(f.taxConfig||{})[key],sgst:+e.target.value}}}))}
                  style={{fontSize:14,fontWeight:700}} />
              </div>
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:6}}>Total GST: <strong style={{color:C.accent}}>{(tc.cgst||0)+(tc.sgst||0)}%</strong></div>
          </div>;
        })}
      </Card>

      {/* ── Service Charge ── */}
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13,marginBottom:4}}>💰 Service Charge</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:14}}>Applied automatically at billing. Staff can toggle per order.</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,padding:"10px 14px",background:C.surface,borderRadius:8}}>
          <div>
            <div style={{fontSize:12,fontWeight:600}}>Enable Service Charge by default</div>
            <div style={{fontSize:11,color:C.muted}}>Pre-filled at billing screen</div>
          </div>
          <button onClick={()=>setRForm(f=>({...f,serviceChargeEnabled:!f.serviceChargeEnabled}))}
            style={{width:42,height:23,borderRadius:12,background:rForm.serviceChargeEnabled?C.accent:C.border,border:"none",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
            <div style={{width:17,height:17,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:rForm.serviceChargeEnabled?22:3,transition:"left .2s"}}/>
          </button>
        </div>
        {rForm.serviceChargeEnabled&&<div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:4}}>SERVICE CHARGE %</div>
            <input type="number" min="0" max="20" step="0.5" value={rForm.serviceChargePct||5}
              onChange={e=>setRForm(f=>({...f,serviceChargePct:+e.target.value}))} style={{fontSize:16,fontWeight:700}} />
          </div>
          <div style={{background:C.accent+"18",borderRadius:8,padding:"8px 14px",textAlign:"center",minWidth:80}}>
            <div style={{fontSize:10,color:C.muted}}>On ₹1,000 bill</div>
            <div style={{fontSize:16,fontWeight:700,color:C.accent}}>₹{Math.round(1000*(rForm.serviceChargePct||5)/100)}</div>
          </div>
        </div>}
      </Card>

      <Btn onClick={()=>{setData(d=>({...d,restaurant:{...d.restaurant,...rForm}}));addLog(sess?.name||"Admin","Updated stations & tax","");alert("Saved!");}}>💾 Save Stations & Tax Settings</Btn>
    </div>}

    {/* ══ WAITER MODE ══ */}
    {sTab==="waitermode"&&<div className="fade-in">
      <Card style={{marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:14,marginBottom:6}}>🤵 Waiter Login Mode</div>
        <div style={{color:C.muted,fontSize:12,marginBottom:16}}>Choose how waiters identify themselves in the system. Changes take effect immediately.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          {[
            {id:"individual",icon:"🔐",title:"Individual Login",desc:"Each waiter has their own username & password. Their name is tracked on all orders and analytics. Best for accountability."},
            {id:"picker",icon:"👆",title:"Waiter Picker",desc:"A shared waiter account with a name picker at the top of the screen. Waiters tap their name before serving. Best for fast-paced environments."},
          ].map(m=>{
            const active=(data.restaurant.waiterMode||"individual")===m.id;
            return <button key={m.id} onClick={()=>setData(d=>({...d,restaurant:{...d.restaurant,waiterMode:m.id}}))}
              style={{background:active?C.accent+"22":C.surface,border:`2px solid ${active?C.accent:C.border}`,borderRadius:14,padding:20,textAlign:"left",cursor:"pointer",transition:"all .15s"}}>
              <div style={{fontSize:28,marginBottom:8}}>{m.icon}</div>
              <div style={{fontWeight:700,fontSize:14,color:active?C.accent:C.cream,marginBottom:4}}>{m.title}</div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{m.desc}</div>
              {active&&<div style={{marginTop:10,fontSize:11,color:C.accent,fontWeight:700}}>✓ ACTIVE</div>}
            </button>;
          })}
        </div>
        {(data.restaurant.waiterMode||"individual")==="picker"&&<>
          <div style={{fontWeight:600,fontSize:12,color:C.muted,marginBottom:8}}>WAITER NAMES FOR PICKER</div>
          <div style={{color:C.muted,fontSize:11,marginBottom:10}}>These are the names shown in the picker. Usually matches your waiter accounts.</div>
          {(data.restaurant.waiterNames||users.filter(u=>u.role==="waiter"&&u.active).map(u=>u.name)).map((name,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
              <input value={name} onChange={e=>{const names=[...(data.restaurant.waiterNames||users.filter(u=>u.role==="waiter"&&u.active).map(u=>u.name))];names[i]=e.target.value;setData(d=>({...d,restaurant:{...d.restaurant,waiterNames:names}}));}} style={{flex:1,fontSize:13}} />
              <button onClick={()=>{const names=(data.restaurant.waiterNames||users.filter(u=>u.role==="waiter"&&u.active).map(u=>u.name)).filter((_,j)=>j!==i);setData(d=>({...d,restaurant:{...d.restaurant,waiterNames:names}}));}} style={{background:C.red+"22",color:C.red,border:"none",borderRadius:6,padding:"6px 10px",cursor:"pointer"}}>✕</button>
            </div>
          ))}
          <button onClick={()=>{const names=[...(data.restaurant.waiterNames||users.filter(u=>u.role==="waiter"&&u.active).map(u=>u.name)),"New Waiter"];setData(d=>({...d,restaurant:{...d.restaurant,waiterNames:names}}));}} style={{fontSize:12,color:C.accent,background:C.accent+"11",border:`1px dashed ${C.accent}`,borderRadius:7,padding:"6px 14px",cursor:"pointer",marginTop:4}}>+ Add Name</button>
        </>}
      </Card>
    </div>}

        {/* ══ ACTIVITY LOG ══ */}
    {sTab==="activity"&&<div className="fade-in">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontWeight:600,fontSize:13}}>📋 Activity Log</div>
        <div style={{display:"flex",gap:8}}>
          <input value={logSearch} onChange={e=>setLogSearch(e.target.value)} placeholder="Search…" style={{fontSize:12,padding:"5px 10px",width:160}}/>
          <Btn size="sm" variant="ghost" onClick={()=>{setLogs(getLogs());}}>🔄 Refresh</Btn>
          <Btn size="sm" variant="danger" onClick={()=>{if(window.confirm("Clear all logs?"))try{localStorage.removeItem(_logKey);setLogs([]);}catch{}}}>🗑 Clear</Btn>
        </div>
      </div>
      <div style={{display:"grid",gap:5,maxHeight:500,overflowY:"auto"}}>
        {filteredLogs.length===0&&<div style={{color:C.muted,fontSize:12,textAlign:"center",padding:30}}>No activity logged yet. Actions will appear here.</div>}
        {filteredLogs.map(log=>(
          <div key={log.id} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"8px 12px",background:C.card,border:`1px solid ${C.border}`,borderRadius:8}}>
            <div style={{flexShrink:0,width:36,height:36,borderRadius:"50%",background:C.accent+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>
              {log.action.includes("Login")?"🔑":log.action.includes("Created")?"➕":log.action.includes("Deleted")?"🗑":log.action.includes("Updated")||log.action.includes("Edited")?"✏️":log.action.includes("theme")?"🎨":"📝"}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:500}}><span style={{color:C.accent}}>{log.actor}</span> · {log.action}</div>
              {log.detail&&<div style={{fontSize:11,color:C.muted,marginTop:1}}>{log.detail}</div>}
            </div>
            <div style={{fontSize:10,color:C.muted,flexShrink:0,textAlign:"right"}}>
              <div>{new Date(log.ts).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</div>
              <div>{new Date(log.ts).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
            </div>
          </div>
        ))}
      </div>
    </div>}

    {/* ── Add/Edit/Reset Password Modal ── */}
    {modal==="resetPw"&&<Modal title={`🔑 Reset Password — ${form.name}`} onClose={()=>setModal(null)}>
      <div style={{background:C.surface,borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:12,color:C.muted,lineHeight:1.6}}>
        Set a new password for this account. The user will be required to change it on next login if you enable force-reset.
      </div>
      <Field label="NEW PASSWORD">
        <input type="text" value={form.password||""} onChange={e=>setForm(f=>({...f,password:e.target.value}))} placeholder="Enter new password..." autoFocus />
      </Field>
      {form.password&&(()=>{const s=pwStrength(form.password);return <div style={{display:"flex",gap:8,alignItems:"center",marginTop:-6,marginBottom:10}}><div style={{flex:1,height:4,background:C.border,borderRadius:3}}><div style={{width:`${(s.score/5)*100}%`,height:4,background:s.color,borderRadius:3,transition:"width .3s"}} /></div><span style={{fontSize:11,color:s.color,fontWeight:600,minWidth:70}}>{s.label}</span></div>})()}
      <Field label="CONFIRM PASSWORD">
        <input type="text" value={form.confirmPw||""} onChange={e=>setForm(f=>({...f,confirmPw:e.target.value}))} placeholder="Repeat new password..." />
      </Field>
      {form.password&&form.confirmPw&&form.password!==form.confirmPw&&<div style={{color:C.red,fontSize:11,marginBottom:8}}>⚠️ Passwords do not match</div>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:C.surface,borderRadius:7,marginBottom:14}}>
        <div>
          <div style={{fontSize:12,fontWeight:600}}>Force password change on next login</div>
          <div style={{fontSize:10,color:C.muted}}>User must update password when they sign in</div>
        </div>
        <button onClick={()=>setForm(f=>({...f,mustChangePassword:!f.mustChangePassword}))} style={{width:40,height:22,borderRadius:11,background:form.mustChangePassword?C.accent:C.border,border:"none",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
          <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:form.mustChangePassword?21:3,transition:"left .2s"}} />
        </button>
      </div>
      <Divider/>
      <div style={{display:"flex",gap:8}}>
        <Btn full onClick={async()=>{
          if(!form.password)return alert("Enter a new password.");
          if(form.password!==form.confirmPw&&form.confirmPw)return alert("Passwords don't match.");
          let hash=form.password;try{hash=await hashPassword(form.password);}catch{}
          setUsers(u=>u.map(x=>x.id===form.id?{...x,password:hash,mustChangePassword:!!form.mustChangePassword,lastPasswordChange:now(),failedLogins:0}:x));
          addLog(sess?.name||"Admin","Password reset",`@${form.username}`);
          setModal(null);
        }}>🔑 Set New Password</Btn>
        <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
      </div>
    </Modal>}

    {(modal==="addUser"||modal==="editUser")&&<UserAccountModal
      modal={modal}
      form={form}
      setForm={setForm}
      sf={sf}
      onSave={async(f)=>{
        if(!f){setModal(null);return;}
        await saveUser();
      }}
      onDelete={(f)=>{if(window.confirm(`Delete @${f.username}?`)){setUsers(u=>u.filter(x=>x.id!==f.id));addLog(sess?.name||"Admin","Deleted account",`@${f.username}`);setModal(null);}}}
      sess={sess}
      pwStrength={pwStrength}
      roleColor={roleColor}
    />}
  </div>;
}

// ── ROOT ──────────────────────────────────────────────────────
const ALL_TABS=[
  {id:"dashboard",label:"Dashboard",icon:"⚡"},
  {id:"tables",label:"Tables",icon:"🪑"},
  {id:"orders",label:"Orders",icon:"🍽️"},
  {id:"orderboard",label:"Order Board",icon:"📡"},
  {id:"menu",label:"Menu",icon:"📋"},
  {id:"combos",label:"Combos",icon:"🍱"},
  {id:"qrordering",label:"QR Ordering",icon:"📱"},
  {id:"reservations",label:"Bookings",icon:"📅"},
  {id:"staff",label:"Staff",icon:"👨‍🍳"},
  {id:"customers",label:"Customers",icon:"👥"},
  {id:"expenses",label:"Expenses",icon:"💸"},
  {id:"deliveries",label:"Deliveries",icon:"🛵"},
  {id:"inventory",label:"Inventory",icon:"📦"},
  {id:"wastage",label:"Wastage",icon:"🗑️"},
  {id:"analytics",label:"Analytics",icon:"📊"},
  {id:"settings",label:"Settings",icon:"⚙️"},
];

// ── MOBILE MORE MENU ─────────────────────────────────────────
function MobileMoreMenu({visibleTabs, tab, setTab, onLogout, sess}){
  useTheme();
  const [open, setOpen] = useState(false);
  const roleColor={admin:C.accent,manager:C.blue,waiter:C.green,kitchen:C.red};
  return <>
    <button onClick={()=>setOpen(s=>!s)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 4px 10px",background:"transparent",color:open?C.accent:C.muted,fontSize:10,gap:3,borderTop:open?`2px solid ${C.accent}`:"2px solid transparent"}}>
      <span style={{fontSize:18}}>•••</span>
      <span style={{fontSize:9}}>More</span>
    </button>
    {open && <div style={{position:"fixed",bottom:58,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,zIndex:300,padding:"8px 12px 10px",boxShadow:"0 -4px 20px #00000030"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:10}}>
        {visibleTabs.map(t=>{
          const active=tab===t.id;
          return <button key={t.id} onClick={()=>{setTab(t.id);setOpen(false);}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 4px",borderRadius:10,background:active?C.accent+"22":"transparent",color:active?C.accent:C.muted,fontSize:10,gap:3,border:active?`1px solid ${C.accent}44`:"1px solid transparent"}}>
            <span style={{fontSize:20}}>{t.icon}</span>
            <span style={{fontSize:9}}>{t.label.split(" ")[0]}</span>
          </button>;
        })}
      </div>
      <div style={{borderTop:`1px solid ${C.border}`,paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:12,color:C.cream,fontWeight:500}}>{sess?.name} <Badge label={sess?.role} color={roleColor[sess?.role]||C.muted}/></div>
        <button onClick={onLogout} style={{background:C.red+"22",color:C.red,border:`1px solid ${C.red}33`,borderRadius:7,padding:"5px 12px",fontSize:12,fontWeight:600}}>Sign Out</button>
      </div>
    </div>}
  </>;
}

export default function App(){
  useTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [users,setUsers]=useStore("rcm_users",D_USERS);
  const [data,setData]=useStore("rcm_data",D_DATA);
  const [sess,setSess]=useState(()=>loadSession(D_USERS)); // restore session on reload
  const [tab,setTab]=useState("dashboard");
  const [sideOpen,setSideOpen]=useState(true);
  const [activeThemeId,setActiveThemeId]=useState(_savedThemeId);
  const [roleTabOverrides,setRoleTabOverrides]=useStore("rcm_role_tab_overrides",{});
  const idleTimerRef=useRef(null);
  const IDLE_TIMEOUT=30*60*1000; // 30 min

  // Restore session with actual users from store (not defaults)
  useEffect(()=>{
    if(!sess){
      const restored=loadSession(users);
      if(restored)setSess(restored);
    }
  },[users]);

  // Apply theme globally whenever it changes
  useEffect(()=>{
    const t=THEMES[activeThemeId]||THEMES.amber;
    setGlobalTheme(t);
    try{localStorage.setItem("rcm_theme",activeThemeId);}catch{}
  },[activeThemeId]);

  // ── Idle timeout ──
  const resetIdleTimer=useCallback(()=>{
    touchSession();
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current=setTimeout(()=>{
      clearSession();setSess(null);
      emitNotif({type:"stock",title:"Session expired",body:"You were signed out due to inactivity."});
    },IDLE_TIMEOUT);
  },[]);

  useEffect(()=>{
    if(!sess)return;
    const events=["mousemove","keydown","click","touchstart","scroll"];
    events.forEach(e=>window.addEventListener(e,resetIdleTimer,{passive:true}));
    resetIdleTimer();
    return()=>{
      clearTimeout(idleTimerRef.current);
      events.forEach(e=>window.removeEventListener(e,resetIdleTimer));
    };
  },[sess,resetIdleTimer]);

  // ── Order & reservation watchers ──
  useEffect(()=>{
    if(!sess)return;
    watchOrders(data.orders,sess.role);
  },[data.orders,sess]);

  useEffect(()=>{
    if(!sess)return;
    watchReservations(data.reservations,30);
    const iv=setInterval(()=>watchReservations(data.reservations,30),60000);
    return()=>clearInterval(iv);
  },[data.reservations,sess]);

  const [showQuickPOS, setShowQuickPOS] = useState(false);
  // Waiter picker state (for picker mode)
  const [activeWaiter, setActiveWaiter] = useState(sess?.name || "");
  useEffect(() => { if (sess?.name && !activeWaiter) setActiveWaiter(sess.name); }, [sess]);

  // Global keyboard shortcuts: P = Quick POS, B = Order Board
  useEffect(() => {
    if (!sess) return;
    const fn = e => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
      if (e.key === "p" || e.key === "P") setShowQuickPOS(s => !s);
      if (e.key === "b" || e.key === "B") setTab("orderboard");
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [sess]);

  const handleThemeChange=(id)=>{
    setActiveThemeId(id);
    const t=THEMES[id]||THEMES.amber;
    setGlobalTheme(t);
  };

  const doLogout=()=>{clearSession();setSess(null);};

  if(!sess)return <Login users={users} onLogin={u=>{
    saveSession(u);setSess(u);setTab(u.role==="kitchen"?"kitchen":"dashboard");
    // Track login stats
    setUsers(us=>us.map(x=>x.id===u.id?{...x,lastLogin:new Date().toISOString(),loginCount:(x.loginCount||0)+1,failedLogins:0}:x));
    addLog(u.name,"Login",`${u.role} signed in`);
  }}/>;

  // Use roleTabOverrides if set, otherwise fall back to PERMS
  const basePerms=PERMS[sess.role]||PERMS.waiter;
  const overriddenTabs=roleTabOverrides[sess.role];
  const perms=overriddenTabs?{...basePerms,tabs:overriddenTabs}:basePerms;

  if(sess.role==="kitchen")return <KitchenDisplay data={data} setData={setData} onLogout={doLogout}/>;

  const visibleTabs=ALL_TABS.filter(t=>perms.tabs.includes(t.id));
  const roleColor={admin:C.accent,manager:C.blue,waiter:C.green,kitchen:C.red};
  const tp={data,setData,perms,sess,activeWaiter};

  // Auto-collapse sidebar on tablet
  useEffect(() => { if (isTablet && !isMobile) setSideOpen(false); }, [isTablet, isMobile]);

  return <>
    <style>{makeCss(C)}</style>
    {showQuickPOS && <QuickPOS data={data} setData={setData} onClose={() => setShowQuickPOS(false)} />}

    {isMobile ? (
      /* ── MOBILE LAYOUT ── */
      <div style={{display:"flex",flexDirection:"column",height:"100dvh",background:C.bg,overflow:"hidden"}}>
        {/* Mobile top bar */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:C.surface,borderBottom:`1px solid ${C.border}`,flexShrink:0,gap:8,flexWrap:"wrap"}}>
          <div className="playfair" style={{fontSize:15,fontWeight:700,color:C.accent}}>{data.restaurant.name}</div>
          {data.restaurant.waiterMode==="picker"&&sess.role==="waiter"&&(()=>{
            const names=data.restaurant.waiterNames||users.filter(u=>u.role==="waiter"&&u.active).map(u=>u.name);
            return <div style={{display:"flex",alignItems:"center",gap:5,background:C.card,border:`1px solid ${C.border}`,borderRadius:7,padding:"3px 8px"}}>
              <span style={{fontSize:10,color:C.muted}}>🤵</span>
              <select value={activeWaiter} onChange={e=>setActiveWaiter(e.target.value)} style={{fontSize:11,fontWeight:700,color:C.accent,background:"transparent",border:"none",padding:0,cursor:"pointer"}}>
                {names.map(n=><option key={n} value={n}>{n}</option>)}
              </select>
            </div>;
          })()}
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={()=>setShowQuickPOS(true)} style={{background:C.accent+"22",color:C.accent,border:`1px solid ${C.accent}44`,borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:700}}>⚡ POS</button>
            <NotifBell role={sess.role}/>
          </div>
        </div>
        {/* Mobile main content */}
        <div style={{flex:1,overflowY:"auto",padding:"10px 12px 80px",willChange:"scroll-position"}}>
          <LowStockBanner data={data} />
          {tab==="dashboard"&&<Dashboard {...tp}/>}
          {tab==="tables"&&<Tables {...tp}/>}
          {tab==="orders"&&<Orders {...tp}/>}
          {tab==="orderboard"&&<LiveOrderBoard {...tp}/>}
          {tab==="menu"&&<Menu {...tp}/>}
          {tab==="combos"&&<ComboManager data={data} setData={setData} perms={perms}/>}
          {tab==="qrordering"&&<QRTableOrdering data={data} setData={setData}/>}
          {tab==="reservations"&&<Reservations {...tp} perms={perms}/>}
          {tab==="staff"&&<Staff {...tp}/>}
          {tab==="customers"&&<Customers {...tp}/>}
          {tab==="expenses"&&<Expenses {...tp}/>}
          {tab==="deliveries"&&<Deliveries {...tp}/>}
          {tab==="inventory"&&<Inventory {...tp}/>}
          {tab==="wastage"&&<Wastage {...tp}/>}
          {tab==="analytics"&&<Analytics {...tp}/>}
          {tab==="settings"&&<Settings {...tp} users={users} setUsers={setUsers} activeThemeId={activeThemeId} onThemeChange={handleThemeChange} sess={sess} roleTabOverrides={roleTabOverrides} setRoleTabOverrides={setRoleTabOverrides}/>}
        </div>
        {/* Mobile bottom tab bar */}
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:200,boxShadow:"0 -2px 12px #00000020"}}>
          {visibleTabs.slice(0,5).map(t=>{
            const active=tab===t.id;
            return <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 4px 10px",background:"transparent",color:active?C.accent:C.muted,fontSize:10,fontWeight:active?700:400,gap:3,borderTop:active?`2px solid ${C.accent}`:"2px solid transparent",transition:"all .12s"}}>
              <span style={{fontSize:18}}>{t.icon}</span>
              <span style={{fontSize:9,letterSpacing:.2}}>{t.label.split(" ")[0]}</span>
            </button>;
          })}
          {visibleTabs.length > 5 && (
            <MobileMoreMenu visibleTabs={visibleTabs.slice(5)} tab={tab} setTab={setTab} onLogout={doLogout} sess={sess} />
          )}
        </div>
      </div>
    ) : (
      /* ── DESKTOP / TABLET LAYOUT ── */
      <div style={{display:"flex",height:"100dvh",background:C.bg,overflow:"hidden"}}>
        {/* Sidebar */}
        <div style={{width:sideOpen?216:58,background:C.surface,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",transition:"width .22s",flexShrink:0,overflow:"hidden"}}>
          <div style={{padding:sideOpen?"16px 14px 12px":"16px 8px 12px",borderBottom:`1px solid ${C.border}`}}>
            {sideOpen?<><div className="playfair" style={{fontSize:14,fontWeight:700,color:C.accent,whiteSpace:"nowrap",overflow:"hidden"}}>{data.restaurant.name}</div><div style={{color:C.muted,fontSize:10,marginTop:1}}>Restaurant CRM</div></>:<div style={{fontSize:18,textAlign:"center"}}>🍴</div>}
          </div>
          <nav style={{flex:1,padding:"6px 4px",overflowY:"auto"}}>
            {visibleTabs.map(t=>{const active=tab===t.id;return <button key={t.id} onClick={()=>setTab(t.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:sideOpen?"7px 10px":"7px 0",justifyContent:sideOpen?"flex-start":"center",borderRadius:7,marginBottom:1,background:active?C.accent+"22":"transparent",color:active?C.accent:C.muted,fontWeight:active?600:400,fontSize:12,transition:"all .12s",border:active?`1px solid ${C.accent}33`:"1px solid transparent"}}>
              <span style={{fontSize:14}}>{t.icon}</span>
              {sideOpen&&<span style={{whiteSpace:"nowrap",overflow:"hidden"}}>{t.label}</span>}
            </button>;})}
          </nav>
          <div style={{borderTop:`1px solid ${C.border}`,padding:sideOpen?"9px 10px":"9px 4px"}}>
            {sideOpen&&<div style={{marginBottom:7}}><div style={{fontSize:12,fontWeight:600}}>{sess.name}</div><div style={{marginTop:2}}><Badge label={sess.role} color={roleColor[sess.role]||C.muted} /></div></div>}
            <div style={{display:"flex",gap:4}}>
              <Btn size="sm" variant="ghost" full={sideOpen} onClick={doLogout}>{sideOpen?"Sign Out":"↩"}</Btn>
              <button onClick={()=>setSideOpen(s=>!s)} style={{background:C.border,color:C.muted,borderRadius:6,padding:"4px 8px",fontSize:10,flexShrink:0}}>{sideOpen?"◀":"▶"}</button>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div style={{flex:1,overflowY:"auto",maxHeight:"100dvh",minWidth:0}}>
          <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",padding:"10px 22px 0",gap:8,flexWrap:"wrap"}}>
            {/* Waiter picker mode */}
            {data.restaurant.waiterMode==="picker"&&sess.role==="waiter"&&(()=>{
              const names=data.restaurant.waiterNames||users.filter(u=>u.role==="waiter"&&u.active).map(u=>u.name);
              return <div style={{display:"flex",alignItems:"center",gap:6,background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px"}}>
                <span style={{fontSize:11,color:C.muted}}>🤵 Serving as:</span>
                <select value={activeWaiter} onChange={e=>setActiveWaiter(e.target.value)} style={{fontSize:12,fontWeight:700,color:C.accent,background:"transparent",border:"none",padding:0,cursor:"pointer"}}>
                  {names.map(n=><option key={n} value={n}>{n}</option>)}
                </select>
              </div>;
            })()}
            <button onClick={()=>setShowQuickPOS(true)} style={{background:C.accent+"22",color:C.accent,border:`1px solid ${C.accent}44`,borderRadius:8,padding:"6px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
              ⚡ Quick POS <span style={{fontSize:10,color:C.muted,fontWeight:400}}>[P]</span>
            </button>
            <NotifBell role={sess.role}/>
          </div>
          <div style={{padding:"10px 22px 22px"}}>
            <LowStockBanner data={data} />
            {tab==="dashboard"&&<Dashboard {...tp}/>}
            {tab==="tables"&&<Tables {...tp}/>}
            {tab==="orders"&&<Orders {...tp}/>}
            {tab==="orderboard"&&<LiveOrderBoard {...tp}/>}
            {tab==="menu"&&<Menu {...tp}/>}
            {tab==="combos"&&<ComboManager data={data} setData={setData} perms={perms}/>}
            {tab==="qrordering"&&<QRTableOrdering data={data} setData={setData}/>}
            {tab==="reservations"&&<Reservations {...tp} perms={perms}/>}
            {tab==="staff"&&<Staff {...tp}/>}
            {tab==="customers"&&<Customers {...tp}/>}
            {tab==="expenses"&&<Expenses {...tp}/>}
            {tab==="deliveries"&&<Deliveries {...tp}/>}
            {tab==="inventory"&&<Inventory {...tp}/>}
            {tab==="wastage"&&<Wastage {...tp}/>}
            {tab==="analytics"&&<Analytics {...tp}/>}
            {tab==="settings"&&<Settings {...tp} users={users} setUsers={setUsers} activeThemeId={activeThemeId} onThemeChange={handleThemeChange} sess={sess} roleTabOverrides={roleTabOverrides} setRoleTabOverrides={setRoleTabOverrides}/>}
          </div>
        </div>
      </div>
    )}
  </>;
}
