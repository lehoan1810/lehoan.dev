# Tối ưu hiệu năng, caching và SEO

Tài liệu này ghi lại những gì đã làm để tối ưu lehoan.dev, vì sao làm vậy, và cách áp dụng lại cho dự án khác. Cuối tài liệu có phần tự đánh giá: chỗ nào đã tối ưu triệt để, chỗ nào chưa, và tính năng nào của Next.js chưa dùng tới.

Phiên bản: Next.js 16.4.6, React 19.3, Tailwind CSS 4.3.

## Kết quả hiện tại

Đo ngày 2026-11-25 trên bản production (`next build && next start`) chạy ở máy local:

| Chỉ số | Bản clone ban đầu | Hiện tại |
| --- | --- | --- |
| FCP / LCP | 984 ms | **444 ms** |
| TBT | 97 ms | **64 ms** |
| CLS | – | **0** |
| JS (byte truyền) | 161.7 KB | **155.7 KB** |
| CSS chặn render | 8.6 KB (1 request) | **0** (inline) |
| Font | 95.3 KB | **78.4 KB** |
| HTML (byte truyền) | – | 71.6 KB |
| Số request | – | 23 |

Phần tử LCP hiện là tiêu đề `h1` ở hero, vì trang chưa có ảnh thật.

**Cách đo**
- Chrome headless điều khiển qua DevTools Protocol.
- Giả lập 4G chậm: latency 150 ms, 1.6 Mbps.
- CPU chậm 4 lần, viewport mobile.
- Lấy trung vị của 5 lần chạy.

Đây **không phải** điểm Lighthouse và cũng không phải số đo từ người dùng thật (field data); xem mục [9](#9-tự-đánh-giá).

---

## 1. Render và caching

### 1.1 Prerender cả trang bằng Cache Components

```ts
// next.config.ts
cacheComponents: true,
```

Với Cache Components, Next prerender mọi thứ có thể prerender thành một **static shell** ngay lúc build. Trang chủ ra `○ /` trong output build, tức là HTML tĩnh hoàn toàn. Khi có request, server hoặc CDN trả thẳng file HTML có sẵn mà không chạy React.

Kiểm tra bằng header của response:

```
x-nextjs-cache: HIT
x-nextjs-prerender: 1
Cache-Control: s-maxage=86400, stale-while-revalidate=518400
```

**Vì sao trang revalidate mỗi ngày.** Năm ở footer (`CurrentYear`) dùng `new Date()`. Với Cache Components, đọc thời gian hiện tại mà không cache thì trang không prerender được, nên component này được bọc `"use cache"` + `cacheLife("days")`. Lifetime ngắn nhất trong trang quyết định lifetime của cả trang, nên cả trang revalidate theo ngày. Chi phí gần như bằng 0: mỗi ngày render lại một lần, ở chế độ nền.

> **Tip:** sau mỗi lần `next build`, nhìn ký hiệu cạnh từng route:
> - `○` là tĩnh hoàn toàn.
> - `◐` là partial prerender: có shell tĩnh, phần còn lại stream.
> - `ƒ` là dynamic, render theo từng request.
>
> Trang nội dung nên là `○` hoặc `◐`. Nếu thấy `ƒ`, tìm xem component nào đang đọc `cookies()`, `headers()`, `searchParams` hoặc dữ liệu chưa cache.

### 1.2 Nội dung tĩnh nằm trong `src/data`

Trang không gọi API ngoài. Toàn bộ text, link và dự án nằm trong `src/data/*.ts`, được import thẳng vào Server Component. Nhờ vậy:
- Không phải chờ mạng lúc build hay lúc request.
- Không có rủi ro API ngoài chết làm hỏng trang.
- Nội dung có kiểu TypeScript, sai cấu trúc là lỗi ngay lúc build.

### 1.3 Khi cần dữ liệu động (áp dụng cho dự án khác)

Nhánh `feat/personal-redesign` có ví dụ lấy dữ liệu GitHub. Mẫu chung:

```ts
// lib/queries/github.ts
import { cacheLife, cacheTag } from "next/cache";

export async function getGitHubData() {
  "use cache";
  cacheLife("hours");          // tự làm mới mỗi giờ
  cacheTag("github");          // để chủ động xoá cache khi cần
  const res = await fetch("https://api.github.com/users/...");
  return res.json();
}
```

- **Làm mới theo yêu cầu:**
  - Từ webhook hoặc route handler, gọi `revalidateTag("github", "max")`. Trong Next 16 bắt buộc truyền đối số thứ hai; gọi không có nó đã bị deprecated.
  - Trong Server Action, khi người dùng cần thấy ngay dữ liệu mình vừa sửa, dùng `updateTag("github")`.
- **Dữ liệu theo từng request** (`cookies()`, `headers()`, `searchParams`): đưa xuống component nhỏ nhất cần nó và bọc `<Suspense>` quanh riêng component đó. Phần còn lại vẫn nằm trong static shell.
- **Không `await` dữ liệu ở đầu layout hay page.** Làm vậy sẽ chặn cả trang. Đẩy việc đọc dữ liệu xuống đúng chỗ dùng.

---

## 2. JavaScript phía client

### 2.1 Server Component là mặc định, `"use client"` chỉ ở lá

Chỉ 7 component có `"use client"`. Tất cả đều là những chỗ thật sự cần tương tác:

| Component | Vì sao cần client |
| --- | --- |
| `ProductTabs` | chuyển tab, điều hướng bằng bàn phím |
| `ScrollMarqueeRows` | tốc độ chạy chữ phụ thuộc tốc độ cuộn |
| `ThemeToggle` | đổi theme, lưu vào `localStorage` |
| `Magnetic`, `SpotlightTracker`, `ClickSpark` | hiệu ứng theo con trỏ |
| `CopyButton` | Clipboard API |

> **Tip:** đặt `"use client"` ở component **nhỏ nhất** cần tương tác, không đặt ở section hay page. Mọi thứ được import từ một file client đều bị kéo vào bundle client.

### 2.2 Truyền nội dung đã render từ server vào client qua `children`

`ProductTabs` (client) chỉ lo việc chuyển tab. Nội dung 4 panel, gồm icon, ảnh và danh sách, được render trên server rồi truyền vào dưới dạng `children`/props. Code của icon và panel không bị gửi xuống trình duyệt.

```tsx
// products.tsx (Server Component)
<ProductTabs
  label="Dự án"
  items={products.map((product, i) => ({
    id: product.id,
    tab: <ProductTab product={product} index={i} />,   // render trên server
    panel: <ProductPanel product={product} />,         // render trên server
  }))}
/>
```

### 2.3 Thư viện nặng chỉ chạy trên server

- `cn()` dùng `tailwind-merge` (khoảng 10 KB) và chỉ được gọi trong Server Component.
- Client component dùng `cx()` chỉ có `clsx`, rất nhẹ.

### 2.4 Hiệu ứng trang trí tải sau

`ClickSpark` và `SpotlightTracker` được tải bằng `next/dynamic` bên trong `DeferredEffects`, và chỉ bắt đầu tải khi trình duyệt rảnh (`requestIdleCallback`). Nhờ đó chúng không tranh CPU với lúc hydrate, giúp TBT và INP tốt hơn.

### 2.5 React Compiler

```ts
reactCompiler: true,
experimental: { turbopackRustReactCompiler: true },
```

Compiler tự memo hoá component và hook, nên không cần viết tay `useMemo` hay `useCallback`. Bản viết bằng Rust giúp build nhanh hơn.

**Kết quả:** code của chính app chỉ khoảng **15 KB gzip**. Khoảng 90% của 155.7 KB JS còn lại là runtime của React và Next.js App Router (xem đánh giá ở mục 9).

---

## 3. CSS

- **CSS inline vào `<head>`** (`experimental.inlineCss: true`): bỏ được một request chặn render.
  - Đánh đổi: CSS bị nhúng vào mọi trang HTML và không được cache riêng.
  - Chỉ đáng dùng khi CSS nhỏ (ở đây 37.5 KB raw, 8.1 KB gzip) và site ít trang.
- **Token màu**: khai báo bằng biến CSS (`--brand`, `--muted`, …) rồi map sang class Tailwind qua `@theme inline`. Dark mode chỉ override token dưới `[data-theme="dark"]`, không phải viết `dark:` cho từng class.
- **Không nháy theme**: một script inline nhỏ đọc `localStorage` và set `data-theme` **trước lần paint đầu tiên**. Đây là đúng cách mà guide *Preventing flash before hydration* của Next khuyên dùng.
- **Hiệu ứng hiện dần khi cuộn bằng CSS thuần** (`animation-timeline: view()`), không có dòng JS nào:
  - Trình duyệt không hỗ trợ thì `@supports` bỏ qua, nội dung vẫn hiện bình thường.
  - Mọi animation đều đi qua `motion-safe:`, nên người bật giảm chuyển động sẽ không thấy hiệu ứng.

---

## 4. Font

```ts
Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "500", "600"], display: "swap" })
```

- `next/font` tự host font, không gọi Google Fonts lúc chạy, và tự thêm `preload`.
- Chỉ lấy 3 weight đang dùng. Mỗi weight thêm vào là một file font.
- Font dự phòng được chỉnh kích thước cho khớp font thật (`adjustFontFallback`), nên khi font thật tải xong chữ không nhảy: **CLS = 0**.

---

## 5. Ảnh

```ts
images: {
  formats: ["image/avif", "image/webp"],
  minimumCacheTTL: 60 * 60 * 24 * 7,
},
```

- AVIF đứng trước, nhỏ hơn WebP khoảng 20%.
- Ảnh đã tối ưu không xoá cache theo yêu cầu được, nên TTL để vừa phải (7 ngày).
- **Static import** (`import photo from "@/assets/images/x.jpg"`) cho URL có hash (cache vĩnh viễn), có sẵn kích thước (không CLS) và tự có `placeholder="blur"`.
- Ảnh hero dùng `loading="eager"`. Từ Next 16, `priority` đã deprecated. Docs khuyên dùng `loading="eager"` hoặc `fetchPriority="high"`, và chỉ dùng `preload` khi thật sự cần.

---

## 6. HTTP header

- **Header bảo mật**: `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy`.
- **`poweredByHeader: false`**: không lộ `X-Powered-By: Next.js`.
- **File tĩnh trong `/public`** (không có hash trong tên): `Cache-Control: public, max-age=86400, stale-while-revalidate=604800`.
- **File trong `/_next/static`**: Next tự đặt `immutable`, không cần cấu hình.

---

## 7. SEO

- **Metadata API** (`layout.tsx`): title template, description, canonical, Open Graph, Twitter card.
- **Đang tắt index**: `allowIndexing = false` trong `src/data/site.ts`.
  - Mọi trang có thẻ `<meta name="robots" content="noindex, nofollow">`, và `robots.txt` không khai báo sitemap.
  - Đổi thành `true` khi muốn lên Google: thẻ robots chuyển sang `index, follow, max-image-preview: large` và sitemap được khai báo lại.
  - `robots.txt` **vẫn cho phép crawl**. Đây là chỗ hay làm sai: nếu chặn crawl (`Disallow: /`), bot không đọc được thẻ `noindex`, và URL vẫn có thể xuất hiện trên Google (dù không có nội dung).
- **Metadata dạng file**, tất cả sinh lúc build:
  - `opengraph-image.tsx`: ảnh OG 1200×630, dùng font thật nên hiển thị đúng dấu tiếng Việt.
  - `icon.svg`, `apple-icon.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts`.
- **JSON-LD**: `Person`, `WebSite`, `ProfilePage`, `FAQPage`. Ký tự `<` được escape để tránh XSS.
- **HTML ngữ nghĩa**:
  - Đúng một `h1`.
  - Mỗi section có `aria-labelledby` trỏ tới `h2` của nó.
  - Có skip link.
  - Panel tab ẩn dùng `hidden` chứ không bị bỏ khỏi DOM, nên Google vẫn đọc được.

---

## 8. Quy trình kiểm tra

1. **`npm run build`**: xem ký hiệu route (`○` / `◐` / `ƒ`) và cột Revalidate/Expire.
2. **`curl -sI http://localhost:3000/`**: xem `x-nextjs-cache`, `Cache-Control`.
3. **`npx next analyze`** (Next 16.1 trở lên): xem bundle theo module và tìm thư viện nặng.
4. **Đo trên bản production với mạng và CPU giả lập chậm**, không đo trên `next dev`.
5. **Sau khi deploy**: chạy [PageSpeed Insights](https://pagespeed.web.dev/) để có cả số giả lập (Lighthouse) lẫn số thật từ người dùng Chrome (CrUX).

---

## 9. Tự đánh giá

### Tổng quan

| Hạng mục | Mức độ | Ghi chú |
| --- | --- | --- |
| Render, caching | **Triệt để** | Trang tĩnh hoàn toàn, trả từ cache. Không còn gì đáng làm thêm cho một trang không có dữ liệu động. |
| CSS | **Triệt để** | Inline, 8 KB gzip, không request chặn render. |
| Font | Tốt | CLS 0. Vẫn là tài nguyên nặng thứ hai (78 KB). |
| JS | Tốt, đã chạm sàn | Code app ~15 KB. Phần còn lại là runtime, không giảm được nếu vẫn dùng App Router. |
| **HTML** | **Chưa triệt để** | 71.6 KB gzip, khá nặng so với một trang giới thiệu. |
| Ảnh | Chưa kiểm chứng | Cấu hình sẵn nhưng chưa có ảnh thật để đo. |
| **Đo lường** | **Chưa đủ** | Chưa có Lighthouse, chưa có số đo từ người dùng thật. |
| **Bảo mật** | **Chưa đủ** | Chưa có Content Security Policy. |

### Những chỗ chưa triệt để, xếp theo mức ảnh hưởng

**1. HTML nặng: 357 KB raw, 71.6 KB khi truyền.** Phân tích file HTML đã prerender:

| Thành phần | Raw | Gzip |
| --- | --- | --- |
| RSC payload (`self.__next_f.push`) | 209.8 KB | 41.4 KB |
| Markup HTML | 106.8 KB | 19.0 KB |
| 79 thẻ SVG (đã tính trong markup) | 51.8 KB | 8.9 KB |
| CSS inline | 37.5 KB | 8.1 KB |

**RSC payload là cái giá của App Router.** Mọi thứ render trên server đều có mặt hai lần: một lần dưới dạng HTML, một lần dưới dạng dữ liệu RSC để React hydrate và điều hướng. Cách giảm:
- **Gom SVG lặp lại thành sprite.** Khai báo `<symbol id="…">` một lần, dùng lại bằng `<use href="#…">`. Icon công nghệ trong dải marquee đang lặp lại nhiều lần với path đầy đủ.
- **Giảm số bản sao của marquee.** Dải chữ đang nhân 6 bản (`COPIES = 6`), dải tech stack nhân 2. Có thể nhân bản bằng JS ở client, hoặc dùng ít bản hơn rồi để CSS lặp.
- **Gom chuỗi class Tailwind dài hay lặp** thành `@utility` trong `globals.css`. Mỗi chuỗi class xuất hiện ở cả HTML lẫn RSC payload.
- **Tránh truyền dữ liệu lớn qua props vào Client Component.** Props đó được serialize vào payload.

Mức giảm cụ thể **chưa đo**. Nên làm từng bước và đo lại sau mỗi bước.

**2. JS đã chạm sàn của App Router.** Khoảng 140 KB là React, React DOM và router của Next. Bỏ cả 7 client component cũng chỉ tiết kiệm được khoảng 15 KB.

Muốn gần 0 KB JS thì phải đổi công cụ, ví dụ Astro, vốn chỉ gửi JS cho đúng phần cần tương tác. Đó là đánh đổi có chủ đích: Next cho hệ sinh thái, caching và khả năng mở rộng sau này (blog, API, form) tốt hơn. Với trang hiện tại, TBT 64 ms vẫn nằm trong ngưỡng tốt.

**3. Chưa có số đo thật.** Số ở trên là đo giả lập trên máy local. Nên bổ sung:
- `useReportWebVitals` để gửi LCP, INP, CLS về hệ thống analytics, kết hợp `experimental.webVitalsAttribution: ["LCP", "CLS", "INP"]` để biết **phần tử nào** gây ra chỉ số xấu.
- Hoặc dùng Vercel Speed Insights nếu deploy lên Vercel.
- Chạy PageSpeed Insights sau mỗi lần deploy lớn.

**4. Chưa có Content Security Policy (CSP).** Đây là một bẫy cần nhớ:
- **CSP dùng nonce buộc mọi trang thành dynamic.** Nonce phải sinh mới cho từng request, nên mất static và ISR, và không dùng được với partial prerender.
- **Trang tĩnh nên dùng `experimental.sri`** (Subresource Integrity, thử nghiệm): Next gắn hash `integrity` vào thẻ script lúc build, trang vẫn tĩnh.
- **Script inline chống nháy theme** cần thêm hash `sha256-…` của nó vào `script-src`.

**5. Ảnh chưa có.** Khi thêm ảnh thật:
- **Ảnh hero sẽ thành phần tử LCP**, nên giữ `loading="eager"` hoặc `fetchPriority="high"`.
- **Khai báo `sizes` đúng với layout**, ví dụ `sizes="(min-width: 1024px) 50vw, 100vw"`. Thiếu `sizes`, trình duyệt sẽ tải ảnh to hơn cần thiết.
- **Đặt `images.qualities`** để giới hạn các mức chất lượng được phép, tránh bị lạm dụng làm tăng chi phí tối ưu ảnh.

**6. Font 78 KB.** Có thể giảm thêm:
- Bỏ weight 500 nếu thay được bằng 400 hoặc 600.
- Dùng font variable (một file cho mọi weight) nếu font có bản variable.

**7. Việc nhỏ khác:**
- Chưa có `not-found.tsx` / `global-error.tsx` tuỳ biến. Không ảnh hưởng hiệu năng, nhưng là phần của checklist production.
- FAQ đang nói "dữ liệu GitHub được cache", trong khi `main` không lấy dữ liệu GitHub.
- Script đo hiệu năng đang nằm ngoài repo. Nên đưa vào `scripts/` để đo lại được.

### Tính năng Next.js chưa dùng, và khi nào nên dùng

Phần lớn là **không cần cho trang này**, vì đây là một trang tĩnh duy nhất. Nhưng đây là những thứ nên nhớ cho dự án sau:

| Tính năng | Ở dự án này | Khi nào dùng |
| --- | --- | --- |
| `<Suspense>` + streaming | Không cần, không có dữ liệu theo request | Trang có phần cá nhân hoá (giỏ hàng, user menu): shell tĩnh, phần riêng stream sau |
| `<Link>` prefetch, `partialPrefetching`, `staleTimes` | Đã bật `partialPrefetching` nhưng chưa có tác dụng vì chỉ có một trang | Site nhiều trang: chuyển trang gần như tức thì |
| `revalidateTag` / `updateTag` | Không có nguồn dữ liệu ngoài | Có CMS hoặc webhook: làm mới đúng phần dữ liệu thay đổi, không build lại |
| `"use cache: remote"`, `cacheHandlers` | Không cần | Self-host nhiều instance: chia sẻ cache qua Redis… |
| `"use cache: private"` | Không cần | Cache dữ liệu riêng từng người dùng (đọc cookies) |
| `generateStaticParams` | Không có route động | Blog, `/du-an/[slug]`: prerender mọi trang lúc build |
| `after()` | Không cần | Ghi log hoặc analytics sau khi đã trả response, không làm chậm người dùng |
| Server Actions | Chưa có form | Form liên hệ: không cần API route riêng, chạy được cả khi chưa có JS |
| View Transitions (`<ViewTransition>`) | Một trang | Chuyển trang có animation, không cần thư viện |
| `output: "export"` | Không dùng | Host tĩnh thuần (GitHub Pages): mất tối ưu ảnh và ISR |
| `experimental.sri` | Chưa bật | Khi thêm CSP mà vẫn muốn giữ trang tĩnh |
| `webVitalsAttribution`, `useReportWebVitals` | Chưa bật | Nên bật ở mọi dự án production |
| `next analyze` | Chưa chạy | Mỗi khi thêm thư viện mới |
| `turbopackFileSystemCache` | Chưa bật | Dự án lớn: dev và build nhanh hơn, không ảnh hưởng người dùng |

---

## 10. Checklist cho dự án sau

**Cấu hình**
- [ ] `cacheComponents: true`, `reactCompiler: true`, `poweredByHeader: false`
- [ ] `images.formats: ["image/avif", "image/webp"]`, đặt `minimumCacheTTL`
- [ ] `inlineCss` nếu CSS nhỏ và site ít trang
- [ ] Header bảo mật. Có CSP thì dùng `sri` cho trang tĩnh, nonce chỉ cho trang dynamic

**Render và dữ liệu**
- [ ] Nội dung tĩnh để trong file data có kiểu, không gọi API nếu không cần
- [ ] Dữ liệu ngoài: `"use cache"` + `cacheLife` + `cacheTag`, làm mới bằng `revalidateTag(tag, "max")`
- [ ] Dữ liệu theo request: đẩy xuống component nhỏ nhất, bọc `<Suspense>` riêng
- [ ] Build xong kiểm tra ký hiệu `○` / `◐` / `ƒ`

**Client**
- [ ] `"use client"` ở component lá nhỏ nhất
- [ ] Nội dung tĩnh truyền vào client component qua `children`
- [ ] Thư viện nặng chỉ dùng trên server
- [ ] Hiệu ứng không quan trọng: `next/dynamic` + tải khi trình duyệt rảnh
- [ ] Animation ưu tiên CSS (scroll-driven), luôn tôn trọng `prefers-reduced-motion`

**Tài nguyên**
- [ ] `next/font`: chỉ lấy weight và subset đang dùng
- [ ] Ảnh: static import, `sizes` đúng layout, ảnh LCP dùng `loading="eager"`
- [ ] Theme hay thứ gì đọc từ `localStorage`: script inline chạy trước lần paint đầu tiên

**SEO**
- [ ] Metadata API, OG image, sitemap, robots, manifest
- [ ] Muốn ẩn khỏi Google thì dùng thẻ `noindex`, không chặn bằng `robots.txt`
- [ ] JSON-LD phù hợp loại trang
- [ ] Một `h1`, section có nhãn, skip link

**Đo lường**
- [ ] Đo trên bản production với mạng và CPU giả lập chậm
- [ ] `next analyze` khi thêm thư viện
- [ ] `useReportWebVitals` + `webVitalsAttribution` trên production
- [ ] PageSpeed Insights sau mỗi lần deploy lớn
