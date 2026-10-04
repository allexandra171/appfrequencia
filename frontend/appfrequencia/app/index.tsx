import {useState} from "react";
import { Text, View,StyleSheet,Alert } from "react-native";
import Botao from "../src/components/Botao";
import Input from "../src/components/Input";
import { colors, spacing, fontSizes } from "../src/theme";

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin() {
   Alert.alert("Login", "Email digitado:" + email);
  }
  
  return (
    <View style={styles.container}>
    <Text style={styles.titulo}>Frequência</Text>
    <Input
      label="Email"
      value={email}
      onChangeText={setEmail}
      placeholder="Digite seu email"
    />
    <Input
      label="Senha"
      value={senha}
      onChangeText={setSenha}
      placeholder="Digite sua senha"
      secureTextEntry
    />
    <Botao titulo="Entrar" onPress={fazerLogin} />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: fontSizes.title,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
});
