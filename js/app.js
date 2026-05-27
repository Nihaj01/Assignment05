// Hotlines Data Array containing detailed metadata for the 9 emergency services
const HOTLINE_SERVICES = [
    {
        id: "national-emergency",
        nameBn: "জাতীয় জরুরি সেবা",
        nameEn: "National Emergency Number",
        subtitleBn: "National Emergency",
        subtitleEn: "National Emergency",
        number: "999",
        categoryBn: "সার্বজনীন",
        categoryEn: "All",
        icon: "assets/emergency.png",
        iconBg: "bg-red-50 border-red-100"
    },
    {
        id: "bangladesh-police",
        nameBn: "পুলিশ",
        nameEn: "Police Helpline Number",
        subtitleBn: "Police",
        subtitleEn: "Police",
        number: "999",
        categoryBn: "পুলিশ",
        categoryEn: "Police",
        icon: "assets/police.png",
        iconBg: "bg-blue-50 border-blue-100"
    },
    {
        id: "fire-service",
        nameBn: "ফায়ার সার্ভিস",
        nameEn: "Fire Service Number",
        subtitleBn: "Fire Service",
        subtitleEn: "Fire Service",
        number: "999",
        categoryBn: "ফায়ার",
        categoryEn: "Fire",
        icon: "assets/fire-service.png",
        iconBg: "bg-orange-50 border-orange-100"
    },
    {
        id: "emergency-ambulance",
        nameBn: "অ্যাম্বুলেন্স",
        nameEn: "Ambulance Service",
        subtitleBn: "Ambulance",
        subtitleEn: "Ambulance",
        number: "1994-999999",
        categoryBn: "অ্যাম্বুলেন্স",
        categoryEn: "Health",
        icon: "assets/ambulance.png",
        iconBg: "bg-emerald-50 border-emerald-100"
    },
    {
        id: "women-children-support",
        nameBn: "নারী ও শিশু সহায়তা",
        nameEn: "Women & Child Helpline",
        subtitleBn: "Women & Child Helpline",
        subtitleEn: "Women & Child Helpline",
        number: "109",
        categoryBn: "হেল্পলাইন",
        categoryEn: "Help",
        icon: "assets/emergency.png",
        iconBg: "bg-red-50 border-red-100"
    },
    {
        id: "acc-dudok",
        nameBn: "দুদক",
        nameEn: "Anti-Corruption Helpline",
        subtitleBn: "Anti Corruption",
        subtitleEn: "Anti-corruption",
        number: "106",
        categoryBn: "সরকারি",
        categoryEn: "Govt",
        icon: "assets/emergency.png",
        iconBg: "bg-red-50 border-red-100"
    },
    {
        id: "electricity-disruption",
        nameBn: "বিদ্যুৎ বিভ্রাট",
        nameEn: "Electricity Helpline",
        subtitleBn: "Electricity Outage",
        subtitleEn: "Electricity",
        number: "16216",
        categoryBn: "বিদ্যুৎ",
        categoryEn: "Electricity",
        icon: "assets/emergency.png",
        iconBg: "bg-red-50 border-red-100"
    },
    {
        id: "brac-emergency",
        nameBn: "ব্র্যাক",
        nameEn: "Brac Helpline",
        subtitleBn: "Brac",
        subtitleEn: "Brac",
        number: "16445",
        categoryBn: "এনজিও",
        categoryEn: "NGO",
        icon: "assets/brac.png",
        iconBg: "bg-pink-50 border-pink-100"
    },
    {
        id: "bangladesh-railway",
        nameBn: "বাংলাদেশ রেলওয়ে",
        nameEn: "Bangladesh Railway Helpline",
        subtitleBn: "Bangladesh Railway",
        subtitleEn: "Railway",
        number: "163",
        categoryBn: "পরিবহন",
        categoryEn: "Travel",
        icon: "assets/Bangladesh-Railway.png",
        iconBg: "bg-teal-50 border-teal-100"
    }
];

// App State Management
let appState = {
    coins: 100,
    hearts: 0,
    copies: 0,
    likedServices: new Set(),
    callHistory: [],
    language: "bn" // default language is Bengali as in the first screenshot
};
