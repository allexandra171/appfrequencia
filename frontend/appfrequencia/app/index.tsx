import {useState} from "react";
import { Text, View,StyleSheet,Alert } from "react-native";
import Botao from "../src/components/Botao";
import Input from "../src/components/Input";
import { colors, spacing, fontSizes } from "../src/theme"; 
import { useAuth } from "../src/contexts/AuthContext";

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { entrar } = useAuth();

  async function fazerLogin() {
   const ok = await entrar(email, senha);
   if (ok) {
     Alert.alert("Sucesso", "Login realizado!");
   }else {
    Alert.alert("Erro", "E-mail ou senha invalidas!");
   }
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
