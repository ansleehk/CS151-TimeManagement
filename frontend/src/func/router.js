import { lazy, Suspense } from "react";

import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";

import { MenuBar } from "../components/menuBar";
import "../styles/index.scss"

const LazyHomepage = lazy(() => import("../pages/home/index"));
const LazyCreateRoutine = lazy(() => import("../pages/routines/createRoutine"));
const LazyError = lazy(() => import("../pages/notFound"));



const AppLayout = () => {
    return (
        <>
            <Suspense>
                <MenuBar />
                <div id="content-container">
                    <Outlet />
                </div>
            </Suspense>

        </>
    )
}

export const router = createBrowserRouter([
    {
        path: "",
        children: [
            {
                path: "",
                element: <AppLayout />,
                children: [
                    {
                        path: "",
                        element: <LazyHomepage />
                    },
                    {
                        path: "routine",
                        children: [
                            {
                                path: "create",
                                element: <LazyCreateRoutine />
                            }
                        ]
                    },
                    {
                        path: "*",
                        element: <LazyError />
                    }
                ]
            }
        ]
    }
])
