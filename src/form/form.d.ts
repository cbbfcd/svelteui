import { SvelteComponentTyped } from 'svelte';
import type { RuleItem } from 'async-validator';

interface FormRuleItem extends RuleItem {
  trigger?: string
}

interface FormRulesMap {
  [key: string]: FormRuleItem | FormRuleItem[]
}

export interface FormProps<T extends any> extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['form']> {
  rules?: Record<string, FormRulesMap>
  value?: Record<string, T>
  labelPosition?: string
  labelWidth?: string | number
  labelSuffix?: string
  inline?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  showMessage?: boolean
  size?: 'large' | 'medium' | 'small' | 'mini'
  disabled?: boolean
  validateOnRuleChange?: boolean
  hideRequiredAsterisk?: boolean
  scrollToError?: boolean
}

export default class Form extends SvelteComponentTyped<
  FormProps,
  {},
  { default: {} }
> { }
