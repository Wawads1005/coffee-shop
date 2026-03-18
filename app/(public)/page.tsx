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
        <div className="dark:text-foreground text-background absolute inset-0 top-1/2 mx-auto max-h-min w-full max-w-360 -translate-y-1/2 space-y-4 px-4 md:space-y-8 md:px-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-7xl">
              Perfect Coffee,
              <br />
              Perfect Moment
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
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
      <div id="about">
        <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center gap-2 md:gap-4">
              <h3 className="text-2xl font-semibold text-balance sm:text-4xl">
                Crafting Coffee Excellence Since 2009
              </h3>
              <p className="text-sm text-balance sm:text-base">
                At Brew & Bean, we believe that great coffee brings people
                together. Our journey began with a simple mission: to serve the
                finest coffee while creating a warm, welcoming space for our
                community.
              </p>
              <p className="text-sm text-balance sm:text-base">
                We source our beans directly from sustainable farms around the
                world, ensuring every cup tells a story of quality, ethics, and
                exceptional taste.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/about_us.jpg"
                className="size-full max-h-full max-w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
        <div className="bg-card text-card-foreground px-4 py-8 md:px-8 md:py-16">
          <div className="mx-auto w-full max-w-360 space-y-8 md:space-y-16">
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-2xl font-semibold sm:text-4xl">
                Our Achievements
              </h3>
              <p className="text-sm sm:text-base">
                Providing businesses with effective tools to improve workflows,
                boost efficiency, and encourage growth.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold md:text-4xl">
                  300+
                </div>
                <p className="text-muted-foreground">Coffee Variety</p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold md:text-4xl">
                  1,800+
                </div>
                <p className="text-muted-foreground">Happy Costumers</p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold md:text-4xl">
                  10+
                </div>
                <p className="text-muted-foreground">Years of Excellence</p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-2xl font-bold md:text-4xl">
                  50%+
                </div>
                <p className="text-muted-foreground">Yearly Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
