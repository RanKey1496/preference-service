import { injectable, inject } from 'inversify';
import { PreferenceModel, Preference } from '../entity/preference';
import Types from '../config/types';
import { PreferenceRepository } from '../repository/preferenceRepository';

export interface PreferenceService {
    getByUser(email: string): Promise<Array<any>>;
    create(email: string, product: any, like: boolean): Promise<boolean>;
}

@injectable()
export class PreferenceServiceImpl implements PreferenceService {

    @inject(Types.PreferenceRepository)
    private preferenceRepository: PreferenceRepository;

    public async getByUser(email: string): Promise<Array<any>> {
        const result = await this.preferenceRepository.findAllByEmail(email);
        if (result !== undefined && result !== null) {
            return result;
        } else {
            return [];
        }
    }

    public async create(email: string, product: any, like: boolean): Promise<boolean> {
        const user = await this.preferenceRepository.findByEmail(email);
        if (user) {
            const liked = user.products.find(p => p.id === product.id);
            if (liked) {
                return true;
            }
            user.products.push({ id: product.product_id, like, corridorId: product.corridors[0].id });
            return await this.preferenceRepository.update(user);
        } else {
            const preference = new Preference();
            preference.email = email;
            preference.products.push({ id: product.product_id, like, corridorId: product.corridors[0].id });
            return await this.preferenceRepository.save(preference);
        }
    }

}
