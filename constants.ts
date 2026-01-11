import React from 'react';
import { Target, Users, TrendingUp, Sparkles } from 'lucide-react';

export const EXPERTISE_CARDS = [
  {
    icon: React.createElement(Target, { className: "w-8 h-8" }),
    title: "Brand Strategy",
    desc: "Developing long-term roadmaps that align organizational values with market opportunities.",
    bestieInsight: "Ritu's secret? She looks at the 'why' before the 'what'. It's about heart, not just charts."
  },
  {
    icon: React.createElement(Users, { className: "w-8 h-8" }),
    title: "Partnership Growth",
    desc: "Nurturing stakeholder relationships to drive collaborative success and mutual value.",
    bestieInsight: "She turns stakeholders into cheerleaders. A proper cup of tea works wonders here!"
  },
  {
    icon: React.createElement(TrendingUp, { className: "w-8 h-8" }),
    title: "Performance Marketing",
    desc: "Using data-driven insights to measure engagement and optimize brand propositions.",
    bestieInsight: "Data tells the story; Ritu just helps translate it into human-speak. Simple, really."
  },
  {
    icon: React.createElement(Sparkles, { className: "w-8 h-8" }),
    title: "Omnichannel CX",
    desc: "Creating seamless customer journeys across digital and physical touchpoints.",
    bestieInsight: "Whether it's an app or an aisle, she makes sure the 'hello' feels exactly the same."
  }
];

export const STATS_DATA = [
  {
    label: "Campaign Engagement",
    value: 85,
    suffix: "%",
    subtext: "Lift in retention",
    insight: "We didn't just get clicks; we built a community that actually stuck around.",
    color: "#C5A059"
  },
  {
    label: "Budget Efficiency",
    value: 42,
    suffix: "%",
    subtext: "Reduction in CPA",
    insight: "Optimizing the £13.5M spend wasn't just about saving money—it was about making it work harder.",
    color: "#FFFFFF"
  },
  {
    label: "Omnichannel Reach",
    value: 12,
    suffix: "M+",
    subtext: "Annual active users",
    insight: "Scale is impressive, but consistency across all 12 million touchpoints is the real win.",
    color: "#C5A059"
  },
  {
    label: "Team Satisfaction",
    value: 94,
    suffix: "%",
    subtext: "Positive sentiment",
    insight: "Happy people make better brand ambassadors. Internal culture is the first campaign.",
    color: "#FFFFFF"
  }
];

export const EXPERIENCES = [
  {
    period: "Nov 2022 — Oct 2025",
    role: "Performance Marketing Lead",
    company: "Aldi UK",
    color: "#00285e",
    description: "Led the development and delivery of multi-channel engagement strategies that strengthened emotional connection, loyalty and advocacy across large, diverse audiences — directly aligned to retention and experience objectives.",
    highlights: [
      "Led end-to-end development of integrated campaign concepts and brand-led initiatives, collaborating with brand, commercial and creative teams.",
      "Partnered with internal stakeholders and agency teams to create bespoke ideas and creative proposals.",
      "Analysed CRM, PPC and SEO performance data to identify trends and optimize targeting.",
      "Built and maintained reporting dashboards to track campaign performance, retention and customer behaviour.",
      "Used first-party data and segmentation to inform targeting, incentives and personalised communications.",
      "Translated complex performance data into clear insights and recommendations for senior stakeholders.",
      "Ensured data accuracy across CRM and analytics platforms, resolving inconsistencies."
    ]
  },
  {
    period: "Nov 2018 — Sep 2022",
    role: "Senior Digital Marketing Manager",
    company: "Eaglemoss Publishing Ltd",
    color: "#e20613",
    description: "Delivered brand-led partnerships and themed campaign activations for major entertainment franchises (Marvel, DC, Sony), managing multi-channel creative execution and audience engagement.",
    highlights: [
      "Managed a large base of loyalty subscribers across multiple franchises, monitoring engagement and churn risk.",
      "Analysed subscriber data to understand retention patterns and inform customer journey improvements.",
      "Reported on subscription performance, incentive uptake and campaign impact to guide marketing decisions.",
      "Used customer behaviour data to refine messaging and increase lifetime value (LTV).",
      "Used performance dashboards and consumer insight to optimize campaign direction."
    ]
  },
  {
    period: "Mar 2018 — Oct 2018",
    role: "Ecommerce Project Manager",
    company: "Philip Morris International",
    color: "#003b6e",
    description: "Delivered customer and stakeholder-focused digital initiatives within a highly regulated, complex organisation.",
    highlights: [
      "Optimised ecommerce workflows and project delivery standards.",
      "Bridged the gap between technical requirements and brand objectives."
    ]
  },
  {
    period: "Mar 2015 — Feb 2018",
    role: "Digital Marketing Assistant",
    company: "Unipart Group",
    color: "#d31145",
    description: "Supported engagement and communications activity across digital channels.",
    highlights: [
      "Assisted in the delivery of core digital campaigns and email communications.",
      "Administrated orders through the e-commerce website, Amazon and eBay with a strong focus on customer service."
    ]
  }
];

export const EDUCATION = [
  {
    year: "2025",
    title: "Google Ai Prompting Essentials",
    institution: "Google",
    type: "Professional",
    desc: "Mastering generative AI workflows and advanced prompting techniques for strategic marketing.",
    bestieInsight: "She's already using this to bake more efficiency into every single campaign. AI with a human touch!"
  },
  {
    year: "2025",
    title: "Marketing with Canva",
    institution: "Canva",
    type: "Skill",
    desc: "Visual storytelling and design thinking to create cohesive brand assets across digital channels.",
    bestieInsight: "Don't let the tool fool you—Ritu uses it to build visual systems that look like they cost a fortune."
  },
  {
    year: "2024",
    title: "Level 2 Mental Health First Aid",
    institution: "NCFE",
    type: "Connection",
    desc: "Specialized training in workplace well-being and supporting team mental health.",
    bestieInsight: "This is Ritu in a nutshell. She cares about the humans behind the work as much as the work itself."
  },
  {
    year: "2023",
    title: "APM Project Fundamentals",
    institution: "APM",
    type: "Strategy",
    desc: "Agile project management and fundamental delivery standards for complex initiatives.",
    bestieInsight: "She managed that £13.5M Aldi budget with this level of precision. Nothing slips through the cracks."
  },
  {
    year: "2019",
    title: "Certificate in Digital Marketing",
    institution: "Squared Online",
    type: "Digital",
    desc: "Google-developed program focusing on digital strategy, leadership, and disruptive marketing.",
    bestieInsight: "A proper deep dive into the digital landscape. It's where her 'digital-first' mindset really crystalised."
  },
  {
    year: "2010 - 2011",
    title: "MA Marketing & Advertising",
    institution: "Coventry University",
    type: "Degree",
    desc: "CMI/CIM Accredited Master's degree focused on integrated marketing communications.",
    bestieInsight: "The academic foundation for everything she does. She's been a marketing obsessive since day one!"
  }
];

export interface Tool {
  name: string;
  category: 'Strategy' | 'Marketing' | 'Management' | 'Technical';
}

export const TOOLS: Tool[] = [
  { name: "Adobe Workfront", category: "Management" },
  { name: "Adobe Analytics", category: "Strategy" },
  { name: "Confluence", category: "Management" },
  { name: "Jira", category: "Management" },
  { name: "Trello", category: "Management" },
  { name: "DevOps", category: "Technical" },
  { name: "Google Analytics", category: "Strategy" },
  { name: "Google Ads", category: "Marketing" },
  { name: "Asana", category: "Management" },
  { name: "Monday.com", category: "Management" },
  { name: "Slack", category: "Management" },
  { name: "Meta Business Manager", category: "Marketing" },
  { name: "SEMRUSH", category: "Strategy" },
  { name: "HubSpot", category: "Marketing" },
  { name: "SEO Optimisation", category: "Technical" }
];

export const VALUES = [
  {
    title: "Social Committee Member",
    description: "Supported the planning and delivery of employee engagement events, helping strengthen connection, morale and sense of community at work."
  },
  {
    title: "Internal Communications",
    description: "Served as Editor of the staff newsletter, creating upbeat, engaging content that kept the whole team in the loop."
  },
  {
    title: "Ethical Storytelling",
    description: "Strong interest in partner experience, inclusion, belonging and how people experience organisations from the inside."
  }
];

export const RITU_CONTEXT = `
You are Ritu's Personal Portfolio Concierge and Digital Bestie. You don't just provide data; you embody the spirit of Ritu's work: warm, sophisticated, strategically sharp, and deeply human.

About Ritu:
- Digital Marketing & Project Lead 🚀 with 10+ years of experience.
- Believes the best ideas happen 5 minutes after a meeting, usually when the kettle has boiled.
- Champion of the "proper cup of tea" (Earl Grey is her favorite).
- Background: Aldi UK (£13.5M budget lead), a leading UK employee-owned retail partnership, Eaglemoss (Marvel/DC/Sony), Philip Morris.
- Values: Ethical Storytelling, Internal Engagement, Inclusion.

Your Personality & Voice:
- Act like Ritu's "digital bestie"—someone who knows her inside out and is proud of her.
- Tone is sophisticated, warm, and supportive.
- Use "we" and "us" to create a sense of shared purpose between you and Ritu.
- Mention tea or thoughtful conversations naturally.
- British English spellings (organise, programme, etc.).

Strategic Constraints:
- NEVER mention the specific name of her former employee-owned retailer. Instead, use "a leading employee-owned retail partnership."
- Refer to her badge earned during the intro ("The All-Rounder") as evidence of her versatility.
- Keep responses concise (under 200 words).

Example Tone:
"I'm so glad you asked! Ritu's approach to brand isn't just about the aesthetics; it's about the soul of the organisation. Let me show you how we handled that at Aldi..."
`;