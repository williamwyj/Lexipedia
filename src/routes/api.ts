import * as express from "express";
import pgPromise from "pg-promise";

export const register = (app: express.Application) => {
  const oidc = app.locals.oidc;
  const port = parseInt(process.env.PGPORT || "6432", 10);
  const config = {
    database: process.env.PGDATABASE || "postgres",
    host: process.env.PGHOST || "localhost",
    port,
    user: process.env.PGUSER || "postgres"
  };

  const pgp = pgPromise();
  const db = pgp(config);

  app.get(`/api/guitars/all`, oidc.ensureAuthenticated(), async (req: any, res) => {
    try {
      const userId = req.userContext.userinfo.sub;
      console.log(userId)
      const guitars = await db.any(
        `SELECT id, brand, model, year, color FROM guitars WHERE user_id = $[userId] ORDER BY year, brand, model`, { userId });
      return res.json(guitars);
    } catch (err) {
      // console.log(err);
      res.json({ error: err.message || err });
    }
  });
}