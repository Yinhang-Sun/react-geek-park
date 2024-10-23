// Router configuration
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
// Import Home from "@/pages/Home";
// Import Article from "@/pages/Article";
// Import Publish from "@/pages/Publish";
import { Suspense, lazy } from "react";

// 1. Import component by lazy function 
const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))
const Home = lazy(() => import('@/pages/Article'))

// Configure router instance 
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={'Loading...'}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'article',
                element: (
                    <Suspense fallback={'Loading...'}>
                        <Article />
                    </Suspense>
                )
            },
            {
                path: 'publish',
                element: (
                    <Suspense fallback={'Loading...'}>
                        <Publish />
                    </Suspense>
                )
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router