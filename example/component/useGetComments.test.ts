import { renderHook, act, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import useGetComments from "./useGetComments";

const mockCallbacks: IntersectionObserverCallback[] = [];

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback) {
    mockCallbacks.push(callback);
  }

  observe(target: Element): void {}
  unobserve(target: Element): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

(global as any).IntersectionObserver = MockIntersectionObserver;

// This sets up the mock adapter on the default instance
const mock = new MockAdapter(axios);

describe("useGetComments", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch comments on initial render", async () => {
    const { result } = renderHook(() => useGetComments());

    const mockData = [
      {
        postId: 1,
        id: 1,
        name: "Comment 1",
        email: "test1@example.com",
        body: "Body 1",
      },
      // ... other mock comments
    ];

    mock
      .onGet("https://jsonplaceholder.typicode.com/comments?postId=1")
      .reply(200, mockData);

    expect(result.current.loading).toBe(true);

    waitFor(() => {
      expect(result.current.comments).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should increment postId when an element intersects", async () => {
    const { result } = renderHook(() => useGetComments());

    // 使用 act 來模擬交互事件
    act(() => {
      if (mockCallbacks.length > 0) {
        mockCallbacks[0](
          [{ isIntersecting: true } as IntersectionObserverEntry],
          {} as IntersectionObserver
        );
      }
    });
    waitFor(() => {
      expect(result.current.postId).toBe(2);
    });
  });
  // You can also add tests to handle error responses, test intersection observer behavior, etc.
});
