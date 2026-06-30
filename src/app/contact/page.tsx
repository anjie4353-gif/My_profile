import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Anjaneyulu Pallepagu",
  description: "Send a message to Anjaneyulu Pallepagu — Senior Data & AI Engineer",
};

export default function ContactPage() {
  return <ContactForm />;
}