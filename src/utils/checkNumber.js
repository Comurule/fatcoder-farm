exports.getNumber = (num, alternative) => {
    const n = Number(num);
    return isNaN(num) ? alternative : num;
};

exports.getThousand = (num) => {
    return Math.floor(num / 1000);
};