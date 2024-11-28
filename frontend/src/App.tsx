import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import PublicLayout from './layout/PublicLayout'; // Create a new PublicLayout
import Tables from './pages/Tables';
import Dashboard from './pages/Dashboard';
import UserList from './pages/Usermanagement/UserList';
import Tasks from './pages/TaskMangement/Task';
import SharedWithMeList from './pages/SharedList/SharedWithMeList';
import SharedWithOthersList from './pages/SharedList/SharedWithOthersList';
import Task from './pages/TaskMangement/Task';
import TaskList from './pages/TaskMangement/TaskList';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Define route groups
  const publicRoutes = [
    { path: '/login', element: <SignIn />, title: 'Signin' },
    { path: '/auth/signup', element: <SignUp />, title: 'Signup' },
  ];

  const defaultRoutes = [
    { path: '/', element: <Dashboard />, title: 'Dashboard', index: true },
    { path: '/userlist', element: <UserList />, title: 'User List' },
    { path: '/task', element: <Task />, title: 'Task' },
    { path: '/tasklist', element: <TaskList />, title: 'Task List' },

    {
      path: '/shared-with-me',
      element: <SharedWithMeList />,
      title: 'Shared with Me',
    },
    {
      path: '/shared-with-others',
      element: <SharedWithOthersList />,
      title: 'Shared with Others',
    },
    { path: '/profile', element: <Profile />, title: 'Profile' },
    {
      path: '/forms/form-elements',
      element: <FormElements />,
      title: 'Form Elements',
    },
    {
      path: '/forms/form-layout',
      element: <FormLayout />,
      title: 'Form Layout',
    },
    { path: '/tables', element: <Tables />, title: 'Tables' },
    { path: '/settings', element: <Settings />, title: 'Settings' },
  ];

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element, title }) => (
        <Route
          key={path}
          path={path}
          element={
            <PublicLayout>
              <PageTitle title={title} />
              {element}
            </PublicLayout>
          }
        />
      ))}

      {/* Public Routes */}
      {defaultRoutes.map(({ path, element, title }) => (
        <Route
          key={path}
          path={path}
          element={
            <DefaultLayout>
              <PageTitle title={title} />
              {element}
            </DefaultLayout>
          }
        />
      ))}

      {/* Default Layout Routes */}
      {/* <Route element={<DefaultLayout />}>
        {defaultRoutes.map(({ path, element, title, index }) =>
          index ? (
            <Route
              key={path}
              index
              element={
                <>
                  <PageTitle title={title} />
                  {element}
                </>
              }
            />
          ) : (
            <Route
              key={path}
              path={path}
              element={
                <>
                  <PageTitle title={title} />
                  {element}
                </>
              }
            />
          ),
        )} */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;

// import { useEffect, useState } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';

// import Loader from './common/Loader';
// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import DefaultLayout from './layout/DefaultLayout';
// import Tables from './pages/Tables';
// import Dashboard from './pages/Dashboard';
// import UserList from './pages/Usermanagement/UserList';
// import TasksList from './pages/TaskMangement/TasksList';
// import SharedWithMeList from './pages/SharedList/SharedWithMeList';
// import SharedWithOthersList from './pages/SharedList/SharedWithOthersList';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <DefaultLayout>
//       <Routes>
//         <Route
//           index
//           element={
//             <>
//               <PageTitle title="Dashboard" />
//               <Dashboard />
//             </>
//           }
//         />
//         <Route
//           path="/userlist"
//           element={
//             <>
//               <PageTitle title="User List" />
//               <UserList />
//             </>
//           }
//         />
//         <Route
//           path="/tasklist"
//           element={
//             <>
//               <PageTitle title="Task List" />
//               <TasksList />
//             </>
//           }
//         />

//         <Route
//           path="/shared-with-me"
//           element={
//             <>
//               <PageTitle title="Shared with Me" />
//               <SharedWithMeList />
//             </>
//           }
//         />
//         <Route
//           path="/shared-with-others"
//           element={
//             <>
//               <PageTitle title="Shared with Others" />
//               <SharedWithOthersList />
//             </>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <>
//               <PageTitle title="Profile" />
//               <Profile />
//             </>
//           }
//         />
//         <Route
//           path="/forms/form-elements"
//           element={
//             <>
//               <PageTitle title="Form Elements" />
//               <FormElements />
//             </>
//           }
//         />
//         <Route
//           path="/forms/form-layout"
//           element={
//             <>
//               <PageTitle title="Form Layout" />
//               <FormLayout />
//             </>
//           }
//         />
//         <Route
//           path="/tables"
//           element={
//             <>
//               <PageTitle title="Tables" />
//               <Tables />
//             </>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <>
//               <PageTitle title="Settings" />
//               <Settings />
//             </>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <>
//               <PageTitle title="Signin" />
//               <SignIn />
//             </>
//           }
//         />
//         <Route
//           path="/auth/signup"
//           element={
//             <>
//               <PageTitle title="Signup" />
//               <SignUp />
//             </>
//           }
//         />
//       </Routes>
//     </DefaultLayout>
//   );
// }

// export default App;
