import { SvelteComponentTyped } from 'svelte';

export interface IconProps {
  size?: string;
  color?: string;
}

export default class Icon extends SvelteComponentTyped<
  IconProps,
  { click: WindowEventMap['click'] },
  { default: {} }
> { }
