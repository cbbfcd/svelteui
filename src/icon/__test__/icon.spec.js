/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte';
import Icon from '../icon.svelte';

describe('test Icon', () => {
  test('render', () => {
    const { container } = render(Icon, {
      props: {
        color: '#000000',
        size: 18
      }
    });
    expect(container.innerHTML).toContain(`--color: #000000`);
    expect(container.innerHTML).toContain(`--font-size: 18px`);
  });
});
