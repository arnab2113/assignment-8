import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const LayoutPage = () => {
  const usageCode = `// Layout Component Demo
<Layout gap="4">
  <div>Sidebar</div>
  <div>Content</div>
</Layout>`;

  const propsData = [
    {
      prop: "gap",
      type: "string | number",
      default: '"4"',
      description: "Spacing gap between grid or flex layout elements",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Layout</h1>
        <p className="text-lg text-gray-600">
          Layout grid and container structures for responsive application designs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <div className="p-8 text-center bg-gray-100 rounded-lg w-full max-w-md">
            <p className="text-gray-500 font-medium">Layout Component Preview</p>
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

export default LayoutPage;
