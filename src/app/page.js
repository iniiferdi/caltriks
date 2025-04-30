import { DotBackgroundDemo } from "@/components/BackgroundDots/index";
import { MatriksOperations } from "@/components/MatrixOperations/index";
export default function Home() {
  return (

    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-black">

     
        <DotBackgroundDemo />


        <MatriksOperations/>

      

    </div>



  );
}
