import AppBar from "@src/components/core/AppBar";
import Card from "@src/components/core/Card";

export default function Home() {
  return (
    <>
      <AppBar />
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
