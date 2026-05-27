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
    language: "bn" // default language is Bengali 
};

// DOM Cache Elements
let elements = {};

// Initialize Application when DOM is fully parsed
document.addEventListener("DOMContentLoaded", () => {
    cacheDOM();
    renderCards();
    renderHistory();
    setupEventListeners();
    updateNavbarCounters();
});

// Cache all essential DOM selectors
function cacheDOM() {
    elements = {
        coinsCount: document.getElementById("coins-count"),
        heartsCount: document.getElementById("hearts-count"),
        copiesCount: document.getElementById("copies-count"),
        cardsContainer: document.getElementById("cards-container"),
        historyList: document.getElementById("history-list"),
        clearHistoryBtn: document.getElementById("clear-history-btn"),
        emptyHistoryPlaceholder: document.getElementById("empty-history-placeholder"),

        // Calling Modal Elements
        callModal: document.getElementById("call-modal"),
        modalServiceIcon: document.getElementById("modal-service-icon"),
        modalServiceName: document.getElementById("modal-service-name"),
        modalServiceNumber: document.getElementById("modal-service-number"),
        hangupBtn: document.getElementById("hangup-btn"),

        // Translation Elements
        langBtn: document.getElementById("lang-btn"),
        heroTitle: document.getElementById("hero-title"),
        heroSlogan: document.getElementById("hero-slogan"),
        sidebarTitle: document.getElementById("sidebar-title")
    };
}

// Dynamically Render Hotline Cards in the main grid
function renderCards() {
    if (!elements.cardsContainer) return;

    elements.cardsContainer.innerHTML = "";

    HOTLINE_SERVICES.forEach((service, index) => {
        const card = document.createElement("div");
        card.className = "glass-card bg-white rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md animate-slide-up";
        card.style.animationDelay = `${index * 0.05}s`;
        card.setAttribute("data-id", service.id);

        const isLiked = appState.likedServices.has(service.id);
        const heartBtnClass = isLiked
            ? "heart-toggle-btn p-2 rounded-xl bg-rose-50 text-rose-500 hover:text-rose-500 hover:bg-rose-50/50 transition-all duration-300 focus:outline-none"
            : "heart-toggle-btn p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 transition-all duration-300 focus:outline-none";
        const heartSvgClass = isLiked ? "heart-icon w-6 h-6 pointer-events-none liked" : "heart-icon w-6 h-6 pointer-events-none";

        card.innerHTML = `
      <!-- Top Actions (Icon on top-left, Heart Toggle on top-right) -->
      <div class="flex justify-between items-start mb-4">
        <!-- Service Icon on the Top Left Corner - styled as square with rounded corners -->
        <div class="w-12 h-12 rounded-2xl ${service.iconBg} border flex items-center justify-center p-2.5 shadow-sm">
          <img src="${service.icon}" alt="${appState.language === 'bn' ? service.nameBn : service.nameEn}" class="w-full h-full object-contain filter drop-shadow-sm">
        </div>

        <!-- Heart Toggle Button on the Top Right Corner -->
        <button 
          class="${heartBtnClass}"
          aria-label="Like Service"
        >
          <svg class="${heartSvgClass}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <!-- Service Info - Left Aligned  -->
      <div class="flex flex-col items-start text-left my-2 pl-1">
        <h3 class="text-[19px] font-black text-slate-900 font-sans leading-tight mb-1">
          ${appState.language === 'bn' ? service.nameBn : service.nameEn}
        </h3>
        <p class="text-xs text-slate-400 font-bold font-sans mb-4">
          ${appState.language === 'bn' ? service.subtitleBn : service.subtitleEn}
        </p>
        <div class="text-[26px] font-black text-slate-900 font-sans leading-none tracking-tight mb-3">
          ${service.number}
        </div>
        <!-- Pill shaped category badge left-aligned and styled -->
        <span class="text-slate-500 bg-slate-100 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase select-none font-sans">
          ${appState.language === 'bn' ? service.categoryBn : service.categoryEn}
        </span>
      </div>

      <!-- Bottom Symmetrical Action Buttons (Copy and Call) -->
      <div class="grid grid-cols-2 gap-3 mt-6 font-sans">
        <button 
          class="copy-btn py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2" />
            <rect x="8" y="8" width="12" height="12" rx="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Copy
        </button>
        
        <button 
          class="call-btn py-3 px-4 rounded-xl bg-[#00B259] hover:bg-[#009E4F] text-white font-bold text-sm shadow-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </button>
      </div>
    `;
        elements.cardsContainer.appendChild(card);
    });
}

// Setup Event Listeners incorporating EVENT DELEGATION
function setupEventListeners() {
    // Use Event Delegation on the Cards Grid Container
    elements.cardsContainer.addEventListener("click", (e) => {
        const target = e.target;

        // Case 1: Heart Toggle clicked
        const heartToggle = target.closest(".heart-toggle-btn");
        if (heartToggle) {
            const card = heartToggle.closest(".glass-card");
            const serviceId = card.getAttribute("data-id");
            toggleHeart(heartToggle, serviceId);
            return;
        }

        // Case 2: Copy button clicked
        const copyBtn = target.closest(".copy-btn");
        if (copyBtn) {
            const card = copyBtn.closest(".glass-card");
            const serviceId = card.getAttribute("data-id");
            copyServiceToClipboard(serviceId);
            return;
        }

        // Case 3: Call button clicked
        const callBtn = target.closest(".call-btn");
        if (callBtn) {
            const card = callBtn.closest(".glass-card");
            const serviceId = card.getAttribute("data-id");
            initiateCall(serviceId);
            return;
        }
    });

    // Language Toggle Button Event Listener
    if (elements.langBtn) {
        elements.langBtn.addEventListener("click", () => {
            toggleLanguage();
        });
    }

    // Clear History Button event listener
    if (elements.clearHistoryBtn) {
        elements.clearHistoryBtn.addEventListener("click", () => {
            clearCallHistory();
        });
    }

    // Calling Modal Hang Up button click
    if (elements.hangupBtn) {
        elements.hangupBtn.addEventListener("click", () => {
            closeCallModal();
            showToast(appState.language === "bn" ? "কল কাটা হয়েছে" : "Call hung up", "info");
        });
    }
}

// Language Toggling Logic
function toggleLanguage() {
    appState.language = appState.language === "bn" ? "en" : "bn";

    // Update toggle button text
    if (elements.langBtn) {
        elements.langBtn.textContent = appState.language === "bn" ? "English" : "বাংলা";
    }

    // Update Hero Slogan & Headings
    if (elements.heroTitle) {
        elements.heroTitle.textContent = appState.language === "bn" ? "জরুরি সেবা ডিরেক্টরি" : "Emergency Service Directory";
    }

    // Update Sidebar Title and Fallback
    if (elements.sidebarTitle) {
        elements.sidebarTitle.textContent = "Call History"; // Keep Call History in English 
    }

    // Re-render Cards & History
    renderCards();
    renderHistory();

    // Toast notice
    showToast(
        appState.language === "bn" ? "ভাষা পরিবর্তন করা হয়েছে (বাংলা)" : "Language changed to English",
        "info"
    );
}

// Update the Top Navbar display counts
function updateNavbarCounters() {
    if (elements.coinsCount) {
        elements.coinsCount.textContent = appState.coins;
    }
    if (elements.heartsCount) {
        elements.heartsCount.textContent = appState.hearts;
    }
    if (elements.copiesCount) {
        elements.copiesCount.textContent = appState.copies;
    }
}

// Hearts Toggling Logic
function toggleHeart(button, serviceId) {
    const heartSvg = button.querySelector(".heart-icon");

    if (appState.likedServices.has(serviceId)) {
        // Unlike service
        appState.likedServices.delete(serviceId);
        heartSvg.classList.remove("liked");
        button.classList.remove("bg-rose-50", "text-rose-500");
        button.classList.add("bg-slate-50", "text-slate-400");

        appState.hearts = Math.max(0, appState.hearts - 1);
        showToast(appState.language === "bn" ? "পছন্দ তালিকা থেকে সরানো হয়েছে" : "Removed from favorites", "info");
    } else {
        // Like service
        appState.likedServices.add(serviceId);
        heartSvg.classList.add("liked");
        button.classList.remove("bg-slate-50", "text-slate-400");
        button.classList.add("bg-rose-50", "text-rose-500");

        appState.hearts += 1;
        showToast(appState.language === "bn" ? "পছন্দ তালিকায় যুক্ত করা হয়েছে! 💗" : "Added to favorites! 💗", "success");
    }

    updateNavbarCounters();
}

// Copy Hotline Number and update counters
function copyServiceToClipboard(serviceId) {
    const service = HOTLINE_SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    const name = appState.language === "bn" ? service.nameBn : service.nameEn;

    navigator.clipboard.writeText(service.number)
        .then(() => {
            appState.copies += 1;
            updateNavbarCounters();
            showToast(appState.language === "bn" ? `হটলাইন কপি করা হয়েছে: ${name} (${service.number})! 📋` : `Copied ${name} Hotline (${service.number})! 📋`, "success");
        })
        .catch((err) => {
            console.error("Failed to copy clipboard content:", err);
            showToast(appState.language === "bn" ? "কপি করতে ব্যর্থ হয়েছে" : "Failed to copy number", "error");
        });
}

// Call Service & Coin Deduction 
let activeCallTimeout = null;

function initiateCall(serviceId) {
    const service = HOTLINE_SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    const name = appState.language === "bn" ? service.nameBn : service.nameEn;

    // Check if user has sufficient coins
    if (appState.coins < 20) {
        showToast(appState.language === "bn" ? "পর্যাপ্ত কয়েন নেই! কল করতে ২০ 🪙 প্রয়োজন।" : "Insufficient Coins! Call costs 20 🪙.", "error");
        return;
    }

    // Deduct 20 coins
    appState.coins -= 20;
    updateNavbarCounters();

    // Display the simulated calling overlay modal
    if (elements.callModal) {
        elements.modalServiceIcon.src = service.icon;
        elements.modalServiceName.textContent = name;
        elements.modalServiceNumber.textContent = service.number;
        elements.callModal.classList.add("active");
    }

    // Auto-connect call after 3.5 seconds of calling
    activeCallTimeout = setTimeout(() => {
        closeCallModal();

        // Get call connection local timestamp 
        const callTime = new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

        // Add call record to state
        appState.callHistory.unshift({
            serviceId: serviceId,
            time: callTime
        });

        // Update history UI list
        renderHistory();

        showToast(appState.language === "bn" ? `${name} এর সাথে সংযোগ স্থাপন করা হয়েছে! 📞` : `Connected to ${name}! 📞`, "success");
    }, 3500);
}

// Close the calling overlay modal
function closeCallModal() {
    if (elements.callModal) {
        elements.callModal.classList.remove("active");
    }
    if (activeCallTimeout) {
        clearTimeout(activeCallTimeout);
        activeCallTimeout = null;
    }
}

// Add/Render call history panel dynamically
function renderHistory() {
    if (!elements.historyList) return;

    elements.historyList.innerHTML = "";

    if (appState.callHistory.length === 0) {
        if (elements.emptyHistoryPlaceholder) {
            elements.emptyHistoryPlaceholder.classList.remove("hidden");
        }
        return;
    }

    if (elements.emptyHistoryPlaceholder) {
        elements.emptyHistoryPlaceholder.classList.add("hidden");
    }

    appState.callHistory.forEach(callItem => {
        const service = HOTLINE_SERVICES.find(s => s.id === callItem.serviceId);
        if (!service) return;

        const name = appState.language === "bn" ? service.nameBn : service.nameEn;

        // Create list item element exactly matching history items 
        const item = document.createElement("div");
        item.className = "flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-all duration-300 gap-3 animate-slide-up shadow-sm";

        item.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
          <img src="${service.icon}" alt="${name}" class="w-full h-full object-contain">
        </div>
        <div>
          <h4 class="text-sm font-extrabold text-slate-800 leading-tight">
            ${name}
          </h4>
          <p class="text-xs font-mono font-bold text-slate-400 mt-0.5">
            ${service.number}
          </p>
        </div>
      </div>
      
      <div class="flex flex-col items-end gap-1">
        <span class="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-150 py-1 px-2.5 rounded-full select-none">
          ${callItem.time}
        </span>
      </div>
    `;
        elements.historyList.appendChild(item);
    });
}

// Clear all items in call history
function clearCallHistory() {
    appState.callHistory = [];

    if (elements.historyList) {
        elements.historyList.innerHTML = "";
    }

    if (elements.emptyHistoryPlaceholder) {
        elements.emptyHistoryPlaceholder.classList.remove("hidden");
    }

    showToast(appState.language === "bn" ? "কল হিস্ট্রি মুছে ফেলা হয়েছে" : "Call history cleared", "info");
}

// Premium dynamic Custom Toast notification system
function showToast(message, type = "info") {
    // Remove existing toasts first to prevent overlaps
    const existingToasts = document.querySelectorAll(".custom-toast");
    existingToasts.forEach(toast => toast.remove());

    // Create toast container
    const toast = document.createElement("div");
    toast.className = "custom-toast font-sans font-semibold text-sm";

    // Styles based on notification type
    if (type === "success") {
        toast.className += " bg-emerald-50 border border-emerald-100 text-emerald-700";
        toast.innerHTML = `
      <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    `;
    } else if (type === "error") {
        toast.className += " bg-rose-50 border border-rose-100 text-rose-700 animate-pulse-glow";
        toast.innerHTML = `
      <svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>${message}</span>
    `;
    } else {
        toast.className += " bg-indigo-50 border border-indigo-100 text-indigo-700";
        toast.innerHTML = `
      <svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    `;
    }

    document.body.appendChild(toast);

    // Auto-remove toast after 3 seconds with slide-out animation
    setTimeout(() => {
        toast.classList.add("hide");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 3000);
}