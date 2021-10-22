import { SvelteComponentTyped } from 'svelte';

export interface BadgeProps {
  value?: number | string;
  max?: number;
  isDot?: boolean;
  hidden?: boolean;
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  fadeParams?: { delay?: number, duration?: number }
}

export default class Badge extends SvelteComponentTyped<
  BadgeProps,
  {},
  { default: {} }
> { }
