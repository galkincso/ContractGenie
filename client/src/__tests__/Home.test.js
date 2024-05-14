import { screen } from '@testing-library/react'
import Home from "../pages/Home"
import { renderWithRouter } from "./ListContracts.test"

describe ("Home", () => {

    /**
     * Testing the rendering of the Home page
     * Top content, Bottom content
     */
    it("Home page renders", () => {
        renderWithRouter(<Home/>);

        expect(screen.getByText("Itt a szerződéskötés olyan élmény, mint sehol máshol!")).toBeInTheDocument();
        expect(screen.getByText("Szabd személyre, amennyire csak lehet!")).toBeInTheDocument();
        
    })
})