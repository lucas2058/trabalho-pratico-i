import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  total: number;
  quantidade: number;
}

export default function ResumoDespesas({ total, quantidade }: Props) {
  const totalFormatado = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <View style={styles.cartao}>
      <Text style={styles.rotulo}>TOTAL DE DESPESAS</Text>
      <Text style={styles.total}>{totalFormatado}</Text>
      <View style={styles.divisor} />
      <Text style={styles.quantidade}>
        {quantidade} {quantidade === 1 ? 'despesa cadastrada' : 'despesas cadastradas'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: '#DDEFE4',
    borderRadius: 18,
    padding: 19,
    marginBottom: 18,
  },
  rotulo: { color: '#48765C', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  total: { color: '#173D32', fontSize: 30, fontWeight: '900', marginTop: 7 },
  divisor: { height: 1, backgroundColor: '#C5DFCF', marginVertical: 13 },
  quantidade: { color: '#48765C', fontSize: 13, fontWeight: '600' },
});
