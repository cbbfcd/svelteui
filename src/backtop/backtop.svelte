<script>
  import { onMount, createEventDispatcher } from 'svelte/internal';
  import { fade } from 'svelte/transition';
  import throttle from 'lodash-es/throttle';
  import CaretTop from 'svelteui-icons/lib/CaretTop';

  import Icon from '../icon';
  import { on, off } from '../utils/dom';
  import { clsx } from '../utils/clsx';
  import { throwError } from '../utils/error';
  import { easeInOutCubic } from '../utils/animation';

  const dispatch = createEventDispatcher();

  export let visibilityHeight = 200;
  export let target = '';
  export let right = 40;
  export let bottom = 40;

  let element = null;
  let clazz = '';
  let visible = false;
  let container = null;
  let el = null;

  export { clazz as class };

  export function getElement() {
    return element;
  }

  function onScroll() {
    if (el) {
      visible = el.scrollTop >= visibilityHeight;
    }
  }

  function scrollToTop() {
    if (!el) return;
    const beginTime = Date.now();
    const beginValue = el.scrollTop;
    const frameFunc = () => {
      const progress = (Date.now() - beginTime) / 500;
      if (progress < 1) {
        el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
        requestAnimationFrame(frameFunc);
      } else {
        el.scrollTop = 0;
      }
    };
    requestAnimationFrame(frameFunc);
  }

  function handleClick(event) {
    scrollToTop();
    dispatch('click', event);
  }

  const throttledScrollHandler = throttle(onScroll, 300);

  onMount(() => {
    container = document;
    el = document.documentElement;
    if (target) {
      el = document.querySelector(target);
      if (!el) {
        throwError('sele-plus-backtop', `target is not existed: ${target}`);
      }
      container = el;
    }
    on(container, 'scroll', throttledScrollHandler);

    return () => off(container, 'scroll', throttledScrollHandler);
  });

  $: styleBottom = `${bottom}px`;
  $: styleRight = `${right}px`;
  $: style = `right: ${styleRight};bottom:${styleBottom};`;
</script>

{#if visible}
  <div
    class={clsx({
      'el-backtop': true,
      [clazz]: !!clazz
    })}
    {style}
    on:click|stopPropagation={handleClick}
    in:fade
  >
    <slot>
      <Icon class="el-backtop__icon">
        <CaretTop />
      </Icon>
    </slot>
  </div>
{/if}
