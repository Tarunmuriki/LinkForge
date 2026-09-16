# Coss UI setup

The assessment brief requires Coss UI primitives. Coss UI is distributed through the shadcn registry rather than as a conventional runtime package.

Official setup documented at https://coss.com/ui/docs/get-started

For a fresh app:
```bash
pnpm dlx shadcn@latest init @coss/style
```

For individual primitives:
```bash
pnpm dlx shadcn@latest add @coss/button @coss/card @coss/input @coss/badge @coss/dialog @coss/menu
```

The current starter uses local wrappers in `client/src/components/ui/` to remain runnable after a normal npm install. Replace those wrappers with the generated Coss components before final submission.
