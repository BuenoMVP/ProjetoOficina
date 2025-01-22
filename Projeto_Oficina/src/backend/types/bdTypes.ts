interface informacoesProps {
    titulo: string;
    conteudo: string;
}

interface usuariosProps {
    nome: string;
    email: string;
    senha: string;
    admin: boolean;
}

interface integrantesProps {
    nome: string;
    dataNascimento: string;
    grupoID: number;
    escola: string;
    email: string;
    telefone: string;
}

interface gruposProps {
    nome: string;
    senioridade: string;
    integrantes: integrantesProps[];
}

interface statusProps {
    status: string;
}

interface encontrosProps {
    data: string;
    hora: string;
    local: string;
    grupoID: number;
    observacoes: string;
    tema: string;
    concluido: boolean;
}

export type { informacoesProps, usuariosProps, integrantesProps, gruposProps, statusProps, encontrosProps };