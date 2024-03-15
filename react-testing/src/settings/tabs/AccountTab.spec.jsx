import React from "react";
import { render, screen, fireEvent, waitFor } from "@/test";
import { describe, expect, test, vi } from "vitest";
import { AccountTab } from "./AccountTab";

// Task 3: finish tests for AccountTab.
// You can remove the default values if needed (name Cianca and username dinos1337).
// Also feel free to change one of the inputs to be of another type, such as email, or to add any other inputs and validators.
// Acceptance criteria:
// 1) Use fireEvent or userEvent to fill input values.
// Take into account that validation errors will appear once you submit AND form validation happens asynchronously.

describe("AccountTab", () => {
  test("should match snapshot", () => {
    const { container } = render(<AccountTab />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("submitting calls console.log with expected arguments", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<AccountTab />);

    fireEvent.input(screen.getByPlaceholderText("name"), {
      target: { value: "Nico Ulmete" },
    });

    fireEvent.input(screen.getByPlaceholderText("email"), {
      target: { value: "nico.ulmete@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        values: {
          name: "Nico Ulmete",
          email: "nico.ulmete@example.com",
        },
      });
    });

    consoleSpy.mockRestore();
  });
});
