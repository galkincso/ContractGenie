import { screen } from "@testing-library/react";
import ContentModifier from "../pages/ContentModifier"
import { renderWithRouter } from "./ListContracts.test"

describe ("ContentModifier", () => {

    it("ContentModifier page renders", () => {
        renderWithRouter(<ContentModifier/>);

        expect(screen.getByText("Szerződés tartalma")).toBeInTheDocument();
    })
})