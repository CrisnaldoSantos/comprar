import { View, Text, TouchableOpacity } from "react-native";

import { itemStyles } from "./item.styles";
import { FilterStatus } from "@/types/filter-status";
import { StatusIcon } from "../status-icon/status-icon";
import { Trash2 } from "lucide-react-native";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type ItemProps = {
  data: ItemData;
  onRemove: () => void;
  onStatusChange: () => void;
};

export function Item({ data, onRemove, onStatusChange }: ItemProps) {
  return (
    <View style={itemStyles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatusChange}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={itemStyles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}
