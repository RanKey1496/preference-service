import { injectable, inject } from 'inversify';
import { PreferenceModel } from '../entity/preference';
import Types from '../config/types';
import { PreferenceRepository } from '../repository/preferenceRepository';

export interface PreferenceService {
    getByUserId(id: number): Promise<PreferenceModel[]>;
    getByProductId(id: number): Promise<PreferenceModel[]>;
    create(preference: PreferenceModel): Promise<PreferenceModel>;
}

@injectable()
export class PreferenceServiceImpl implements PreferenceService {

    @inject(Types.PreferenceRepository)
    private preferenceRepository: PreferenceRepository;

    public async getByUserId(id: number): Promise<PreferenceModel[]> {
        return await this.preferenceRepository.findByUserId(id);
    }

    public async getByProductId(id: number): Promise<PreferenceModel[]> {
        return await this.preferenceRepository.findByProductId(id);
    }

    public async create(preference: PreferenceModel): Promise<PreferenceModel> {
        return await this.preferenceRepository.save(preference);
    }

}
