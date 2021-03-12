import { startOfHour } from 'date-fns'
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../respositories/AppointmentsRepository';

interface RequesteTDO {
    provider: string,
    date: Date
}

class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository
    }

    public execute({ provider, date }: RequesteTDO): Appointment {

        const appointmentDate = startOfHour(date);

        const findAppointmentInsameDate = this.appointmentsRepository.findByDate(appointmentDate);


        if (findAppointmentInsameDate) {
            throw Error('Já possui horario agendado nesse horario');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        })


        return appointment

    }
}

export default CreateAppointmentService;