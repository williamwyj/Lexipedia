"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const api = __importStar(require("./api"));
const register = (app) => {
    const oidc = app.locals.oidc;
    // define a route handler for the default homepage
    app.get('/', (req, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        const content = {
            isAuthenticated: req.isAuthenticated(),
            user,
        };
        res.send(content);
    });
    // define a secure route handler for the login page that redirects to /guitars
    app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
        res.redirect("/content");
    });
    // define a route to handle logout
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    // define a secure route handler for the guitars page
    app.get("/content", oidc.ensureAuthenticated(), (req, res) => {
        const user = req.userContext ? req.userContext.userinfo : null;
        const content = {
            isAuthenticated: req.isAuthenticated(),
            user,
        };
        res.send(content);
    });
    api.register(app);
};
exports.register = register;
//# sourceMappingURL=index.js.map