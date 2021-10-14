/**
 * @jest-environment jsdom
 */
import { render, cleanup } from '@testing-library/svelte';
import ButtonGroup from '../button-group.svelte';

beforeEach(cleanup);

describe('Button Group', () => {
  test('basic', () => {
    const { container } = render(ButtonGroup);

    expect(container.getElementsByClassName('el-button-group').length).toBe(1);
  });
});
