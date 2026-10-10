import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../src/contexts/AuthContext";
import Botao from "../src/components/Botao";

export default function Professor() {
  const { usuario, sair } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>
        Área do Professor: {usuario?.nome}
      </Text>
      <Botao titulo="Sair" onPress={() => { sair(); router.replace("/"); }} />
    </View>
  );
}
