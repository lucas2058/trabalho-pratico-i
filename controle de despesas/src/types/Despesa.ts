export type CategoriaDespesa =
  | 'Alimentação'
  | 'Transporte'
  | 'Moradia'
  | 'Lazer'
  | 'Saúde'
  | 'Educação'
  | 'Outros';

export interface DadosDespesa {
  descricao: string;
  valor: number;
  categoria: CategoriaDespesa;
}

export interface Despesa extends DadosDespesa {
  id: string;
}

export const CATEGORIAS: CategoriaDespesa[] = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Outros',
];
