<script>
  import { UND } from '../utils/constants';
  import { clsx } from '../utils/clsx';
  import { wrapObj2StylStr } from '../utils/util';
  import { isNumber, isString } from 'lodash-es';

  export let size = '';
  export let color = '';

  let clazz = '';
  let element = null;
  let style = UND;

  export { clazz as class };

  export function getElement() {
    return element;
  }

  $: {
    if (size || color) {
      let innerSize = '';
      if (isNumber(size) || (isString(size) && !size.endsWith('px'))) {
        innerSize = `${size}px`;
      }
      style = wrapObj2StylStr({
        ...(innerSize ? { '--font-size': innerSize } : {}),
        ...(color ? { '--color': color } : {})
      });
    }
  }
</script>

<i
  on:click
  bind:this={element}
  class={clsx({ 'el-icon': true, [clazz]: !!clazz })}
  {style}
>
  <slot />
</i>
