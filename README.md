# lehoan.dev

Trang cá nhân của **Lê Hoàn**, frontend developer đang học dần để thành fullstack. Trang giới thiệu các sản phẩm mình đã tham gia (Preny.ai, Askany, Top Chuyên Gia) và Waterbus, một dự án open-source làm cùng bạn bè.

Viết bằng **Next.js 16 (App Router)**, **React 19** và **Tailwind CSS v4**. Giao diện dựa trên [evon.dev](https://evon.dev): khung viền "blueprint" với các đường kẻ ngang chạy tràn màn hình.

## Chạy dự án

Cần Node.js 20.9 trở lên.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (prerender tĩnh)
npm run start    # chạy bản build
npm run lint
```

## Sửa nội dung

Toàn bộ text và link nằm trong `src/data`, tách khỏi giao diện. Muốn đổi nội dung thì chỉ cần sửa các file dưới đây:

| Phần trên trang | File |
| --- | --- |
| Tên site, mô tả, link mạng xã hội, menu, dòng "Now" | `src/data/site.ts` |
| Hero (lời chào, tiêu đề, mô tả, khối code `lehoan.ts`, ảnh) | `src/data/hero.ts` |
| Dải công nghệ chạy ngang | `src/data/tech-stack.ts` |
| Changelog (hành trình theo phiên bản) | `src/data/journey.ts` |
| Dự án | `src/data/products.ts` |
| Sở thích | `src/data/hobbies.ts` |
| Hỏi đáp và khối liên hệ cuối trang | `src/data/faq.ts` |

**Thêm một dự án:** thêm một object vào mảng `products` trong `src/data/products.ts`. Trạng thái (`status`) có thể là `live` (Đang chạy), `new` (Mới ra mắt), `free` (Miễn phí), `soon` (Sắp có) hoặc `oss` (Mã nguồn mở).

**Email và LinkedIn:** để trống trong `socials` thì nút tương ứng ở khối liên hệ sẽ tự ẩn. LinkedIn khi được điền sẽ tự thêm vào `sameAs` của JSON-LD.

**Sau khi đổi nội dung:** cập nhật `CONTENT_UPDATED_AT` trong `src/app/sitemap.ts`.

### Còn lại từ bản gốc

Mấy chỗ dưới đây vẫn đang là nội dung của evon.dev, cần thay bằng nội dung của mình:

- [ ] Phần Sở thích (`src/data/hobbies.ts`)
- [ ] Chữ chạy ngang khi cuộn (`scrollMarqueeRows` trong `src/data/site.ts`)
- [ ] Nút "Theo dõi kênh" trên header (`src/components/layout/site-header.tsx`)
- [ ] Favicon chữ "e" (`src/app/icon.svg`, `src/app/apple-icon.tsx`)
- [ ] Ảnh chụp sản phẩm và ảnh hero (xem mục Hình ảnh)

## Cấu trúc

```
src/
├── app/
│   ├── layout.tsx        # font, Metadata API, header/footer, script chống nháy theme
│   ├── page.tsx          # ghép các section + JSON-LD
│   ├── opengraph-image.tsx, apple-icon.tsx, icon.svg   # ảnh OG/icon sinh lúc build
│   ├── robots.ts, sitemap.ts, manifest.ts              # metadata routes
│   └── globals.css       # design tokens (light/dark), animation, custom utilities
├── components/
│   ├── layout/           # SiteHeader, SiteFooter, PageFrame, ThemeToggle, ClickSpark
│   ├── sections/         # mỗi section là một file: hero, journey, products, faq, cta, …
│   ├── ui/               # primitives dùng lại: Button, Section, MediaFrame, CodeWindow, …
│   └── icons/            # icon custom, map icon cho sở thích, BrandIcon (GitHub, LinkedIn)
├── data/                 # toàn bộ nội dung
├── hooks/                # useInView, usePrefersReducedMotion
├── lib/
│   ├── seo/              # JSON-LD (schema.org)
│   ├── site-url.ts       # URL tuyệt đối cho canonical/OG/sitemap
│   └── utils.ts, cx.ts   # cn() (server, có tailwind-merge) / cx() (client, nhẹ)
└── types/                # kiểu dữ liệu dùng chung
```

Thứ tự section trên trang: Hero → Tech stack → Changelog → Dự án → Scroll marquee → Sở thích → Hỏi đáp → Liên hệ.

**Nguyên tắc**

- **Mặc định là Server Component.** Chỉ những chỗ cần tương tác mới có `"use client"`: tabs dự án, scroll marquee, theme toggle, magnetic, spotlight, click-spark, nút copy.
- **Màu đi qua token.** Token khai báo trong `globals.css` (`--brand`, `--muted`, `--surface`, …) rồi map sang class Tailwind (`text-brand`, `bg-surface`, …). Dark mode chỉ override token dưới `[data-theme="dark"]`.
- **Animation tôn trọng `prefers-reduced-motion`.** Mọi hiệu ứng (kể cả con trỏ nhấp nháy ở tiêu đề hero) đều dùng `motion-safe:` hoặc kiểm tra bằng hook.
- **Khung blueprint.** `PageFrame` tạo cột nội dung giữa hai dải sọc chéo. Các utility `line-t` / `line-b` vẽ đường kẻ ngang tràn ra hai bên, còn `Section` luôn bắt đầu bằng một đường `line-t`.

## Hình ảnh

Ảnh hero và ảnh chụp sản phẩm hiện là placeholder có sọc chéo, hiển thị alt text. Để thêm ảnh:

1. Bỏ ảnh vào `src/assets/images/`, ví dụ `src/assets/images/hero.jpg`.
2. Import trong file data rồi gán vào `src`, ví dụ trong `src/data/hero.ts`:

   ```ts
   import photo from "@/assets/images/hero.jpg";

   export const heroPhoto = {
     src: photo,
     alt: "Ảnh chân dung",
     position: "50% 38%",
   };
   ```

   Đường dẫn chuỗi tới file trong `public/` (ví dụ `"/images/hero.jpg"`) cũng dùng được.

Static import cho URL có hash (cache immutable), có sẵn kích thước (không bị CLS) và tự có `placeholder="blur"`. Ảnh dự án làm tương tự với trường `image` trong `src/data/products.ts`.

## Biến môi trường

Copy `.env.example` thành `.env.local`:

| Biến | Bắt buộc | Dùng cho |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Có, khi deploy | Domain thật, dùng cho canonical, OG, sitemap, JSON-LD. Trên Vercel tự lấy từ `VERCEL_PROJECT_PRODUCTION_URL`. |

## Deploy

Dự án chạy được trên bất kỳ host nào hỗ trợ Next.js. Đơn giản nhất là Vercel:

1. Push repo lên GitHub.
2. Import repo vào Vercel, giữ cấu hình mặc định.
3. Khi gắn domain riêng, đặt `NEXT_PUBLIC_SITE_URL` bằng domain đó.

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
  - Mọi panel dự án đều có sẵn trong HTML (panel không active dùng `hidden`), nên Google index được hết.

## Performance & caching

**Render.** Bật `cacheComponents` nên toàn bộ trang prerender thành static shell (`○ /` trong output build, revalidate 1 ngày). CDN phục vụ thẳng HTML.

**Data.** Trang không gọi API bên ngoài vì toàn bộ nội dung nằm trong `src/data`. Khi cần dữ liệu động (ví dụ số liệu từ GitHub API), viết hàm fetch với `"use cache"` + `cacheLife` + `cacheTag`, giống cách làm ở nhánh `feat/personal-redesign`.

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

**Đo trên máy local.** Số liệu đo ở commit `9ab3842` (bản clone, trước khi đổi nội dung). Điều kiện: production, slow 4G + CPU chậm 4x, viewport mobile, lấy trung vị nhiều lần chạy. Lighthouse không dùng được trong môi trường đó nên đo bằng script CDP.

| | FCP / LCP | TBT | JS | CSS chặn render | Font |
| --- | --- | --- | --- | --- | --- |
| Trước tối ưu | 984 ms | 97 ms | 161.7 KB | 8.6 KB (1 request) | 95.3 KB |
| Sau tối ưu | **528 ms** | **78 ms** | **156.2 KB** | 0 (inline) | **78.4 KB** |

## Ghi công

Bố cục và phong cách giao diện lấy cảm hứng từ [evon.dev](https://evon.dev). Ảnh của trang gốc không được copy. Phần nội dung gốc còn sót lại đang được thay dần (xem mục "Còn lại từ bản gốc").
