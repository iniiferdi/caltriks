import { DotBackgroundDemo } from "@/components/BackgroundDots/index";
import { MatriksOperations } from "@/components/MatrixOperations/index";
import { MatriksPanel } from "@/components/MatrixPanel/MatriksPanel";
export default function Home() {
  return (

    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-black ">
      <DotBackgroundDemo />

      <div className="flex xl:flex-row justify-between items-center w-full relative max-w-5xl flex-col gap-12 p-12 xl:p-0">
        <MatriksPanel title="Matriks A" matrixId="matrixA" />
        <MatriksOperations />
        <MatriksPanel title="Matriks B" matrixId="matrixB" />
      </div>

    </div>



  );
}
