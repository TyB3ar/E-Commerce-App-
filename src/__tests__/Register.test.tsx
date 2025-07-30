import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../firebase/Register"; 
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { BrowserRouter } from "react-router-dom";

beforeAll(() => {
    window.alert = jest.fn(); 
})

// Mock react-router useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Mock Firebase auth and firestore functions
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({})), 
    createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getFirestore: jest.fn(() => ({})), 
}));

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("updates input states and calls Firebase on submit", async () => {
    const mockCreateUser = firebaseAuth.createUserWithEmailAndPassword as jest.Mock;
    const mockSetDoc = firestore.setDoc as jest.Mock;
    const mockDoc = firestore.doc as jest.Mock;

    // Mock return values
    mockCreateUser.mockResolvedValue({
      user: { uid: "user123" },
    });
    mockDoc.mockReturnValue("fake-doc-ref");
    mockSetDoc.mockResolvedValue(undefined);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill inputs
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/address/i), { target: { value: "123 Main St" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "secret123" } });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    // Wait for async actions
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.anything(), // auth instance
        "alice@example.com",
        "secret123"
      );
    });

    expect(mockDoc).toHaveBeenCalledWith(expect.anything(), "users", "user123");

    expect(mockSetDoc).toHaveBeenCalledWith("fake-doc-ref", expect.objectContaining({
      email: "alice@example.com",
      name: "Alice",
      address: "123 Main St",
      createdAt: expect.any(Date),
    }));
  });

  test("displays error message when registration fails", async () => {
    const mockCreateUser = firebaseAuth.createUserWithEmailAndPassword as jest.Mock;
    mockCreateUser.mockRejectedValue(new Error("Failed to register"));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "bad@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "badpass" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to register/i)).toBeInTheDocument();
    });
  });
});
