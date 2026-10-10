import {useState, useEffect} from "react";
import { Text, View,StyleSheet,Alert } from "react-native";
import Botao from "../src/components/Botao";
import Input from "../src/components/Input";
import { colors, spacing, fontSizes } from "../src/theme"; 
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const {entrar, usuario} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!usuario) return;
    const rotas = {admin: "/admin", professor: "/professor", aluno: "/aluno"} as const;
    router.replace(rotas[usuario.perfil]);
  }, [usuario, router]);

  async function fazerLogin() {
   const resultado = await entrar(email, senha);
   if (resultado === "invalido") {
    Alert.alert("Erro", "E-mail ou senha inválidos");
   }else if (resultado === "pendente") {
    Alert.alert("Aguarde", "Seu cadastro ainda não foi aprovado pelo professor");
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
