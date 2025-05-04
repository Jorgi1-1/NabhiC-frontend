import { HttpError } from 'wasp/server'

export const getTattoos = async (args, context) => {
  const { category } = args;
  let filter = {};
  if (category) {
    filter = { category };
  }
  return context.entities.Tattoo.findMany({
    where: filter
  });
}

export const getAppointments = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Appointment.findMany({
    where: {
      userId: context.user.id
    }
  });
}
