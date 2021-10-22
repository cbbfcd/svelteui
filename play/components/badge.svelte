<script>
  import { Badge, Button } from '../../src';
</script>

<div class="show">
  <section>
    <h2>Basic useage</h2>
    <div class="panel">
      <Badge value="12" class="item">
        <Button size="small">comments</Button>
      </Badge>
      <Badge value="3" class="item">
        <Button size="small">replies</Button>
      </Badge>
      <Badge value="1" class="item" type="primary">
        <Button size="small">comments</Button>
      </Badge>
      <Badge value="2" class="item" type="warning">
        <Button size="small">replies</Button>
      </Badge>
    </div>
  </section>

  <section>
    <h2>Max</h2>
    <div class="panel">
      <Badge value="200" max="99" class="item">
        <Button size="small">comments</Button>
      </Badge>
      <Badge value="100" max="10" class="item">
        <Button size="small">replies</Button>
      </Badge>
    </div>
  </section>

  <section>
    <h2>Customizations</h2>
    <div class="panel">
      <Badge value="new" class="item">
        <Button size="small">comments</Button>
      </Badge>
      <Badge value="hot" class="item">
        <Button size="small">replies</Button>
      </Badge>
    </div>
  </section>

  <section>
    <h2>Dot</h2>
    <div class="panel">
      <Badge isDot class="item">query</Badge>
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
    margin-top: 10px;
    margin-right: 40px;
  }
</style>
