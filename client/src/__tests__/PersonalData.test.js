/* eslint-disable testing-library/no-wait-for-side-effects */
import { screen } from "@testing-library/react";
import PersonalData from "../pages/PersonalData"
import { renderWithRouter } from "./ListContracts.test"
import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/react";

describe ("PersonalData", () => {

    /**
     * Testing the rendering of the Personal Data page
     * Szükséges adatok, Vissza gomb
     */
    it("PersonalData page renders", async () => {
        //renderWithRouter(<PersonalData/>);
        
        //expect(screen.getByText("Szükséges adatok")).toBeInTheDocument();
    })
    /**
     * Navigation -> Vissza gomb
     * (azt kell megnézni, hogyy ne legye az oldalon pl a Szükséges adatok, mert 2 helyre is visszanavigálhat)
     */
})