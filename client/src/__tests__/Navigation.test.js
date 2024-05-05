import { screen } from "@testing-library/react";
import Navigation from "../components/Navigation"
import { renderWithRouter } from "./ListContracts.test"

describe ("Navigation", () => {

    it("Navigation component renders", () => {
        renderWithRouter(<Navigation/>);

        expect(screen.getByText("Contract Genie")).toBeInTheDocument();
    })
})