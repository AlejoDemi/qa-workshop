// Task 4: test the PasswordTab component here, aiming for 100% coverage.
// Acceptance criteria:
// 1) Add form validation that makes sense, as a minimum:

// - `New password` can't be equal to `Current password`.
// - `New password` must match the `Repeat new password`.

// To build the form and the validation schema, you can follow a similar approach as in the AccountTab component.

// 2) When the form has no errors and is submitted, show a toast with:

// - Title: `Success`.
// - Text: `Password changed`.

// 3) Add tests aiming to cover all the functionality.
import React from "react";
import { render, screen, fireEvent, waitFor } from "@/test";
import { describe, expect, test, vi } from "vitest";
import { PasswordTab } from "./PasswordTab";

const mockToast = vi.fn();
vi.mock("@/components/ui/use-toast", () => ({
  useToast: vi.fn(() => ({
    toast: mockToast,
  })),
}));

describe("PasswordTab", () => {

  test("displays validation errors for password fields", async () => {
    render(<PasswordTab />);
    fireEvent.click(screen.getByText("Save password"));

    await waitFor(() => {
      expect(
        screen.getByText("Current password is required")
      ).toBeInTheDocument();
      expect(screen.getByText("New password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Repeat new password is required")
      ).toBeInTheDocument();
    });
  });

  test("displays an error if new password and repeat new password do not match", async () => {
    render(<PasswordTab />);
    fireEvent.input(screen.getByLabelText("Current password"), {
      target: { value: "current123" },
    });
    fireEvent.input(screen.getByLabelText("New password"), {
      target: { value: "new123" },
    });
    fireEvent.input(screen.getByLabelText("Repeat new password"), {
      target: { value: "new124" },
    });
    fireEvent.click(screen.getByText("Save password"));

    await waitFor(() => {
      expect(screen.getByText("New passwords must match")).toBeInTheDocument();
    });
  });

  test("displays an error if new password is the same as current password", async () => {
    render(<PasswordTab />);
    fireEvent.input(screen.getByLabelText("Current password"), {
      target: { value: "samepassword" },
    });
    fireEvent.input(screen.getByLabelText("New password"), {
      target: { value: "samepassword" },
    });
    fireEvent.input(screen.getByLabelText("Repeat new password"), {
      target: { value: "samepassword" },
    });
    fireEvent.click(screen.getByText("Save password"));

    await waitFor(() => {
      expect(
        screen.getByText("New password can't be the same as current password")
      ).toBeInTheDocument();
    });
  });

  test("shows toast on successful password change", async () => {
    const { getByRole } = render(<PasswordTab />);
    await fireEvent.input(screen.getByLabelText("Current password"), {
      target: { value: "current123" },
    });
    await fireEvent.input(screen.getByLabelText("New password"), {
      target: { value: "newpassword123" },
    });
    await fireEvent.input(screen.getByLabelText("Repeat new password"), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(getByRole("button", { name: "Save password" }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        description: "Password changed",
        status: "success",
        title: "Success",
      });
    });
  });
});
