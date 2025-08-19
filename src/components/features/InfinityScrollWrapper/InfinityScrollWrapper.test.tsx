import { render, screen } from '@testing-library/react';

import InfinityScrollWrapper from '@/components/features/InfinityScrollWrapper/InfinityScrollWrapper';

const mockObserve = jest.fn();
const mockUnobserve = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

beforeAll(() => {
  (global as any).IntersectionObserver = jest.fn(() => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('InfinityScrollWrapper', () => {
  it('should render children', () => {
    render(
      <InfinityScrollWrapper onLoadMore={jest.fn()}>
        <div data-testid="child">Content</div>
      </InfinityScrollWrapper>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render loader when additionalConditions is true', () => {
    render(
      <InfinityScrollWrapper onLoadMore={jest.fn()}>
        <div>Test</div>
      </InfinityScrollWrapper>,
    );

    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('should NOT render loader when additionalConditions is false', () => {
    render(
      <InfinityScrollWrapper
        onLoadMore={jest.fn()}
        additionalConditions={false}
      >
        <div>Test</div>
      </InfinityScrollWrapper>,
    );

    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });

  it('should observe the target element on mount', () => {
    render(
      <InfinityScrollWrapper onLoadMore={jest.fn()}>
        <div>Test</div>
      </InfinityScrollWrapper>,
    );

    expect(mockObserve).toHaveBeenCalledTimes(1);
  });

  it('should unobserve the target element on unmount', () => {
    const { unmount } = render(
      <InfinityScrollWrapper onLoadMore={jest.fn()}>
        <div>Test</div>
      </InfinityScrollWrapper>,
    );

    unmount();

    expect(mockUnobserve).toHaveBeenCalledTimes(1);
  });

  it('should call onLoadMore when target is intersecting and additionalConditions is true', () => {
    const onLoadMoreMock = jest.fn();

    let callback: IntersectionObserverCallback = () => {};
    (global as any).IntersectionObserver = jest.fn((_cb) => {
      callback = _cb;

      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: jest.fn(),
      };
    });

    render(
      <InfinityScrollWrapper onLoadMore={onLoadMoreMock}>
        <div>Test</div>
      </InfinityScrollWrapper>,
    );

    callback(
      [
        {
          isIntersecting: true,
          target: document.createElement('div'),
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );

    expect(onLoadMoreMock).toHaveBeenCalledTimes(1);
  });

  it('should NOT call onLoadMore when additionalConditions is false', () => {
    const onLoadMoreMock = jest.fn();

    let callback: IntersectionObserverCallback = () => {};
    (global as any).IntersectionObserver = jest.fn((_cb) => {
      callback = _cb;

      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: jest.fn(),
      };
    });

    render(
      <InfinityScrollWrapper
        onLoadMore={onLoadMoreMock}
        additionalConditions={false}
      >
        <div>Test</div>
      </InfinityScrollWrapper>,
    );

    callback(
      [
        {
          isIntersecting: true,
          target: document.createElement('div'),
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );

    expect(onLoadMoreMock).not.toHaveBeenCalled();
  });
});
