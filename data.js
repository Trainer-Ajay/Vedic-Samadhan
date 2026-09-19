/* ============================================================
   VEDIC SAMADHAN — EDITABLE DATA FILE
   ------------------------------------------------------------
   This is the ONLY file you should need to edit day-to-day.
   Change prices, add/remove poojas, update the Tithi banner,
   or change contact details right here. Save the file and
   refresh the page (or push to GitHub) to see changes live.
   ============================================================ */

const SITE_DATA = {

  // ---- Business identity ----
  business: {
    name: "Vedic Samadhan",
    tagline: "Guidance of Pundit Vidyanand Shukla",
    punditName: "Pundit Vidyanand Shukla",
    punditTitle: "Renowned Vedic Astrologer & Karmakandi, Bihar",
    whatsappNumber: "918084845147",   // country code + number, no + or spaces
    displayPhone: "+91 80848 45147",
    upiId: "8084845147@ybl",
    blessedCounterText: "12,450+ Blessings delivered this month across Bihar & India"
  },

  // ---- Tithi / Panchang ticker ----
  // Edit this text daily (or leave it and it will just show today's date).
  // A free-text field keeps this simple and reliable without needing a
  // live astronomical calculation engine.
  panchang: {
    tithi: "Shukla Paksha Panchami",
    nakshatra: "Rohini",
    rahuKaal: "Check today's Rahu Kaal before starting travel or new work"
  },

  // ---- Consultation tiers (phone / video call consultations) ----
  consultations: [
    {
      id: "quick",
      name: "Quick Consultation",
      duration: "10 Mins",
      price: 250,
      description: "For a single pressing question — money, health, or marriage."
    },
    {
      id: "discovery",
      name: "Discovery Consultation",
      subtitle: "Prashna Chintan",
      duration: "20 Mins",
      price: 500,
      description: "Root-cause analysis of current life blockages and immediate guidance."
    },
    {
      id: "full",
      name: "Full Consultation",
      subtitle: "Prashna Chintan & Samadhan",
      duration: "35 Mins",
      price: 750,
      description: "Detailed problem mapping followed by specific, actionable remedies."
    }
  ],

  // Buffer add-on rules for consultations
  buffer: {
    minutesPerClick: 5,
    pricePerClick: 100,
    maxClicks: 2
  },

  // ---- Pooja tiers ----
  // Each pooja sits in one tier. Edit tier prices in one place below,
  // or move a pooja to a different tier by changing its "tier" value.
  poojaTiers: {
    basic:    { name: "Basic",    price: 501,  note: "Simple, focused remedies" },
    standard: { name: "Standard", price: 1100, note: "Deeper ritual with sankalp" },
    premium:  { name: "Premium",  price: 2100, note: "Elaborate vidhi for major life issues" }
  },

  poojas: [
    { name: "Nariyal Pooja", tier: "basic" },
    { name: "Pushpanjali", tier: "basic" },
    { name: "Maala Pooja", tier: "basic" },
    { name: "Rudraksh Pooja", tier: "basic" },
    { name: "Drishti Dosh Nivaran Pooja", tier: "basic" },

    { name: "Trishool Pooja", tier: "standard" },
    { name: "Naag Pooja", tier: "standard" },
    { name: "Sankat Mochan Pooja", tier: "standard" },
    { name: "Shani Pooja", tier: "standard" },
    { name: "Manasa Pooja", tier: "standard" },
    { name: "Shanti Pooja", tier: "standard" },
    { name: "Rakt Pushpanjali, Kutumb Pooja", tier: "standard" },
    { name: "Prashna Samadhan Pooja", tier: "standard" },

    { name: "Bhagyoday Pooja", tier: "premium" },
    { name: "DhanLakshmi Pooja", tier: "premium" },
    { name: "Kaal Dosh Nivaran Pooja", tier: "premium" },
    { name: "Santan Prapti Pooja", tier: "premium" },
    { name: "Uttam Var - Vadhu Prapti Pooja", tier: "premium" },
    { name: "Rudrabhishek Pooja", tier: "premium" }
  ],

  // ---- Daan (donation) guidance list — informational only, not bookable ----
  daanList: [
    { item: "Til (Sesame)", benefit: "Traditionally offered to ease Shani-related hardship and remove obstacles." },
    { item: "Tel (Oil)", benefit: "Associated with Shani; offered for relief from prolonged difficulties." },
    { item: "Ghee", benefit: "Linked to overall health, strength and general wellbeing." },
    { item: "Chaval / Anna (Rice, Grain)", benefit: "Connected to the Moon; supports peace of mind and family harmony." },
    { item: "Chana (Gram)", benefit: "Associated with Guru (Jupiter); linked to wisdom and steady wealth." },
    { item: "Urad", benefit: "Traditionally offered for protection from misfortune." },
    { item: "Fal (Fruits)", benefit: "Offered for general prosperity and growth." },
    { item: "Chandi (Silver)", benefit: "Connected to the Moon; supports emotional balance." },
    { item: "Sona (Gold)", benefit: "Associated with the Sun; linked to confidence and status." },
    { item: "Loha (Iron)", benefit: "Associated with Shani; offered for protection from accidents." },
    { item: "Dhan (Money)", benefit: "Offered for general prosperity and removal of financial blocks." },
    { item: "Navdhatoo (Nine Metals)", benefit: "Used for balancing the influence of all nine planets." },
    { item: "Deep (Lamp)", benefit: "Symbolic of removing darkness and confusion; brings clarity." },
    { item: "Dhoop (Incense)", benefit: "Used for purification of space and mind." },
    { item: "Gupt Daan (Anonymous Giving)", benefit: "Practiced with humility to reduce ego-related obstacles." },
    { item: "Bhoomi (Land)", benefit: "Linked to stability and resolving property matters." },
    { item: "Vriksh (Tree / Plant)", benefit: "Supports long-term prosperity and environmental harmony." },
    { item: "Naivedya (Offered Food)", benefit: "An expression of devotion and gratitude." },
    { item: "Satanja (Seven Grains)", benefit: "Associated with Shani; offered for relief from general life obstacles." },
    { item: "Vastra (Clothing)", benefit: "Offered in matters concerning dignity and self-respect." },
    { item: "Doodh (Milk)", benefit: "Connected to the Moon; supports emotional peace and health." },
    { item: "Gokarna", benefit: "Used in specific purification rituals as advised by the Pundit." },
    { item: "Ashwa (Horse, symbolic)", benefit: "Traditionally linked to status and swift progress." },
    { item: "Vrishabh (Bull, symbolic)", benefit: "Linked to strength and stability." },
    { item: "Gau Daan (Cow)", benefit: "Considered among the most auspicious forms of giving for overall punya." },
    { item: "Tailaan Daan (Oil Donation)", benefit: "Offered specifically for relief from Shani dosh." }
  ],

  disclaimer: "🕉️ Important Disclaimer: The spiritual guidance and ritual solutions provided by Pundit Vidyanand Shukla have brought clarity and peace to devotees across Bihar and India. Please note that these online consultations are indicative and based on immediate planetary queries. For comprehensive life charting and pinpoint accuracy, it is highly recommended to share a full, detailed family Kundali with Pundit Ji. The efficacy of all suggested remedies, mantras, and pujas depends entirely upon the client's internal belief, spiritual devotion, and their sincerity in putting these practices into action in daily life."
};
