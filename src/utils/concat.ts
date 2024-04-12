export default function concat(...args: any[]) {
  return args.filter((x) => !!x).join(' ');
}
