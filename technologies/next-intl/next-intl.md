Hier ist eine saubere Dokumentation als **Markdown-Datei (`i18n-setup.md`)**, die deine ganzen Inhalte in eine strukturierte Form bringt:

````markdown
# Internationalisierung mit next-intl (App Router)

Dieses Dokument beschreibt die Einrichtung von **lokalisierten Routen** mit `next-intl` in einer Next.js-App mit App Router.  
Es werden sowohl prefix- als auch domainbasierte Routen behandelt, inkl. Middleware, Navigation und Static Rendering.

---

## Routing-Strategien

- **Prefix-basiert**  
  Beispiel: `/en/about`, `/de/über-uns`

- **Domain-basiert**  
  Beispiel: `en.example.com/about`, `de.example.com/about`

In beiden Fällen nutzt `next-intl` ein `[locale]`-Segment auf oberster Ebene, um Inhalte in unterschiedlichen Sprachen bereitzustellen.

---

## Initial Setup

### `src/i18n/routing.ts`

```ts
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en'
});
````

### `src/middleware.ts`

```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

### `src/i18n/navigation.ts`

```ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

### `src/i18n/request.ts`

```ts
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {locale};
});
```

### `src/app/[locale]/layout.tsx`

```tsx
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};
 
export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
```

---

## Static Rendering

Da `[locale]` ein dynamisches Segment ist, muss `generateStaticParams` hinzugefügt werden.

### Beispiel

```ts
import {routing} from '@/i18n/routing';
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
```

### `setRequestLocale` in Layouts und Pages

```tsx
import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};
 
export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
 
  setRequestLocale(locale);
 
  return <>{children}</>;
}
```

---

## Erweiterte Routing-Optionen

### `localePrefix`

* `always` (default) → `/en/about`
* `as-needed` → `/about` (default locale) und `/de/about` (andere)
* `never` → keine Prefixes, nur per Cookie/Domain

### `prefixes`

Individuelle Prefixes pro Locale möglich:

```ts
localePrefix: {
  mode: 'always',
  prefixes: {
    'en-US': '/us',
    'de-AT': '/eu/at'
  }
}
```

### `pathnames`

Unterstützt **lokalisierte URLs** wie `/de/über-uns` → `/[locale]/about`.

### `domains`

Domain-zu-Locale-Mapping:

```ts
domains: [
  { domain: 'us.example.com', defaultLocale: 'en-US', locales: ['en-US'] },
  { domain: 'ca.example.com', defaultLocale: 'en-CA', locales: ['en-CA', 'fr-CA'] }
]
```

### `localeDetection`

Automatische Erkennung per `accept-language` oder Cookie. Kann deaktiviert werden:

```ts
localeDetection: false
```

### `localeCookie`

Speicherung der letzten Sprache im Cookie `NEXT_LOCALE`.
Kann angepasst oder deaktiviert werden.

### `alternateLinks`

Automatische `<link hreflang="...">`-Generierung.
Kann deaktiviert werden:

```ts
alternateLinks: false
```

---

## Middleware

Die Middleware übernimmt:

* Locale-Verhandlung
* Redirects & Rewrites
* Alternate Links für SEO

Beispiel:

```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

### Integration mit weiteren Middlewares

* Clerk (`@clerk/nextjs`)
* Supabase Auth (`@supabase/ssr`)
* NextAuth.js

---

## Navigation APIs

Leichtgewichtige Wrapper um Next.js-Navigation:

```ts
import {Link, redirect, useRouter, usePathname, getPathname} from '@/i18n/navigation';
```

### Beispiele

* **Link**

  ```tsx
  <Link href="/about">About</Link>
  ```

* **useRouter**

  ```tsx
  const router = useRouter();
  router.push('/about');
  ```

* **usePathname**

  ```tsx
  const pathname = usePathname(); // Gibt internen Pfad ohne Locale zurück
  ```

* **redirect**

  ```ts
  redirect({href: '/login', locale: 'en'});
  ```

* **getPathname**

  ```ts
  const pathname = getPathname({locale: 'en', href: '/about'});
  ```

---

## Troubleshooting

* **Middleware läuft nicht** → Matcher prüfen
* **Seite nicht lokalisiert** → Middleware nicht aktiv
* **Locale fehlt** → `getRequestConfig` prüfen, ggf. `notFound()` oder Default setzen
* **Static Rendering bricht ab** → `setRequestLocale` und `generateStaticParams` verwenden

---

## Fazit

Mit `next-intl` lässt sich eine **vollständig internationalisierte Next.js-App** mit App Router umsetzen.
Durch **Middleware, Routing-Konfiguration, Navigation-Wrapper und Static Rendering** können flexible und SEO-freundliche Sprach-Setups realisiert werden.

```

---

👉 Soll ich dir die Datei direkt als `i18n-setup.md` exportieren (damit du sie in dein Repo legen kannst), oder reicht dir erstmal der Markdown-Text hier?
```
