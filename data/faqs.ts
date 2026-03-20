interface Faq {
  id: string;
  question: string;
  answer: string;
}

const openingHours: Faq = {
  id: crypto.randomUUID(),
  question: "What are you opening hours?",
  answer:
    "We're open daily from 7:00 AM to 9:00 PM. Hours may change during holidays, so check our social pages for updates.",
};

const freeWifi: Faq = {
  id: crypto.randomUUID(),
  question: "Do you offer free Wi-Fi?",
  answer:
    "Yes. Wi-Fi is free for all customers. Ask our staff for the password when you order.",
};

const standBy: Faq = {
  id: crypto.randomUUID(),
  question: "Can I work or study here?",
  answer:
    "Yes—but be respectful of space during peak hours. We encourage laptop use during quieter times and may limit long stays when the shop is full.",
};

const outlets: Faq = {
  id: crypto.randomUUID(),
  question: "Do you have power outlets?",
  answer:
    " Some seats have outlets, but not all. They're available on a first-come, first-served basis.",
};

const nonCoffee: Faq = {
  id: crypto.randomUUID(),
  question: "Do you offer non-coffee drinks?",
  answer:
    "Yes, we do. We offer tea, chocolate drinks, milk tea and other alternatives.",
};

const faqs: Faq[] = [openingHours, freeWifi, standBy, outlets, nonCoffee];

export type { Faq };
export { faqs };
