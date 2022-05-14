import * as express from "express";

export const register = (app: express.Application) => {
  const oidc = app.locals.oidc;

  // define a route handler for the default homepage
  app.get('/', (req: any, res) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    const content = {
      isAuthenticated: req.isAuthenticated(),
      user,
    }
    res.send(content);
  });

  // define a secure route handler for the login page that redirects to /guitars
  app.get("/login", oidc.ensureAuthenticated(), (req, res) => {
    res.redirect("/content");
  });

  // define a route to handle logout
  app.get("/logout", (req: any, res) => {
    req.logout();
    res.redirect("/");
  });

  // define a secure route handler for the guitars page
  app.get("/content", oidc.ensureAuthenticated(), (req: any, res) => {
    const user = req.userContext ? req.userContext.userinfo : null;
    const content = {
      isAuthenticated: req.isAuthenticated(),
      user,
    }
    res.send(content);
  });
};