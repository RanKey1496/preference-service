import { GenericRepositoryImp } from './genericRepository';
import { PreferenceModel, Preference, IPreference } from '../entity/preference';
import { injectable } from 'inversify';

@injectable()
export class PreferenceRepository extends GenericRepositoryImp<PreferenceModel> {

    public async findByEmail(email: string): Promise<PreferenceModel> {
        return await Preference.findOne({ email });
    }

    public async findAllByEmail(email: string): Promise<PreferenceModel> {
        return await Preference.findOne({ email }, 'products products.id products.like -_id');
    }

    public async findAllByEmailGroupedByLikes(email: string): Promise<Array<any>> {
        const aggregatorOpts = [
            {
                $match: { email }
            },
            {
                $unwind: '$products'
            },
            {
                $match: { 'products.like': 'true' }
            },
            {
                $group: {
                    _id: '$products.corridorId',
                    count: { $sum: 1 }
                }
            }
        ];
        return await Preference.aggregate(aggregatorOpts).exec();
    }

    public async update(preference: PreferenceModel): Promise<boolean> {
        const result = await preference.save();
        return !!result;
    }

    public async save(preference: PreferenceModel): Promise<boolean> {
        const result = await Preference.create(preference);
        return !!result;
    }

    public async findByCorridorIdEmail(email: string, corridorId: number, productId: number): Promise<any> {
        return await Preference.find({ email, corridorId, productId: { '$nin': [ productId ] } });
    }

}