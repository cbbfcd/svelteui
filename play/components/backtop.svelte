<script>
  import { Backtop } from '../../src';
</script>

<div class="show">
  <section>
    <h2>Basic useage</h2>
    <div class="panel">
      <p>Scroll down to see the bottom-right button.</p>
      <Backtop />
    </div>
  </section>

  <section>
    <h2>Customizations</h2>
    <p>Scroll down to see the bottom-right button.</p>
    <div class="panel">
      <Backtop bottom={100}>
        <div
          style="
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          "
        >
          UP
        </div>
      </Backtop>
    </div>
  </section>
</div>

<style>
  .show {
    display: flex;
    flex-direction: column;
    height: 2000px;
  }

  .show > section {
    margin-bottom: 24px;
  }

  .show > section > .panel {
    margin-bottom: 24px;
  }
</style>
