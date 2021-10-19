<script>
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { clsx } from '../utils/clsx';
  import { UND } from '../utils/constants';

  const dispatch = createEventDispatcher();

  export let closable = false;
  export let type = '';
  export let hit = false;
  export let color = '';
  export let size = UND;
  export let effect = 'light';
  export let disableTransitions = false;

  let clazz = '';
  let element = null;

  export { clazz as class };

  export function getElement() {
    return element;
  }

  function handleClose(evt) {
    evt.stopPropagation();
    dispatch('close', evt);
  }

  $: style = color ? `background-color: ${color};` : UND;
</script>

{#if !disableTransitions}
  <span
    bind:this={element}
    class={clsx({
      'el-tag': true,
      [`el-tag--${type}`]: !!type,
      'is-hit': !!hit,
      [`el-tag--${effect}`]: !!effect,
      [`el-tag--${size}`]: !!size,
      [clazz]: !!clazz
    })}
    {style}
    on:click
    transition:fly={{ y: 5, duration: 200 }}
  >
    <slot />
    {#if closable}
      <i class="el-tag__close el-icon-close" on:click={handleClose} />
    {/if}
  </span>
{:else}
  <span
    bind:this={element}
    class={clsx({
      'el-tag': true,
      [`el-tag--${type}`]: !!type,
      'is-hit': !!hit,
      [`el-tag--${effect}`]: !!effect,
      [`el-tag--${size}`]: !!size,
      [clazz]: !!clazz
    })}
    {style}
    on:click
  >
    <slot />
    {#if closable}
      <i class="el-tag__close el-icon-close" on:click={handleClose} />
    {/if}
  </span>
{/if}
