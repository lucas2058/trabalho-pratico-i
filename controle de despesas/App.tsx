import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FormularioDespesa from './src/components/FormularioDespesa';
import ItemDespesa from './src/components/ItemDespesa';
import ResumoDespesas from './src/components/ResumoDespesas';
import { Despesa, DadosDespesa } from './src/types/Despesa';

export default function App() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [despesaEditando, setDespesaEditando] = useState<Despesa | null>(null);

  const total = useMemo(
    () => despesas.reduce((soma, despesa) => soma + despesa.valor, 0),
    [despesas],
  );

  function salvarDespesa(dados: DadosDespesa) {
    if (despesaEditando) {
      setDespesas((atuais) =>
        atuais.map((despesa) =>
          despesa.id === despesaEditando.id
            ? { ...despesa, ...dados }
            : despesa,
        ),
      );
      setDespesaEditando(null);
      Alert.alert('Despesa atualizada', 'As alterações foram salvas.');
      return;
    }

    const novaDespesa: Despesa = {
      id: `${Date.now()}-${Math.random()}`,
      ...dados,
    };
    setDespesas((atuais) => [novaDespesa, ...atuais]);
    Alert.alert('Despesa cadastrada', 'O registro foi adicionado à lista.');
  }

  function excluirDespesa(id: string) {
    Alert.alert('Excluir despesa', 'Deseja realmente excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setDespesas((atuais) => atuais.filter((despesa) => despesa.id !== id));
          if (despesaEditando?.id === id) setDespesaEditando(null);
        },
      },
    ]);
  }

  function cancelarEdicao() {
    setDespesaEditando(null);
  }

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#173D32" />
      <View style={styles.cabecalho}>
        <Text style={styles.marca}>MINHAS FINANÇAS</Text>
        <Text style={styles.titulo}>Controle de Despesas</Text>
        <Text style={styles.subtitulo}>Organize seus gastos em um só lugar.</Text>
      </View>

      <FlatList
        style={styles.lista}
        contentContainerStyle={styles.conteudo}
        data={despesas}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <ResumoDespesas total={total} quantidade={despesas.length} />
            <FormularioDespesa
              despesaInicial={despesaEditando}
              onSalvar={salvarDespesa}
              onCancelar={cancelarEdicao}
            />
            <Text style={styles.tituloLista}>Despesas cadastradas</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ItemDespesa
            despesa={item}
            onEditar={() => setDespesaEditando(item)}
            onExcluir={() => excluirDespesa(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.iconeVazio}>＋</Text>
            <Text style={styles.vazioTitulo}>Nenhuma despesa ainda</Text>
            <Text style={styles.vazioTexto}>
              Cadastre sua primeira despesa usando o formulário acima.
            </Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.rodape}>Aplicativo acadêmico • Dados mantidos em memória</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F4F7F5' },
  cabecalho: {
    backgroundColor: '#173D32',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 27,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  marca: { color: '#B9D8C8', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  titulo: { color: '#FFFFFF', fontSize: 27, fontWeight: '800', marginTop: 8 },
  subtitulo: { color: '#D8E7DF', fontSize: 14, marginTop: 6 },
  lista: { flex: 1 },
  conteudo: { padding: 18, paddingBottom: 24 },
  tituloLista: { color: '#1D342B', fontSize: 19, fontWeight: '800', marginTop: 25, marginBottom: 12 },
  vazio: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: '#E5ECE7',
  },
  iconeVazio: { fontSize: 32, color: '#2E7658', fontWeight: '400' },
  vazioTitulo: { color: '#233D31', fontSize: 16, fontWeight: '700', marginTop: 8 },
  vazioTexto: { color: '#77867D', fontSize: 13, textAlign: 'center', lineHeight: 19, marginTop: 5 },
  rodape: { textAlign: 'center', color: '#849188', fontSize: 11, paddingVertical: 10 },
});
