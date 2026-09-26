import { prisma } from '../../lib/prisma';

export class AuthRepository {
  findBymail(email: string) {
    return prisma.trainee.findUnique({ where: { email } });
  }
  findById(id: string) {
    return prisma.trainee.findUnique({ where: { id } });
  }
}
