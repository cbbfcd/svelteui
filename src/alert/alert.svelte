<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import SuccessFilled from 'svelteui-icons/lib/SuccessFilled';
  import WarningFilled from 'svelteui-icons/lib/WarningFilled';
  import CircleCloseFilled from 'svelteui-icons/lib/CircleCloseFilled';
  import InfoFilled from 'svelteui-icons/lib/InfoFilled';
  import Close from 'svelteui-icons/lib/Close';

  import Icon from '../icon';
  import { clsx } from '../utils/clsx';

  const dispatch = createEventDispatcher();
  const TypeComponentsMap = {
    success: SuccessFilled,
    warning: WarningFilled,
    error: CircleCloseFilled,
    info: InfoFilled
  };

  export let title = '';
  export let description = '';
  export let type = 'info';
  export let closable = true;
  export let closeText = '';
  export let showIcon = false;
  export let center = false;
  export let effect = 'light';
  export let fadeParams = { delay: 0, duration: 200 };

  let clazz = '';
  let element = null;
  let visible = true;

  export function getElement() {
    return element;
  }
  export { clazz as class };

  function handleClose(evt) {
    visible = false;
    dispatch('close', evt);
  }

  $: typeCls = 'el-alert--' + type;
  $: isBigIcon = description || $$slots.default ? 'is-big' : '';
  $: isBoldTitle = description || $$slots.default ? 'is-bold' : '';
</script>

{#if visible}
  <div
    bind:this={element}
    class={clsx({
      'el-alert': true,
      'is-center': center,
      ['is-' + effect]: effect,
      [typeCls]: !!type,
      [clazz]: !!clazz
    })}
    role="alert"
    out:fade={fadeParams}
  >
    {#if showIcon}
      <Icon
        class={clsx({
          'el-alert__icon': true,
          [isBigIcon]: !!isBigIcon
        })}
      >
        <svelte:component this={TypeComponentsMap[type]} />
      </Icon>
    {/if}
    <div class="el-alert__content">
      {#if $$slots.title || title}
        <span
          class={clsx({
            'el-alert__title': true,
            [isBoldTitle]: !!isBoldTitle
          })}
        >
          <slot name="title">{title}</slot>
        </span>
      {/if}
      {#if $$slots.default || description}
        <p class="el-alert__description">
          <slot>
            {description}
          </slot>
        </p>
      {/if}
      {#if closable}
        {#if closeText}
          <div class="el-alert__closebtn is-customed" on:click={handleClose}>
            {closeText}
          </div>
        {:else}
          <Icon class="el-alert__closebtn" on:click={handleClose}>
            <Close />
          </Icon>
        {/if}
      {/if}
    </div>
  </div>
{/if}
