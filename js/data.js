window.PLURGASM_DATA = window.PLURGASM_DATA || {};

const FESTIVALS = [
  { id:'edc-mexico', name:'EDC MEXICO', tagline:'Under the Electric Sky — CDMX', location:'Autódromo Hermanos Rodríguez, Mexico City', dates:'Feb 27 – Mar 1, 2026', sortDate:'2026-02-27', endDate:'2026-03-01', days:3, age:'18+', type:'international', typeLabel:'International', genres:['EDM','House','Techno','Trance','Bass'], desc:'One of the largest EDM events in Latin America. Insomniac production quality in Mexico City\'s iconic Formula 1 circuit.', headliners: [], url:'https://mexico.electricdaisycarnival.com', featured:false, detailPage:null, region:'international', image:null },
  { id:'tomorrowland-winter', name:'TOMORROWLAND WINTER', tagline:'The Ski Resort Edition', location:'Alpe d\'Huez, France', dates:'Mar 21–28, 2026', sortDate:'2026-03-21', endDate:'2026-03-28', days:7, age:'18+', type:'international', typeLabel:'International', genres:['EDM','Techno','House','Trance','DnB'], desc:'Tomorrowland\'s ski resort spin-off in the French Alps. Charlotte de Witte, Steve Aoki, Nina Kraviz headlining.', headliners: [], url:'https://tomorrowlandwinter.com', featured:false, detailPage:null, region:'international', image:null },
  { id:'ultra-miami', name:'ULTRA MIAMI', tagline:'World\'s Premier Electronic Festival', location:'Bayfront Park, Miami FL', dates:'Mar 27–29, 2026', sortDate:'2026-03-27', endDate:'2026-03-29', days:3, age:'18+', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Trance','Bass'], desc:'The world\'s No.2 festival. Carl Cox, Eric Prydz, Armin van Buuren, Major Lazer, John Summit, Sara Landry, ILLENIUM across 7 stages at Bayfront Park.', headliners: [], url:'https://ultramusicfestival.com', featured:true, detailPage:null, region:'southeast', lat:25.7751, lng:-80.1869, image:null },
  { id:'coachella', name:'COACHELLA', tagline:'Valley of the Sun', location:'Empire Polo Club, Indio CA', dates:'Apr 10–12 + Apr 17–19, 2026', sortDate:'2026-04-10', endDate:'2026-04-19', days:6, age:'All Ages', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Indie','Hip-Hop'], desc:'America\'s most famous festival. Anyma headlines the electronic Sahara tent alongside Disclosure. Strong electronic programming across the California desert.', headliners: [], url:'https://coachella.com', featured:false, detailPage:null, region:'west', lat:33.6803, lng:-116.2372, image:null },
  { id:'beyond-wonderland', name:'BEYOND WONDERLAND', tagline:'Fall Down the Rabbit Hole', location:'Shoreline Amphitheatre, Mountain View CA', dates:'Apr 17–18, 2026 (est)', sortDate:'2026-04-17', endDate:'2026-04-18', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['EDM','Bass','House','Techno'], desc:'Insomniac\'s Alice in Wonderland themed festival in the Bay Area. Immersive themed stages and strong lineup.', headliners: [], url:'https://beyondwonderland.com', featured:false, detailPage:null, region:'west', lat:37.4261, lng:-122.0802, image:null },
  { id:'edc', name:'EDC LAS VEGAS', lat:36.2722, lng:-115.0107, tagline:'30th Anniversary — kineticJOURNEY', location:'Las Vegas Motor Speedway, NV', dates:'May 15–17, 2026', sortDate:'2026-05-15', endDate:'2026-05-17', days:3, age:'18+', type:'mega', typeLabel:'Mega Festival', region:'west', genres:['EDM','House','Techno','Trance','Bass'], desc:'The crown jewel of North American raves celebrates 30 years. Every pass sold out within 24 hours — a festival record. Free YouTube livestream available. Theme: kineticJOURNEY. 17 stages. 500,000 headliners under the electric sky.', headliners:['Martin Garrix','Charlotte de Witte','Porter Robinson','Fisher','John Summit','Above & Beyond','Kaskade','Armin van Buuren','Zedd','Chris Lake','Tiësto','Mau P'], url:'https://lasvegas.electricdaisycarnival.com', detailPage:'festivals/edc-las-vegas.html', featured:true, cardTheme:{ bg:'linear-gradient(145deg, #10081e 0%, #180a2e 50%, #0c0618 100%)', border:'rgba(182,77,255,0.3)', glow:'rgba(182,77,255,0.07)', accent:'#b64dff', label:'rgba(182,77,255,0.8)' }, image:null },
  { id:'lightning-in-a-bottle', name:'LIGHTNING IN A BOTTLE', tagline:'The Conscious Festival', location:'Central California', dates:'May 20–25, 2026 (est)', sortDate:'2026-05-20', endDate:'2026-05-25', days:5, age:'All Ages', type:'underground', typeLabel:'Underground', genres:['Psychedelic','House','Bass','Jam'], desc:'A conscious camping festival blending electronic music, art, yoga, and community. One of the most beloved boutique festivals in the US.', headliners: [], url:'https://lightninginabottle.org', featured:false, detailPage:null, region:'west', lat:35.7989, lng:-119.7532, image:null },
  { id:'movement', name:'MOVEMENT DETROIT', lat:42.3291, lng:-83.0458, tagline:'20 Years at the Birthplace', location:'Hart Plaza, Detroit MI', dates:'May 23–25, 2026', sortDate:'2026-05-23', endDate:'2026-05-25', days:3, age:'18+', type:'underground', typeLabel:'Underground', region:'midwest', genres:['Techno','House','Industrial'], desc:'Marking 20 years at the birthplace of techno. Raw. Industrial. Undeniably Detroit. Carl Cox, Richie Hawtin, Dom Dolla, Danny Brown, Nia Archives, Ellen Allien, and 115+ more artists.', headliners:['Carl Cox','Richie Hawtin','Dom Dolla','Danny Brown','Barry Can\'t Swim','Green Velvet','Carl Craig B2B Cajmere','Boys Noize B2B MCR-T','Nia Archives','Claude VonStroke','The Dare','Ellen Allien','Hot Since 82'], url:'https://movement.us', detailPage:'festivals/movement-detroit.html', featured:false, cardTheme:{ bg:'linear-gradient(145deg, #080810 0%, #0d0818 50%, #060610 100%)', border:'rgba(182,77,255,0.25)', glow:'rgba(120,60,255,0.07)', accent:'#b64dff', label:'rgba(182,77,255,0.7)' }, image:null },
  { id:'project-glow', name:'PROJECT GLOW', lat:38.8893, lng:-76.9723, tagline:'5th Anniversary', location:'RFK Festival Grounds, Washington DC', dates:'May 30–31, 2026', sortDate:'2026-05-30', endDate:'2026-05-31', days:2, age:'18+', type:'regional', typeLabel:'East Coast', region:'northeast', genres:['EDM','House','Bass','Techno'], desc:'The East Coast\'s crown jewel. Born from Club GLOW — the longest-running electronic music promoter on the East Coast. Three custom stages, immersive art, and the electric energy of the nation\'s capital.', headliners: [], url:'https://projectglow.frontgatetickets.com/', detailPage:'festivals/project-glow.html', featured:true, cardTheme:{ bg:'linear-gradient(145deg, #080d1f 0%, #0a1628 50%, #060c1a 100%)', border:'rgba(0,229,255,0.28)', glow:'rgba(0,229,255,0.06)', accent:'#00e5ff', label:'rgba(0,229,255,0.7)' }, image:null },
  { id:'bonnaroo', name:'BONNAROO', tagline:'The Farm', location:'Manchester, TN', dates:'Jun 11–14, 2026 (est)', sortDate:'2026-06-11', endDate:'2026-06-14', days:4, age:'All Ages', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Jam','Indie','Hip-Hop'], desc:'One of America\'s original camping festivals. Strong electronic stages alongside rock, hip-hop, and jam bands in Tennessee.', headliners: [], url:'https://bonnaroo.com', featured:false, detailPage:null, region:'southeast', lat:35.4676, lng:-86.0914, image:null },
  { id:'eforest', name:'ELECTRIC FOREST', lat:43.6324, lng:-86.3447, tagline:'Back in the Michigan Woods', location:'Rothbury, Michigan', dates:'Jun 25–28, 2026', sortDate:'2026-06-25', endDate:'2026-06-28', days:4, age:'All Ages', type:'regional', typeLabel:'Regional', region:'midwest', genres:['Bass','Jam','Psychedelic','House'], desc:'A forest transformed by light and sound. ILLENIUM, Excision, Kaskade, Chris Lake, The String Cheese Incident, Wooli, Odd Mob, and more. Music meets nature meets magic in the Michigan woods.', headliners:['ILLENIUM','Excision','Kaskade','Chris Lake','The String Cheese Incident','Wooli','Odd Mob','SIDEPIECE','Ravenscoon','Mary Droppinz','Bob Moses'], url:'https://electricforest.com', detailPage:'festivals/electric-forest.html', featured:false, cardTheme:{ bg:'linear-gradient(145deg, #040e06 0%, #081808 50%, #040e06 100%)', border:'rgba(61,255,133,0.25)', glow:'rgba(61,255,133,0.06)', accent:'#3dff85', label:'rgba(61,255,133,0.8)' }, image:'images/festivals/electric-forest.webp' },
  { id:'tomorrowland', name:'TOMORROWLAND', tagline:'CONSCIENCIA 2026', location:'Boom, Belgium', dates:'Jul 17–19 + Jul 24–26, 2026', sortDate:'2026-07-17', endDate:'2026-07-26', days:6, age:'All Ages', type:'international', typeLabel:'World', region:'international', genres:['EDM','House','Techno','Trance'], desc:'The world\'s most iconic festival returns with CONSCIENCIA — its most ambitious narrative in twenty years. Calvin Harris makes his first-ever Tomorrowland performance. 500+ artists across 16 stages. 400,000+ across two magical weekends in Belgium.', headliners:['Calvin Harris','Martin Garrix','Hardwell','ILLENIUM','David Guetta','Fisher','John Summit','Sara Landry','The Chainsmokers','Sebastian Ingrosso','Armin van Buuren','Nico Moreno','I Hate Models'], url:'https://tomorrowland.com', detailPage:'festivals/tomorrowland.html', featured:true, cardTheme:{ bg:'linear-gradient(145deg, #160f00 0%, #1e1500 50%, #0f0a00 100%)', border:'rgba(255,184,0,0.28)', glow:'rgba(255,184,0,0.06)', accent:'#ffb800', label:'rgba(255,184,0,0.8)' }, image:'images/festivals/tomorrowland.webp' },
  { id:'dirtybird-northern-nights', name:'DIRTYBIRD CAMPOUT X NORTHERN NIGHTS', tagline:'Redwoods, river, and bass', location:"Cook's Valley Campground, Piercy, CA", dates:'July 17–19, 2026', sortDate:'2026-07-17', endDate:'2026-07-19', days:3, age:'18+', type:'regional', typeLabel:'Camping Festival', genres:['Bass','House','Techno','Dubstep','Experimental'], desc:'Two Northern California camping institutions joined into one — three days under towering redwoods on the Eel River, blending Dirtybird house with Northern Nights bass and a swim-between-sets vibe.', url:'https://northernnights.org/', featured:false, detailPage:null, cardTheme:null, region:'west', lat:39.9785, lng:-123.7892, headliners:['CloZee','Zeds Dead','Justin Martin','Tape B','LP Giobbi','Walker & Royce','Flowdan','Ivy Lab'], image:null },
  { id:'lollapalooza', name:'LOLLAPALOOZA', tagline:'Grant Park Goes Off', location:'Grant Park, Chicago IL', dates:'Jul 30 – Aug 2, 2026 (est)', sortDate:'2026-07-30', endDate:'2026-08-02', days:4, age:'All Ages', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Hip-Hop','Rock','Indie'], desc:'Chicago\'s legendary 4-day festival in Grant Park. Strong electronic stage every year in one of America\'s greatest cities.', headliners: [], url:'https://lollapalooza.com', featured:false, detailPage:null, region:'midwest', lat:41.8700, lng:-87.6189, image:'images/festivals/lollapalooza.webp' },
  { id:'hard', name:'HARD SUMMER', tagline:'HARD Summer Music Festival', location:'Hollywood Park, Inglewood, CA', dates:'August 1–2, 2026', sortDate:'2026-08-01', endDate:'2026-08-02', days:2, age:'18+', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Bass','Hip-Hop'], desc:'A genre-spanning LA blowout from Insomniac, returning to the 300-acre Hollywood Park next to SoFi Stadium for two days of electronic, bass, and hip-hop across multiple stages.', url:'https://www.hardsummer.com/', featured:false, detailPage:null, cardTheme:null, region:'west', lat:33.9530, lng:-118.3392, headliners:['Zedd','Knock2','DJ Snake','Kali Uchis','Mau P','Charlotte de Witte','Amelie Lens','RL Grime'], image:'images/festivals/hard-summer.webp' },
  { id:'elements-festival', name:'ELEMENTS FESTIVAL', tagline:'An Escape Unlike Any Other', location:'Pocono Raceway, Long Pond, PA', dates:'August 7–9, 2026', sortDate:'2026-08-07', endDate:'2026-08-09', days:3, age:'18+', type:'regional', typeLabel:'Regional Festival', genres:['Bass','House','Techno','Dubstep','DnB','Trance','Experimental'], desc:'Now in its ninth year, Elements transforms the forested grounds of Pocono Raceway into an immersive camping festival built around elemental stages, large-scale art installations, art cars, and wellness programming — spanning bass, house, techno, drum & bass, and experimental electronic.', url:'https://www.elementsfest.us/', featured:false, detailPage:null, cardTheme:null, region:'northeast', lat:41.0539, lng:-75.5113, headliners:['Above & Beyond','Excision','Porter Robinson','Chris Lake','Subtronics','Sub Focus','Charlotte de Witte','Ganja White Night'], image:null },
  { id:'ilesoniq', name:'ÎLESONIQ', tagline:'Parc Jean-Drapeau', location:'Parc Jean-Drapeau, Montréal, QC', dates:'Aug 8–9, 2026', sortDate:'2026-08-08', endDate:'2026-08-09', days:2, age:'18+', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Bass','Trance'], desc:"Montréal's massive two-day electronic festival on the island of Parc Jean-Drapeau, drawing global headliners across house, techno, bass and trance. Aug 7 opens with ÎLESONIQ in the City.", url:'https://ilesoniq.com', featured:false, detailPage:null, cardTheme:null, region:'canada', lat:45.5167, lng:-73.5333, headliners:['Above & Beyond','Deadmau5','Sub Focus','Boris Brejcha','Dom Dolla','Seven Lions','Chris Lake','Gryffin'], image:null },
  { id:'basscanyon', name:'BASS CANYON', tagline:'Deep Bass in the Gorge', location:'Quincy, Washington', dates:'Aug 14–16, 2026', sortDate:'2026-08-14', endDate:'2026-08-16', days:3, age:'18+', type:'regional', typeLabel:'Regional', region:'west', genres:['Bass','Dubstep','Riddim'], desc:'Excision\'s bass music festival at one of the most spectacular outdoor venues in the Pacific Northwest. Pure, uncut bass music against the Columbia River Gorge.', headliners: [], url:'https://basscanyon.com', detailPage:null, featured:false, lat:47.3673, lng:-120.5947, image:null },
  { id:'breakaway-mass', name:'BREAKAWAY MASS', tagline:'Breakaway Music Festival', location:'The Palladium, Worcester, MA', dates:'August 21–22, 2026', sortDate:'2026-08-21', endDate:'2026-08-22', days:2, age:'All Ages', type:'regional', typeLabel:'Regional Festival', genres:['EDM','House','Bass','Techno'], desc:'The Northeast stop of Breakaway — the largest touring electronic festival in the country — bringing big-name dance acts and multi-stage production to Worcester for two days.', url:'https://www.breakawayfestival.com/', featured:false, detailPage:null, cardTheme:null, region:'northeast', lat:42.2626, lng:-71.8023, headliners:[], image:null },
  { id:'burning-man', name:'BURNING MAN', tagline:'The Playa', location:'Black Rock City, NV', dates:'Aug 30 – Sep 7, 2026 (est)', sortDate:'2026-08-30', endDate:'2026-09-07', days:8, age:'All Ages', type:'underground', typeLabel:'Underground', genres:['Techno','House','Psychedelic','Experimental'], desc:'Not a festival — a temporary city of 80,000 built on radical self-expression. 24/7 music, art cars, and underground stages across the Nevada desert. No headliners. No lineup.', headliners: [], url:'https://burningman.org', featured:false, detailPage:null, region:'west', lat:40.7864, lng:-119.2065, image:null },
  { id:'nocturnal-wonderland', name:'NOCTURNAL WONDERLAND', tagline:'The Original', location:'Glen Helen Amphitheater, San Bernardino CA', dates:'Sep 4–5, 2026 (est)', sortDate:'2026-09-04', endDate:'2026-09-05', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['Bass','Techno','House','EDM'], desc:'Insomniac\'s oldest festival. Strong bass and techno programming in SoCal every September.', headliners: [], url:'https://nocturnalwonderland.com', featured:false, detailPage:null, region:'west', lat:34.1967, lng:-117.3703, image:null },
  { id:'imagine', name:'IMAGINE MUSIC FESTIVAL', tagline:'The Southeast EDM Home', location:'Atlanta Motor Speedway, Atlanta GA', dates:'Sep 18–20, 2026 (est)', sortDate:'2026-09-18', endDate:'2026-09-20', days:3, age:'18+', type:'regional', typeLabel:'Regional', genres:['Bass','EDM','House','Dubstep'], desc:'The Southeast\'s biggest electronic festival at Atlanta Motor Speedway. Bass-heavy lineup with on-site camping.', headliners: [], url:'https://imaginefestival.com', featured:false, detailPage:null, region:'southeast', lat:33.3742, lng:-84.5598, image:null },
  { id:'breakaway-carolina', name:'BREAKAWAY CAROLINA', tagline:'Breakaway Music Festival', location:'zMAX Dragway, Concord, NC', dates:'September 25–26, 2026', sortDate:'2026-09-25', endDate:'2026-09-26', days:2, age:'18+', type:'regional', typeLabel:'Regional Festival', genres:['EDM','House','Bass','Techno'], desc:'The longest-running stop on the Breakaway tour returns to Charlotte Motor Speedway for two days of house, bass, and dance — its biggest Carolina edition yet.', url:'https://www.breakawayfestival.com/festival/carolina-2026', featured:false, detailPage:null, cardTheme:null, region:'southeast', lat:35.3540, lng:-80.6829, headliners:['Tiësto','Chris Lake','Cloonee','San Holo','What So Not','TroyBoi','Daily Bread','Hamdi'], image:null },
  { id:'lost-lands', name:'LOST LANDS', tagline:'Excision\'s Dinosaur Kingdom', location:'Legend Valley, Thornville OH', dates:'Oct 2–4, 2026 (est)', sortDate:'2026-10-02', endDate:'2026-10-04', days:3, age:'All Ages', type:'regional', typeLabel:'Regional', genres:['Bass','Dubstep','Riddim','Experimental'], desc:'Excision\'s own bass music festival. The most dedicated bass lineup in North America. Prehistoric theme, massive production, camping on-site. Sells out every year.', headliners: [], url:'https://lostlandsfestival.com', featured:true, detailPage:null, region:'midwest', lat:39.8787, lng:-82.5174, image:'images/festivals/lost-lands.webp' },
  { id:'something-wicked', name:'SOMETHING WICKED', tagline:'Halloween in Houston', location:'NRG Park, Houston TX', dates:'Oct 30–31, 2026 (est)', sortDate:'2026-10-30', endDate:'2026-10-31', days:2, age:'18+', type:'regional', typeLabel:'Regional', genres:['EDM','Bass','House','Techno'], desc:'Insomniac\'s Halloween festival in Houston. Two nights of costumes and music. The South\'s biggest Halloween EDM event.', headliners: [], url:'https://somethingwickedfest.com', featured:false, detailPage:null, region:'southwest', lat:29.6850, lng:-95.4108, image:null },
  { id:'escape-halloween', name:'ESCAPE HALLOWEEN', tagline:'Psycho Circus', location:'NOS Events Center, San Bernardino, CA', dates:'October 30–31, 2026', sortDate:'2026-10-30', endDate:'2026-10-31', days:2, age:'18+', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Bass','Trance'], desc:'The biggest Halloween rave in North America — Insomniac turns the NOS Events Center into a horror-themed playground of costumed chaos and top electronic talent over Halloween weekend.', url:'https://escapehalloween.com/', featured:false, detailPage:null, cardTheme:null, region:'west', lat:34.0975, lng:-117.2873, headliners:[], image:null },
  { id:'edc-orlando', name:'EDC ORLANDO', tagline:'Under the Electric Sky — Florida', location:'Tinker Field, Orlando FL', dates:'Nov 6–8, 2026', sortDate:'2026-11-06', endDate:'2026-11-08', days:3, age:'18+', type:'regional', typeLabel:'Regional', genres:['EDM','House','Techno','Bass','Trance'], desc:'The East Coast\'s EDC. Same Insomniac production as Las Vegas in a smaller format. Great entry point for Florida and Southeast ravers.', headliners: ['Martin Garrix','David Guetta','Hardwell','Kaskade','Alesso','Steve Aoki','Alison Wonderland','SLANDER','San Holo','TroyBoi','Boys Noize','Of The Trees'], url:'https://orlando.electricdaisycarnival.com', featured:false, detailPage:null, region:'southeast', lat:28.4791, lng:-81.3892, image:null },
  { id:'dreamstate', name:'DREAMSTATE SOCAL', tagline:'All-trance, all weekend', location:'Queen Mary Waterfront, Long Beach, CA', dates:'November 20–21, 2026', sortDate:'2026-11-20', endDate:'2026-11-21', days:2, age:'18+', type:'regional', typeLabel:'Regional Festival', genres:['Trance','Techno'], desc:'An all-trance festival on the Long Beach waterfront by the Queen Mary — two days of euphoric melodies and the biggest names in the genre, from Insomniac.', url:'https://socal.dreamstateusa.com/', featured:false, detailPage:null, cardTheme:null, region:'west', lat:33.7518, lng:-118.1903, headliners:[], image:null },
  { id:'countdown-nye', name:'COUNTDOWN NYE', tagline:'Ring in the New Year', location:'NOS Event Center, San Bernardino CA', dates:'Dec 31, 2026', sortDate:'2026-12-31', endDate:'2026-12-31', days:1, age:'18+', type:'mega', typeLabel:'Mega Festival', genres:['EDM','House','Techno','Bass','Trance'], desc:'Insomniac\'s massive New Year\'s Eve festival. Midnight countdown, confetti, and a stacked lineup. One of the largest NYE events in the US.', headliners: [], url:'https://countdownnye.com', featured:false, detailPage:null, region:'west', lat:34.1967, lng:-117.3703, image:null },
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
  {
    id: 'trippysquid',
    name: 'Trippy Squid',
    badge: 'TS',
    logo: '/images/brands/trippysquid.webp',
    cat: 'accessories',
    badgeCls: 'b-purple',
    priceCls: 'price-budget',
    price: '$',
    ship: 'Free US shipping',
    loc: 'USA',
    style: 'Handmade UV-reactive flowstars & ravewear',
    tags: ['flowstar','flow toys','uv','ravewear','led'],
    desc: 'Founder-run rave brand making handmade, UV-reactive flowstars at some of the best prices around, plus ravewear and accessories. Free shipping on US orders.',
    note: 'Use code PLURGASM for 10% off',
    ig: '@trippysquidraver',
    url: 'https://trippysquid.com/?ref=Plurgasm',
    featured: true,
    sortOrder: 0,
    warning: null
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

PLURGASM_DATA.blogPosts = [

  {
    id: 'electric-forest-2026-evacuated',
    title: 'Electric Forest 2026 Evacuated as Severe Storms Shut Down the Final Night',
    slug: 'electric-forest-2026-evacuated-storm',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-28',
    category: 'festival-news',
    coverImage: 'images/electric-forest-2026-storm.webp',
    excerpt: 'Tens of thousands were evacuated from Electric Forest on its final night as a severe storm line rolled in off Lake Michigan, cutting Griz’s set short. Here is what happened.',
    published: true,
    featured: true,
    body: `<p>Electric Forest 2026 ended not with a closing set, but with an evacuation order. On Sunday night, June 28, tens of thousands of festivalgoers were sent streaming out of the Double JJ Resort in Rothbury, Michigan as a line of severe storms pushed in off Lake Michigan on the festival’s final evening.</p>

<h2>The storms rolled in fast</h2>
<p>A long band of storms tracked across the lake into Muskegon and Oceana counties and the wider West Michigan area, some of it potentially severe. Lightning lit the sky and heavy rain started to fall as the system closed in. The evacuation order went out around 8:45 p.m. — right as the crowd packed Sherwood Court for Michigan native Griz and his much-anticipated Golden Hours set. He was only about half an hour in when the call came.</p>
<p>The alert was blunt and to the point: severe weather approaching, exit the way you came, shelter in your vehicle or a protected area. Festivalgoers turned and headed for the exits, filtering back toward the campground and other cover. Organizers told everyone to watch the official Electric Forest app for updates on whether the grounds would reopen.</p>
<h2>What the night was supposed to be</h2>
<p>The final night had one of the weekend’s biggest lineups still to come, with music scheduled until roughly 2 a.m. Monday and headlining sets from Kaskade, Illenium, and LSDREAM on the board. The evacuation threw all of it into question. It also capped a weekend that had been running full-throttle — Saturday night’s late hours stretched until 4 a.m.</p>
<p>This isn’t the first time weather has cut Electric Forest’s final day short. Severe storms have forced the festival to pull the plug on its closing stretch in past years too, a recurring hazard of a late-June outdoor event in the Midwest.</p>
<h2>Part of a brutal stretch for festivals</h2>
<p>Electric Forest is now the second major festival in a matter of days to be shut down by extreme weather. Just before this, <a href="https://plurgasm.com/blog-post?id=defqon1-2026-cancelled-heat">Defqon.1 in the Netherlands was cancelled entirely</a> after the country issued its first-ever Code Red warning for extreme heat. Different hemisphere of the weather spectrum — one fried by heat, one drowned by storms — but the same takeaway: outdoor festivals are increasingly at the mercy of volatile, dangerous weather, and organizers are being forced to make hard calls in real time.</p>
<h2>If you’re ever in a festival evacuation</h2>
<p>Storm evacuations are not a buzzkill to grumble through — lightning and high winds at an open-air venue are genuinely lethal, and the safest place is almost never the dancefloor. A few things worth keeping in your head:</p>
<ul>
<li><strong>Move immediately, don’t wait it out.</strong> The gap between “looks fine” and a lightning strike is short. Follow the order the first time.</li>
<li><strong>A hard-topped vehicle is real shelter; a tent or canopy is not.</strong> Get to your car if you can.</li>
<li><strong>Stay off high ground and away from metal, poles, and stage rigging.</strong></li>
<li><strong>Keep your group together and check the official app</strong> rather than chasing rumors about whether things reopen.</li>
</ul>
<h2>A heavier note from this weekend</h2>
<p>Separately, and far more soberly: Michigan State Police confirmed that the body of a newborn was found Sunday morning in a portable restroom in the festival’s camping area, discovered by a restroom-servicing employee during routine maintenance. Authorities say there is no known threat to the public and have released no further details as the investigation continues. Anyone who was in the area and may have relevant information has been asked to contact the Michigan State Police. Our thoughts are with everyone affected.</p>
<p>To everyone who made the trek to the Forest this year — get home safe, look out for the people next to you, and hold the good moments close. That’s the whole point of this thing we do.</p>`
  },

  {
    id: 'defqon1-2026-cancelled-heat',
    title: 'Defqon.1 2026 Cancelled: How a Historic Code Red Shut Down the World’s Biggest Hardstyle Festival',
    slug: 'defqon-1-2026-cancelled-heat',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-26',
    category: 'festival-news',
    coverImage: 'https://images.unsplash.com/photo-1612852098567-8b5d42ee6a52?w=800&q=80',
    excerpt: 'Defqon.1 2026 was called off mid-weekend after the Netherlands issued its first-ever Code Red heat warning. Here is what happened, why it was the right call, and what it signals for outdoor raves everywhere.',
    published: true,
    featured: true,
    body: `<p>The unthinkable happened. On Friday, June 26, Q-dance pulled the plug on the rest of Defqon.1 2026 in Biddinghuizen, Netherlands — the largest hard dance festival on Earth — with tens of thousands of campers already on the grounds. The reason was not a lineup collapse or a logistical failure. It was the weather.</p>

<h2>The first Code Red for heat in Dutch history</h2>

<p>The Royal Netherlands Meteorological Institute (KNMI) issued a Code Red warning for extreme heat, the first time the country has ever done so for high temperatures rather than storms or snow. Forecasts called for 36–39°C across much of the country, with isolated pockets pushing toward 40°C (104°F). A Code Red in the Netherlands is not triggered by temperature alone — it factors in the broader threat to public safety, emergency services, and critical infrastructure. With that warning in place and authorities on board, Q-dance said it had no choice but to cancel the remaining days.</p>

<h2>It did not happen all at once</h2>

<p>The cancellation came in stages. The day before, organizers had already scrapped Friday and Saturday day tickets, trimming the crowd down to weekend campers in an attempt to keep the event running at a safer capacity. When the Code Red landed, that compromise was no longer enough. The festival that draws more than 250,000 fans from over 100 countries each year went from a fully operational site — stages built, artists ready, gates open — to a shutdown in a matter of hours.</p>

<h2>The human cost</h2>

<p>This is the part that stings. Defqon.1 is a pilgrimage. Fans plan for it for months, book flights and accommodation far in advance, and travel from across the globe — including a contingent of American Weekend Warriors who flew transatlantic for a lifelong-bucket-list weekend. Many got the cancellation notice while already on site, mid-trip, with non-refundable flights home days away. Reports from the campground described stunned silence, and in some pockets, frustration that spilled over into unrest. For the artists, several of whom were set to debut new music on the festival’s coveted RED stage, a year of buildup evaporated overnight.</p>

<h2>What happens now</h2>

<ul>
<li><strong>Refunds:</strong> Q-dance confirmed all tickets bought through official channels will be refunded, with early refund requests opening July 2.</li>
<li><strong>Getting home safely:</strong> The campgrounds and essential facilities stayed open Friday so attendees could rest and arrange their departure rather than being forced out into the heat immediately.</li>
<li><strong>Extra costs:</strong> Organizers said they cannot cover additional travel or accommodation costs — a hard reminder of why travel insurance with a cancellation option matters for any international festival trip.</li>
<li><strong>Compensation beyond refunds:</strong> Q-dance said more information would come after the weekend.</li>
</ul>

<h2>Why this was the right call — even though it hurts</h2>

<p>It is easy to be angry. Plenty of fans pointed out that festivals in Las Vegas, Australia, and the Gulf run in comparable or worse heat. But the comparison misses the math that makes a hardstyle festival uniquely dangerous in a heatwave: enormous, dense crowds, sustained high-intensity dancing for hours, and widespread use of stimulants that suppress thirst and sabotage the body’s ability to regulate temperature. Stack those on top of 40°C and high humidity, and you approach conditions where the human body cannot cool itself fast enough. A mass heat-casualty event at that scale would overwhelm any on-site medical team within hours. Cancelling a festival is devastating. Evacuating one mid-crisis, with thousands already in distress, is catastrophic.</p>

<h2>The bigger picture for ravers everywhere</h2>

<p>Defqon.1 did not happen in a vacuum. The same heatwave pushed the UK to its hottest June day on record and hit France and Spain hard. Europe’s summers are getting hotter and more volatile, and large outdoor events are increasingly forced to adapt on the fly. That is not just a European problem. American festivals — from desert mega-events to summer camping weekends — are facing the same trajectory, and the Defqon.1 cancellation is a preview of conversations US organizers will be having more often: more shade, more free water, misting and cooling infrastructure, smarter set times that move peak hours out of the midday sun, and the willingness to make a brutal call when the forecast demands it.</p>

<h2>If you’re raving in the heat, take it seriously</h2>

<p>Whether you’re at a mega-festival or a daytime set, heat is not a vibe to push through. Hydrate constantly with water and electrolytes, not just whatever’s in your cup. Find shade and actually use it. Know that stimulants dramatically raise your risk of overheating and mask the warning signs your body sends. Watch your friends — confusion, stopping sweating, or dizziness are emergencies, not someone who needs to walk it off. The whole point of PLUR is that we get each other home.</p>

<p>To every Weekend Warrior stuck far from home tonight: this one is brutal, and it is okay to be gutted. The tribe is bigger than one weekend. Get home safe — and we’ll see you on the dancefloor again.</p>`
  },

  {
    id: 'post-012',
    title: 'How Many Days Is Each US Festival? A Length Guide to the Majors',
    slug: 'how-many-days-us-music-festivals',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-25',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    excerpt: 'Wondering how many days a festival runs before you book travel? Here is a scannable guide to the typical length of the major US music festivals — EDM, multi-genre, country, rock, and jam.',
    published: true,
    featured: false,
    body: `<p>One of the first questions anyone asks before pulling the trigger on a festival is simple: how many days is this thing? Two-day send or a four-day marathon changes everything — your PTO, your travel budget, how much kandi you need to make.</p>

<p>So here's a clean, scannable rundown of how long the major US festivals typically run, grouped by genre. Use it to plan, then lock in the details.</p>

<p><strong>One important note:</strong> the lengths below are the <em>typical</em> format. Festivals shift dates and add or drop days year to year, so always confirm the current-year dates on the official site (or our calendar) before booking anything. A <strong>*</strong> marks events that have notably changed length or format recently.</p>

<h2>EDM &amp; Electronic Festivals</h2>

<ul>
<li><strong>EDC Las Vegas</strong> — 3 days * (per weekend; expanding to two weekends and a 12-day "Dusk Till Dawn" run in 2027)</li>
<li><strong>Ultra Music Festival</strong> (Miami) — 3 days</li>
<li><strong>Electric Forest</strong> — 4 days * (has alternated between one and two weekends over the years)</li>
<li><strong>EDC Orlando</strong> — 3 days * (expanded from 2 days)</li>
<li><strong>Lost Lands</strong> — 3 days * (often adds a Thursday pre-party; has steadily grown)</li>
<li><strong>Lightning in a Bottle</strong> — 5 days (one of the longest in the US)</li>
<li><strong>Bass Canyon</strong> — 3 days</li>
<li><strong>North Coast</strong> (Chicago) — 3 days</li>
<li><strong>Imagine Music Festival</strong> — 3 days</li>
<li><strong>Dancefestopia</strong> — 4 days</li>
<li><strong>Wakaan Music Festival</strong> — 3 days</li>
<li><strong>Elements Music &amp; Arts Festival</strong> — 3 days</li>
<li><strong>Dirtybird CampINN</strong> — 3 days</li>
<li><strong>Okeechobee</strong> — 4 days</li>
<li><strong>Sonic Bloom</strong> (CO) — 4 days</li>
<li><strong>Gem &amp; Jam</strong> (AZ) — 4 days</li>
<li><strong>Beyond Wonderland at the Gorge</strong> — 2 days</li>
<li><strong>Beyond Wonderland SoCal</strong> — 2 days</li>
<li><strong>Project GLOW</strong> (DC) — 2 days</li>
<li><strong>Forbidden Kingdom</strong> — 2 days</li>
<li><strong>Escape Halloween</strong> — 2 days</li>
<li><strong>Hard Summer</strong> — 2 days</li>
<li><strong>Nocturnal Wonderland</strong> — 2 days</li>
<li><strong>Countdown NYE</strong> — 2 days</li>
<li><strong>Dreamstate SoCal</strong> — 2 days</li>
<li><strong>ARC Music Festival</strong> (Chicago) — 3 days</li>
<li><strong>CRSSD Festival</strong> (San Diego) — 2 days</li>
<li><strong>Sunset Music Festival</strong> (Tampa) — 2 days</li>
<li><strong>Decadence</strong> (CO / AZ, NYE) — 2 days</li>
<li><strong>Global Dance Festival</strong> — 2 days</li>
<li><strong>Lights All Night</strong> — 2 days</li>
<li><strong>Ubbi Dubbi</strong> — 2 days</li>
<li><strong>Freaky Deaky</strong> — 2 days</li>
<li><strong>Goldrush</strong> (AZ) — 2 days</li>
<li><strong>Phoenix Lights</strong> — 2 days</li>
<li><strong>Same Same But Different</strong> — 3 days</li>
<li><strong>Northern Nights</strong> — 3 days</li>
<li><strong>Desert Hearts</strong> — 3 days</li>
<li><strong>Infrasound</strong> (MN) — 3 days</li>
<li><strong>Breakaway Festival series</strong> (Ohio, Boston, Carolina, Nashville, and many more cities) — typically 2 days each</li>
</ul>

<h2>Major Multi-Genre Festivals</h2>

<ul>
<li><strong>Coachella</strong> — 3 days per weekend, across 2 weekends</li>
<li><strong>Bonnaroo</strong> — 4 days</li>
<li><strong>Lollapalooza</strong> — 4 days * (grew from 3 days)</li>
<li><strong>Austin City Limits</strong> — 3 days per weekend, across 2 weekends</li>
<li><strong>Outside Lands</strong> — 3 days</li>
<li><strong>Governors Ball</strong> — 3 days</li>
<li><strong>Life Is Beautiful</strong> — 3 days * (has gone through format changes)</li>
<li><strong>Hangout Music Festival</strong> — 3 days</li>
<li><strong>Sea.Hear.Now</strong> — 2 days</li>
</ul>

<h2>Country Festivals</h2>

<ul>
<li><strong>Country Thunder</strong> (Arizona &amp; Wisconsin) — 4 days</li>
<li><strong>Stagecoach</strong> — 3 days</li>
<li><strong>Watershed</strong> — 3 days</li>
<li><strong>Tortuga Music Festival</strong> — 3 days</li>
<li><strong>Faster Horses</strong> — 3 days</li>
</ul>

<h2>Rock / Alternative / Metal</h2>

<ul>
<li><strong>Aftershock</strong> — 4 days</li>
<li><strong>Sonic Temple</strong> — 4 days</li>
<li><strong>Welcome to Rockville</strong> — 4 days</li>
<li><strong>Louder Than Life</strong> — 4 days</li>
<li><strong>Riot Fest</strong> — 3 days</li>
<li><strong>Inkcarceration</strong> — 3 days</li>
</ul>

<h2>Jam / Camping Festivals</h2>

<ul>
<li><strong>Hulaween</strong> — 4 days</li>
<li><strong>Peach Music Festival</strong> — 4 days</li>
<li><strong>High Sierra Music Festival</strong> — 4 days</li>
<li><strong>Summer Camp Music Festival</strong> — historically 3 days * (cancelled for 2026)</li>
</ul>

<h2>The Longest US Festivals</h2>

<p>If you want maximum days per trip, these go the longest: <strong>Lightning in a Bottle</strong> leads at 5 days, followed by a big cluster of 4-day events — <strong>Bonnaroo, Electric Forest, Country Thunder, Aftershock, Sonic Temple, Welcome to Rockville, Louder Than Life, Lollapalooza, Hulaween, Okeechobee,</strong> and more.</p>

<h2>The short version</h2>

<p>Most US festivals land at 2 or 3 days, the big destination camping events run 4, and a rare few stretch to 5. But the only number that actually matters is the one on this year's official lineup — formats change, weekends get added, and events get cancelled (RIP Summer Camp 2026). When in doubt, check the source before you book the flight.</p>

<p>Find your next one on the <a href="/calendar">PLURGASM festival calendar</a>. Peace, love, unity, respect — and may all your sets run long. 🌈</p>`
  },
  {
    id: 'post-011',
    title: 'Cercle Cancels Its Mexico Festival as the Company Faces a Financial Crisis',
    slug: 'cercle-cancels-mexico-festival-financial-crisis',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-24',
    category: 'festival-news',
    coverImage: 'images/cercle-mexico-cancelled.webp',
    excerpt: 'Cercle has pulled its upcoming Mexico festival and gone public with serious money trouble — and for the first time in a decade, the team is asking fans for help.',
    published: true,
    featured: true,
    body: `<p>One of electronic music's most recognizable brands just delivered news nobody in the scene wanted to hear. <strong>Cercle has canceled its upcoming festival in Mexico</strong>, and founder Derek Barbolla says the company is in serious financial trouble.</p>

<p>If you've spent any late night falling down a YouTube rabbit hole, you know Cercle even if you didn't know the name. For ten years they've been the crew filming the world's biggest DJs in places that shouldn't be possible — the Eiffel Tower, a Bolivian salt flat, châteaux, mountaintops, ancient landmarks — and streaming it all for free. More than 200 shows. Millions of viewers. They basically invented a genre of livestream and made the location part of the music.</p>

<p>That's what makes this one sting.</p>

<h2>What happened</h2>

<p>In a statement posted to Instagram, Barbolla said the Mexico festival could no longer be delivered under the conditions it was built and planned for, and that the team couldn't run it to Cercle's own standard. Anyone holding a ticket will be refunded automatically within 24 to 48 hours.</p>

<p>The reasons are the same ones squeezing live events everywhere right now. Cercle started a decade ago on a 10,000-euro budget — some GoPros, mics, a laptop, a mixer — and scaled into a 35-person operation producing massive shows around the globe. After COVID, Barbolla says, costs climbed, taxes climbed, and margins got thinner and thinner. The balance the team had always managed to hold finally stopped holding.</p>

<h2>The ask — for the first time ever</h2>

<p>Here's the part that makes this different from a normal cancellation. Barbolla wrote that fans have asked for years how they could support Cercle directly, and that today, for the first time, the company actually needs that help. They've opened a way to donate at <a href="https://www.cercle.io" target="_blank" rel="noopener">cercle.io</a>.</p>

<p>He was clear it isn't pay-to-play: if you can't give money, a like, a share, or a kind comment genuinely helps too. Everything they've already filmed stays free on YouTube for as long as it's in their control.</p>

<p>We're not here to tell you to open your wallet or keep it shut — that's a personal call. If Cercle has soundtracked your 2am, the link is right there. If not, no judgment. We just think the scene deserves to know the option exists.</p>

<h2>The community showed up</h2>

<p>The comments under the post turned into something rare. Artists offered to play fundraiser shows for free. DJs floated no-fee benefit events to help the books recover. Fans flooded in with stories about the shows that changed how they heard music. There was some sharper criticism too — a few pointed to ticket pricing and logistics on past Odyssey dates as warning signs — but the overwhelming tone was gratitude and a refusal to treat this as the end.</p>

<p>One detail we keep coming back to: the post closed with a small line noting it had been handwritten. After a decade of cinematic 4K productions, the goodbye-for-now came as a person typing out something real. That's about as PLUR as a corporate statement gets.</p>

<h2>Where this leaves us</h2>

<p>Cercle says it's working to keep the dream alive and will share next steps as they come. Nothing about the brand's future is fully settled yet.</p>

<p>Zoom out and this is bigger than one festival. When a brand this beloved and this established hits a wall, it says something uncomfortable about how hard it's become to actually produce live electronic music — even when the art is undeniable and the audience is right there. The whole scene runs on people betting everything on a feeling. Sometimes the math catches up with the magic.</p>

<p>Peace, love, unity, respect — and to the Cercle team, gratitude for ten years of making the world feel a little less alone at 2am.</p>`,
  },
  {
    id: 'edc-orlando-2026-lineup',
    title: 'EDC Orlando 2026 Lineup Breakdown: A House & Techno Takeover',
    slug: 'edc-orlando-2026-lineup-breakdown',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-23',
    category: 'festival-news',
    coverImage: '/images/blog/edc-orlando-2026-header.jpg',
    excerpt: 'EDC Orlando 2026 is here — 100+ artists at Tinker Field this November. House and techno dominate, the mainstage is stacked, and one big bass name is missing. Our full breakdown.',
    published: true,
    featured: true,
    body: `<p>The wait is over. EDC Orlando just dropped its 2026 lineup, and the rave internet lit up within minutes. Returning to <strong>Tinker Field</strong> from <strong>November 6–8</strong> for its 15th edition — all under the new <em>kineticJOURNEY</em> theme carried over from EDC Las Vegas' 30th anniversary — this year's bill runs more than 100 artists deep. Here's our honest breakdown of what stands out, and what's quietly missing.</p>

<img class="blog-body-img" src="/images/blog/edc-orlando-2026.webp" alt="EDC Orlando 2026 official lineup poster — Nov 6-8 at Tinker Field">

<h2>The mainstage is absolutely stacked</h2>
<p>Insomniac did not come to play. The top of the bill reads like a festival-house hall of fame: <strong>Martin Garrix, David Guetta, Hardwell, Alesso, Kaskade, Afrojack, Steve Aoki, Alan Walker,</strong> and <strong>Alison Wonderland</strong>. David Guetta in particular is a rare get for a US festival outside of Vegas and Ultra, so seeing him on an Orlando bill turned a lot of heads. Add sunset sets from Alesso, Alan Walker, Adventure Club, SLANDER, and Of The Trees, and the marquee alone could carry the weekend.</p>

<h2>House and techno are the real winners</h2>
<p>If there's a clear theme this year, it's that house and techno absolutely run the lineup. On the house side you've got <strong>Chris Lorenzo, Mau P, Disco Lines, Meduza, KREAM, Marlon Hoffstadt, Franky Rizardo, Joshwa,</strong> and <strong>Dennis Cruz</strong>. The techno and hard-techno contingent is even more notable — <strong>I Hate Models, Nico Moreno, Holy Priest, Klangkuenstler, Maddix, SHDW,</strong> and a <strong>Boys Noize b2b Brutalismus 3000</strong> set that reads like a dark-techno fever dream. The back-to-backs are a highlight all on their own: Deorro b2b Diesel, Bou b2b Kanine, Prospa b2b Josh Baker, and ACRAZE b2b CID. House and techno heads are eating very, very well.</p>

<h2>Bass heads, we need to talk</h2>
<p>Here's where the conversation gets spicy. Compared to recent years, the dubstep and riddim presence is noticeably lighter. There are still heaters — <strong>Jessica Audiffred, Kompany, Level Up, Wooli, Ray Volpe, ATLiens,</strong> the <strong>Skull Machine</strong> project (Black Tiger Sex Machine x Kai Wachi), and a "Wholesome Riddim" set from San Holo — but the depth isn't what bass fans have come to expect from Orlando.</p>
<p>And then there's the elephant in the room: <strong>Subtronics isn't on the lineup.</strong> After becoming a near-annual fixture at EDC Orlando, his absence is easily the most talked-about omission of the drop, and bassheads are not thrilled. One quick PSA to save you some confusion — <strong>Subsonic</strong>, who <em>is</em> on the bill, is a drum & bass artist, not Subtronics. Easy mix-up, very different set.</p>

<h2>No trance this year</h2>
<p>Worth flagging for the uplifting crowd: there's essentially no trance presence on this lineup. No Tiësto, no Armin, no dedicated trance day. It's part of a broader trend at EDC's regional events, but trance fans are coming up empty in Orlando this year.</p>

<h2>New for 2026: Hotel EDC comes east</h2>
<p>The biggest non-music news is <strong>Hotel EDC Orlando</strong> — the first East Coast version of Insomniac's luxury festival hotel concept, taking over the Margaritaville Resort from November 6–9 in partnership with Vibee. Think festival-themed rooms, onsite concierge, and exclusive daytime and after-party events. If you've ever wanted the full immersive experience without the 4am drive home, this is it.</p>

<h2>The details</h2>
<p>EDC Orlando 2026 hits Tinker Field on <strong>November 6–8</strong>, 18+. Three-day GA, GA+, and 21+ VIP tickets go on sale <strong>Thursday, June 25 at 12pm EST</strong> through Insomniac. Stage takeovers come courtesy of Factory 93 and Bassrush, all under the kineticJOURNEY banner.</p>

<p>Genre gripes aside, this is one of the deepest Orlando bills in years — and as the poster reminds everyone, the most important headliner of all is still <strong>you</strong>. <a href="/calendar">Add it to your calendar</a> and start planning your sets.</p>`,
  },
  {
    id: 'trippysquid-flowstars',
    title: 'Trippy Squid Flowstars: Affordable UV Flow Toys (10% Off with Code PLURGASM)',
    slug: 'trippysquid-flowstars',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-16',
    category: 'gear',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    // Optimized, silent, looping video header (webm first, mp4 fallback). coverImage is the poster/still.
    headerVideo: '/images/blog/trippysquid-header.webm',
    headerVideoMp4: '/images/blog/trippysquid-header.mp4',
    excerpt: 'Trippy Squid makes handmade, UV-reactive flowstars at some of the best prices in the scene. Plurgasm readers get 10% off with code PLURGASM.',
    published: true,
    featured: true,
    body: `
    <p><em>Disclosure: Plurgasm earns a small commission when you shop through our link or use our code, at no extra cost to you. We only feature brands we actually rate.</em></p>
    <p>If you have been eyeing your first flow star &mdash; or your fifth &mdash; <a href="https://trippysquid.com/?ref=Plurgasm" target="_blank" rel="noopener">Trippy Squid</a> is one of the best-value makers in the game, and Plurgasm readers get <strong>10% off with code PLURGASM</strong>.</p>
    <a href="https://trippysquid.com/?ref=Plurgasm" target="_blank" rel="noopener sponsored"><img class="blog-brand-logo" src="/images/brands/trippysquid.webp" alt="Trippy Squid logo"></a>
    <h2>Who is Trippy Squid?</h2>
    <p>Trippy Squid is the work of Fahim, a Seattle-based founder who built the brand alongside his partner Yami. He comes from a family of entrepreneurs and struck out on his own at 23 &mdash; first with the viral Tiny Hand Finger Puppet (yes, the little hands) that became a festival sensation, and eventually with Trippy Squid, born from more than a decade deep in the EDM scene. The mission is simple: high-quality flow toys, ravewear, and accessories at prices anyone can afford &mdash; or as they put it, where raving meets affordability.</p>
    <h2>Why flowstars?</h2>
    <p>Flowstars are the most beginner-friendly flow prop out there: soft, weighted fabric you spin from the wrist, fun from day one but with a trick ceiling that goes on forever. New to them? Start with our <a href="/blog-post?id=flowstar-guide">Flow Star Tutorial Guide</a> for the full beginner-to-advanced progression, or our <a href="/blog-post?id=flow-arts-guide">Ultimate Guide to Flow Arts</a> if you are exploring props in general.</p>
    <h2>The deal: 10% off with code PLURGASM</h2>
    <p>Head to <a href="https://trippysquid.com/?ref=Plurgasm" target="_blank" rel="noopener">trippysquid.com</a>, pick your star (UV-reactive and non-UV options, around 26 inches), and enter code <strong>PLURGASM</strong> at checkout for 10% off. UV-reactive patterns are the move if you spin at night sets and blacklight stages.</p>
    <p>First star or fifth, Trippy Squid is a solid, affordable place to start. Tag <a href="https://instagram.com/beastmodebass" target="_blank" rel="noopener">@beastmodebass</a> when you get yours spinning.</p>
    `,
  },
  {
    id: 'flowstar-guide',
    title: 'Flow Star Tutorial Guide: Every Trick from Beginner to Advanced',
    slug: 'flow-star-tutorial-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-16',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    excerpt: 'The complete flow star trick progression, from your first Pizza Toss to advanced barrel rolls and color switches, plus the master video library to learn every move.',
    published: true,
    featured: false,
    body: `
    <p>Of all the flow props, the flow star might be the most beginner-friendly and the most addictive. It is a soft, weighted fabric prop you spin from the wrist, letting momentum and gravity carry it as it folds, floats, and glides through the air. The modern flow star grew out of Chinese handkerchief spinning and took off after catching on in Spain in the 2010s, and today it is one of the fastest-spreading props in the festival scene.</p>
    <p>The best part: you get instant fun on day one, but the trick ceiling is sky-high. Below is the full progression, from your first Pizza Toss to advanced barrel rolls and color switches, so you always know what to learn next.</p>

    <h2>The Master Class: The Flowstar Tricktionary</h2>
    <p>The single best video library for flow star tricks is the <a href="https://dawn-judo-111.notion.site/Tricktionary-51fe8ecf756941f6a56f886a7fdcf114" target="_blank" rel="noopener">Flowstar Tricktionary</a>, a community-built resource with a tutorial video for nearly every trick below, organized into Single Star, Two Star, and Partner Flow. Bookmark it &mdash; it is the closest thing the flow star world has to a complete encyclopedia. Use the progression on this page as your roadmap, and head to the Tricktionary to watch each trick broken down.</p>

    <h2>Single Star Tricks</h2>

    <h3>Beginner</h3>
    <ul>
    <li>Pizza Toss</li>
    <li>Finger Spin</li>
    <li>Finger Poke</li>
    <li>Big Js</li>
    <li>Vertical 8s (Reverse)</li>
    <li>Vertical 8s (Forward)</li>
    <li>Vertical 8 Hand Pass</li>
    <li>Horizontal Figure 8s</li>
    <li>Horizontal 8 Hand Pass</li>
    <li>Pinky Horizontal 8s</li>
    <li>Color Switch Break</li>
    <li>Over Head Weave</li>
    <li>Long Catch</li>
    <li>Vertical Magic Color Switch</li>
    <li>Drop Spin</li>
    <li>J Spin</li>
    <li>Open Hand Stall (Wipers)</li>
    <li>Flowers</li>
    <li>Waiter</li>
    <li>Foot Swing Recovery</li>
    <li>Stalls</li>
    </ul>

    <h3>Intermediate</h3>
    <ul>
    <li>2-Beat Figure 8 (Whipper Snipper)</li>
    <li>Penguin Catch</li>
    <li>Vertical Behind the Back Pass</li>
    <li>Vertical Behind the Back Toss</li>
    <li>Horizontal Behind the Back Pass</li>
    <li>Horizontal Behind the Head Toss</li>
    <li>Around the World</li>
    <li>Around the World (Reverse)</li>
    <li>Behind the Legs Toss</li>
    <li>Under the Leg Toss</li>
    <li>Kirby Wrap</li>
    <li>Cross Over Wrist Spin (Money Hands/Bus Driver)</li>
    <li>Nunchuck Pass</li>
    <li>Buzz Saw (Reverse)</li>
    <li>Vertical Pinch</li>
    <li>Two Hand Drop Spin</li>
    <li>Shoulder Roll</li>
    <li>Above the Head Pass (Orbit)</li>
    <li>ET Pass</li>
    <li>Elbow Stall</li>
    <li>U Spin Color Switch</li>
    <li>Hand Wraps</li>
    <li>Levitating Vertical Spin</li>
    <li>2-Beat Drop Spin</li>
    <li>Princess Spin (Vertical and Horizontal)</li>
    <li>Horizontal Magic Switch</li>
    <li>Ground Roll (Reverse)</li>
    <li>Jelly Fish</li>
    <li>Cross Over Wrist Spin Around the World</li>
    <li>Flowers (Int.)</li>
    <li>2-Beat Color Switch (Basic Color Switch)</li>
    <li>Over the Shoulder Penguin Toss</li>
    <li>Continuous Kirby Wraps</li>
    <li>Horizontal 8 Color Switch Pass</li>
    <li>Escalator</li>
    <li>Horizontal Body Break</li>
    <li>Big J Variations</li>
    <li>Creating Variety in Your Flow - Catches and Body Orientation</li>
    <li>Swipe Pinch Spin</li>
    <li>Toss-Flicks</li>
    <li>Vertical 8 to Pinch Transition</li>
    <li>Horizontal Pinch</li>
    <li>Horizontal Figure 8 to Pinch Transition</li>
    <li>Reverse Elevator Slide</li>
    <li>Around the World Hand Off</li>
    </ul>

    <h3>Advanced</h3>
    <ul>
    <li>2-Beat Figure Eights (Whipper Snipper) Variations</li>
    <li>Diagonal Shoulder Roll (Elevator/Slides)</li>
    <li>Flowers (Adv.)</li>
    <li>Dino Roll (Reverse)</li>
    <li>Pinch Spin (Barrel Rolls)</li>
    <li>Dino Roll</li>
    <li>Single Finger Behind the Back Pass Off</li>
    <li>5-Beat Color Switch</li>
    <li>Behind the Back Vertical Pinch Pass</li>
    <li>Vertical Pinch Color Switch</li>
    <li>Cross Over Wrist Spin (Money Hands) Anti-Spin</li>
    <li>Cart-Wheel Around the World</li>
    <li>Cross Over Wrist Spin (Money Hands) Color Switch</li>
    <li>Snap Back - Combo</li>
    <li>Over the Hill</li>
    <li>Finger Spin to Vertical Pinch Transition</li>
    </ul>

    <p>Beyond single star, the Tricktionary also covers <strong>Two Star Flow</strong> and <strong>Partner Flow</strong> tricks once you are ready to add a second star or spin with a friend.</p>

    <h2>How to Use This Progression</h2>
    <p>Work top to bottom. Nail the beginner foundations &mdash; the tosses, spins, basic figure 8s and color switches &mdash; before chasing the flashy advanced combos, because almost everything later is built from those fundamentals. Practice with both hands, ride the momentum instead of forcing it, and film yourself to catch what to clean up. New to flow in general? Start with our <a href="/blog-post?id=flow-arts-guide">Ultimate Guide to Flow Arts</a> for the big picture.</p>
  `
  },

  {
    id: 'post-010',
    title: 'Chase & Status in a Bond Game: What Electronic Music in Video Games Actually Means',
    slug: 'chase-status-007-first-light-electronic-music-games',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-02',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    excerpt: 'Chase & Status are DJing in the new James Bond game. Dimitri Vegas remixed the Bond theme. FISHER is voicing a garden gnome in Toy Story 5. Electronic music is everywhere right now and video games might be one of the most interesting places it is showing up.',
    published: true,
    featured: true,
    body: `
    <p>A few weeks ago IO Interactive dropped something that went quietly viral
    in electronic music circles. In 007: First Light, the new James Bond game
    released at the end of May, there is a mission called A Night Out.
    Bond enters a packed nightclub.
    The dance floor is heaving.
    The lighting system is detailed enough to draw comparisons
    to Club Hölle from Hitman 3, still considered one of the best
    club environments ever put in a video game.
    And in the elevated DJ booth above the crowd,
    rendered in full polygonal detail,
    are Chase and Status.</p>

    <p>The mission plays two unreleased Chase and Status tracks.
    Fans started pulling the audio from game files within days of launch.
    The scene is not a cutscene.
    You move through it.
    You feel the crowd, the lights, the bass pushing
    through a fictional sound system in a fictional club
    while one of the UK's most important drum and bass duos
    plays overhead.</p>

    <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
      alt="DJ set with crowd"
      style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

    <h2>The Reaction</h2>

    <p>The response online was immediate and genuinely enthusiastic,
    which does not always happen when games try to integrate
    contemporary music acts.
    One X user described the sequence as
    "absolutely stunning, the neon-soaked atmosphere,
    dynamic crowd, and that classic Bond tension while staying stealthy
    is chef's kiss."
    Others pointed specifically to the lighting system and
    crowd animation as evidence that IO Interactive understood
    what a club actually looks like from the inside,
    not from a distance.</p>

    <p>IO Interactive's statement on the inclusion was direct:
    "It's a modern pop-culture touchstone that keeps Bond
    in step with the world around him.
    Their inclusion adds a distinct edge to 007: First Light,
    not just as a cameo, but bringing immersive energy
    that amplifies Bond's journey."</p>

    <p>That framing matters.
    They did not say Chase and Status were added to appeal
    to a younger demographic or to generate press.
    They said electronic music is part of the world Bond moves through.
    That is a different statement about where club culture sits
    in the cultural landscape right now.</p>

    <h2>The Bigger Picture</h2>

    <p>Chase and Status are not the only electronic act in the game.
    Dimitri Vegas appears as a character players can interact with
    and created a remix of the Bond theme that he debuted at Tomorrowland Winter.
    Lana Del Rey performs the title track alongside a score
    composed by The Flight, a UK duo whose work sits
    at the intersection of orchestral and electronic production.
    The entire musical world of 007: First Light
    is built around contemporary sounds rather than
    the orchestral tradition that defined the franchise for decades.</p>

    <p>This is not an accident.
    Video games have been one of the most interesting
    places to watch electronic music expand its cultural footprint
    for at least fifteen years.
    The GTA series introduced entire generations to
    house music, drum and bass, and techno through its radio stations.
    Hitman 3's Club Hölle mission became a genuine talking point
    among people who had never set foot in a techno club
    but spent hours inside a virtual one.
    Games create immersive environments that can communicate
    the feeling of a subculture in ways that a playlist or
    a documentary cannot.</p>

    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
      alt="Club lighting and crowd"
      style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

    <h2>DJs Are Everywhere Right Now</h2>

    <p>The Chase and Status cameo lands in the middle of
    an unusually concentrated moment for electronic artists
    crossing into other media.
    FISHER, the Australian house DJ best known for Losing It,
    announced around the same time that he would be voicing
    a garden gnome in the Australia and New Zealand release of Toy Story 5.
    That detail went viral faster than most actual music news does.
    The image of a gnome with FISHER's energy is objectively funny
    but it also says something real about how visible
    these artists have become outside the festival circuit.</p>

    <p>Five years ago a Bond game putting a drum and bass duo
    in a club scene would have been considered niche at best.
    Now it is a selling point.
    The trailer clips featuring the club sequence
    performed well enough that IO Interactive put them front and center
    in the game's marketing.
    Chase and Status fans who have never played a James Bond game
    are downloading 007: First Light because they want to
    stand on that virtual dance floor.</p>

    <h2>What This Means for the Culture</h2>

    <p>There is a version of this story that is just press release material.
    Big game, famous artists, everyone wins.
    But the more interesting version is about legitimacy
    moving in an unexpected direction.</p>

    <p>Electronic music spent decades fighting for cultural recognition.
    The British press spent years dismissing rave culture as a drug problem.
    American mainstream media ignored it almost entirely
    until EDM became impossible to ignore commercially.
    Even now there is a version of the conversation that treats
    club music as background, as atmosphere, as something that happens
    while the real story unfolds elsewhere.</p>

    <p>What IO Interactive did with the A Night Out mission is treat
    the club sequence as the story.
    Bond is in that room because that is where the world is.
    Chase and Status are in that booth because that is who is
    shaping the sound of that world.
    The music is not wallpaper.
    It is architecture.</p>

    <p>That is a small thing to notice in a game that has
    Lenny Kravitz playing a pirate king and Lana Del Rey
    on the soundtrack.
    But it is the kind of small thing that accumulates.
    The culture shifts because a lot of small things
    point in the same direction at the same time.</p>

    <p>Chase and Status have been making drum and bass for over twenty years.
    The fact that a major video game in 2026 uses their music
    as the sonic identity of its most praised level
    is not just good for them.
    It is good evidence that the culture they helped build
    is now part of the furniture of the world.</p>

    <p style="margin-top:32px;padding:20px;
      background:rgba(0,229,255,0.06);
      border-left:3px solid #00e5ff;
      line-height:1.8;">
      New to drum and bass?
      Our
      <a href="/blog-post?id=post-009"
        style="color:var(--cyan);">
        Bass Music 101 guide
      </a>
      covers Chase and Status, the full subgenre landscape,
      and which festivals to attend based on where you live.
    </p>
  `
  },

  {
    id: 'post-009',
    title: 'Bass Music 101: A Complete Guide to the Subgenres, Artists, and Festivals',
    slug: 'bass-music-101-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-06-01',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    excerpt: 'Dubstep, riddim, melodic bass, future bass, midtempo, bass house. If you are new to the bass music world, the subgenres can feel overwhelming. This is your complete guide to what each one sounds like, who the key artists are, and which festivals to go to based on where you live.',
    published: true,
    featured: false,
    body: `
    <p>Bass music is not one thing. It is a family of related genres that
    share a foundation of heavy low-end frequencies and high-energy production,
    but branch in wildly different directions from there.
    Riddim sounds nothing like melodic bass.
    Future bass sounds nothing like midtempo.
    The artists who dominate one corner of the scene
    often have almost no overlap with the artists who dominate another.</p>

    <p>If you discovered bass music through a single artist or a single festival
    and want to understand the larger landscape, this is where to start.
    And if you are trying to figure out which festivals are worth your money
    based on the sounds you actually love,
    we have broken that down by region at the end.</p>

    <img src="https://images.unsplash.com/photo-1571266752756-0fe20de8dde1?w=800&q=80"
      alt="Bass music festival crowd"
      style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

    <h2>Dubstep</h2>
    <p>The origin point. Dubstep started in South London in the late 1990s
    as a dark, minimal genre built around half-time rhythms and deep sub bass.
    The original sound was spacious and atmospheric with a strong reggae and dub influence.
    By 2010 the American version had developed its own character entirely,
    emphasizing aggressive drops, distorted bass wobbles, and high-energy buildups.
    This American take is what most people mean when they say dubstep today.</p>

    <p>The tempo sits around 140 BPM. The drops are heavy.
    The crowd response at a good dubstep set is physical,
    bass hitting your chest in ways that feel more like weather than music.</p>

    <p><strong>Key artists:</strong> Excision, Zomboy, Datsik, Feed Me,
    12th Planet, Downlink, Space Laces, Barely Alive</p>

    <p><strong>Gateway track:</strong> Listen to Excision and Datsik
    collaborations from 2011 to understand where modern dubstep came from,
    then follow Excision forward to hear how it evolved.</p>

    <h2>Riddim</h2>
    <p>Riddim split from dubstep around 2015 and developed its own dedicated following.
    The key difference is minimalism. Where traditional dubstep piles on complexity,
    riddim strips everything back to a repeating bass pattern,
    a simple rhythm, and precise sound design.
    The wobbles are cleaner and more mechanical.
    The drops feel like machinery rather than chaos.</p>

    <p>Riddim fans are among the most dedicated in the bass world.
    The subgenre has its own labels, its own festivals,
    and its own aesthetic that is distinctly separate from the broader dubstep scene.</p>

    <p><strong>Key artists:</strong> Svdden Death, Chomppa, Virtual Riot,
    Griz (not purely riddim but influential), Peekaboo, Yakz, Wooli</p>

    <p><strong>Gateway track:</strong> Start with Svdden Death remixes
    and work backward through the Virtual Riot catalog
    to understand how the sound developed.</p>

    <h2>Melodic Bass / Melodic Dubstep</h2>
    <p>The most emotionally accessible corner of the bass world.
    Melodic bass keeps the weight and energy of dubstep
    but wraps it in cinematic melodies, vocal chops,
    and song structures that feel closer to pop than underground club music.
    The drops still hit hard but you are also likely to feel something in your chest
    that has nothing to do with the volume.</p>

    <p>This is the subgenre that crossover audiences discover first
    and that has produced some of the most commercially successful artists
    in the bass world.
    It is also the subgenre most likely to headline a mainstream festival.</p>

    <p><strong>Key artists:</strong> ILLENIUM, Seven Lions, Said the Sky,
    Dabin, Trivecta, Woodes, Kompany, Rezz (adjacent),
    Excision (when he goes melodic)</p>

    <p><strong>Gateway track:</strong> ILLENIUM and Said the Sky
    collaborations are the most accessible entry point.
    From there, Seven Lions takes you deeper into the more complex
    psychedelic side of the sound.</p>

    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
      alt="Festival crowd with lights"
      style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

    <h2>Future Bass</h2>
    <p>Future bass sits at the intersection of bass music and pop electronic music.
    The signature sound is a bright, chord-heavy drop built around
    supersaw synths, pitched-up vocal chops, and melodies
    that feel almost overwhelmingly euphoric.
    The energy is uplifting rather than aggressive.
    The crowds tend to be younger and the festival bookings
    often overlap with EDM mainstage programming.</p>

    <p>Future bass had its commercial peak around 2016 to 2019
    but continues to evolve, with newer artists pushing it
    toward more experimental territory.</p>

    <p><strong>Key artists:</strong> Flume, San Holo, Jai Wolf,
    Odesza (adjacent), Kasbo, Unlike Pluto, Slushii, Valentino Khan</p>

    <p><strong>Gateway track:</strong> Flume's self-titled album
    defined the genre. San Holo's album1
    pushed it in a more emotional direction worth exploring.</p>

    <h2>Midtempo</h2>
    <p>Midtempo is one of the more recently defined subgenres and
    sits in interesting territory.
    The tempo is slower than most bass music, usually around 90 to 110 BPM,
    which creates a heaviness that feels less frantic and more deliberate.
    The bass is deep, the atmospheres are dark,
    and the music tends to have a cinematic quality
    that rewards headphone listening as much as festival sound systems.</p>

    <p>Rezz is the most prominent artist in this space
    and has built a cult following that extends well beyond
    the typical bass music audience.</p>

    <p><strong>Key artists:</strong> Rezz, Phase (now Rezz's label),
    Blanke, Sable Valley artists, Marauda, 1788-L, Lxstfire</p>

    <p><strong>Gateway track:</strong> Rezz's Mass Manipulation album
    is the definitive midtempo record.
    Start there and follow the Rezz Nation rabbit hole.</p>

    <h2>Bass House</h2>
    <p>Bass house fuses the four-on-the-floor structure of house music
    with the distorted, driving bass lines of bass music.
    The result is something that works on a house dancefloor
    but hits considerably harder than traditional house.
    It is one of the most DJ-friendly subgenres in the bass world
    and has produced some of the most consistently fun festival sets
    of the last five years.</p>

    <p><strong>Key artists:</strong> Habstrakt, Valentino Khan,
    Walker and Royce, AC Slater, Jauz, Joyryde, Habstrakt, Tchami</p>

    <p><strong>Gateway track:</strong> Valentino Khan's Deep Down Low
    became a crossover moment for the genre.
    Habstrakt's catalog is the most consistent entry point
    for understanding the full sonic range.</p>

    <h2>Drum and Bass</h2>
    <p>Drum and bass is the oldest genre in this guide
    and the one with the most developed culture outside of America.
    It emerged from the UK jungle scene in the early 1990s
    and developed into a sprawling genre with multiple subgenres of its own,
    including liquid DnB, neurofunk, jump-up, and techstep.</p>

    <p>The defining feature is tempo.
    DnB runs at 160 to 180 BPM,
    making it significantly faster than any other genre in this guide.
    The drums are syncopated and complex,
    the bass lines deep and rolling.
    A good DnB set in a club with a proper sound system
    is one of the most physically consuming experiences in electronic music.</p>

    <p>The American DnB scene is smaller than the UK scene
    but has grown substantially in the last few years,
    particularly on the West Coast.</p>

    <p><strong>Key artists:</strong> Chase and Status, Andy C, Noisia,
    Pendulum, Dimension, Netsky, Shy FX, Sub Focus, Wilkinson,
    Delta Heavy, Logistics</p>

    <p><strong>Gateway track:</strong> Pendulum's Hold Your Colour
    is the crossover album that brought most American fans
    to DnB for the first time.
    Chase and Status are the most consistent live performers in the genre.</p>

    <img src="https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80"
      alt="Festival at night with crowd"
      style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

    <h2>Which Festivals to Go To Based on Your Region</h2>
    <p>Bass music is not evenly distributed across the country.
    Some regions have a thriving scene with multiple annual events.
    Others have less to choose from locally but are within driving distance
    of something worth attending.
    Here is where to look based on where you live.</p>

    <h3>Northeast (DC, New York, Philadelphia, Boston)</h3>
    <p>The Northeast is underserved for major bass events
    relative to its population, which makes Project GLOW in Washington DC
    the anchor event for the region.
    The festival's Pulse Stage is a dedicated bass stage
    with a consistently strong lineup that includes dubstep,
    riddim, and experimental bass acts alongside the melodic headliners
    on the main stage.
    For DnB specifically, New York City club nights
    are more reliable than festival bookings in this region.</p>

    <p><strong>Best for:</strong> Dubstep, Melodic Bass, Bass House</p>
    <p><strong>Go to:</strong> Project GLOW (DC, May)</p>

    <h3>Southeast (Atlanta, Miami, Orlando, Nashville)</h3>
    <p>The Southeast has developed one of the strongest
    regional bass scenes in the country over the last decade.
    Imagine Music Festival in Atlanta is the anchor event,
    with a lineup that leans heavily toward dubstep and riddim
    with melodic and future bass support.
    Ultra Miami covers the electronic spectrum more broadly
    but has strong bass bookings in its Resistance and Live stages.
    EDC Orlando in November is more accessible
    than Las Vegas for Southeast attendees
    and covers every bass subgenre.</p>

    <p><strong>Best for:</strong> Dubstep, Riddim, Bass House</p>
    <p><strong>Go to:</strong> Imagine Music Festival (Atlanta, September),
    Ultra Miami (March), EDC Orlando (November)</p>

    <h3>Midwest (Chicago, Detroit, Columbus, Minneapolis)</h3>
    <p>Lost Lands in Thornville Ohio is the most important bass music festival
    in the Midwest and arguably in the country for pure bass programming.
    Excision's annual event runs for three days with a lineup
    that covers every corner of bass music from dubstep to riddim
    to experimental.
    The production is exceptional and the crowd
    is among the most knowledgeable bass audiences anywhere.
    Bonnaroo in Tennessee covers melodic bass and future bass well
    and is within reach for the southern Midwest.</p>

    <p><strong>Best for:</strong> Dubstep, Riddim, Melodic Bass, Experimental</p>
    <p><strong>Go to:</strong> Lost Lands (Ohio, October), Bonnaroo (Tennessee, June)</p>

    <h3>West Coast (Los Angeles, San Francisco, Seattle, Portland)</h3>
    <p>The West Coast has the most developed bass scene outside of the UK.
    Hard Summer in Los Angeles covers bass house, dubstep,
    and melodic bass with one of the strongest annual lineups in the country.
    Bass Canyon in Quincy Washington is a dedicated bass festival
    run by Excision and stays closer to heavy dubstep and riddim territory.
    Nocturnal Wonderland in San Bernardino is one of the
    longest-running events in American rave history
    and consistently books strong bass acts across subgenres.
    The West Coast also has the most developed DnB club scene in the US,
    particularly in San Francisco and Seattle.</p>

    <p><strong>Best for:</strong> Every subgenre, strongest regional scene</p>
    <p><strong>Go to:</strong> Hard Summer (LA, August),
    Bass Canyon (Washington, August),
    Nocturnal Wonderland (San Bernardino, September)</p>

    <h3>Texas and Southwest (Houston, Dallas, Austin, Phoenix)</h3>
    <p>Something Wicked in Houston is the primary bass-focused event
    for the Texas region, with strong dubstep and bass house bookings
    around Halloween weekend.
    Austin's club scene covers melodic bass and future bass well year-round.
    Phoenix has a growing scene with regular bass bookings
    in club venues that often bring touring artists
    who are traveling between LA and Texas dates.</p>

    <p><strong>Best for:</strong> Dubstep, Bass House</p>
    <p><strong>Go to:</strong> Something Wicked (Houston, October)</p>

    <h2>How to Figure Out What You Actually Like</h2>
    <p>The fastest way to understand the distinctions between subgenres
    is not to read about them but to listen back to back.
    Put on an Excision set, then a Seven Lions set,
    then a Rezz set, then a Valentino Khan set.
    The differences are immediately audible
    in a way that no amount of description fully captures.</p>

    <p>Most subgenre communities have dedicated subreddits,
    Discord servers, and playlist curators.
    The bass music world is generally welcoming to new listeners
    who are genuinely curious,
    and most veteran fans are happy to make recommendations
    if you tell them what you already know you like.</p>

    <p>Start with one artist. Follow them to the acts they collaborate with.
    Follow those acts to the labels they release on.
    Follow those labels to the other artists they sign.
    In three or four steps you will have a map of
    an entire corner of the bass world,
    built from your own taste rather than someone else's.</p>

    <p style="margin-top:32px;padding:20px;
      background:rgba(0,229,255,0.06);
      border-left:3px solid #00e5ff;
      line-height:1.8;">
      Find every bass music festival in one place on the
      <a href="/calendar" style="color:var(--cyan);">
        PLURGASM festival calendar
      </a>.
      Use the genre filter to show only Bass, Dubstep,
      or Riddim events and find something near you.
    </p>
  `
  },

  {
    id: 'post-008',
    title: 'The History of PLUR: Where It Actually Came From',
    slug: 'history-of-plur',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-05-30',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    excerpt: 'Peace, Love, Unity, Respect. Four words that became the backbone of an entire culture. But where did PLUR actually come from, who coined it, and how did it travel from illegal New York warehouse parties to becoming the defining philosophy of global rave culture?',
    published: true,
    featured: false,
    body: `
    <p>Walk into any rave today and PLUR is everywhere. It is on kandi bracelets.
    It is in the handshake people do when they trade them. It is in how someone
    turns around to apologize when they bump into you, or the way a stranger
    presses a cold water bottle into your hand when you look overheated.
    PLUR is a word but it is also a behavior, a code, a way of being in a
    room full of people you have never met.</p>

    <p>Most people in the scene know what PLUR stands for.
    Fewer know where it actually came from.
    The full story is messier and more interesting than the version
    that usually gets told.</p>

    <img src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80"
      alt="Crowd at underground music event"
      style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

    <h2>New York City, Late 1980s</h2>

    <p>To understand PLUR you have to understand what raving was before it
    had a name, a brand, or a $400 ticket price.
    The American rave scene grew out of two things happening at the same time:
    the explosion of house music coming out of Chicago and Detroit in the mid-80s,
    and a generation of young people in New York City who needed somewhere to go.</p>

    <p>The parties were not legal. They were in warehouses, in tunnels,
    in empty lots in parts of the city that nobody was paying attention to.
    The flyers were photocopied and handed out in person.
    You found out about a party through someone who already knew,
    and that social trust mattered because the whole thing could
    get shut down at any moment.</p>

    <p>In that environment, the culture that developed around the music was
    not accidental. When you are in an illegal space with strangers at 3am,
    the social contract has to be explicit.
    You look out for each other. You do not bring drama.
    You treat the space like it belongs to everyone,
    because for one night it does.</p>

    <p>Walk into any show and you'll see it: four letters on a sign, a bracelet, a tattoo, a chant. P-L-U-R: Peace, Love, Unity, Respect, the closest thing rave culture has to a creed. But ask where it came from and you'll usually get a legend. The real story is messier, older, and honestly more beautiful, because no single person invented it. A whole community did.</p>
    <h3>The legend</h3>
    <p>The version most people know credits Frankie Bones, the Brooklyn DJ widely called the founding father of American raves through his early-'90s Storm Rave parties. As the story goes (told and retold on NE-RAVES, the University of Maryland mailing list where a lot of East Coast rave culture lived online), Bones finished a blistering set, stepped up, and explained what the scene was really about: peace, love, unity, and respect. The whole warehouse threw their hands in the air as one. It's a great story. It's also, according to someone who was in those rooms, not quite what happened.</p>
    <h3>The correction</h3>
    <p>In 1996, a DJ named Laura LaGassa posted her own account to that same list, and she'd been at nearly every Storm Rave. Her version pulls the credit apart and spreads it around. "Peace, love, unity" was already common slang in the New York scene by 1992. The missing piece was respect, and it came from elsewhere: a booklet called <em>Cybertribe Rising</em> by Geoff White, which laid out the "four pillars of the house community" and placed respect alongside the other three. The idea traveled east when San Francisco's Brian Behlendorf brought the literature to the coast.</p>
    <p>Then came the moment that actually mattered. At a renegade party in the RFK Stadium parking lot in Washington DC in June 1993, Laura was talking about the spirit of raving and said "peace, love, unity," and Brian immediately added the line that completed it: <em>and don't forget Respect</em>. That stuck with her. She wrote an essay tying all four words together and posted it to NE-RAVES. It didn't have a name yet. Shortly after, another list member, Rishad Quazi, signed off an email with the acronym <strong>PLUR</strong>, and it spread fast and never left.</p>
    <h3>So what about Frankie Bones?</h3>
    <p>Laura doesn't erase him. He was a real catalyst and a genuine figurehead for the whole movement. But the speeches she actually witnessed tended to land on "peace, love and unity" without the fourth word. Her favorite Frankie moment wasn't even a sermon: a fight broke out at a party, and he leapt onto the turntables and threatened to break some faces if the crowd didn't show a little peace, love, and unity, right then. Pure Brooklyn.</p>
    <h3>Why the messy version is the right one</h3>
    <p>Put it together and PLUR has no single author. It's a booklet from one coast, a phrase from another, one person who added the fourth word, one who wrote it down, and one who turned it into four letters that fit in an email signature. Which is about the most PLUR origin story imaginable: a bunch of strangers, connected by a scene, each adding a piece. As they used to say on those old mailing lists: we are all connected.</p>
    <h3>The four words, then and now</h3>
    <p><strong>Peace</strong>: with the room, and with yourself. <strong>Love</strong>: for friends, for strangers, for the version of you that showed up tonight. <strong>Unity</strong>: the thing that takes over when the bass drops and everybody, regardless of who they are, is in it together. <strong>Respect</strong>: for other people, for the music, and for your own body and limits. Thirty years on, ravers still argue about who said it first. Almost nobody argues about what it means.</p>

    <img src="https://images.unsplash.com/photo-1571266752756-0fe20de8dde1?w=800&q=80"
      alt="DJ performing at underground event"
      style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

    <h2>The Kandi Handshake</h2>

    <p>At some point in the early 90s New York scene,
    someone started making bracelets out of plastic beads and trading them.
    The beads were cheap. The elastic was cheap.
    The making of them was meditative,
    something to do with your hands during the long weeks between parties.
    The trading of them became a ritual.</p>

    <img src="/images/plur/plur-handshake.png" alt="The PLUR handshake: Peace, Love, Unity and Respect hand gestures showing how to trade kandi" style="width:100%;max-width:100%;margin:24px 0;" />

    <p>The PLUR handshake formalized that ritual.
    Four gestures, one for each letter.
    Press palms together for Peace.
    Lace fingers together for Love.
    Join thumbs for Unity.
    Slide the bracelet from your wrist to theirs for Respect.</p>

    <p>What made the handshake significant was not the steps themselves
    but what the steps required.
    You had to slow down.
    You had to make eye contact.
    You had to be present with another person,
    in a genuine physical exchange,
    for long enough to feel it.</p>

    <p>In a room where hundreds of people were moving to the same music,
    the handshake was the moment of actual connection.
    The bracelet you left with was proof of it.</p>

    <img src="https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=800&q=80"
      alt="Kandi bracelets and festival accessories"
      style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

    <h2>How PLUR Spread</h2>

    <p>Through the early and mid 90s the rave scene expanded rapidly
    out of New York into other American cities.
    Chicago, Los Angeles, San Francisco, Miami.
    Each city developed its own character but the
    core cultural values traveled with the music.</p>

    <p>The internet accelerated this.
    Early rave forums and mailing lists in the mid-90s
    carried PLUR discussions across cities and later across countries.
    People who had never been to a New York party understood what
    it meant because someone had taken the time to write it down and share it.</p>

    <p>By the late 90s PLUR had become the de facto philosophy of rave culture worldwide.
    It showed up on flyers, on merchandise, in DJ dedications.
    It became so widespread that it also became,
    in some corners of the scene, shorthand for naivety.
    People who took it too seriously were mocked.
    PLUR was for kids who didn't know better.</p>

    <p>That tension has never fully resolved.
    It is still there today every time someone rolls their eyes at a kandi trade
    and every time a stranger in a crowd quietly makes space
    without being asked.</p>

    <h2>The Commercial Era</h2>

    <p>When EDM exploded into mainstream American culture in the early 2010s,
    PLUR came with it.
    Suddenly it was on Urban Outfitters shirts.
    On jewelry in mall stores.
    On social media captions from people who had never been to a party
    that wasn't held in an amphitheater.</p>

    <p>The scene veterans mostly hated this.
    PLUR had been theirs. A code from the underground.
    Watching it appear on a chain store rack felt like theft.</p>

    <p>The critique was real but it missed something.
    Every generation of ravers had to discover PLUR for the first time.
    The kids buying the shirts were the same kids who would eventually
    show up to their first festival, trade their first kandi,
    and understand in their chest what the words actually meant.
    Commodification is ugly but it is also how subcultures reproduce themselves.
    The thing spreads further than it ever would have in the warehouse.</p>

    <h2>PLUR in 2026</h2>

    <p>The rave landscape today looks almost nothing like a Brooklyn warehouse in 1990.
    EDC Las Vegas draws 500,000 people.
    Festival tickets cost as much as rent.
    The artists headline arenas between their festival sets.
    The money involved would have been inconceivable
    to the people who coined the phrase.</p>

    <p>And yet PLUR is still there.
    You can feel it in the moments that matter.
    When someone passes you a water bottle without you asking.
    When the crowd parts for a flow artist and closes again gently around them.
    When a stranger sits with someone who is having a hard time
    instead of stepping over them and walking on.</p>

    <p>Those moments do not happen because of a shirt or a bracelet or a phrase.
    They happen because someone in the room chose to act that way,
    and someone else saw it and did the same,
    and it accumulated into a culture that is still recognizable
    thirty-five years after someone stopped the music in Brooklyn
    and said something that needed to be said.</p>

    <p>That is what PLUR actually is.
    Not a slogan. A decision. Made over and over again,
    by different people, in different rooms,
    every night the music plays.</p>

    <p style="margin-top:32px;padding:20px;
      background:rgba(182,77,255,0.06);
      border-left:3px solid #b64dff;
      line-height:1.8;">
      New to rave culture? Read our
      <a href="/blog-post?id=post-003"
        style="color:var(--cyan);">
        PLUR 101 beginner guide
      </a>
      and visit the
      <a href="/safety"
        style="color:var(--cyan);">
        Safety and PLUR page
      </a>
      for everything you need to know before your first festival.
    </p>
  `
  },

  {
    id: 'post-001',
    title: 'Project GLOW 2026: The Complete Guide',
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
      <p>Project GLOW returns to Washington DC for its <strong>5th anniversary</strong> on May 30–31, 2026 at RFK Festival Grounds, and this year feels different. The lineup is the strongest it has ever been, the production is scaling up, and if you have been sleeping on this festival, this is the year to wake up.</p>

      <p>Born from <strong>Club GLOW</strong>, the longest-running electronic music promoter on the East Coast, Project GLOW has grown from a local DC staple into one of the most respected regional festivals in the country. Here is everything you need to know before you go.</p>

      <img src="https://images.unsplash.com/photo-1571266752756-0fe20de8dde1?w=800&q=80" alt="Festival crowd under lights" style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

      <h2>The Lineup</h2>

      <h3>🌐 Eternal Stage</h3>
      <p>The main stage lineup for Day 1 is headlined by <strong>Eric Prydz</strong>, a name that needs no introduction. If you have never seen a Prydz set live, this is one of the most production-heavy shows in electronic music. Plan your Day 1 around being at the Eternal Stage by 9:45PM. Supporting him: Disco Lines, Sara Landry, DJ Mandy, Lilly Palmer, and Kream.</p>
      <p>Day 2 closes with <strong>Porter Robinson</strong> followed by <strong>Excision B2B Sullivan King</strong>: two completely different energies back to back. Gryffin plays sunset. Alleycvt, Ninajirachi, YDG, and Probcause round out the afternoon.</p>

      <h3>🔊 Pulse Stage</h3>
      <p>The bass stage is where it gets chaotic. <strong>Zeds Dead</strong> headlines Day 1 and <strong>Mau P</strong> closes Day 2. G Jones B2B Eprom, Wooli, Dimension, and Ray Volpe fill out a stage that runs hard from 1PM to 11PM both days.</p>

      <h3>🌿 Secret Garden</h3>
      <p>The underground stage is the hidden gem of Project GLOW. <strong>Nicole Moudaber B2B Chasewest</strong> closes Day 1 in what should be one of the sets of the weekend. Day 2 brings Spencer Brown B2B Qrion, Cosmic Gate, Eli & Fur, and Cassian. If you are into deeper, darker sounds, spend time here.</p>

      <img src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80" alt="Concert stage lights" style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

      <h2>Getting There</h2>
      <p>RFK Festival Grounds sits just off the <strong>Stadium-Armory Metro stop</strong> on the Orange, Blue, and Silver lines. If you are coming from anywhere in the DC/Maryland/Virginia area, metro is genuinely your best option. Parking is available but limited and expensive, so budget an extra 30 minutes if you drive.</p>
      <p>Rideshare dropoff zones are clearly marked on the festival map. Uber and Lyft surge hard after the show ends, so consider walking to a nearby street before requesting or splitting with your group.</p>

      <h2>What to Bring</h2>
      <ul style="margin:16px 0 16px 20px;line-height:2;">
        <li>Small backpack (under 18 inches)</li>
        <li>Sealed water bottle up to 32oz (refill stations are throughout the venue)</li>
        <li>Earplugs (seriously, your ears will thank you)</li>
        <li>Sunscreen (no aerosol)</li>
        <li>Kandi and flow toys (no sharp edges)</li>
        <li>Phone charger / portable battery</li>
        <li>Cash and card, both accepted inside</li>
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
      <p>Project GLOW has a Good Samaritan policy: if someone needs help, seek it. You will not get in trouble for doing the right thing.</p>

      <h2>Tickets</h2>
      <p>GA passes start at <strong>$119 all-in</strong> for both days. GA+ ($139) includes expedited entry and access to air-conditioned rest areas. VIP starts at $249. Layaway is available through Front Gate Tickets with a $5 deposit. Buy directly from the official site, never from third-party resellers or Facebook groups.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(0,229,255,0.06);border-left:3px solid #00e5ff;"><strong>Bottom line:</strong> Project GLOW is one of the best-run festivals on the East Coast. The stages are close together, the crowd is welcoming, and the production punches above its weight. If you are within driving distance of DC, go.</p>
    `
  },

  {
    id: 'post-002',
    title: 'EDC Las Vegas 2026: What to Expect at the 30th Anniversary',
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
      <p>Electric Daisy Carnival turns <strong>30 years old in 2026</strong>, and Insomniac is pulling out everything for the anniversary. EDC Las Vegas runs <strong>May 15–17</strong> at the Las Vegas Motor Speedway, and if you have ever considered going, this is the year.</p>

      <p>EDC is not just a festival. It is the single largest electronic music event in North America, and arguably the most important. Three nights. Nine stages. 200+ artists. 500,000 headliners from around the world, all under what Insomniac calls "the electric sky."</p>

      <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" alt="Massive festival crowd at night" style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

      <h2>The Stages</h2>
      <p>EDC's stage lineup is unlike anything else in festival production:</p>
      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>kineticFIELD</strong>: the iconic mainstage. The centerpiece of the entire festival. Production that takes a full year to build.</li>
        <li><strong>cosmicMEADOW</strong>: the second mainstage. Typically progressive house and techno.</li>
        <li><strong>circuitGROUNDS</strong>: bass and hard dance. One of the loudest stages on the property.</li>
        <li><strong>neonGARDEN</strong>: the underground techno stage. Dark, sweaty, and relentless.</li>
        <li><strong>wasteLAND</strong>: the experimental and hard techno stage. Industrial and raw.</li>
        <li><strong>basspod</strong>: dubstep, riddim, and bass music</li>
        <li><strong>quantumVALLEY</strong>: trance and progressive</li>
        <li><strong>stereoBLOOM</strong>: house and disco</li>
        <li><strong>pixel forest</strong>: art installation with live music</li>
      </ul>

      <h2>Confirmed Headliners</h2>
      <p>The 30th anniversary lineup features Martin Garrix, Tiësto, Alesso, Excision, Seven Lions, Fisher, Eric Prydz, and Subtronics, with more names being announced in waves. Full lineup drops typically happen 2–3 months before the event on the official EDC website.</p>

      <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80" alt="DJ on stage" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>Surviving EDC: The Practical Guide</h2>
      <p>EDC is a 3-night outdoor desert festival. It runs from roughly <strong>7PM to 5AM</strong> each night. The Las Vegas desert can be cold at night even in May. Temperatures drop significantly after midnight. Here is what veteran headliners recommend:</p>

      <h3>Sleep and Recovery</h3>
      <p>You will not sleep much. Plan for it. Book your hotel with blackout curtains and try to get 6+ hours during the day before each night. Most experienced EDC attendees stay at hotels directly on the Las Vegas Strip and use the official shuttle service to the speedway, which is strongly recommended over driving or rideshare.</p>

      <h3>Hydration and Heat</h3>
      <p>Hydration packs (up to 70oz) are allowed and highly recommended. The Speedway is massive. You will walk miles each night. Bring electrolyte packets. Water refill stations are throughout the venue and free. Do not drink alcohol without matching it with water.</p>

      <h3>What to Wear</h3>
      <p>Layers. Desert nights go from warm to cold fast. A pashmina or light jacket is essential. Comfortable shoes you can stand and dance in for 8+ hours. Bring earplugs. At EDC this is non-negotiable: the stages are loud.</p>

      <h2>Tickets and Cost</h2>
      <p>GA 3-day passes start around <strong>$459 all-in</strong> with layaway available through Front Gate Tickets. GA+ and VIP options exist at higher price points. Hotel packages are available through Insomniac's official travel partners and sell out fast, so book early if you want on-site convenience.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(182,77,255,0.06);border-left:3px solid #b64dff;"><strong>30 years is a milestone.</strong> EDC 2026 will be remembered. If there is one festival to splurge on this decade, this is it.</p>
    `
  },

  {
    id: 'post-003',
    title: 'PLUR 101: A Beginner\'s Guide to Rave Culture',
    slug: 'plur-101-beginners-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-04-20',
    category: 'culture',
    coverImage: 'images/plur/plur-101-cover.svg',
    excerpt: 'New to raving? Here\'s everything you need to know about the culture, etiquette, kandi trading, and why PLUR isn\'t just a slogan: it\'s how we actually look out for each other on the dancefloor.',
    published: true,
    featured: false,
    body: `
      <p>Everyone starts somewhere. Maybe a friend invited you to your first festival and you had no idea what to expect. Maybe you have been curious about rave culture for a while and finally decided to dive in. Either way, welcome. You are in the right place.</p>

      <p>This guide covers everything a first-time raver needs to know: what PLUR actually means, how kandi trading works, dancefloor etiquette, and how to have a safe and genuinely amazing time.</p>

      <h2>What is PLUR?</h2>
      <p>PLUR stands for <strong>Peace, Love, Unity, Respect</strong>. It started in the early 90s New York rave scene as both a greeting and a philosophy, and it became the backbone of global rave culture for a reason.</p>

      <p>PLUR is not just a slogan. It is how the rave community actually operates at its best:</p>

      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Peace</strong>: no judgment, no gatekeeping, no ego. The dancefloor is a judgment-free zone. It doesn\'t matter what you\'re wearing, what music you like, or how long you\'ve been going to raves.</li>
        <li><strong>Love</strong>: unconditional love for strangers. The kind that makes someone hand you water when you look overheated, or check on you if you\'re sitting alone outside a tent.</li>
        <li><strong>Unity</strong>: one crowd, one energy. Every background, every genre preference, every body. The dancefloor erases all of it.</li>
        <li><strong>Respect</strong>: for personal space, for consent, for the music, and for each other. Respect means looking out for people around you.</li>
      </ul>

      <h2>Kandi: What It Is and How Trading Works</h2>
      <p>Kandi are the colorful beaded bracelets you will see ravers wearing stacked up their arms. Each one was handmade by someone, worn, and traded. Every piece has a story.</p>

      <p>Trading kandi is one of the most beloved rituals in rave culture. It happens through the <strong>PLUR handshake</strong>, a four-step gesture that physically represents each letter:</p>

      <ol style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Peace</strong>: press your flat palms together (like a namaste)</li>
        <li><strong>Love</strong>: interlock your fingers together</li>
        <li><strong>Unity</strong>: hook your thumbs together, hands still joined</li>
        <li><strong>Respect</strong>: slide the kandi bracelet from your wrist to theirs</li>
      </ol>

      <p>A few etiquette rules: always ask before initiating. Accept a trade graciously even if the piece isn\'t your style, because it\'s about the connection, not the bracelet. Never demand kandi or trade with someone who seems uncomfortable. You can always politely decline.</p>

      <h2>How to Do the PLUR Handshake</h2>
      <p>If you\'ve ever watched two ravers press their hands together and swap bracelets, you\'ve seen the PLUR handshake, the little ritual behind trading <em>kandi</em> (the beaded bracelets you\'ll see all over any show). It spells out the four words the whole scene is built on: Peace, Love, Unity, Respect. Here\'s how it goes.</p>
      <img src="/images/plur/plur-handshake.png" alt="The PLUR handshake: Peace, Love, Unity and Respect hand gestures showing how to trade kandi" style="width:100%;max-width:100%;margin:24px 0;" />
      <ol style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Peace</strong>: You each make a peace sign and touch your two fingers to theirs.</li>
        <li><strong>Love</strong>: You each form half a heart with your hand and bring them together into one.</li>
        <li><strong>Unity</strong>: Press your palms flat together, hands meeting in the middle.</li>
        <li><strong>Respect</strong>: Interlock your fingers, then slide a kandi bracelet off your wrist and onto theirs.</li>
      </ol>
      <p>That\'s it. The bracelet you pass along is theirs to keep, a small piece of the night that says you\'re glad they\'re here. Don\'t overthink it; everyone\'s first trade is a little awkward, and that\'s half the fun.</p>

      <h2>Dancefloor Etiquette</h2>
      <p>Rave etiquette is mostly common sense, but here are the things that matter:</p>

      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Watch your space.</strong> Festivals are crowded. Be aware of the people around you, especially near the front of stages.</li>
        <li><strong>Ask before touching.</strong> Consent is non-negotiable. Always ask before hugging, dancing with, or touching anyone.</li>
        <li><strong>Check on people.</strong> If someone looks unwell, check on them. If they need help, find a medic. That is what they are there for.</li>
        <li><strong>Don\'t push to the front.</strong> The people who got there early earned their spot.</li>
        <li><strong>Leave space for flow artists.</strong> If someone is spinning or doing flow arts, give them room. It is genuinely beautiful to watch and dangerous to interrupt.</li>
      </ul>

      <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" alt="Festival crowd dancing" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>Safety Basics for Your First Rave</h2>
      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li>Tell someone where you\'re going and when you expect to be back</li>
        <li>Go with at least one person you trust</li>
        <li>Agree on a meeting spot before you go in, because phones die and crowds split groups</li>
        <li>Drink water. Roughly 500ml per hour if you\'re dancing</li>
        <li>Bring earplugs. The music is loud and hearing damage is permanent</li>
        <li>Know where the medical tent is when you first arrive</li>
        <li>DanceSafe is at most major festivals. Find them for harm reduction information</li>
      </ul>

      <h2>What to Wear</h2>
      <p>Rave fashion is expressive and there are truly no rules, but practically speaking: wear shoes you can stand in for hours, bring a layer if you\'re at an outdoor event, and if you\'re in a crowd, wear something you\'re comfortable moving in.</p>

      <p>Kandi, LED accessories, and flow toys are all welcome at most festivals. Check the specific event\'s rules on what\'s allowed before you go.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(61,255,133,0.06);border-left:3px solid #3dff85;"><strong>The most important thing:</strong> show up with an open mind and genuine respect for the people around you. The rave community is one of the most welcoming on earth when PLUR is actually practiced. We are glad you\'re here.</p>
    `
  },

  {
    id: 'post-004',
    title: 'Electric Forest 2026: Why This is Unlike Any Other Festival',
    slug: 'electric-forest-2026-guide',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-04-10',
    category: 'festival-news',
    coverImage: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80',
    excerpt: 'Electric Forest is not just a festival. It\'s a world built inside a Michigan pine forest. ILLENIUM, GRiZ, and Subtronics headline a 4-day experience that is genuinely unlike anything else.',
    published: true,
    featured: false,
    body: `
      <p>There is Electric Forest, and then there is every other festival. That sounds like hype, but ask anyone who has been and they will tell you the same thing. The forest changes people.</p>

      <p>Electric Forest runs <strong>June 25–28, 2026</strong> at Double JJ Resort in Rothbury, Michigan. It is a 4-day camping festival built around and inside <strong>Sherwood Forest</strong>, a real pine forest that the production team spends an entire year transforming into something that defies description.</p>

      <img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80" alt="Forest lights at night" style="width:100%;height:300px;object-fit:cover;margin:24px 0;">

      <h2>Sherwood Forest: The Heart of It All</h2>
      <p>Sherwood Forest is not a stage. It is a 24-hour art installation: a winding network of paths through the trees, each one lit differently, filled with art pieces, secret stages, performers, and moments that happen nowhere else on earth.</p>

      <p>You might turn a corner at 3AM and find a string quartet playing in a clearing. Or a fire performer. Or an entire crowd of people dancing to a DJ set underneath a canopy of lights strung through the trees. The forest runs all night and it is worth staying up for.</p>

      <h2>The 2026 Lineup</h2>
      <p>The headline acts for 2026 include <strong>ILLENIUM</strong>, <strong>GRiZ performing twice</strong> (a tradition at EF), and <strong>Subtronics</strong>. The booking that has everyone talking: <strong>Shaquille O\'Neal B2B T-Pain</strong> in a DJ set that will absolutely be unhinged in the best possible way.</p>

      <p>Electric Forest\'s strength is always the depth of the lineup, with bass music, jam bands, psychedelic electronic, house, and experimental acts filling 4 days across multiple stages. There is always something happening worth seeing.</p>

      <h2>Camping is Part of the Experience</h2>
      <p>Electric Forest is a camping festival in the truest sense. <strong>On-site camping is strongly recommended</strong>: the experience of waking up in the forest, walking to stages, and spending 4 full days in this environment is fundamentally different from commuting in each day.</p>

      <p>General camping is included with GA Camping passes. Good Life (VIP) camping offers upgraded amenities. The campgrounds have showers, though lines get long, so shower at off-peak hours (early morning or late afternoon).</p>

      <img src="https://images.unsplash.com/photo-1478827387698-1527781a4887?w=800&q=80" alt="Camping at festival" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>Practical Tips from Veterans</h2>
      <ul style="margin:16px 0 16px 20px;line-height:2.2;">
        <li><strong>Bring a wagon.</strong> You will haul gear from your car to your campsite and a wagon makes it manageable. Many people rent them on-site.</li>
        <li><strong>Michigan weather is unpredictable.</strong> Pack a poncho and a layer. June can be beautiful and it can also rain hard for a full day.</li>
        <li><strong>Get lost in the forest.</strong> The scheduled FOMO is real but some of the best Electric Forest moments happen when you wander with no plan.</li>
        <li><strong>Bring lights for your campsite.</strong> String lights, LED stakes, anything to mark your tent so you can find it at 4AM.</li>
        <li><strong>The Good Life Lounge</strong> is worth it if you can afford it: AC, private bathrooms, and a shaded viewing area.</li>
      </ul>

      <h2>Tickets</h2>
      <p>GA Camping passes start around <strong>$399</strong>. Good Life (VIP) from $799. Day tickets are available at a lower price point if you cannot commit to all 4 days. Layaway is available. Electric Forest typically sells out well before the event, so do not wait.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(61,255,133,0.06);border-left:3px solid #3dff85;"><strong>If you can only go to one new festival this year, make it Electric Forest.</strong> It is the kind of experience that becomes a reference point, before and after.</p>
    `
  },

  {
    id: 'post-006',
    title: 'The Coachella Effect: What Happens When the Mainstream Finds Our Festivals',
    slug: 'coachella-effect-plur-culture',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-05-28',
    category: 'culture',
    coverImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
    excerpt: 'Subtronics went viral on TikTok. Coachella booked Fisher. Bass music is everywhere. A new wave of fans is discovering our festivals, and some of them have never heard of PLUR. Here\'s what that means for the culture, and what we all have a responsibility to do about it.',
    published: true,
    featured: true,
    body: `
    <p>Something shifted in the last two years. Bass music started showing up in mainstream playlists. Subtronics went viral on TikTok. Coachella booked Fisher, then four Anyma sets. Your coworker who has never been to a festival suddenly bought EDC tickets. Your little brother discovered Excision through a YouTube algorithm rabbit hole.</p>

    <p>This is not a bad thing. Growth is how culture survives. But it comes with a tension that anyone who has been in the rave scene for more than a few years can feel in real time, especially at festivals like Project Glow, which used to be a tight-knit East Coast family event and now draws crowds that include people who have genuinely never heard the word PLUR.</p>

    <img src="https://images.unsplash.com/photo-1571266752756-0fe20de8dde1?w=800&q=80" alt="Festival crowd at night" style="width:100%;height:300px;object-fit:cover;margin:24px 0;border-radius:2px;">

    <h2>What the Coachella Effect Actually Is</h2>

    <p>Coachella has always been a mainstream festival with an electronic component. But in 2024 and 2025 something changed: the electronic acts stopped being a side attraction and started being the reason people went. The Sahara tent became the most talked-about stage. Artists like Subtronics, Anyma, and Dom Dolla were pulling crowds that rivaled the headliners.</p>

    <p>The result is a generation of fans who discovered electronic music through Coachella, through TikTok clips, through Spotify algorithmic playlists, and then bought tickets to underground and mid-sized festivals that were built on an entirely different set of values. They came for the music. They had no idea the music came with a culture.</p>

    <p>That is not their fault. Nobody told them. And that is partly our fault as a community.</p>

    <h2>What You Actually Notice in the Crowds</h2>

    <p>If you have been to Project Glow, Movement, or any regional festival in the last two years, you have probably felt it. The pushing at the rail. The phones held up blocking everyone behind them for forty-five minutes. The group that bulldozes through a crowd mid-set like they are walking through a shopping mall. The person who steps on your feet and does not turn around.</p>

    <p>None of these people are villains. Most of them just do not know. They went to Coachella where the crowd behavior is different, or they went to a stadium show, and they carried those habits with them into spaces that operate on different rules. Rules that were never written down anywhere, because for a long time, everyone in the room already knew them.</p>

    <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" alt="Crowd at electronic music festival" style="width:100%;height:280px;object-fit:cover;margin:24px 0;border-radius:2px;">

    <h2>Why PLUR Is Not Just a Slogan</h2>

    <p>Peace, Love, Unity, Respect. It sounds like something you would print on a tote bag. But PLUR was never a marketing slogan. It was a code of conduct that developed organically in the early 90s New York rave scene because the people in those rooms needed one. Raves were illegal. The crowds were in basements and warehouses. Everyone was in an unfamiliar situation together, and the culture that emerged said: we look after each other here.</p>

    <p>That ethos is what makes a rave different from a concert. At a concert you go to be entertained. At a rave you are part of the experience. The energy of the crowd is the experience. When the person next to you is looking out for you, when a stranger hands you water, when someone apologizes for bumping into you and you end up talking for an hour. That is PLUR working. That is what people who discovered this culture through a TikTok clip do not know they are missing.</p>

    <p>And honestly? Once they experience it, most of them love it. The problem is someone has to introduce them to it.</p>

    <h2>The Unwritten Rules, Written Down</h2>

    <p>Consider this the handbook nobody gave you when you bought your first festival ticket.</p>

    <h3>Moving Through Crowds</h3>
    <p>When you need to move through a crowd during a set (and sometimes you do), you say excuse me before you move, not after. You touch people on the shoulder gently to signal you are coming through. You say thank you when they make space. If you accidentally step on someone or knock into them, you turn around, you make eye contact, and you apologize. This is not optional. This is the baseline.</p>

    <p>The crowd is not an obstacle between you and the rail. The crowd is people who got there first and have as much right to their space as you do to yours.</p>

    <h3>Phone Culture</h3>
    <p>Record the drop. Film the moment. Nobody is telling you to put your phone away forever. But holding your phone up for full sets, blocking the view of everyone behind you, is one of the most common complaints in the rave community right now and it comes almost entirely from the newer wave of festival attendees. Be present. Film thirty seconds. Put it down. The memory in your body is better than the video on your phone.</p>

    <h3>Flow Artists and Space</h3>
    <p>If someone is spinning poi, using a flowstar, or doing any kind of flow art near you, give them room. Do not crowd into their space out of curiosity. Watch from a respectful distance. Flow artists are part of the event. Some of them have practiced for years. Bumping into someone mid-flow with an expensive LED prop is not a small thing.</p>

    <h3>Looking Out</h3>
    <p>If someone near you looks unwell (too hot, too disoriented, too quiet), check on them. Ask if they are okay. If they are not, find medical staff. Do not step over someone sitting on the ground and assume someone else will handle it. PLUR is not a personal philosophy. It is a collective one. It only works when everyone participates.</p>

    <h3>The Rail</h3>
    <p>Pushing to the front mid-set is one of the most universally disliked behaviors in rave crowds. The people at the rail got there early. They planned for it. They gave up their spot elsewhere for it. Forcing your way through to join them mid-set is taking something that was not yours to take. If you want the rail, get there early.</p>

    <h3>Kandi</h3>
    <p>If someone initiates the PLUR handshake with you, participate or decline gracefully. Do not leave them hanging. If you receive kandi, accept it with genuine appreciation even if you do not know what it is. Someone made it by hand, wore it, and chose you. That is a meaningful gesture in this culture. Treat it like one.</p>

    <img src="https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=800&q=80" alt="Colorful kandi bracelets" style="width:100%;height:260px;object-fit:cover;margin:24px 0;border-radius:2px;">

    <h2>What the Community Owes Newcomers</h2>

    <p>Here is the part that is harder to say: the rave community is not without blame here. Gatekeeping is real. The attitude of "you should already know this" is real. Newcomers who show up not knowing the culture are sometimes made to feel unwelcome rather than educated.</p>

    <p>That is not PLUR either.</p>

    <p>If you see someone doing something that violates the norms of the space (phones up, pushing through crowds, not giving flow artists room), the response that serves the culture is not to glare at them or complain to your friends. It is to gently, non-aggressively, say something. "Hey, just so you know, at raves we usually do it this way." Most people, when told the culture exists, want to be part of it. They just needed someone to tell them.</p>

    <p>Subtronics going viral is good. More people discovering bass music is good. Project Glow selling out is good. A bigger tent means more resources, more artists, more production. But a bigger tent also means more people who need to be welcomed into what the tent actually stands for.</p>

    <p>That is on all of us.</p>

    <h2>To the New Ravers Reading This</h2>

    <p>Welcome. Genuinely. The fact that you found this article, whether through an algorithm or a friend or a Google search after your first festival, means you are already doing something right. You are curious about the culture, not just the music.</p>

    <p>The music is why you came. The culture is why you will stay.</p>

    <p>PLUR is not a test you pass or fail. It is a practice. It is imperfect and it is ongoing and some days the crowd is beautiful and some days it is frustrating and that is true of every community that has ever existed. But at its best, the version that exists at 2AM when the bass is rattling your chest and a stranger hands you their last electrolyte packet because you look like you need it, there is nothing like it anywhere else in the world.</p>

    <p>That is what we are protecting when we talk about PLUR. Not a slogan. A feeling. And it belongs to anyone willing to show up for it.</p>

    <p style="margin-top:32px;padding:20px;background:rgba(0,229,255,0.06);border-left:3px solid #00e5ff;line-height:1.8;">
      <strong>New to raving?</strong> Check out our
      <a href="/blog-post?id=post-003" style="color:var(--cyan);">PLUR 101 guide</a>
      and our <a href="/safety" style="color:var(--cyan);">Safety & PLUR page</a>
      for everything you need to know before your first festival.
    </p>
  `
  },

  {
    id: 'post-007',
    title: 'The Complete Rave Packing List: What to Actually Bring',
    slug: 'complete-rave-packing-list',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-05-29',
    category: 'festival-news',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    excerpt: 'The definitive festival packing list, built from real experience, not Pinterest boards. What you actually need, what you will definitely forget, what to leave at home, and why earplugs are the most important thing on this entire list.',
    published: true,
    featured: false,
    body: `
    <p>Every festival season the same thing happens. Someone packs a bag, shows up,
    and spends the first hour desperately searching the vendor area for something
    they forgot. Usually it is sunscreen. Sometimes it is a phone charger.
    Occasionally it is socks.</p>

    <p>This is the list we wish someone had given us at our first festival.
    Not the Pinterest version. The real one, built from experience,
    from mistakes, and from watching strangers suffer in the heat because
    they brought the wrong shoes.</p>

    <img src="https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=800&q=80"
      alt="Festival camping gear laid out"
      style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

    <h2>The Non-Negotiables</h2>
    <p>These are the items that if you forget them,
    your festival experience is actively worse.
    Not just inconvenient: actually worse.</p>

    <h3>🎧 Earplugs: the most important thing on this list</h3>
    <p>We are putting this first because most people put it last and then forget it.
    Festival stages are loud. Genuinely dangerously loud: sustained exposure
    above 85dB causes permanent hearing damage and festival main stages
    regularly hit 100dB+. High-fidelity earplugs (Eargasm, Loop, Earasers,
    Etymotic) reduce volume without killing sound quality.
    The music still sounds incredible. Your ears still work at 40.</p>
    <p>Foam disposable earplugs work in a pinch but muffle the sound badly.
    Invest $20-40 in a real pair. You will use them for years.</p>

    <h3>💧 Water bottle, sealed, 32oz max</h3>
    <p>Most festivals allow sealed water bottles up to 32oz.
    Bring one. Fill it at the free water stations that are
    located throughout every licensed festival.
    Do not rely on buying water inside.
    You will spend $8 per bottle and run out constantly.</p>

    <h3>🎒 Small backpack, under 18 inches</h3>
    <p>The standard allowed size at most festivals.
    Measure yours before you go. A hydration pack (CamelBak style)
    is even better if you are dancing heavily:
    hands free, always hydrated, up to 70oz allowed at most events.</p>

    <h3>🪪 ID and tickets</h3>
    <p>Screenshot your tickets AND have the app downloaded.
    Screenshot them saved to your camera roll so they load
    without signal. Your ID gets checked at entry and at
    any age-restricted area inside. Do not leave it in the car.</p>

    <h3>💊 Electrolyte packets, 2 per day minimum</h3>
    <p>Liquid IV, LMNT, Nuun tablets, whatever your preference.
    Dehydration at festivals is rarely about not drinking enough water.
    It is about drinking water without replacing the electrolytes
    lost through sweat. One packet dissolved in your water bottle
    per session changes how you feel dramatically.</p>

    <h3>🔋 Portable phone charger</h3>
    <p>Your phone will die. It always dies.
    A 10,000mAh power bank charges most phones
    2-3 times and fits in a small bag pocket.
    Charge it fully the night before.
    Bring the right cable for your phone.</p>

    <img src="https://images.unsplash.com/photo-1571266752756-0fe20de8dde1?w=800&q=80"
      alt="Festival crowd at night"
      style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

    <h2>Safety & Harm Reduction</h2>

    <h3>🧪 Fentanyl test strips</h3>
    <p>Available at most pharmacies without a prescription
    and from DanceSafe at dancesafe.org.
    Fentanyl is in the drug supply.
    Test strips take 30 seconds and can save a life.
    Bring them. Use them. Give them to friends.</p>

    <h3>💊 Narcan (naloxone)</h3>
    <p>Available over the counter at CVS, Walgreens, and Rite Aid.
    Reverses opioid overdoses.
    You do not need a prescription.
    You do not need to know how to use it in advance:
    the instructions are on the box.
    Keep it accessible in your bag, not buried at the bottom.</p>

    <h3>🩹 Basic first aid</h3>
    <p>A small travel first aid kit:
    band-aids, blister pads (you will blister),
    ibuprofen, antacids.
    Not glamorous. Necessary.</p>

    <h3>🌡️ Hand fan or personal misting fan</h3>
    <p>Heat exhaustion at festivals is serious and
    it happens faster than people expect.
    A small battery-powered misting fan is $10-15
    and genuinely life-changing at an outdoor summer festival.
    Aim it at your wrists and neck for fastest cooling.</p>

    <h3>☀️ Sunscreen, no aerosol</h3>
    <p>Most festivals ban aerosol sunscreen for fire safety reasons.
    Bring lotion or spray in a non-aerosol bottle.
    SPF 50. Reapply every two hours if you are outdoors.
    Sunburn makes a three-day festival significantly less fun
    starting around hour six of day one.</p>

    <h2>What to Wear, and What to Bring for Later</h2>

    <h3>👟 Shoes you can stand in for 8+ hours</h3>
    <p>This is where people make the biggest mistake.
    Platform boots look incredible.
    Platform boots after six hours of dancing on concrete
    feel like punishment. If you are going to wear platforms,
    break them in first. Wear them around the house,
    on walks, anywhere for at least a few weeks before the festival.
    Bring blister pads and moleskin regardless.</p>

    <h3>🧣 A layer for after midnight</h3>
    <p>Outdoor summer festivals get cold at night.
    This surprises people every single time.
    You will be sweaty and then suddenly you will be in the dark
    with a breeze and you will need a layer.
    A lightweight pashmina or pullover packs flat
    and saves you from misery after midnight.
    This doubles as something to sit on during sets
    and a pillow if you end up somewhere unexpected.</p>

    <h3>👙 Your actual outfit, plus a backup</h3>
    <p>Bring one backup outfit element:
    a spare top, spare shorts, something.
    Festivals are unpredictable.
    Things spill, things tear, weather happens.
    A backup takes up almost no space and has saved
    more festival experiences than we can count.</p>

    <h3>🧦 Extra socks</h3>
    <p>Specifically mentioned because specifically forgotten.
    One extra pair. Trust us.</p>

    <img src="https://images.unsplash.com/photo-1598387993441-a364f854cfba?w=800&q=80"
      alt="Festival fashion and kandi"
      style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

    <h2>Kandi & Culture Items</h2>

    <h3>📿 Kandi to trade</h3>
    <p>You do not need to bring a lot.
    Even five or six pieces is enough for a meaningful trading experience.
    If you do not have any, visit the PLURGASM brand directory:
    there are several shops that sell premade kandi
    ready to trade the same week you order.</p>

    <h3>🎨 Glitter, body jewels, accessories</h3>
    <p>Cosmetic glitter is fine.
    Craft glitter is microplastic and bad for the environment,
    and most festivals are moving away from it.
    Body jewels, face gems, and LED accessories are all great
    and allowed at most events.
    Check the specific festival rules before you pack anything unconventional.</p>

    <h3>🌀 Flow props: check rules first</h3>
    <p>Flowstars, poi, LED gloves, and most flow props are
    allowed at most festivals with the caveat that
    they cannot have sharp edges and cannot be used
    in crowded areas unsafely.
    Check the specific festival policy before you pack yours.
    Keep them secured in your bag during transit.</p>

    <h2>Tech & Practical Gear</h2>

    <h3>📱 Screenshot everything</h3>
    <p>Festival apps crash. Cell service at festivals is genuinely terrible:
    50,000 people in one field destroys tower capacity.
    Screenshot your ticket, the festival map,
    the set times, your campsite location (if camping),
    and the address of where you are staying.
    All of it. Saved to your camera roll, accessible offline.</p>

    <h3>💵 Cash</h3>
    <p>Most festivals accept card everywhere but the ATMs inside
    charge $8-12 per transaction and run out of cash by day two.
    Bring $60-100 in small bills.
    You will use it for tips, for small vendors,
    and for emergencies when a card reader is down.</p>

    <h3>🔦 Small flashlight or headlamp</h3>
    <p>Camping festivals specifically.
    Finding your tent at 3AM in a dark campground
    without a light is an experience.
    A small headlamp or clip-on flashlight
    is one of those things that costs $8
    and earns its place every single time you use it.</p>

    <h2>What NOT to Bring</h2>
    <p>What you leave at home matters as much as what you pack.</p>

    <ul style="margin:16px 0 24px 20px;line-height:2.2;">
      <li><strong>Large backpacks over 18 inches</strong>:
        will be turned away at security. Measure first.</li>
      <li><strong>Outside alcohol</strong>:
        confiscated at every festival, no exceptions.</li>
      <li><strong>Professional cameras with detachable lenses</strong>:
        banned at most events.
        Your phone camera is genuinely good enough.</li>
      <li><strong>Aerosol anything</strong>:
        sunscreen, dry shampoo, body spray. All banned.</li>
      <li><strong>Anything you cannot afford to lose</strong>:
        expensive jewelry, irreplaceable items,
        your grandmother's ring.
        Things get lost, things get stolen.
        Leave valuables at home.</li>
      <li><strong>Drones</strong>: banned universally.</li>
      <li><strong>Selfie sticks, laser pointers</strong>:
        confiscated immediately.</li>
      <li><strong>More than you can comfortably carry</strong>:
        you will be carrying this bag for 8+ hours.
        If it feels heavy in your bedroom
        it will feel impossible at hour six.</li>
    </ul>

    <h2>The Master Checklist</h2>
    <p>Print this or screenshot it before you pack:</p>

    <div style="background:rgba(0,229,255,0.05);
      border:1px solid rgba(0,229,255,0.2);
      padding:24px 28px;margin:20px 0;">

      <p style="font-family:'DM Mono',monospace;
        font-size:10px;letter-spacing:3px;
        text-transform:uppercase;color:var(--cyan);
        margin-bottom:16px;">
        ESSENTIALS
      </p>
      <p style="font-size:14px;color:var(--muted);
        line-height:2.2;margin-bottom:20px;">
        ☐ High-fidelity earplugs<br>
        ☐ Sealed water bottle (32oz max)<br>
        ☐ Small backpack (under 18")<br>
        ☐ ID + tickets (screenshotted offline)<br>
        ☐ Electrolyte packets (2 per day)<br>
        ☐ Portable phone charger + cable<br>
        ☐ Sunscreen (no aerosol)<br>
        ☐ Cash ($60-100 in small bills)<br>
        ☐ Phone fully charged at departure
      </p>

      <p style="font-family:'DM Mono',monospace;
        font-size:10px;letter-spacing:3px;
        text-transform:uppercase;color:var(--green);
        margin-bottom:16px;">
        SAFETY
      </p>
      <p style="font-size:14px;color:var(--muted);
        line-height:2.2;margin-bottom:20px;">
        ☐ Fentanyl test strips<br>
        ☐ Narcan / naloxone<br>
        ☐ Basic first aid kit<br>
        ☐ Hand fan or misting fan<br>
        ☐ Medications you take daily
      </p>

      <p style="font-family:'DM Mono',monospace;
        font-size:10px;letter-spacing:3px;
        text-transform:uppercase;color:var(--pink);
        margin-bottom:16px;">
        WHAT TO WEAR
      </p>
      <p style="font-size:14px;color:var(--muted);
        line-height:2.2;margin-bottom:20px;">
        ☐ Broken-in shoes<br>
        ☐ Blister pads + moleskin<br>
        ☐ Pashmina or light layer<br>
        ☐ Backup outfit element<br>
        ☐ Extra socks
      </p>

      <p style="font-family:'DM Mono',monospace;
        font-size:10px;letter-spacing:3px;
        text-transform:uppercase;color:var(--purple);
        margin-bottom:16px;">
        CULTURE
      </p>
      <p style="font-size:14px;color:var(--muted);
        line-height:2.2;margin-bottom:0;">
        ☐ Kandi to trade<br>
        ☐ Flow props (if allowed)<br>
        ☐ Small flashlight (camping)<br>
        ☐ Festival map screenshotted<br>
        ☐ Meetup spot agreed with your group
      </p>
    </div>

    <p style="margin-top:32px;padding:20px;
      background:rgba(255,45,120,0.06);
      border-left:3px solid #ff2d78;
      line-height:1.8;">
      <strong>One last thing:</strong> Agree on a physical
      meetup spot with your group before you walk in.
      Not a general area. Pick a specific landmark,
      a specific stage entrance, something unmistakable.
      Cell service will fail at the worst moment.
      The meetup spot has saved more festival groups
      than any other item on this list.
    </p>

    <p style="margin-top:24px;font-size:15px;
      color:var(--muted);line-height:1.8;">
      For full harm reduction resources, DanceSafe links,
      and what to do in an emergency at a festival,
      visit our
      <a href="/safety" style="color:var(--cyan);">
        Safety & PLUR page →
      </a>
    </p>
  `
  },

  {
    id: 'post-005',
    title: 'The Best Rave Brands of 2026: Community Picks',
    slug: 'best-rave-brands-2026',
    author: 'PLURGASM',
    authorHandle: '@plurgasm',
    date: '2026-03-28',
    category: 'fashion',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    excerpt: 'We pulled together the most-recommended rave clothing, kandi, and accessory brands from community feedback. From affordable everyday sets to high-end fae pieces. Here is what the community actually rates.',
    published: true,
    featured: false,
    body: `
      <p>Every season the rave fashion conversation cycles through the same questions: who is actually worth buying from? Which brands have quality issues? Who ships on time? Who has good return policies?</p>

      <p>We pulled this list from real community feedback across rave subreddits, Facebook groups, and direct submissions. These are not sponsored picks. They are brands the community actually rates.</p>

      <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" alt="Festival fashion outfits" style="width:100%;height:280px;object-fit:cover;margin:24px 0;">

      <h2>Best for Everyday Rave Sets, All Price Points</h2>

      <h3>Freedom Rave Wear, California · $–$$</h3>
      <p>Consistently the most-recommended brand in the community for a reason. Quality spandex sets at reasonable prices, ships within a week, and one of the few brands that stocks solid options for all body types. They also carry men\'s shirts and tank tops, which is rare in the rave clothing space.</p>

      <h3>iHeartRaves, California · $</h3>
      <p>The biggest rave clothing retailer in the US. Wide selection, artist collabs, and affordable prices. Note: no returns, only store credit. Quality can be inconsistent but they will replace defective items. Size generally runs true.</p>

      <h3>Rage Kage, California · $</h3>
      <p>Specifically beloved for long-torso-friendly bodysuits and affordable sequin looks. True to size, quick shipping, and MTO options available if you want something specific. Great entry point for fancier looks without the luxury price tag.</p>

      <h2>Best for Fae, Babydoll, and High-End Looks</h2>

      <h3>Vanishing Fae, California · $$$–$$$$</h3>
      <p>The community luxury pick. Intricate fae and babydoll aesthetics handmade at a premium price point. If you are investing in a statement piece, Vanishing Fae is consistently cited as worth it. Check if sets are lined before purchasing, as some sequin pieces can cause irritation.</p>

      <h3>Little Kitty Raves, California · $$–$$$</h3>
      <p>MTO fae and babydoll sets with a dedicated following. Expect 2–3 week turnaround for made-to-order pieces. The quality is consistently praised across community reviews.</p>

      <h2>Best Shoes</h2>

      <h3>Demonia Cult, California · $–$$</h3>
      <p>Still the undisputed king of rave shoes. Platform boots, trainers, pumps, and Gothic styles in a wide size range. Ships within a week. If you are buying your first pair of platform shoes for a festival, start here.</p>

      <h3>YRU, California · $–$$$</h3>
      <p>A strong Demonia alternative with wider styles and a higher price ceiling. Chunky platforms, boots, and trainers with more experimental colorways. Worth browsing if you want something different.</p>

      <h2>Best Kandi Supplies</h2>

      <h3>Kandies World, Florida · $</h3>
      <p>The kandi supply headquarters. If you make your own kandi, this is your first stop: beads, perler beads, elastic, and accessories. Ships fast, prices are fair.</p>

      <h3>inPLUR, Louisiana · $</h3>
      <p>For those who want premade kandi ready to trade without making it themselves. One of the most loved kandi shops in the community. PLUR through and through.</p>

      <img src="https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?w=800&q=80" alt="Rave accessories and kandi" style="width:100%;height:260px;object-fit:cover;margin:24px 0;">

      <h2>A Note on Red Flags</h2>
      <p>The rave clothing space has a dropshipping problem. Some warning signs: the website has no clear location listed, the same items appear on AliExpress at a fraction of the price, shipping takes 4–6 weeks with no explanation, and reviews are suspiciously generic.</p>
      <p>Always check community reviews before buying from an unfamiliar brand. The Facebook groups and Reddit\'s r/festivals are good resources. When in doubt, stick to community-tested names.</p>

      <p style="margin-top:32px;padding:20px;background:rgba(0,229,255,0.06);border-left:3px solid #00e5ff;"><strong>All brands listed in this article are in the PLURGASM directory</strong> with full details on pricing, shipping times, and community notes. Click any brand name to see more.</p>
    `
  }

];

window.PLURGASM_DATA.festivals  = FESTIVALS;
window.PLURGASM_DATA.brands     = BRANDS;
window.PLURGASM_DATA.categories = CATEGORIES;

/* ════════════════════════════════════════════════
   FESTIVAL FILTER TAXONOMY — single source of truth
   Both the homepage festival section and the calendar page build their
   vibe (genre) and region filter pills from these helpers, so the two
   stay in sync automatically as festivals are added/changed rather than
   diverging through hand-maintained pill lists.
════════════════════════════════════════════════ */
// Preferred display order for the vibe pills. Any genre present in the
// festival data but missing from this list is appended (alphabetically),
// so a brand-new genre always shows up without a code change.
const FEST_GENRE_ORDER = [
  'EDM','House','Techno','Bass','Trance','Dubstep','Psychedelic','Hip-Hop','Jam',
  'DnB','Riddim','Progressive','Psy-Trance','Industrial','Experimental','Indie','Rock'
];
// A few genres read better with a friendlier label than the raw data value.
const FEST_GENRE_LABELS = { 'Jam': 'Jam / Folk' };
// Region id -> label + display order (US regions first, International last).
const FEST_REGION_META = [
  { id:'northeast',    label:'Northeast US' },
  { id:'southeast',    label:'Southeast US' },
  { id:'midwest',      label:'Midwest US' },
  { id:'west',         label:'West Coast US' },
  { id:'southwest',    label:'Southwest US' },
  { id:'canada',       label:'🍁 Canada' },
  { id:'international', label:'🌐 International' },
];

// Returns [{ value, label }] for every genre that appears in the festival data.
function getFestivalGenres() {
  const present = new Set();
  FESTIVALS.forEach(f => (f.genres || []).forEach(g => present.add(g)));
  const ordered = FEST_GENRE_ORDER.filter(g => present.has(g));
  [...present].filter(g => !FEST_GENRE_ORDER.includes(g)).sort()
    .forEach(g => ordered.push(g));
  return ordered.map(g => ({ value: g, label: FEST_GENRE_LABELS[g] || g }));
}

// Returns [{ id, label }] for every region that appears in the festival data.
function getFestivalRegions() {
  const present = new Set();
  FESTIVALS.forEach(f => { if (f.region) present.add(f.region); });
  const ordered = FEST_REGION_META.filter(r => present.has(r.id));
  [...present].filter(id => !FEST_REGION_META.some(r => r.id === id)).sort()
    .forEach(id => ordered.push({ id, label: id.charAt(0).toUpperCase() + id.slice(1) }));
  return ordered;
}

window.PLURGASM_DATA.getFestivalGenres  = getFestivalGenres;
window.PLURGASM_DATA.getFestivalRegions = getFestivalRegions;

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
  { handle: '@beastmodebass',    name: 'Beast Mode Bass',   image: null, platform: 'Instagram', type: 'Meme Page', tags: ['memes','festival-culture','community','plur'],                    sortOrder: 1, featured: true, featuredOrder: 1, desc: 'Rave memes, festival culture, and community content. Also the people who built this site — so yeah, we put ourselves first. No shame. Follow us.', url: 'https://www.instagram.com/beastmodebass/' },
  { handle: '@jarren_ellis',     name: 'Jarren Ellis',      image: null, platform: 'Instagram', type: 'Creator',   tags: ['rave-culture','flow-arts','festival-coverage','harm-reduction'], sortOrder: 2, featured: true, featuredOrder: 2, desc: 'Rave culture content from inside the scene. Festival coverage, flow arts, and genuine community energy worth following.', url: 'https://www.instagram.com/jarren_ellis/' },
  { handle: '@edc_lasvegas',     name: 'EDC Las Vegas',     image: null, platform: 'Instagram', type: 'Festival',  tags: ['edc','festival','insomniac','las-vegas'],                        sortOrder: 3, featured: true, featuredOrder: 3, desc: 'Official EDC Las Vegas. 30th anniversary content, lineup reveals, and behind-the-scenes from the electric sky.', url: 'https://www.instagram.com/edc_lasvegas/' },
  { handle: '@electricforest',   name: 'Electric Forest',   image: null, platform: 'Instagram', type: 'Festival',  tags: ['electric-forest','festival','michigan','bass'],                 sortOrder: 4, featured: false, desc: 'Official Electric Forest. Forest magic, lineup announcements, and art from Rothbury Michigan.', url: 'https://www.instagram.com/electricforest/' },
  { handle: '@dancesafe',        name: 'DanceSafe',         image: null, platform: 'Instagram', type: 'Safety',    tags: ['harm-reduction','safety','drug-checking','community'],          sortOrder: 5, featured: false, desc: 'The most important account in the rave community. Harm reduction, drug checking, and real information with zero judgment.', url: 'https://www.instagram.com/dancesafe/' },
  { handle: '@insomniac_events', name: 'Insomniac Events',  image: null, platform: 'Instagram', type: 'Festival',  tags: ['insomniac','edc','project-glow','festival-production'],         sortOrder: 6, featured: false, desc: 'Official Insomniac. EDC, Project GLOW, Dreamstate and more — festival announcements and production content.', url: 'https://www.instagram.com/insomniac_events/' },
];

window.PLURGASM_DATA.socials = SOCIALS;

window.PLURGASM_DATA.featuredInfluencer = {
  name: 'Jarren Ellis',
  handle: '@jarren_ellis',
  image: 'images/jarren-ellis.jpg',
  blurb: 'One of the most genuine rave content creators in the community right now. Jarren covers festival culture, flow arts, harm reduction, and everything in between — from the inside, not from the sidelines. Give him a follow.',
  active: true,
  links: [
    { platform: 'Instagram', url: '' },
    { platform: 'Website',   url: '' }
  ]
};

PLURGASM_DATA.brandOfWeek = {
  name: 'Trippy Squid',
  badge: 'TS',
  tagline: 'Flowstars · Ravewear · USA',
  image: '/images/brands/trippysquid.webp',
  desc: 'Founder-run rave brand making handmade, UV-reactive flowstars at some of the best prices around, plus ravewear and accessories. Free shipping on US orders. 10% off with code PLURGASM.',
  ig: null,
  url: 'https://trippysquid.com/?ref=Plurgasm',
  cat: 'Flow Toys'
};
