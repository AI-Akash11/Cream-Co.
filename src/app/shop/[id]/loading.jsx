import Container from "@/components/ui/Container";

export default function CakeDetailsLoading() {
  return (
    <div className="min-h-screen bg-base-100 py-12 sm:py-16">
      <Container>
        {/* Breadcrumb / Back button skeleton */}
        <div className="mb-8 pl-4">
          <div className="h-5 w-24 bg-base-300 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-6 animate-pulse">
            <div className="relative aspect-4/5 w-full bg-base-200 overflow-hidden shadow-2xl rounded-sm"></div>
            {/* Thumbnails */}
            <div className="flex gap-4">
              <div className="relative w-24 h-32 bg-base-200 border-2 border-transparent"></div>
              <div className="relative w-24 h-32 bg-base-200 border-2 border-transparent"></div>
              <div className="relative w-24 h-32 bg-base-200 border-2 border-transparent"></div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col lg:py-6 animate-pulse">
            <div className="mb-8">
              <div className="h-3 w-16 bg-base-300 rounded mb-4"></div>
              <div className="h-12 w-3/4 bg-base-300 rounded mb-6"></div>
              <div className="flex items-center gap-6 mb-8">
                <div className="h-8 w-24 bg-base-300 rounded"></div>
                <div className="h-6 w-20 bg-base-300 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-base-300 rounded"></div>
                <div className="h-4 w-full bg-base-300 rounded"></div>
                <div className="h-4 w-3/4 bg-base-300 rounded"></div>
              </div>
            </div>

            <div className="w-full h-px bg-base-300 my-8"></div>

            <div className="flex flex-col gap-8 mb-10">
              {/* Size Selection */}
              <div>
                <div className="h-4 w-24 bg-base-300 rounded mb-4"></div>
                <div className="flex flex-wrap gap-4">
                  <div className="h-10 w-20 bg-base-300 rounded-sm"></div>
                  <div className="h-10 w-20 bg-base-300 rounded-sm"></div>
                  <div className="h-10 w-20 bg-base-300 rounded-sm"></div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <div className="h-4 w-20 bg-base-300 rounded mb-4"></div>
                <div className="flex items-center gap-6">
                  <div className="h-12 w-32 bg-base-300 rounded-sm"></div>
                  <div className="h-3 w-20 bg-base-300 rounded"></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <div className="flex-1 h-16 bg-base-300 rounded-sm"></div>
              <div className="w-16 h-16 shrink-0 bg-base-300 rounded-sm"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
