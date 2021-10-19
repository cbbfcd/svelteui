<script>
  import { Tag } from '../../src';

  const handleClick = () => alert('hello svelteui tag!');
</script>

<div class="show">
  <section>
    <h2>Basic useage</h2>
    <div class="panel">
      <Tag on:click={handleClick}>Tag 1</Tag>
      <Tag type="success">Tag 2</Tag>
      <Tag type="info">Tag 3</Tag>
      <Tag type="warning">Tag 4</Tag>
      <Tag type="danger">Tag 5</Tag>
    </div>
  </section>

  <section>
    <h2>Closeable Tag</h2>
    <div class="panel">
      <Tag closable on:close={() => alert('close tag')}>Test</Tag>
    </div>
  </section>

  <section>
    <h2>Size</h2>
    <div class="panel">
      <Tag size="large">large</Tag>
      <Tag size="medium">medium</Tag>
      <Tag size="small">small</Tag>
      <Tag size="mini">mini</Tag>
    </div>
  </section>

  <section>
    <h2>Themw</h2>
    <div class="panel">
      <Tag effect="dark">dark theme</Tag>
      <Tag effect="light">light theme</Tag>
      <Tag effect="plain">plain theme</Tag>
    </div>
  </section>
</div>

<style>
  .show {
    display: flex;
    flex-direction: column;
  }

  .show > section {
    margin-bottom: 24px;
  }

  .show > section > .panel {
    margin-bottom: 24px;
  }
</style>
