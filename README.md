# lehoan.dev

Portfolio cá nhân của Lê Hoàn (Frontend Developer, đang trên đường thành Fullstack). Viết bằng **Next.js 16 (App Router)**, **React 19** và **Tailwind CSS v4**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static prerender)
npm run lint
```

## Bố cục trang

| # | Section | File | Dữ liệu |
| --- | --- | --- | --- |
| – | Hero dạng bento: giới thiệu, Now, số liệu GitHub, ngôn ngữ/heatmap, bio + giờ VN | `sections/hero.tsx` | `data/site.ts` + GitHub API |
| 01 | Dự án (Preny.ai, Askany) | `sections/projects.tsx` | `data/projects.ts` |
| 02 | Changelog: "Frontend → Fullstack" như các bản release, v4.0-beta có checklist tiến độ | `sections/changelog.tsx` | `data/changelog.ts` |
| 03 | Repo GitHub, cập nhật tự động | `sections/github-repos.tsx` | GitHub API |
| 04 | Stack | `sections/stack.tsx` | `data/stack.ts` |
| 05 | Hỏi đáp | `sections/faq.tsx` | `data/faq.ts` |
| – | Liên hệ | `sections/contact.tsx` | `data/site.ts` (`socials`) |

Ngoài ra còn có:

- **Command palette** (`⌘K` / `Ctrl K`). Tìm được cả khi gõ không dấu. Danh sách lệnh nằm ở `commandItems` trong `data/site.ts`.
- **Đổi theme** với hiệu ứng vòng tròn lan ra từ nút bấm (View Transitions API).

## Nội dung cần điền (TODO)

Trường nào để trống thì giao diện tự ẩn, nên chỉ cần điền khi có thông tin thật:

- `data/projects.ts`: `contributions` (phần bạn làm), `period`, `stack`, ảnh chụp màn hình (`image.src`).
- `data/changelog.ts`: mốc thời gian của v3.0.
- `data/site.ts`: `socials.email`, `socials.linkedin`, và mục **Now** (nên cập nhật hằng tháng).
- Domain: `lehoan.dev` hiện chỉ là tên tạm. Đặt `NEXT_PUBLIC_SITE_URL` và sửa `siteConfig.name` theo domain thật.

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
│   ├── layout/           # SiteHeader, SiteFooter, ThemeToggle, CommandMenu(+Trigger), DeferredEffects
│   ├── sections/         # mỗi section là một file
│   ├── ui/               # primitives: Section/SectionHeader, BentoCard, BrowserFrame, Button, LocalTime, …
│   └── icons/            # BrandIcon (Simple Icons) + path GitHub/LinkedIn
├── data/                 # TOÀN BỘ nội dung text/số liệu, tách khỏi UI
├── hooks/                # useInView, usePrefersReducedMotion
├── lib/
│   ├── queries/          # data layer có cache ("use cache" + cacheLife + cacheTag)
│   ├── seo/              # JSON-LD (schema.org)
│   ├── theme.ts, theme-client.ts   # script khởi tạo theme / toggle có View Transition
│   ├── site-url.ts       # URL tuyệt đối cho canonical/OG/sitemap
│   └── utils.ts, cx.ts   # cn() (server, có tailwind-merge) / cx() (client, nhẹ)
└── types/                # kiểu dữ liệu dùng chung
```

**Nguyên tắc**

- **Nội dung ở `src/data`, giao diện ở `src/components`.** Sửa text, số liệu hay link thì chỉ cần đụng vào `data/`.
- **Mặc định là Server Component.** Chỉ các island sau có `"use client"`: theme toggle, command palette, count-up, giờ địa phương, spotlight tracker.
- **Màu sắc đi qua token.** Token khai báo trong `globals.css` (`--brand`, `--muted`, `--surface`, …) rồi map sang class Tailwind. Dark mode chỉ override token dưới `[data-theme="dark"]`.
- **Animation tôn trọng `prefers-reduced-motion`.** Mọi hiệu ứng đều dùng `motion-safe:`, hoặc được kiểm tra trước khi chạy (count-up, đổi theme).

## Hình ảnh

Ảnh chụp sản phẩm đang là placeholder nền chấm, hiển thị alt text. Nên thêm ảnh bằng **static import**:

```ts
import prenyShot from "@/assets/images/preny.png";
// data/projects.ts
image: { src: prenyShot, alt: "Giao diện Preny.ai" }
```

Static import cho URL có hash (cache immutable), có sẵn kích thước (không gây CLS) và tự có `placeholder="blur"`.

## Biến môi trường

Copy `.env.example` thành `.env.local`:

| Biến | Bắt buộc | Dùng cho |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Có, khi deploy | Domain thật, dùng cho canonical, OG, sitemap, JSON-LD. Trên Vercel tự lấy từ `VERCEL_PROJECT_PRODUCTION_URL`. |
| `GITHUB_TOKEN` | Không | Token read-only bất kỳ. Có token thì hero hiện **heatmap đóng góp** (GraphQL API) thay cho thanh ngôn ngữ, và rate limit cao hơn. |
| `REVALIDATE_SECRET` | Không | Bảo vệ `POST /api/revalidate`. |

## SEO

- **Metadata API** trong `layout.tsx`: title template, description, canonical, Open Graph (`type: profile`), Twitter card, robots (`max-image-preview: large`), keywords.
- **File-convention metadata**, tất cả prerender lúc build:
  - `opengraph-image.tsx`: ảnh 1200×630 dùng font Be Vietnam Pro, hiển thị đúng dấu tiếng Việt.
  - `icon.svg`, `apple-icon.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`.
- **JSON-LD** (`src/lib/seo/json-ld.tsx`) gồm `Person` (kèm `sameAs` GitHub/LinkedIn và các sản phẩm đã làm), `WebSite`, `ProfilePage` và `FAQPage`. Ký tự `<` được escape để tránh XSS.
- **Semantic/a11y:**
  - Có đúng một `h1`, mỗi section có `aria-labelledby` trỏ tới `h2`, và có skip link tới `#noi-dung`.
  - Command palette dùng `<dialog>` native (bẫy focus, phím Esc) và pattern combobox/listbox với `aria-activedescendant`.
- Khi đổi nội dung trang, cập nhật `CONTENT_UPDATED_AT` trong `sitemap.ts`.

## Performance & caching

**Render.** Bật `cacheComponents` nên toàn bộ trang prerender thành static shell (`○` trong output build), và CDN phục vụ thẳng HTML.

**Data cache.** `getGitHubData()` (`src/lib/queries/github.ts`) là một đơn vị `"use cache"`. Nó gom profile, repo, tỉ lệ ngôn ngữ và heatmap (khi có token). Hero và section GitHub cùng dùng chung kết quả này.

| Trường hợp | `cacheLife` | Tag |
| --- | --- | --- |
| Gọi API thành công | `hours`: trang được revalidate ở nền mỗi giờ | `github` |
| API lỗi hoặc bị rate limit | `minutes`, hiển thị dữ liệu dự phòng tĩnh | `github` |

Người xem không bao giờ phải chờ GitHub, và giới hạn 60 request/giờ (khi không có token) không bị chạm tới. Muốn làm mới ngay, ví dụ sau khi push repo mới:

```bash
curl -X POST "https://your-domain/api/revalidate?tag=github" -H "Authorization: Bearer $REVALIDATE_SECRET"
```

Route này gọi `revalidateTag(tag, "max")`, tức stale-while-revalidate: người xem vẫn nhận bản cũ ngay lập tức, còn bản mới được render ở nền.

**Bundle client.**
- Server Component là mặc định. Icon được render trên server rồi truyền vào client island qua `children`.
- Command palette nằm trong chunk riêng (`next/dynamic`). Chunk được tải sẵn khi hover hoặc focus vào nút, hoặc khi bấm `⌘K`, và giữ mounted sau lần mở đầu tiên.
- `SpotlightTracker` dùng một listener chung cho mọi card. Nó được tải sau `requestIdleCallback`.
- `tailwind-merge` chỉ chạy trên server. Client component dùng `cx()` (clsx).
- `reactCompiler` tự memo hoá component.
- Giờ địa phương dùng `useSyncExternalStore` với server snapshot `null`, nên HTML prerender không phụ thuộc thời điểm build.

**CSS & font.**
- `experimental.inlineCss` inline Tailwind CSS vào `<head>`, bỏ được một request chặn render.
- `next/font` tự host font và chỉ lấy 3 weight đang dùng. Font dự phòng được chỉnh kích thước nên CLS = 0.
- Hiệu ứng hiện dần khi cuộn dùng CSS scroll-driven animation (`animation-timeline: view()`), không cần JS.

**Đo trên máy local** (production, slow 4G + CPU chậm 4x, viewport mobile, lấy trung vị nhiều lần chạy). Lighthouse không dùng được trong môi trường này nên đo bằng script CDP:

| | FCP / LCP | TBT | JS | HTML (gzip) | Font |
| --- | --- | --- | --- | --- | --- |
| Bản clone gốc | 984 ms | 97 ms | 161.7 KB | – | 95.3 KB |
| Clone sau khi tối ưu | 528 ms | 78 ms | 156.2 KB | 87 KB | 78.4 KB |
| **Bản redesign** | **460 ms** | **61 ms** | **153.1 KB** | **68 KB** | 78.4 KB |
