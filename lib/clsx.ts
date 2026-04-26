type Class = string | false | null | undefined;

export function clsx(...classes: Class[]): string {
  return classes.filter(Boolean).join(' ');
}
