import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, fireEvent } from "@/test";
import { MemoryRouter } from "react-router-dom";
import { Post } from "./Post";
import { usePost } from "./hooks";
import { successResponse as mockedPost } from "./__mocks__";

vi.mock("./hooks/usePost", () => ({
  usePost: vi.fn(),
}));

vi.mock("@/components/ui/use-toast", () => ({
  useToast: vi.fn(() => ({ toast: vi.fn() })),
}));

const mockedClipboard = vi.fn(() => Promise.resolve());
Object.assign(navigator, {
  clipboard: {
    writeText: mockedClipboard,
  },
});

vi.mock("lucide-react", () => {
  return {
    ArrowBigLeftIcon: (props) => <div {...props}>ArrowBigLeftIcon</div>,
    Share2Icon: (props) => <div {...props}>Share2Icon</div>,
  };
});

describe("Post", () => {
  test("should match snapshot for a single post", async () => {
    usePost.mockReturnValue({
      status: "success",
      data: mockedPost[0],
    });

    const { container } = render(<Post />, { wrapper: MemoryRouter });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should match snapshot for loading status", async () => {
    usePost.mockReturnValue({
      status: "pending",
    });

    const { container } = render(<Post />, { wrapper: MemoryRouter });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should match snapshot for error status", async () => {
    usePost.mockReturnValue({
      status: "error",
      error: new Error("An error occurred!"),
    });

    const { container } = render(<Post />, { wrapper: MemoryRouter });
    expect(container.firstChild).toMatchSnapshot();
  });

  test("copy to clipboard functionality triggers toast notification", async () => {
    usePost.mockReturnValue({
      status: "success",
      data: mockedPost[0],
    });

    const { getByRole } = render(<Post />, { wrapper: MemoryRouter });

    const shareButton = getByRole("button");

    await fireEvent.click(shareButton);

    expect(mockedClipboard).toHaveBeenCalledWith(
      expect.stringContaining("localhost")
    );
  });
});
