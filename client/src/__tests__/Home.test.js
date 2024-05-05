import { screen } from "@testing-library/react";
import Home from "../pages/Home"
import { renderWithRouter } from "./ListContracts.test"

describe ("Home", () => {

    it("Home page renders", () => {
        renderWithRouter(<Home/>);

        expect(screen.getByText("Itt a szerződéskötés olyan élmény, mint sehol máshol!")).toBeInTheDocument();
    })
})