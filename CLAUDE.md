# Dicti

French dictation learning app - Expo (managed), Supabase, RevenueCat

## Tech Stack

- **Framework**: Expo SDK 54, TypeScript strict, React Navigation
- **Backend**: Supabase (auth, db, storage)
- **State**: Zustand + TanStack Query
- **Styling**: NativeWind (Tailwind)
- **Payments**: RevenueCat
- **Analytics**: PostHog, Sentry
- **Testing**: Jest + React Testing Library

## Project Rules

1. **No barrel files** - Import from source directly, not index.ts
2. **No raw backend errors** - Map Supabase/API errors to user-friendly messages
3. **Default exports** - Components use default export pattern

## Import Aliases

```
@components/* → src/components/*
@hooks/*      → src/hooks/*
@stores/*     → src/stores/*
@queries/*    → src/queries/*
@utils/*      → src/utils/*
@lib/*        → src/lib/*
@pages/*      → src/pages/*
@appTypes/*   → src/types/*
@config/*     → config/*
@assets/*     → assets/*
```

## Project Structure

```
src/
├── components/
│   ├── natives/      # MyText, MyButton, MyImage
│   ├── templates/    # ScreenTemplate, ModalTemplate, BottomSheetTemplate
│   ├── modals/       # LoaderModal, SubscriptionModal
│   └── common/       # error-boundary, connectivity-banners
├── hooks/
├── stores/           # Zustand (auth, subscription, lifes, loading)
├── queries/          # TanStack Query
├── pages/            # Screens
├── lib/              # External configs (react-query)
├── utils/            # Helpers
└── types/
tests/                # Mirrors src structure
```

## Scripts

```bash
npm run check   # typecheck + lint + test
npm run format  # prettier
npm start       # expo dev server
```
