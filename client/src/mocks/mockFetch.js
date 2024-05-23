const dummyContractList = [
    {
        id: 1,
        name: "First Contract",
        content: "First Content",
        summary: "First Summary",
        subjects: 2,
        documents: [
            "Doc 0",
            "Doc 2"
        ],
        namingConvention: [
            "Name 1",
            "Name 2"
        ]
    },
    {
        id: 2,
        name: "Second Contract",
        content: "Second Content",
        summary: "Second Summary",
        subjects: 2,
        documents: [
            "Doc 1",
            "Doc 2"
        ],
        namingConvention: [
            "Name 2",
            "Name 3"
        ]
    },
    {
        id: 1,
        name: "Third Contract",
        content: "Third Content",
        summary: "Third Summary",
        subjects: 2,
        documents: [
            "Doc 5",
            "Doc 2"
        ],
        namingConvention: [
            "Name 4",
            "Name 5"
        ]
    },
];

const dogImagesResponse = {
    message: [
        "https://images.dog.ceo/breeds/cattledog-australian/IMG_1042.jpg ",
        "https://images.dog.ceo/breeds/cattledog-australian/IMG_5177.jpg",
    ],
};

export default async function mockFetch(url) {
    switch (url) {
        case "http://localhost:8080/contract/getall": {
            return {
                ok: true,
                status: 200,
                json: async () => dummyContractList,
            };
        }
        case "https://dog.ceo/api/breed/husky/images" :
        case "https://dog.ceo/api/breed/cattledog/images": {
            return {
                ok: true,
                status: 200,
                json: async () => dogImagesResponse,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}