import Prism from 'prismjs';
import React from 'react';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

import { getDayReference } from '../../content/data/getDayReference';
import styles from './ReferencePage.module.css';
import Header from '../../components/Header';

type ReferencePageProps = {
  dayId: string;
};

const renderToken = (token: Prism.Token | string, key: string): React.ReactNode => {
  if (typeof token === 'string') {
    return token;
  }

  const content = Array.isArray(token.content)
    ? token.content.map((item, index) => renderToken(item, `${key}-${index}`))
    : renderToken(token.content, `${key}-content`);

  return (
    <span key={key} className={`token ${token.type}`}>
      {content}
    </span>
  );
};

const getHighlightedCode = (code: string, language: string) => {
  const normalizedLanguage = language
    .toLowerCase()
    .replace('-nolint', '')
    .replace('-live-sample', '');

  const grammar =
    normalizedLanguage === 'html' || normalizedLanguage === 'markup'
      ? Prism.languages.markup
      : (Prism.languages[normalizedLanguage] ?? Prism.languages.markup);

  return Prism.tokenize(code, grammar);
};

const ReferencePage = ({ dayId }: ReferencePageProps) => {
  const content = getDayReference(dayId);

  if (!content) {
    return (
      <main className={styles.page}>
        <p className={styles.error}>No reference content found for this day.</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Header />
      <a href={`/days/${dayId}`} className={styles.backLink}>
        ← Back to day overview
      </a>

      {/* Outer Reference Container */}
      <div className={styles.referenceContainer}>
        {content.videoAtStart && content.videos?.length ? (
          <section className={styles.videoSection}>
            <h2>Video</h2>

            {content.videos.map((video) => (
              <div key={video.embedUrl} className={styles.videoCard}>
                <h3 className={styles.videoTitle}>{video.title}</h3>

                <iframe
                  className={styles.videoFrame}
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  {...{ credentialless: 'true' }}
                />
              </div>
            ))}
          </section>
        ) : null}

        {/* Reference Sections */}
        {content.sections.map((section) => (
          <React.Fragment key={section.id}>
            <section key={section.id} className={styles.referenceSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionAccent} />

                <span>
                  {section.number}. {section.heading}
                </span>
              </h2>

              {section.blocks.map((block, index) => {
                /* Paragraph */
                if (block.type === 'paragraph') {
                  return (
                    <p key={index} className={styles.paragraph}>
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'htmlTable') {
                  return (
                    <div key={`html-table-${index}`} className={styles.htmlTableWrapper}>
                      <div
                        className={styles.htmlTable}
                        dangerouslySetInnerHTML={{ __html: block.html }}
                      />
                    </div>
                  );
                }
                /* Definitions */
                if (block.type === 'definitions') {
                  return (
                    <dl key={index} className={styles.definitions}>
                      {block.items.map((item, itemIndex) => (
                        <div key={itemIndex} className={styles.definitionItem}>
                          <dt className={styles.definitionTerm}>{item.term}</dt>

                          <dd className={styles.definitionDescription}>{item.description}</dd>
                        </div>
                      ))}
                    </dl>
                  );
                }
                /* Table */
                if (block.type === 'table') {
                  return (
                    <div key={index} className={styles.tableWrapper}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            {block.headers.map((header, headerIndex) => (
                              <th key={headerIndex}>{header}</th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {block.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>
                                  {cell.startsWith('`') && cell.endsWith('`') ? (
                                    <code className={styles.inlineCode}>
                                      {getHighlightedCode(cell.slice(1, -1), 'html').map(
                                        (token, tokenIndex) =>
                                          renderToken(
                                            token,
                                            `table-token-${rowIndex}-${cellIndex}-${tokenIndex}`
                                          )
                                      )}
                                    </code>
                                  ) : (
                                    cell
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                /* Subheading */
                if (block.type === 'subheading') {
                  if (block.level === 3) {
                    return (
                      <h3 key={index} className={styles.subheading}>
                        {block.text}
                      </h3>
                    );
                  }

                  if (block.level === 4) {
                    return (
                      <h4 key={index} className={styles.subheading}>
                        {block.text}
                      </h4>
                    );
                  }

                  if (block.level === 5) {
                    return (
                      <h5 key={index} className={styles.subheading}>
                        {block.text}
                      </h5>
                    );
                  }

                  return (
                    <h6 key={index} className={styles.subheading}>
                      {block.text}
                    </h6>
                  );
                }

                /* Image */
                if (block.type === 'image') {
                  return (
                    <figure key={index} className={styles.imageFigure}>
                      <img src={block.src} alt={block.alt} className={styles.contentImage} />

                      {block.alt && (
                        <figcaption className={styles.imageCaption}>{block.alt}</figcaption>
                      )}
                    </figure>
                  );
                }

                /* Code */
                if (block.type === 'code') {
                  return (
                    <div key={index} className={styles.codeBlock}>
                      <div className={styles.codeHeader}>
                        <div className={styles.windowDots}>
                          <span />
                          <span />
                          <span />
                        </div>

                        <span className={styles.codeFilename}>{block.code.filename || 'code'}</span>

                        <span className={styles.codeLanguage}>{block.code.language || 'CODE'}</span>
                      </div>

                      <pre>
                        <code>
                          {getHighlightedCode(block.code.code, block.code.language).map(
                            (token, tokenIndex) => renderToken(token, `token-${tokenIndex}`)
                          )}
                        </code>
                      </pre>
                    </div>
                  );
                }

                /* List */
                if (block.type === 'list') {
                  const ListTag = block.ordered ? 'ol' : 'ul';

                  return (
                    <ListTag
                      key={index}
                      className={styles.list}
                      start={block.ordered ? block.start : undefined}
                    >
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ListTag>
                  );
                }

                /* Callout */
                if (block.type === 'callout') {
                  const calloutClass =
                    block.callout.variant === 'warning'
                      ? styles.warningCallout
                      : styles.infoCallout;

                  return (
                    <aside key={index} className={calloutClass}>
                      <strong>{block.callout.title}</strong>

                      <p>{block.callout.body}</p>
                    </aside>
                  );
                }

                return null;
              })}
            </section>

            {content.videoAfterTopicId === section.id && content.videos?.length ? (
              <section className={styles.videoSection}>
                <h2>Video</h2>

                {content.videos.map((video) => (
                  <div key={video.embedUrl} className={styles.videoCard}>
                    <h3 className={styles.videoTitle}>{video.title}</h3>

                    <iframe
                      className={styles.videoFrame}
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      {...{ credentialless: 'true' }}
                    />
                  </div>
                ))}
              </section>
            ) : null}
          </React.Fragment>
        ))}

        {/* Return to Day */}
        <a href={`/days/${dayId}`} className={styles.returnButton}>
          ← Return to Day {content.dayNumber}
        </a>
      </div>
    </main>
  );
};

export default ReferencePage;
