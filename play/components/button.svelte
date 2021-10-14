<script>
  import { Button } from '../../src';

  const handleClick = () => alert('hello svelteui button!');
</script>

<div class="show">
  <section>
    <h2>Basic useage</h2>
    <div class="panel">
      <Button on:click={handleClick}>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="info">Info</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">Danger</Button>
    </div>

    <div class="panel">
      <Button plain>Plain</Button>
      <Button type="primary" plain>Primary</Button>
      <Button type="success" plain>Success</Button>
      <Button type="info" plain>Info</Button>
      <Button type="warning" plain>Warning</Button>
      <Button type="danger" plain>Danger</Button>
    </div>

    <div class="panel">
      <Button round>Round</Button>
      <Button type="primary" round>Primary</Button>
      <Button type="success" round>Success</Button>
      <Button type="info" round>Info</Button>
      <Button type="warning" round>Warning</Button>
      <Button type="danger" round>Danger</Button>
    </div>

    <div class="panel">
      <Button icon="el-icon-search" circle />
      <Button type="primary" icon="el-icon-edit" circle />
      <Button type="success" icon="el-icon-check" circle />
      <Button type="info" icon="el-icon-message" circle />
      <Button type="warning" icon="el-icon-star-off" circle />
      <Button type="danger" icon="el-icon-delete" circle />
    </div>
  </section>

  <section>
    <h2>Disabled Button</h2>
    <div class="panel">
      <Button disabled>Default</Button>
      <Button type="primary" disabled>Primary</Button>
      <Button type="success" disabled>Success</Button>
      <Button type="info" disabled>Info</Button>
      <Button type="warning" disabled>Warning</Button>
      <Button type="danger" disabled>Danger</Button>
    </div>

    <div class="panel">
      <Button icon="el-icon-search" circle disabled />
      <Button type="primary" icon="el-icon-edit" circle disabled />
      <Button type="success" icon="el-icon-check" circle disabled />
      <Button type="info" icon="el-icon-message" circle disabled />
      <Button type="warning" icon="el-icon-star-off" circle disabled />
      <Button type="danger" icon="el-icon-delete" circle disabled />
    </div>
  </section>

  <section>
    <h2>Text Button</h2>
    <div class="panel">
      <Button type="text">Text Button</Button>
      <Button type="text" disabled>Text Button</Button>
    </div>
  </section>

  <section>
    <h2>Icon Button</h2>
    <div class="panel">
      <Button type="primary" icon="el-icon-edit" />
      <Button type="primary" icon="el-icon-share" />
      <Button type="primary" icon="el-icon-delete" />
      <Button type="primary" icon="el-icon-search">Search</Button>
      <Button type="primary">
        Upload<i class="el-icon-upload el-icon-right" />
      </Button>
    </div>
  </section>

  <section>
    <h2>Loading Button</h2>
    <div class="panel">
      <Button type="primary" loading={true}>Loading</Button>
    </div>
  </section>

  <section>
    <h2>Sizes</h2>
    <div class="panel">
      <Button>Default</Button>
      <Button size="medium">Medium</Button>
      <Button size="small">Small</Button>
      <Button size="mini">Mini</Button>
    </div>
    <div class="panel">
      <Button round>Default</Button>
      <Button size="medium" round>Medium</Button>
      <Button size="small" round>Small</Button>
      <Button size="mini" round>Mini</Button>
    </div>
    <div class="panel">
      <Button icon="el-icon-search" circle />
      <Button icon="el-icon-search" size="medium" circle />
      <Button icon="el-icon-search" size="small" circle />
      <Button icon="el-icon-search" size="mini" circle />
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
