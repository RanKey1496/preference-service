import { injectable, inject } from 'inversify';
import { PreferenceModel, Preference } from '../entity/preference';
import Types from '../config/types';
import { PreferenceRepository } from '../repository/preferenceRepository';

export interface PreferenceService {
    getByUser(email: string): Promise<PreferenceModel[]>;
    getByProductId(id: number): Promise<PreferenceModel[]>;
    create(email: string, productId: number, like: boolean): Promise<PreferenceModel>;
}

@injectable()
export class PreferenceServiceImpl implements PreferenceService {

    @inject(Types.PreferenceRepository)
    private preferenceRepository: PreferenceRepository;

    public async getByUser(email: string): Promise<PreferenceModel[]> {
        return await this.preferenceRepository.findByEmail(email);
    }

    public async getByProductId(id: number): Promise<PreferenceModel[]> {
        return await this.preferenceRepository.findByProductId(id);
    }

    public async create(email: string, productId: number, like: boolean): Promise<PreferenceModel> {
        const preference = new Preference();
        preference.email = email;
        preference.productId = productId;
        preference.liked = like;
        return await this.preferenceRepository.save(preference);
    }

}
