import type { Project } from "@/components/ProjectGrid"

export const projects: Project[] = [
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
  {
    id: "voice-collection-platform",
    name: "Nyansapo Voice Collection",
    description:
      "A voice collection system for fine-tuning speech models in letter naming and sounds, with offline mobile support.",
    tags: ["next.js", "react-native", "firebase"],
    href: "https://nyansapo-voice-collection.vercel.app/",
  },
  {
    id: "voice-collection-mobile",
    name: "Nyansapo Audio Recorder App",
    description:
      "Mobile version of the voice collection system, with offline recording and sync when connected.",
    tags: ["react-native", "expo", "firebase"],
    href: "https://expo.dev/accounts/nyansapo_ai/projects/AudioRecorderApp/builds/cac208fc-4e31-401a-88ec-192a32b80b1d",
  },
]
