import { useContext } from "react";
import { WorkflowLayoutContext } from "@/layouts/WorkflowLayout";

export default function usePrimaryLayoutContext() {
  return useContext(WorkflowLayoutContext);
}
