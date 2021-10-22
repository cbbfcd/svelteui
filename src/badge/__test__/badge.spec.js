/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte';
import Badge from '../badge.svelte';
import TestBadge from './badge-test.svelte';

describe('Test Badge', () => {
  test('has value', () => {
    const { getByText } = render(Badge, {
      props: {
        value: 80
      }
    });

    expect(getByText('80')).toBeInTheDocument();
  });

  test('is fixed', () => {
    const { container } = render(TestBadge, {
      props: {
        value: 10
      }
    });

    expect(container.getElementsByClassName('is-fixed').length).toBe(1);
  });

  test('is dot', () => {
    const { container } = render(TestBadge, {
      props: {
        isDot: true
      }
    });

    expect(container.getElementsByClassName('is-dot').length).toBe(1);
  });

  test('max', () => {
    const { getByText } = render(Badge, {
      props: {
        max: 100,
        value: 200
      }
    });

    expect(getByText('100+')).toBeInTheDocument();

    const { getByText: getByText2 } = render(Badge, {
      props: {
        max: 100,
        value: 80
      }
    });

    expect(getByText2('80')).toBeInTheDocument();
  });
});
