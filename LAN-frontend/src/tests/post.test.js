import React from "react";
import { render, waitFor } from '@testing-library/react';
import AllPosts from "../pages/posts/AllPosts";
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchAllPosts } from "../data/api";

const fakeFetchResponse = {
    posts: [
        { id: 1, userId: 1, title: "something", content: 'testsetstsets' },
    ],
};

import { QueryClient, QueryClientProvider } from 'react-query'
import { async } from "@firebase/util";
const queryClient = new QueryClient()

let posts;
describe("Post Tests", () => {
    beforeAll(async () => {
        posts = await fetchAllPosts(true)
    })
    beforeEach(() => {
        jest.useFakeTimers();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeFetchResponse),
            })
        );
    });
    // afterAll(() => {
    //     fetch.mockClear();
    // });

    it("render notifcations from backend", async () => {
        // console.log(posts)
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AllPosts test={true} />
                </Router>
            </QueryClientProvider>
        );

        await waitFor(() => {
            getByText("hello world my day");
        });
    }, 30000);
});