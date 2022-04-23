/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */

import crypto from 'crypto';
import { getHours } from 'date-fns';
import Joi from 'joi';
import Appointments from '../model/AppointmentModel.js';

const schema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  birthDate: Joi.date().required(),
  vaccineDate: Joi.date().required(),
});

class AppointmentController {
  index(request, response) {
    Appointments.sort((a, b) => a.vaccineDate - b.vaccineDate);
    return response.send(Appointments);
  }

  getOne(request, response) {
    const { id } = request.params;

    const appointmentRequest = Appointments.find((appointment) => appointment.id === id);

    if (appointmentRequest) {
      return response.send({ appointmentRequest });
    }

    return response.status(404).send({ message: 'appointment not exist' });
  }

  store(request, response) {
    const { name, birthDate, vaccineDate } = request.body;
    const schemaValidation = schema.validate(request.body, {
      abortEarly: false,
    });

    if (schemaValidation.error) {
      return response.status(400).json(
        {
          error: schemaValidation.error.details.map(({ message }) => message),
          message: 'Invalid data',
        },
      );
    }
    const actualDate = new Date();
    const parsedDate = new Date(vaccineDate);

    const appointment = {
      name,
      birthDate,
      vaccineDate: new Date(vaccineDate),
      id: crypto.randomUUID(),
      timeSlots: {
        hour: getHours(new Date(vaccineDate)),
        availability: 2,
      },
    };

    const isNotValidDate = parsedDate.getFullYear() < actualDate.getFullYear()
                     || parsedDate.getMonth() < actualDate.getMonth()
                     || (parsedDate.getHours() < actualDate.getHours()
                     && parsedDate.getDay() === actualDate.getDay());

    if (isNotValidDate) {
      return response.status(404).json({ error: 'No appointments available on the day' });
    }

    let contador = 1;
    Appointments.forEach((element) => {
      if (element.vaccineDate.getDate() === parsedDate.getDate()
      && element.vaccineDate.getMonth() === parsedDate.getMonth()) {
        if (contador >= 20) {
          return response.status(404).json({ message: 'No appointments available on the day' });
        }
        if (element.timeSlots.hour === getHours(parsedDate)) {
          if (element.timeSlots.availability > 0) {
            element.timeSlots.availability -= 1;
            element.isAvaliable = false;
            Appointments.push(element);
            return response.status(200).json({ message: 'Appointment created with sucess' });
          }
          return response.status(404).json({ message: 'No appointment available at this time' });
        }
        contador += 1;
      }
    });

    appointment.timeSlots.availability -= 1;
    Appointments.push(appointment);

    return response.status(200).json({ message: 'Appointment created with sucess' });
  }

  remove(request, response) {
    const { id } = request.params;
    console.log(id);
    const appointmentIndex = Appointments.findIndex((appointment) => appointment.id === id);
    console.log(appointmentIndex);
    if (appointmentIndex < 0) {
      return response.status(400).json({ error: 'appointment not exist' });
    }

    Appointments.slice(appointmentIndex, 1);

    return response.status(204).send();
  }

  update(request, response) {
    const { id } = request.params;
    const { name, birthDate, vaccineDate } = request.body;

    const appointmentIndex = Appointments.findIndex((appointment) => appointment.id === id);

    if (appointmentIndex < 0) {
      return response.status(400).json({ error: 'appointment not exist' });
    }

    const appointment = {
      id,
      name,
      birthDate,
      vaccineDate,
    };

    Appointments[appointmentIndex] = appointment;

    return response.json(appointment);
  }
}

export default AppointmentController;
