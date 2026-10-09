import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-btn font-medium whitespace-nowrap select-none transition-[background-color,border-color,color,transform] duration-150 ease-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100 aria-disabled:cursor-not-allowed';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-cyan text-ink font-semibold hover:bg-cyan-hover shadow-[0_0_0_1px_rgb(113_201_206/0.3),0_8px_24px_-8px_rgb(113_201_206/0.45)] disabled:bg-elevated disabled:text-muted disabled:shadow-none aria-disabled:bg-elevated aria-disabled:text-muted aria-disabled:shadow-none',
  secondary:
    'border border-line-strong bg-elevated text-fg hover:bg-[#174068] hover:border-[#2E6390]',
  ghost: 'text-muted hover:text-fg hover:bg-elevated',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: 'h-11 px-4 text-[15px]',
  lg: 'h-12 px-6 text-base',
};

const buttonClasses = ({ variant = 'primary', size = 'md', className = '' }: ButtonStyleProps) =>
  `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClasses({ variant, size, className })} {...props} />;
}

/** A button-styled link to another page of this site. */
export function ButtonLink({ variant, size, className, ...props }: ButtonStyleProps & LinkProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}

/** A button-styled link to a file or an outside address. */
export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClasses({ variant, size, className })} {...props} />;
}
