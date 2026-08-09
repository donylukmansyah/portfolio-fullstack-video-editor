# AGENTS.md

Feature-based App Router architecture (`src/`). Types/schemas/actions/components live inside each `features/<domain>/`, not in a global folder.

## Layout
- `src/app/` — route tree only. Pages call feature server modules and render feature components.
- `src/components/` — `ui/` (shadcn primitives), `layout/` (PublicShell, Navbar, Footer). Cross-domain
  UI that is *not* bound to one feature.
- `src/features/<domain>/` — owns its `types.ts`, `schema.ts` (Zod), `server/`, `actions/` (server actions),
  `components/`, `hooks/`, `lib/`. Domains: `portfolio`, `admin`, `contact`, `resume`, `auth`.
- `src/server/` — infra adapters only: `auth/` (better-auth, session guards), `db/prisma.ts`, `cache/tags.ts`,
  `storage/supabase.ts`, `metadata/`, `lib/safe-url.ts`. Server-only modules start with `import "server-only"`.
- `src/shared/` — cross-cutting, feature-agnostic: `hooks/`, `utils.ts` (`cn`).
- `src/proxy.ts` — middleware (admin route guard). No `middleware.ts`.

## Key paths
- `@/*` resolves to `src/*` (see tsconfig `paths` + `baseUrl`).
- Auth: config `@/server/auth/auth`, guards `getAdminSession`/`requireAdminPage`/`assertAdminAction` from
  `@/server/auth/session`, `isAdminEmail` from `@/server/auth/guards`. Client: `@/features/auth/client`.
- Portfolio DB logic: `@/features/portfolio/server` (queries.ts page data, catalog.ts select/map/admin list,
  revalidation.ts). Zod schemas in `@/features/<domain>/schema`.
- Shared cache tag `PORTFOLIO_CACHE_TAG="portfolio"`, revalidate 300s: `@/server/cache/tags`.

## Commands
- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm lint`
- `pnpm db:generate` (postinstall), `pnpm db:migrate`, `pnpm db:push` (Prisma; `prisma.config.ts` uses `DIRECT_URL`)
- DB at runtime uses `DATABASE_URL` (pooled), CLI uses `DIRECT_URL`.
- No test framework installed.

## Conventions
- Server data fetching: `cache`/`unstable_cache` with `tags: [PORTFOLIO_CACHE_TAG]`; invalidate via
  `revalidatePath` + Cache-Tag / `revalidatePortfolioRoutes()`.
- Admin mutations: `assertAdminAction()`; return shaped results via `@/features/admin/server/action-utils`
  (`successResult`/`errorResult`/`parseWithSchema`).
- Forms: native `FormData` + `useActionState` (react-hook-form is installed but unused).
- Types stay colocated in their feature — do not create a global `types/`.

## Gotchas
- `.next` cached typegen can break `pnpm build`/`tsc` after moving files — `Remove-Item .next -Recurse -Force`
  then rebuild.
- Build output on Turbopack may truncate to `Finished TypeScript`; confirm success via `.next/BUILD_ID`
  timestamp or exit code, not stdout length.
- Supabase storage upload is server-only via `@/server/storage` (service role) → `/api/admin/upload`.