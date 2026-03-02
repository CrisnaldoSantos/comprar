import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Filter } from "@/components/filter/filter";
import { FilterStatus } from "@/types/filter-status";
import { Item } from "@/components/item/item";
import { useEffect, useState } from "react";
import { itemsStorage, ItemStorage } from "@/storage/items/items-storage";
import { get } from "react-native/Libraries/NativeComponent/NativeComponentRegistry";

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
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  const handleAddItem = async () => {
    if (!description.trim()) {
      return Alert.alert(
        "Descrição vazia",
        "Por favor, insira uma descrição para o item.",
      );
    }

    const newItem = {
      id: String(new Date().getTime()),
      status: FilterStatus.PENDING,
      description,
    };

    await itemsStorage.addItem(newItem);
    await getItems();
    Alert.alert("Sucesso", "Item adicionado com sucesso!");
    setDescription("");
    setFilter(FilterStatus.PENDING);
  };

  async function getItems() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.error("Error fetching items:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar os itens. Tente novamente mais tarde.",
      );
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      await itemsStorage.removeItem(id);
      await getItems();
      Alert.alert("Sucesso", "Item removido com sucesso!");
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert(
        "Erro",
        "Não foi possível remover o item. Tente novamente mais tarde.",
      );
    }
  }

  async function onClearItems() {
    try {
      await itemsStorage.clearItems();
      setItems([]);
    } catch (error) {
      console.error("Error clearing items:", error);
      Alert.alert(
        "Erro",
        "Não foi possível limpar os itens. Tente novamente mais tarde.",
      );
    }
  }

  function handleClearItems() {
    Alert.alert("Confirmar", "Tem certeza que deseja limpar todos os itens?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        onPress: () => onClearItems(),
      },
    ]);
  }

  async function handleUpdateItemStatus(id: string) {
    try {
      await itemsStorage.updateItemStatus(id);
      await getItems();
      Alert.alert("Sucesso", "Status do item atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating item status:", error);
      Alert.alert(
        "Erro",
        "Não foi possível atualizar o status do item. Tente novamente mais tarde.",
      );
    }
  }

  useEffect(() => {
    getItems();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              active={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            activeOpacity={0.5}
            onPress={handleClearItems}
          >
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemoveItem(item.id)}
              onStatusChange={() => handleUpdateItemStatus(item.id)}
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
