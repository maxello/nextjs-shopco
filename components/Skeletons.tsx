const ProductListItemSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="aspect-square relative rounded-2xl bg-secondary mb-2 lg:mb-3">
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="w-1/2 h-7 bg-secondary rounded-md mb-1 lg:mb-2.5" />
        <div className="w-[55%] h-5 bg-secondary rounded-md mb-1 lg:mb-2.5" />
        <div className="w-[20%] h-7.5 bg-secondary rounded-md" />
      </div>
    </div>
  )
}

export const ProductListSkeleton = ({ amount = 4, cols = "default" }: { amount?: number, cols?: "default" | "md" }) => {
  const variants = {
    "default": "md:grid-cols-4",
    "md": "md:grid-cols-3",
  }
  return (
    <div className={`grid grid-cols-2 ${variants[cols]} gap-x-5 gap-y-9 mb-6 md:mb-9 max-w-[500px] md:max-w-full mx-auto animate-pulse`}>
      {Array(amount).fill(true, 0, amount).map((item, ind) => (<ProductListItemSkeleton key={ind} />))}
    </div>
  );
};

export const CartSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 animate-pulse">
      <div className="w-full lg:w-[59%]">
        <div className="lg:pt-1">
          <div className="flex border border-border p-3 md:p-5 lg:p-6 rounded-[20px] flex-col gap-8 lg:gap-12">
            {Array(2).fill(true, 0, 2).map((item, index) => (
              <div className="flex gap-4 relative after:h-[1px] after:absolute after:w-full after:-top-4 lg:after:-top-6 after:border-t-[1px] first:after:border-0 after:border-border" key={index}>
                <div className="aspect-square w-[100px] bg-secondary h-[100px] lg:w-[124px] lg:h-[124px] rounded-lg" />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex items-start justify-between gap-8">
                    <div className="w-full flex flex-col gap-1">
                      <div className="w-[70%] lg:w-[30%] h-5.5 md:h-6 lg:h-7 bg-secondary rounded-md" />
                      <div className="w-[40%] lg:w-[15%] h-3.5 md:h-5 bg-secondary rounded-md" />
                      <div className="w-[50%] lg:w-[20%] h-3.5 md:h-5 bg-secondary rounded-md" />
                    </div>
                    <div className="h-5.5 w-5.5 bg-secondary rounded-md" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-[40%] lg:w-[20%] h-6 lg:h-8 bg-secondary rounded-md" />
                    <div className="h-9 lg:h-11 min-w-[105px] lg:min-w-[126px] bg-secondary rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[41%] relative">
        <div className="lg:sticky lg:top-[140px]">
          <div className="border border-border rounded-[20px] p-5 lg:p-6 flex flex-col gap-4 lg:gap-6">
            <div className="w-1/2 h-7 lg:h-8 bg-secondary rounded-md" />
            <ul className="flex flex-col gap-4">
              <li className="flex items-center justify-between">
                <div className="w-[30%] h-6 lg:h-7 bg-secondary rounded-md" />
                <div className="w-[20%] h-6 lg:h-7 bg-secondary rounded-md" />
              </li>
              <li className="flex items-center justify-between">
                <div className="w-[30%] h-6 lg:h-7 bg-secondary rounded-md" />
                <div className="w-[20%] h-6 lg:h-7 bg-secondary rounded-md" />
              </li>
            </ul>
            <div className="flex items-center justify-between border-t pt-4 border-border">
              <div className="w-[30%] h-7 bg-secondary rounded-md" />
              <div className="w-[25%] h-8 bg-secondary rounded-md" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-grow bg-input rounded-full flex space-x-3 h-12">
                <div className="h-6 bg-secondary rounded-full" />
              </div>
              <div className="w-full max-w-[30%] lg:max-w-[26%] h-12 bg-secondary rounded-full" />
            </div>
            <div className="lg:mb-2 w-full h-13.5 md:h-15 bg-secondary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const FiltersSkeleton = () => (
  <div className="flex flex-col w-full gap-8 border border-border rounded-2xl p-5 animate-pulse">
    <div className="w-[60%] h-7 bg-secondary rounded-md" />
    {Array(3).fill(true, 0, 3).map((item, index) => (
      <div key={index} className="py-2 flex w-full justify-between items-center relative after:w-full after:h-[1px] after:absolute after:-top-4 after:bg-border">
        <div className="w-[60%] h-7 bg-secondary rounded-md" />
      </div>
    ))}
    
    <div className="mb-2 w-full h-12 bg-secondary rounded-full" />
  </div>
)

const ProductImagesCarouselSkeleton = () => {
  return (
    <div className="max-w-[500px] md:max-w-[550px] lg:max-w-full flex flex-col md:flex-row gap-[0.8rem] md:-mt-[0.8rem]">
      <div className="grow border rounded-2xl bg-secondary border-transparent h-[290px] md:h-[530px] md:mt-[0.8rem] md:order-2">

      </div>
      <div className="min-w-[111px] md:min-w-[152px] overflow-hidden">
        <div className="md:h-full touch-pan-y md:touch-pan-x flex flex-row md:flex-col -ml-[0.8rem] md:ml-0">
          {Array(3).fill(true, 0, 3).map((item, index) => (
            <div
              key={index}
              className="transform-3d pl-[0.8rem] md:pl-0 md:pt-[0.8rem] min-w-0 grow-0 shrink-0 h-[106px] md:h-[33.33%] basis-[33.33%]"
            >
              <div className="relative rounded-2xl bg-secondary border border-transparent w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const ProductDetailsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-[50%] lg:w-[20%] mb-6 md:mb-7 bg-secondary h-6 rounded-md"></div>
      <div className="relative flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 lg:sticky lg:top-[140px] h-max">
          <ProductImagesCarouselSkeleton />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="w-[70%] mb-2 h-10 lg:h-12 bg-secondary rounded-md" />
          <div className="w-[35%] mb-5 bg-secondary h-6 lg:h-7 rounded-md"></div>
          <div className="w-[15%] mb-7 bg-secondary h-8 rounded-md"></div>
          <ul className="mb-2">
            {Array(6).fill(true, 0, 6).map((item, index) => (
              <li key={index} className="w-full mb-3 bg-secondary h-3 rounded-md" />
            ))}
          </ul>
          <div className="flex flex-col">
            <div className="flex flex-col gap-2.5 border-t py-4 border-b border-border">
              <div className="w-[20%] bg-secondary h-6 rounded-md" />
              <ul className="flex items-center flex-wrap gap-3">
                {Array(3).fill(true, 0, 3).map((item, index) => (
                  <li key={index} className="w-9.5 h-9.5 rounded-full relative mb-1 flex bg-secondary items-center justify-center" />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2.5 py-4 border-b border-border">
              <div className="w-[20%] bg-secondary h-6 rounded-md" />
              <ul className="flex items-center flex-wrap gap-2 mb-2">
                {Array(4).fill(true, 0, 4).map((item, index) => (
                  <li key={index}>
                    <div className="w-full min-w-16 h-11.5 px-5 bg-secondary md:px-6 rounded-full" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="py-6 gap-4 max-w-[500px] lg:max-w-full">
            <div className="flex items-center justify-between gap-3 md:gap-5 mb-5">
              <div className="w-full flex items-center gap-4">
                <div className="h-11 md:h-13 min-w-[110px] bg-secondary rounded-full md:min-w-[170px]" />
                <div className="w-full h-11 md:h-13 bg-secondary rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}