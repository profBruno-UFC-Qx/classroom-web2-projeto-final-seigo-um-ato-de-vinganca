import { Router } from 'express';
import { FavoriteController } from './favorite.controller';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import { validate } from '../../shared/middlewares/validate';
import { favoriteCreateSchema, favoriteUpdateSchema } from './favorite.schema';

const router = Router();
const favoriteController = new FavoriteController();

router.post(
  '/favorite',
  authMiddleware(),
  validate(favoriteCreateSchema),
  favoriteController.addFavorite
);

router.get(
  '/favoritesByUser',
  authMiddleware(),
  favoriteController.getUserFavorites
);

router.get(
  '/favorites/cap-covers/:id',
  authMiddleware(),
  favoriteController.getFavoriteByCapCoverId
)

router.put(
  '/favorite/:id',
  authMiddleware(),
  validate(favoriteUpdateSchema),
  favoriteController.updateFavorite
)

export { router as favoriteRoutes };