# evon-clone

Bản clone UI của [evon.dev](https://evon.dev), viết bằng **Next.js 16 (App Router)**, **React 19** và **Tailwind CSS v4**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static prerender)
npm run lint
```

## Cấu trúc

```
src/
├── app/
│   ├── layout.tsx        # font, Metadata API, header/footer, script chống nháy theme
│   ├── page.tsx          # ghép các section + JSON-LD
│   ├── opengraph-image.tsx, apple-icon.tsx, icon.svg   # ảnh OG/icon sinh lúc build
│   ├── robots.ts, sitemap.ts, manifest.ts              # metadata routes
│   ├── api/revalidate/   # webhook xoá cache theo tag
│   └── globals.css       # design tokens (light/dark), animation, custom utilities
├── components/
│   ├── layout/           # SiteHeader, SiteFooter, PageFrame, ThemeToggle, ClickSpark
│   ├── sections/         # mỗi section của trang là một file (hero, journey, products, …)
│   ├── ui/               # primitives dùng lại: Button, Section, MediaFrame, CodeWindow, Spotlight, …
│   └── icons/            # icon custom + map icon cho hobbies, BrandIcon (Simple Icons)
├── data/                 # TOÀN BỘ nội dung text/số liệu, tách khỏi UI
├── hooks/                # useInView, usePrefersReducedMotion
├── lib/
│   ├── queries/          # data layer có cache ("use cache" + cacheLife + cacheTag)
│   ├── seo/              # JSON-LD (schema.org)
│   ├── site-url.ts       # URL tuyệt đối cho canonical/OG/sitemap
│   └── utils.ts, cx.ts   # cn() (server, có tailwind-merge) / cx() (client, nhẹ)
└── types/                # kiểu dữ liệu dùng chung
```

**Nguyên tắc**

- **Nội dung ở `src/data`, giao diện ở `src/components`.** Sửa text, số liệu hay link thì chỉ cần đụng vào `data/`.
- **Mặc định là Server Component.** Chỉ những chỗ cần tương tác mới có `"use client"`: tabs sản phẩm, scroll marquee, theme toggle, count-up, magnetic, spotlight, click-spark, nút copy.
- **Màu sắc đi qua token.** Token khai báo trong `globals.css` (`--brand`, `--muted`, `--surface`, …) rồi map sang class Tailwind (`text-brand`, `bg-surface`, …). Dark mode chỉ override token dưới `[data-theme="dark"]`.
- **Animation tôn trọng `prefers-reduced-motion`.** Mọi hiệu ứng đều dùng `motion-safe:` hoặc kiểm tra bằng hook.

## Hình ảnh

Ảnh cá nhân và ảnh chụp sản phẩm của trang gốc **không được copy**. Chỗ của chúng đang là placeholder có sọc chéo, hiển thị alt text.

Để thêm ảnh của bạn:

1. Bỏ file ảnh vào `public/`, ví dụ `public/images/hero.jpg`.
2. Điền `src` trong file data tương ứng, ví dụ `heroPhoto.src = "/images/hero.jpg"` trong `src/data/hero.ts`.

Nên dùng **static import** (`import photo from "@/assets/images/hero.jpg"` rồi `src: photo`). Cách này cho URL có hash (cache immutable), kích thước có sẵn (không CLS) và tự có `placeholder="blur"`.

## Biến môi trường

Copy `.env.example` thành `.env.local`:

| Biến | Bắt buộc | Dùng cho |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Có, khi deploy | Domain thật, dùng cho canonical, OG, sitemap, JSON-LD. Trên Vercel tự lấy từ `VERCEL_PROJECT_PRODUCTION_URL`. |
| `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` | Không | Số subscriber/video thật. Thiếu thì dùng số liệu tĩnh trong `src/data/site.ts`. |
| `REVALIDATE_SECRET` | Không | Bảo vệ `POST /api/revalidate`. |

## SEO

- **Metadata API** trong `layout.tsx`: title template, description, canonical, Open Graph, Twitter card, robots (`max-image-preview: large`), keywords.
- **File-convention metadata**, tất cả prerender lúc build:
  - `opengraph-image.tsx`: ảnh 1200×630 dùng font Be Vietnam Pro, hiển thị đúng dấu tiếng Việt.
  - `icon.svg`, `apple-icon.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`.
- **JSON-LD** (`src/lib/seo/json-ld.tsx`) gồm `Person`, `WebSite`, `ProfilePage` và `FAQPage` (lấy từ `data/faq.ts`). Ký tự `<` được escape để tránh XSS.
- **Semantic/a11y:**
  - Có đúng một `h1`.
  - Mỗi section có `aria-labelledby` trỏ tới `h2` của nó.
  - Có skip link tới `#noi-dung`.
  - Cả 4 panel sản phẩm đều có sẵn trong HTML (panel không active dùng `hidden`), nên Google index được hết.
- Khi đổi nội dung trang, cập nhật `CONTENT_UPDATED_AT` trong `sitemap.ts`.

## Performance & caching

**Render.** Bật `cacheComponents` nên toàn bộ trang prerender thành static shell (`○` trong output build), và CDN phục vụ thẳng HTML.

**Data cache.** Các hàm trong `src/lib/queries/` dùng `"use cache"`:

| Hàm | Nguồn | `cacheLife` | Tag |
| --- | --- | --- | --- |
| `getStats()` | YouTube Data API | `hours`; `days` khi không có API key; `minutes` khi lỗi (fallback số tĩnh) | `stats` |
| `getVSCodeData()` | VS Code Marketplace API | `days`; `minutes` khi lỗi | `vscode` |

Trang tự nhận mức revalidate ngắn nhất của dữ liệu bên trong (hiện là 1 ngày). Muốn xoá cache ngay lập tức:

```bash
curl -X POST "https://your-domain/api/revalidate?tag=stats" -H "Authorization: Bearer $REVALIDATE_SECRET"
```

Route này gọi `revalidateTag(tag, "max")`, nghĩa là stale-while-revalidate: người dùng vẫn nhận bản cũ ngay, còn bản mới được render ở nền.

**Bundle client.**
- Server Component là mặc định. Icon và nội dung panel render trên server rồi truyền vào client island qua `children`/props.
- `tailwind-merge` chỉ chạy trên server. Client component dùng `cx()` (clsx).
- Hiệu ứng trang trí (`ClickSpark`, `SpotlightTracker`) được tải bằng `next/dynamic` sau `requestIdleCallback`, nên không tranh CPU lúc hydrate.
- `reactCompiler` tự memo hoá component.

**CSS & font.**
- `experimental.inlineCss` inline Tailwind CSS vào `<head>`, bỏ được một request chặn render.
- `next/font` tự host font và chỉ lấy 3 weight đang dùng. Font dự phòng được chỉnh kích thước nên CLS = 0.

**Ảnh & header.**
- `next/image` xuất AVIF/WebP, `minimumCacheTTL` 7 ngày.
- Ảnh hero dùng `loading="eager"`. `priority` đã deprecated từ Next 16.
- Header bảo mật được bật, file tĩnh trong `/public` có `Cache-Control` kèm `stale-while-revalidate`.

**Đo trên máy local** (production, slow 4G + CPU chậm 4x, viewport mobile, lấy trung vị nhiều lần chạy; Lighthouse không dùng được trong môi trường này nên đo bằng script CDP):

| | FCP / LCP | TBT | JS | CSS chặn render | Font |
| --- | --- | --- | --- | --- | --- |
| Trước | 984 ms | 97 ms | 161.7 KB | 8.6 KB (1 request) | 95.3 KB |
| Sau | **528 ms** | **78 ms** | **156.2 KB** | 0 (inline) | **78.4 KB** |
