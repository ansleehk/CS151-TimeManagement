import { lazy, Suspense } from "react";

import {
    Outlet,
    createBrowserRouter,
} from "react-router-dom";

import { MenuBar } from "../components/menuBar";
import "../styles/index.scss"
import { LoadingPage } from "../pages/loading";

const LazyHomepage = lazy(() => import("../pages/index"));
const LazyCreateRoutine = lazy(() => import("../pages/routines/createRoutine"));
const LazyError = lazy(() => import("../pages/notFound"));
const LazyCalendar = lazy(() => import("../pages/calendar"));
const LazyRoutine = lazy(()=> import("../pages/routines/viewRoutine"))


const AppLayout = () => {
    return (
        <>
            <MenuBar />
            <Suspense fallback={<LoadingPage />}>
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
                        element: <LazyRoutine />,
                        children: [
                            {
                                path: "create",
                                element: <LazyCreateRoutine />
                            }
                        ]
                    },
                    {
                        path: "calendar",
                        element: <LazyCalendar />
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
