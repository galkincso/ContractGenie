import { screen } from "@testing-library/react";
import PersonalData from "../pages/PersonalData"
import { renderWithRouter } from "./ListContracts.test"
import { render } from "@testing-library/react";

describe ("PersonalData", () => {

    it("PersonalData page renders", async () => {
        renderWithRouter(<PersonalData/>);

        expect(screen.getByText("Szükséges adatok")).toBeInTheDocument();
    })
})