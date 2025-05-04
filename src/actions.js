import { HttpError } from 'wasp/server'

export const createAppointment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { date, name, email, tattooStyle, bodyPlacement, size, notes } = args;

  const newAppointment = await context.entities.Appointment.create({
    data: {
      date,
      name,
      email,
      tattooStyle,
      bodyPlacement,
      size,
      notes: notes || null,
      userId: context.user.id
    }
  });

  return newAppointment;
}
