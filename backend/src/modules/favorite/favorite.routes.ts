import { Router } from 'express';
import { FavoriteController } from './favorite.controller';
import { authMiddleware } from '../../shared/middlewares/auth.middleware';
import { validate } from '../../shared/middlewares/validate';
import { favoriteCreateSchema } from './favorite.schema';

const router = Router();
const favoriteController = new FavoriteController();

router.post(
  '/favorite',
  // authMiddleware,
  validate(favoriteCreateSchema),
  favoriteController.addFavorite
);

router.get(
  '/favorite/:idCapCover',
  // authMiddleware,
  favoriteController.getUserFavoritesByIdCapCover
);

router.put(
  '/favorite',
  // authMiddleware,
  validate(favoriteCreateSchema),
  favoriteController.updateFavorite
)

export { router as favoriteRoutes };