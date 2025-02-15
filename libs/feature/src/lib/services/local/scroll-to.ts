export const scrollTo = (path: string) => {
  document.getElementById(path)?.scrollIntoView({ behavior: 'smooth' });
};
