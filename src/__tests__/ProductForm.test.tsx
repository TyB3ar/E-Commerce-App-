import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductForm from "../products/ProductForm";
import type { Product } from "../types/product"; 
import "@testing-library/jest-dom";

// Mock window.alert to prevent JSDOM errors
beforeAll(() => {
  window.alert = jest.fn();
});

describe("ProductForm", () => {
  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<ProductForm onSave={mockOnSave} onClose={mockOnClose} />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/category/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/image url/i)).toBeInTheDocument();
  });

  it("fills out form and submits new product", async () => {
    render(<ProductForm onSave={mockOnSave} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "Test Product" },
    });
    fireEvent.change(screen.getByPlaceholderText(/price/i), {
      target: { value: "29.99" },
    });
    fireEvent.change(screen.getByPlaceholderText(/category/i), {
      target: { value: "Electronics" },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: "A great test product." },
    });
    fireEvent.change(screen.getByPlaceholderText(/image url/i), {
      target: { value: "https://example.com/image.jpg" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() =>
      expect(mockOnSave).toHaveBeenCalledWith({
        title: "Test Product",
        price: 29.99,
        category: "Electronics",
        description: "A great test product.",
        image: "https://example.com/image.jpg",
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("submits edited product with ID", async () => {
    const existingProduct: Product = {
      id: "123",
      title: "Old Product",
      price: 10,
      category: "Old",
      description: "Old Desc",
      image: "old.jpg",
    };

    render(
      <ProductForm
        product={existingProduct}
        onSave={mockOnSave}
        onClose={mockOnClose}
      />
    );

    // Modify title
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "Updated Product" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() =>
      expect(mockOnSave).toHaveBeenCalledWith({
        id: "123",
        title: "Updated Product",
        price: 10,
        category: "Old",
        description: "Old Desc",
        image: "old.jpg",
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("shows alert and prevents submission with invalid price", async () => {
    render(<ProductForm onSave={mockOnSave} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: "Invalid Product" },
    });
    fireEvent.change(screen.getByPlaceholderText(/price/i), {
      target: { value: "-5" }, // Invalid price
    });
    fireEvent.change(screen.getByPlaceholderText(/category/i), {
      target: { value: "Toys" },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: "Bad price" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() =>
      expect(mockOnSave).not.toHaveBeenCalled()
    );
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter a valid positive price (e.g. 19.99)"
    );
  });
});
