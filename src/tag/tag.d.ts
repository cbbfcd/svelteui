import { SvelteComponentTyped } from 'svelte';

export interface TagProps {
  closable?: boolean;
  type?: 'success' | 'info' | 'warning' | 'danger' | ''
  hit?: boolean
  disableTransitions?: boolean
  color?: string
  size?: "medium" | "small" | "mini"
  effect?: "dark" | "light" | "plain"
}

export default class Tag extends SvelteComponentTyped<
  TagProps,
  { click: WindowEventMap['click'] },
  { default: {} }
> { }
