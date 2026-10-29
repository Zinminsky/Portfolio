// Case study content. Each case study gets its own page at /<slug>.
// To add another one (e.g. HDB, Yeo's), copy the Zuper Mart object and change the content.

export type Block =
  | { type: "text"; heading?: string; paragraphs: string[] }
  | { type: "list"; heading?: string; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string; narrow?: boolean }
  | { type: "personas"; heading?: string; items: { name: string; description: string; needs: string }[] }
  | { type: "painSolution"; items: { persona: string; pains: string[]; solutions: string[] }[] };

export type Stage = {
  id: string;
  label: string; // short name for the side navigation
  title: string;
  blocks: Block[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  summary: string;
  logo?: string;
  cover: string;
  coverAlt: string;
  accent: string;
  overview: { label: string; value: string }[];
  stages: Stage[];
  gallery?: { heading: string; images: { src: string; alt: string }[] };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "casestudy-zupermart",
    title: "Zuper Mart",
    subtitle: "Online grocery store · UI/UX journey",
    location: "Based in Myanmar",
    summary:
      "Designing a grocery app that makes everyday shopping fast, transparent and trustworthy — and makes local products easier to find.",
    logo: "/images/2.png",
    cover: "/images/case2.png",
    coverAlt: "Zuper Mart app screens shown on mobile devices",
    accent: "#2aa198",
    overview: [
      { label: "Role", value: "Product Designer & UI/UX Designer" },
      { label: "Timeline", value: "3 months" },
      { label: "Tools", value: "Figma, Adobe Photoshop" },
      { label: "Development", value: "HTML, CSS, JavaScript" },
      { label: "Process", value: "Empathize · Define · Ideate · Prototype · Test" },
    ],
    stages: [
      {
        id: "empathize",
        label: "Empathize",
        title: "Exploring the user's needs",
        blocks: [
          {
            type: "text",
            heading: "Research approach",
            paragraphs: [
              "To understand the challenges and expectations of people shopping at local grocery stores, I ran qualitative research through one-on-one customer conversations. This let me observe real behaviour and understand how shoppers make decisions during their grocery purchases.",
            ],
          },
          {
            type: "list",
            heading: "Research objectives",
            items: [
              "Understand common shopping habits and decision-making in local grocery environments.",
              "Discover obstacles, frustrations and unmet expectations — from product selection to checkout.",
            ],
          },
          {
            type: "image",
            src: "/images/customer-review.png",
            alt: "Summary of customer interview feedback",
            narrow: true,
          },
          {
            type: "personas",
            heading: "Customer interview insights",
            items: [
              {
                name: "Convenience-focused shopper",
                description:
                  "Values speed and simplicity. Relies on search and repeat purchases to find familiar items quickly, and wants clear categories, previous orders and a fast checkout. Main frustration: too many screens for a basic purchase.",
                needs: "Quick search, saved items, and a smooth, minimal checkout flow.",
              },
              {
                name: "Price-sensitive shopper",
                description:
                  "Compares prices and looks for promotions before buying. Wants clear pricing, discounts and transparent product information to stay within budget.",
                needs: "Visible promotions, price comparison tools and budget-friendly recommendations.",
              },
              {
                name: "Quality & trust-driven shopper",
                description:
                  "Focuses on quality and reliability, especially for fresh or unfamiliar items. Looks for reviews, real product photos and detailed descriptions before deciding.",
                needs: "Customer reviews, clear product details, freshness indicators and reliable delivery information.",
              },
            ],
          },
          {
            type: "text",
            heading: "Key takeaway",
            paragraphs: [
              "Participants consistently highlighted convenience, transparency and trust. Beyond speed, they want clear, reliable information that makes them confident about quality and price.",
              "The research also revealed a strong opportunity for local products: customers were interested in locally sourced items when they were easy to find, clearly labelled and competitively priced. Better visibility, origin and freshness information, and fairer pricing through partnerships with local suppliers would serve customers and local businesses alike.",
            ],
          },
        ],
      },
      {
        id: "define",
        label: "Define",
        title: "Pain points & solutions",
        blocks: [
          {
            type: "painSolution",
            items: [
              {
                persona: "Convenience-focused shopper",
                pains: [
                  "Too many steps to complete a purchase",
                  "Hard to find frequently bought items",
                  "Time wasted on unnecessary screens",
                ],
                solutions: [
                  "Smart search with auto-suggestions",
                  "“Buy again” and saved items",
                  "Shorter checkout with a progress indicator",
                ],
              },
              {
                persona: "Price-sensitive shopper",
                pains: [
                  "Hard to identify the best deals",
                  "Unclear pricing and unit costs",
                  "Time-consuming price comparison",
                ],
                solutions: [
                  "Promotions highlighted on product cards",
                  "Unit prices and savings shown clearly",
                  "Price comparison and filter-by-price",
                ],
              },
              {
                persona: "Quality & trust-driven shopper",
                pains: [
                  "Uncertainty about freshness and quality",
                  "Too little information about new items",
                  "No trust without reviews or real photos",
                ],
                solutions: [
                  "Ratings, reviews and real product photos",
                  "Freshness indicators and expiry information",
                  "Clear delivery times and quality guarantees",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ideate",
        label: "Ideate",
        title: "Framework & site map",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "I translated the research insights into a sitemap and user flow. These organised the content logically, defined the key features and made sure the app's structure matched the shopping behaviour found in the research.",
              "Mapping the user flow helped me reduce friction at every step — from product discovery to checkout — and spot potential pain points early, before any visual design.",
            ],
          },
          {
            type: "image",
            src: "/images/zuper-mart-user-workflow.png",
            alt: "Zuper Mart user flow from browsing to checkout",
            caption: "User flow",
          },
          {
            type: "image",
            src: "/images/zuper-mart-sitemap.png",
            alt: "Zuper Mart app site map",
            caption: "Site map",
          },
        ],
      },
      {
        id: "prototype",
        label: "Prototype",
        title: "Wireframes & visual identity",
        blocks: [
          {
            type: "text",
            heading: "Wireframes",
            paragraphs: [
              "I analysed existing grocery and retail apps such as City Mart and K-Mart to align the experience with patterns grocery customers already know.",
              "Some brainstorming ideas changed once they became low-fidelity wireframes. I validated those changes through usability tests at each stage, then explained my original reasoning to participants to get deeper feedback.",
            ],
          },
          {
            type: "image",
            src: "/images/zuper-mart-wireframe.png",
            alt: "Low-fidelity wireframes of the Zuper Mart app",
            caption: "Low-fidelity wireframes",
          },
          {
            type: "text",
            heading: "Branding & colour",
            paragraphs: [
              "The client trusted my judgement on the colour direction. For a grocery app I recommended shades of green: they signal freshness, health and sustainability, and create a calm, trustworthy feel while browsing and buying.",
              "This choice shaped the whole design system — interface, branding elements and visual hierarchy.",
            ],
          },
          {
            type: "image",
            src: "/images/zuper-mart-colorskin.png",
            alt: "Zuper Mart colour palette in shades of green",
            caption: "Colour palette",
            narrow: true,
          },
        ],
      },
      {
        id: "test",
        label: "Test",
        title: "Testing & final design",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Zuper Mart helps users manage past purchases and shopping routines while discovering personalised recommendations and services.",
              "Low-fidelity testing showed that a blog-style information layout felt overwhelming. In the high-fidelity prototype I replaced it with preview-based graphic panels, so users can scan quickly and open details only when something interests them.",
            ],
          },
        ],
      },
    ],
    gallery: {
      heading: "Final screens",
      images: Array.from({ length: 9 }, (_, i) => ({
        src: `/images/final${i + 1}.png`,
        alt: `Zuper Mart final app screen ${i + 1} of 9`,
      })),
    },
  },
];

export function findCaseStudy(pathname: string): CaseStudy | undefined {
  // Accepts /casestudy-zupermart, /casestudy-zupermart/ and the old /casestudy-zupermart.html
  const slug = pathname.replace(/^\/+|\/+$/g, "").replace(/\.html$/, "");
  return caseStudies.find((c) => c.slug === slug);
}
