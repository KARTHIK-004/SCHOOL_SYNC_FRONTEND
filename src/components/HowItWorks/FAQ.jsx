import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "../ui/section-header";

const faqs = [
  {
    question: "How does the system handle student data privacy?",
    answer:
      "Our system employs state-of-the-art encryption and follows strict data protection regulations. We ensure that all student data is securely stored and only accessible to authorized personnel.",
  },
  {
    question: "Can parents access their child's information?",
    answer:
      "Yes, parents are provided with secure login credentials to access a dedicated parent portal. Here, they can view their child's grades, attendance, and communicate with teachers.",
  },
  {
    question: "Is the system suitable for both small and large schools?",
    answer:
      "Our system is scalable and can be customized to fit the needs of schools of all sizes, from small private institutions to large public school districts.",
  },
  {
    question: "How often is the system updated?",
    answer:
      "We regularly update our system to introduce new features, improve performance, and ensure security. Updates are typically rolled out monthly, with major feature releases quarterly.",
  },
];

export function FAQ() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          <SectionHeader
            logo="❓"
            title="Common Queries"
            heading="Frequently Asked Questions"
            description="Find answers to common questions about our school management system and its implementation."
          />
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
