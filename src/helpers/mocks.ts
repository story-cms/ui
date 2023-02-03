import { FieldSpec } from '../interfaces';

export const objectModel = {
  name: 'John',
  age: 30,
  notes: '# The Outing\nWe went to the park at *09h00* on a **sunny** day.',
  profile:
    'https://res.cloudinary.com/onesheep/image/upload/v1669793982/cld-sample-2.jpg',
  address: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    favoriteScripture: {
      reference: 'John 3:16',
      verse:
        '`16` For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    },
  },
};

export const objectSpec = {
  name: 'address',
  label: '',
  widget: 'object',
  fields: [
    {
      name: 'street',
      label: 'Street',
      widget: 'string',
    },
    {
      name: 'city',
      label: 'City',
      widget: 'string',
    },
    {
      name: 'zip',
      label: 'Zip',
      widget: 'string',
    },
    {
      name: 'favoriteScripture',
      label: 'Favorite Scripture',
      widget: 'scripture',
    },
  ],
};

export const objectErrors = {
  'bundle.name': ['required validation failed'],
  'bundle.notes': ['required validation failed'],
  'bundle.profile': ['required validation failed'],
  'bundle.address.zip': ['required validation failed'],
  'bundle.address.favoriteScripture': ['required validation failed'],
};

export const listInObjectSpec: FieldSpec = {
  name: 'spread',
  label: 'Spread',
  widget: 'object',
  fields: [
    {
      name: 'scriptureReference',
      label: 'Scripture Reference',
      widget: 'string',
    },
    {
      label: 'Notes',
      name: 'notes',
      widget: 'list',
      fields: [
        {
          label: 'Frame type',
          name: 'type',
          widget: 'string',
        },
        {
          label: 'Frame content',
          name: 'content',
          widget: 'markdown',
        },
      ],
    },
  ],
};

export const listInObjectModel = {
  spread: {
    scriptureReference: 'John 1:1',
    notes: [
      { type: 'definition', content: '`grace` is a noun.' },
      {
        type: 'comment',
        content: 'paragraph **1**\nparagraph **2**\nparagraph **3**',
      },
    ],
  },
};

export const listInObjectError = {
  'bundle.spread.notes.0.content': ['required validation failed'],
};

export const panelModel = {
  title: 'John',
  description: '# Read about John',
};

export const panelErrors = {
  'bundle.title': ['required validation failed'],
};

export const listSpec = {
  label: 'Section',
  name: 'sections',
  widget: 'list',
  index: 'scripture.reference',
  isReadOnly: false,
  fields: [
    {
      label: 'Scripture',
      name: 'scripture',
      widget: 'scripture',
      isReadOnly: false,
    },
    {
      label: 'Commentary',
      name: 'commentary',
      widget: 'markdown',
      isReadOnly: false,
      minimal: true,
      buttons: ['bold', 'italic', 'heading', 'quote', '|', 'unordered-list'],
    },
  ],
};

export const listModel = {
  sections: [
    {
      scripture: {
        reference: 'John 1:1',
        verse:
          '`1` In the beginning was the Word, and the Word was with God, and the Word was God.',
      },
      commentary:
        'In the beginning was the **Word**, and the Word was with God, and the Word was God.',
    },
    {
      scripture: {
        reference: 'John 1:2',
        verse: '`2` He was with God in the beginning.',
      },
      commentary: 'He was with God in the beginning.',
    },
  ],
};

export const listErrors = {
  'bundle.sections.1.scripture': ['required validation failed'],
};

export const listInListSpec: FieldSpec = {
  label: 'Spread',
  name: 'spreads',
  widget: 'list',
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Notes',
      name: 'notes',
      widget: 'list',
      fields: [
        {
          label: 'Frame type',
          name: 'type',
          widget: 'select',
          options: [
            { label: 'Definition', value: 'definition' },
            { label: 'Comment', value: 'comment' },
          ],
          default: 'definition',
        },
        {
          label: 'Frame content',
          name: 'content',
          widget: 'markdown',
        },
      ],
    },
  ],
};

export const listInListModel = {
  spreads: [
    {
      title: 'Spread 1',
      notes: [
        { type: 'definition', content: '`grace` is a noun.' },
        {
          type: 'comment',
          content: 'paragraph **1**\nparagraph **2**\nparagraph **3**',
        },
      ],
    },
    { title: 'Spread 2', notes: [] },
  ],
};

export const listInListErrors = {
  'bundle.spreads.0.notes.1.content': ['bad!'],
};

export const objectInListInObjectSpec: FieldSpec = {
  name: 'episode',
  label: 'Episode',
  widget: 'object',
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
    },
    {
      name: 'spreads',
      label: 'Spreads',
      widget: 'list',
      fields: [
        {
          name: 'scriptureReference',
          label: 'Scripture Reference',
          widget: 'string',
        },
        {
          label: 'Scripture',
          name: 'scripture',
          widget: 'object',
          fields: [
            {
              label: 'Verse',
              name: 'verse',
              widget: 'markdown',
            },
            {
              label: 'Callout',
              name: 'callout',
              widget: 'string',
            },
          ],
        },
      ],
    },
  ],
};

export const objectInListInObjectModel = {
  episode: {
    title: 'The Outing',
    spreads: [
      {
        scriptureReference: 'John 1:1',
        scripture: {
          verse:
            'In the beginning was the **Word**, and the Word was with God, and the Word was God.',
          callout: 'The Word',
        },
      },
      {
        scriptureReference: 'John 1:2',
        scripture: {
          verse: 'He was with God in the beginning.',
          callout: 'He',
        },
      },
    ],
  },
};

export const objectInListInObjectErrors = {
  'bundle.episode.spreads.0.scripture.callout': ['required validation failed'],
  'bundle.episode.spreads.1.scripture.verse': ['required validation failed'],
};

export const scriptureSpec: FieldSpec = {
  name: 'scripture',
  label: 'Scripture',
  widget: 'scripture',
  isReadOnly: false,
};

export const scriptureModel = {
  scripture: {
    reference: 'John 3:16-17',
    verse:
      '`16` For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.  `17` For God sent not his Son into the world to condemn the world; but that the world through him might be saved.',
  },
};

export const scriptureInListSpec: FieldSpec = {
  name: 'scriptures',
  label: 'Scriptures',
  widget: 'list',
  fields: [
    {
      name: 'scripture',
      label: 'Scripture',
      widget: 'scripture',
    },
  ],
};

export const scriptureInListModel = {
  scriptures: [
    {
      scripture: {
        reference: 'John 3:16',
        verse:
          '`16` For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
      },
    },
    {
      scripture: {
        reference: 'John 3:17',
        verse:
          '`17` For God sent not his Son into the world to condemn the world; but that the world through him might be saved.',
      },
    },
  ],
};

export const scriptureInListError = {
  'bundle.scriptures.0.scripture': ['required validation failed'],
};
