import { Schema } from 'mongoose';

/** Image stored in Cloudinary (or any CDN). publicId lets us delete/transform later. */
export const imageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true },
    alt: { type: String, trim: true, maxlength: 200 },
  },
  { _id: false },
);

/** GeoJSON Point. Coordinates are [longitude, latitude]. */
export const pointSchema = new Schema(
  {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (v: number[]) =>
          v.length === 2 &&
          v[0]! >= -180 &&
          v[0]! <= 180 &&
          v[1]! >= -90 &&
          v[1]! <= 90,
        message: 'coordinates must be [longitude, latitude]',
      },
    },
  },
  { _id: false },
);
