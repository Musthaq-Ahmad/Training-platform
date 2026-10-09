import { Link } from 'react-router';
import { Award } from 'lucide-react';
import type { CourseCertificate } from '@itp/types';
import { formatCertificateDate } from '../../lib/certificate';
import styles from './CertificateList.module.css';

/** The trainee's earned certificates. Renders nothing when there are none. */
export default function CertificateList({ certificates }: { certificates: CourseCertificate[] }) {
  if (certificates.length === 0) return null;

  return (
    <section className={styles.card} aria-labelledby="certificates-heading">
      <h2 id="certificates-heading" className={styles.heading}>
        Certificates
      </h2>
      <ul className={styles.list}>
        {certificates.map((certificate) => (
          <li key={certificate.courseId}>
            <Link to={`/certificates/${certificate.courseId}`} className={styles.item}>
              <Award size={18} aria-hidden="true" />
              <span className={styles.course}>{certificate.courseTitle}</span>
              <span className={styles.date}>{formatCertificateDate(certificate.completedAt)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
