if(!self.define){let e,c={};const i=(i,s)=>(i=new URL(i+".js",s).href,c[i]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=c,document.head.appendChild(e)}else e=i,importScripts(i),c()})).then((()=>{let e=c[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(c[t])return;let a={};const r=e=>i(e,t),o={module:{uri:t},exports:a,require:r};c[t]=Promise.all(s.map((e=>o[e]||r(e)))).then((e=>(n(...e),a)))}}define(["./workbox-f52fd911"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Poppins/OFL.txt",revision:"17293189e4ca3f79c0bcca524d41ba52"},{url:"/Poppins/Poppins-Black.ttf",revision:"14d00dab1f6802e787183ecab5cce85e"},{url:"/Poppins/Poppins-BlackItalic.ttf",revision:"e9c5c588e39d0765d30bcd6594734102"},{url:"/Poppins/Poppins-Bold.ttf",revision:"08c20a487911694291bd8c5de41315ad"},{url:"/Poppins/Poppins-BoldItalic.ttf",revision:"19406f767addf00d2ea82cdc9ab104ce"},{url:"/Poppins/Poppins-ExtraBold.ttf",revision:"d45bdbc2d4a98c1ecb17821a1dbbd3a4"},{url:"/Poppins/Poppins-ExtraBoldItalic.ttf",revision:"8afe4dc13b83b66fec0ea671419954cc"},{url:"/Poppins/Poppins-ExtraLight.ttf",revision:"6f8391bbdaeaa540388796c858dfd8ca"},{url:"/Poppins/Poppins-ExtraLightItalic.ttf",revision:"a9bed017984a258097841902b696a7a6"},{url:"/Poppins/Poppins-Italic.ttf",revision:"c1034239929f4651cc17d09ed3a28c69"},{url:"/Poppins/Poppins-Light.ttf",revision:"fcc40ae9a542d001971e53eaed948410"},{url:"/Poppins/Poppins-LightItalic.ttf",revision:"0613c488cf7911af70db821bdd05dfc4"},{url:"/Poppins/Poppins-Medium.ttf",revision:"bf59c687bc6d3a70204d3944082c5cc0"},{url:"/Poppins/Poppins-MediumItalic.ttf",revision:"cf5ba39d9ac24652e25df8c291121506"},{url:"/Poppins/Poppins-Regular.ttf",revision:"093ee89be9ede30383f39a899c485a82"},{url:"/Poppins/Poppins-SemiBold.ttf",revision:"6f1520d107205975713ba09df778f93f"},{url:"/Poppins/Poppins-SemiBoldItalic.ttf",revision:"9841f3d906521f7479a5ba70612aa8c8"},{url:"/Poppins/Poppins-Thin.ttf",revision:"9ec263601ee3fcd71763941207c9ad0d"},{url:"/Poppins/Poppins-ThinItalic.ttf",revision:"01555d25092b213d2ea3a982123722c9"},{url:"/_next/app-build-manifest.json",revision:"eb7b8d804a599c8eb06d10fa9eba06fc"},{url:"/_next/static/chunks/23-f49b7bd51ac510aa.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/341-2b5db21c6dab8187.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/564-11551e15c3a0e53f.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/574-ca0511b3c1af990e.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/870fdd6f-a755566b5265f430.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/89-550c8290421a27e2.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/974-44efddc6dca523ac.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/app/_not-found/page-5218dfafb1c4b019.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/app/dashboard/page-595bbb0561c94c72.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/app/layout-bc656f93725c8a5d.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/app/page-7872166dedf039bd.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/app/sign-in/%5B%5B...sign-in%5D%5D/page-c47619f752425aad.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/app/sign-up/%5B%5B...sign-up%5D%5D/page-bd15b6f552e40cb4.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/fd9d1056-3e94afbb2983735d.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/main-6781debe278550dc.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/main-app-9b3247d41c3225ef.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/pages/_app-037b5d058bd9a820.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/pages/_error-6ae619510b1539d6.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-54bb236a79bfbea1.js",revision:"wxrck5wS-57t8Au4P0_cU"},{url:"/_next/static/css/77cccc355e9befb2.css",revision:"77cccc355e9befb2"},{url:"/_next/static/css/a39a1b09c6bb74eb.css",revision:"a39a1b09c6bb74eb"},{url:"/_next/static/wxrck5wS-57t8Au4P0_cU/_buildManifest.js",revision:"a0ae24e7f29dd3809ab75b5dd91a79dc"},{url:"/_next/static/wxrck5wS-57t8Au4P0_cU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/app.jpg",revision:"2bba586b2cb54a2473560b6aa9ad0836"},{url:"/icons/icon-192x192.png",revision:"a66651f609f3e69a6c1cd1ae36f7f236"},{url:"/icons/icon-512x512.png",revision:"fa9d9f38c1a69860af331ae1222ebcc2"},{url:"/icons/icon.svg",revision:"575c4d2352386656fa3890129eb8cccb"},{url:"/icons/logo.png",revision:"ad72c1e88828a40f664e8d0f0a104853"},{url:"/logo.png",revision:"ad72c1e88828a40f664e8d0f0a104853"},{url:"/manifest.json",revision:"cdb63813cfeb25dc91d6a13fcaf49f56"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/screenshots/mobile.png",revision:"6b3ac98112d7efc22d32cb8d0cf29d8e"},{url:"/screenshots/pc.png",revision:"8e4441458b4b72059f1835db5f8e988b"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"},{url:"/worker/index.js",revision:"933eee57c60446649ee59b75c5c834b7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:c,event:i,state:s})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),e.registerRoute(/\.(?:png|jpg|jpeg|svg|gif|webp|svg|ttf)$/,new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET")}));
