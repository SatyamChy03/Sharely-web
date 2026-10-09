import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FAQ_ITEMS, type FaqItem } from './faqItems';

interface FaqEntryProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqEntry({ item, isOpen, onToggle }: FaqEntryProps) {
  return (
    <li>
      <h3>
        <button
          type="button"
          id={`faq-q-${item.id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-a-${item.id}`}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-[17px] font-medium transition-colors hover:text-cyan"
        >
          {item.question}
          <Plus
            size={20}
            aria-hidden="true"
            className={`shrink-0 text-muted transition-transform duration-200 ease-soft ${isOpen ? 'rotate-45' : ''}`}
          />
        </button>
      </h3>
      {/* Animating grid rows lets the answer open to its own height. */}
      <div
        id={`faq-a-${item.id}`}
        role="region"
        aria-labelledby={`faq-q-${item.id}`}
        className={`grid transition-[grid-template-rows] duration-250 ease-soft ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden" inert={!isOpen}>
          <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.answer}</p>
        </div>
      </div>
    </li>
  );
}

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section aria-labelledby="faq-title" id="faq" className="border-t border-line py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Questions, answered."
          lead="Can't find yours? The installation guide covers setup and troubleshooting in detail."
        />
        <ul className="divide-y divide-line border-y border-line">
          {FAQ_ITEMS.map((item) => (
            <FaqEntry
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
