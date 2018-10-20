import { Document, Schema, Model, model } from 'mongoose';

export interface IPreference {
    email: string;
    products: Array<any>;
}

export interface PreferenceModel extends IPreference, Document { }

export const PreferenceSchema: Schema = new Schema({
    email: {
        type: String, required: true
    },
    products: {
        type: Array
    }
}, { timestamps: true, versionKey: false });

export const Preference: Model<PreferenceModel> = model<PreferenceModel>('Preference', PreferenceSchema);