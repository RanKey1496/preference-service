import { injectable, inject } from 'inversify';
import { PreferenceModel, Preference } from '../entity/preference';
import Types from '../config/types';
import { PreferenceRepository } from '../repository/preferenceRepository';

export interface PreferenceService {
    getByUser(email: string): Promise<PreferenceModel[]>;
    create(email: string, productId: number, like: boolean): Promise<boolean>;
}

@injectable()
export class PreferenceServiceImpl implements PreferenceService {

    @inject(Types.PreferenceRepository)
    private preferenceRepository: PreferenceRepository;

    public async getByUser(email: string): Promise<Array<any>> {
        const result = await this.preferenceRepository.findAllByEmail(email);
        if (result !== undefined && result !== null && result.products !== undefined && result.products) {
            return result.products;
        } else {
            return [];
        }
    }

    public async create(email: string, productId: number, like: boolean): Promise<boolean> {
        const user = await this.preferenceRepository.findByEmail(email);
        if (user) {
            const liked = user.products.find(product => product.id === productId);
            if (liked) {
                return true;
            }
            user.products.push({ id: productId, like });
            return await this.preferenceRepository.update(user);
        } else {
            const preference = new Preference();
            preference.email = email;
            preference.products.push({ id: productId, like });
            return await this.preferenceRepository.save(preference);
        }
    }

}
