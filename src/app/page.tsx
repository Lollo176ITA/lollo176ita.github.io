import { Button } from "@/components/ui/button";

// Segnaposto finché non definiamo il design: verifica che Next, Tailwind e shadcn funzionino.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-4 py-16">
      <h1 className="font-heading text-3xl font-semibold">Lollo176ITA</h1>
      <p className="text-muted-foreground">Sito in ricostruzione.</p>
      <Button
        className="w-fit"
        render={<a href="https://github.com/Lollo176ITA" />}
        nativeButton={false}
      >
        GitHub
      </Button>
    </main>
  );
}
