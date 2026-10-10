import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import Botao from "../src/components/Botao";
import Input from "../src/components/Input";
import { colors, spacing, fontSizes } from "../src/theme";
import { useAuth } from "../src/contexts/AuthContext";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { cadastrar } = useAuth();
  const router = useRouter();

  async function fazerCadastro() {
    if (!nome.trim() || !email.trim() || senha.length < 6) {
      Alert.alert("Atenção", "Preencha todos os campos. A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    const ok = await cadastrar(nome, email, senha);
    if (!ok) {
      Alert.alert("Erro", "Este e-mail já está cadastrado");
      return;
    }

    Alert.alert("Cadastro enviado", "Aguarde a aprovação do professor para entrar.", [
      { text: "OK", onPress: () => router.replace("/") },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro do Aluno</Text>
      <Input label="Nome" value={nome} onChangeText={setNome} placeholder="Digite seu nome" />
      <Input label="Email" value={email} onChangeText={setEmail} placeholder="Digite seu email" />
      <Input
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        placeholder="Mínimo de 6 caracteres"
        secureTextEntry
      />
      <Botao titulo="Cadastrar" onPress={fazerCadastro} />
      <View style={{ marginTop: 12 }} />
      <Botao titulo="Voltar" onPress={() => router.replace("/")} />
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
