import Container from "@/components/ui/Container";

export default function ContactHero() {
  return (
    <section className="relative w-full bg-linear-to-br from-primary/5 via-base-100 to-accent/10 dark:from-primary/20 dark:via-base-100 dark:to-accent/20 py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col items-center text-center gap-5">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary/70">
          Get in Touch
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary leading-tight max-w-2xl">
          We&apos;d Love to <span className="text-accent">Hear from You</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-base-content/80 max-w-xl">
          Whether you&apos;re planning a celebration, curious about a custom
          cake, or just want to say hello — our team is always happy to chat.
          Reach out and let&apos;s make something sweet together.
        </p>
      </Container>
    </section>
  );
}
