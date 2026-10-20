# Om Tiwari — Portfolio

A cinematic personal studio built with Next.js App Router, TypeScript, CSS Modules, GSAP/ScrollTrigger and an isolated React Three Fiber scene.

## Run

```sh
npm ci
npm run dev
```

Open the printed localhost URL. Use Node.js 22 or newer (implemented with Node 26.11.1).

```sh
npm run typecheck
npm run build
npm test
```

`next build` creates the static `out/` directory. Tests inspect this export, so build first. `npm run preview` (or `npm start`) serves that exact export on port 3001, including the designed 404. Production hosting should also support directory indexes and serve `404.html` for missing paths.

## Edit content

- `src/content/profile.ts`: contact links, canonical origin and optional portrait.
- `src/content/projects.ts`: roles, case studies, live links, media and event photos.
- `src/types/project.ts`: shared project and photograph types.
- `src/components/experience/`: procedural sculpture, gallery and handoff.

Set `NEXT_PUBLIC_SITE_URL` before building for another host. Fonts are served locally and their OFL licenses are in `public/fonts/`.

## Photography

The About layout is complete without a photograph. Add an approved image to `public/media/`, then replace `profile.portrait: null` with a typed photo record. It needs `src`, `alt`, `width`, `height` and `crop: { desktop, mobile }`; caption and credit are optional. `heroPortrait: true` enables the small About-link portrait.

Add Adobe event photos to the Adobe record's `photographs` array with accurate captions and supplied photographer credits. No synthetic portrait or event photography is included.

## Contact

The site deliberately uses an email-draft flow. Required fields use native browser validation, then a draft can be opened in the visitor's own email app or copied. Nothing is submitted to a server, no leads are persisted, and no delivery success is claimed. A direct email link also works without JavaScript.

## Rendering modes

Desktop enhances only after hydration and a successful WebGL2 check. Reduced-motion, narrow layouts and failed graphics use the server-rendered poster and ordinary project cards. The “Reduce effects” choice is stored locally. The scene is lazy-loaded, renders on demand while interactions settle, and releases textures/materials/listeners on unmount. Native scrolling remains in control.

See `docs/IMPLEMENTATION_STATUS.md`, `docs/ASSETS.md`, `docs/VALIDATION.md` and `docs/CREDITS.md` for evidence and remaining inputs.
