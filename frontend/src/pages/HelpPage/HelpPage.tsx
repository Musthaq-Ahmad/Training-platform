import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  BookOpen,
  Code,
  Database,
  Keyboard,
  NotebookPen,
  Search,
  Wrench,
} from 'lucide-react';
import Header from '../../components/Header';
import { DAY_FLOW_STEPS, HELP_TOPICS, type HelpTopic, type HelpTopicId } from '../../content/help';
import { filterHelpTopics } from '../../lib/filterHelpTopics';
import styles from './HelpPage.module.css';

const TOPIC_ICONS: Record<HelpTopicId, LucideIcon> = {
  days: BookOpen,
  tasks: Code,
  sql: Database,
  typing: Keyboard,
  journal: NotebookPen,
  progress: Activity,
  troubleshooting: Wrench,
};

function DayFlow() {
  return (
    <section className={styles.flow} aria-labelledby="day-flow-title">
      <h2 id="day-flow-title" className={styles.sectionLabel}>
        How a training day works
      </h2>
      <ol className={styles.steps}>
        {DAY_FLOW_STEPS.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepText}>{step.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function TopicCards() {
  return (
    <section aria-labelledby="topics-title">
      <h2 id="topics-title" className={styles.sectionLabel}>
        Explore the platform
      </h2>
      <ul className={styles.cards}>
        {HELP_TOPICS.map((topic) => {
          const Icon = TOPIC_ICONS[topic.id];
          return (
            <li key={topic.id}>
              <a className={styles.card} href={`#topic-${topic.id}`}>
                <Icon className={styles.cardIcon} size={20} aria-hidden="true" />
                <span className={styles.cardTitle}>{topic.title}</span>
                <span className={styles.cardSummary}>{topic.summary}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function TopicSection({ topic }: { topic: HelpTopic }) {
  const Icon = TOPIC_ICONS[topic.id];
  return (
    <section
      id={`topic-${topic.id}`}
      className={styles.topic}
      aria-labelledby={`title-${topic.id}`}
    >
      <h2 id={`title-${topic.id}`} className={styles.topicTitle}>
        <Icon size={18} aria-hidden="true" />
        {topic.title}
      </h2>
      <div className={styles.questions}>
        {topic.questions.map((item) => (
          <details key={item.id} id={item.id} className={styles.question}>
            <summary className={styles.summary}>{item.question}</summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const { hash } = useLocation();

  const topics = useMemo(() => filterHelpTopics(HELP_TOPICS, query), [query]);
  const isSearching = query.trim().length > 0;
  const resultCount = topics.reduce((total, topic) => total + topic.questions.length, 0);

  // Deep links such as /help#day-locked open that answer and scroll to it.
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    if (target instanceof HTMLDetailsElement) target.open = true;
    target.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.hero}>
          <h1 className={styles.title}>How can we help?</h1>
          <p className={styles.subtitle}>Find answers and get unstuck.</p>

          <div className={styles.search} role="search">
            <Search className={styles.searchIcon} size={16} aria-hidden="true" />
            <input
              type="search"
              className={styles.searchInput}
              aria-label="Search help"
              placeholder="Search help..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {isSearching && (
            <p className={styles.resultStatus} role="status">
              {resultCount === 0
                ? `No results for "${query.trim()}"`
                : `${resultCount} ${resultCount === 1 ? 'result' : 'results'}`}
            </p>
          )}
        </div>

        {!isSearching && (
          <>
            <DayFlow />
            <TopicCards />
          </>
        )}

        {topics.map((topic) => (
          <TopicSection key={topic.id} topic={topic} />
        ))}
      </main>
    </>
  );
}
