<script>
  import { Alert } from '../../src';

  let closable = false;

  function close() {
    alert('close!');
  }
</script>

<div class="show">
  <section>
    <h2>Basic useage</h2>
    <div class="panel">
      <Alert class="item" title="success alert" type="success" />
      <Alert class="item" title="info alert" type="info" />
      <Alert class="item" title="warning alert" type="warning" />
      <Alert title="error alert" type="error" />
    </div>
  </section>

  <section>
    <h2>Theme</h2>
    <div class="panel">
      <Alert class="item" title="success alert" type="success" effect="dark" />
      <Alert class="item" title="info alert" type="info" effect="dark" />
      <Alert class="item" title="warning alert" type="warning" effect="dark" />
      <Alert title="error alert" type="error" effect="dark" />
    </div>
  </section>

  <section>
    <h2>Customizable close button</h2>
    <div class="panel">
      <Alert class="item" title="unclosable alert" type="success" {closable} />
      <Alert
        class="item"
        title="customized close-text"
        type="info"
        closeText="Gotcha"
      />
      <Alert title="alert with callback" type="warning" on:close={close} />
    </div>
  </section>

  <section>
    <h2>With icon</h2>
    <div class="panel">
      <Alert class="item" title="success alert" type="success" showIcon />
      <Alert class="item" title="info alert" type="info" showIcon />
      <Alert class="item" title="warning alert" type="warning" showIcon />
      <Alert class="item" title="error alert" type="error" showIcon />
    </div>
  </section>

  <section>
    <h2>Centered text</h2>
    <div class="panel">
      <Alert
        class="item"
        title="success alert"
        type="success"
        center
        showIcon
      />
      <Alert class="item" title="info alert" type="info" center showIcon />
      <Alert
        class="item"
        title="warning alert"
        type="warning"
        center
        showIcon
      />
      <Alert class="item" title="error alert" type="error" center showIcon />
    </div>
  </section>

  <section>
    <h2>With description</h2>
    <div class="panel">
      <Alert
        class="item"
        title="with description"
        type="success"
        description="This is a description."
      />
    </div>
  </section>

  <section>
    <h2>With icon and description</h2>
    <div class="panel">
      <Alert
        class="item"
        title="success alert"
        type="success"
        description="more text description"
        showIcon
      />
      <Alert
        class="item"
        title="info alert"
        type="info"
        description="more text description"
        showIcon
      />
      <Alert
        class="item"
        title="warning alert"
        type="warning"
        description="more text description"
        showIcon
      />
      <Alert
        class="item"
        title="error alert"
        type="error"
        description="more text description"
        showIcon
      />
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

  :global(.item) {
    margin-bottom: 16px;
  }
</style>
