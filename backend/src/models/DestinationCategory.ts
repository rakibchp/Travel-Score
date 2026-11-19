import { Schema, model, type InferSchemaType } from 'mongoose';

const destinationCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    icon: { type: String, trim: true }, // lucide-react icon name, rendered by the frontend
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

destinationCategorySchema.index({ isActive: 1, order: 1 });

export type DestinationCategoryDoc = InferSchemaType<typeof destinationCategorySchema>;
export const DestinationCategory = model(
  'DestinationCategory',
  destinationCategorySchema,
  'destinationCategories',
);
