import { FieldSpec } from "../interfaces";

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
