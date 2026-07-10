/**
 * City pages dataset
 */
window.CITIES_DATA = {
  mumbai: {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    tag: "Popular",
    icon: "fa-water",
    heroImg: "https://images.unsplash.com/photo-1568680400585-4c3a8a3a2a0e?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 1.2 Cr+",
    listings: "1,240+",
    about:
      "Mumbai is India's financial capital and one of the most dynamic real estate markets in the country. From sea-facing luxury towers in Worli and Bandra to suburban townships in Thane and Navi Mumbai, the city offers diverse options for end-users and investors.",
    highlights: ["Strong rental demand in western suburbs", "Metro expansion improving connectivity", "Premium resale liquidity in island city belts", "NRI-friendly documentation support"],
    projects: [
      { name: "Lodha World Towers", area: "Worli", price: "₹ 10 Cr+", type: "Luxury Apartment", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
      { name: "Oberoi Esquire", area: "Goregaon", price: "₹ 4.5 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
      { name: "Godrej Horizon", area: "Chembur", price: "₹ 2.2 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 28,500/sqft" },
      { year: "2023", avg: "₹ 30,200/sqft" },
      { year: "2024", avg: "₹ 31,800/sqft" },
      { year: "2025", avg: "₹ 33,400/sqft" },
      { year: "2026", avg: "₹ 35,100/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Metro Line 2A & 7", desc: "Improved east-west connectivity across suburbs." },
      { icon: "fa-road", title: "Coastal Road Project", desc: "Reduced commute times along the western corridor." },
      { icon: "fa-plane", title: "CSMIA Airport", desc: "Global connectivity with expanding terminal capacity." },
      { icon: "fa-building", title: "BKC Financial District", desc: "Major employment hub driving rental demand." }
    ],
    schools: [
      { name: "Cathedral & John Connon School", type: "ICSE", dist: "Bandra · 2 km" },
      { name: "American School of Bombay", type: "International", dist: "Bandra East · 4 km" },
      { name: "Jamnabai Narsee School", type: "ICSE", dist: "Juhu · 3 km" }
    ],
    hospitals: [
      { name: "Lilavati Hospital", type: "Multi-specialty", dist: "Bandra · 1.5 km" },
      { name: "Kokilaben Dhirubhai Ambani Hospital", type: "Super-specialty", dist: "Andheri · 5 km" },
      { name: "Nanavati Max Hospital", type: "Multi-specialty", dist: "Vile Parle · 3 km" }
    ],
    faq: [
      { q: "Is Mumbai good for property investment in 2026?", a: "Select micro-markets with metro connectivity and established developer track records continue to show steady appreciation and rental demand." },
      { q: "What is the average price per sq.ft in Mumbai?", a: "Prices vary widely — from ₹ 12,000/sqft in peripheral suburbs to ₹ 50,000+/sqft in premium west-side locations." },
      { q: "Are RERA projects mandatory in Maharashtra?", a: "Yes. Always verify the RERA registration number on the MahaRERA portal before booking." }
    ]
  },
  goa: {
    slug: "goa",
    name: "Goa",
    state: "Goa",
    tag: "Coastal",
    icon: "fa-umbrella-beach",
    heroImg: "https://images.unsplash.com/photo-1519046909882-ff06b0f0a7b0?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 88 L+",
    listings: "320+",
    about:
      "Goa blends coastal lifestyle with growing second-home and holiday rental demand. North Goa attracts vibrant tourism and nightlife, while South Goa offers quieter beaches and premium villa communities ideal for weekend retreats.",
    highlights: ["Strong holiday rental yields", "Second-home demand from metros", "Villa and apartment mix", "Relaxed lifestyle appeal"],
    projects: [
      { name: "Azure Bay Villa", area: "North Goa", price: "₹ 2.45 Cr+", type: "Villa", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&q=80" },
      { name: "Coastal Breeze Apts", area: "Candolim", price: "₹ 1.25 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80" },
      { name: "Sunset Ridge Villa", area: "North Goa", price: "₹ 2.85 Cr+", type: "Villa", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 7,800/sqft" },
      { year: "2023", avg: "₹ 8,400/sqft" },
      { year: "2024", avg: "₹ 9,100/sqft" },
      { year: "2025", avg: "₹ 9,800/sqft" },
      { year: "2026", avg: "₹ 10,500/sqft" }
    ],
    infrastructure: [
      { icon: "fa-plane", title: "Mopa International Airport", desc: "New airport boosting north Goa accessibility." },
      { icon: "fa-road", title: "NH-66 Highway", desc: "Coastal highway connecting major beach belts." },
      { icon: "fa-ship", title: "Mormugao Port", desc: "Cargo and cruise connectivity." },
      { icon: "fa-wifi", title: "Digital Nomad Hubs", desc: "Co-working spaces in Panjim and Assagao." }
    ],
    schools: [
      { name: "Sharada Mandir School", type: "ICSE", dist: "Panjim · 6 km" },
      { name: "Gera School", type: "CBSE", dist: "Kadamba Plateau · 8 km" },
      { name: "Don Bosco High School", type: "State Board", dist: "Panjim · 5 km" }
    ],
    hospitals: [
      { name: "Manipal Hospital Goa", type: "Multi-specialty", dist: "Dona Paula · 4 km" },
      { name: "Healthway Hospital", type: "Multi-specialty", dist: "Old Goa · 7 km" },
      { name: "Victor Hospital", type: "General", dist: "Margao · 12 km" }
    ],
    faq: [
      { q: "Can NRIs buy property in Goa?", a: "Yes, with FEMA-compliant documentation. Inchbrick assists with legal verification and repatriation guidance." },
      { q: "Is Goa good for rental income?", a: "Holiday rentals in North Goa can yield 4–6% gross annually with professional property management." },
      { q: "Which areas are best for villas?", a: "Assagao, Siolim, and select South Goa belts offer premium villa inventory." }
    ]
  },
  dubai: {
    slug: "dubai",
    name: "Dubai",
    state: "UAE",
    tag: "Global",
    icon: "fa-building",
    heroImg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "AED 1.2M+",
    listings: "180+",
    about:
      "Dubai offers tax-free ownership, world-class infrastructure, and a cosmopolitan lifestyle that attracts global investors. Freehold zones in Marina, Downtown, and Palm Jumeirah remain flagship destinations for luxury buyers.",
    highlights: ["Tax-free property ownership", "Golden Visa eligibility on select investments", "High rental yields in prime zones", "Globally recognized developers"],
    projects: [
      { name: "Marina Gate", area: "Dubai Marina", price: "AED 2.1M+", type: "Apartment", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80" },
      { name: "Creek Harbour Tower", area: "Dubai Creek", price: "AED 3.5M+", type: "Apartment", img: "https://images.unsplash.com/photo-1582672060017-f1422d5c8a8d?auto=format&fit=crop&w=600&q=80" },
      { name: "Palm Jumeirah Villa", area: "Palm", price: "AED 8M+", type: "Villa", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "AED 1,050/sqft" },
      { year: "2023", avg: "AED 1,180/sqft" },
      { year: "2024", avg: "AED 1,290/sqft" },
      { year: "2025", avg: "AED 1,380/sqft" },
      { year: "2026", avg: "AED 1,450/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Dubai Metro", desc: "Red and Green lines connecting major districts." },
      { icon: "fa-plane", title: "DXB & DWC Airports", desc: "Global aviation hub with expanding capacity." },
      { icon: "fa-shopping-bag", title: "Dubai Mall & DIFC", desc: "Retail and financial district anchors." },
      { icon: "fa-hotel", title: "Expo City Legacy", desc: "New growth corridor with master-planned districts." }
    ],
    schools: [
      { name: "Dubai College", type: "British Curriculum", dist: "Al Sufouh · 3 km" },
      { name: "GEMS Wellington", type: "International", dist: "Dubai Marina · 2 km" },
      { name: "JESS Arabian Ranches", type: "British Curriculum", dist: "Arabian Ranches · 8 km" }
    ],
    hospitals: [
      { name: "American Hospital Dubai", type: "Multi-specialty", dist: "Oud Metha · 5 km" },
      { name: "Mediclinic City Hospital", dist: "Healthcare City · 4 km", type: "Super-specialty" },
      { name: "Saudi German Hospital", type: "Multi-specialty", dist: "Al Barsha · 6 km" }
    ],
    faq: [
      { q: "Can Indians buy property in Dubai?", a: "Yes, in designated freehold areas. No citizenship is required for freehold ownership." },
      { q: "What is the Golden Visa property threshold?", a: "Thresholds vary by emirate and policy updates — consult Inchbrick for current eligibility." },
      { q: "Are payment plans available?", a: "Most off-plan projects offer developer-linked payment plans during construction." }
    ]
  },
  bangalore: {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    tag: "IT Hub",
    icon: "fa-laptop-code",
    heroImg: "https://images.unsplash.com/photo-1596176530529-78163a4f0af8?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 85 L+",
    listings: "980+",
    about:
      "Bangalore remains India's tech capital with sustained demand from IT professionals and investors. Corridors like Whitefield, Sarjapur Road, and North Bangalore offer strong appreciation driven by metro expansion and campus growth.",
    highlights: ["IT corridor rental demand", "Metro Phase expansion", "Startup ecosystem growth", "Premium villa townships on periphery"],
    projects: [
      { name: "Prestige Lakeside Habitat", area: "Whitefield", price: "₹ 2.5 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80" },
      { name: "Godrej Park Retreat", area: "Sarjapur", price: "₹ 1.1 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
      { name: "Brigade Cornerstone Utopia", area: "Electronic City", price: "₹ 95 L+", type: "Township", img: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 5,800/sqft" },
      { year: "2023", avg: "₹ 6,400/sqft" },
      { year: "2024", avg: "₹ 7,100/sqft" },
      { year: "2025", avg: "₹ 7,800/sqft" },
      { year: "2026", avg: "₹ 8,500/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Namma Metro", desc: "Purple and Green lines with Phase 2 extensions." },
      { icon: "fa-plane", title: "Kempegowda Airport T2", desc: "Expanded international connectivity." },
      { icon: "fa-road", title: "Peripheral Ring Road", desc: "Decongesting ORR and outer belts." },
      { icon: "fa-briefcase", title: "Manyata & ORR Tech Parks", desc: "Employment anchors driving housing demand." }
    ],
    schools: [
      { name: "Inventure Academy", type: "ICSE/IB", dist: "Whitefield · 2 km" },
      { name: "National Public School", type: "CBSE", dist: "Indiranagar · 4 km" },
      { name: "Stonehill International", type: "IB", dist: "North Bangalore · 6 km" }
    ],
    hospitals: [
      { name: "Manipal Hospital Whitefield", type: "Multi-specialty", dist: "Whitefield · 1 km" },
      { name: "Columbia Asia", type: "Multi-specialty", dist: "Hebbal · 5 km" },
      { name: "Narayana Health City", type: "Super-specialty", dist: "Bommasandra · 8 km" }
    ],
    faq: [
      { q: "Which Bangalore areas offer best ROI?", a: "North Bangalore, Sarjapur corridor, and metro-adjacent belts show strong growth potential." },
      { q: "Is Bangalore good for rental income?", a: "IT corridor locations typically yield 3–4% gross rental returns." },
      { q: "What documents are needed to buy?", a: "PAN, Aadhaar, income proof, and RERA-verified sale agreement." }
    ]
  },
  pune: {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    tag: "Growth",
    icon: "fa-graduation-cap",
    heroImg: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 65 L+",
    listings: "720+",
    about:
      "Pune combines educational excellence, manufacturing hubs, and IT growth corridors. Hinjewadi, Baner, and Kharadi attract professionals seeking quality living at relatively lower tickets than Mumbai.",
    highlights: ["IT and auto industry hubs", "Strong end-user demand", "Affordable vs Mumbai", "Expanding metro network"],
    projects: [
      { name: "Sunrise Park Villas", area: "Hinjewadi", price: "₹ 1.42 Cr+", type: "Villa", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
      { name: "WorkNest Towers", area: "Baner", price: "₹ 82 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=600&q=80" },
      { name: "Greenwoods Residency", area: "Lonavala", price: "₹ 72 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 5,200/sqft" },
      { year: "2023", avg: "₹ 5,700/sqft" },
      { year: "2024", avg: "₹ 6,200/sqft" },
      { year: "2025", avg: "₹ 6,800/sqft" },
      { year: "2026", avg: "₹ 7,400/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Pune Metro", desc: "Phase 1 operational, Phase 2 under development." },
      { icon: "fa-road", title: "Pune Ring Road", desc: "Improved outer city connectivity." },
      { icon: "fa-industry", title: "Chakan Industrial Belt", desc: "Auto and manufacturing employment zone." },
      { icon: "fa-laptop", title: "Hinjewadi IT Park", desc: "Major tech employer driving housing demand." }
    ],
    schools: [
      { name: "The Bishop's School", type: "ICSE", dist: "Camp · 3 km" },
      { name: "Vibgyor High", type: "CBSE", dist: "Baner · 2 km" },
      { name: "Symbiosis International", type: "University", dist: "Viman Nagar · 5 km" }
    ],
    hospitals: [
      { name: "Ruby Hall Clinic", type: "Multi-specialty", dist: "Camp · 2 km" },
      { name: "Jehangir Hospital", type: "Multi-specialty", dist: "Pune Station · 3 km" },
      { name: "Sahyadri Hospital", type: "Super-specialty", dist: "Kharadi · 4 km" }
    ],
    faq: [
      { q: "Is Pune better value than Mumbai?", a: "Pune typically offers 30–40% lower entry tickets with comparable amenity stacks in IT corridors." },
      { q: "Best areas for IT professionals?", a: "Hinjewadi, Baner, Wakad, and Kharadi remain top choices." },
      { q: "Are villas available near Pune?", a: "Yes — Lonavala, Mulshi, and Hinjewadi periphery offer villa inventory." }
    ]
  },
  delhi: {
    slug: "delhi",
    name: "Delhi NCR",
    state: "Delhi · Noida · Gurgaon",
    tag: "Premium",
    icon: "fa-landmark",
    heroImg: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 95 L+",
    listings: "1,100+",
    about:
      "Delhi NCR spans the capital and satellite cities Noida, Gurgaon, and Ghaziabad. The region offers everything from luxury golf-course homes to affordable high-rise inventory along expressway corridors.",
    highlights: ["NCR expressway corridors", "Corporate hub concentration", "Metro and RRTS connectivity", "Diverse price bands"],
    projects: [
      { name: "DLF The Camellias", area: "Gurgaon", price: "₹ 12 Cr+", type: "Luxury Apartment", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80" },
      { name: "Green Valley Residency", area: "Noida", price: "₹ 78 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" },
      { name: "Capital Growth Suites", area: "Noida", price: "₹ 55 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 6,500/sqft" },
      { year: "2023", avg: "₹ 7,100/sqft" },
      { year: "2024", avg: "₹ 7,800/sqft" },
      { year: "2025", avg: "₹ 8,400/sqft" },
      { year: "2026", avg: "₹ 9,100/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train", title: "Rapid Metro & RRTS", desc: "Regional connectivity across NCR nodes." },
      { icon: "fa-road", title: "Yamuna Expressway", desc: "Linking Noida to Agra with growth corridors." },
      { icon: "fa-plane", title: "IGI Airport", desc: "Major international gateway." },
      { icon: "fa-building", title: "Cyber City Gurgaon", desc: "Corporate hub with premium residential belt." }
    ],
    schools: [
      { name: "The Shri Ram School", type: "ICSE", dist: "Gurgaon · 3 km" },
      { name: "Amity International", type: "CBSE", dist: "Noida · 2 km" },
      { name: "DPS RK Puram", type: "CBSE", dist: "South Delhi · 5 km" }
    ],
    hospitals: [
      { name: "Fortis Escorts", type: "Cardiac specialty", dist: "Okhla · 4 km" },
      { name: "Max Super Speciality", type: "Multi-specialty", dist: "Saket · 3 km" },
      { name: "Apollo Hospitals", type: "Super-specialty", dist: "Sarita Vihar · 6 km" }
    ],
    faq: [
      { q: "Noida vs Gurgaon — which is better?", a: "Gurgaon suits corporate proximity; Noida offers value and newer township inventory. Compare commute and budget." },
      { q: "Is NCR good for investment?", a: "Expressway belts and metro-linked sectors show consistent end-user and investor interest." },
      { q: "How to verify UP RERA projects?", a: "Use the UP RERA portal and match project phase with marketed towers." }
    ]
  },
  hyderabad: {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    tag: "Hot",
    icon: "fa-gem",
    heroImg: "https://images.unsplash.com/photo-1596176530529-78163a4f0af8?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 78 L+",
    listings: "640+",
    about:
      "Hyderabad has emerged as a top-tier IT and pharma hub with relatively affordable luxury inventory. Financial District, Gachibowli, and Kokapet corridors attract professionals and investors alike.",
    highlights: ["IT and pharma employment", "Wide road infrastructure", "Strong township development", "Value vs other metros"],
    projects: [
      { name: "Central Park Lofts", area: "HITEC City", price: "₹ 95 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600607687644-c7171b4243f3?auto=format&fit=crop&w=600&q=80" },
      { name: "Ocean View Residences", area: "Beach Road", price: "₹ 88 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=600&q=80" },
      { name: "Future City Plots", area: "Financial District", price: "₹ 38 L+", type: "Plot", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 4,800/sqft" },
      { year: "2023", avg: "₹ 5,300/sqft" },
      { year: "2024", avg: "₹ 5,900/sqft" },
      { year: "2025", avg: "₹ 6,500/sqft" },
      { year: "2026", avg: "₹ 7,200/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Hyderabad Metro", desc: "Expanding network across IT corridors." },
      { icon: "fa-road", title: "ORR Expressway", desc: "Ring road connecting outer growth zones." },
      { icon: "fa-plane", title: "RGIA Airport", desc: "International connectivity hub." },
      { icon: "fa-flask", title: "Pharma City", desc: "Life sciences employment cluster." }
    ],
    schools: [
      { name: "Oakridge International", type: "IB", dist: "Gachibowli · 2 km" },
      { name: "Chirec International", type: "CBSE/IB", dist: "Kondapur · 3 km" },
      { name: "Delhi Public School", type: "CBSE", dist: "Nacharam · 5 km" }
    ],
    hospitals: [
      { name: "Apollo Health City", type: "Super-specialty", dist: "Jubilee Hills · 4 km" },
      { name: "Yashoda Hospitals", type: "Multi-specialty", dist: "Secunderabad · 6 km" },
      { name: "KIMS Hospital", type: "Multi-specialty", dist: "Gachibowli · 2 km" }
    ],
    faq: [
      { q: "Why is Hyderabad growing fast?", a: "IT expansion, infrastructure investment, and relative affordability drive sustained demand." },
      { q: "Best areas for families?", a: "Gachibowli, Manikonda, and Kondapur offer schools, hospitals, and retail." },
      { q: "Plot or apartment in Hyderabad?", a: "Plots suit long-term investors; apartments offer immediate rental income in IT belts." }
    ]
  },
  chennai: {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tag: "Coastal",
    icon: "fa-ship",
    heroImg: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 72 L+",
    listings: "580+",
    about:
      "Chennai offers stable end-user demand driven by automotive, IT, and manufacturing sectors. OMR, ECR, and GST Road corridors provide a mix of apartments, villas, and plotted developments.",
    highlights: ["Automotive and IT employment", "Coastal ECR lifestyle belts", "Stable end-user market", "Growing metro coverage"],
    projects: [
      { name: "Prestige Waterford", area: "Sholinganallur", price: "₹ 1.8 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80" },
      { name: "Brigade Xanadu", area: "OMR", price: "₹ 1.2 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80" },
      { name: "DLF Garden City", area: "OMR", price: "₹ 95 L+", type: "Township", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 5,500/sqft" },
      { year: "2023", avg: "₹ 5,900/sqft" },
      { year: "2024", avg: "₹ 6,400/sqft" },
      { year: "2025", avg: "₹ 6,900/sqft" },
      { year: "2026", avg: "₹ 7,500/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Chennai Metro", desc: "Phase 2 extending to OMR and GST Road." },
      { icon: "fa-ship", title: "Chennai Port", desc: "Major commercial and industrial hub." },
      { icon: "fa-road", title: "OMR IT Corridor", desc: "Tech park concentration along east coast." },
      { icon: "fa-plane", title: "Chennai International Airport", desc: "Expanding terminal capacity." }
    ],
    schools: [
      { name: "Chettinad Vidyashram", type: "CBSE", dist: "Adyar · 3 km" },
      { name: "PSBB Senior Secondary", type: "CBSE", dist: "T Nagar · 4 km" },
      { name: "American International School", type: "International", dist: "Taramani · 2 km" }
    ],
    hospitals: [
      { name: "Apollo Hospitals", type: "Super-specialty", dist: "Greams Road · 3 km" },
      { name: "Fortis Malar", type: "Multi-specialty", dist: "Adyar · 2 km" },
      { name: "MIOT International", type: "Super-specialty", dist: "Manapakkam · 5 km" }
    ],
    faq: [
      { q: "Is Chennai a safe market for end-users?", a: "Chennai has historically shown stable, end-user-driven demand with lower speculation." },
      { q: "OMR vs ECR — which to choose?", a: "OMR suits IT commuters; ECR offers coastal lifestyle with villa options." },
      { q: "What is TN RERA process?", a: "Verify projects on the Tamil Nadu RERA portal before token payment." }
    ]
  },
  kolkata: {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    tag: "Heritage",
    icon: "fa-bridge",
    heroImg: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 55 L+",
    listings: "420+",
    about:
      "Kolkata combines cultural heritage with emerging townships in Rajarhat, New Town, and EM Bypass. The market offers value pricing compared to western metros with growing IT and education sectors.",
    highlights: ["Affordable metro pricing", "New Town master planning", "Cultural capital appeal", "EM Bypass growth corridor"],
    projects: [
      { name: "South City Residency", area: "Prince Anwar Shah", price: "₹ 1.1 Cr+", type: "Apartment", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
      { name: "New Town Heights", area: "Rajarhat", price: "₹ 65 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
      { name: "Bypass Greens", area: "EM Bypass", price: "₹ 78 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 4,200/sqft" },
      { year: "2023", avg: "₹ 4,500/sqft" },
      { year: "2024", avg: "₹ 4,900/sqft" },
      { year: "2025", avg: "₹ 5,300/sqft" },
      { year: "2026", avg: "₹ 5,700/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Kolkata Metro", desc: "East-West Metro improving cross-city commute." },
      { icon: "fa-road", title: "EM Bypass", desc: "Commercial and residential growth spine." },
      { icon: "fa-building", title: "New Town CBD", desc: "Planned township with IT and retail." },
      { icon: "fa-plane", title: "Netaji Subhash Airport", desc: "Domestic and international connectivity." }
    ],
    schools: [
      { name: "La Martiniere for Boys", type: "ICSE", dist: "Central Kolkata · 4 km" },
      { name: "South Point High School", type: "State Board", dist: "Hastings · 3 km" },
      { name: "Heritage School", type: "ICSE/ISC", dist: "New Town · 5 km" }
    ],
    hospitals: [
      { name: "AMRI Hospitals", type: "Multi-specialty", dist: "Dhakuria · 3 km" },
      { name: "Peerless Hospital", type: "Multi-specialty", dist: "Panchasayar · 4 km" },
      { name: "Fortis Hospital", type: "Super-specialty", dist: "Anandapur · 5 km" }
    ],
    faq: [
      { q: "Is New Town a good investment?", a: "New Town offers planned infrastructure and IT employment with steady end-user uptake." },
      { q: "How does Kolkata compare on price?", a: "Entry tickets are typically 40–50% lower than Mumbai and Bangalore premium belts." },
      { q: "West Bengal RERA verification?", a: "Check the WBRERA portal for registration and complaint history." }
    ]
  },
  ahmedabad: {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    tag: "Value",
    icon: "fa-industry",
    heroImg: "https://images.unsplash.com/photo-1596176530529-78163a4f0af8?auto=format&fit=crop&w=1600&q=80",
    startingPrice: "₹ 48 L+",
    listings: "390+",
    about:
      "Ahmedabad is a fast-growing industrial and commercial hub with affordable housing and strong local end-user demand. SG Highway, Bopal, and GIFT City corridors are key growth zones.",
    highlights: ["GIFT City financial hub", "Affordable entry tickets", "Strong local buyer base", "Industrial growth"],
    projects: [
      { name: "SG Highway Residency", area: "SG Highway", price: "₹ 72 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80" },
      { name: "GIFT City Towers", area: "GIFT City", price: "₹ 95 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
      { name: "Bopal Greens", area: "Bopal", price: "₹ 58 L+", type: "Apartment", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=80" }
    ],
    priceTrends: [
      { year: "2022", avg: "₹ 3,800/sqft" },
      { year: "2023", avg: "₹ 4,100/sqft" },
      { year: "2024", avg: "₹ 4,500/sqft" },
      { year: "2025", avg: "₹ 4,900/sqft" },
      { year: "2026", avg: "₹ 5,300/sqft" }
    ],
    infrastructure: [
      { icon: "fa-train-subway", title: "Ahmedabad Metro", desc: "North-South corridor operational." },
      { icon: "fa-building", title: "GIFT City", desc: "India's first operational smart city and IFSC." },
      { icon: "fa-road", title: "SG Highway", desc: "Commercial and residential spine." },
      { icon: "fa-plane", title: "Sardar Vallabhbhai Patel Airport", desc: "Expanding domestic and international routes." }
    ],
    schools: [
      { name: "Ahmedabad International School", type: "IB", dist: "Bodakdev · 3 km" },
      { name: "Delhi Public School Bopal", type: "CBSE", dist: "Bopal · 2 km" },
      { name: "St. Xavier's Loyola Hall", type: "ICSE", dist: "Navrangpura · 4 km" }
    ],
    hospitals: [
      { name: "Civil Hospital", type: "Government multi-specialty", dist: "Asarwa · 5 km" },
      { name: "Sterling Hospital", type: "Multi-specialty", dist: "Memnagar · 3 km" },
      { name: "Apollo Hospitals", type: "Super-specialty", dist: "Bhat · 4 km" }
    ],
    faq: [
      { q: "What is GIFT City?", a: "Gujarat International Finance Tec-City is India's first operational smart city and international financial services centre." },
      { q: "Is Ahmedabad good for first-time buyers?", a: "Yes — lower entry tickets and strong end-user culture make it accessible for first homes." },
      { q: "Gujarat RERA check?", a: "Verify on gujrera.gujarat.gov.in before any booking." }
    ]
  }
};
