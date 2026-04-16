import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RouteSeo from "@/components/RouteSeo";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17] flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="font-display text-3xl font-bold text-[#1B3A2D] mb-3">Blog post not found</h1>
          <p className="text-[#6B6860] mb-6">We could not find that guide. Head back to the blog index and browse the live TrolleyRoast articles.</p>
          <Link href="/blog">
            <Button className="bg-[#1B3A2D] text-white hover:bg-[#12261E] rounded-full">Back to blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((entry) => entry.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1C1A17]">
      <RouteSeo title={`${post.title} | TrolleyRoast`} description={post.description} path={`/blog/${post.slug}`} ogType="article" />

      <header className="border-b border-[#E8E3D9] bg-white/90 backdrop-blur-[8px] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3 flex-wrap">
          <Link href="/blog">
            <button className="flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity text-[#6B6860]">
              <ArrowLeft size={15} />
              Back to blog
            </button>
          </Link>
          <span className="text-[#D4CFC6]">|</span>
          <span className="font-display text-xl font-semibold text-[#1B3A2D]">TrolleyRoast</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          <article className="rounded-[28px] border border-[#E8E3D9] bg-white p-8 sm:p-10 shadow-sm">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-[#C9A96E]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-5">
                {post.eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B3A2D] leading-[1.08] mb-5">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#9B9790] uppercase tracking-[0.18em] mb-6">
                <span>{post.publishedLabel}</span>
                <span>{post.readTime}</span>
              </div>
              <p className="text-lg leading-relaxed text-[#6B6860] border-l-4 border-[#C9A96E] pl-5 py-1 mb-10 italic">
                {post.heroSummary}
              </p>
            </div>

            <div className="space-y-10 max-w-3xl">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-3xl font-semibold text-[#1B3A2D] mb-4">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-[#3F3A33]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 space-y-3 rounded-2xl bg-[#F8F6F0] border border-[#EEE8DA] p-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm leading-relaxed text-[#5D564E] flex gap-3">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-[#C9A96E] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">SEO focus</p>
              <h2 className="font-display text-2xl font-semibold text-[#1B3A2D] mb-4">What this guide targets</h2>
              <ul className="space-y-3">
                {post.keywords.map((keyword) => (
                  <li key={keyword} className="text-sm leading-relaxed text-[#6B6860] border-b border-[#F0EBE2] pb-3 last:border-0 last:pb-0">
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-[#1B3A2D] p-6 text-white shadow-sm">
              <h2 className="font-display text-2xl font-semibold mb-3">{post.ctaTitle}</h2>
              <p className="text-sm leading-relaxed text-white/80 mb-5">{post.ctaBody}</p>
              <div className="space-y-3">
                <Link href="/calculators/weekly-basket-savings">
                  <Button className="w-full bg-[#C9A96E] text-[#1B3A2D] hover:bg-[#B8985D] rounded-full font-semibold">
                    Try the calculator
                  </Button>
                </Link>
                <a href="https://trolleyroast.app" target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 rounded-full">
                    Scan a receipt
                  </Button>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E8E3D9] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="font-display text-2xl font-semibold text-[#1B3A2D]">Related guides</h2>
                <Link href="/blog">
                  <span className="text-sm font-semibold text-[#1B3A2D] inline-flex items-center gap-1 cursor-pointer">All posts <ArrowRight size={14} /></span>
                </Link>
              </div>
              <div className="space-y-4">
                {related.map((entry) => (
                  <Link key={entry.slug} href={`/blog/${entry.slug}`}>
                    <div className="rounded-2xl bg-[#F8F6F0] border border-[#EEE8DA] p-4 cursor-pointer hover:bg-[#F4F0E8] transition-colors">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-2">{entry.eyebrow}</p>
                      <h3 className="font-display text-xl font-semibold text-[#1B3A2D] mb-2">{entry.title}</h3>
                      <p className="text-sm leading-relaxed text-[#6B6860]">{entry.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
