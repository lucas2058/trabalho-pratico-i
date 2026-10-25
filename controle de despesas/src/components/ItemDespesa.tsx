import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Despesa } from '../types/Despesa';

interface Props {
  despesa: Despesa;
  onEditar: () => void;
  onExcluir: () => void;
}

const simbolos: Record<string, string> = {
  Alimentação: '🍽️',
  Transporte: '🚌',
  Moradia: '🏠',
  Lazer: '🎟️',
  Saúde: '💊',
  Educação: '📚',
  Outros: '🧾',
};

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function ItemDespesa({ despesa, onEditar, onExcluir }: Props) {
  return (
    <View style={styles.cartao}>
      <View style={styles.icone}>
        <Text style={styles.emoji}>{simbolos[despesa.categoria] ?? '🧾'}</Text>
      </View>
      <View style={styles.informacoes}>
        <Text style={styles.descricao} numberOfLines={2}>{despesa.descricao}</Text>
        <Text style={styles.categoria}>{despesa.categoria}</Text>
        <View style={styles.acoes}>
          <TouchableOpacity onPress={onEditar} style={styles.botaoEditar} accessibilityRole="button">
            <Text style={styles.textoEditar}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onExcluir} style={styles.botaoExcluir} accessibilityRole="button">
            <Text style={styles.textoExcluir}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.valor}>{formatarMoeda(despesa.valor)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E6ECE8',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
  },
  icone: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#EEF5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 19 },
  informacoes: { flex: 1 },
  descricao: { color: '#263A2F', fontSize: 14, fontWeight: '800', paddingTop: 2 },
  categoria: { color: '#819087', fontSize: 12, marginTop: 4 },
  valor: { color: '#236344', fontSize: 13, fontWeight: '800', paddingTop: 3 },
  acoes: { flexDirection: 'row', gap: 14, marginTop: 9 },
  botaoEditar: { paddingVertical: 2, paddingRight: 4 },
  textoEditar: { color: '#28684A', fontSize: 12, fontWeight: '800' },
  botaoExcluir: { paddingVertical: 2 },
  textoExcluir: { color: '#B42318', fontSize: 12, fontWeight: '800' },
});
