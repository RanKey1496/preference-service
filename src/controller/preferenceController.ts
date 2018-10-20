import { RegistrableController } from './RegistrableController';
import { Application, Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import Types from '../config/types';
import { PreferenceService } from '../service/preferenceService';
import { dataResponse } from '../utils/response';
import { authenticate } from '../service/authService';
import { ProductService } from '../service/productService';

@injectable()
export class PreferenceController implements RegistrableController {

    @inject(Types.PreferenceService)
    private preferenceService: PreferenceService;

    @inject(Types.ProductService)
    private productService: ProductService;

    public register(app: Application): void {
        app.route('/preferences/user')
            .get(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const result = await this.preferenceService.getByUser(req.body.email);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/preferences/user/voted')
            .get(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const result = await this.preferenceService.getByUserVoted(req.body.email);
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
                    const productId = req.body.productId;
                    const like = req.body.like;
                    const product = await this.productService.getProduct(req.body.token, productId);
                    await this.preferenceService.create(email, product, like);
                    return dataResponse(res, 'Saved successfully');
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/preferences')
            .post(authenticate,
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const email = req.body.email;
                    const productId = req.body.productId;
                    const like = req.body.like;
                    const product = await this.productService.getProduct(req.body.token, productId);
                    await this.preferenceService.create(email, product, like);
                    return dataResponse(res, 'Saved successfully');
                } catch (error) {
                    return next(error);
                }
            });
    }

}