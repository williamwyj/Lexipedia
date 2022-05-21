"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const register = (app) => {
    const oidc = app.locals.oidc;
    const port = parseInt(process.env.PGPORT || "6432", 10);
    const config = {
        database: process.env.PGDATABASE || "postgres",
        host: process.env.PGHOST || "localhost",
        port,
        user: process.env.PGUSER || "postgres"
    };
    const pgp = (0, pg_promise_1.default)();
    const db = pgp(config);
    app.get(`/api/guitars/all`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            console.log(userId);
            const guitars = yield db.any(`SELECT id, brand, model, year, color FROM guitars WHERE user_id = $[userId] ORDER BY year, brand, model`, { userId });
            return res.json(guitars);
        }
        catch (err) {
            // console.log(err);
            res.json({ error: err.message || err });
        }
    }));
};
exports.register = register;
//# sourceMappingURL=api.js.map