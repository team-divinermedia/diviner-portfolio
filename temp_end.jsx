        </main >

    <FooterCTA />

{
    activeItem && (
        <ItemModal
            item={activeItem}
            isLatest={activeItem.id === latestItemId}
            liveStatus={liveStatusLabel}
            onClose={() => setActiveItem(null)}
        />
    )
}
    </div >
  );
}

function AdminPanel({ onAddItem }) {
    const [type, setType] = useState("post");
    const [category, setCategory] = useState("Social Design");
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [layout, setLayout] = useState("static");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const nowIso = new Date().toISOString();

        const newItem = {
            id: Date.now(),
            type,
            category: category.trim() || "Social Design",
            title: title.trim(),
            subtitle: subtitle.trim(),
            imageUrl: type === "reel" ? undefined : imageUrl.trim(),
            videoUrl: type === "reel" ? videoUrl.trim() : undefined,
            layout: type === "story" ? "story" : layout,
            createdAt: nowIso,
            likes: 0,
            views: 0,
            isConceptArt: false,
        };

        onAddItem(newItem);

        setTitle("");
        setSubtitle("");
        setImageUrl("");
        setVideoUrl("");
    };

    return (
        <section className="mt-8 mb-10 rounded-3xl border border-slate-200 bg-white px-4 py-4 text-xs shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Admin upload panel
                    </p>
                    <p className="text-xs text-slate-500">
                        Paste your hosted image / reel URLs to push new work into the live feed.
                    </p>
                </div>
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-50">
                    Local only
                </span>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
                <div className="space-y-2">
                    <label className="block text-[11px] font-medium text-slate-600">
                        Format
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                        {["post", "story", "reel"].map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setType(val)}
                                className={`rounded-full px-3 py-1 text-[11px] font-medium ${type === val
                                    ? "bg-slate-900 text-slate-50"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {val === "post" && "Post"}
                                {val === "story" && "Story"}
                                {val === "reel" && "Reel / Short"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-600">
                        Category
                    </label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
                        placeholder="e.g. Social Design, Brand Identity"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-600">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
                        placeholder="Project name or hook"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-600">
                        Subtitle
                    </label>
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
                        placeholder="Short context, result or niche"
                    />
                </div>

                {type !== "reel" && (
                    <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-600">
                            Image URL
                        </label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
                            placeholder="https://.../your-design.jpg"
                        />
                        <p className="text-[10px] text-slate-400">
                            Upload to /public/uploads or a free host and paste the link.
                        </p>
                    </div>
                )}

                {type === "reel" && (
                    <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-600">
                            Vertical video / reel URL
                        </label>
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
                            placeholder="https://.../vertical-reel.mp4"
                        />
                    </div>
                )}

                {type === "post" && (
                    <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-slate-600">
                            Layout
                        </label>
                        <select
                            value={layout}
                            onChange={(e) => setLayout(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
                        >
                            <option value="static">Static</option>
                            <option value="carousel">Carousel</option>
                        </select>
                    </div>
                )}

                <div className="flex items-end justify-end sm:col-span-2">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-slate-50 hover:bg-slate-800"
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Push to live feed</span>
                    </button>
                </div>
            </form>
        </section>
    );
}

export default App;
