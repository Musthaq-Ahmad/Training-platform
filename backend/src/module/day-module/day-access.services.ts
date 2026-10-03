import { dayAccessRepository } from './day-access.repository';
import { NotFoundError, DayLockedError } from '../../errors/AppError';

/**
 * Throws if the trainee may not open this day. There is no day_unlock table: a day is unlocked
 * when it is already completed, when it is the very first day, or when the day before it
 * (course order, then day number) is completed.
 *
 * Unknown day -> 404 first, then locked -> 403 (FR-1). The server decides, not the UI.
 */
export async function assertDayIsAccessible(traineeId: string, dayId: string): Promise<void> {
  const day = await dayAccessRepository.findDayWithOrder(dayId);
  if (!day) throw new NotFoundError('Day not found');

  const isCompleted = await dayAccessRepository.findCompletion(traineeId, dayId);
  if (isCompleted) return;

  const previousDay = await dayAccessRepository.findPreviousDay(
    day.course.sort_order,
    day.day_number
  );
  if (!previousDay) return; // the first day of the curriculum is always open

  const hasFinishedPreviousDay = await dayAccessRepository.findCompletion(
    traineeId,
    previousDay.id
  );
  if (!hasFinishedPreviousDay) throw new DayLockedError();
}
