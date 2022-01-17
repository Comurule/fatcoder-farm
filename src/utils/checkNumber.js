exports.getNumber = (num, alternative) => {
  const n = Number(num);
  return Number.isNaN(n) ? alternative : n;
};

exports.getThousand = (num) => Math.floor(num / 1000);
