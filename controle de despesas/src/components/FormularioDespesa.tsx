import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CATEGORIAS, CategoriaDespesa, DadosDespesa, Despesa } from '../types/Despesa';

interface Props {
  despesaInicial: Despesa | null;
  onSalvar: (dados: DadosDespesa) => void;
  onCancelar: () => void;
}

export default function FormularioDespesa({
  despesaInicial,
  onSalvar,
  onCancelar,
}: Props) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState<CategoriaDespesa>('Alimentação');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (despesaInicial) {
      setDescricao(despesaInicial.descricao);
      setValor(despesaInicial.valor.toFixed(2).replace('.', ','));
      setCategoria(despesaInicial.categoria);
      setErro('');
    } else {
      limparCampos();
    }
  }, [despesaInicial]);

  function limparCampos() {
    setDescricao('');
    setValor('');
    setCategoria('Alimentação');
    setErro('');
  }

  function enviar() {
    const descricaoLimpa = descricao.trim();
    const textoValor = valor.trim();
    const valorNumerico = Number(
      textoValor.includes(',')
        ? textoValor.replace(/\./g, '').replace(',', '.')
        : textoValor,
    );

    if (!descricaoLimpa || !valor.trim()) {
      setErro('Preencha a descrição e o valor da despesa.');
      return;
    }

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      setErro('Informe um valor numérico maior que zero. Ex.: 25,90');
      return;
    }

    onSalvar({
      descricao: descricaoLimpa,
      valor: valorNumerico,
      categoria,
    });
    limparCampos();
  }

  return (
    <View style={styles.cartao}>
      <Text style={styles.titulo}>
        {despesaInicial ? 'Editar despesa' : 'Adicionar despesa'}
      </Text>
      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.campo}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex.: Compra no mercado"
        placeholderTextColor="#9AA69F"
        maxLength={70}
        accessibilityLabel="Descrição da despesa"
      />

      <Text style={styles.rotulo}>Valor (R$)</Text>
      <TextInput
        style={styles.campo}
        value={valor}
        onChangeText={setValor}
        placeholder="Ex.: 45,90"
        placeholderTextColor="#9AA69F"
        keyboardType="decimal-pad"
        accessibilityLabel="Valor da despesa"
      />

      <Text style={styles.rotulo}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((item) => {
          const selecionada = categoria === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.opcao, selecionada && styles.opcaoSelecionada]}
              onPress={() => setCategoria(item)}
              accessibilityRole="button"
              accessibilityState={{ selected: selecionada }}
            >
              <Text style={[styles.textoOpcao, selecionada && styles.textoOpcaoSelecionada]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {!!erro && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.botaoPrincipal} onPress={enviar} accessibilityRole="button">
        <Text style={styles.textoBotao}>
          {despesaInicial ? 'Salvar alterações' : '+ Cadastrar despesa'}
        </Text>
      </TouchableOpacity>

      {!!despesaInicial && (
        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancelar}>
          <Text style={styles.textoCancelar}>Cancelar edição</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: '#E6ECE8',
  },
  titulo: { color: '#1D342B', fontSize: 18, fontWeight: '800', marginBottom: 16 },
  rotulo: { color: '#40554A', fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 4 },
  campo: {
    backgroundColor: '#F7F9F7',
    borderWidth: 1,
    borderColor: '#E0E8E2',
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: '#21382C',
    fontSize: 14,
    marginBottom: 12,
  },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 13 },
  opcao: {
    borderWidth: 1,
    borderColor: '#DDE6DF',
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
  },
  opcaoSelecionada: { backgroundColor: '#E1F0E7', borderColor: '#4C8A69' },
  textoOpcao: { color: '#58675E', fontSize: 12 },
  textoOpcaoSelecionada: { color: '#245B3C', fontWeight: '800' },
  erro: { color: '#B42318', fontSize: 12, marginBottom: 10 },
  botaoPrincipal: {
    backgroundColor: '#236344',
    borderRadius: 11,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 3,
  },
  textoBotao: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  botaoCancelar: { alignItems: 'center', paddingTop: 12 },
  textoCancelar: { color: '#64746A', fontSize: 13, fontWeight: '700' },
});
