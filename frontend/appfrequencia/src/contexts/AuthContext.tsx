import { createContext, useContext, useState, ReactNode } from "react";
import { Usuario } from "../types";

interface AuthContextData {
  usuario: Usuario | null;
  entrar: (email: string, senha: string) => Promise<boolean>;
  sair: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Dados de teste (depois virão da API)
const USUARIOS_TESTE: (Usuario & { senha: string })[] = [
  { id: "1", nome: "Admin", email: "admin@teste.com", senha: "123456", perfil: "admin", aprovado: true },
  { id: "2", nome: "Professor", email: "prof@teste.com", senha: "123456", perfil: "professor", aprovado: true },
  { id: "3", nome: "Aluno", email: "aluno@teste.com", senha: "123456", perfil: "aluno", aprovado: true },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  async function entrar(email: string, senha: string) {
    const encontrado = USUARIOS_TESTE.find(
      (u) => u.email === email.trim().toLowerCase() && u.senha === senha
    );
    if (!encontrado) return false;

    const { senha: _, ...semSenha } = encontrado;
    setUsuario(semSenha);
    return true;
  }

  function sair() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
