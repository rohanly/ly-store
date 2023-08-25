import ProductContainer from "@/components/ProductContainer";
import React, { useEffect, useRef } from "react";

const Store = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      ref={ref}
      className="py-8 flex flex-col md:flex-row items-start pt-10"
    >
      {/* <div>
        <div className="px-8 py-4 pr-0 pl-8 min-w-[250px]">
          <div className="flex gap-x-3 flex-col gap-y-3">
            <span className="text-base font-semibold">Collections</span>
            <ul className="text-base flex flex-col gap-3 items-start">
              <li>
                <label htmlFor="hoodies" className="flex items-center gap-2">
                  <input className="accent-orange-200" type="checkbox" />
                  Hoodies
                </label>
              </li>
              <li>
                <label htmlFor="hoodies" className="flex items-center gap-2">
                  <input className="accent-orange-200" type="checkbox" />
                  Bags
                </label>
              </li>
              <li>
                <label htmlFor="hoodies" className="flex items-center gap-2">
                  <input className="accent-orange-200" type="checkbox" />
                  T-shirts
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <ProductContainer />
    </section>
  );
};

export default Store;
