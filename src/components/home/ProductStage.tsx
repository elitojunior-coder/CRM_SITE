import Image from "next/image";
import { PipelineReplica } from "@/components/home/PipelineReplica";
import { ProductStageShell } from "@/components/home/ProductStageShell";

export type ProductStageMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "replica" };

type ProductStageProps = {
  media: ProductStageMedia;
  className?: string;
};

export function ProductStage({ media, className }: ProductStageProps) {
  return (
    <ProductStageShell className={className}>
      {media.type === "replica" ? (
        <PipelineReplica />
      ) : media.type === "image" ? (
        <Image
          src={media.src}
          alt={media.alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
      ) : (
        <video
          className="size-full object-cover"
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
    </ProductStageShell>
  );
}
