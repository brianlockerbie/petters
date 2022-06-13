module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  checkTruthy: (obj) => {
    if (obj == true) {
      return `true`;
    } else {
      return `false`;
    }
  },

  checkCounter: (item) => {
    return item.length;
  },

  checkImage: (item) => {
    if (item.includes('https') || item.includes('http')) {
      return '';
    } else {
      return '/';
    }
  },
};
