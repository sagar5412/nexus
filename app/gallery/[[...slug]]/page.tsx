import ShaderCanvas from "@/components/three/ShaderCanvas";

export default function GalleryPage({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any; // Using any to avoid type complexity with Next.js versions for now
}) {
  const artName = searchParams?.art || "FractalFlow";

  return (
    <main className="h-screen w-screen overflow-hidden">
      <ShaderCanvas artName={artName} />
    </main>
  );
}
