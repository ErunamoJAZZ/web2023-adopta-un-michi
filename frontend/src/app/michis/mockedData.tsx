const cats = {
  cats: [
    {
      id: 1,
      name: 'Whiskers',
      description: 'A fluffy orange tabby cat.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 3.5,
      personality: 'Playful and friendly',
      sex: 'male',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-01-15T14:30:00Z',
      updated_at: null,
    },
    {
      id: 2,
      name: 'Luna',
      description: 'A sleek black cat with green eyes.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 2.0,
      personality: 'Calm and independent',
      sex: 'female',
      health_state: 'medium',
      is_available: true,
      added_at: '2023-02-10T11:45:00Z',
      updated_at: '2023-04-05T09:15:00Z',
    },
    {
      id: 3,
      name: 'Oscar',
      description: 'A chubby gray cat with a playful spirit.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 5.0,
      personality: 'Curious and mischievous',
      sex: 'male',
      health_state: 'poor',
      is_available: false,
      added_at: '2023-03-20T17:20:00Z',
      updated_at: null,
    },
    {
      id: 4,
      name: 'Mittens',
      description: 'A fluffy white cat with blue eyes.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 1.5,
      personality: 'Affectionate and playful',
      sex: 'female',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-04-01T09:00:00Z',
      updated_at: null,
    },
    {
      id: 5,
      name: 'Leo',
      description: 'A sleek and agile brown tabby cat.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 2.5,
      personality: 'Adventurous and energetic',
      sex: 'male',
      health_state: 'medium',
      is_available: true,
      added_at: '2023-04-10T15:30:00Z',
      updated_at: null,
    },
    {
      id: 6,
      name: 'Bella',
      description: 'A graceful Siamese cat with blue almond-shaped eyes.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 2.5,
      personality: 'Elegant and vocal',
      sex: 'female',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-05-05T10:20:00Z',
      updated_at: null,
    },
    {
      id: 7,
      name: 'Max',
      description: 'A playful and mischievous orange tabby kitten.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 0.8,
      personality: 'Curious and energetic',
      sex: 'male',
      health_state: 'good',
      is_available: true,
      added_at: '2023-05-15T14:55:00Z',
      updated_at: null,
    },
    {
      id: 8,
      name: 'Cleo',
      description: 'A fluffy Maine Coon cat with a majestic appearance.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 3.0,
      personality: 'Gentle and sociable',
      sex: 'female',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-06-10T09:30:00Z',
      updated_at: null,
    },
    {
      id: 9,
      name: 'Simba',
      description: 'A regal Bengal cat with striking spotted fur.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 4.5,
      personality: 'Confident and independent',
      sex: 'male',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-06-25T16:15:00Z',
      updated_at: null,
    },
    {
      id: 10,
      name: 'Misty',
      description: 'A mysterious gray cat with emerald green eyes.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 2.0,
      personality: 'Reserved and observant',
      sex: 'female',
      health_state: 'good',
      is_available: true,
      added_at: '2023-07-05T11:10:00Z',
      updated_at: null,
    },
    {
      id: 11,
      name: 'Oliver',
      description: 'A handsome tuxedo cat with a friendly disposition.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 3.0,
      personality: 'Affectionate and playful',
      sex: 'male',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-07-20T08:45:00Z',
      updated_at: null,
    },
    {
      id: 12,
      name: 'Mocha',
      description: 'A sweet chocolate-point Siamese cat with striking blue eyes.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 2.5,
      personality: 'Gentle and vocal',
      sex: 'female',
      health_state: 'good',
      is_available: true,
      added_at: '2023-08-05T13:20:00Z',
      updated_at: null,
    },
    {
      id: 13,
      name: 'Tiger',
      description: 'A strong and athletic striped Bengal cat.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 4.0,
      personality: 'Adventurous and independent',
      sex: 'male',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-08-15T17:55:00Z',
      updated_at: null,
    },
    {
      id: 14,
      name: 'Lola',
      description: 'A graceful calico cat with a playful nature.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 2.0,
      personality: 'Curious and sociable',
      sex: 'female',
      health_state: 'excellent',
      is_available: true,
      added_at: '2023-09-10T09:30:00Z',
      updated_at: null,
    },
    {
      id: 15,
      name: 'Rocky',
      description: 'A rugged tabby cat with a love for the outdoors.',
      image_url: 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg',
      age: 3.5,
      personality: 'Adventurous and protective',
      sex: 'male',
      health_state: 'good',
      is_available: true,
      added_at: '2023-09-25T14:15:00Z',
      updated_at: null,
    },
  ],
};

export default cats;
