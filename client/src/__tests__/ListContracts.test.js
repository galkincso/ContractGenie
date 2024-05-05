import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ListContract from '../pages/ListContract';
import "@testing-library/jest-dom";
import React, { isValidElement } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Home from '../pages/Home';

export function renderWithRouter(children, routes = []) {
  const options = isValidElement(children)
    ? { element: children, path: "/" }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return render(<RouterProvider router={router} />);
}

describe ("ListContracts", () => {

    it("ListContract page renders", () => {
        renderWithRouter(<ListContract />);

        expect(screen.getByText(/Szerződések listázása/i)).toBeInTheDocument();
    })

    it("Navigation to Home page", () => {
        renderWithRouter(<ListContract />, [
            {
                path: "/",
                element: Home,
            },
        ]);
        fireEvent.click(screen.getByText("Vissza"));
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => {
            expect(screen.getByText("szerződéskötés olyan élmény")).toBeInTheDocument();
          }); 
    })
})

