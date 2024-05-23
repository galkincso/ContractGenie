import { screen, fireEvent, waitFor } from '@testing-library/react'
import Navigation from "../components/Navigation"
import { renderWithRouter } from "./ListContracts.test"
import SelectContract from "../pages/SelectContract";

describe("Navigation", () => {
    /**
     * Testing the rendering of the NavBar
     * Logo, One nav item
     */
    it("Navigation component renders", () => {
        renderWithRouter(<Navigation />);

        expect(screen.getByText("Contract Genie")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Szerződés készítése' })).toBeInTheDocument();
    })

    /**
     * Navigation -> Select Contract page
     * Clicking the "Szerződés készítése button"
     */
    it("Navigation to the Select Contract page", () => {
        renderWithRouter(<Navigation />, [
            {
                path: "/create",
                element: SelectContract,
            },
        ]);
        fireEvent.click(screen.getByRole('button', { name: 'Szerződés készítése' }));
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(() => {
            expect(screen.getByText("Milyen szerződésre van szükséged?")).toBeInTheDocument();
          }); 
    })
})