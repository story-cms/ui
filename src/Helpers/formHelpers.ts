export const isPrimitive = (widget: string): boolean =>
  ["string", "markdown", "image"].some((val) => val === widget);

export const dynamicPrimitive = (widget: string): string => {
  if (!isPrimitive(widget)) return "NullField";

  const up = widget[0].toUpperCase() + widget.substr(1);
  return `${up}Field`;
};

export const dynamicWidget = (widget: string): string => {
  const up = widget[0].toUpperCase() + widget.substring(1);
  return `${up}Field`;
};

export const addField = (
  event: Event,
  form: Record<string, any>,
  key: string,
) => {
  event.preventDefault();
  form[key].push({});
};

// https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path
const resolvePath = (
  object: Record<string | number, any>,
  path: string,
  defaultValue: Object = {},
): Object =>
  path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), object);

export const addDeepField = (model: Record<string, any>, path: string) => {
  const list = resolvePath(model, path) as Array<any>;
  list.push({});
};

export const removeField = (
  event: Event,
  form: Record<string, any>,
  key: string,
  index: number,
) => {
  event.preventDefault();
  form[key].splice(index, 1);
};

export const padZero = (value: number): string =>
  value > 9 ? `${value}` : `0${value}`;

export const validateFile = (file: File) => {
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".svg"];

  if (!allowedExtensions.some((extension) => file["name"].endsWith(extension)))
    throw new Error(`Invalid file! Use an image instead.`);

  if (file["size"] > 5662310) throw new Error(`File size is too large.`);
};
