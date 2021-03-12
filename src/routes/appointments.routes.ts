import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../respositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointsServices';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentRepository();


appointmentsRouter.get('/', (request, response) => {

    const appointments = appointmentsRepository.all()

    return response.status(200).json(appointments)

})

appointmentsRouter.post('/', (request, response) => {
    try {

        const { provider, date } = request.body

        const parsedDate = parseISO(date)

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({ provider, date: parsedDate })

        return response.status(201).json(appointment)
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
})

export default appointmentsRouter;