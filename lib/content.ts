// Single source of truth for JoyFirst Interiors' real business content,
// extracted from joyfirst.in. Nothing here is invented.

export const company = {
  name: "Joy First Interiors",
  founder: "Arjun J",
  founded: 2020,
  mentor: "S.K. Peter, MD & CEO, Ocean Lifespaces India Pvt Ltd",
  city: "Chennai",
  registeredAddress:
    "#17, Shanthi Flats, C1, N.V. Street, Mylapore, Chennai-600004, Tamil Nadu, India",
  phones: ["78450 50502", "044 4860 4600"],
  whatsapp: "+917845050502",
  emails: ["arjun@joyfirst.in", "info@joyfirst.in"],
  socials: [
    { label: "Instagram", handle: "@joy_first_interiors", href: "https://instagram.com/joy_first_interiors" },
    { label: "LinkedIn", handle: "joyfirst-interiors", href: "https://linkedin.com/company/joyfirst-interiors" },
    { label: "Facebook", handle: "Joy First Interiors", href: "https://facebook.com/profile.php?id=61561210414421" },
    { label: "YouTube", handle: "Joy First Interiors", href: "https://youtube.com/channel/UC1o0gRcc6ujWlsWMCYTiwZg" },
    { label: "Threads", handle: "@joy_first_interiors", href: "https://threads.net/@joy_first_interiors" },
  ],
  certifications: ["ISO 9001:2015", "ISO 14001:2015", "ISO 45001:2018"],
  reach: [
    "Tamil Nadu",
    "Kerala",
    "Karnataka",
    "Telangana",
    "Maharashtra",
    "Gujarat",
    "Punjab",
  ],
} as const;

export const hero = {
  eyebrow: "Interior Fit-Out · Civil · MEP · PMC — Chennai, since 2020",
  headline: "Interior infrastructure, engineered end to end.",
  subcopy:
    "Joy First Interiors delivers one-stop, ISO-certified fit-out, civil, and technical services for commercial and residential spaces — from first drawing to final handover.",
  primaryCta: { label: "Start Your Project", href: "#contact" },
  secondaryCta: { label: "See Our Services", href: "#services" },
} as const;

export const about = {
  eyebrow: "Who We Are",
  heading: "Built on skill, quickness, workmanship, and punctuality.",
  mission:
    "Joy First Interiors aspires to be a leading provider of interior design and construction services, delivering high-quality turnkey solutions to every client.",
  vision:
    "We deliver world-class interior infrastructure across multiple design-build sectors — combining infrastructure, interiors, and maintenance under one roof, while adopting new technology and adapting to evolving client needs.",
  story:
    "Founded in 2020 by Arjun J, Joy First Interiors grew into a premier interior infrastructure provider within three years — shaped by the mentorship of S.K. Peter, MD & CEO of Ocean Lifespaces India Pvt Ltd, who instilled a foundation of ethics, moral values, and practical, on-site training.",
  values: ["Skill", "Quickness", "Workmanship", "Punctuality"],
} as const;

export type Service = {
  id: string;
  name: string;
  description: string;
  material: "glass" | "steel" | "airflow" | "conduit" | "beacon" | "lattice" | "blueprint";
};

export const services: Service[] = [
  {
    id: "fit-out",
    name: "Interior Fit-Out",
    description:
      "Turnkey fit-out that transforms raw shells into finished, functioning spaces — treated as a craft, not a checklist.",
    material: "glass",
  },
  {
    id: "civil-works",
    name: "Civil Works",
    description:
      "Comprehensive civil construction — structural, masonry, and finishing works built to hold the design's intent.",
    material: "steel",
  },
  {
    id: "hvac",
    name: "HVAC",
    description:
      "Full system design, engineering, installation, maintenance, and repair for climate control at any scale.",
    material: "airflow",
  },
  {
    id: "electrical",
    name: "Electrical",
    description:
      "Complete electrical services for interior projects, from load planning to final commissioning.",
    material: "conduit",
  },
  {
    id: "fas",
    name: "Fire Alarm Systems",
    description:
      "Fire detection and alarm systems engineered for compliance and real-world reliability.",
    material: "beacon",
  },
  {
    id: "networking",
    name: "Networking",
    description:
      "Professional structured cabling, network installation, and connectivity for modern workspaces.",
    material: "lattice",
  },
  {
    id: "pmc",
    name: "Project Management Consulting",
    description:
      "End-to-end project accountability — one team coordinating every trade, from drawing to handover.",
    material: "blueprint",
  },
];

export type ProcessPhase = {
  id: string;
  index: string;
  name: string;
  summary: string;
  responsibilities: string[];
};

export const process: ProcessPhase[] = [
  {
    id: "design",
    index: "01",
    name: "Design & Engineering",
    summary: "Every project starts on the drawing board, led by our design and engineering teams.",
    responsibilities: ["Initial planning", "Detailed specifications"],
  },
  {
    id: "pre-construction",
    index: "02",
    name: "Pre-Construction",
    summary: "Multiple departments coordinate before a single wall goes up.",
    responsibilities: [
      "Procurement by the purchase team",
      "Shop drawing approvals by the design team",
      "Site mobilization by HR",
      "Compliance & insurance by finance and admin",
      "Statutory requirements handled by dedicated personnel",
    ],
  },
  {
    id: "construction",
    index: "03",
    name: "Construction",
    summary: "Execution runs on parallel tracks, tightly supervised.",
    responsibilities: [
      "Scheduling by the planning team",
      "Execution by the project team",
      "Quality verification by QC",
      "Billing by quantity surveying",
      "HSE and cash-flow monitoring by finance",
      "Liaison maintained by the coordination team",
    ],
  },
  {
    id: "post-construction",
    index: "04",
    name: "Post-Construction",
    summary: "The final mile: proving the work, then handing it over.",
    responsibilities: [
      "Testing and commissioning",
      "Punch list completion",
      "As-built documentation",
      "Handover procedures",
      "Retention management",
    ],
  },
];

export type Project = {
  id: string;
  client: string;
  status: "Ongoing" | "Coming Soon";
  note: string;
};

export const projects: Project[] = [
  {
    id: "siemens",
    client: "Siemens",
    status: "Ongoing",
    note: "Interior fit-out and technical services engagement, currently in progress.",
  },
  {
    id: "rank-projects",
    client: "Rank Projects and Developers",
    status: "Ongoing",
    note: "Fit-out and civil works delivered in partnership with the developer's team.",
  },
  {
    id: "more",
    client: "More case studies",
    status: "Coming Soon",
    note: "Completed project documentation is being prepared for publication.",
  },
];

export const whyChooseUs = [
  {
    title: "ISO-Accredited",
    description: "Certified to ISO 9001:2015, 14001:2015, and 45001:2018 — quality, environment, and safety, formalized.",
  },
  {
    title: "One-Stop, Turnkey",
    description: "Fit-out, civil, HVAC, electrical, fire, networking, and PMC — under a single accountable team.",
  },
  {
    title: "Cross-Country Reach",
    description: "Active project management across seven states, from Tamil Nadu to Punjab.",
  },
  {
    title: "On-Time, On-Quality",
    description: "A track record built on skill, quickness, workmanship, and punctuality — not slogans.",
  },
] as const;

export type Testimonial = {
  name: string;
  affiliation: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "S.K. Peter",
    affiliation: "Ocean Lifespaces India Pvt Ltd",
    quote: "Timely completion and quality standards that held up under scrutiny, project after project.",
  },
  {
    name: "Adithyaram",
    affiliation: "Adithyaram Group",
    quote: "Professional execution, delivered within the timeframes we agreed on.",
  },
  {
    name: "Renny Rose",
    affiliation: "Core Plasto Enterprises",
    quote: "Real dedication — our office fit-out came together faster than we expected.",
  },
  {
    name: "Karthikeyan Balraj",
    affiliation: "Siemens Gamaza",
    quote: "A clear passion for meeting quality standards, visible in every detail.",
  },
  {
    name: "Megha Iyer",
    affiliation: "Client",
    quote: "The finest craftsmanship, backed by genuinely exceptional service.",
  },
  {
    name: "Peter",
    affiliation: "Hyderabad",
    quote: "A professional crew that was responsive from day one to handover.",
  },
  {
    name: "Samuel Johnson",
    affiliation: "Mumbai",
    quote: "Exceptional skill paired with real budget-conscious problem solving.",
  },
];

export const nav = [
  { label: "Who We Are", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
] as const;
