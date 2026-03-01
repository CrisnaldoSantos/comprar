import { View } from "react-native";
import { CircleDashed, CircleCheck } from "lucide-react-native";
import { FilterStatus } from "@/types/filter-status";

export function StatusIcon({ status }: { status: FilterStatus }) {
  return status === FilterStatus.PENDING ? (
    <CircleDashed size={18} color="#000000" />
  ) : (
    <CircleCheck size={18} color="#2C46B1" />
  );
}
