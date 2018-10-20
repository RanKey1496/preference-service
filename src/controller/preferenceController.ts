import { RegistrableController } from './RegistrableController';
import { Application, Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import Types from '../config/types';
import { PreferenceService } from '../service/preferenceService';
import { dataResponse } from '../utils/response';
import { authenticate } from '../service/authService';

@injectable()
export class PreferenceController implements RegistrableController {

    @inject(Types.PreferenceService)
    private preferenceService: PreferenceService;

    public register(app: Application): void {
        app.route('/preferences/user/:id')
            .get(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const result = await this.preferenceService.getByUser(req.body.email);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/preferences')
            .post(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const email = req.body.email;
                    const preference = req.body.preference;
                    const like = req.body.like;
                    const result = await this.preferenceService.create(email, preference, like);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });
    }

}