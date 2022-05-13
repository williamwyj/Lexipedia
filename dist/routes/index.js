"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (app) => {
    const oidc = app.locals.oidc;
    // define a route handler for the default homepage
    app.get('/', (req, res) => {
        res.send("hello world");
    });
    // define a secure route handler for the login page that redirects to /guitars
    app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
        return res.redirect("/content");
    });
    // define a route to handle logout
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    // define a secure route handler for the guitars page
    app.get("/content", oidc.ensureAuthenticated(), (req, res) => {
        res.send("content");
    });
};
exports.register = register;
//# sourceMappingURL=index.js.map