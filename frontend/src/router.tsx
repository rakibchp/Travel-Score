import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/layouts/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { ComingSoonPage, NotFoundPage } from '@/pages/StatusPages'

/**
 * Route map (see docs/ARCHITECTURE.md §5). Screens for later phases point at
 * ComingSoonPage so every link in the UI already resolves.
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ComingSoonPage title="Destination explorer" /> },
      { path: 'destinations/:slug', element: <ComingSoonPage title="Destination details" /> },
      { path: 'divisions', element: <ComingSoonPage title="Divisions & districts" /> },
      { path: 'divisions/:slug', element: <ComingSoonPage title="Division explorer" /> },
      { path: 'districts/:slug', element: <ComingSoonPage title="District explorer" /> },
      { path: 'scorecard', element: <ComingSoonPage title="Travel scorecard" /> },
      { path: 'login', element: <ComingSoonPage title="Sign in" /> },
      { path: 'register', element: <ComingSoonPage title="Create an account" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
