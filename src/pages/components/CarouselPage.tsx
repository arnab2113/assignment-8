import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const CarouselPage = () => {
  const usageCode = `// Carousel Component Demo
<Carousel items={['Slide 1', 'Slide 2', 'Slide 3']} />`;

  const propsData = [
    {
      prop: "items",
      type: "ReactNode[]",
      default: "[]",
      description: "Array of items or image URLs to display in carousel",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Whether to automatically cycle through slides",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Carousel</h1>
        <p className="text-lg text-gray-600">
          A slideshow component for cycling through elements like images or cards.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <div className="p-8 text-center bg-gray-100 rounded-lg w-full max-w-md">
            <p className="text-gray-500 font-medium">Carousel Preview Coming Soon</p>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
