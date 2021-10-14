import { SvelteComponentTyped } from 'svelte';

declare type ButtonGroupType = | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'
  | 'default';


declare type ButtonGroupSize = "large" | "medium" | "small" | "mini";

export interface ButtonGroupProps {
  style?: string;
  type?: ButtonType;
  size?: ButtonSize;
}

export default class ButtonGroup extends SvelteComponentTyped<
  ButtonGroupProps,
  {},
  { default: {} }
> { }
