import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export default function ContactSection() {
  return (
    <section className="pb-10 pt-6" id="contact">
      {/* Section header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <span className="neo-label">Contact</span>
      </div>

      <div className="grid gap-6 sm:grid-cols-5">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
