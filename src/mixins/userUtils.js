const uuidv1 = require('uuid/v1');

export default {
  methods: {
    addId() {
      return uuidv1(); // Is a simply mock for the exercise. This feature must do in BACKEND.
    },

    transformDate(date) {
      return new Date(date).toISOString();
    },

    getDateStamp(date) {
      const newDate = new Date(date);
      let r = '';

      r += `0${newDate.getDate()}`.slice(-2);
      r += '-';
      r += `0${newDate.getMonth() + 1}`.slice(-2);
      r += '-';
      r += newDate.getFullYear();

      return r;
    },
  },
};
