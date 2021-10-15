import { SvelteComponentTyped } from 'svelte';
import { ButtonType, ButtonSize } from './button.d';

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
