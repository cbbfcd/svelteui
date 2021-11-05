/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from '@testing-library/svelte';
import Test from './test.svelte';

describe('BackTop Test', () => {
  test('render', async () => {
    const { container } = render(Test);

    expect(container.getElementsByClassName('el-backtop').length).toBe(0);
    const wrapper = container.querySelector('.app');
    wrapper.scrollTop = 2000;

    await fireEvent.scroll(wrapper);

    expect(container.querySelector('.el-backtop')).toBeInTheDocument();
    expect(container.querySelector('.el-backtop__icon')).toBeInTheDocument();
  });
});
