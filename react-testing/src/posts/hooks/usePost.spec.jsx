// Task 1: test the usePost hook here.
// Acceptance criteria:
// 1) Include a test that intercepts the post by id request and assert the returned data has the correct structure.
// 2) Include a test that covers passing extra arguments to usePost
// (e.g. when passing enabled = true, assert that the useQuery hook is called
// with an object that contains enabled: true).

import { describe, expect, test } from "vitest";
import { createReactQueryWrapper, renderHook, server, waitFor } from "@/test";
import { usePost } from "./usePost";
import { http, HttpResponse } from "msw";
import { successResponse } from "../__mocks__";

describe("usePost", () => {
    test("should retrieve post", async () => {
      server.use(
        http.get(`https://jsonplaceholder.typicode.com/posts/1`, () => {
          return HttpResponse.json(successResponse[0]);
        })
      );
  
      const { result } = renderHook(() => usePost(1), {
        wrapper: createReactQueryWrapper(),
      });
  
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
      expect(result.current.data).toEqual(successResponse[0]);
    });

    test("usePost hook fetches data when 'enabled: true'", async () => {
        let requestMade;
        server.use(
            http.get(`https://jsonplaceholder.typicode.com/posts/1`, (req, res, ctx) => {
                requestMade = true;
                return res(ctx.json(successResponse[0]));
            })
        );

        const { result } = renderHook(() => usePost(1, { enabled: true }), {
            wrapper: createReactQueryWrapper(),
        });

        await waitFor(() => expect(requestMade).toBe(true));
        expect(result.current.data).toEqual(undefined);
    });
  });