import { SvelteComponentTyped } from 'svelte';

export type ButtonType = | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'
  | 'default';

export type ButtonNativeType = 'button' | 'submit' | 'reset';

export type ButtonSize = "large" | "medium" | "small" | "mini";

export interface ButtonProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['button']> {
  loading?: boolean;
  icon?: string;
  class?: string;
  color?: ButtonColor;
  disabled?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  style?: string;
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: ButtonNativeType
}

export default class Button extends SvelteComponentTyped<
  ButtonProps,
  { click: WindowEventMap['click'] },
  { default: {} }
> { }
