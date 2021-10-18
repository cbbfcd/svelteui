<script>
  import { setContext } from 'svelte/internal';
  import { writable } from 'svelte/store';

  import { clsx } from '../utils/clsx';
  import { SVELTEUI_BTN_GROUP_KEY, UND } from '../utils/constants';

  export let style = UND;
  export let size = UND;
  export let type = UND;

  // reactive props
  let reactiveProps = writable({ size, type });
  setContext(SVELTEUI_BTN_GROUP_KEY, reactiveProps);

  let clazz = '';
  let element = null;
  export { clazz as class };

  export function getElement() {
    return element;
  }
</script>

<div
  bind:this={element}
  {style}
  class={clsx({ 'el-button-group': true, [clazz]: !!clazz })}
  {...$$props}
>
  <slot />
</div>
