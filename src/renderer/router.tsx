import React from 'react';

import Home from './pages/home/home';
import About from './pages/about';

const routes = [
  {
    path: '/',
    element: <Home />,
    index: true,
  },
  {
    path: '/about',
    element: <About />,
  },
];

export default routes;
