import { Button } from "@nextui-org/react";
import { H1, P } from "../Font";
import { useRouter } from "next/navigation";

export default function HeadHero() {
  const router = useRouter();
  return (
    <div className="w-full h-[30rem] flex justify-center items-center flex-col gap-6">
      <H1 className="text-center w-2/3">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</H1>
      <P className="text-center w-2/3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis adipisci quibusdam nam repellat eius modi deleniti
        esse. Accusamus, voluptate laborum. Expedita harum deleniti incidunt nam vitae nisi quo vel consequatur!
      </P>
      <Button color="primary" onClick={() => router.push("/reservasi")}>
        Reservasi Sekarang
      </Button>
    </div>
  );
}
