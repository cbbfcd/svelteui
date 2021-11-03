/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/svelte';
import Alert from '../alert.svelte';

const AXIOM = 'hello world';

describe('Test Alert', () => {
  test('render test & class', () => {
    const { container } = render(Alert, {
      props: {
        title: AXIOM,
        showIcon: true
      }
    });

    expect(container.querySelector('.el-alert__title')).toBeInTheDocument();
    expect(container.querySelector('.el-alert__title').textContent).toEqual(
      AXIOM
    );
    expect(container.querySelector('.el-alert--info')).toBeInTheDocument();
  });

  test('type', () => {
    const { container } = render(Alert, {
      props: {
        title: 'test',
        type: 'success',
        showIcon: true
      }
    });

    expect(container.querySelector('.el-alert--success')).toBeInTheDocument();
    expect(container.querySelector('.el-alert__icon')).toBeInTheDocument();
  });

  test('description', () => {
    const { container } = render(Alert, {
      props: {
        title: 'test',
        description: AXIOM,
        showIcon: true
      }
    });

    expect(
      container.querySelector('.el-alert__description')
    ).toBeInTheDocument();
  });

  test('theme', () => {
    const { container } = render(Alert, {
      props: {
        title: 'test',
        effect: 'dark'
      }
    });

    expect(container.querySelector('.is-dark')).toBeInTheDocument();
  });

  test('close', async () => {
    const mock = jest.fn();

    const { container, component } = render(Alert, {
      props: {
        closeText: 'close'
      }
    });

    component.$on('close', mock);

    await fireEvent.click(container.querySelector('.el-alert__closebtn'));
    expect(mock).toHaveBeenCalled();
  });
});
