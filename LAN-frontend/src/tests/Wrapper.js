import { createMemoryHistory } from 'history';
import React from 'react';
// import { Routes, Route,  } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
import { BrowserRouter as Router } from 'react-router-dom';
export default function Wrapper({ children, ...props }) {

    return (
        <QueryClientProvider client={queryClient}>
            {/* <Router> */}
            {children}
            {/* </Router> */}
        </QueryClientProvider>
    );
}
