import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Filter } from "@/components/filter/filter";
import { FilterStatus } from "@/types/filter-status";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              active={status === FilterStatus.PENDING}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} activeOpacity={0.5}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
