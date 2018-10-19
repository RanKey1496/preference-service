import { RegistrableController } from './RegistrableController';
import { Application, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { NextFunction } from 'connect';
import Types from '../config/types';
import { PreferenceService } from '../service/preferenceService';
import { dataResponse } from '../utils/response';

@injectable()
export class PreferenceController implements RegistrableController {

    @inject(Types.PreferenceService)
    private preferenceService: PreferenceService;

    register(app: Application): void {
        app.route('/preferences/user/:id')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const id = req.params.id;
                    const result = await this.preferenceService.getByUserId(id);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/preferences/product/:id')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const id = req.params.id;
                    const result = await this.preferenceService.getByProductId(id);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/preferences')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const preference = req.body.preference;
                    const result = await this.preferenceService.create(preference);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });
    }

}