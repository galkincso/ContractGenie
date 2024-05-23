import { screen } from '@testing-library/react'
import Home from "../pages/Home"
import { renderWithRouter } from "./ListContracts.test"
import axios from "axios";
import mockFetch from "../mocks/mockFetch"
//jest.mock("axios");



describe("Home", () => {

    /**
     * Testing the rendering of the Home page
     * Top content, Bottom content
     */
    it("Home page renders", () => {
        renderWithRouter(<Home />);

        expect(screen.getByText("Itt a szerződéskötés olyan élmény, mint sehol máshol!")).toBeInTheDocument();
        expect(screen.getByText("Szabd személyre, amennyire csak lehet!")).toBeInTheDocument();

    })

    it("should render user list after fetching list", async ()=>{
        //wajest.spyOn(window, "axios").mockImplementation(mockFetch);
        //resolving the get request with the dummyContractList
        //axios.get.mockResolvedValue({ data: dummyContractList });
    
        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(dummyUserList))
    
        //renderWithRouter(<Home />);
        //another alternative to wait for block is findby queries
        //expect(await screen.findByText(/First Contract/i)).toBeInTheDocument()
    
        // Optionally, you can check for the number of calls to axios.get
        //expect(axios.get).toHaveBeenCalledTimes(1);
        //jest.restoreAllMocks()
      })
})