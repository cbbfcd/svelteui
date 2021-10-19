/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from '@testing-library/svelte';
import Tag from '../tag.svelte';

describe('test Tag', () => {
  test('test type property', () => {
    const { container } = render(Tag, {
      props: {
        type: 'primary'
      }
    });

    expect(container.getElementsByClassName('el-tag--primary').length).toBe(1);
  });

  test('test hit property', () => {
    const { container } = render(Tag, {
      props: {
        hit: true
      }
    });

    expect(container.getElementsByClassName('is-hit').length).toBe(1);
  });

  test('test closable', async () => {
    const mock = jest.fn();
    const { container, component } = render(Tag, {
      props: {
        closable: true
      }
    });

    component.$on('close', mock);
    const closeBtn = container.getElementsByClassName('el-tag__close')[0];

    await fireEvent.click(closeBtn);
    expect(container.getElementsByClassName('el-tag__close').length).toBe(1);
    expect(mock).toHaveBeenCalled();
  });

  test('test color', () => {
    const { container } = render(Tag, {
      props: {
        color: 'rgb(0, 0, 0)'
      }
    });

    expect(container.querySelector('.el-tag').style.backgroundColor).toEqual(
      'rgb(0, 0, 0)'
    );
  });

  test('test theme', () => {
    const { container } = render(Tag, {
      props: {
        effect: 'dark'
      }
    });

    expect(container.getElementsByClassName('el-tag--dark').length).toBe(1);
    expect(container.getElementsByClassName('el-tag--light').length).toBe(0);
  });
});
