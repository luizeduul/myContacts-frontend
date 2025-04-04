import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import EditContactPage from '../pages/EditContact';
import NewContact from '../pages/NewContact';

export default function Router() {

  // const routes = useRoutes(
  //   [
  //     { path: '/', element: <Home /> },
  //     { path: '/novo', element: <NewContact /> },
  //     { path: '/:id', element: <EditContactPage /> },
  //   ]
  // );

  // return routes;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/novo" element={<NewContact />} />
      <Route path="/:id" element={<EditContactPage />} />
    </Routes>
  );
}
