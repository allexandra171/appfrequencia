import { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../src/contexts/AuthContext";
import Botao from "../src/components/Botao";

export default function Professor() {
  const { usuario, sair } = useAuth();
  const router = useRouter();
  const [dadosQR, setDadosQR] = useState<string | null>(null);

  function gerarQRCode() {
    const dados = {
      professor: usuario?.nome,
      data: new Date().toISOString(),
      codigo: Math.random().toString(36).substring(2, 8).toUpperCase(),
    };
    setDadosQR(JSON.stringify(dados));
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>
        Área do Professor: {usuario?.nome}
      </Text>

      <Botao titulo="Gerar QR Code da aula" onPress={gerarQRCode} />

      {dadosQR && (
        <View style={{ alignItems: "center", marginVertical: 24 }}>
          <QRCode value={dadosQR} size={220} />
        </View>
      )}

      <View style={{ marginTop: 16 }}>
        <Botao titulo="Sair" onPress={() => { sair(); router.replace("/"); }} />
      </View>
    </View>
  );
}