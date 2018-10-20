import { injectable } from 'inversify';
import { findCorridorId } from '../repository/productRepository';

export interface ProductService {
    getProduct(token: string, id: number): Promise<Array<any>>;
}

@injectable()
export class ProductServiceImp implements ProductService {

    public async getProduct(token: string, id: number): Promise<Array<any>> {
        return await findCorridorId(token, id);
    }

}