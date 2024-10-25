import { Router, Request, Response } from "express";

import { SuperheroService } from "./superhero.service";
import { SuperheroCreateUpdateDto } from "../../types/superhero-create-update-dto.type";
import { SuperheroDto } from "../../types/superhero-dto.type";
import { SuperheroRepository } from "./superhero.repository";
import { SuperheroModel } from "./superhero.model";
import { ImageModel } from "./image.model";
import { HTTPStatus } from "../../enums/http-status.enum";
import { asyncHandler } from "../../middlewares/async.handler.middleware";
import { SuperheroCreateUpdateSchema } from "./superhero.validation-schema";

const superheroRepository = new SuperheroRepository(SuperheroModel, ImageModel);
const superheroService = new SuperheroService(superheroRepository);

const router = Router();

router.get("/count", asyncHandler(async (req: Request, res: Response) => {
  const count = await superheroService.count();
  res.json({count});
}))

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = +req.params.id;
    const superhero: SuperheroDto | null = await superheroService.find(id);

    res.json(superhero);
  })
);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
    const superheros = await superheroService.findAll(page, pageSize);

    res.json(superheros);
  })
);


router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const payload: SuperheroCreateUpdateDto = SuperheroCreateUpdateSchema.parse(
      req.body
    );
    const newSuperhero = await superheroService.create(payload);

    res.status(HTTPStatus.CREATED).json(newSuperhero);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = +req.params.id;
    const payload: SuperheroCreateUpdateDto = SuperheroCreateUpdateSchema.parse(
      req.body
    );
    const updatedSuperhero = await superheroService.update(id, payload);

    res.json(updatedSuperhero);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = +req.params.id;
    await superheroService.delete(id);

    res.json(id);
  })
);

export { router };
