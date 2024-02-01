import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shows from './Components/Shows';
import Home from './Components/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Summary from './Components/Summary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Shows />
      },
      {
        path: "/shows/:id",
        element: <Summary />,
        loader: ({ params }) => fetch(`https://api.tvmaze.com/shows/${params.id}`)
      }
    ]
  },
]);

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
