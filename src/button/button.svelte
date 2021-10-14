<script>
  import { getContext, onMount } from 'svelte';

  import { clsx } from '../utils/clsx';
  import { SVELTEUI_BTN_GROUP_KEY } from '../utils/constants';

  const elBtnGroup = getContext(SVELTEUI_BTN_GROUP_KEY);

  export let loading = false;
  export let icon = '';
  export let disabled = false;
  export let plain = false;
  export let round = false;
  export let circle = false;
  export let style = void 0;
  export let type = $elBtnGroup ? $elBtnGroup.type : 'default';
  export let size = $elBtnGroup ? $elBtnGroup.size : void 0;
  export let nativeType = 'button';

  let clazz = '';
  let element = null;

  // class props hack
  export { clazz as class };

  // bind to the component instance.
  export function getElement() {
    return element;
  }
</script>

<button
  bind:this={element}
  class={clsx({
    'el-button': true,
    'is-disabled': disabled,
    'is-loading': loading,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    ['el-button--' + type]: true,
    ['el-button--' + size]: !!size,
    [clazz]: !!clazz
  })}
  disabled={disabled || loading}
  type={nativeType}
  {style}
  on:click
>
  {#if loading}
    <i class="el-icon-loading" />
  {/if}
  {#if icon && !loading}
    <i class={icon} />
  {/if}
  {#if $$slots.default}
    <span><slot /></span>
  {/if}
</button>
