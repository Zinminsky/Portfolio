// All site content lives here — edit this file to update text, projects and links.

export const profile = {
  name: "Zin Min Aung",
  roles: ["Web Developer", "UI/UX Designer", "Front-End Engineer", "PHP & CMS Specialist"],
  location: "Berlin, Germany",
  email: "kozin017@gmail.com",
  photo: "/images/Mr.Zin.jpg",
  github: "https://github.com/", // TODO: add your GitHub profile URL
  linkedin: "https://www.linkedin.com/", // TODO: add your LinkedIn profile URL
  cv: "/ZinMinAung_CV.pdf",
  intro:
    "I design and build useful, engaging web experiences — from the first wireframe to clean, maintainable PHP and JavaScript in production.",
  summary:
    "13+ years building and maintaining CMS-based websites and web applications for clients and public-sector enterprises in Singapore and Myanmar. I work comfortably on my own, from stakeholder requirements through implementation and long-term maintenance. Now based in Germany, studying for a Master's in Data Science, AI & Digital Business, and expanding into React, TypeScript and Shopware.",
};

export const stats = [
  { value: 13, suffix: "+", label: "Years building for the web" },
  { value: 3, suffix: "", label: "Countries worked across" },
  { value: 4, suffix: "", label: "CMS platforms in production" },
];

export type Project = {
  title: string;
  client: string;
  year: string;
  blurb: string;
  tags: string[];
  image?: string;
  link?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Zuper Mart",
    client: "Online grocery app",
    year: "UI/UX",
    blurb:
      "Product design for a grocery app built around fast, convenient everyday shopping — user research, flows and high-fidelity screens, developed alongside the design lead.",
    tags: ["Product Design", "UX Research", "Interaction Design"],
    image: "/images/case2.png",
    link: "/casestudy-zupermart", // case study page inside this site (see src/caseStudies.ts)
    accent: "#2aa198",
  },
  {
    title: "Housing & Development Board",
    client: "Government of Singapore",
    year: "2013–2016",
    blurb:
      "The largest project of my career: building and maintaining web interfaces in an enterprise environment, from content deployment and CMS work to debugging in production.",
    tags: ["Full-Stack", "PHP & MySQL", "Enterprise CMS"],
    // link: "/casestudy-hdb",  ← enable once this case study is added to src/caseStudies.ts
    accent: "#e07a5f",
  },
  {
    title: "Yeo's Singapore",
    client: "Beverage brand",
    year: "Brand sites",
    blurb:
      "Rich, interactive brand animations — first built in Flash, later migrated to HTML5 and CSS for performance, accessibility and long-term compatibility.",
    tags: ["Animation", "WordPress", "Front-End"],
    // link: "/casestudy-yeos",  ← enable once this case study is added to src/caseStudies.ts
    accent: "#f2cc8f",
  },
  {
    title: "ACE Living",
    client: "Home & lifestyle retail",
    year: "Website → e-commerce",
    blurb:
      "Started as a ten-page brand site and grew into a full online shop. Reworked structure and user flows to support product management and checkout.",
    tags: ["E-Commerce", "UI/UX", "Content Management"],
    link: "https://www.aceliving.com.sg/",
    accent: "#81b29a",
  },
  {
    title: "Okamura",
    client: "Japanese office furniture",
    year: "Design & build",
    blurb:
      "High-fidelity mockups and front-end development, working with stakeholders to reflect the brand's values of precision, quality and comfort.",
    tags: ["Front-End", "SEO", "Stakeholders"],
    link: "https://www.okamura.com/",
    accent: "#9d8df1",
  },
  {
    title: "CIVIC",
    client: "Singapore",
    year: "Design & build",
    blurb:
      "A clean, flat interface with a warm orange accent — minimal and calm, with enough personality to feel welcoming.",
    tags: ["Visual Design", "Front-End", "SEO"],
    link: "https://www.civic.com.sg/",
    accent: "#f4845f",
  },
];

export type Job = {
  role: string;
  company: string;
  place: string;
  period: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Web Developer",
    company: "M Learning Hub",
    place: "Myanmar · Hybrid",
    period: "2017 — 2025",
    points: [
      "Built front-end and back-end interfaces with PHP, HTML, CSS and JavaScript on WordPress and Joomla.",
      "Shipped through UAT environments before production release.",
      "Created reusable theme frameworks that set design standards for later projects.",
      "Used Google Analytics and Tag Manager to turn data into design and content improvements.",
    ],
  },
  {
    role: "Web Designer & Developer",
    company: "Housing & Development Board",
    place: "Singapore",
    period: "2013 — 2016",
    points: [
      "Designed and developed responsive sites from concept through front-end implementation.",
      "Built interfaces with HTML, CSS, JavaScript, PHP and MySQL with CMS integration.",
      "Taught myself Sitecore development when in-house expertise was scarce.",
    ],
  },
  {
    role: "Web Designer & Developer",
    company: "Bluebell People",
    place: "Singapore",
    period: "2009 — 2013",
    points: [
      "Turned client briefs into practical visual solutions and responsive layouts.",
      "Supported WordPress implementations and ongoing content management.",
    ],
  },
];

export const skills = [
  { group: "Front-End", items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive Design", "Motion"] },
  { group: "Back-End", items: ["PHP (OOP)", "MySQL", "REST APIs", "Symfony (learning)"] },
  { group: "CMS & Commerce", items: ["WordPress", "Joomla", "Sitecore", "Shopware 6 (learning)", "WooCommerce"] },
  { group: "Design", items: ["Figma", "Photoshop", "Wireframes", "Prototyping", "UX Research"] },
  { group: "Delivery", items: ["Git", "UAT / Release", "Google Analytics", "Tag Manager", "Stakeholder Work"] },
];

export const testimonials = [
  {
    quote:
      "Zin demonstrated remarkable initiative by taking it upon himself to learn Sitecore development. This adaptability proved invaluable to our team, as officers with expertise in this domain were rare.",
    name: "Soh Shi Qin",
    title: "Deputy Director",
  },
  {
    quote:
      "Zin contributed high-quality UI and graphic design work, combining creativity with teamwork to produce clear, user-focused visual solutions.",
    name: "Ms. Thandar",
    title: "Team Leader",
  },
  {
    quote:
      "Zin showed strong initiative in front-end development and worked collaboratively with the team, contributing reliable, high-quality UI solutions where expertise was limited.",
    name: "Edwin",
    title: "Project Manager",
  },
];
