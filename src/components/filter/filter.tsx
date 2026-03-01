import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { filterStyles } from "./filter.styles";
import { FilterStatus } from "@/types/filter-status";

import { CircleCheck } from "lucide-react-native";
import { StatusIcon } from "../status-icon/status-icon";

interface FilterProps extends TouchableOpacityProps {
  status: FilterStatus;
  active: boolean;
}

export function Filter({ status, active, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      style={[filterStyles.container, { opacity: active ? 1 : 0.5 }]}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={filterStyles.title}>
        {status === FilterStatus.PENDING ? "Pendentes" : "Comprados"}
      </Text>
    </TouchableOpacity>
  );
}
