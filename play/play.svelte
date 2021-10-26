<script>
  import Router, { link } from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';

  let components = [
    { src: './components/home.svelte', path: '/' },
    { label: 'Button', src: './components/button.svelte', path: '/button' },
    { label: 'Tag', src: './components/tag.svelte', path: '/tag' },
    { label: 'Badge', src: './components/badge.svelte', path: '/badge' },
    { label: 'Icon', src: './components/icon.svelte', path: '/icon' }
  ];

  let routes = components.reduce((curr, next) => {
    curr[next.path] = wrap({
      asyncComponent: () => import(/* @vite-ignore */ next.src)
    });
    return curr;
  }, {});
</script>

<div id="playground">
  <div class="tags">
    {#each components as component (component.src)}
      {#if component.label}
        <a href={component.path} use:link>{component.label}</a>
      {/if}
    {/each}
  </div>
  <div class="content">
    <Router {routes} />
  </div>
</div>

<style>
  #playground {
    padding: 20px;
  }

  #playground .tags {
    height: 120px;
    border-bottom: 1px solid #eee;
  }

  #playground .tags a {
    margin-right: 12px;
    text-decoration: none;
    padding: 4px 8px;
    background: #e6f7ff;
    border-color: #91d5ff;
    cursor: pointer;
    border-radius: 4px;
    color: #1890ff;
  }

  #playground .content {
    padding: 12px 16px;
  }
</style>
