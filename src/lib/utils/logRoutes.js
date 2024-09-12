// lib/utils/logRoutes.js
const logRoutes = (app) => {
    // Base path to be prefixed to routes
    const basePath = '/api';

    app._router.stack.forEach((middleware) => {
        if (middleware.route) { // If it's a route
            const methods = Object.keys(middleware.route.methods).map(method => method.toUpperCase()).join(', ');
            console.log(`${methods} ${basePath}${middleware.route.path}`);
        } else if (middleware.name === 'router') { // If it's a router
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    const methods = Object.keys(handler.route.methods).map(method => method.toUpperCase()).join(', ');
                    console.log(`${methods} ${basePath}${handler.route.path}`);
                }
            });
        }
    });
};

export default logRoutes;
