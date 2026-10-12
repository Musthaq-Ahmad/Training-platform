import { useEffect, useState } from 'react';
import type { CourseCertificate } from '@itp/types';
import { getDashboard } from '../api/dashboard';
import { getCertificate } from '../api/certificate';
import { CURRICULUM_COURSES } from '../constants/courses';

const courseOrder = (id: string) => CURRICULUM_COURSES.findIndex((c) => c.id === id);

/** Certificates the trainee has earned, in curriculum order. Empty on any failure. */
export function useEarnedCertificates(): CourseCertificate[] {
  const [certificates, setCertificates] = useState<CourseCertificate[]>([]);

  useEffect(() => {
    let cancelled = false;

    getDashboard()
      .then((dashboard) =>
        Promise.all(dashboard.completedCourseIds.map((id) => getCertificate(id).catch(() => null)))
      )
      .then((list) => {
        if (cancelled) return;
        const earned = list.filter((c): c is CourseCertificate => c !== null);
        setCertificates(earned.sort((a, b) => courseOrder(a.courseId) - courseOrder(b.courseId)));
      })
      .catch(() => {
        // The Certificates row is optional: if it can't load, it stays hidden.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return certificates;
}
