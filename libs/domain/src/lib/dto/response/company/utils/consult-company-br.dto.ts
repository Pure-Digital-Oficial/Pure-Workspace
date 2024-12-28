interface PrincipalActive {
  code: string;
  text: string;
}

export interface ConsultCompanyBrDto {
  cnpj: string;
  nome: string;
  fantasia: string;
  atividade_principal: PrincipalActive[];
  data_situacao: string;
  tipo: string;
  status: string;
  uf: string;
  telefone: string;
  email: string;
  abertura: string;
  situacao: string;
  natureza_juridica: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  motivo_situacao: string;
  porte: string;
  municipio: string;
  bairro: string;
}
