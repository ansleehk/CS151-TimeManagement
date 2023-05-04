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
const LazyRoutine = lazy(() => import("../pages/routines/viewRoutine"))
const LazyLogin = lazy(() => import("../pages/login"))
const LazyRegister = lazy(() => import("../pages/register"))
const LazyUpdateRoutine = lazy(() => import("../pages/routines/updateRoutine"));
const LazyCreateEvent = lazy(() => import("../pages/createEvent"));
const LazyUpdateEvent = lazy(() => import("../pages/updateEvent"));
const LazyUserInfo = lazy(() => import("../pages/userInfo"));

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
                        children: [
                            {
                                path: "",
                                element: <LazyRoutine />
                            },
                            {
                                path: "create",
                                element: <LazyCreateRoutine />
                            },
                            {
                                path: "update/:id",
                                element: <LazyUpdateRoutine />
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
                    },
                    {
                        path: "event",
                        children: [
                            {
                                path: "create",
                                element: <LazyCreateEvent />
                            },
                            {
                                path: "update/:id",
                                element: <LazyUpdateEvent />
                            }
                        ]
                    },
                    {
                        path: "auth",
                        children: [
                            {
                                path: "login",
                                element: <LazyLogin />
                            }, 
                            {
                                path: "register",
                                element: <LazyRegister />
                            },
                            {
                                path: "user-info",
                                element: <LazyUserInfo />
                            }
                        ]

                    }
                ]
            }
        ]
    }
])
