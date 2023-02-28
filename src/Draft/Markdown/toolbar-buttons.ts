import type EasyMDE from 'easymde';

export interface EditorButton {
  name: string;
  className?: string;
  title?: string;
  // eslint-disable-next-line no-unused-vars
  action?: (instance: EasyMDE) => void;
}

export const customToolbarButtons: EditorButton[] = [
  {
    name: 'footnote',
    className: 'fa fa-asterisk',
    title: 'Footnote Button',
    action: (instance: EasyMDE) => {
      const selection = instance.codemirror.getSelection();
      const newValue = `[${selection}](^${selection})`;
      return instance.codemirror.replaceSelection(newValue);
    },
  },
  {
    name: 'superscript',
    className: 'fa fa-superscript',
    title: 'Verse number',
    action: (instance: EasyMDE) => {
      const selection = instance.codemirror.getSelection();
      const newValue = '`' + selection + '`';
      return instance.codemirror.replaceSelection(newValue);
    },
  },
];

export const defaultButtons: string[] = [
  'bold',
  'italic',
  'unordered-list',
  'ordered-list',
  '|',
  'guide',
];
