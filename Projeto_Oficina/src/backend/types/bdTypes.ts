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
    grupoID: gruposProps;
    escola: string;
    email: string;
    telefone: string;
}

interface gruposProps {
    nome: string;
    senioridade: string;
    integrantes: integrantesProps[];
    status: statusProps;
}

interface statusProps {
    status: string;
    position: number;
}

interface encontrosProps {
    data: string;
    hora: string;
    local: string;
    grupoID: gruposProps;
    observacoes: string;
    tema: string;
    usuarios: usuariosProps[];
    concluido: boolean;
}

export type { informacoesProps, usuariosProps, integrantesProps, gruposProps, statusProps, encontrosProps };