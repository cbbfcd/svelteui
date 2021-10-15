<script>
  import { getContext } from 'svelte';
  import { SVELTEUI_FORM_KEY } from '../utils/constants';
  import { clsx } from '../utils/clsx';
  import { debug } from '../utils/error';
  import { addUnit } from '../utils/util';

  export let label = void 0;
  export let labelWidth = '';
  export let prop = void 0;
  export let required = void 0;
  export let rules = void 0;
  export let error = void 0;
  export let validateStatus = void 0;
  export let to = void 0; // in element-plus, it's for
  export let inlineMessage = '';
  export let showMessage = true;
  export let size = void 0;

  let formCtx = getContext(SVELTEUI_FORM_KEY);
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
  let labelStyle = '';

  $: {
    if (error) {
      validateMessage = error;
      validateState = 'error';
    }
  }

  $: {
    validateStatus && (validateState = validateStatus);
  }

  $: {
    labelFor = to || prop;
  }

  $: {
    if (formCtx.labelPosition === 'top') {
      labelStyle = '';
    } else {
      const __labelWidth = addUnit(labelWidth) || addUnit(formCtx.labelWidth);
      if (__labelWidth) {
        labelStyle = `width: ${__labelWidth};`;
      }
    }
  }
</script>

<div
  bind:this={element}
  class={clsx({
    'el-form-item': true,
    [clazz]: !!clazz
  })}
>
  <div class="el-form-item__content" />
</div>
