import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Home from "../components/shared/Home";
import Signup from "../components/shared/Signup";
import Login from "../components/shared/Login";
import Job from "../components/shared/Job";
import JobDetails from "../components/shared/JobDetails";
import Profile from "../components/shared/Profile";
import Companies from "../components/shared/Companies";
import Create from "../components/shared/Create";
import CompanyJobs from "../components/shared/CompanyJobs";
import CompanyJobDetails from "../components/shared/CompanyJobDetails";
import CreateJob from "../components/shared/CreateJob";
import Update from "../components/shared/Update";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/job',
                element: <Job />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/update',
                element: <Update />
            },
            {
                path: '/jobdetails/:id',
                element: <JobDetails />
            },

            //recruiter
            {
                path: "/companies",
                element: <Companies />
            },
            {
                path: "/create",
                element: <Create />
            },
            {
                path: "/companies/:id",
                element: <CompanyJobs />
            },
            {
                path: "/createjob/:id",
                element: <CreateJob />
            },
            {
                path: "/companies/:id/:jobId",
                element: <CompanyJobDetails />
            },
        ]
    }
])

export default router