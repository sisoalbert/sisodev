import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Siso Ngqolosi",
  initials: "SA",
  location: "Cape Town, South Africa, GMT+2",
  locationLink: "https://www.google.com/maps/place/capetown",
  about:
    "A passionate mobile developer with a specialization in React Native. With a love for all things JavaScript, I combines technical expertise with a creative mindset to craft innovative solutions.",
  summary:
    "As a Full Stack Engineer, I have successfully taken multiple products from 0 to 1. I lead teams effectively, ensuring an environment where people can do their best work. Currently, I work mostly with TypeScript, React, Node.js, and GraphQL. I have over 4 years of experience in working remotely with companies all around the world.",
  avatarUrl: "https://sisongqolosi.netlify.app/img/siso2.png",
  personalWebsiteUrl: "https://sisodev.com",
  contact: {
    email: "sisongqolosi@gmail.com",
    tel: "+48530213401",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/BartoszJarocki",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/siso-ngqolosi-13ba8229b/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: " https://twitter.com/SisoNgqolosi",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "University of Cape Town",
      degree: "Bachelor's Degree in Mechanical Engineering(honours)",
      start: "2016",
      end: "2019",
    },
  ],
  work: [
    {
      company: "Quicket",
      link: "https://quicket.co.za",
      badges: ["hybrid"],
      title: "Mobile Developer → Full Stack Developer",
      logo: ParabolLogo,
      start: "2022",
      end: "Present",
      description:
        "Built a hybrid mobile app for Android and iOS. Technologies: React Native, React, Node.js, MongoDB, AWS, Firebase",
    },
    {
      company: "Quester Studios",
      link: "https://clevertech.biz",
      badges: ["Remote"],
      title: "Freelance React Native Developer → Full Stack Developer",
      logo: ClevertechLogo,
      start: "2020",
      end: "2022",
      description:
        "Created Android mobile apps and led teams for companies like Vision Media, DKMS, or AAA. Built live streaming application for Evercast from scratch. Technologies: Android, Kotlin, React, TypeScript, GraphQL",
    },
    {
      company: "Zutari (Aurecon)",
      link: "https://bsgroup.eu/",
      badges: [],
      title: "Mechanical Engineer → Consultant",
      logo: JojoMobileLogo,
      start: "2012",
      end: "2015",
      description:
        "Worked with clients such as City of Cape Town Municipality, EThekwini Municipality, and Anglo America. Led projects for various clients. Technologies: Python, AutoCAD, Solidworks",
    },
    {
      company: "Google Developers Group Cape Town",
      link: "https://gdg.community.dev/gdg-cape-town/",
      badges: [],
      title: "Volunteer Developer",
      logo: NSNLogo,
      start: "2021",
      end: "Present",
      description:
        "Joined a groups of passionate leaders in the community who are dedicated to helping others learn and connect with technologies developed by Google . We host a variety of technical activities for developers of all levels to learn about Google's technologies such as Android , Google Drive, Google Cloud Platform, and product APIs.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React/Next.js",
    "React Native",
    "Node.js",
    "GraphQL",
    "Relay",
    "WebRTC",
  ],
  projects: [
    {
      title: "Consultly",
      techStack: [
        "Side Project",
        "TypeScript",
        "Next.js",
        "React Native",
        "Vite",
        "GraphQL",
        "WebRTC",
      ],
      description: "A platform to build and grow your online business",
      logo: ConsultlyLogo,
      link: {
        label: "consultly.com",
        href: "https://consultly.com/",
      },
    },
    {
      title: "Monito",
      techStack: ["Side Project", "TypeScript", "Next.js", "Browser Extension"],
      description:
        "Browser extension that records everything happening in a web application",
      logo: MonitoLogo,
      link: {
        label: "monito.dev",
        href: "https://monito.dev/",
      },
    },
    {
      title: "Jarocki.me",
      techStack: ["Side Project", "Next.js", "MDX"],
      description:
        "My personal website and blog. Built with Next.js and Notion API",
      logo: JarockiMeLogo,
      link: {
        label: "github.com",
        href: "https://jarocki.me/",
      },
    },
    {
      title: "Minimal",
      techStack: ["Side Project", "Next.js", "Puppeteer"],
      description:
        "Minimalist calendars, habit trackers and planners generator",
      logo: Minimal,
      link: {
        label: "useminimal.com",
        href: "https://useminimal.com/",
      },
    },
    {
      title: "Barepapers",
      techStack: ["Side Project", "Next.js", "Puppeteer"],
      description:
        "Generates beautiful wallpapers using random shapes and gradients",
      logo: BarepapersLogo,
      link: {
        label: "barepapers.com",
        href: "https://barepapers.com/",
      },
    },
    {
      title: "Year progress",
      techStack: ["Side Project", "TypeScript", "Next.js"],
      description: "Tracks current year progress and displays a countdown",
      logo: YearProgressLogo,
      link: {
        label: "getyearprogress.com",
        href: "https://getyearprogress.com/",
      },
    },
    {
      title: "Parabol",
      techStack: [
        "Full Stack Developer",
        "TypeScript",
        "React",
        "Node.js",
        "GraphQL",
      ],
      description:
        "The Agile meeting co-pilot that delivers better meetings with less effort",
      logo: ParabolLogo,
      link: {
        label: "github.com",
        href: "https://parabol.co/",
      },
    },
    {
      title: "Evercast",
      techStack: [
        "Lead Frontend Developer",

        "TypeScript",
        "React",
        "Node.js",
        "GraphQL",
      ],
      description:
        "Creative collaboration platform that combines video conferencing and HD media streaming",
      logo: EvercastLogo,
      link: {
        label: "evercast.us",
        href: "https://www.evercast.us/",
      },
    },
    {
      title: "Mobile Vikings",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application for leading virtual mobile operator in Poland",
      logo: MobileVikingsLogo,
      link: {
        label: "mobilevikings.pl",
        href: "https://mobilevikings.pl/",
      },
    },
    {
      title: "Howdy",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Howdy is a place for you to join communities you care about",
      logo: Howdy,
      link: {
        label: "play.google.com",
        href: "https://howdy.co/",
      },
    },
    {
      title: "Tastycloud",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application for managing and displaying restaurant menus in kiosk mode",
      logo: TastyCloudLogo,
      link: {
        label: "tastycloud.fr",
        href: "https://www.tastycloud.fr/",
      },
    },
    {
      title: "Ambit",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application that helps with sharing your contact details",
      logo: AmbitLogo,
    },
    {
      title: "Bim",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Android application that helps with booking a table in a restaurants",
      logo: BimLogo,
    },
    {
      title: "Canal Digital GO",
      techStack: ["Lead Android Developer", "Android", "Kotlin"],
      description:
        "Video streaming mobile application for Canal Digital subscribers",
      logo: CDGOLogo,
    },
  ],
} as const;
