import { FieldSpec } from "../interfaces";

export const simpleModel = {
  name: "John",
  age: 30,
  notes: "# The Outing\nWe went to the park at *09h00* on a **sunny** day.",
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
  "bundle.address.state": ["required validation failed"],
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
