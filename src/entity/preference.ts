import { Document, Schema, Model, model } from 'mongoose';

export interface IPreference {
    productId: number;
    userId: number;
    liked: boolean;
}

export interface PreferenceModel extends IPreference, Document { }

export const PreferenceSchema: Schema = new Schema({
    user_id: {
        type: Number, required: true
    },
    product_id: {
        type: Number, required: true
    },
    liked: {
        type: Boolean, required: true
    }
}, { timestamps: true, versionKey: false });

export const Preference: Model<PreferenceModel> = model<PreferenceModel>('Preference', PreferenceSchema);