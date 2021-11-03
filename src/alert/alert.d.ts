import { SvelteComponentTyped } from 'svelte';

export interface AlertProps {
  title?: string
  description?: string
  type?: 'success' | 'warning' | 'error' | 'info'
  closable?: boolean
  closeText?: string
  showIcon?: boolean
  center?: boolean
  effect?: 'light' | 'dark'
}

export default class Alert extends SvelteComponentTyped<
  AlertProps,
  {},
  { default: {} }
> { }
