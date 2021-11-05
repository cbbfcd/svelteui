import { SvelteComponentTyped } from 'svelte';

export interface BacktopProps {
  visibilityHeight?: number;
  target?: string;
  right?: number;
  bottom?: number;
}

export default class Backtop extends SvelteComponentTyped<
  BacktopProps,
  { click: WindowEventMap['click'] },
  { default: {} }
> { }
