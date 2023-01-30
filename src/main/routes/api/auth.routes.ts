import { checkTokenFactory } from '$/main/factories/check-token';
import { loginFactory } from '$/main/factories/login';
import { logoutFactory } from '$/main/factories/logout';
import { refreshTokenFactory } from '$/main/factories/refresh-token';
import { checkTokenValidator } from '$/main/validation/validators/check-token';
import { loginValidator } from '$/main/validation/validators/login';
import { logoutValidator } from '$/main/validation/validators/logout';
import { refreshTokenValidator } from '$/main/validation/validators/refresh-token';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/check', async (req, res) => {
  const data = await checkTokenValidator(req);
  await checkTokenFactory().check(data);
  res.sendStatus(202);
});

authRoutes.post('/login', async (req, res) => {
  const data = await loginValidator(req);
  const result = await loginFactory().login(data);
  res.json(result);
});

authRoutes.post('/logout', async (req, res) => {
  const data = await logoutValidator(req);
  await logoutFactory().logout(data);
  res.sendStatus(204);
});

authRoutes.post('/refresh', async (req, res) => {
  const data = await refreshTokenValidator(req);
  const result = await refreshTokenFactory().refresh(data);
  res.json(result);
});

export default authRoutes;