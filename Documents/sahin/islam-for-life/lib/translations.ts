export type Language = 'en' | 'hi' | 'ur' | 'bn';

export const translations = {
  en: {
    // Dashboard
    app_name: "Islam For Life",
    loading: "Loading...",
    next_prayer: "Next Prayer In",
    up_next: "Up Next",
    fajr: "Fajr", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha",
    
    // Feature Titles
    tasbih: "Tasbih",
    tasbih_desc: "Track Dhikr",
    qibla: "Qibla",
    qibla_desc: "Find Direction",
    zakat: "Zakat",
    zakat_desc: "Calculator",
    settings: "Settings",
    select_lang: "Select Language",
    location: "Location",
    prayer_times: "Prayer Times",
    view_schedule: "View Schedule",
    madhab: "Asr Method (Madhab)",
    shafi_desc: "Standard (Shafi, Maliki, Hanbali)",
    hanafi_desc: "Hanafi (Late Asr)",
    names_allah: "99 Names",
    names_desc: "Learn & Memorize",

    // Calender
    calendar: "Islamic Calendar",
    hijri: "Hijri",
    gregorian: "Gregorian",
    upcoming_events: "Upcoming Events",
    event_disclaimer: "* Dates are subject to moon sighting.",
    today_is: "Today is",

    // Event Names
    new_year: "Islamic New Year",
    ashura: "Ashura",
    mawlid: "Mawlid al-Nabi",
    isra: "Isra and Mi'raj",
    shaban: "Mid-Sha'ban",
    ramadan_start: "Start of Ramadan",
    laylat_qadr: "Laylat al-Qadr",
    eid_fitr: "Eid al-Fitr",
    arafah: "Day of Arafah",
    eid_adha: "Eid al-Adha",

    // Quote
    daily_inspiration: "Daily Inspiration",
    quote_of_day: "Quote of the Day",
    enable_notifs: "Get Daily Notifications",   
    share_quote: "Share Quote",
    read_more: "Read More",

    // Profile
    profile: "Profile",
    guest: "Guest",
    edit_profile: "Edit Profile",
    your_name: "Your Name",
    enter_name: "Enter your name...",
    joined: "Joined",
    stats: "Your Stats",
    salam: "Salam",
    save_changes: "Save Changes",
    create_profile: "Create Profile",
    skip: "Skip for now",

    // Mosques Nearby
    explore: "Explore Topics",
    explore_desc: "Quranic Solutions for Feelings",
    mosques: "Nearby Mosques",
    mosques_desc: "Find Prayer Places",
    feeling_question: "How are you feeling?",
    find_mosques: "Find Mosques",
    location_permission: "Enable location to see mosques near you",
    open_maps: "Open in Google Maps",

    // ADHAN
    enable_adhan: "Play Adhan Audio", 
    adhan_enabled: "Adhan Enabled",
    adhan_disabled: "Adhan Silent",

    // Favorites
    favorites: "Favorites",
    favorites_desc: "Your Saved Items",
    no_favorites: "No favorites yet. Tap the heart icon to save items.",
    monthly_schedule: "30-Day Schedule ",
    date: "Date",

    // SAHIH MUSLIM
    muslim: "Sahih Muslim",
    muslim_desc: "Pure Traditions",

    // SAHIH BUKHARI
    hadith: "Hadith Collection",
    bukhari: "Sahih al-Bukhari",
    bukhari_desc: "Authentic Traditions",
    book_of: "Book of",
    hadith_no: "Hadith",

    // DUAS
    duas: "Quranic Duas",
    duas_desc: "Supplications from Verses", 
    healing: "Healing",
    guidance: "Guidance", 
    mercy: "Mercy",
    forgiveness: "Forgiveness",
    patience: "Patience",
    devotion: "Devotion",
    family: "Family",
    clothing: "Clothing",
    business: "Business & Wealth",
    food: "Food & Drink",
    fasting: "Fasting (Sawm)",
    marriage: "Marriage",
    protection: "Protection & Safety",
    charity_cat: "Charity",

    // AI QURAN
    quran: "Al Quran",
    read_quran: "Read The Holy Quran",
    search_surah: "Search Surah...",
    surah: "Surah",
    verses: "Verses",
    mecca: "Meccan",
    medina: "Medinan",
    revelation: "Revelation",

    // TASBIH PAGE
    dhikr_counter: "Dhikr Counter",
    target: "Target",
    tap_to_count: "Tap to Count",
    reset: "Reset",
    completed: "Completed",

    // QIBLA PAGE
    align_compass: "Align Your Compass",
    start_compass: "Start Compass",
    permission_needed: "Tap to allow access to sensors",
    facing_qibla: "You are facing the Qibla!",
    direction: "Qibla Direction",

    // ZAKAT PAGE
    smart_zakat: "Zakat Intelligence",
    live_rates: "Live Rates",
    fetching: "Fetching...",
    gold_rate: "Gold Rate",
    silver_rate: "Silver Rate",
    your_assets: "Your Assets",
    deduct_liabilities: "Deduct Liabilities",
    cash_bank: "Cash & Bank",
    gold_grams: "Gold (Grams)",
    silver_grams: "Silver (Grams)",
    investments: "Stocks / Investments",
    debts: "Debts / Liabilities",
    net_wealth: "Net Wealth",
    nisab_threshold: "Nisab Threshold",
    zakat_payable: "Zakat Payable",
    below_threshold: "Below Threshold",
    eligible: "Eligible to Pay",
    reach_nisab: "Add to reach Nisab"
  },
  hi: {
    // Dashboard
    app_name: "इस्लाम फॉर लाइफ",
    loading: "लोड हो रहा है...",
    next_prayer: "अगली नमाज़",
    up_next: "अगला",
    fajr: "फ़जर", dhuhr: "ज़ुहर", asr: "असर", maghrib: "मग़रिब", isha: "ईशा",
    
    tasbih: "तस्बीह", tasbih_desc: "ज़िक्र ट्रैक करें",
    qibla: "किबला", qibla_desc: "दिशा खोजें",
    zakat: "ज़कात", zakat_desc: "कैलकुलेटर",
    settings: "सेटिंग्स", select_lang: "भाषा चुनें",
    location: "स्थान", prayer_times: "नमाज़ का समय",
    view_schedule: "शेड्यूल देखें", madhab: "असर का तरीका (मज़हब)",
    shafi_desc: "मानक (शफी, मलिकी, हम्बली)",
    hanafi_desc: "हनाफी (देर से असर)",
    names_allah: "अल्लाह के 99 नाम",
    names_desc: "सीखें और याद करें",
    
    // Calender 
    calendar: "इस्लामिक कैलेंडर",
    hijri: "हिजरी",
    gregorian: "अंग्रेजी तारीख",
    upcoming_events: "आगामी कार्यक्रम",
    event_disclaimer: "* तारीखें चांद दिखने पर निर्भर हैं।",
    today_is: "आज है",

    // Events
    new_year: "इस्लामिक नया साल",
    ashura: "आशूरा",
    mawlid: "ईद-ए-मिलाद",
    isra: "शब-ए-मेराज",
    shaban: "शब-ए-बारात",
    ramadan_start: "रमजान की शुरुआत",
    laylat_qadr: "शब-ए-कद्र",
    eid_fitr: "ईद उल-फ़ित्र",
    arafah: "अराफा का दिन",
    eid_adha: "ईद उल-अधा",

    // Quote
    daily_inspiration: "दैनिक प्रेरणा",
    quote_of_day: "आज का विचार",
    enable_notifs: "दैनिक सूचनाएं प्राप्त करें",
    share_quote: "शेयर करें",
    read_more: "और पढ़ें",

    // Profile
    profile: "प्रोफाइल",
    guest: "मेहमान",
    edit_profile: "प्रोफाइल बदलें",
    your_name: "आपका नाम",
    enter_name: "अपना नाम लिखें...",
    joined: "शामिल हुए",
    stats: "आंकड़े",
    salam: "सलाम",
    save_changes: "बदलाव सहेजें",
    create_profile: "प्रोफाइल बनाएं",
    skip: "अभी छोड़ें",

    // Mosques Nearby
    explore: "विषय खोजें",
    explore_desc: "भावनाओं के लिए कुरान का हल",
    mosques: "नज़दीकी मस्जिदें",
    mosques_desc: "नमाज़ की जगह खोजें",
    feeling_question: "आप कैसा महसूस कर रहे हैं?",
    find_mosques: "मस्जिदें खोजें",
    location_permission: "मस्जिदें देखने के लिए लोकेशन चालू करें",
    open_maps: "गूगल मैप्स में खोलें",

    // ADHAN
    enable_adhan: "अज़ान की आवाज़",
    adhan_enabled: "अज़ान चालू",
    adhan_disabled: "अज़ान बंद",

    // Favorites
    favorites: "पसंदीदा",
    favorites_desc: "आपकी सुरक्षित चीजें",
    no_favorites: "अभी तक कोई पसंदीदा नहीं। सेव करने के लिए दिल के आइकन पर टैप करें।",
    monthly_schedule: "30-दिन का शेड्यूल",
    date: "तारीख",

    // SAHIH MUSLIM
    muslim: "सहीह मुस्लिम",
    muslim_desc: "शुद्ध परंपराएं",

    // SAHIH BUKHARI
    hadith: "हदीस संग्रह",
    bukhari: "सहीह अल-बुखारी",
    bukhari_desc: "प्रामाणिक परंपराएं",
    book_of: "की किताब",
    hadith_no: "हदीस",

    // DUAS
    duas: "कुरान की दुआएं",
    duas_desc: "आयतों से दुआएं",
    healing: "शिफा (उपचार)",
    guidance: "हिदायत (मार्गदर्शन)",
    mercy: "रहमत (दया)",
    forgiveness: "मगफिरत (क्षमा)",
    patience: "सब्र (धैर्य)",
    devotion: "इबादत (भक्ति)",
    family: "परिवार",
    clothing: "कपड़े",
    business: "व्यापार और धन",
    food: "खान-पान",
    fasting: "रोज़ा",
    marriage: "विवाह",
    protection: "सुरक्षा (बुराई से)",
    charity_cat: "दान (सदका)", 

    // AI QURAN
    quran: "अल कुरान",
    read_quran: "पवित्र कुरान पढ़ें",
    search_surah: "सूरत खोजें...",
    surah: "सूरत",
    verses: "आयतें",
    mecca: "मक्का",
    medina: "मदीना",
    revelation: "रहस्योद्घाटन",

    // TASBIH
    dhikr_counter: "ज़िक्र काउंटर",
    target: "लक्ष्य",
    tap_to_count: "गिनने के लिए टैप करें",
    reset: "रीसेट",
    completed: "पूरा हुआ",

    // QIBLA
    align_compass: "अपना कंपास ठीक करें",
    start_compass: "कंपास शुरू करें",
    permission_needed: "सेंसर एक्सेस के लिए टैप करें",
    facing_qibla: "आप किबला की ओर हैं!",
    direction: "किबला दिशा",

    // ZAKAT
    smart_zakat: "ज़कात इंटेलिजेंस",
    live_rates: "लाइव रेट",
    fetching: "ला रहा है...",
    gold_rate: "सोने का भाव",
    silver_rate: "चांदी का भाव",
    your_assets: "आपकी संपत्ति",
    deduct_liabilities: "देनदारियां घटाएं",
    cash_bank: "नकद और बैंक",
    gold_grams: "सोना (ग्राम)",
    silver_grams: "चांदी (ग्राम)",
    investments: "निवेश / शेयर",
    debts: "कर्ज / देनदारियां",
    net_wealth: "कुल संपत्ति",
    nisab_threshold: " निसाब सीमा",
    zakat_payable: "ज़कात देय",
    below_threshold: "सीमा से नीचे",
    eligible: "भुगतान के योग्य",
    reach_nisab: "निसाब तक पहुंचने के लिए जोड़ें"
  },
  ur: {
    // Dashboard
    app_name: "اسلام فار لائف",
    loading: "لوڈ ہو رہا ہے...",
    next_prayer: "اگلی نماز",
    up_next: "اگلا",
    fajr: "فجر", dhuhr: "ظہر", asr: "عصر", maghrib: "مغرب", isha: "عشاء",
    
    tasbih: "تسبیح", tasbih_desc: "ذکر شمار کریں",
    qibla: "قبلہ", qibla_desc: "سمت تلاش کریں",
    zakat: "زکوٰۃ", zakat_desc: "کیلکولیٹر",
    settings: "ترتیبات", select_lang: "زبان منتخب کریں",
    location: "مقام", prayer_times: "نماز کے اوقات",
    view_schedule: "شیڈول دیکھیں", madhab: "عصر کا طریقہ (مذہب)",
    shafi_desc: "معیاری (شافعی، مالکی، حنبلی)",
    hanafi_desc: "حنفی (تاخیر سے عصر)",
    names_allah: "اللہ کے 99 نام",
    names_desc: "سیکھیں اور حفظ کریں",
 
    // Calender
    calendar: "اسلامی کیلنڈر",
    hijri: "ہجری",
    gregorian: "عیسوی",
    upcoming_events: "آنے والے واقعات",
    event_disclaimer: "* تاریخوں کا انحصار چاند نظر آنے پر ہے۔",
    today_is: "آج ہے",

    // Events
    new_year: "اسلامی نیا سال",
    ashura: "عاشورہ",
    mawlid: "عید میلاد النبی",
    isra: "شب معراج",
    shaban: "شب برات",
    ramadan_start: "رمضان کا آغاز",
    laylat_qadr: "لیلۃ القدر",
    eid_fitr: "عید الفطر",
    arafah: "یوم عرفہ",
    eid_adha: "عید الاضحیٰ",

    // Quote
    daily_inspiration: "روزانہ کی ترغیب",
    quote_of_day: "آج کا پیغام",
    enable_notifs: "روزانہ اطلاعات حاصل کریں",
    share_quote: "شیئر کریں",
    read_more: "مزید پڑھیں",

    // Profile
    profile: "پروفائل",
    guest: "مہمان",
    edit_profile: "پروفائل میں ترمیم کریں",
    your_name: "آپ کا نام",
    enter_name: "اپنا نام درج کریں...",
    joined: "شمولیت",
    stats: "اعداد و شمار",
    salam: "سلام",
    save_changes: "تبدیلیاں محفوظ کریں",
    create_profile: "پروفائل بنائیں",
    skip: "فی الحال چھوڑ دیں",

    // Mosques Nearby
    explore: "موضوعات تلاش کریں",
    explore_desc: "احساسات کا قرآنی حل",
    mosques: "قریبی مساجد",
    mosques_desc: "نماز کی جگہ تلاش کریں",
    feeling_question: "آپ کیسا محسوس کر رہے ہیں؟",
    find_mosques: "مساجد تلاش کریں",  
    location_permission: "مساجد دیکھنے کے لیے لوکیشن آن کریں",
    open_maps: "گوگل میپس میں کھولیں",

    // ADHAN
    enable_adhan: "اذان کی آواز",
    adhan_enabled: "اذان فعال",
    adhan_disabled: "اذان خاموش", 

    // Favorites
    favorites: "پسندیدہ",
    favorites_desc: "آپ کی محفوظ کردہ چیزیں",
    no_favorites: "ابھی تک کوئی پسندیدہ نہیں۔ محفوظ کرنے کے لیے دل کے آئیکن پر ٹیپ کریں۔",
    monthly_schedule: "30 دن کا شیڈول", 
    date: "تاریخ",

    // SAHIH MUSLIM
    muslim: "صحیح مسلم",
    muslim_desc: "خالص روایات",

    // SAHIH BUKHARI
    hadith: "حدیث کا مجموعہ",
    bukhari: "صحیح البخاری",
    bukhari_desc: "مستند روایات",
    book_of: "کی کتاب",
    hadith_no: "حدیث",

    // DUAS
    duas: "قرآنی دعائیں",
    duas_desc: "آیات سے دعائیں",
    healing: "شفا",
    guidance: "ہدایت",
    mercy: "رحمت",
    forgiveness: "مغفرت",
    patience: "صبر",
    devotion: "عبادت",
    family: "خاندان",
    clothing: "لباس", 
    business: "کاروبار اور دولت",
    food: "کھانا پینا",
    fasting: "روزہ",
    marriage: "شادی",
    protection: "حفاظت",
    charity_cat: "صدقہ",

    // AI QURAN
    quran: "القرآن",
    read_quran: "قرآن پاک پڑھیں",
    search_surah: "سورت تلاش کریں...",
    surah: "سورت",
    verses: "آیات",
    mecca: "مکی",
    medina: "مدنی",
    revelation: "نزول",

    // TASBIH
    dhikr_counter: "ذکر کاؤنٹر",
    target: "ہدف",
    tap_to_count: "گننے کے لیے ٹیپ کریں",
    reset: "ری سیٹ",
    completed: "مکمل",

    // QIBLA
    align_compass: "اپنا کمپاس سیدھا کریں",
    start_compass: "کمپاس شروع کریں",
    permission_needed: "سینسر تک رسائی کے لیے ٹیپ کریں",
    facing_qibla: "آپ قبلہ رخ ہیں!",
    direction: "قبلہ کی سمت",

    // ZAKAT
    smart_zakat: "زکوٰۃ انٹیلی جنس",
    live_rates: "لائیو ریٹ",
    fetching: "لا رہا ہے...",
    gold_rate: "سونے کا ریٹ",
    silver_rate: "چاندی کا ریٹ",
    your_assets: "آپ کے اثاثے",
    deduct_liabilities: "واجبات منہا کریں",
    cash_bank: "نقد اور بینک",
    gold_grams: "سونا (گرام)",
    silver_grams: "چاندی (گرام)",
    investments: "سرمایہ کاری",
    debts: "قرض / واجبات",
    net_wealth: "کل دولت",
    nisab_threshold: "نصاب کی حد",
    zakat_payable: "قابل ادا زکوٰۃ",
    below_threshold: "حد سے نیچے",
    eligible: "ادائیگی کے اہل",
    reach_nisab: "نصاب تک پہنچنے کے لیے شامل کریں"
  },
  bn: {
    // Dashboard
    app_name: "ইসলাম ফর লাইফ",
    loading: "লোড হচ্ছে...",
    next_prayer: "পরবর্তী নামাজ",
    up_next: "সামনে",
    fajr: "ফজর", dhuhr: "জোহর", asr: "আছর", maghrib: "মাগরিব", isha: "এশা",
    
    tasbih: "তাসবিহ", tasbih_desc: "জিকির গণনা",
    qibla: "কিবলা", qibla_desc: "দিক নির্ণয়",
    zakat: "যাকাত", zakat_desc: "ক্যালকুলেটর",
    settings: "সেটিংস", select_lang: "ভাষা নির্বাচন করুন",
    location: "অবস্থান", prayer_times: "নামাজের সময়",
    view_schedule: "সময়সূচী দেখুন", madhab: "আছরের পদ্ধতি (মাজহাব)",
    shafi_desc: "স্ট্যান্ডার্ড (শাফি, মালিকি, হাম্বলি)",
    hanafi_desc: "হানাফি (দেরিতে আছর)",
    names_allah: "আল্লাহর ৯৯ নাম",
    names_desc: "শিখুন এবং মুখস্থ করুন",

    // Calender
    calendar: "ইসলামি ক্যালেন্ডার",
    hijri: "হিজরি",
    gregorian: "ইংরেজি তারিখ",
    upcoming_events: "আসন্ন ঘটনাবলী",
    event_disclaimer: "* তারিখ চাঁদ দেখার উপর নির্ভরশীল।",
    today_is: "আজ",

    // Events
    new_year: "হিজরি নববর্ষ",
    ashura: "আশুরা",
    mawlid: "ঈদে মিলাদুন্নবী",
    isra: "শবে মেরাজ",
    shaban: "শবে বরাত",  
    ramadan_start: "রমজান শুরু",
    laylat_qadr: "শবে কদর",
    eid_fitr: "ঈদুল ফিতর",
    arafah: "আরাফাতের দিন",
    eid_adha: "ঈদুল আজহা",

    // Quote
    daily_inspiration: "দৈনিক অনুপ্রেরণা",
    quote_of_day: "আজকের বাণী",
    enable_notifs: "দৈনিক নোটিফিকেশন পান",
    share_quote: "শেয়ার করুন",
    read_more: "আরও পড়ুন",

    // Profile
    profile: "প্রোফাইল",
    guest: "মেহমান",
    edit_profile: "প্রোফাইল এডিট করুন",
    your_name: "আপনার নাম",
    enter_name: "আপনার নাম লিখুন...",
    joined: "যোগ দিয়েছেন",
    stats: "পরিসংখ্যান",
    salam: "সালাম",
    save_changes: "পরিবর্তন সংরক্ষণ করুন",
    create_profile: "প্রোফাইল তৈরি করুন",
    skip: "এখন এড়িয়ে যান",

    // Mosques Nearby
    explore: "বিষয় অন্বেষণ",
    explore_desc: "অনুভূতির জন্য কুরআনের সমাধান",
    mosques: "নিকটবর্তী মসজিদ",
    mosques_desc: "নামাজের স্থান খুঁজুন",
    feeling_question: "আপনি কেমন অনুভব করছেন?",
    find_mosques: "মসজিদ খুঁজুন",
    location_permission: "মসজিদ দেখতে লোকেশন চালু করুন",
    open_maps: "গুগল ম্যাপে খুলুন",

    // ADHAN
    enable_adhan: "আজানের শব্দ", 
    adhan_enabled: "আজান চালু",
    adhan_disabled: "আজান বন্ধ",

    // Favorites
    favorites: "প্রিয় তালিকা",
    favorites_desc: "আপনার সংরক্ষিত আইটেম",
    no_favorites: "এখনও কোন প্রিয় নেই। সংরক্ষণ করতে হার্ট আইকনে ট্যাপ করুন।",
    monthly_schedule: "৩০ দিনের সময়সূচী",
    date: "তারিখ",

    // SAHIH MUSLIM
    muslim: "সহীহ মুসলিম",
    muslim_desc: "বিশুদ্ধ হাদিস",

    // SAHIH BUKHARI
    hadith: "হাদিস সংগ্রহ",
    bukhari: "সহীহ আল-বুখারী",
    bukhari_desc: "বিশুদ্ধ হাদিস",
    book_of: "কিতাব",
    hadith_no: "হাদিস",

    // DUAS
    duas: "কুরআনিক দোয়া",
    duas_desc: "আয়াত থেকে দোয়া",
    healing: "শেফা (নিরাময়)",
    guidance: "হেদায়েত (পথনির্দেশ)",
    mercy: "রহমত (দয়া)",
    forgiveness: "ক্ষমা",
    patience: "ধৈর্য",
    devotion: "ইবাদত (ভক্তি)",
    family: "পরিবার",
    clothing: "পোশাক",
    business: "ব্যবসা ও সম্পদ",
    food: "খাদ্য ও পানীয়",
    fasting: "রোজা",
    marriage: "বিবাহ",
    protection: "সুরক্ষা",
    charity_cat: "দান (সাদাকা)",

    // AI QURAN
    quran: "আল কুরআন",
    read_quran: "পবিত্র কুরআন পড়ুন",
    search_surah: "সূরা খুঁজুন...",
    surah: "সূরা",
    verses: "আয়াত",
    mecca: "মাক্কী",
    medina: "মাদানী",
    revelation: "অবতীর্ণ",

    // TASBIH
    dhikr_counter: "জিকির কাউন্টার",
    target: "লক্ষ্য",
    tap_to_count: "গণনা করতে ট্যাপ করুন",
    reset: "রিসেট",
    completed: "সম্পন্ন",

    // QIBLA
    align_compass: "কম্পাস ঠিক করুন",
    start_compass: "কম্পাস শুরু করুন",
    permission_needed: "সেন্সর অ্যাক্সেস করতে ট্যাপ করুন",
    facing_qibla: "আপনি কিবলামুখী!",
    direction: "কিবলার দিক",

    // ZAKAT
    smart_zakat: "যাকাত বুদ্ধিমত্তা",
    live_rates: "লাইভ রেট",
    fetching: "আনা হচ্ছে...",
    gold_rate: "সোনার দাম",
    silver_rate: "রুপার দাম",
    your_assets: "আপনার সম্পদ",
    deduct_liabilities: "দায় বিয়োগ করুন",
    cash_bank: "নগদ ও ব্যাংক",
    gold_grams: "সোনা (গ্রাম)",
    silver_grams: "রুপা (গ্রাম)",
    investments: "বিনিয়োগ / শেয়ার",
    debts: "ঋণ / দায়",
    net_wealth: "মোট সম্পদ",
    nisab_threshold: "নিসাব সীমা",
    zakat_payable: "প্রদেয় যাকাত",
    below_threshold: "সীমার নিচে",
    eligible: "প্রদানের যোগ্য",
    reach_nisab: "নিসাব পূরণে যোগ করুন"
  }
};