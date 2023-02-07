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

Following are the widgets that are currently implemented:

[string](#string), [number](#number), [markdown](#markdown), [image](#image),
[boolean](#boolean), [select](#select), [object](#object), [panel](#panel), [list](#list),
[scripture](#scripture)

---

## string

Suitable for short, single line plain text strings. It has only the common properties and
renders a [StringField](./Draft/StringField.story.vue)

## number

Suitable for whole or decimal numbers and renders a
[NumberField](./Draft/NumberField.story.vue) It has one optional special property:

- `default` accepts string or number value; defaults to empty string

Example:

```ts
{
  label: 'Duration',
  name: 'duration',
  widget: 'number',
  default: 1,
},
```

## markdown

Suitable for longer, multi-line rich text which allows markup in markdown format and
renders a [MarkdownField](./Draft/MarkdownField.story.vue). On top of the common widget
properties, a markdown field has these optional extra properties:

- `minimal` a boolean value which is `false` by default. `minimal` sets the widget to the
  minimal height possible.
- `buttons` accepts an array of strings
  `['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', 'code', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'link', 'image', 'upload-image', 'table', 'horizontal-rule', 'preview', 'side-by-side', 'fullscreen', 'guide','undo', 'redo']`
  representing the formatting buttons to display.

Minimal and buttons example:

```ts
{
  label: 'Excerpt',
  name: 'excerpt',
  widget: 'markdown',
  minimal: true,
  buttons: [ 'bold', 'italic', 'heading', 'quote', '|','unordered-list']
},
```

Remove the toolbar by passing an empty buttons array. Example:

```ts
{
  label: 'Excerpt',
  name: 'excerpt',
  widget: 'markdown',
  minimal: true,
  buttons: []
},
```

## image

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

## boolean

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

## select

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

## object

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

## panel

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

## list

A compound widget that renders a [ListField](./Draft/ListField.story.vue). A list is
suitable for a collection of sets of other fields. The list has these specialised keys:

- `fields`: required, a list with primitive fields that define a set
- `index`: optional, a string that specifies which field in the set should be used as an
  identifier. If left out the first field in the set will be used.
- `canFold`: optional, a boolean that specifies whether the list items can be folded
  (collapsed) or not. Defaults to `false`.

example:

```ts
{
  label: 'Section',
  name: 'sections',
  widget: 'list',
  index: 'passage.reference',
  canFold: true,
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
    },
    {
      label: 'Passage',
      name: 'paxssage',
      widget: 'scripture',
    },
  ]
}
```

## scripture

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
