<script>
  import { getContext, createEventDispatcher } from 'svelte';

  import { clsx } from '../utils/clsx';
  import {
    SVELTEUI_BTN_GROUP_KEY,
    SVELTEUI_FORM_KEY,
    UND
  } from '../utils/constants';

  const elBtnGroup = getContext(SVELTEUI_BTN_GROUP_KEY);
  const elForm = getContext(SVELTEUI_FORM_KEY);
  const dispatch = createEventDispatcher();

  export let loading = false;
  export let icon = '';
  export let disabled = false;
  export let plain = false;
  export let round = false;
  export let circle = false;
  export let style = UND;
  export let type = $elBtnGroup ? $elBtnGroup.type : 'default';
  export let size = $elBtnGroup ? $elBtnGroup.size : UND;
  export let nativeType = 'button';

  let clazz = '';
  let element = null;

  // class props hack
  export { clazz as class };

  // https://flaviocopes.com/svelte-export-from-component
  export function getElement() {
    return element;
  }

  function handleClick(e) {
    if (nativeType === 'reset') {
      elForm && elForm.resetFields && elForm.resetFields();
    }

    dispatch('click', e);
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
  on:click={handleClick}
  {...$$props}
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
