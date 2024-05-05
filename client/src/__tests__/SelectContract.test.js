import { screen } from "@testing-library/react";
import SelectContract from "../pages/SelectContract"
import { renderWithRouter } from "./ListContracts.test"

describe ("SelectContract", () => {

    it("SelectContract page renders", () => {
        renderWithRouter(<SelectContract/>);

        expect(screen.getByText("Milyen szerződésre van szükséged?")).toBeInTheDocument();
    })
})