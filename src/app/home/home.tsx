import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Filter } from "@/components/filter/filter";
import { FilterStatus } from "@/types/filter-status";
import { Item } from "@/components/item/item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
  { id: "1", status: FilterStatus.PENDING, description: "2 latas leite" },
  { id: "2", status: FilterStatus.DONE, description: "1 pacote de pão" },
  { id: "3", status: FilterStatus.PENDING, description: "3 dúzias ovos" },
  { id: "4", status: FilterStatus.DONE, description: "1 manteiga" },
  { id: "5", status: FilterStatus.PENDING, description: "4 pacotes de café" },
  { id: "6", status: FilterStatus.DONE, description: "2 kg açúcar" },
];

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

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => console.log("Remover item")}
              onStatusChange={() => console.log("Alterar status do item")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum item aqui!</Text>
          )}
        />
      </View>
    </View>
  );
}
