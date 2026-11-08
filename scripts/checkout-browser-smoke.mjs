// Local-only fallback when the interactive browser runtime is unavailable.
// Uses an isolated Edge profile and blocks external hosts. No emails are sent.
import { spawn } from "node:child_process";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "node:http";

const base = process.env.CHECKOUT_TEST_URL || "http://localhost:3011";
const root = process.cwd();
const output = path.join(root, "tmp", "checkout-browser");
await mkdir(output, { recursive: true });
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;width:100%;height:100%}iframe{border:0;width:100%;height:100%}#report{position:fixed;bottom:0;left:0;background:#fff;color:#111;z-index:9999;font:11px monospace;max-width:100%;white-space:pre-wrap}</style></head><body><iframe title="Local cart test"></iframe><pre id="report">RUNNING</pre><script>
const report=document.querySelector('#report'), frame=document.querySelector('iframe');
const params=new URLSearchParams(location.search);
const mode=params.get('mode');
frame.style.width=params.get('width')+'px';
const checks=[];
const assert=(condition,label)=>{if(!condition)throw Error(label);checks.push(label)};
const wait=async(fn)=>{for(let i=0;i<180;i++){const result=fn();if(result)return result;await new Promise(r=>setTimeout(r,100))}throw Error('Timeout waiting for page')};
const item={id:'cd123456-1234-4567-89ab-123456789012',productId:1,signType:'Neon Sign',color:'Warm White',size:'36 in wide × 24 in high',signText:'Our studio',usageLocation:'Indoor',details:'Wall mounted',quantity:2};
localStorage.setItem('glownique-cart-v1',JSON.stringify([item]));
frame.src='/cart';
(async()=>{
 await wait(()=>frame.contentDocument.querySelector('.commerce-item'));
 let doc=frame.contentDocument;
 assert(doc.body.textContent.includes('Good Vibes Only'),'saved design renders');
 assert(doc.querySelector('input[type=number]').value==='2','saved quantity renders');
 assert(doc.documentElement.scrollWidth<=frame.clientWidth,'cart has no horizontal overflow');
 if(mode==='add'){
   frame.src='/products/custom-neon-signs';
   await wait(()=>[...frame.contentDocument.querySelectorAll('button')].find(b=>b.textContent.includes('Configure & add to cart')));
   doc=frame.contentDocument;
   const events=[];frame.contentWindow.fbq=(...args)=>events.push(args);
   [...doc.querySelectorAll('button')].find(b=>b.textContent.includes('Configure & add to cart')).click();
   await wait(()=>frame.contentDocument.querySelector('dialog[open]'));
   doc=frame.contentDocument;
   doc.querySelector('dialog textarea[name=signText]').value='A fresh design';
   doc.querySelector('dialog form').requestSubmit();
   await wait(()=>frame.contentDocument.body.textContent.includes('Your design is in.'));
   const saved=JSON.parse(localStorage.getItem('glownique-cart-v1'));
   assert(saved.length===2,'new design is added to existing cart');
   assert(saved[1].signText==='A fresh design','new design preserves custom text');
   assert(events.filter(e=>e[1]==='AddToCart').length===1,'saving design fires one AddToCart');
   assert(doc.querySelector('dialog').scrollWidth<=frame.clientWidth,'new design dialog has no horizontal overflow');
 }else if(mode==='checkout'||mode==='submit'){
   doc.querySelector('a[href="/checkout"]').click();
   await wait(()=>frame.contentDocument.querySelector('.commerce-form'));
   doc=frame.contentDocument;
   assert(doc.querySelector('meta[name=robots]').content.includes('noindex'),'checkout noindex');
   assert(doc.querySelector('.commerce-alert').textContent.includes('temporarily unavailable'),'missing configuration shown');
   assert(doc.querySelector('button[type=submit]').disabled,'unconfigured checkout disabled');
   assert(doc.documentElement.scrollWidth<=frame.clientWidth,'checkout has no horizontal overflow');
   if(mode==='submit'){
     const events=[], requests=[];
     frame.contentWindow.fbq=(...args)=>events.push(args);
     frame.contentWindow.fetch=async(url,options)=>{
       if(url!=='/api/checkout')throw Error('Unexpected network call');
       requests.push(JSON.parse(options.body));
       return new Response(JSON.stringify(requests.length===1?{error:'Simulated temporary failure'}:{accepted:true,reference:'GL-LOCAL-TEST'}),{status:requests.length===1?503:200,headers:{'Content-Type':'application/json'}});
     };
     const enable=()=>{doc.querySelectorAll('fieldset').forEach(f=>f.disabled=false);doc.querySelector('button[type=submit]').disabled=false};
     enable();
     for(const [name,value] of Object.entries({name:'Local Test',email:'tester@example.com',country:'United States',city:'Austin'}))doc.querySelector('[name='+name+']').value=value;
     doc.querySelector('[name=consent]').checked=true;
     doc.querySelector('form').requestSubmit();
     await wait(()=>frame.contentDocument.querySelector('[role=alert]')?.textContent.includes('Simulated temporary failure'));
     assert(JSON.parse(localStorage.getItem('glownique-cart-v1')).length===1,'failed submission preserves cart');
     assert(!events.some(e=>e[1]==='Lead'),'failed submission fires no Lead');
     enable();doc.querySelector('form').requestSubmit();
     await wait(()=>frame.contentDocument.querySelector('.commerce-success'));
     doc=frame.contentDocument;
     [...doc.querySelectorAll('button')].find(b=>b.textContent==='Stay on this page').click();
     assert(requests[0].submissionId===requests[1].submissionId,'retry reuses submission ID');
     assert(JSON.parse(localStorage.getItem('glownique-cart-v1')).length===0,'success clears submitted cart');
     assert(events.filter(e=>e[1]==='Lead').length===1,'successful submission fires one Lead');
     assert(events.filter(e=>e[1]==='CheckoutSubmitted').length===1,'successful submission fires one checkout event');
     assert(doc.querySelector('[data-meta-source=checkout-success-etsy]').href.includes('etsy.com'),'success hands off to Etsy');
     assert(doc.documentElement.scrollWidth<=frame.clientWidth,'success has no horizontal overflow');
   }
 } else if(mode==='edit'){
   [...doc.querySelectorAll('button')].find(b=>b.textContent==='Edit design').click();
   await wait(()=>frame.contentDocument.querySelector('dialog[open]'));
   doc=frame.contentDocument;
   assert(doc.querySelector('dialog input[name=quantity]').value==='2','editing preserves quantity');
   assert(doc.querySelector('dialog textarea[name=signText]').value==='Our studio','editing preserves design text');
   doc.querySelector('dialog input[name=quantity]').value='3';
   doc.querySelector('dialog form').requestSubmit();
   await wait(()=>frame.contentDocument.body.textContent.includes('Your design is in.'));
   assert(JSON.parse(localStorage.getItem('glownique-cart-v1'))[0].quantity===3,'edit persists quantity');
   assert(JSON.parse(localStorage.getItem('glownique-cart-v1')).length===1,'editing does not duplicate design');
   assert(doc.querySelector('dialog').scrollWidth<=frame.clientWidth,'dialog has no horizontal overflow');
 }
 report.textContent=JSON.stringify({ok:true,mode,width:frame.clientWidth,checks});
 document.title='CHECKOUT_SMOKE_PASS';
})().catch(error=>{report.textContent=JSON.stringify({ok:false,mode,error:error.message,checks});document.title='CHECKOUT_SMOKE_FAIL'});
</script></body></html>`;

// The app proxies PostHog through /ingest, so DNS blocking alone is insufficient.
// This local proxy also blocks telemetry and real API writes during UI tests.
const testServer = createServer(async (request, response) => {
  if (request.url.startsWith("/__checkout_local_smoke.html")) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(html);
    return;
  }
  if (request.url.startsWith("/ingest") || request.url.startsWith("/api/")) {
    response.writeHead(204);
    response.end();
    return;
  }
  try {
    const upstream = await fetch(base + request.url);
    response.writeHead(upstream.status, {
      "Content-Type":
        upstream.headers.get("content-type") || "application/octet-stream",
    });
    response.end(Buffer.from(await upstream.arrayBuffer()));
  } catch {
    response.writeHead(502);
    response.end();
  }
});
await new Promise((resolve) => testServer.listen(0, "127.0.0.1", resolve));
const testBase = `http://127.0.0.1:${testServer.address().port}`;
try {
  const browser =
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  for (const [width, mode] of [
    [320, "cart"],
    [390, "cart"],
    [390, "add"],
    [390, "checkout"],
    [390, "edit"],
    [390, "submit"],
    [1024, "cart"],
    [1440, "cart"],
    [1440, "checkout"],
  ]) {
    const name = `${mode}-${width}`;
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--force-device-scale-factor=1",
      "--no-first-run",
      "--disable-background-networking",
      "--disable-extensions",
      "--hide-scrollbars",
      `--user-data-dir=${path.join(output, "profile-" + name)}`,
      "--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost, EXCLUDE 127.0.0.1",
      `--window-size=${width},1000`,
      "--virtual-time-budget=25000",
      `--screenshot=${path.join(output, name + ".png")}`,
      "--dump-dom",
      `${testBase}/__checkout_local_smoke.html?mode=${mode}&width=${width}`,
    ];
    const result = await new Promise((resolve, reject) => {
      const child = spawn(browser, args, { windowsHide: true });
      let stdout = "";
      child.stdout.on("data", (chunk) => {
        stdout += chunk;
      });
      child.stderr.on("data", () => {});
      child.on("error", reject);
      child.on("close", (code) => resolve({ code, stdout }));
      const timeout = setTimeout(() => {
        child.kill();
        reject(new Error(`Browser timed out: ${name}`));
      }, 60000);
      child.on("close", () => clearTimeout(timeout));
    });
    await writeFile(path.join(output, name + ".html"), result.stdout);
    const report = result.stdout.match(/<pre id="report">(.*?)<\/pre>/s)?.[1];
    console.log(name, report || `No report; browser exit ${result.code}`);
    if (!report || JSON.parse(report).ok !== true)
      throw new Error(`Browser checks failed: ${name}`);
  }
  await readFile(path.join(output, "cart-390.png"));
} finally {
  testServer.closeAllConnections();
  testServer.close();
}
