import "./pipeline-replica.css";
import { PipelineReplicaCanvas } from "@/components/home/PipelineReplicaCanvas";
import { PipelineReplicaLive } from "@/components/home/PipelineReplicaLive";

export function PipelineReplica() {
  return (
    <PipelineReplicaLive>
      <PipelineReplicaCanvas />
    </PipelineReplicaLive>
  );
}
