import React from 'react';
import NewsCard from './NewsCard';

// Skeleton loader for cards
const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const NewsGrid = ({ articles, loading }) => {
    if (loading) {
        return (
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
                {/* Skeleton top section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-6 space-y-4">
                        <Skeleton className="w-full aspect-video" />
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="lg:col-span-3 space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex gap-3 py-3 border-b border-gray-100">
                                <Skeleton className="w-20 h-14 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-3 w-4/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-3 space-y-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="w-full aspect-[16/10]" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-3/4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center py-32 text-gray-400 font-sans">
                <span className="text-6xl mb-4">📰</span>
                <p className="text-xl font-bold">No articles found</p>
                <p className="text-sm mt-1">Make sure the backend server is running</p>
            </div>
        );
    }

    const hero = articles[0];
    const leftMoreStories = articles.slice(1, 4);   // 3 more stories in left col
    const secondHero = articles[4];
    const listStories = articles.slice(5, 11);      // 6 list items in middle
    const sidebarStories = articles.slice(11, 19);  // 8 cards in sidebar
    const featuredStories = articles.slice(19, 22); // 3 featured for new row
    const remainingStories = articles.slice(22);

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

            {/* ── TOP SECTION: 3-column newspaper layout ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 mb-10">

                {/* Left: Primary Hero + more stories below it */}
                <div className="lg:col-span-6 lg:border-r border-gray-200 lg:pr-8 pb-8 lg:pb-0 flex flex-col gap-5">
                    <NewsCard article={hero} variant="hero" />
                    {/* Fill remaining left column height with list-style cards */}
                    {leftMoreStories.length > 0 && (
                        <div className="mt-auto border-t border-gray-200 pt-4">
                            {leftMoreStories.map(article => (
                                <NewsCard key={article.id} article={article} variant="list" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Middle: Secondary hero + list */}
                <div className="lg:col-span-4 lg:border-r border-gray-200 lg:px-8 py-8 lg:py-0">
                    {/* Secondary hero (smaller) */}
                    {secondHero && (
                        <div className="mb-5 pb-5 border-b border-gray-200">
                            <NewsCard article={secondHero} variant="hero" />
                        </div>
                    )}
                    {/* Horizontal story list */}
                    <div>
                        {listStories.map(article => (
                            <NewsCard key={article.id} article={article} variant="list" />
                        ))}
                    </div>
                </div>

                {/* Right: Latest Updates sidebar */}
                <div className="lg:col-span-2 pt-8 lg:pt-0 lg:pl-6">
                    <div className="flex items-center mb-4 pb-2 border-b-2 border-black gap-2">
                        <div className="w-1 h-4 bg-themorning-red rounded" />
                        <h3 className="font-sans font-black uppercase tracking-wider text-xs">Latest</h3>
                    </div>
                    <div className="space-y-5">
                        {sidebarStories.map(article => (
                            <NewsCard key={article.id} article={article} variant="default" />
                        ))}
                    </div>
                </div>

            </div>

            {/* ── FEATURED STORIES ROW (fills gap before election banner) ── */}
            {featuredStories.length > 0 && (
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-[3px] w-8 bg-themorning-red flex-shrink-0" />
                        <h2 className="text-xl font-black font-serif uppercase tracking-tight whitespace-nowrap">Featured Stories</h2>
                        <div className="flex-grow h-px bg-gray-200" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredStories.map(article => (
                            <NewsCard key={article.id} article={article} variant="default" />
                        ))}
                    </div>
                </section>
            )}
            {/* ── ELECTION RESULTS 2025 ─────────────────────────────────────── */}
            <section className="my-10">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-[3px] w-8 bg-themorning-red flex-shrink-0" />
                    <h2 className="text-xl font-black font-serif uppercase tracking-tight whitespace-nowrap">
                        Election Results 2025
                    </h2>
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 font-sans whitespace-nowrap">Sri Lanka</span>
                </div>

                {/* Placeholder panel */}
                <div className="relative overflow-hidden rounded-2xl bg-themorning-dark border border-gray-800 min-h-[220px] flex items-center justify-center">
                    {/* Subtle grid pattern background */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                    {/* Red accent bars */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-themorning-red" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-themorning-red opacity-40" />

                    {/* Placeholder content */}
                    <div className="relative z-10 text-center px-6 py-10">
                        <div className="text-4xl mb-4">🗳️</div>
                        <h3 className="text-white font-black font-serif text-2xl mb-2 tracking-tight">
                            Election Results 2025
                        </h3>
                        <p className="text-gray-400 text-sm font-sans max-w-sm mx-auto mb-5">
                            Live election results, vote counts, and constituency breakdowns will appear here.
                        </p>
                        <span className="inline-flex items-center gap-2 bg-themorning-red/20 border border-themorning-red/40 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-themorning-red animate-pulse inline-block" />
                            Coming Soon
                        </span>
                    </div>
                </div>
            </section>

            {/* ── DIVIDER ──────────────────────────────────────────────────── */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-[3px] w-8 bg-themorning-red" />
                <div className="flex-grow h-px bg-gray-200" />
            </div>


            {/* ── MORE NEWS GRID ────────────────────────────────────────────── */}
            {remainingStories.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl font-black font-serif uppercase tracking-tight">More Stories</h2>
                        <div className="flex-grow h-px bg-gray-200" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {remainingStories.map(article => (
                            <NewsCard key={article.id} article={article} variant="default" />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default NewsGrid;
