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
    "I'm a proven Full Stack Mobile Engineer with a track record of bringing multiple products to life from scratch. I'm a strong leader and team player, dedicated to fostering environments where teams excel. My expertise lies in TypeScript, React, Node.js, and React Native, and I thrive in both remote and hybrid settings.",
  avatarUrl: "https://sisongqolosi.netlify.app/img/siso2.png",
  personalWebsiteUrl: "https://sisodev.com",
  contact: {
    email: "sisongqolosi@gmail.com",
    tel: "+48530213401",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/sisongqolosi",
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
      title: "Quicket",
      techStack: ["TypeScript", "Next.js", "React Native", "C#", "Node.js"],
      description:
        "A platform for selling tickets to events and scanning QR codes",
      logo: ConsultlyLogo,
      link: {
        label: "quicket.com",
        href: "https://quicket.com/",
      },
    },
    {
      title: "buyly",
      techStack: [
        "Side Project",
        "TypeScript",
        "Next.js",
        "React Native",
        "Vite",
        "GraphQL",
        "WebRTC",
      ],
      description: "A platform to compare groceries prices",
      logo: ConsultlyLogo,
      link: {
        label: "consultly.com",
        href: "https://consultly.com/",
      },
    },
  ],
} as const;
