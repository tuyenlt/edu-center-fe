export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Signin />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'courses',
                element: <Course />,
            },
            {
                path: 'course/:id',
                element: <CourseDetail />,
            },
            {
                path: 'course/:id/edit',
                element: <EditCourse />,
            },
            {
                path: 'add-course',
                element: <AddCoursePage />,
            },
        ],
    },
]);