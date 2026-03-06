import Container from "@/components/ui/Container";
import SectionHeading from "@/components/about/SectionHeading";

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-base-100">
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-10 sm:gap-14">
            {/* Header Area */}
            <div className="max-w-3xl mx-auto text-center">
              <SectionHeading
                eyebrow="Our Collection"
                title="Explore Our Cakes & Desserts"
                align="center"
              />
              <div className="mt-5 flex flex-col items-center gap-2">
                <div className="h-4 w-3/4 bg-base-300 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-base-300 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-base-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Filter & Cake Area */}
            <div className="flex flex-col gap-8 sm:gap-12">
              {/* FilterBar Skeleton */}
              <div className="sticky top-20 z-40 w-full mb-8 sm:mb-12">
                <div className="bg-base-200/80 backdrop-blur-md border border-base-300 rounded-xl p-4 sm:p-5 shadow-sm animate-pulse">
                  <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                    <div className="h-10 border border-base-300 rounded-lg bg-base-100 w-full max-w-md"></div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <div className="h-3 w-16 bg-base-300 rounded ml-1"></div>
                        <div className="h-8 bg-base-100 border border-base-300 rounded-lg w-full"></div>
                      </div>
                      <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <div className="h-3 w-16 bg-base-300 rounded ml-1"></div>
                        <div className="h-8 bg-base-100 border border-base-300 rounded-lg w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="group flex flex-col gap-4 bg-base-200 p-0 sm:p-0 rounded-none overflow-hidden animate-pulse"
                  >
                    {/* Image Skeleton */}
                    <div className="relative aspect-4/5 w-full bg-base-300"></div>
                    {/* Content Skeleton */}
                    <div className="flex flex-col gap-1.5 px-1 pb-4">
                      <div className="h-5 bg-base-300 rounded w-3/4"></div>
                      <div className="h-3 bg-base-300 rounded w-full mt-1"></div>
                      <div className="mt-1 flex items-baseline justify-between">
                        <div className="h-4 bg-base-300 rounded w-1/3"></div>
                        <div className="h-3 bg-base-300 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
