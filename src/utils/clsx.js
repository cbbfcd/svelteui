export function clsx(classObject = {}) {
  return Object.entries(classObject)
    .filter(([name, value]) => name !== '' && !!value)
    .map(([name]) => name)
    .join(' ');
}
