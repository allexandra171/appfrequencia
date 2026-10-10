import { createContext, useContext, useState, ReactNode } from "react";
import { Usuario } from "../types";

type UsuarioComSenha = Usuario & { senha: string };
type ResultadoLogin = "ok" | "invalido" | "pendente";

interface AuthContextData {
  usuario: Usuario | null;
  entrar: (email: string, senha: string) => Promise<ResultadoLogin>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
  sair: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Dados de teste (depois virão da API)
const USUARIOS_TESTE: UsuarioComSenha[] = [
  { id: "1", nome: "Admin", email: "admin@teste.com", senha: "123456", perfil: "admin", aprovado: true },
  { id: "2", nome: "Professor", email: "prof@teste.com", senha: "123456", perfil: "professor", aprovado: true },
  { id: "3", nome: "Aluno", email: "aluno@teste.com", senha: "123456", perfil: "aluno", aprovado: true },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<UsuarioComSenha[]>(USUARIOS_TESTE);

  async function entrar(email: string, senha: string): Promise<ResultadoLogin> {
    const encontrado = usuarios.find(
      (u) => u.email === email.trim().toLowerCase() && u.senha === senha
    );
    if (!encontrado) return "invalido";
    if (!encontrado.aprovado) return "pendente"; // RF004

    const { senha: _, ...semSenha } = encontrado;
    setUsuario(semSenha);
    return "ok";
  }

  // RF003: o aluno se cadastra sozinho e fica aguardando aprovação
  async function cadastrar(nome: string, email: string, senha: string) {
    const emailLimpo = email.trim().toLowerCase();
    if (usuarios.some((u) => u.email === emailLimpo)) return false;

    const novo: UsuarioComSenha = {
      id: Date.now().toString(),
      nome: nome.trim(),
      email: emailLimpo,
      senha,
      perfil: "aluno",
      aprovado: false,
    };
    setUsuarios([...usuarios, novo]);
    return true;
  }

  function sair() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, cadastrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
