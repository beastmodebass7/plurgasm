window.PLURGASM_DATA = window.PLURGASM_DATA || {};

const FESTIVALS = [
  { id:'edc-mexico', name:'EDC MEXICO', tagline:'Under the Electric Sky — CDMX', location:'Autódromo Hermanos Rodríguez, Mexico City', dates:'Feb 27 – Mar 1, 2026', sortDate:'2026-02-27', endDate:'2026-03-01', days:3, age:'18+', type:'international', typeLabel:'International', genres:['EDM','House','Techno','Trance','Bass'], desc:'One of the largest EDM events in Latin America. Insomniac production quality in Mexico City\'s iconic Formula 1 circuit.', headliners: [], url:'https://mexico.electricdaisycarnival.com', featured:false, detailPage:null, region:'international' },
  { id:'tomorrowland-winter', name:'TOMORROWLAND WINTER', tagline:'The Ski Resort Edition', location:'Alpe d\'Huez, France', dates:'Mar 21–28, 2026', sortDate:'2026-03-21', endDate:'2026-03-28', days:7, age:'18+', type:'international', typeLabel:'International', genres:['EDM','Techno','House','Trance','DnB'], desc:'Tomorrowland\'s ski resort spin-off in the French Alps. Charlotte de Witte, Steve Aoki, Nina Kraviz headlining.', headliners: [], url:'https://tomorrowlandwinter.com', featured:false, detailPage:null, region:'international' },
  { id:'ultra-miami', name:'ULTRA MIAMI', tagline:'World\'s Premier Electronic Festival', location:'Bayfront Park, Miami FL', dates:'Mar 27–29, 2026', sortDate:'2026-03-27', endDate:'2026-03-29', days:3, age:'18+', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Trance','Bass'], desc:'The world\'s No.2 festival. Carl Cox, Eric Prydz, Armin van Buuren, Major Lazer, John Summit, Sara Landry, ILLENIUM across 7 stages at Bayfront Park.', headliners: [], url:'https://ultramusicfestival.com', featured:true, detailPage:null, region:'southeast', lat:25.7751, lng:-80.1869 },
  { id:'coachella', name:'COACHELLA', tagline:'Valley of the Sun', location:'Empire Polo Club, Indio CA', dates:'Apr 10–12 + Apr 17–19, 2026', sortDate:'2026-04-10', endDate:'2026-04-19', days:6, age:'All Ages', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Indie','Hip-Hop'], desc:'America\'s most famous festival. Anyma headlines the electronic Sahara tent alongside Disclosure. Strong electronic programming across the California desert.', headliners: [], url:'https://coachella.com', featured:false, detailPage:null, region:'west', lat:33.6803, lng:-116.2372 },
  { id:'beyond-wonderland', name:'BEYOND WONDERLAND', tagline:'Fall Down the Rabbit Hole', location:'Shoreline Amphitheatre, Mountain View CA', dates:'Apr 17–18, 2026 (est)', sortDate:'2026-04-17', endDate:'2026-04-18', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['EDM','Bass','House','Techno'], desc:'Insomniac\'s Alice in Wonderland themed festival in the Bay Area. Immersive themed stages and strong lineup.', headliners: [], url:'https://beyondwonderland.com', featured:false, detailPage:null, region:'west', lat:37.4261, lng:-122.0802 },
  { id:'edc', name:'EDC LAS VEGAS', lat:36.2722, lng:-115.0107, tagline:'30th Anniversary — kineticJOURNEY', location:'Las Vegas Motor Speedway, NV', dates:'May 15–17, 2026', sortDate:'2026-05-15', endDate:'2026-05-17', days:3, age:'18+', type:'mega', typeLabel:'Mega Festival', region:'west', genres:['EDM','House','Techno','Trance','Bass'], desc:'The crown jewel of North American raves celebrates 30 years. Every pass sold out within 24 hours — a festival record. Free YouTube livestream available. Theme: kineticJOURNEY. 17 stages. 500,000 headliners under the electric sky.', headliners:['Martin Garrix','Charlotte de Witte','Porter Robinson','Fisher','John Summit','Above & Beyond','Kaskade','Armin van Buuren','Zedd','Chris Lake','Tiësto','Mau P'], url:'https://lasvegas.electricdaisycarnival.com', detailPage:'festivals/edc-las-vegas.html', featured:true, cardTheme:{ bg:'linear-gradient(145deg, #10081e 0%, #180a2e 50%, #0c0618 100%)', border:'rgba(182,77,255,0.3)', glow:'rgba(182,77,255,0.07)', accent:'#b64dff', label:'rgba(182,77,255,0.8)' } },
  { id:'lightning-in-a-bottle', name:'LIGHTNING IN A BOTTLE', tagline:'The Conscious Festival', location:'Central California', dates:'May 20–25, 2026 (est)', sortDate:'2026-05-20', endDate:'2026-05-25', days:5, age:'All Ages', type:'underground', typeLabel:'Underground', genres:['Psychedelic','House','Bass','Jam'], desc:'A conscious camping festival blending electronic music, art, yoga, and community. One of the most beloved boutique festivals in the US.', headliners: [], url:'https://lightninginabottle.org', featured:false, detailPage:null, region:'west', lat:35.7989, lng:-119.7532 },
  { id:'movement', name:'MOVEMENT DETROIT', lat:42.3291, lng:-83.0458, tagline:'20 Years at the Birthplace', location:'Hart Plaza, Detroit MI', dates:'May 23–25, 2026', sortDate:'2026-05-23', endDate:'2026-05-25', days:3, age:'18+', type:'underground', typeLabel:'Underground', region:'midwest', genres:['Techno','House','Industrial'], desc:'Marking 20 years at the birthplace of techno. Raw. Industrial. Undeniably Detroit. Carl Cox, Richie Hawtin, Dom Dolla, Danny Brown, Nia Archives, Ellen Allien, and 115+ more artists.', headliners:['Carl Cox','Richie Hawtin','Dom Dolla','Danny Brown','Barry Can\'t Swim','Green Velvet','Carl Craig B2B Cajmere','Boys Noize B2B MCR-T','Nia Archives','Claude VonStroke','The Dare','Ellen Allien','Hot Since 82'], url:'https://movement.us', detailPage:'festivals/movement-detroit.html', featured:false, cardTheme:{ bg:'linear-gradient(145deg, #080810 0%, #0d0818 50%, #060610 100%)', border:'rgba(182,77,255,0.25)', glow:'rgba(120,60,255,0.07)', accent:'#b64dff', label:'rgba(182,77,255,0.7)' } },
  { id:'project-glow', name:'PROJECT GLOW', lat:38.8893, lng:-76.9723, tagline:'5th Anniversary', location:'RFK Festival Grounds, Washington DC', dates:'May 30–31, 2026', sortDate:'2026-05-30', endDate:'2026-05-31', days:2, age:'18+', type:'regional', typeLabel:'East Coast', region:'northeast', genres:['EDM','House','Bass','Techno'], desc:'The East Coast\'s crown jewel. Born from Club GLOW — the longest-running electronic music promoter on the East Coast. Three custom stages, immersive art, and the electric energy of the nation\'s capital.', headliners: [], url:'https://projectglow.frontgatetickets.com/', detailPage:'festivals/project-glow.html', featured:true, cardTheme:{ bg:'linear-gradient(145deg, #080d1f 0%, #0a1628 50%, #060c1a 100%)', border:'rgba(0,229,255,0.28)', glow:'rgba(0,229,255,0.06)', accent:'#00e5ff', label:'rgba(0,229,255,0.7)' } },
  { id:'bonnaroo', name:'BONNAROO', tagline:'The Farm', location:'Manchester, TN', dates:'Jun 11–14, 2026 (est)', sortDate:'2026-06-11', endDate:'2026-06-14', days:4, age:'All Ages', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Jam','Indie','Hip-Hop'], desc:'One of America\'s original camping festivals. Strong electronic stages alongside rock, hip-hop, and jam bands in Tennessee.', headliners: [], url:'https://bonnaroo.com', featured:false, detailPage:null, region:'southeast', lat:35.4676, lng:-86.0914 },
  { id:'eforest', name:'ELECTRIC FOREST', lat:43.6324, lng:-86.3447, tagline:'Back in the Michigan Woods', location:'Rothbury, Michigan', dates:'Jun 25–28, 2026', sortDate:'2026-06-25', endDate:'2026-06-28', days:4, age:'All Ages', type:'regional', typeLabel:'Regional', region:'midwest', genres:['Bass','Jam','Psychedelic','House'], desc:'A forest transformed by light and sound. ILLENIUM, Excision, Kaskade, Chris Lake, The String Cheese Incident, Wooli, Odd Mob, and more. Music meets nature meets magic in the Michigan woods.', headliners:['ILLENIUM','Excision','Kaskade','Chris Lake','The String Cheese Incident','Wooli','Odd Mob','SIDEPIECE','Ravenscoon','Mary Droppinz','Bob Moses'], url:'https://electricforest.com', detailPage:'festivals/electric-forest.html', featured:false, cardTheme:{ bg:'linear-gradient(145deg, #040e06 0%, #081808 50%, #040e06 100%)', border:'rgba(61,255,133,0.25)', glow:'rgba(61,255,133,0.06)', accent:'#3dff85', label:'rgba(61,255,133,0.8)' } },
  { id:'tomorrowland', name:'TOMORROWLAND', tagline:'CONSCIENCIA 2026', location:'Boom, Belgium', dates:'Jul 17–19 + Jul 24–26, 2026', sortDate:'2026-07-17', endDate:'2026-07-26', days:6, age:'All Ages', type:'international', typeLabel:'World', region:'international', genres:['EDM','House','Techno','Trance'], desc:'The world\'s most iconic festival returns with CONSCIENCIA — its most ambitious narrative in twenty years. Calvin Harris makes his first-ever Tomorrowland performance. 500+ artists across 16 stages. 400,000+ across two magical weekends in Belgium.', headliners:['Calvin Harris','Martin Garrix','Hardwell','ILLENIUM','David Guetta','Fisher','John Summit','Sara Landry','The Chainsmokers','Sebastian Ingrosso','Armin van Buuren','Nico Moreno','I Hate Models'], url:'https://tomorrowland.com', detailPage:'festivals/tomorrowland.html', featured:true, cardTheme:{ bg:'linear-gradient(145deg, #160f00 0%, #1e1500 50%, #0f0a00 100%)', border:'rgba(255,184,0,0.28)', glow:'rgba(255,184,0,0.06)', accent:'#ffb800', label:'rgba(255,184,0,0.8)' } },
  { id:'lollapalooza', name:'LOLLAPALOOZA', tagline:'Grant Park Goes Off', location:'Grant Park, Chicago IL', dates:'Jul 30 – Aug 2, 2026 (est)', sortDate:'2026-07-30', endDate:'2026-08-02', days:4, age:'All Ages', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Hip-Hop','Rock','Indie'], desc:'Chicago\'s legendary 4-day festival in Grant Park. Strong electronic stage every year in one of America\'s greatest cities.', headliners: [], url:'https://lollapalooza.com', featured:false, detailPage:null, region:'midwest', lat:41.8700, lng:-87.6189 },
  { id:'hard', name:'HARD SUMMER', tagline:'Hollywood Park Goes Off', location:'Hollywood Park, Inglewood CA', dates:'Aug 1–2, 2026', sortDate:'2026-08-01', endDate:'2026-08-02', days:2, age:'18+', type:'mega', typeLabel:'Mega Festival', region:'west', genres:['EDM','Techno','Bass','Hip-Hop'], desc:'LA\'s biggest electronic event. Kali Uchis, Charlotte de Witte, Knock2 B2B Zedd, and more at Hollywood Park.', headliners: [], url:'https://hardfest.com', detailPage:null, featured:false, lat:33.9534, lng:-118.3406 },
  { id:'basscanyon', name:'BASS CANYON', tagline:'Deep Bass in the Gorge', location:'Quincy, Washington', dates:'Aug 14–16, 2026', sortDate:'2026-08-14', endDate:'2026-08-16', days:3, age:'18+', type:'regional', typeLabel:'Regional', region:'west', genres:['Bass','Dubstep','Riddim'], desc:'Excision\'s bass music festival at one of the most spectacular outdoor venues in the Pacific Northwest. Pure, uncut bass music against the Columbia River Gorge.', headliners: [], url:'https://basscanyon.com', detailPage:null, featured:false, lat:47.3673, lng:-120.5947 },
  { id:'burning-man', name:'BURNING MAN', tagline:'The Playa', location:'Black Rock City, NV', dates:'Aug 30 – Sep 7, 2026 (est)', sortDate:'2026-08-30', endDate:'2026-09-07', days:8, age:'All Ages', type:'underground', typeLabel:'Underground', genres:['Techno','House','Psychedelic','Experimental'], desc:'Not a festival — a temporary city of 80,000 built on radical self-expression. 24/7 music, art cars, and underground stages across the Nevada desert. No headliners. No lineup.', headliners: [], url:'https://burningman.org', featured:false, detailPage:null, region:'west', lat:40.7864, lng:-119.2065 },
  { id:'nocturnal-wonderland', name:'NOCTURNAL WONDERLAND', tagline:'The Original', location:'Glen Helen Amphitheater, San Bernardino CA', dates:'Sep 4–5, 2026 (est)', sortDate:'2026-09-04', endDate:'2026-09-05', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['Bass','Techno','House','EDM'], desc:'Insomniac\'s oldest festival. Strong bass and techno programming in SoCal every September.', headliners: [], url:'https://nocturnalwonderland.com', featured:false, detailPage:null, region:'west', lat:34.1967, lng:-117.3703 },
  { id:'imagine', name:'IMAGINE MUSIC FESTIVAL', tagline:'The Southeast EDM Home', location:'Atlanta Motor Speedway, Atlanta GA', dates:'Sep 18–20, 2026 (est)', sortDate:'2026-09-18', endDate:'2026-09-20', days:3, age:'18+', type:'regional', typeLabel:'Regional', genres:['Bass','EDM','House','Dubstep'], desc:'The Southeast\'s biggest electronic festival at Atlanta Motor Speedway. Bass-heavy lineup with on-site camping.', headliners: [], url:'https://imaginefestival.com', featured:false, detailPage:null, region:'southeast', lat:33.3742, lng:-84.5598 },
  { id:'lost-lands', name:'LOST LANDS', tagline:'Excision\'s Dinosaur Kingdom', location:'Legend Valley, Thornville OH', dates:'Oct 2–4, 2026 (est)', sortDate:'2026-10-02', endDate:'2026-10-04', days:3, age:'All Ages', type:'regional', typeLabel:'Regional', genres:['Bass','Dubstep','Riddim','Experimental'], desc:'Excision\'s own bass music festival. The most dedicated bass lineup in North America. Prehistoric theme, massive production, camping on-site. Sells out every year.', headliners: [], url:'https://lostlandsfestival.com', featured:true, detailPage:null, region:'midwest', lat:39.8787, lng:-82.5174 },
  { id:'something-wicked', name:'SOMETHING WICKED', tagline:'Halloween in Houston', location:'NRG Park, Houston TX', dates:'Oct 30–31, 2026 (est)', sortDate:'2026-10-30', endDate:'2026-10-31', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['EDM','Bass','House','Techno'], desc:'Insomniac\'s Halloween festival in Houston. Two nights of costumes and music. The South\'s biggest Halloween EDM event.', headliners: [], url:'https://somethingwickedfest.com', featured:false, detailPage:null, region:'southwest', lat:29.6850, lng:-95.4108 },
  { id:'edc-orlando', name:'EDC ORLANDO', tagline:'Under the Electric Sky — Florida', location:'Tinker Field, Orlando FL', dates:'Nov 7–8, 2026 (est)', sortDate:'2026-11-07', endDate:'2026-11-08', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['EDM','House','Techno','Bass','Trance'], desc:'The East Coast\'s EDC. Same Insomniac production as Las Vegas in a smaller format. Great entry point for Florida and Southeast ravers.', headliners: [], url:'https://orlando.electricdaisycarnival.com', featured:false, detailPage:null, region:'southeast', lat:28.4791, lng:-81.3892 },
  { id:'dreamstate', name:'DREAMSTATE SOCAL', tagline:'The Trance Kingdom', location:'NOS Event Center, San Bernardino CA', dates:'Nov 21–22, 2026 (est)', sortDate:'2026-11-21', endDate:'2026-11-22', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['Trance','Progressive','Psy-Trance'], desc:'North America\'s premier trance festival. Armin van Buuren, Ferry Corsten, Paul van Dyk, and the entire trance family in SoCal.', headliners: [], url:'https://dreamstateusa.com', featured:false, detailPage:null, region:'west', lat:34.1967, lng:-117.3703 },
  { id:'countdown-nye', name:'COUNTDOWN NYE', tagline:'Ring in the New Year', location:'NOS Event Center, San Bernardino CA', dates:'Dec 31, 2026', sortDate:'2026-12-31', endDate:'2026-12-31', days:1, age:'18+', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Bass','Trance'], desc:'Insomniac\'s massive New Year\'s Eve festival. Midnight countdown, confetti, and a stacked lineup. One of the largest NYE events in the US.', headliners: [], url:'https://countdownnye.com', featured:false, detailPage:null, region:'west', lat:34.1967, lng:-117.3703 },
];

const CATEGORIES = [
  { id:'fem-clothing',  label:'Fem Clothing',   icon:'images/categories/icon-fem-clothing.png' },
  { id:'male-clothing', label:'Male Clothing',   icon:'images/categories/icon-male-clothing.png' },
  { id:'shoes',         label:'Shoes',           icon:'images/categories/icon-shoes.png' },
  { id:'accessories',   label:'Accessories',     icon:'images/categories/icon-accessories.png' },
  { id:'kandi',         label:'Kandi',           icon:'images/categories/icon-kandi.png' },
  { id:'jerseys',       label:'Jerseys & Merch', icon:'images/categories/icon-jerseymerch.png' },
  { id:'events',        label:'Events',          icon:'images/categories/icon-events.png' },
  { id:'supplements',   label:'Supplements',     icon:'images/categories/icon-supplements.png', comingSoon:true },
  { id:'gear',          label:'Gear & Audio',    icon:'images/categories/icon-headphones.png', comingSoon:true },
  { id:'lights',        label:'Lights & Toys',   icon:'images/categories/icon-lightsandtoys.png', comingSoon:true },
  { id:'wellness',      label:'Wellness',        icon:'images/categories/icon-wellness.png', comingSoon:true },
];

const BRANDS = [
  // ── FEM CLOTHING ──
  { name:'iHEARTRAVES', badge:'IHR', cat:'fem-clothing', badgeCls:'b-cyan', priceCls:'price-budget',  price:'$',       ship:'~1 week',         loc:'California',     style:'All types, artist collabs',        tags:['fem','bodysuits','sets','spandex','bikini','rts'],                   desc:'One of the biggest US rave clothing retailers. Wide selection across all types.', note:'No returns — store credit only. Sometimes quality issues but will replace items.', ig:'@iheartRaves', url:'https://iheartRaves.com', logo:'https://www.iheartraves.com/favicon.ico', featured:false, sortOrder:0 },
  { name:'FREEDOM RAVE WEAR', badge:'FRW', cat:'fem-clothing', badgeCls:'b-pink', priceCls:'price-mid', price:'$–$$',   ship:'~1 week',         loc:'California',     style:'All types, spandex, bikini, mens',  tags:['fem','male','bodysuits','sets','spandex','bikini','tops','rts'],          desc:'Fan-favourite for quality spandex rave wear. Stocks fem sets AND mens shirts and tank tops.', note:'Highly rated across community feedback.', ig:'@freedomravewear', url:'https://freedomravewear.com', logo:'https://freedomravewear.com/favicon.ico', featured:true, sortOrder:0 },
  { name:'RAGE KAGE', badge:'RK', cat:'fem-clothing', badgeCls:'b-cyan', priceCls:'price-budget',      price:'$',       ship:'1 wk / MTO 3 wks',loc:'California',     style:'Sequin, short sets, babydoll',      tags:['fem','sequin','babydoll','sets','bodysuits','rts','mto'],                 desc:'True to size with long-torso friendly bodysuits. Fan-loved for affordable sequin and babydoll looks.', note:'Long torso friendly. True to size.', ig:'@ragekage', url:'#', featured:false, sortOrder:0 },
  { name:'FESTYBOO', badge:'FBU', cat:'fem-clothing', badgeCls:'b-pink', priceCls:'price-mid',         price:'$–$$',    ship:'Pinned on site',  loc:'Florida',        style:'RTS & MTO — you pick style/color',  tags:['fem','sets','mto','rts','customizable'],                                 desc:'You pick the style and color — highly customizable RTS and MTO sets.', note:'Check pinned post for current shipping timeline.', ig:'@festyboo', url:'#', featured:false, sortOrder:0 },
  { name:'VANISHING FAE', badge:'VF', cat:'fem-clothing', badgeCls:'b-purple', priceCls:'price-luxury', price:'$$$–$$$$',ship:'1–4 weeks',       loc:'California',     style:'Fae, babydoll, sequin sets',        tags:['fem','fae','babydoll','sequin','fairy','sparkly','luxury'],               desc:'High-end, intricate fae and babydoll aesthetics. Community luxury pick.', note:'Check if set is lined — sequins can itch for some wearers.', ig:'@vanishingfae', url:'#', featured:false, sortOrder:0 },
  { name:'ENCHANTRESS COLLECTION', badge:'TEC', cat:'fem-clothing', badgeCls:'b-green', priceCls:'price-mid', price:'$–$$', ship:'1–2 weeks',   loc:'Georgia',        style:'Rompers, pants, dresses, shorts',   tags:['fem','rompers','dresses','pants','shorts','trippy','colorful','rts','sets'],      desc:'Lots of positive community feedback! Colorful trippy pieces at a great price-to-quality ratio.', note:'Lots of positive feedback from the rave community!', ig:'@theenchantresscollection', url:'#', featured:false, sortOrder:0 },
  { name:'NEO4IC', badge:'N4C', cat:'fem-clothing', badgeCls:'b-cyan', priceCls:'price-mid',            price:'$–$$',    ship:'1–2 weeks',       loc:'California',     style:'Techwear, leggings, bodysuits',      tags:['fem','male','techwear','cyberpunk','leggings','bodysuits','techrave'],     desc:'Tech rave and cyberpunk aesthetic. Carries both fem and male styles.', note:'Leggings run small — size up 1–2 sizes.', ig:'@neo4ic', url:'https://neo4ic.com', featured:false, sortOrder:0 },
  { name:'RAVE WONDERLAND', badge:'RWL', cat:'fem-clothing', badgeCls:'b-purple', priceCls:'price-mid',  price:'$–$$',    ship:'~1 week',         loc:'California',     style:'All types',                         tags:['fem','sets','bodysuits','all-types','rts'],                              desc:'Broad selection similar to iHeartRaves. No returns — store credit only.', note:'Weird sizing charts — always check reviews.', ig:'@ravewonderland', url:'https://ravewonderland.com', featured:false, sortOrder:0 },
  // ── NEW FEM CLOTHING ──
  { id:'get-ravy', name:'GET RAVY', badge:'GRV', cat:'fem-clothing', badgeCls:'b-green', priceCls:'price-budget', price:'$', ship:'1–2 weeks', loc:'Texas', style:'Rave sets, basics', tags:['fem','sets','basics','affordable','rts'], desc:'Affordable rave sets with quick turnaround. Also has an Etsy shop.', ig:'@getravy', url:'#', featured:false, sortOrder:0 },
  { id:'tribe-of-ravers', name:'TRIBE OF RAVERS', badge:'TOR', cat:'fem-clothing', badgeCls:'b-pink', priceCls:'price-budget', price:'$', ship:'1–2 weeks', loc:'California', style:'Bell sleeve sets, theme sets, bodysuits', tags:['fem','bell-sleeve','sets','bodysuits','themed','rts'], desc:'Bell sleeve sets, themed looks, and bodysuits. Community-loved California brand.', ig:'@tribeofrvaers', url:'#', featured:false, sortOrder:0 },
  { id:'hailstorm-apparel', name:'HAILSTORM APPAREL', badge:'HS', cat:'fem-clothing', badgeCls:'b-cyan', priceCls:'price-mid', price:'$–$$', ship:'3–4 weeks', loc:'Utah', style:'Bodysuits, sets, pashmina hoodie, sequin sets', tags:['fem','bodysuits','sets','sequin','pashmina','hoodie','pashminas'], desc:'Full range of bodysuits, sequin sets, and the coveted pashmina hoodie. Utah-based.', ig:'@hailstormapparel', url:'#', featured:false, sortOrder:0 },
  { id:'euphoric-rave-wear', name:'EUPHORIC RAVE WEAR', badge:'ERW', cat:'fem-clothing', badgeCls:'b-purple', priceCls:'price-mid', price:'$–$$', ship:'1 wk / MTO 2–3 wks', loc:'Florida', style:'All types, some unisex options', tags:['fem','male','unisex','sets','bodysuits','all-types','rts','mto'], desc:'Florida-based with a wide range of fem and some unisex styles. Good RTS and MTO options.', ig:'@euphoricravewear', url:'#', featured:false, sortOrder:0 },
  { id:'cloud999', name:'CLOUD999', badge:'C9', cat:'fem-clothing', badgeCls:'b-cyan', priceCls:'price-mid', price:'$–$$$$', ship:'MTO 4–6 wks / RTS 1 wk', loc:'USA', style:'Custom sets, chaps, pants, hoods', tags:['fem','custom','mto','rts','chaps','pants','hoods','sets'], desc:'Wide price range from budget to luxury. Custom sets, chaps, pants, and hoods — MTO and RTS options.', ig:'@cloud999', url:'#', featured:false, sortOrder:0 },
  { id:'littlekittyraves', name:'LITTLE KITTY RAVES', badge:'LKR', cat:'fem-clothing', badgeCls:'b-purple', priceCls:'price-high', price:'$$–$$$', ship:'MTO 2–3 weeks', loc:'California', style:'Fae, babydoll, sets', tags:['fem','fae','babydoll','sets','fairy','mto','luxury'], desc:'Fae and babydoll sets from California. Intricate handmade pieces in the higher price range.', ig:'@littlekittyraves', url:'#', featured:false, sortOrder:0 },
  // ── MALE CLOTHING ──
  { name:'PSICODELICO', badge:'PSI', cat:'male-clothing', badgeCls:'b-green', priceCls:'price-budget',  price:'$',       ship:'RTS 1–2 weeks',   loc:'Texas',          style:'Mens shorts, shirts, bodysuits',    tags:['male','fem','shorts','shirts','sets','dresses','bodysuits','rts'],        desc:'Covers both male and fem styles at affordable prices. Great RTS turnaround.', note:'One of the few shops with solid men\'s AND women\'s options.', ig:'@psicodelico', url:'#', featured:false, sortOrder:0 },
  { name:'WEAR JSD', badge:'JSD', cat:'male-clothing', badgeCls:'b-amber', priceCls:'price-mid',         price:'$–$$',    ship:'MTO 2–4 weeks',   loc:'New York',       style:'Handmade MTO — unisex',             tags:['male','fem','mto','handmade','custom','sets','unisex'],                   desc:'Handmade MTO pieces. New York-based quality handmade rave wear for all.', note:'No refunds/returns — MTO. Handmade quality.', ig:'@wearjsd', url:'#', featured:false, sortOrder:0 },
  { name:'LOOSE LUCYS', badge:'LL', cat:'male-clothing', badgeCls:'b-green', priceCls:'price-mid',        price:'$–$$',    ship:'Check website',   loc:'South Carolina', style:'Tiedye sets, haram pants, overalls', tags:['male','fem','unisex','tiedye','hippie','haram-pants','overalls','shorts'],          desc:'Unisex hippie staple. Tie-dye sets, haram pants, overalls — the classic festival look for all genders.', note:'Unisex sizing — check chart carefully.', ig:'@looselucys', url:'#', featured:false, sortOrder:0 },
  { name:'RAGE NATION APPAREL', badge:'RNA', cat:'male-clothing', badgeCls:'b-cyan', priceCls:'price-mid', price:'$–$$',  ship:'1–2 weeks',       loc:'California',     style:'Cybersigilism, joggers, pashminas',  tags:['male','fem','techwear','cyberpunk','joggers','pashminas','cybersigilism'], desc:'Tech-forward streetwear for ravers. Cybersigilism prints, joggers, and pashminas. Stocks both male and female cuts.', ig:'@ragenationapparel', url:'#', featured:false, sortOrder:0 },
  // ── SHOES ──
  { name:'DEMONIA CULT', badge:'DEM', cat:'shoes', badgeCls:'b-purple', priceCls:'price-mid',             price:'$–$$',    ship:'~1 week',         loc:'California',     style:'Gothic boots, platforms, pumps',     tags:['shoes','boots','platforms','goth','gothic','pumps','trainers','heels','platform-boots','gothic-shoes'],    desc:'The go-to for rave shoes. Gothic and alternative boots, platform trainers, heels, and pumps. Wide size range.', note:'Most recommended shoe brand in rave communities.', ig:'@demoniacult', url:'https://demonia.com', logo:'https://www.demonia.com/favicon.ico', featured:false, sortOrder:0 },
  { name:'YRU SHOES', badge:'YRU', cat:'shoes', badgeCls:'b-pink', priceCls:'price-high',                  price:'$–$$$',   ship:'~2 weeks',        loc:'California',     style:'Gothic boots, platforms, trainers',  tags:['shoes','boots','platforms','goth','gothic','trainers','heels','sneakers','platform-boots','chunky-sneakers'], desc:'Chunky platforms, boots, and trainers for the rave floor. Alternative and gothic aesthetic at a range of price points.', note:'Great alternative to Demonias. Wider styles.', ig:'@yrushoes', url:'https://yru.com', logo:'https://www.yru.com/favicon.ico', featured:false, sortOrder:0 },
  // ── ACCESSORIES ──
  { name:'SASSWEAR SHOP', badge:'SSW', cat:'accessories', badgeCls:'b-pink', priceCls:'price-budget',      price:'$',       ship:'1–2 weeks',       loc:'Florida',        style:'Pasties, glow stickers, body jewels', tags:['accessories','pasties','body-jewels','glow','stickers','hair','clips','glow-stickers'],   desc:'Everything glowy, sticky, and sparkly. Pasties, body jewels, glow stickers, and hair clips — the finishing touches.', ig:'@sasswearshop', url:'#', featured:false, sortOrder:0 },
  { name:'PASHMANIAC', badge:'PMN', cat:'accessories', badgeCls:'b-amber', priceCls:'price-budget',         price:'$',       ship:'1–2 weeks',       loc:'USA',            style:'EDM artist pashminas',               tags:['accessories','pashminas','hoodies','wraps','edm','artist','artist-merch'],               desc:'Artist-branded pashminas for EDM fans. One of the most unique accessories in the scene — warm and festival-essential.', note:'The go-to for EDM pashminas.', ig:'@pashmaniac', url:'#', featured:false, sortOrder:0 },
  { name:'KRITTER KLIPS', badge:'KKL', cat:'accessories', badgeCls:'b-pink', priceCls:'price-mid',          price:'$–$$',    ship:'1–2 weeks',       loc:'California',     style:'Hair clips, tails, fans, clothing',  tags:['accessories','hair','clips','tails','fans'],                             desc:'Hair clips, fuzzy tails, fans, and fun accessories.', note:'Mixed reviews — check community feedback first.', ig:'@kritterklips', url:'#', featured:false, sortOrder:0 },
  {
    id: 'first-earth',
    name: 'FIRST EARTH',
    badge: 'FE',
    cat: 'accessories',
    badgeCls: 'b-green',
    priceCls: 'price-mid',
    price: '$$–$$$',
    ship: '1–2 weeks',
    loc: 'USA',
    style: 'Flowstars, flow props, LED poi, orbital',
    tags: ['flowstar','flow-toys','orbital','poi',
           'led-gloves','flow-props','performance'],
    desc: 'One of the most respected flow prop brands in the rave community. Quality flowstars, orbital sets, and LED poi for flow artists at every level.',
    note: 'Check their site for MTO vs RTS availability.',
    ig: '@firstearthflow',
    url: 'https://firstearth.com',
    featured: false,
    sortOrder: 0
  },
  // ── NEW SHOES ──
  { id:'dr-martens', name:'DR. MARTENS', badge:'DM', cat:'shoes', badgeCls:'b-amber', priceCls:'price-mid', price:'$–$$', ship:'~1 week', loc:'Oregon', style:'Combat boots, platform boots', tags:['shoes','boots','combat','platform','grunge','alternative','goth','combat-boots'], desc:'The iconic combat boot. A rave staple for alternative and grunge aesthetics. Wide availability.', ig:'@drmartens', url:'https://drmartens.com', logo:'https://www.drmartens.com/favicon.ico', featured:false, sortOrder:0 },
  { id:'melissa-shoes', name:'MELISSA', badge:'MEL', cat:'shoes', badgeCls:'b-pink', priceCls:'price-mid', price:'$–$$', ship:'~1 week', loc:'USA', style:'Jelly shoes, platform boots, heels, sandals', tags:['shoes','jelly','platform','heels','sandals','colorful','fun'], desc:'Adult jelly shoes — platform boots, heels, and sandals. Playful and perfect for festival looks.', note:'Lower 48 US shipping only.', ig:'@melissashoes', url:'https://melissa.com.br/en', featured:false, sortOrder:0 },
  // ── KANDI ──
  { name:'KANDIES WORLD', badge:'KW', cat:'kandi', badgeCls:'b-cyan', priceCls:'price-budget',              price:'$',       ship:'~1 week',         loc:'Florida',        style:'Beads, perlers, supplies, accessories',tags:['kandi','beads','perlers','supplies','accessories','bracelets','plur','kandi-supplies','premade-kandi'],  desc:'The kandi supply HQ. Beads, perler beads, kandi-making supplies, and pre-made accessories. PLUR from Florida.', note:'Great for stocking up on kandi supplies pre-festival.', ig:'@kandiesworld', url:'#', featured:false, sortOrder:0 },
  { name:'INPLUR', badge:'IPL', cat:'kandi', badgeCls:'b-green', priceCls:'price-budget',                    price:'$',       ship:'~1 week',         loc:'Louisiana',      style:'Premade kandi, perlers',              tags:['kandi','beads','perlers','premade','bracelets','plur','premade-kandi'],                  desc:'Pre-made kandi and perler pieces ready to trade at your next rave. One of the most loved kandi shops in the community.', ig:'@inplur', url:'#', featured:false, sortOrder:0 },
  // ── NEW KANDI ──
  {
    id: 'psyde-quest',
    name: 'PSYDE QUEST',
    badge: 'PQ',
    cat: 'kandi',
    badgeCls: 'b-purple',
    priceCls: 'price-budget',
    price: '$',
    ship: '1–2 weeks',
    loc: 'USA',
    style: 'Rave trading cards — event cards & collectible booster packs',
    tags: ['kandi','trading-cards','collectibles',
           'community','gifting','plur','event-cards'],
    desc: 'Psyde Quest makes official trading cards of dance music — designed to be gifted and traded in-person at shows. Two types: Event Cards (ambassador packs made for specific events) and Serialized Cards (generic collectible booster packs). The mission is genuine human connection first, cool merch second.',
    note: 'Event Cards are where the magic is — bring them to shows and gift them in person. That\'s the whole point.',
    ig: '@psydequestdesigns',
    url: 'https://psydequestdesigns.com',
    logo: 'https://psydequestdesigns.com/cdn/shop/files/Untitled-1_584ceb26-1642-47c1-98c6-e8f67510406c.jpg',
    featured: true,
    sortOrder: 0
  },
  { id:'kandiqueeni', name:'KANDI QUEENI', badge:'KQI', cat:'kandi', badgeCls:'b-pink', priceCls:'price-budget', price:'$', ship:'~1 week', loc:'Utah', style:'Beads, perlers, supplies, accessories', tags:['kandi','beads','perlers','supplies','accessories','plur'], desc:'Utah-based kandi supply shop. Beads, perlers, and accessories for your kandi-making needs.', ig:'@kandiqueeni', url:'#', featured:false, sortOrder:0 },
  { id:'karmakandishop', name:'KARMA KANDI SHOP', badge:'KKS', cat:'kandi', badgeCls:'b-green', priceCls:'price-budget', price:'$', ship:'~1 week', loc:'California', style:'Kandi bracelets, stickers', tags:['kandi','beads','stickers','bracelets','plur','accessories','kandi-supplies'], desc:'California kandi shop with bracelets and festival stickers. PLUR all the way.', ig:'@karmakandishop', url:'#', featured:false, sortOrder:0 },
  { id:'nocturnal-print-shop', name:'NOCTURNAL PRINT SHOP', badge:'NPS', cat:'kandi', badgeCls:'b-cyan', priceCls:'price-budget', price:'$', ship:'~1 week', loc:'California', style:'EDM artist kandi beads', tags:['kandi','beads','edm','artist','perlers','merchandise','edm-artist-kandi'], desc:'EDM artist-themed kandi beads. Perfect for trading at your favorite artist\'s set.', ig:'@nocturnalprintshop', url:'#', featured:false, sortOrder:0 },
  // ── JERSEYS / MERCH ──
  { id:'electric-family', name:'ELECTRIC FAMILY', badge:'EF', cat:'jerseys', badgeCls:'b-cyan', priceCls:'price-mid', price:'$–$$', ship:'~1 week', loc:'USA', style:'Official artist merch — bracelets, tees, accessories', tags:['merch','artist','bracelets','accessories','edm','official','artist-merch','edm-merch'], desc:'Official merch collaborations with artists like BTSM, Slander, and more. High-quality artist bracelets and tees.', ig:'@electricfamily', url:'https://electricfamily.com', logo:'https://electricfamily.com/favicon.ico', featured:false, sortOrder:0 },
  { id:'scummy-bears', name:'SCUMMY BEARS', badge:'SCB', cat:'jerseys', badgeCls:'b-purple', priceCls:'price-mid', price:'$$', ship:'~1 week', loc:'USA', style:'Official artist merch — jerseys, pants, shirts', tags:['merch','artist','jerseys','shirts','pants','official','kompany','sullivan-king','artist-merch','edm-jerseys'], desc:'Official merch for artists like Kompany and Sullivan King. Jerseys, pants, and shirts with a bass music edge.', ig:'@scummybears', url:'#', featured:false, sortOrder:0 },
  // ── EVENTS ──
  { name:'INSOMNIAC', badge:'INS', cat:'events', badgeCls:'b-cyan', priceCls:'price-varies',                price:'Varies',  ship:'N/A',             loc:'California',     style:'Festival production, merch, collabs', tags:['events','festivals','merch','edm','edc','production'],                   desc:'Behind EDC, Project GLOW, Dreamstate, and more. The biggest name in US rave production.', ig:'@insomniac_events', url:'https://insomniac.com', logo:'https://insomniac.com/favicon.ico', featured:false, sortOrder:0 },
];

const PLURGASM_DATA = {};
PLURGASM_DATA.plurDefinitions = [
  {
    letter: 'P',
    word: 'PEACE',
    icon: '☮',
    color: 'var(--pink)',
    borderColor: 'rgba(255,45,120,0.4)',
    bgColor: 'rgba(255,45,120,0.06)',
    lines: [
      'No judgment. No ego.',
      'No gatekeeping.',
      'Just the music and the people.'
    ]
  },
  {
    letter: 'L',
    word: 'LOVE',
    icon: '♥',
    color: 'var(--cyan)',
    borderColor: 'rgba(0,229,255,0.4)',
    bgColor: 'rgba(0,229,255,0.06)',
    lines: [
      'For strangers.',
      'For the moment.',
      'For the floor.'
    ]
  },
  {
    letter: 'U',
    word: 'UNITY',
    icon: '⬡',
    color: 'var(--purple)',
    borderColor: 'rgba(182,77,255,0.4)',
    bgColor: 'rgba(182,77,255,0.06)',
    lines: [
      'One crowd. One energy.',
      'Every genre.',
      'Every body. Every vibe.'
    ]
  },
  {
    letter: 'R',
    word: 'RESPECT',
    icon: '✦',
    color: 'var(--green)',
    borderColor: 'rgba(61,255,133,0.4)',
    bgColor: 'rgba(61,255,133,0.06)',
    lines: [
      'For space. For consent.',
      'For each other.',
      'Leave it better than you found it.'
    ]
  }
];

PLURGASM_DATA.blogPosts = [

  {
    id: 'post-001',
    title: 'Project GLOW 2026 — The Complete Guide',
    slug: 'project-glow-2026-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-05-15',
    category: 'festival-news',
    coverImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
    excerpt: 'Everything you need to know before heading to RFK Festival Grounds this May 30-31. Full lineup breakdown by stage, what to bring, how to get there, and what makes DC\'s biggest rave worth the trip.',
    published: true,
    featured: true,
    body: `
      <p>Project GLOW returns to Washington DC for its <strong>5th anniversary</strong> on May 30–31, 2026 at RFK Festival Grounds — and this year feels different. The lineup is the strongest it has ever been, the production is scaling up, and if you have been sleeping on this festival, this is the year to wake up.</p>

      <p>Born from <strong>Club GLOW</strong> — the longest-running electronic music promoter on the East Coast — Project GLOW has grown from a local DC staple into one of the most respected regional festivals in the country. Here is everything you need to know before you go.</p>

      <img src="https://images.unsplash.com/photo-1571266752756-0fe20de8dde1?w=800&q=80" alt="Festival crowd under lights" style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

      <h2>The Lineup</h2>

      <h3>🌐 Eternal Stage</h3>
      <p>The main stage lineup for Day 1 is headlined by <strong>Eric Prydz</strong> — a name that needs no introduction. If you have never seen a Prydz set live, this is one of the most production-heavy shows in electronic music. Plan your Day 1 around being at the Eternal Stage by 9:45PM. Supporting him: Disco Lines, Sara Landry, DJ Mandy, Lilly Palmer, and Kream.</p>
      <p>Day 2 closes with <strong>Porter Robinson</strong> followed by <strong>Excision B2B Sullivan King</strong> — two completely different energies back to back. Gryffin plays sunset. Alleycvt, Ninajirachi, YDG, and Probcause round out the afternoon.</p>

      <h3>🔊 Pulse Stage</h3>
      <p>The bass stage is where it gets chaotic. <strong>Zeds Dead</strong> headlines Day 1 and <strong>Mau P</strong> closes Day 2. G Jones B2B Eprom, Wooli, Dimension, and Ray Volpe fill out a stage that runs hard from 1PM to 11PM both days.</p>

      <h3>🌿 Secret Garden</h3>
      <p>The underground stage is the hidden gem of Project GLOW. <strong>Nicole Moudaber B2B Chasewest</strong> closes Day 1 in what should be one of the sets of the weekend. Day 2 brings Spencer Brown B2B Qrion, Cosmic Gate, Eli & Fur, and Cassian. If you are into deeper, darker sounds — spend time here.</p>

      <img src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80" alt="Concert stage lights" style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

      <h2>Getting There</h2>
      <p>RFK Festival Grounds sits just off the <strong>Stadium-Armory Metro stop</strong> on the Orange, Blue, and Silver lines. If you are coming from anywhere in the DC/Maryland/Virginia area, metro is genuinely your best option. Parking is available but limited and expensive — budget an extra 30 minutes if you drive.</p>
      <p>Rideshare dropoff zones are clearly marked on the festival map. Uber and Lyft surge hard after the show ends — consider walking to a nearby street before requesting or splitting with your group.</p>

      <h2>What to Bring</h2>
      <ul style="margin:16px 0 16px 20px;line-height:2;">
        <li>Small backpack (under 18 inches)</li>
        <li>Sealed water bottle up to 32oz — refill stations are throughout the venue</li>
        <li>Earplugs — seriously, your ears will thank you</li>
        <li>Sunscreen (no aerosol)</li>
        <li>Kandi and flow toys (no sharp edges)</li>
        <li>Phone charger / portable battery</li>
        <li>Cash and card — both accepted inside</li>
      </ul>

      <h2>What NOT to Bring</h2>
      <ul style="margin:16px 0 16px 20px;line-height:2;">
        <li>Outside food or alcohol</li>
        <li>Professional cameras with detachable lenses</li>
        <li>Drones, laser pointers, selfie sticks</li>
        <li>Umbrellas with metal tips</li>
        <li>Large bags over 18 inches</li>
      </ul>

      <h2>Harm Reduction</h2>
      <p><strong>DanceSafe will be on-site both days.</strong> Free water stations are located throughout the venue. Medical tents with trained staff are clearly marked on the festival map. Cool-down zones are available if you need to step away from the crowd.</p>
      <p>Project GLOW has a Good Samaritan policy — if someone needs help, seek it. You will not get in trouble for doing the right thing.</p>

      <h2>Tickets</h2>
      <p>GA passes start at <strong>$119 all-in</strong> for both days. GA+ ($139) includes expedited entry and access to air-conditioned rest areas. VIP starts at $249. Layaway is available through Front Gate Tickets with a $5 deposit. Buy directly from the official site — never from third-party resellers or Facebook groups.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(0,229,255,0.06);border-left:3px solid #00e5ff;"><strong>Bottom line:</strong> Project GLOW is one of the best-run festivals on the East Coast. The stages are close together, the crowd is welcoming, and the production punches above its weight. If you are within driving distance of DC — go.</p>
    `
  },

  {
    id: 'post-002',
    title: 'EDC Las Vegas 2026 — What to Expect at the 30th Anniversary',
    slug: 'edc-las-vegas-2026-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-05-01',
    category: 'festival-news',
    coverImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
    excerpt: 'EDC turns 30 in 2026 and it\'s shaping up to be the biggest edition ever. 9 stages, 200+ artists, 500,000 headliners under the electric sky of Las Vegas. Here\'s what you need to know.',
    published: true,
    featured: false,
    body: `
      <p>Electric Daisy Carnival turns <strong>30 years old in 2026</strong> — and Insomniac is pulling out everything for the anniversary. EDC Las Vegas runs <strong>May 15–17</strong> at the Las Vegas Motor Speedway, and if you have ever considered going, this is the year.</p>

      <p>EDC is not just a festival. It is the single largest electronic music event in North America, and arguably the most important. Three nights. Nine stages. 200+ artists. 500,000 headliners from around the world, all under what Insomniac calls "the electric sky."</p>

      <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Massive festival crowd at night" style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

      <h2>The Stages</h2>
      <p>EDC's stage lineup is unlike anything else in festival production:</p>
      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>kineticFIELD</strong> — the iconic mainstage. The centerpiece of the entire festival. Production that takes a full year to build.</li>
        <li><strong>cosmicMEADOW</strong> — the second mainstage. Typically progressive house and techno.</li>
        <li><strong>circuitGROUNDS</strong> — bass and hard dance. One of the loudest stages on the property.</li>
        <li><strong>neonGARDEN</strong> — the underground techno stage. Dark, sweaty, and relentless.</li>
        <li><strong>wasteLAND</strong> — the experimental and hard techno stage. Industrial and raw.</li>
        <li><strong>basspod</strong> — dubstep, riddim, and bass music</li>
        <li><strong>quantumVALLEY</strong> — trance and progressive</li>
        <li><strong>stereoBLOOM</strong> — house and disco</li>
        <li><strong>pixel forest</strong> — art installation with live music</li>
      </ul>

      <h2>Confirmed Headliners</h2>
      <p>The 30th anniversary lineup features Martin Garrix, Tiësto, Alesso, Excision, Seven Lions, Fisher, Eric Prydz, and Subtronics — with more names being announced in waves. Full lineup drops typically happen 2–3 months before the event on the official EDC website.</p>

      <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80" alt="DJ on stage" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>Surviving EDC — The Practical Guide</h2>
      <p>EDC is a 3-night outdoor desert festival. It runs from roughly <strong>7PM to 5AM</strong> each night. The Las Vegas desert can be cold at night even in May — temperatures drop significantly after midnight. Here is what veteran headliners recommend:</p>

      <h3>Sleep and Recovery</h3>
      <p>You will not sleep much. Plan for it. Book your hotel with blackout curtains and try to get 6+ hours during the day before each night. Most experienced EDC attendees stay at hotels directly on the Las Vegas Strip and use the official shuttle service to the speedway — this is strongly recommended over driving or rideshare.</p>

      <h3>Hydration and Heat</h3>
      <p>Hydration packs (up to 70oz) are allowed and highly recommended. The Speedway is massive — you will walk miles each night. Bring electrolyte packets. Water refill stations are throughout the venue and free. Do not drink alcohol without matching it with water.</p>

      <h3>What to Wear</h3>
      <p>Layers. Desert nights go from warm to cold fast. A pashmina or light jacket is essential. Comfortable shoes you can stand and dance in for 8+ hours. Bring earplugs — at EDC this is non-negotiable, the stages are loud.</p>

      <h2>Tickets and Cost</h2>
      <p>GA 3-day passes start around <strong>$459 all-in</strong> with layaway available through Front Gate Tickets. GA+ and VIP options exist at higher price points. Hotel packages are available through Insomniac's official travel partners — these sell out fast and are worth booking early if you want on-site convenience.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(182,77,255,0.06);border-left:3px solid #b64dff;"><strong>30 years is a milestone.</strong> EDC 2026 will be remembered. If there is one festival to splurge on this decade, this is it.</p>
    `
  },

  {
    id: 'post-003',
    title: 'PLUR 101 — A Beginner\'s Guide to Rave Culture',
    slug: 'plur-101-beginners-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-04-20',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=800&q=80',
    excerpt: 'New to raving? Here\'s everything you need to know about the culture, etiquette, kandi trading, and why PLUR isn\'t just a slogan — it\'s how we actually look out for each other on the dancefloor.',
    published: true,
    featured: false,
    body: `
      <p>Everyone starts somewhere. Maybe a friend invited you to your first festival and you had no idea what to expect. Maybe you have been curious about rave culture for a while and finally decided to dive in. Either way — welcome. You are in the right place.</p>

      <p>This guide covers everything a first-time raver needs to know: what PLUR actually means, how kandi trading works, dancefloor etiquette, and how to have a safe and genuinely amazing time.</p>

      <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80" alt="Colorful kandi bracelets" style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

      <h2>What is PLUR?</h2>
      <p>PLUR stands for <strong>Peace, Love, Unity, Respect</strong>. It started in the early 90s New York rave scene as both a greeting and a philosophy — and it became the backbone of global rave culture for a reason.</p>

      <p>PLUR is not just a slogan. It is how the rave community actually operates at its best:</p>

      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Peace</strong> — no judgment, no gatekeeping, no ego. The dancefloor is a judgment-free zone. It doesn\'t matter what you\'re wearing, what music you like, or how long you\'ve been going to raves.</li>
        <li><strong>Love</strong> — unconditional love for strangers. The kind that makes someone hand you water when you look overheated, or check on you if you\'re sitting alone outside a tent.</li>
        <li><strong>Unity</strong> — one crowd, one energy. Every background, every genre preference, every body. The dancefloor erases all of it.</li>
        <li><strong>Respect</strong> — for personal space, for consent, for the music, and for each other. Respect means looking out for people around you.</li>
      </ul>

      <h2>Kandi — What It Is and How Trading Works</h2>
      <p>Kandi are the colorful beaded bracelets you will see ravers wearing stacked up their arms. Each one was handmade by someone, worn, and traded. Every piece has a story.</p>

      <p>Trading kandi is one of the most beloved rituals in rave culture. It happens through the <strong>PLUR handshake</strong> — a four-step gesture that physically represents each letter:</p>

      <ol style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Peace</strong> — press your flat palms together (like a namaste)</li>
        <li><strong>Love</strong> — interlock your fingers together</li>
        <li><strong>Unity</strong> — hook your thumbs together, hands still joined</li>
        <li><strong>Respect</strong> — slide the kandi bracelet from your wrist to theirs</li>
      </ol>

      <p>A few etiquette rules: always ask before initiating. Accept a trade graciously even if the piece isn\'t your style — it\'s about the connection, not the bracelet. Never demand kandi or trade with someone who seems uncomfortable. You can always politely decline.</p>

      <h2>Dancefloor Etiquette</h2>
      <p>Rave etiquette is mostly common sense, but here are the things that matter:</p>

      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Watch your space.</strong> Festivals are crowded. Be aware of the people around you, especially near the front of stages.</li>
        <li><strong>Ask before touching.</strong> Consent is non-negotiable. Always ask before hugging, dancing with, or touching anyone.</li>
        <li><strong>Check on people.</strong> If someone looks unwell, check on them. If they need help, find a medic — that is what they are there for.</li>
        <li><strong>Don\'t push to the front.</strong> The people who got there early earned their spot.</li>
        <li><strong>Leave space for flow artists.</strong> If someone is spinning or doing flow arts, give them room — it is genuinely beautiful to watch and dangerous to interrupt.</li>
      </ul>

      <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" alt="Festival crowd dancing" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>Safety Basics for Your First Rave</h2>
      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li>Tell someone where you\'re going and when you expect to be back</li>
        <li>Go with at least one person you trust</li>
        <li>Agree on a meeting spot before you go in — phones die and crowds split groups</li>
        <li>Drink water. Roughly 500ml per hour if you\'re dancing</li>
        <li>Bring earplugs. The music is loud and hearing damage is permanent</li>
        <li>Know where the medical tent is when you first arrive</li>
        <li>DanceSafe is at most major festivals — find them for harm reduction information</li>
      </ul>

      <h2>What to Wear</h2>
      <p>Rave fashion is expressive and there are truly no rules — but practically speaking: wear shoes you can stand in for hours, bring a layer if you\'re at an outdoor event, and if you\'re in a crowd, wear something you\'re comfortable moving in.</p>

      <p>Kandi, LED accessories, and flow toys are all welcome at most festivals. Check the specific event\'s rules on what\'s allowed before you go.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(61,255,133,0.06);border-left:3px solid #3dff85;"><strong>The most important thing:</strong> show up with an open mind and genuine respect for the people around you. The rave community is one of the most welcoming on earth when PLUR is actually practiced. We are glad you\'re here.</p>
    `
  },

  {
    id: 'post-004',
    title: 'Electric Forest 2026 — Why This is Unlike Any Other Festival',
    slug: 'electric-forest-2026-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-04-10',
    category: 'festival-news',
    coverImage: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80',
    excerpt: 'Electric Forest is not just a festival — it\'s a world built inside a Michigan pine forest. ILLENIUM, GRiZ, and Subtronics headline a 4-day experience that is genuinely unlike anything else.',
    published: true,
    featured: false,
    body: `
      <p>There is Electric Forest, and then there is every other festival. That sounds like hype — but ask anyone who has been and they will tell you the same thing. The forest changes people.</p>

      <p>Electric Forest runs <strong>June 25–28, 2026</strong> at Double JJ Resort in Rothbury, Michigan. It is a 4-day camping festival built around and inside <strong>Sherwood Forest</strong> — a real pine forest that the production team spends an entire year transforming into something that defies description.</p>

      <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80" alt="Forest lights at night" style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

      <h2>Sherwood Forest — The Heart of It All</h2>
      <p>Sherwood Forest is not a stage. It is a 24-hour art installation — a winding network of paths through the trees, each one lit differently, filled with art pieces, secret stages, performers, and moments that happen nowhere else on earth.</p>

      <p>You might turn a corner at 3AM and find a string quartet playing in a clearing. Or a fire performer. Or an entire crowd of people dancing to a DJ set underneath a canopy of lights strung through the trees. The forest runs all night and it is worth staying up for.</p>

      <h2>The 2026 Lineup</h2>
      <p>The headline acts for 2026 include <strong>ILLENIUM</strong>, <strong>GRiZ performing twice</strong> (a tradition at EF), and <strong>Subtronics</strong>. The booking that has everyone talking: <strong>Shaquille O\'Neal B2B T-Pain</strong> in a DJ set that will absolutely be unhinged in the best possible way.</p>

      <p>Electric Forest\'s strength is always the depth of the lineup — bass music, jam bands, psychedelic electronic, house, and experimental acts fill 4 days across multiple stages. There is always something happening worth seeing.</p>

      <h2>Camping is Part of the Experience</h2>
      <p>Electric Forest is a camping festival in the truest sense. <strong>On-site camping is strongly recommended</strong> — the experience of waking up in the forest, walking to stages, and spending 4 full days in this environment is fundamentally different from commuting in each day.</p>

      <p>General camping is included with GA Camping passes. Good Life (VIP) camping offers upgraded amenities. The campgrounds have showers, though lines get long — shower at off-peak hours (early morning or late afternoon).</p>

      <img src="https://images.unsplash.com/photo-1478827387698-1527781a4887?w=800&q=80" alt="Camping at festival" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>Practical Tips from Veterans</h2>
      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Bring a wagon.</strong> You will haul gear from your car to your campsite and a wagon makes it manageable. Many people rent them on-site.</li>
        <li><strong>Michigan weather is unpredictable.</strong> Pack a poncho and a layer. June can be beautiful and it can also rain hard for a full day.</li>
        <li><strong>Get lost in the forest.</strong> The scheduled FOMO is real but some of the best Electric Forest moments happen when you wander with no plan.</li>
        <li><strong>Bring lights for your campsite.</strong> String lights, LED stakes — anything to mark your tent so you can find it at 4AM.</li>
        <li><strong>The Good Life Lounge</strong> is worth it if you can afford it — AC, private bathrooms, and a shaded viewing area.</li>
      </ul>

      <h2>Tickets</h2>
      <p>GA Camping passes start around <strong>$399</strong>. Good Life (VIP) from $799. Day tickets are available at a lower price point if you cannot commit to all 4 days. Layaway is available — Electric Forest typically sells out well before the event, so do not wait.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(61,255,133,0.06);border-left:3px solid #3dff85;"><strong>If you can only go to one new festival this year, make it Electric Forest.</strong> It is the kind of experience that becomes a reference point — before and after.</p>
    `
  },

  {
    id: 'post-006',
    title: 'The Coachella Effect — What Happens When the Mainstream Finds Our Festivals',
    slug: 'coachella-effect-plur-culture',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-05-28',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
    excerpt: 'Subtronics went viral on TikTok. Coachella booked Fisher. Bass music is everywhere. A new wave of fans is discovering our festivals — and some of them have never heard of PLUR. Here\'s what that means for the culture, and what we all have a responsibility to do about it.',
    published: true,
    featured: true,
    body: `
    <p>Something shifted in the last two years. Bass music started showing up in mainstream playlists. Subtronics went viral on TikTok. Coachella booked Fisher, then four Anyma sets. Your coworker who has never been to a festival suddenly bought EDC tickets. Your little brother discovered Excision through a YouTube algorithm rabbit hole.</p>

    <p>This is not a bad thing. Growth is how culture survives. But it comes with a tension that anyone who has been in the rave scene for more than a few years can feel in real time — especially at festivals like Project Glow, which used to be a tight-knit East Coast family event and now draws crowds that include people who have genuinely never heard the word PLUR.</p>

    <img src="https://images.unsplash.com/photo-1571266752756-0fe20de8dde1?w=800&q=80" alt="Festival crowd at night" style="width:100%;height:300px;object-fit:cover;margin:24px 0;border-radius:2px;">

    <h2>What the Coachella Effect Actually Is</h2>

    <p>Coachella has always been a mainstream festival with an electronic component. But in 2024 and 2025 something changed — the electronic acts stopped being a side attraction and started being the reason people went. The Sahara tent became the most talked-about stage. Artists like Subtronics, Anyma, and Dom Dolla were pulling crowds that rivaled the headliners.</p>

    <p>The result is a generation of fans who discovered electronic music through Coachella, through TikTok clips, through Spotify algorithmic playlists — and then bought tickets to underground and mid-sized festivals that were built on an entirely different set of values. They came for the music. They had no idea the music came with a culture.</p>

    <p>That is not their fault. Nobody told them. And that is partly our fault as a community.</p>

    <h2>What You Actually Notice in the Crowds</h2>

    <p>If you have been to Project Glow, Movement, or any regional festival in the last two years, you have probably felt it. The pushing at the rail. The phones held up blocking everyone behind them for forty-five minutes. The group that bulldozes through a crowd mid-set like they are walking through a shopping mall. The person who steps on your feet and does not turn around.</p>

    <p>None of these people are villains. Most of them just do not know. They went to Coachella where the crowd behavior is different, or they went to a stadium show, and they carried those habits with them into spaces that operate on different rules. Rules that were never written down anywhere — because for a long time, everyone in the room already knew them.</p>

    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" alt="Crowd at electronic music festival" style="width:100%;height:280px;object-fit:cover;margin:24px 0;border-radius:2px;">

    <h2>Why PLUR Is Not Just a Slogan</h2>

    <p>Peace, Love, Unity, Respect. It sounds like something you would print on a tote bag. But PLUR was never a marketing slogan — it was a code of conduct that developed organically in the early 90s New York rave scene because the people in those rooms needed one. Raves were illegal. The crowds were in basements and warehouses. Everyone was in an unfamiliar situation together, and the culture that emerged said: we look after each other here.</p>

    <p>That ethos is what makes a rave different from a concert. At a concert you go to be entertained. At a rave you are part of the experience. The energy of the crowd is the experience. When the person next to you is looking out for you, when a stranger hands you water, when someone apologizes for bumping into you and you end up talking for an hour — that is PLUR working. That is what people who discovered this culture through a TikTok clip do not know they are missing.</p>

    <p>And honestly? Once they experience it, most of them love it. The problem is someone has to introduce them to it.</p>

    <h2>The Unwritten Rules — Written Down</h2>

    <p>Consider this the handbook nobody gave you when you bought your first festival ticket.</p>

    <h3>Moving Through Crowds</h3>
    <p>When you need to move through a crowd during a set — and sometimes you do — you say excuse me before you move, not after. You touch people on the shoulder gently to signal you are coming through. You say thank you when they make space. If you accidentally step on someone or knock into them, you turn around, you make eye contact, and you apologize. This is not optional. This is the baseline.</p>

    <p>The crowd is not an obstacle between you and the rail. The crowd is people who got there first and have as much right to their space as you do to yours.</p>

    <h3>Phone Culture</h3>
    <p>Record the drop. Film the moment. Nobody is telling you to put your phone away forever. But holding your phone up for full sets, blocking the view of everyone behind you, is one of the most common complaints in the rave community right now and it comes almost entirely from the newer wave of festival attendees. Be present. Film thirty seconds. Put it down. The memory in your body is better than the video on your phone.</p>

    <h3>Flow Artists and Space</h3>
    <p>If someone is spinning poi, using a flowstar, or doing any kind of flow art near you — give them room. Do not crowd into their space out of curiosity. Watch from a respectful distance. Flow artists are part of the event. Some of them have practiced for years. Bumping into someone mid-flow with an expensive LED prop is not a small thing.</p>

    <h3>Looking Out</h3>
    <p>If someone near you looks unwell — too hot, too disoriented, too quiet — check on them. Ask if they are okay. If they are not, find medical staff. Do not step over someone sitting on the ground and assume someone else will handle it. PLUR is not a personal philosophy. It is a collective one. It only works when everyone participates.</p>

    <h3>The Rail</h3>
    <p>Pushing to the front mid-set is one of the most universally disliked behaviors in rave crowds. The people at the rail got there early. They planned for it. They gave up their spot elsewhere for it. Forcing your way through to join them mid-set is taking something that was not yours to take. If you want the rail, get there early.</p>

    <h3>Kandi</h3>
    <p>If someone initiates the PLUR handshake with you, participate or decline gracefully — do not leave them hanging. If you receive kandi, accept it with genuine appreciation even if you do not know what it is. Someone made it by hand, wore it, and chose you. That is a meaningful gesture in this culture. Treat it like one.</p>

    <img src="https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=800&q=80" alt="Colorful kandi bracelets" style="width:100%;height:260px;object-fit:cover;margin:24px 0;border-radius:2px;">

    <h2>What the Community Owes Newcomers</h2>

    <p>Here is the part that is harder to say: the rave community is not without blame here. Gatekeeping is real. The attitude of "you should already know this" is real. Newcomers who show up not knowing the culture are sometimes made to feel unwelcome rather than educated.</p>

    <p>That is not PLUR either.</p>

    <p>If you see someone doing something that violates the norms of the space — phones up, pushing through crowds, not giving flow artists room — the response that serves the culture is not to glare at them or complain to your friends. It is to gently, non-aggressively, say something. "Hey, just so you know, at raves we usually do it this way." Most people, when told the culture exists, want to be part of it. They just needed someone to tell them.</p>

    <p>Subtronics going viral is good. More people discovering bass music is good. Project Glow selling out is good. A bigger tent means more resources, more artists, more production. But a bigger tent also means more people who need to be welcomed into what the tent actually stands for.</p>

    <p>That is on all of us.</p>

    <h2>To the New Ravers Reading This</h2>

    <p>Welcome. Genuinely. The fact that you found this article — whether through an algorithm or a friend or a Google search after your first festival — means you are already doing something right. You are curious about the culture, not just the music.</p>

    <p>The music is why you came. The culture is why you will stay.</p>

    <p>PLUR is not a test you pass or fail. It is a practice. It is imperfect and it is ongoing and some days the crowd is beautiful and some days it is frustrating and that is true of every community that has ever existed. But at its best — at its actual best, the version that exists at 2AM when the bass is rattling your chest and a stranger hands you their last electrolyte packet because you look like you need it — there is nothing like it anywhere else in the world.</p>

    <p>That is what we are protecting when we talk about PLUR. Not a slogan. A feeling. And it belongs to anyone willing to show up for it.</p>

    <p style="margin-top:32px;padding:20px;background:rgba(0,229,255,0.06);border-left:3px solid #00e5ff;line-height:1.8;">
      <strong>New to raving?</strong> Check out our
      <a href="blog-post.html?id=post-003" style="color:var(--cyan);">PLUR 101 guide</a>
      and our <a href="safety.html" style="color:var(--cyan);">Safety & PLUR page</a>
      for everything you need to know before your first festival.
    </p>
  `
  },

  {
    id: 'post-005',
    title: 'The Best Rave Brands of 2026 — Community Picks',
    slug: 'best-rave-brands-2026',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-03-28',
    category: 'fashion',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    excerpt: 'We pulled together the most-recommended rave clothing, kandi, and accessory brands from community feedback. From affordable everyday sets to high-end fae pieces — here is what the community actually rates.',
    published: true,
    featured: false,
    body: `
      <p>Every season the rave fashion conversation cycles through the same questions: who is actually worth buying from? Which brands have quality issues? Who ships on time? Who has good return policies?</p>

      <p>We pulled this list from real community feedback across rave subreddits, Facebook groups, and direct submissions. These are not sponsored picks — they are brands the community actually rates.</p>

      <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" alt="Festival fashion outfits" style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

      <h2>Best for Everyday Rave Sets — All Price Points</h2>

      <h3>Freedom Rave Wear — California · $–$$</h3>
      <p>Consistently the most-recommended brand in the community for a reason. Quality spandex sets at reasonable prices, ships within a week, and one of the few brands that stocks solid options for all body types. They also carry men\'s shirts and tank tops — rare in the rave clothing space.</p>

      <h3>iHeartRaves — California · $</h3>
      <p>The biggest rave clothing retailer in the US. Wide selection, artist collabs, and affordable prices. Note: no returns, only store credit. Quality can be inconsistent but they will replace defective items. Size generally runs true.</p>

      <h3>Rage Kage — California · $</h3>
      <p>Specifically beloved for long-torso-friendly bodysuits and affordable sequin looks. True to size, quick shipping, and MTO options available if you want something specific. Great entry point for fancier looks without the luxury price tag.</p>

      <h2>Best for Fae, Babydoll, and High-End Looks</h2>

      <h3>Vanishing Fae — California · $$$–$$$$</h3>
      <p>The community luxury pick. Intricate fae and babydoll aesthetics handmade at a premium price point. If you are investing in a statement piece, Vanishing Fae is consistently cited as worth it. Check if sets are lined before purchasing — some sequin pieces can cause irritation.</p>

      <h3>Little Kitty Raves — California · $$–$$$</h3>
      <p>MTO fae and babydoll sets with a dedicated following. Expect 2–3 week turnaround for made-to-order pieces. The quality is consistently praised across community reviews.</p>

      <h2>Best Shoes</h2>

      <h3>Demonia Cult — California · $–$$</h3>
      <p>Still the undisputed king of rave shoes. Platform boots, trainers, pumps, and Gothic styles in a wide size range. Ships within a week. If you are buying your first pair of platform shoes for a festival, start here.</p>

      <h3>YRU — California · $–$$$</h3>
      <p>A strong Demonia alternative with wider styles and a higher price ceiling. Chunky platforms, boots, and trainers with more experimental colorways. Worth browsing if you want something different.</p>

      <h2>Best Kandi Supplies</h2>

      <h3>Kandies World — Florida · $</h3>
      <p>The kandi supply headquarters. If you make your own kandi, this is your first stop — beads, perler beads, elastic, and accessories. Ships fast, prices are fair.</p>

      <h3>inPLUR — Louisiana · $</h3>
      <p>For those who want premade kandi ready to trade without making it themselves. One of the most loved kandi shops in the community. PLUR through and through.</p>

      <img src="https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800&q=80" alt="Rave accessories and kandi" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>A Note on Red Flags</h2>
      <p>The rave clothing space has a dropshipping problem. Some warning signs: the website has no clear location listed, the same items appear on AliExpress at a fraction of the price, shipping takes 4–6 weeks with no explanation, and reviews are suspiciously generic.</p>
      <p>Always check community reviews before buying from an unfamiliar brand. The Facebook groups and Reddit\'s r/festivals are good resources. When in doubt — stick to community-tested names.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(0,229,255,0.06);border-left:3px solid #00e5ff;"><strong>All brands listed in this article are in the PLURGASM directory</strong> with full details on pricing, shipping times, and community notes. Click any brand name to see more.</p>
    `
  }

];

window.PLURGASM_DATA.festivals  = FESTIVALS;
window.PLURGASM_DATA.brands     = BRANDS;
window.PLURGASM_DATA.categories = CATEGORIES;

PLURGASM_DATA.itemFilters = [
  {
    group: 'Flow & LED',
    items: [
      { label: 'Flowstar',     tag: 'flowstar' },
      { label: 'LED Gloves',   tag: 'led-gloves' },
      { label: 'Pixel Whip',   tag: 'pixel-whip' },
      { label: 'Orbital',      tag: 'orbital' },
      { label: 'Poi',          tag: 'poi' },
      { label: 'Flow Toys',    tag: 'flow-toys' },
    ]
  },
  {
    group: 'Kandi',
    items: [
      { label: 'Kandi Bracelets', tag: 'kandi' },
      { label: 'Perler Beads',    tag: 'perlers' },
      { label: 'Kandi Supplies',  tag: 'kandi-supplies' },
      { label: 'Premade Kandi',   tag: 'premade-kandi' },
      { label: 'EDM Artist Kandi',tag: 'edm-artist-kandi' },
    ]
  },
  {
    group: 'Shoes',
    items: [
      { label: 'Platform Boots',   tag: 'platform-boots' },
      { label: 'Combat Boots',     tag: 'boots' },
      { label: 'Chunky Sneakers',  tag: 'sneakers' },
      { label: 'Heels',            tag: 'heels' },
      { label: 'Jelly Shoes',      tag: 'jelly' },
    ]
  },
  {
    group: 'Accessories',
    items: [
      { label: 'Pasties',       tag: 'pasties' },
      { label: 'Body Jewels',   tag: 'body-jewels' },
      { label: 'Pashminas',     tag: 'pashminas' },
      { label: 'Hair Clips',    tag: 'hair' },
      { label: 'Body Chains',   tag: 'body-accessories' },
      { label: 'Fans',          tag: 'fans' },
      { label: 'Glow Stickers', tag: 'glow-stickers' },
    ]
  },
  {
    group: 'Clothing',
    items: [
      { label: 'Bodysuits',      tag: 'bodysuits' },
      { label: 'Two-Piece Sets', tag: 'sets' },
      { label: 'Bell Sleeves',   tag: 'bell-sleeve' },
      { label: 'Festival Shorts',tag: 'shorts' },
      { label: 'Rompers',        tag: 'rompers' },
      { label: 'Sequin',         tag: 'sequin' },
      { label: 'Fae / Babydoll', tag: 'fae' },
      { label: 'Techwear',       tag: 'techwear' },
    ]
  },
  {
    group: 'Merch & Other',
    items: [
      { label: 'Artist Merch',  tag: 'artist-merch' },
      { label: 'EDM Jerseys',   tag: 'jerseys' },
      { label: 'Braids',        tag: 'braids' },
      { label: 'Earplugs',      tag: 'earplugs' },
    ]
  }
];

const SOCIALS = [
  { handle:'@insomniac_events', platform:'Instagram', type:'Brand',    desc:'Official Insomniac page. Festival announcements, lineups, and behind-the-scenes from EDC and beyond.', featured:false },
  { handle:'@projectglowfest',  platform:'Instagram', type:'Festival', desc:'All official updates for Project GLOW DC — lineups, artist spotlights, and more.',                     featured:true  },
  { handle:'@edc_lasvegas',     platform:'Instagram', type:'Festival', desc:'The official EDC LV page. Your home for 30th anniversary content and headliner reveals.',                featured:false },
  { handle:'@freedomravewear',  platform:'Instagram', type:'Brand',    desc:'Freedom Rave Wear\'s official page. New drops, festival looks, and styling inspo from the community.',   featured:false },
  { handle:'@electricforest',   platform:'Instagram', type:'Festival', featured:false, desc:'Official Electric Forest. Forest magic, lineup announcements, and art from Rothbury Michigan.' },
  { handle:'@movementdetroit',  platform:'Instagram', type:'Festival', featured:false, desc:'Official Movement Detroit. Techno from the birthplace of the genre.' },
  { handle:'@dancesafe',        platform:'Instagram', type:'Safety',   featured:true,  desc:'The most important account in the rave community. Harm reduction, drug checking, and real information with zero judgment.' },
  { handle:'@demoniacult',      platform:'Instagram', type:'Brand',    featured:false, desc:'The official Demonia Cult page. New styles, platform boots, and alternative footwear drops.' },
];

PLURGASM_DATA.featuredPost = {
  url: 'https://www.instagram.com/p/DZCWVwWM7fm/',
  handle: '@plurgasm',
  platform: 'instagram',
  caption: '',
  active: true
};

PLURGASM_DATA.brandOfWeek = {
  name: 'PSYDE QUEST',
  badge: '✦',
  tagline: 'Kandi · Community · USA',
  image: 'https://psydequestdesigns.com/cdn/shop/files/Untitled-1_584ceb26-1642-47c1-98c6-e8f67510406c.jpg',
  desc: 'The official trading card of dance music. Psyde Quest makes beautifully designed cards meant to be gifted in-person at shows — a physical token of connection that lives in the PLUR spirit. Bring a pack to your next festival and watch what happens.',
  ig: '@psydequestdesigns',
  url: 'https://psydequestdesigns.com',
  cat: 'Community'
};
