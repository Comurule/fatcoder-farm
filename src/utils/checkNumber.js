export const getNumber = (num, alternative) => {
  const n = Number(num);
  return Number.isNaN(n) ? alternative : n;
};

export const getThousand = (num) => Math.floor(num / 1000);
