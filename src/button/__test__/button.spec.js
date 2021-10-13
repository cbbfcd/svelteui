/**
 * @jest-environment jsdom
 */
import { render, cleanup, fireEvent } from '@testing-library/svelte';
import Button from '../button.svelte';

beforeEach(cleanup);

describe('Button', () => {
  test('test an exported function', () => {
    const { component } = render(Button, {
      props: { type: 'primary' }
    });

    expect(component.getElement()).toBeInTheDocument();
  });

  test('test a button with primary type property', () => {
    const { container } = render(Button, {
      props: { type: 'primary' }
    });

    expect(container.getElementsByClassName('el-button--primary').length).toBe(
      1
    );
  });

  test('test a button with icon property', () => {
    const { container } = render(Button, {
      props: { icon: 'el-icon-search' }
    });

    expect(container.getElementsByClassName('el-icon-search').length).toBe(1);
  });

  test('test a button with nativeType property', () => {
    const { container } = render(Button, {
      props: { nativeType: 'submit' }
    });

    expect(container.querySelector('button').getAttribute('type')).toBe(
      'submit'
    );
  });

  test('test a button with loading property', () => {
    const { container } = render(Button, {
      props: { loading: true }
    });

    expect(container.getElementsByClassName('is-loading').length).toBe(1);
    expect(container.getElementsByClassName('el-icon-loading').length).toBe(1);
  });

  test('test a button with size property', () => {
    const { container } = render(Button, {
      props: { size: 'medium' }
    });

    expect(container.getElementsByClassName('el-button--medium').length).toBe(
      1
    );
  });

  test('test a button with plain property', () => {
    const { container } = render(Button, {
      props: { plain: true }
    });

    expect(container.getElementsByClassName('is-plain').length).toBe(1);
  });

  test('test a button with round property', () => {
    const { container } = render(Button, {
      props: { round: true }
    });

    expect(container.getElementsByClassName('is-round').length).toBe(1);
  });

  test('test a button with circle property', () => {
    const { container } = render(Button, {
      props: { circle: true }
    });

    expect(container.getElementsByClassName('is-circle').length).toBe(1);
  });

  test('test a button with disabled property', async () => {
    const { container } = render(Button, {
      props: {
        disabled: true
      }
    });
    const btn = container.querySelector('button');
    expect(container.getElementsByClassName('is-disabled').length).toBe(1);
    expect(btn).toHaveAttribute('disabled');
    expect(btn).toBeDisabled();
  });

  test('test a button with loading implies disabled', async () => {
    const { container } = render(Button, {
      props: { loading: true }
    });
    const btn = container.querySelector('button');
    expect(btn).toHaveAttribute('disabled');
    expect(btn).toBeDisabled();
  });

  test('test button with click event', async () => {
    const click = jest.fn();
    const { container, component } = render(Button);
    component.$on('click', click);
    const btn = container.querySelector('button');
    await fireEvent.click(btn);
    expect(click).toHaveBeenCalledTimes(1);
    await fireEvent.click(btn);
    expect(click).toHaveBeenCalledTimes(2);
  });
});
