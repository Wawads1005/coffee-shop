import { Button } from "@/components/ui/button";
import Link from "next/link";

function Homepage() {
  return (
    <div>
      <div className="relative">
        <div
          className="z-0 h-[80vh] w-full bg-cover bg-center bg-no-repeat brightness-50"
          style={{ backgroundImage: `url("/cover.jpg")` }}
        />
        <div className="text-background absolute inset-0 mx-auto mt-40 w-full max-w-360 space-y-4 md:space-y-8">
          <div className="space-y-4">
            <h1 className="text-7xl font-bold">
              Perfect Coffee,
              <br />
              <span className="text-amber-600">Perfect Moment</span>
            </h1>
            <p className="text-lg">
              Handcrafted with love, served with passion. Experience the finest
              coffee in town.
            </p>
          </div>
          <div className="space-x-2">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/products">Explore Coffee</Link>}
            />
            <Button size="lg" variant="secondary">
              <span>Contact Us</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
