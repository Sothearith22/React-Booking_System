import * as Yup from 'yup';

export const roomSchema = Yup.object({
  service_id: Yup.number()
    .typeError('Service is required')
    .required('Service is required')
    .positive('Invalid service selected')
    .integer('Invalid service selected'),

  name: Yup.string()
    .trim()
    .required('Room name is required')
    .min(3, 'Room name must be at least 3 characters')
    .max(100, 'Room name must not exceed 100 characters'),

  description: Yup.string()
    .trim()
    .nullable()
    .max(1000, 'Description must not exceed 1000 characters'),

  price_per_night: Yup.number()
    .typeError('Price per night must be a valid number')
    .required('Price per night is required')
    .min(0, 'Price per night cannot be negative'),

  capacity: Yup.number()
    .typeError('Capacity must be a valid number')
    .required('Capacity is required')
    .integer('Capacity must be a whole number')
    .min(1, 'Capacity must be at least 1')
    .max(20, 'Capacity is too large'),

  amenities: Yup.array()
    .of(Yup.string().trim())
    .default([]),

  status: Yup.string()
    .oneOf(
      ['available', 'occupied', 'maintenance', 'inactive'],
      'Invalid room status'
    )
    .default('available'),

  images: Yup.array()
    .of(
      Yup.mixed().test(
        'fileType',
        'Only image files are allowed',
        (value) => {
          // Allow empty values and existing URLs
          if (!value || typeof value === 'string') return true;

          // Validate uploaded files
          if (value instanceof File) {
            return value.type.startsWith('image/');
          }

          return true;
        }
      )
    )
    .default([]),
});

/**
 * Default values for creating a new room.
 */
export const roomInitialValues = {
  service_id: '',
  name: '',
  description: '',
  price_per_night: '',
  capacity: 1,
  amenities: [],
  status: 'available',
  images: [],
};