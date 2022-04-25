const crypto = require('crypto');
// import crypto from 'crypto';

const timeSlots = {
  hour: new Date(),
  availability: 2,
};

const Appointments = [{
  id: crypto.randomUUID(),
  name: 'iury',
  birthDate: new Date(),
  vaccineDate: new Date(1995, 11, 17, 3, 24, 0),
  isVaccined: false,
  timeSlots,
}];

module.exports = Appointments;
