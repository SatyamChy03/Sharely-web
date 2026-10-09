import { Eyebrow } from './Eyebrow';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ id, eyebrow, title, lead, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : '';
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="text-balance text-[34px] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[44px]"
      >
        {title}
      </h2>
      {lead && <p className="text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}
