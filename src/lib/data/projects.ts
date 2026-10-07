import type { Project } from "@/components/ProjectGrid"

export const projects: Project[] = [
  {
    id: "hekima-learning",
    name: "Hekima Learning",
    description:
      "A React Native early-learning app focused on speech sounds for Playgroup, PP1, and PP2. I work on its Next.js authentication backend and Firebase data storage, including Cloud Functions.",
    tags: ["React Native", "Next.js authentication", "Firebase", "Cloud Functions", "Speech sounds", "Playgroup–PP2"],
    organization: "Nyansapo AI",
    availability: "Google Play",
  },
  {
    id: "stadimath",
    name: "StadiMath",
    description:
      "A React Native math-learning app for Stadi Learn, backed by a Next.js backend and Firebase, with DeepSeek AI integrated for analysis.",
    tags: ["React Native", "Next.js", "Firebase", "DeepSeek AI", "Math learning"],
    organization: "Nyansapo AI",
  },
  {
    id: "ocr-stt-models",
    name: "OCR & STT Models",
    description:
      "Fine-tuned Microsoft TrOCR Base Handwritten for OCR and Whisper Small for speech-to-text using Hugging Face Transformers. Built FastAPI inference APIs, containerized them with Docker, and deployed them to Microsoft Azure.",
    tags: ["Hugging Face Transformers", "TrOCR fine-tuning", "Whisper Small fine-tuning", "FastAPI", "Docker", "Azure deployment"],
    organization: "Nyansapo AI",
    availability: "Deployed on Azure",
  },
  {
    id: "nao-assessments-dashboard",
    name: "NAO Assessments Dashboard",
    description:
      "Maintaining the NAO Assessments dashboard built with Next.js, Firebase, and Redux.",
    tags: ["Next.js", "Firebase", "Redux", "Dashboard maintenance"],
    organization: "Nyansapo AI",
  },
  {
    id: "maize-disease-detection",
    name: "Maize Plant Disease Detection",
    description:
      "A mobile app using machine learning to help farmers detect maize plant diseases from plant images.",
    tags: ["python", "tensorflow", "java", "machine-learning"],
    href: "https://github.com/VictorNzyoka/Maize-plant-disease-predictor",
  },
  {
    id: "mess-management",
    name: "Mess Management System",
    description:
      "A web-based application for Dedan Kimathi University's mess management with menu planning, inventory, and online ordering.",
    tags: ["html", "css", "javascript", "php", "mysql"],
    href: "https://github.com/VictorNzyoka/Students-Mess-Management-system",
  },
  {
    id: "ecommerce-platform",
    name: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform with Mpesa payment integration, Cloudinary for media storage, and PostgreSQL backend.",
    tags: ["react", "node", "cloudinary", "mpesa-api", "postgresql"],
    href: "https://victor-nzyoka-react-node-mongodb-e-commerce-application.vercel.app",
  },
]
