import Link from "next/link";
import { experiments, onRotation, recordPlayer } from "@/data/site";
import { getAllBlogPosts } from "@/data/blog";
import { Container, Section, SectionHead } from "./Section";
import { Rise } from "@/components/ink/Rise";
import { IndexCard } from "@/components/art/Paper";

/**
 * The idea laboratory: three sub-shelves that keep the site alive between
 * project launches. Notes get written, experiments get abandoned, and the
 * rotation changes — none of which requires shipping anything.
 */

function SubShelf({
  label,
  aside,
  children,
  delay = 0,
}: {
  label: string;
  aside?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Rise delay={delay}>
      <div className="flex items-baseline justify-between gap-4 border-b border-ink/20 pb-2">
        <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink">
          {label}
        </h3>
        {aside && (
          <p className="font-mono text-[0.72rem] text-ink-soft">{aside}</p>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </Rise>
  );
}

export function TheRecordPlayer() {
  const posts = getAllBlogPosts();

  return (
    <Section id="the-record-player" className="bg-paper">
      <Container>
        {/* this section anchors right — the shelf anchored left */}
        <SectionHead
          eyebrow={recordPlayer.eyebrow}
          title="the record player"
          intro={recordPlayer.intro}
          align="right"
        />

        <div className="mt-16 grid-12 gap-x-8 gap-y-14">
          {/* ---- notes ---- */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <SubShelf label="notes" aside={`${posts.length} so far`}>
              <ul className="space-y-5">
                {posts.slice(0, 4).map((post, index) => (
                  <li key={post.id}>
                    <IndexCard tilt={index % 2 === 0 ? -1.5 : 1.5}>
                      <Link
                        href={`/blog/${post.id}`}
                        className="group block no-underline"
                      >
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
                          {new Date(post.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                          {" · "}
                          {post.readTime}
                        </p>
                        <p className="mt-1.5 font-mono text-[0.95rem] leading-snug text-ink transition-colors duration-[180ms] group-hover:text-accent">
                          {post.title}
                        </p>
                        <p className="mt-2 font-mono text-caption leading-snug text-ink-soft">
                          {post.excerpt.length > 120
                            ? `${post.excerpt.slice(0, 117)}…`
                            : post.excerpt}
                        </p>
                      </Link>
                    </IndexCard>
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                <Link href="/blog" className="ink-link font-mono text-caption">
                  all the notes →
                </Link>
              </p>
            </SubShelf>
          </div>

          {/* ---- experiments ---- */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <SubShelf
              label="experiments"
              aside="half-baked, might burn"
              delay={60}
            >
              <ul className="space-y-6">
                {experiments.map((item) => (
                  <li key={item.title} className="border-l border-ink/25 pl-4">
                    <p className="font-mono text-[0.95rem] leading-snug text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1.5 font-mono text-caption text-ink-soft">
                      {item.note}
                    </p>
                    <p className="mt-2 inline-block border border-ink/40 px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-soft">
                      {item.state}
                    </p>
                  </li>
                ))}
              </ul>
            </SubShelf>
          </div>

          {/* ---- on rotation ---- */}
          <div className="col-span-12 lg:col-span-4">
            <SubShelf label="on rotation" aside="right now" delay={120}>
              <ul className="space-y-6">
                {onRotation.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-1 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-soft">
                      {item.kind}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.95rem] leading-snug text-ink">
                        {item.title}
                      </p>
                      <p className="font-mono text-caption text-ink-soft">
                        {item.by}
                      </p>
                      <p className="mt-1.5 font-mono text-caption leading-snug text-ink-soft">
                        {item.line}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </SubShelf>
          </div>
        </div>
      </Container>
    </Section>
  );
}
