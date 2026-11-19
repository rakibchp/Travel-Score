import { Schema, model, type InferSchemaType } from 'mongoose';
import { imageSchema } from './shared.js';

const divisionSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, maxlength: 2000 },
    image: { type: imageSchema },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

divisionSchema.index({ order: 1, name: 1 });

export type DivisionDoc = InferSchemaType<typeof divisionSchema>;
export const Division = model('Division', divisionSchema, 'divisions');
