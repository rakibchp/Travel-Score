import { Schema, model, type InferSchemaType } from 'mongoose';
import { imageSchema, pointSchema } from './shared.js';

/**
 * A visitable place. Each active destination is worth exactly 1 point.
 * Schema defined in Phase 1 so totals are real; data is seeded in Phase 2.
 */
const destinationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    nameBn: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // division is denormalized from district so filters don't need a join
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    district: { type: Schema.Types.ObjectId, ref: 'District', required: true },
    upazila: {
      type: new Schema(
        { name: { type: String, trim: true }, nameBn: { type: String, trim: true } },
        { _id: false },
      ),
    },
    category: { type: Schema.Types.ObjectId, ref: 'DestinationCategory', required: true },

    shortDescription: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 10000 },
    significance: { type: String, trim: true, maxlength: 5000 },
    visitingInfo: {
      type: new Schema(
        {
          bestTime: { type: String, trim: true, maxlength: 300 },
          openingHours: { type: String, trim: true, maxlength: 300 },
          entryFee: { type: String, trim: true, maxlength: 300 },
          howToReach: { type: String, trim: true, maxlength: 2000 },
          tips: { type: String, trim: true, maxlength: 2000 },
        },
        { _id: false },
      ),
    },

    featuredImage: { type: imageSchema },
    images: {
      type: [imageSchema],
      default: [],
      validate: { validator: (v: unknown[]) => v.length <= 20, message: 'At most 20 images' },
    },
    location: { type: pointSchema },

    aliases: { type: [String], default: [] },
    searchText: { type: String, select: false },

    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    popularity: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

// Lowercased English + Bengali + aliases, so one indexed field serves search in both scripts.
destinationSchema.pre('save', function () {
  this.searchText = [this.name, this.nameBn, ...(this.aliases ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
});

destinationSchema.index({ isActive: 1, division: 1 });
destinationSchema.index({ isActive: 1, district: 1 });
destinationSchema.index({ isActive: 1, category: 1 });
destinationSchema.index({ isActive: 1, isFeatured: 1 });
destinationSchema.index({ isActive: 1, popularity: -1 });
destinationSchema.index({ searchText: 1 });
destinationSchema.index({ location: '2dsphere' }, { sparse: true });

export type DestinationDoc = InferSchemaType<typeof destinationSchema>;
export const Destination = model('Destination', destinationSchema, 'destinations');
