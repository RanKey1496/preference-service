import { GenericRepositoryImp } from './genericRepository';
import { PreferenceModel, Preference, IPreference } from '../entity/preference';
import { injectable } from 'inversify';

@injectable()
export class PreferenceRepository extends GenericRepositoryImp<PreferenceModel> {

    public async findByEmail(email: string): Promise<PreferenceModel> {
        return await Preference.findOne({ email });
    }

    public async update(preference: PreferenceModel): Promise<boolean> {
        const result = await preference.save();
        return !!result;
    }

    public async save(preference: PreferenceModel): Promise<boolean> {
        const result = await Preference.create(preference);
        return !!result;
    }

}