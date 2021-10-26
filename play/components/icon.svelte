<script>
  import Edit from 'svelteui-icons/lib/Edit';
  import Share from 'svelteui-icons/lib/Share';
  import Delete from 'svelteui-icons/lib/Delete';
  import Loading from 'svelteui-icons/lib/Loading';
  import Search from 'svelteui-icons/lib/Search';
  import { Icon, Button } from '../../src';
</script>

<div class="show">
  <section>
    <h2>Basic useage</h2>
    <div class="panel">
      <Icon size="20" color="red">
        <Edit />
      </Icon>
      <Edit style="width: 20px; color: steelblue;" />
    </div>
  </section>

  <section>
    <h2>Combined with Icon</h2>
    <p>
      with extra class <b>is-loading</b>, your icon is able to rotate 360 deg in
      2 seconds, you can also override this
    </p>
    <div class="panel">
      <Icon size="20">
        <Edit />
      </Icon>
      <Icon color="#409EFC" class="no-inherit">
        <Share />
      </Icon>
      <Icon>
        <Delete />
      </Icon>
      <Icon class="is-loading">
        <Loading />
      </Icon>
      <Button type="primary">
        <Icon style="vertical-align: middle;">
          <Search />
        </Icon>
        <span style="vertical-align: middle;"> Search </span>
      </Button>
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
