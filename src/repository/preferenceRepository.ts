import { GenericRepositoryImp } from './genericRepository';
import { PreferenceModel, Preference, IPreference } from '../entity/preference';
import { injectable } from 'inversify';

@injectable()
export class PreferenceRepository extends GenericRepositoryImp<PreferenceModel> {

    public async findByUserId(id: number): Promise<PreferenceModel[]> {
        return await Preference.find({user_id: id});
    }

    public async findByProductId(id: number): Promise<PreferenceModel[]> {
        return await Preference.find({product_id: id});
    }

    public async save(preference: PreferenceModel): Promise<PreferenceModel> {
        return await Preference.create(preference);
    }

}