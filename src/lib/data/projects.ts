import type { Project } from "@/components/ProjectGrid"

export const projects: Project[] = [
  {
    id: "hekima-learning",
    name: "Hekima Learning",
    description:
      "An early-learning app focused on sound learning for Playgroup, PP1, and PP2 children.",
    tags: ["Early learning", "Speech sounds", "Playgroup–PP2"],
    organization: "Nyansapo AI",
    availability: "Google Play",
  },
  {
    id: "stadimath",
    name: "StadiMath",
    description:
      "A math-focused learning app I have contributed to as part of Nyansapo AI's education products.",
    tags: ["Math learning", "Stadi Learn", "Education"],
    organization: "Nyansapo AI",
  },
  {
    id: "ocr-stt-models",
    name: "OCR & STT Models",
    description:
      "Fine-tuned OCR and speech-to-text (STT) models and deployed them on Microsoft Azure.",
    tags: ["OCR", "Speech-to-text", "Model fine-tuning", "Azure"],
    organization: "Nyansapo AI",
    availability: "Deployed on Azure",
  },
  {
    id: "nao-assessments-dashboard",
    name: "NAO Assessments Dashboard",
    description:
      "Ongoing maintenance of the dashboard for the NAO Assessments app.",
    tags: ["Dashboard", "Assessments", "Product maintenance"],
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
