import { FieldSpec } from "../interfaces";

export const simpleModel = {
  name: "John",
  age: 30,
  notes: "# The Outing\nWe went to the park at *09h00* on a **sunny** day.",
  profile:
    "https://res.cloudinary.com/onesheep/image/upload/v1669793982/cld-sample-2.jpg",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
};

export const simpleErrors = {
  "bundle.name": ["required validation failed"],
  "bundle.notes": ["required validation failed"],
  "bundle.profile": ["required validation failed"],
  "bundle.address.zip": ["required validation failed"],
};

export const panelModel = {
  title: "John",
  description: "# Read about John",
};

export const panelErrors = {
  "bundle.title": ["required validation failed"],
};

export const listSpec = {
  label: "Sections",
  name: "sections",
  widget: "list",
  isReadOnly: false,
  fields: [
    {
      label: "Reference",
      name: "reference",
      widget: "string",
      isReadOnly: false,
    },
    {
      label: "NIV",
      name: "quote",
      widget: "markdown",
      isReadOnly: false,
    },
  ],
};

export const listModel = {
  sections: [
    {
      reference: "John 1:1",
      quote:
        "In the beginning was the **Word**, and the Word was with God, and the Word was God.",
    },
    { reference: "John 1:2", quote: "He was with God in the beginning." },
  ],
};

export const listErrors = {
  "bundle.sections.1.reference": ["required validation failed"],
};

export const listInListModel = {
  spreads: [
    {
      title: "Spread 1",
      notes: [
        { type: "definition", content: "`grace` is a noun." },
        {
          type: "comment",
          content: "paragraph **1**\nparagraph **2**\nparagraph **3**",
        },
      ],
    },
    { title: "Spread 2", notes: [] },
  ],
};

export const listInListErrors = {
  "bundle.spreads.0.notes.1.content": ["bad!"],
};

export const listInListSpec: FieldSpec = {
  label: "Spreads",
  name: "spreads",
  widget: "list",
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
    },
    {
      label: "Notes",
      name: "notes",
      widget: "list",
      fields: [
        {
          label: "Frame type",
          name: "type",
          widget: "string",
        },
        {
          label: "Frame content",
          name: "content",
          widget: "markdown",
        },
      ],
    },
  ],
};
