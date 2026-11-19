import { Schema, model, type InferSchemaType } from 'mongoose';
import { imageSchema, pointSchema } from './shared.js';

const districtSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true, index: true },
    location: { type: pointSchema }, // district centroid, used by the map (Phase 2)
    image: { type: imageSchema },
  },
  { timestamps: true },
);

districtSchema.index({ division: 1, name: 1 });

export type DistrictDoc = InferSchemaType<typeof districtSchema>;
export const District = model('District', districtSchema, 'districts');
