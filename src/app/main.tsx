/**
 * External Dependencies
 */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
    Outlet,
    RouterProvider,
    createRootRoute,
    createRoute,
    createRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Shared Dependencies
 */
import Home from '@/pages/home';
import Settings from '@/pages/settings';

/**
 * Internal Dependencies
 */
import './fonts/Rubik-Regular.woff2';
import './fonts/Rubik-700.woff2';
import './fonts/Rubik-900.woff2';

import './css/sanitize.css';
import './css/variables.css';
import './index.css';

/**
 * Create routes for the application
 */
const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});

const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/settings',
    component: Settings,
});

const routeTree = rootRoute.addChildren([indexRoute, settingsRoute]);

const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

/**
 * Create a query client
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // globally default to 20 seconds
            staleTime: 1000 * 20,
        },
    },
});

/**
 * Render the application
 */
const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    );
}
