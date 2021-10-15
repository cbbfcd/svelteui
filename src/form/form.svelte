<script>
  import { setContext } from 'svelte';

  import { SVELTEUI_FORM_KEY } from '../utils/constants';
  import { clsx } from '../utils/clsx';
  import { debug } from '../utils/error';

  export let rules = void 0;
  export let value = void 0;
  export let inline = false;
  export let labelPosition = void 0;
  export let labelWidth = '';
  export let labelSuffix = '';
  export let inlineMessage = void 0;
  export let statusIcon = void 0;
  export let showMessage = true;
  export let size = void 0;
  export let disabled = void 0;
  export let validateOnRuleChange = true;
  export let hideRequiredAsterisk = false;
  export let scrollToError = void 0;

  let clazz = '';
  let element = null;

  export { clazz as class };

  export function getElement() {
    return element;
  }

  let fields = [];
  let potentialLabelWidthArr = [];
  let autoLabelWidth = '0';

  $: {
    if (potentialLabelWidthArr.length === 0) {
      autoLabelWidth = '0';
    } else {
      const max = Math.max(...potentialLabelWidthArr);
      autoLabelWidth = max ? `${max}px` : '';
    }
  }

  $: {
    if (rules) {
      fields.forEach((field) => {
        field.evaluateValidationEnabled();
      });

      if (validateOnRuleChange) {
        validate(() => ({}));
      }
    }
  }

  // -------------------- export form utils function ---------------------
  function addField(field) {
    if (field) fields.push(field);
  }

  function removeField(field) {
    if (field && field.prop) {
      fields.splice(fields.indexOf(field), 1);
    }
  }

  export function resetFields() {
    if (!value) {
      debug('Form', 'bind value is required for resetFields to work.');
      return;
    }
    fields.forEach((field) => {
      field.resetField();
    });
  }

  export function clearValidate(props = []) {
    const fds = props.length
      ? typeof props === 'string'
        ? fields.filter((field) => props === field.prop)
        : fields.filter((field) => props.indexOf(field.prop) > -1)
      : fields;

    fds.forEach((filed) => {
      filed.clearValidate();
    });
  }

  export function validate(callback) {
    if (!value) {
      debug('Form', 'bind value is required for validate to work.');
      return;
    }

    let promise = void 0;
    if (typeof callback !== 'function') {
      promise = new Promise((resolve, reject) => {
        callback = function (valid, invalidFields) {
          if (valid) {
            resolve(true);
          } else {
            reject(invalidFields);
          }
        };
      });
    }

    if (fields.length === 0) {
      callback(true);
    }

    let valid = true;
    let count = 0;
    let invalidFields = {};
    let firstInvalidFields;

    for (const field of fields) {
      field.validate('', (message, field) => {
        if (message) {
          valid = false;
          firstInvalidFields || (firstInvalidFields = field);
        }
        invalidFields = { ...invalidFields, ...field };
        if (++count === fields.length) {
          callback(valid, invalidFields);
        }
      });
    }

    if (!valid && scrollToError) {
      scrollToField(Object.keys(firstInvalidFields)[0]);
    }

    return promise;
  }

  export function validateField(props, cb) {
    props = [].concat(props);
    const fds = fields.filter((field) => props.indexOf(field.prop) !== -1);
    if (!fields.length) {
      debug('Form', 'please pass correct props!');
      return;
    }

    fds.forEach((field) => {
      field.validate('', cb);
    });
  }

  export function scrollToField(prop) {
    fields.forEach((item) => {
      if (item.prop === prop) {
        item.$el && item.$el.scrollIntoView();
      }
    });
  }

  // ------------- inner utils ---------------
  function getLabelWidthIndex(width) {
    const index = potentialLabelWidthArr.indexOf(width);
    if (index === -1) {
      debug('Form', `unexpected width ${width}`);
    }
    return index;
  }

  function registerLabelWidth(val, oldVal) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.push(val);
    }
    potentialLabelWidthArr = potentialLabelWidthArr;
  }

  function deregisterLabelWidth(val) {
    const index = getLabelWidthIndex(val);
    if (index > -1) {
      potentialLabelWidthArr.splice(index, 1);
      potentialLabelWidthArr = potentialLabelWidthArr;
    }
  }

  setContext(SVELTEUI_FORM_KEY, {
    resetFields,
    clearValidate,
    validateField,
    addField,
    removeField,
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth,
    ...$$props // TODO not reactive
  });
</script>

<form
  bind:this={element}
  class={clsx({
    'el-form': true,
    'el-form--inline': inline,
    ['el-form--label-' + labelPosition]: !!labelPosition,
    [clazz]: !!clazz
  })}
>
  <slot />
  <!--svelte can not bind value in form element directlly.-->
  <input bind:value style="display: none;" />
</form>
