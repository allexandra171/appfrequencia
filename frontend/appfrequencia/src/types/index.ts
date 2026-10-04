//Os 3 perfis do sistema (RF009)
export type Perfil = "admin"| "professor" | "aluno";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  aprovado: boolean; //professor valida o aluno (RF004)
}

export interface Disciplina {
    id: string;
    nome: string;
    professorId: string; //quem criou (RF007)
}

export interface Aula {
    id: string;
    disciplinaId: string;
    data: string; //data da aula (RF013)
    horario: string; //horário da aula (RF013)
}

export interface Frequencia {
    id: string;
    aulaId: string;
    alunoId: string;
    tipo: "qrcode" | "manual"; //manual = professor deu (RF006)
    registradaEm: string; //data/hora em formato ISO 
}

export interface QRCodeAula {
    id: string;
    aulaId: string;
    codigo: string; //Unico por aula (RNF003)
    criadoEm: string; //data/hora em formato ISO (RNF003)
    expiraEm: string; //criadoEm + 5 minutos (RF001)
}
