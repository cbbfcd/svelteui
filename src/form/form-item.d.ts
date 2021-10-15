import { SvelteComponentTyped } from 'svelte';
import type { FormRuleItem } from './form.d';

export interface FormItemProps {
  label?: string
  labelWidth?: string | number
  prop?: string
  required?: boolean
  rules?: FormRuleItem | FormRuleItem[]
  error?: string
  validateStatus?: string
  to?: string
  inlineMessage?: string | boolean
  showMessage?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
}

export default class FormItem extends SvelteComponentTyped<
  FormItemProps,
  {},
  { default: {} }
> { }
