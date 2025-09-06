export function getTranslateKey(key: string, prefix?: string | null): string {
  const isRoot = key.startsWith('.');
  prefix = isRoot ? '' : prefix ?? '';
  key = isRoot ? key.substring(1) : key;
  return prefix + key;
}
