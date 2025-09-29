// app/not-found.tsx
// KEINE Header/Footer/SmoothScroll/Lenis/GSAP-Imports hier reinziehen!
export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl py-24 text-center">
      <h1 className="text-3xl font-bold">404 – Seite nicht gefunden</h1>
      <p className="mt-4">Die angeforderte Seite existiert nicht.</p>
      <a className="mt-8 inline-block underline" href="/">Zur Startseite</a>
    </main>
  );
}
