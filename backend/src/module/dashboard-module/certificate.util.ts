import { createHash } from 'node:crypto';

export function buildCertificateId(traineeId: string, courseId: string): string {
  const hash = createHash('sha256').update(`${traineeId}:${courseId}`).digest('hex');
  return `VK-${hash.slice(0, 10).toUpperCase()}`;
}
