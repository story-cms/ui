---
title: 'Story CMS'
group: 'top'
icon: 'carbon:bookmark'
---

# Chapter Configuration

The shape of a story chapter in Story CMS can be configured in the `config/story.ts` file.
The chapter configuration is composed of different widgets and it determines two things:

1. the structure of the chapter bundles that will we delivered via the api
2. the presentation of the input form that editors will use to create and edit chapters

The chapter configuration is highly inspired by
[Netlify CMS Widgets](https://www.netlifycms.org/docs/widgets/)

## Common widget properties:

- `label`: Display Name of the widget
- `name`: Api key of the widget
- `widget`: Type of the widget
- `isReadOnly`: `true` | `false`

Following are the widgets that are currently implemented:

## Primitive widget types

### string

Suitable for short, single line plain text strings. It has only the common properties and
renders a [StringField](./Draft/StringField.story.vue)

### markdown

Suitable for longer, multi-line rich text which allows markup in markdown format and
renders a [MarkdownField](./Draft/MarkdownField.story.vue).

### image

Holds a url to a hosted image file. Suitable for allowing content editors to upload image
files and renders a [ImageField](./Draft/ImageField.story.vue).  
Has one special key called `uploadPreset` which expects a string specifying the Cloudinary
upload preset for this image.

example:

```ts
{
  label: 'Image',
  name: 'imageUrl',
  widget: 'image',
  uploadPreset: 'session_thumbnail',
},
```

### boolean

A boolean toggle switch that renders a [BooleanField](./Draft/BooleanField.story.vue). Has
one required special key called `default` which has to have a value of true or false.

example:

```ts
{
  label: 'Is Featured',
  name: 'isFeatured',
  widget: 'boolean',
  default: false,
}
```

### select

A dropdown menu that renders a [SelectField](./Draft/SelectField.story.vue). Has two
special required keys called `options` and `default` which expects an array of objects
with `label` and `value` keys and a string value respectively.

example:

```ts
{
  name: 'airport',
  label: 'City',
  widget: 'select',
  options: [
    { label: 'Chicago', value: 'CHG' },
    { label: 'Paris', value: 'PRS' },
    { label: 'Tokyo', value: 'TKY' },
  ],
  default: 'PRS',
}
```

## Compound widget types

### object

Suitable for composing primitive widgets into a logical unit.  
Has one specialised field called `fields` which is an object with key / value pairs.  
A primitive field key should correspond to the field's name.  
The object label can't be omitted, but can be left blank to achieve a non-hierarchical
look when rendered.  
When using an object widget, the data bundle will also be nested.

example:

```ts
{
  label: 'Passage',
  name: 'nt',
  widget: 'object',
  fields: {
    reference: {
      label: 'Reference',
      name: 'reference',
      widget: 'string',
    },
    quote: {
      label: 'NIV',
      name: 'quote',
      widget: 'markdown',
    },
  }
}
```

### panel

Suitable to group several primitive fields visually together.  
Has one specialised field called `fields` which is a list with primitive fields that
should be grouped together visually.  
Note: The same visual effect can be achieved by wrapping primitive fields in an `object`
widget, but the data bundle shape would not be nested.

example:

```ts
{
  widget: 'panel',
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Image',
      name: 'imageUrl',
      widget: 'image',
    },
    {
      label: 'Video URL',
      name: 'videoUrl',
      widget: 'string',
    },
  ],
},
```

### list

Suitable for a collection of sets of primitive fields. Has one specialised field called
`fields` which is a list with primitive fields that define a set. The first field in the
set will be used in the widget as an identifier.

example:

```ts
{
  label: 'Sections',
  name: 'sections',
  widget: 'list',
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
    },
    {
      label: 'Intro',
      name: 'intro',
      widget: 'markdown',
    }
  ]
}
```

### scripture

A compound widget that renders a [ScriptureField](./Draft/ScriptureField.story.vue). It
has a Bible reference field that can take a scripture reference and a markdown field for
the scripture text. It has no special keys.

example:

```ts
{
  label: 'NT Passage',
  name: 'nt',
  widget: 'scripture',
}
```
