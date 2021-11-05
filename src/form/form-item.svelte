<script>
  import { getContext, setContext, onMount } from 'svelte';
  import AsyncValidator from 'async-validator';

  import {
    SVELTEUI_FORM_KEY,
    SVELTEUI_FORM_ITEM_KEY,
    UND
  } from '../utils/constants';
  import { clsx } from '../utils/clsx';
  import { throwError } from '../utils/error';
  import { addUnit, getPropByPath } from '../utils/util';
  import { noop } from '../utils/share';

  import LabelWrap from './label-wrap.svelte';

  export let label = UND;
  export let labelWidth = '';
  export let prop = UND;
  export let required = UND;
  export let rules = UND;
  export let error = UND;
  export let validateStatus = UND;
  export let to = UND;
  // svelte-ignore unused-export-let
  export let inlineMessage = '';
  export let showMessage = true;
  export let size = UND;

  let formCtx = getContext(SVELTEUI_FORM_KEY);

  if (!formCtx) {
    throwError('svelteui:Form', 'FormItem must be used in the Form component.');
  }

  let clazz = '';
  let element = null;

  export { clazz as class };

  export function getElement() {
    return element;
  }

  // ------------- inner state --------------
  let validateState = '';
  let validateMessage = '';
  let isValidationEnabled = false;
  let computedLabelWidth = '';
  let labelFor = '';
  let labelStyle = UND;
  let contentStyle = UND;
  let fieldValue = UND;
  let isRequired = false;
  let sizeClass = UND;
  let initialValue = UND;
  let shouldShowError = UND;

  // -------------- built-in util functions --------------
  function getRules(ctx, rules, prop, required) {
    const formRules = ctx.rules;
    const selfRules = rules;
    const requiredRule = required !== undefined ? { required: !!required } : [];

    const props = getPropByPath(formRules, prop || '', false);
    const normalizedRule = formRules ? props.o[prop || ''] || props.v : [];

    return [].concat(selfRules || normalizedRule || []).concat(requiredRule);
  }

  function getFilteredRule(trigger) {
    const rls = getRules(formCtx, rules, prop, required);
    return rls
      .filter((rule) => {
        if (!rule.trigger || trigger === '') return true;
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      })
      .map((rule) => ({ ...rule }));
  }

  function validate(trigger, callback = noop) {
    if (!isValidationEnabled) {
      callback();
      return;
    }
    const rls = getFilteredRule(trigger);
    if ((!rls || rls.length === 0) && required === UND) {
      callback();
      return;
    }

    validateState = 'validating';

    const descriptor = {};
    if (rls && rls.length > 0) {
      rls.forEach((rule) => {
        delete rule.trigger;
      });
    }
    descriptor[prop] = rules;

    const validator = new AsyncValidator(descriptor);
    const model = {};
    model[prop] = fieldValue;

    validator.validate(
      model,
      { firstFields: true },
      (errors, invalidFields) => {
        validateState = !errors ? 'success' : 'error';
        validateMessage = errors
          ? errors[0].message || `${prop} is required`
          : '';
        callback(validateMessage, invalidFields);
        formCtx.dispatch && formCtx.dispatch('validate', { prop, errors });
      }
    );
  }

  // --------------- export these function ---------------
  export function clearValidate() {
    validateState = '';
    validateMessage = '';
  }

  export function resetField() {
    validateState = '';
    validateMessage = '';
    const model = formCtx.model;
    const value = fieldValue;
    let path = prop;
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.');
    }
    const props = getPropByPath(model, path, true);
    if (Array.isArray(value)) {
      props.o[props.k] = [].concat(initialValue);
    } else {
      props.o[props.k] = initialValue;
    }
  }

  function evaluateValidationEnabled() {
    const rls = getRules(formCtx, rules, prop, required);
    isValidationEnabled = rls && rls.length > 0;
  }

  function updateComputedLabelWidth(width) {
    computedLabelWidth = width ? `${width}px` : '';
  }

  // TODO so many computed values, something is not necessary.
  $: if (error) {
    validateMessage = error;
    validateState = 'error';
  }

  $: validateStatus && (validateState = validateStatus);

  $: labelFor = to || prop;

  $: {
    if (formCtx.labelPosition === 'top') {
      labelStyle = UND;
    } else {
      const lw = addUnit(labelWidth || formCtx.labelWidth);
      if (lw) {
        labelStyle = `width: ${lw};`;
      }
    }
  }

  $: {
    const c = formCtx.labelPosition === 'top' || formCtx.inline;
    const d = !label && !labelWidth;
    if (c || d) {
      contentStyle = UND;
    } else if (!label && !$$slots.label) {
      const lw = addUnit(labelWidth || formCtx.labelWidth);
      contentStyle = lw ? `margin-left: ${lw};` : UND;
    } else {
      contentStyle = UND;
    }
  }

  $: {
    const model = formCtx.model;
    if (model && prop) {
      let path = prop;
      if (path.indexOf(':') > -1) {
        path = path.replace(/:/, '.');
      }

      fieldValue = getPropByPath(model, path, true).v;
    }
  }

  $: {
    isRequired = false;
    const rls = getRules(formCtx, rules, prop, required);
    if (rls && rls.length) {
      const shouldRequired = rls.find((rule) => rule.required);
      shouldRequired && (isRequired = true);
    }
  }

  $: sizeClass = size || formCtx.size;

  $: shouldShowError =
    validateState === 'error' && showMessage && formCtx.showMessage;

  let elFormItem = {
    size: sizeClass,
    validateState,
    el: element,
    evaluateValidationEnabled,
    resetField,
    clearValidate,
    validate,
    updateComputedLabelWidth,
    ...$$props
  };

  setContext(SVELTEUI_FORM_ITEM_KEY, elFormItem);

  // ----------------- life cycle ------------------
  onMount(() => {
    if (prop) {
      formCtx.addField && formCtx.addField(elFormItem);

      const value = fieldValue;
      initialValue = Array.isArray(value) ? [...value] : value;

      evaluateValidationEnabled();
    }

    return () => {
      formCtx.addField && formCtx.removeField(elFormItem);
    };
  });
</script>

<div
  bind:this={element}
  class={clsx({
    'el-form-item': true,
    'el-form-item--feedback': formCtx.statusIcon,
    'is-error': validateState === 'error',
    'is-validating': validateState === 'validating',
    'is-success': validateState === 'success',
    'is-required': isRequired || required,
    'is-no-asterisk': formCtx.hideRequiredAsterisk,
    [`el-form-item--${sizeClass}`]: !!sizeClass,
    [clazz]: !!clazz
  })}
>
  <div class="el-form-item__content" style={contentStyle}>
    <LabelWrap
      isAutoWidth={labelStyle && labelStyle.includes('auto')}
      updateAll={formCtx.labelWidth === 'auto'}
    >
      {#if label || $$slots.label}
        <label for={labelFor} class="el-form-item__label" style={labelStyle}>
          <slot name="label" label={label + formCtx.labelSuffix}>
            {label + formCtx.labelSuffix}
          </slot>
        </label>
      {/if}
    </LabelWrap>
    {#if shouldShowError}
      <slot name="error" error={validateMessage}>
        <div
          class={clsx({
            'el-form-item__error': true,
            'el-form-item__error--inline':
              typeof inlineMessage === 'boolean'
                ? inlineMessage
                : formCtx.inlineMessage || false
          })}
        >
          {validateMessage}
        </div>
      </slot>
    {/if}
  </div>
</div>
