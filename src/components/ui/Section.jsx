/**
 * Section shell: consistent vertical rhythm, a max-width container and a scroll offset that
 * clears the sticky navbar (see `.section` in index.css). `id` doubles as the scroll-spy anchor.
 */
export function Section({ id, labelledBy = null, className = "", innerClassName = "", children }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? undefined}
      className={`section relative ${className}`}
    >
      <div className={`section-shell ${innerClassName}`}>{children}</div>
    </section>
  );
}
