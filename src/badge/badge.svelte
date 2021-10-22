<script>
  import { fade } from 'svelte/transition';
  import { clsx } from '../utils/clsx';
  import { UND } from '../utils/constants';
  import { isNumeric } from '../utils/share';

  let clazz = '';
  let element = null;
  export { clazz as class };

  export let value = '';
  export let max = 99;
  export let isDot = UND;
  export let hidden = UND;
  export let type = 'danger';
  export let fadeParams = { delay: 0, duration: 100 };

  export function getElement() {
    return element;
  }

  let content = '';
  $: {
    if (isDot) content = '';
    if (isNumeric(value) && isNumeric(max)) {
      content = +max < +value ? `${max}+` : value;
    } else content = value;
  }
</script>

<div
  bind:this={element}
  class={clsx({
    'el-badge': true,
    [clazz]: !!clazz
  })}
>
  <slot />
  {#if !hidden && (content || content === '0' || isDot)}
    <sup
      class={clsx({
        'el-badge__content': true,
        ['el-badge__content--' + type]: !!type,
        'is-fixed': $$slots.default,
        'is-dot': isDot
      })}
      in:fade={fadeParams}
    >
      {content}
    </sup>
  {/if}
</div>
