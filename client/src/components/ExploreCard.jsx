import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExploreCard() {
  return (
    <div className="container  p-16 flex flex-col gap-4 justify-center items-center">
      <p className="text-gray-600 mb-6">Latest Products</p>
      <div className="">
        <p className="text-3xl text-center  text-gray-900 max-w-lg mb-4">
          Our newest styles are here to help you look your best.
        </p>
        <div className="mt-6 w-full flex justify-center">
          <Link
            className="flex items-center text-xl border-b border-current gap-x-4 py-2 transition-all duration-300 group hover:pl-4 hover:pr-1"
            to="/store"
          >
            Explore products
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
