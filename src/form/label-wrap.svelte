<script>
  import { onMount, beforeUpdate, getContext, tick } from 'svelte';
  import {
    UND,
    SVELTEUI_FORM_KEY,
    SVELTEUI_FORM_ITEM_KEY
  } from '../utils/constants';
  import {
    addResizeListener,
    removeResizeListener
  } from '../utils/resize-event';

  const elForm = getContext(SVELTEUI_FORM_KEY);
  const elFormItem = getContext(SVELTEUI_FORM_ITEM_KEY);

  export let isAutoWidth = UND;
  export let updateAll = UND;

  let el = null;
  let style = UND;
  let computedWidth = 0;
  let preComputedWidth = 0;

  function getLabelWidth() {
    if (el && el.firstElementChild) {
      const width = window.getComputedStyle(el.firstElementChild).width;
      return Math.ceil(parseFloat(width));
    } else {
      return 0;
    }
  }

  async function updateLabelWidth(action = 'update') {
    await tick();
    () => {
      if ($$slots.default && isAutoWidth) {
        if (action === 'update') {
          computedWidth = getLabelWidth();
        } else if (action === 'remove') {
          elForm.deregisterLabelWidth(computedWidth);
        }
      }
    };
  }

  function updateLabelWidthFn() {
    updateLabelWidth('update');
  }

  onMount(() => {
    el && addResizeListener(el.firstElementChild, updateLabelWidthFn);
    updateLabelWidthFn();

    return () => {
      updateLabelWidth('remove');
      el && removeResizeListener(el.firstElementChild, updateLabelWidthFn);
    };
  });

  beforeUpdate(updateLabelWidthFn);

  $: {
    if (updateAll) {
      elForm.registerLabelWidth &&
        elForm.registerLabelWidth(computedWidth, preComputedWidth);
      elFormItem.updateComputedLabelWidth &&
        elFormItem.updateComputedLabelWidth(computedWidth);
      preComputedWidth = computedWidth;
    }
  }

  $: {
    if (isAutoWidth) {
      const autoLabelWidth = elForm.autoLabelWidth;
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginWidth = Math.max(
          0,
          parseInt(autoLabelWidth, 10) - computedWidth
        );
        const marginPosition =
          elForm.labelPosition === 'left' ? 'margin-right' : 'margin-left';
        if (marginWidth) {
          style = `${marginPosition}: ${marginWidth}px;`;
        }
      }
    }
  }
</script>

{#if $$slots.default}
  {#if isAutoWidth}
    <div bind:this={el} class="el-form-item__label-wrap" {style}>
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
{:else}
  <!-- render nothing -->
{/if}
