<script>
  import { ButtonGroup, Button } from '../../src';
</script>

<div class="show">
  <section>
    <h2>Button Group</h2>
    <div class="panel">
      <ButtonGroup>
        <Button type="primary" icon="el-icon-arrow-left">Previous Page</Button>
        <Button type="primary">Next Page<i class="el-icon-arrow-right el-icon-right" /></Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button type="primary" icon="el-icon-edit" />
        <Button type="primary" icon="el-icon-share" />
        <Button type="primary" icon="el-icon-delete" />
      </ButtonGroup>
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
