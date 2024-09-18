import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBook from "./AddBook";
import { addBook } from "../services/bookService";

jest.mock("../services/bookService");

describe("AddBook", () => {
  test("submits form with book data", async () => {
    addBook.mockResolvedValueOnce({
      id: 1,
      title: "New Book",
      author: "New Author",
    });

    render(<AddBook />);

    userEvent.type(screen.getByLabelText(/title/i), "New Book");
    userEvent.type(screen.getByLabelText(/author/i), "New Author");

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(addBook).toHaveBeenCalledWith({
        title: "New Book",
        author: "New Author",
      });
    });

    expect(screen.getByText("Book added successfully!")).toBeInTheDocument();
  });

  test("displays error message on submission failure", async () => {
    addBook.mockRejectedValueOnce(new Error("Failed to add book"));

    render(<AddBook />);

    userEvent.type(screen.getByLabelText(/title/i), "New Book");
    userEvent.type(screen.getByLabelText(/author/i), "New Author");

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to add book")).toBeInTheDocument();
    });
  });
});
