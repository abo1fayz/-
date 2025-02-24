const apiKey = "a542b18281f139606cb15819"; // مفتاح API الخاص بك
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// كائن يحتوي على أسماء العملات بالعربية
const currencyNames = {
    "USD": "دولار أمريكي",
    "EUR": "يورو",
    "TRY": "ليرة تركية",
    "SYP": "ليرة سورية",
    "ILS": "شيكل إسرائيلي",
    "IMP": "جنيه جيرسي",
    "INR": "روبية هندية",
    "IQD": "دينار عراقي",
    "IRR": "ريال إيراني",
    "ISK": "كرونة آيسلندية",
    "JEP": "جنيه جيرسي",
    "JMD": "دولار جامايكي",
    "JOD": "دينار أردني",
    "JPY": "ين ياباني",
    "KES": "شلن كيني",
    "KGS": "سوم قيرغيزستان",
    "KHR": "ريال كمبودي",
    "KID": "دولار كيريباس",
    "KMF": "فرنك جزر القمر",
    "KRW": "وون كوري جنوبي",
    "KWD": "دينار كويتي",
    "KYD": "دولار كايمان",
    "KZT": "تنغ الأوزبكي",
    "LAK": "كيبات لاوسي",
    "LBP": "ليرة لبنانية",
    "LKR": "روبية سريلانكية",
    "LRD": "دولار ليبيري",
    "LSL": "لوتي ليسوتو",
    "LYD": "دينار ليبي",
    "MAD": "درهم مغربي",
    "MDL": "ليو مولدوفي",
    "MGA": "أرياري مدغشقري",
    "MKD": "دينار مقدوني",
    "MMK": "كيات ميانمار",
    "MNT": "توجروغ منغولي",
    "MOP": "باتاكا ماكاو",
    "MRU": "أوقية موريتانية",
    "MUR": "روبية موريشيوسية",
    "MVR": "روبية مالديفية",
    "MWK": "كواشا مالاوي",
    "MXN": "بيزو مكسيكي",
    "MYR": "رينغيت ماليزي",
    "MZN": "ماتكزان موزمبيقي",
    "NAD": "دولار ناميبي",
    "NGN": "نايرا نيجيرية",
    "NIO": "كوردو نيكاراغوي",
    "NOK": "كرونة نرويجية",
    "NPR": "روبية نيبالية",
    "NZD": "دولار نيوزيلندي",
    "OMR": "ريال عماني",
    "PAB": "بالبوّا بنمية",
    "PEN": "سول جديد بيروفي",
    "PGK": "كينا بابوا غينيا الجديدة",
    "PHP": "بيزو فلبيني",
    "PKR": "روبية باكستانية",
    "PLN": "زلوتي بولندي",
    "PYG": "غواراني باراغواي",
    "QAR": "ريال قطري",
    "RON": "ليو روماني",
    "RSD": "دينار صربي",
    "RUB": "روبل روسي",
    "RWF": "فرنك رواندي",
    "SAR": "ريال سعودي",
    "SBD": "دولار جزر سليمان",
    "SCR": "روبية سيشيلية",
    "SDG": "جنيه سوداني",
    "SEK": "كرونة سويدية",
    "SGD": "دولار سنغافوري",
    "SHP": "جنيه سانت هيلاني",
    "SLE": "ليون سيراليوني",
    "SLL": "ليون سيراليوني",
    "SOS": "شلن صومالي",
    "SRD": "دولار سورينامي",
    "SSP": "جنيه جنوب السودان",
    "STN": "دوبره ساو تومي وبرينسيبي",
    "SYP": "ليرة سورية",
    "SZL": "زيلانجي سوازيلندي",
    "THB": "بات تايلاندي",
    "TJS": "سماني طاجيكستان",
    "TMT": "مانات تركمانستان",
    "TND": "دينار تونسي",
    "TOP": "تالا تونغاني",
    "TRY": "ليرة تركية",
    "TTD": "دولار ترينيداد وتوباغو",
    "TVD": "دولار توفالو",
    "TWD": "دولار تايواني جديد",
    "TZS": "شلن تنزاني",
    "UAH": "هريفنا أوكرانية",
    "UGX": "شلن أوغندي",
    "UYU": "بيزو أوروغواي",
    "UZS": "سوم أوزبكي",
    "VES": "بوليفار فنزويلي",
    "VND": "دونغ فيتنامي",
    "VUV": "فاتو فانواتو",
    "WST": "تالا سامواني",
    "XAF": "فرنك وسط أفريقي",
    "XCD": "دولار شرق الكاريبي",
    "XDR": "حقوق سحب خاصة",
    "XOF": "فرنك غرب أفريقي",
    "XPF": "فرنك بولينيزي",
    "YER": "ريال يمني",
    "ZAR": "راندا جنوب أفريقي",
    "ZMW": "كواشا زامبي",
    "ZWL": "دولار زيمبابوي"
};

// تحميل العملات المتاحة عند فتح الصفحة
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        const fromCurrency = document.getElementById("fromCurrency");
        const toCurrency = document.getElementById("toCurrency");

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currencyNames[currency] || currency;
            fromCurrency.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currencyNames[currency] || currency;
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "TRY";

        // تحديث أسعار الصرف المباشرة
        updateLiveRates(data);
    } catch (error) {
        console.error("خطأ في تحميل العملات:", error);
        document.getElementById("liveRates").innerHTML = "❌ فشل تحميل أسعار الصرف!";
    }
});

// دالة تحديث أسعار الصرف المباشرة
async function updateLiveRates(data) {
    const usdToTry = data.conversion_rates["TRY"];
    const tryToSyp = await getTryToSypRate(); // استدعاء سعر TRY/SYP
    const usdToSyp = await getUsdToSypRate(); // جلب سعر الدولار مقابل الليرة السورية

    document.getElementById("usdToTry").textContent = `💰 سعر الدولار مقابل الليرة التركية: ${usdToTry.toFixed(2)} TRY`;
    document.getElementById("tryToSyp").textContent = `💰 سعر الليرة التركية مقابل الليرة السورية: ${tryToSyp ? tryToSyp.toFixed(2) : "غير متوفر"}`;
    document.getElementById("sypToUsd").textContent = `💰 سعر الدولار مقابل الليرة السورية: ${usdToSyp ? usdToSyp.toFixed(2) : "غير متوفر"}`;
}

// دالة لجلب سعر USD/SYP من مصدر خارجي
async function getUsdToSypRate() {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD"); // استخدام API موثوق
        const data = await response.json();
        console.log("سعر الدولار مقابل الليرة السورية:", data.rates["SYP"]); // طباعة السعر في وحدة التحكم
        return data.rates["SYP"];
    } catch (error) {
        console.error("❌ خطأ في تحميل USD/SYP:", error);
        return null;
    }
}

// دالة لجلب سعر TRY/SYP من مصدر خارجي
async function getTryToSypRate() {
    try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/TRY");
        const data = await response.json();
        console.log("سعر الليرة التركية مقابل الليرة السورية:", data.rates["SYP"]); // طباعة السعر في وحدة التحكم
        return data.rates["SYP"];
    } catch (error) {
        console.error("❌ خطأ في تحميل TRY/SYP:", error);
        return null;
    }
}

// دالة تحويل العملات مع إضافة رسالة منبثقة
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "" || amount <= 0) {
        alert("يرجى إدخال مبلغ صالح!");
        return;
    }

    // تحقق من القيمة المدخلة
    if (amount ==12211221) { // قم بتغيير 100 إلى الرقم الذي تريده
        alert("تصميم بواسطة محمد مسلم");
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("result").textContent = `النتيجة: ${convertedAmount} ${currencyNames[toCurrency] || toCurrency}`;

        // رسالة منبثقة
        alert(`تم تحويل ${amount} ${currencyNames[fromCurrency]} إلى ${convertedAmount} ${currencyNames[toCurrency]}!`);
    } catch (error) {
        console.error("خطأ في التحويل:", error);
    }
}

// تحديث الأسعار كل دقيقة تلقائيًا
setInterval(async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        updateLiveRates(data);
    } catch (error) {
        console.error("خطأ في تحديث الأسعار:", error);
    }
}, 60000); // تحديث السعر كل 60 ثانية