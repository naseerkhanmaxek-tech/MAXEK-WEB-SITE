// src/lib/site.js
/**
 * MAXEK India Private Limited — canonical site content.
 * All copy here is taken from the client Content Guide / PRD.
 */

export const COMPANY = {
  legalName: "MAXEK India Private Limited",
  shortName: "MAXEK",
  tagline: "Integrated Engineering Group",
  summary:
    "MAXEK India Private Limited is an Integrated Engineering Group delivering engineering execution, digital transformation, and business growth solutions through specialized business verticals.",
  address: {
    line1: "15/3608, 3rd Floor",
    line2: "Singapore Plaza",
    line3: "Pattom Palace",
    city: "Thiruvananthapuram",
    state: "Kerala",
    postalCode: "695004",
    country: "India",
  },
  phone: "+91 9666822000",
  phoneHref: "tel:+919666822000",
  whatsappHref:
    "https://wa.me/919666822000?text=Hello%20MAXEK%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",
  businessEmail: "info@maxekindia.com",
  hrEmail: "hr@maxekindia.com",
  geo: { lat: 8.5241, lng: 76.9366 },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/maxekindia", icon: "Linkedin" },
    { label: "X", href: "https://x.com/maxekindia", icon: "Twitter" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61586026727151", icon: "Facebook" },
    { label: "Instagram", href: "https://www.instagram.com/maxekindia/", icon: "Instagram" },
    { label: "WhatsApp", href: "https://wa.me/919666822000", icon: "WhatsApp" },
    { label: "YouTube", href: "https://www.youtube.com/@maxekindia", icon: "Youtube" },
  ],
};

export const ADDRESS_LINES = [
  COMPANY.legalName,
  COMPANY.address.line1,
  COMPANY.address.line2,
  COMPANY.address.line3,
  COMPANY.address.city,
  `${COMPANY.address.state} – ${COMPANY.address.postalCode}`,
  COMPANY.address.country,
];

/**
 * NOTE ON THE OFFICIAL LOGO FILENAMES
 * The supplied assets follow the "for dark / for light background" convention:
 *   maxek-logo-dark.png  -> the WHITE wordmark, intended FOR dark backgrounds
 *   maxek-logo-light.png -> the DARK wordmark, intended FOR light backgrounds
 * The official files themselves are used exactly as supplied, never modified.
 */
export const LOGOS = {
  // Light-coloured wordmark: transparent header over the hero video + dark footer
  light: "/assets/logos/maxek-logo-dark.png",
  // Dark-coloured wordmark: white scrolled header + mobile menu
  dark: "/assets/logos/maxek-logo-light.png",
};

/* ------------------------------------------------------------------ */
/* Business verticals                                                  */
/* ------------------------------------------------------------------ */
export const VERTICALS = [
  {
    slug: "maxek-infra",
    name: "MAXEK INFRA",
    subtitle: "Engineering & Industrial Execution",
    description:
      "Delivering industrial construction, civil engineering, structural engineering, steel fabrication, plant construction, factory infrastructure, engineering support, and project management services.",
    cta: "Explore MAXEK INFRA",
    items: [
      "Industrial Construction",
      "Civil Engineering",
      "Structural Engineering",
      "Steel Fabrication",
      "Plant Construction",
      "Factory Infrastructure",
      "Engineering Support",
      "Project Management",
    ],
  },
  {
    slug: "maxek-solutions",
    name: "MAXEK TECHNOLOGIES",
    subtitle: "Technology & Digital Engineering",
    description:
      "Providing ERP solutions, SmartQTO, AI solutions, cloud technologies, automation, project monitoring, digital engineering, and business intelligence.",
    cta: "Explore MAXEK TECHNOLOGIES",
    items: [
      "ERP",
      "SmartQTO",
      "AI Solutions",
      "Business Automation",
      "Digital Engineering",
      "Cloud Solutions",
      "Project Monitoring",
      "Data Analytics",
    ],
  },
  {
    slug: "maxek-business-hub",
    name: "MAXEK BUSINESS HUB",
    subtitle: "Business Growth Ecosystem",
    description:
      "Supporting organizations with branding, digital transformation, recruitment, automation, strategic growth, and corporate learning through MAXEK EDU.",
    cta: "Explore MAXEK BUSINESS HUB",
    items: [
      "Brand Solutions",
      "Growth Solutions",
      "People Solutions",
      "Technology Solutions",
      "MAXEK EDU",
    ],
  },
];

export const VERTICAL_OPTIONS = VERTICALS.map((v) => v.name);

/* Business Hub — four pillars (exact offerings from the PRD) */
export const BUSINESS_PILLARS = [
  {
    id: "brand",
    name: "Brand Solutions",
    icon: "Gem",
    intent: "Define how the market understands and remembers your organisation.",
    offerings: [
      {
        name: "Brand Launch™",
        description:
          "Positioning, identity and messaging for organisations entering a new market or category.",
      },
      {
        name: "Brand Revamp™",
        description:
          "Repositioning and identity renewal for established organisations that have outgrown their current brand.",
      },
    ],
  },
  {
    id: "growth",
    name: "Growth Solutions",
    icon: "TrendingUp",
    intent: "Build repeatable demand, conversion and market share.",
    offerings: [
      {
        name: "Lead Engine™",
        description:
          "A structured acquisition channel that replaces referral dependence with a predictable enquiry pipeline.",
      },
      {
        name: "Sales Engine™",
        description:
          "Qualification, pipeline discipline and conversion process built around how your buyers actually decide.",
      },
      {
        name: "Market Dominance™",
        description:
          "Category leadership programme combining positioning, presence and proof to win contested markets.",
      },
      {
        name: "Growth Accelerator™",
        description:
          "A focused engagement that removes the specific constraint currently limiting your growth rate.",
      },
    ],
  },
  {
    id: "people",
    name: "People Solutions",
    icon: "Users",
    intent: "Attract the talent you need and build the capability you keep.",
    offerings: [
      {
        name: "Recruitment Partner™",
        description:
          "Competency-mapped technical and corporate hiring with structured, scored evaluation.",
      },
      {
        name: "People Excellence™",
        description:
          "Onboarding, capability development and retention frameworks that compound internal capability.",
      },
    ],
  },
  {
    id: "technology",
    name: "Technology Solutions",
    icon: "Cpu",
    intent: "Systemise operations, then automate and measure them.",
    offerings: [
      {
        name: "Digital Transformation™",
        description:
          "End-to-end modernisation of how work is planned, executed and recorded across the organisation.",
      },
      {
        name: "Business Systems™",
        description:
          "Documented, governed operating processes that scale without multiplying inconsistency.",
      },
      {
        name: "Business Automation™",
        description:
          "Automation applied to high-volume administrative workflows to release skilled capacity.",
      },
      {
        name: "Business Intelligence™",
        description:
          "A reporting layer that turns operational data into decisions leadership can act on.",
      },
    ],
  },
];

export const MAXEK_EDU = [
  {
    name: "AI Learning",
    icon: "BrainCircuit",
    description: "Applied AI literacy for engineering, operations and commercial teams.",
  },
  {
    name: "Business Courses",
    icon: "BookOpen",
    description: "Structured business fundamentals for technical professionals moving into leadership.",
  },
  {
    name: "Corporate Training",
    icon: "Presentation",
    description: "Role-specific programmes designed around your operating model and delivery calendar.",
  },
  {
    name: "Workshops",
    icon: "Users",
    description: "Focused instructor-led sessions that fit around live project commitments.",
  },
  {
    name: "Certification Programs",
    icon: "Award",
    description: "Assessed certification that evidences capability objectively for role progression.",
  },
];

/* ------------------------------------------------------------------ */
/* Why MAXEK                                                           */
/* ------------------------------------------------------------------ */
export const WHY_MAXEK = [
  {
    title: "Engineering Expertise",
    icon: "Ruler",
    description:
      "Delivering technically sound engineering solutions with precision and reliability.",
  },
  {
    title: "Integrated Solutions",
    icon: "Layers",
    description:
      "Combining engineering, technology, and business services under one organization.",
  },
  {
    title: "Innovation Driven",
    icon: "Lightbulb",
    description:
      "Leveraging digital transformation and emerging technologies to create long-term value.",
  },
  {
    title: "Quality & Safety",
    icon: "ShieldCheck",
    description:
      "Committed to quality standards, operational excellence, and safe project execution.",
  },
  {
    title: "Scalable Growth",
    icon: "TrendingUp",
    description: "Building solutions that support future business expansion.",
  },
  {
    title: "Trusted Partnership",
    icon: "Handshake",
    description: "Working collaboratively to achieve measurable business success.",
  },
];

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */
export const INDUSTRIES = [
  {
    name: "Manufacturing",
    icon: "Factory",
    description:
      "Plant infrastructure, capacity expansion and digital operations for discrete and process manufacturers.",
  },
  {
    name: "Infrastructure",
    icon: "Building2",
    description:
      "Structures, external works and utility corridors delivered across multi-front development programmes.",
  },
  {
    name: "Industrial",
    icon: "Cog",
    description:
      "Heavy fabrication facilities, crane systems and industrial buildings engineered for continuous duty.",
  },
  {
    name: "Commercial",
    icon: "Store",
    description:
      "Commercial and mixed-use developments delivered to cycle-driven programmes on constrained sites.",
  },
  {
    name: "Energy",
    icon: "Zap",
    description:
      "Balance-of-plant civils, structural packages and monitoring systems for energy infrastructure.",
  },
  {
    name: "Technology",
    icon: "Cpu",
    description:
      "Digital engineering, integration and applied AI for technology-led operations and facilities.",
  },
  {
    name: "Healthcare",
    icon: "HeartPulse",
    description:
      "Compliance-sensitive facility works and operational systems for healthcare providers.",
  },
  {
    name: "Education",
    icon: "GraduationCap",
    description:
      "Campus infrastructure alongside corporate learning and certification through MAXEK EDU.",
  },
  {
    name: "Government",
    icon: "Landmark",
    description:
      "Public infrastructure execution with documented governance, audit trails and compliance reporting.",
  },
  {
    name: "Logistics",
    icon: "Truck",
    description:
      "Warehousing, material handling infrastructure and digital visibility across logistics operations.",
  },
  {
    name: "Real Estate",
    icon: "Building",
    description:
      "Residential and mixed-use property development delivered with engineering-led execution discipline.",
  },
  {
    name: "Automotive",
    icon: "Car",
    description:
      "Manufacturing facilities, assembly infrastructure and digital systems for automotive operations.",
  },
];

/* ------------------------------------------------------------------ */
/* Engineering approach                                                */
/* ------------------------------------------------------------------ */
export const APPROACH_STEPS = [
  {
    name: "Understand",
    icon: "Search",
    description:
      "We start with your operational reality — constraints, dependencies and the outcome that actually matters.",
  },
  {
    name: "Analyze",
    icon: "BarChart3",
    description:
      "Technical and commercial analysis establishes what is feasible, what is optimal and what carries risk.",
  },
  {
    name: "Design",
    icon: "PenTool",
    description:
      "Engineering design and planning resolve interfaces and sequencing before any commitment is made.",
  },
  {
    name: "Execute",
    icon: "HardHat",
    description:
      "Disciplined execution against programme, cost and quality, with safety governing every decision.",
  },
  {
    name: "Optimize",
    icon: "Gauge",
    description:
      "Measured performance drives refinement — in the build, in the process and in the systems around it.",
  },
  {
    name: "Support",
    icon: "LifeBuoy",
    description:
      "Continued engineering and technical support well beyond handover, as a long-term partner.",
  },
];

/* ------------------------------------------------------------------ */
/* About page content                                                  */
/* ------------------------------------------------------------------ */
export const CORE_VALUES = [
  {
    name: "Engineering Integrity",
    icon: "Ruler",
    description:
      "Technical decisions are made on evidence and sound engineering judgement — never on convenience.",
  },
  {
    name: "Accountability",
    icon: "CheckCircle2",
    description:
      "We own outcomes, not activity. Commitments made to a client are commitments held internally.",
  },
  {
    name: "Safety First",
    icon: "ShieldCheck",
    description:
      "No programme, cost or commercial pressure justifies compromising the safety of anyone on our sites.",
  },
  {
    name: "Innovation with Purpose",
    icon: "Lightbulb",
    description:
      "We adopt technology where it demonstrably improves an outcome, not because it is available.",
  },
  {
    name: "Client Partnership",
    icon: "Handshake",
    description:
      "We work as an extension of our clients' teams, with transparency on progress, risk and cost.",
  },
  {
    name: "Continuous Improvement",
    icon: "Repeat",
    description:
      "Every project ends with a structured review, and the lessons shape how the next one is delivered.",
  },
];

export const CORPORATE_PROFILE = [
  { label: "Legal entity", value: "MAXEK India Private Limited" },
  { label: "Organisation type", value: "Integrated Engineering Group" },
  { label: "Registered office", value: "Thiruvananthapuram, Kerala, India" },
  { label: "Business verticals", value: "MAXEK INFRA · MAXEK TECHNOLOGIES · MAXEK BUSINESS HUB" },
  { label: "Learning division", value: "MAXEK EDU" },
  { label: "Industries served", value: "12 industry sectors" },
  { label: "Operating footprint", value: "India, with internationally scalable delivery" },
  { label: "Business enquiries", value: COMPANY.businessEmail },
];

export const QUALITY_COMMITMENTS = [
  {
    title: "Documented quality management",
    icon: "FileCheck",
    description:
      "Inspection and test plans, hold points and traceable records are defined before work begins, not reconstructed afterwards.",
  },
  {
    title: "Safety governance",
    icon: "HardHat",
    description:
      "Method statements, risk assessments, toolbox briefings and incident reporting are enforced on every active front.",
  },
  {
    title: "Standards and codes",
    icon: "BookMarked",
    description:
      "Design and execution follow applicable Indian Standards and client specifications, with independent verification where required.",
  },
  {
    title: "Material traceability",
    icon: "ScanLine",
    description:
      "Mill certificates, batch records and test results are retained from procurement through to installed asset.",
  },
  {
    title: "Independent testing",
    icon: "FlaskConical",
    description:
      "Third-party testing and survey verification are used at defined control points rather than only on challenge.",
  },
  {
    title: "Handover assurance",
    icon: "ClipboardCheck",
    description:
      "As-built records, asset data and compliance documentation are issued as a structured handover package.",
  },
];

export const LEADERSHIP = [
  {
    role: "Managing Director",
    focus: "Group strategy, governance and client partnerships",
  },
  {
    role: "Director — Engineering & Execution",
    focus: "MAXEK INFRA delivery, engineering standards and site safety",
  },
  {
    role: "Director — Technology",
    focus: "MAXEK TECHNOLOGIES platforms, digital engineering and applied AI",
  },
  {
    role: "Director — Business Growth",
    focus: "MAXEK BUSINESS HUB, MAXEK EDU and client growth programmes",
  },
];

export const GLOBAL_CAPABILITIES = [
  {
    title: "Local execution strength",
    icon: "MapPin",
    description:
      "Deep delivery capability in Kerala and across India, with established supply chain and workforce networks.",
  },
  {
    title: "Remote engineering delivery",
    icon: "Globe2",
    description:
      "Design, digital engineering and monitoring services delivered to clients regardless of their location.",
  },
  {
    title: "Scalable technology platforms",
    icon: "Cloud",
    description:
      "Cloud-native solutions that extend across sites, business units and geographies without re-platforming.",
  },
  {
    title: "International standards",
    icon: "BadgeCheck",
    description:
      "Documentation, governance and reporting practices structured to meet international client expectations.",
  },
];

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */
export const CAREER_BENEFITS = [
  { title: "Health & accident cover", icon: "HeartPulse", description: "Medical and personal accident insurance for employees and dependants." },
  { title: "Structured progression", icon: "TrendingUp", description: "Defined competency levels with transparent criteria for advancement." },
  { title: "MAXEK EDU access", icon: "GraduationCap", description: "Certification programmes, AI learning and corporate training at no cost." },
  { title: "Site & project exposure", icon: "HardHat", description: "Real responsibility on live projects, mentored by senior engineers." },
  { title: "Flexible & hybrid working", icon: "Laptop", description: "Hybrid and remote arrangements for roles where delivery allows it." },
  { title: "Recognition", icon: "Award", description: "Performance and safety recognition tied to measurable contribution." },
];

export const LIFE_AT_MAXEK = [
  {
    title: "Engineering-led culture",
    description:
      "Technical arguments are settled with evidence. Seniority helps you make the case — it does not replace it.",
  },
  {
    title: "Cross-vertical exposure",
    description:
      "Engineers work alongside technology and business teams, so you see how a project performs commercially, not just technically.",
  },
  {
    title: "Real responsibility early",
    description:
      "Capable people are given ownership quickly, with senior support available rather than imposed.",
  },
  {
    title: "Safety as a shared standard",
    description:
      "Anyone, at any level, is expected to stop unsafe work. That expectation is genuinely protected.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */
export const FAQS = {
  "maxek-infra": [
    {
      q: "What types of projects does MAXEK INFRA deliver?",
      a: "Industrial construction, plant construction, factory infrastructure, civil and structural engineering works, steel fabrication packages and commercial structures — delivered either as a full execution package or as an engineering and project management service.",
    },
    {
      q: "Do you provide design as well as execution?",
      a: "Yes. We provide structural and civil design coordination alongside execution, which allows constructability and value engineering decisions to be made before commitments are locked in.",
    },
    {
      q: "How do you manage programme risk on industrial projects?",
      a: "We fix interface points early, move weather-sensitive activity off the critical path through off-site fabrication, sequence work into independent zones for concurrent working, and run a single interface review with every contractor against a shared look-ahead.",
    },
    {
      q: "What is your approach to site safety?",
      a: "Method statements and risk assessments are approved before work starts, toolbox briefings are held daily, and any person at any level is expected to stop unsafe work. Safety performance is reported alongside programme and cost.",
    },
    {
      q: "Which regions do you operate in?",
      a: "We are headquartered in Thiruvananthapuram, Kerala and execute projects across India. Engineering and project management services can be delivered to clients beyond that footprint.",
    },
    {
      q: "Can you work as a subcontractor to an EPC contractor?",
      a: "Yes. We regularly deliver defined structural, civil or fabrication packages within a larger EPC scope, integrating with the main contractor's programme and quality regime.",
    },
  ],
  "maxek-solutions": [
    {
      q: "Which ERP platforms do you implement?",
      a: "We are platform-pragmatic. We assess your process requirements, scale and budget before recommending a platform, and we implement configuration, data migration, training and support around it.",
    },
    {
      q: "What is SmartQTO?",
      a: "SmartQTO is our quantity take-off and estimation solution. It standardises take-off templates, maintains a governed rate library and adds version control with approval gates, so tender pricing becomes consistent and auditable across estimators.",
    },
    {
      q: "How long does an ERP implementation take?",
      a: "It depends on scope and data condition. We phase implementations so that the highest-value modules go live first, and we always complete master data cleansing before configuration — which is the single biggest determinant of timeline.",
    },
    {
      q: "Where does AI genuinely add value in our operations?",
      a: "Typically in early-warning detection on project variance, quality event classification, demand and consumption forecasting, and interrogating large document or drawing sets. All of it depends on consistent, structured operational data being captured first.",
    },
    {
      q: "Can you integrate with our existing systems?",
      a: "Yes. We build integration layers between shop-floor equipment, business systems and reporting platforms, using an abstraction approach so mixed-vintage machinery maps to one common data model.",
    },
    {
      q: "Do you provide support after go-live?",
      a: "Yes. Post go-live support, enhancement and platform operations are part of how we work — an implementation that is bypassed after handover has delivered nothing.",
    },
  ],
  "maxek-business-hub": [
    {
      q: "What is MAXEK BUSINESS HUB?",
      a: "It is a business growth ecosystem. Rather than isolated consulting engagements, it brings brand, growth, people and technology solutions together so that positioning, demand, capability and systems reinforce each other.",
    },
    {
      q: "Do we have to engage all four pillars?",
      a: "No. Each solution can be engaged individually. In practice, growth constraints are rarely isolated, so we usually recommend pairing solutions — for example Brand Launch™ with Lead Engine™.",
    },
    {
      q: "What size of organisation do you work with?",
      a: "From SMEs establishing structure for the first time through to large enterprises standardising across branches and business units.",
    },
    {
      q: "What is MAXEK EDU?",
      a: "MAXEK EDU is our corporate learning division, delivering AI Learning, Business Courses, Corporate Training, Workshops and Certification Programs designed around your operating model and delivery calendar.",
    },
    {
      q: "How is progress measured?",
      a: "Every engagement defines its measures at the outset — qualified enquiries, time to fill roles, process cycle time, administrative hours released — and reports against them on an agreed cadence.",
    },
    {
      q: "How quickly can an engagement start?",
      a: "Following an initial discussion and scoping, most engagements can mobilise within a few weeks. Submit a business enquiry and our team will contact you to arrange the scoping conversation.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export const NAV_LINKS = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about" },
  {
    label: "Business Verticals",
    to: "/verticals",
    children: VERTICALS.map((v) => ({
      label: v.name,
      to: `/verticals/${v.slug}`,
      slug: v.slug,
    })),
  },
  {
    label: "Projects",
    to: "/projects",
    children: [
      { label: "All Projects", to: "/projects", slug: "all-projects" },
      ...VERTICALS.map((v) => ({ label: v.name, to: `/projects#${v.slug}`, slug: v.slug })),
    ],
  },
  { label: "Industries", to: "/industries" },
  { label: "Knowledge Center", to: "/knowledge-center" },
  { label: "Careers", to: "/careers" },
];

export const SERVICE_OPTIONS = [
  ...VERTICALS[0].items,
  ...VERTICALS[1].items,
  "Brand Solutions",
  "Growth Solutions",
  "People Solutions",
  "Technology Solutions",
  "MAXEK EDU / Corporate Training",
  "Other",
];

export const ARTICLE_CATEGORIES = [
  "All",
  "Articles",
  "Industry Insights",
  "Case Studies",
  "Technology Updates",
  "Downloads",
  "Media",
];

export const SUCCESS_MESSAGE =
  "Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly.";
export const ERROR_MESSAGE =
  "Something went wrong. Please try again or contact us directly.";
