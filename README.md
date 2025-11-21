# 🏛️ Sistema de Automação de Cotação de Preços

> Sistema inteligente para automação de pesquisa e comparação de preços para processos de licitação e compras governamentais.

## 🎯 Visão Geral

Este projeto é um **sistema web de cotação automática** que permite:

✨ **Buscar produtos** em múltiplas fontes governamentais  
📊 **Comparar preços** entre diferentes fornecedores  
📈 **Agrupar produtos** do mesmo tipo automaticamente  
💰 **Calcular médias** e valores totais  
📥 **Exportar em Markdown** com relatório técnico

## 🚀 Quick Start

### Instalação

```bash
# Clone o repositório
git clone https://github.com/tiago-seplag/sistema-cotacao.git

# Entre no diretório
cd sistema-cotacao

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm start
```

Abre [http://localhost:3000](http://localhost:3000) no navegador.

## 📋 Funcionalidades Principais

### 1. 🔍 **Pesquisa e Filtro**
- Busque por nome do produto, fornecedor ou localização
- Selecione múltiplas fontes (PNCP, Radar TCE, Nota MT, E-commerce)
- Filtre resultados em tempo real

### 2. 📦 **Seleção com Quantidade**
- Defina quantidade para cada produto
- Adicione à lista de cotação
- O sistema agrupa automaticamente produtos duplicados

### 3. 📊 **Agrupamento Inteligente**
- Agrupa produtos do mesmo tipo
- Calcula **preço médio** entre fontes
- Calcula **valor total** (média × quantidade)

### 4. 💾 **Exportação para Mapa de Preços**
- Exporta em formato Markdown
- Inclui tabela comparativa
- Adiciona relatório técnico automático
- Segue padrões de Decreto MT

## 📖 Documentação

- 📘 **[GUIA_FUNCIONALIDADES.md](./GUIA_FUNCIONALIDADES.md)** - Guia completo de uso
- 📋 **[RESUMO_IMPLEMENTACOES.md](./RESUMO_IMPLEMENTACOES.md)** - Resumo técnico das mudanças

## 🏗️ Arquitetura

```
src/
├── components/
│   ├── Header/              # Cabeçalho com usuário
│   ├── SearchSection/       # Busca e filtros
│   ├── SourcesSection/      # Seleção de fontes
│   ├── ResultsSection/      # Resultados com quantidade
│   └── SavedProducts/       # Agrupamento e exportação
├── utils/
│   ├── groupProducts.ts     # Lógica de agrupamento
│   └── exportToMarkdown.ts  # Geração de Markdown
├── types/
│   └── index.ts             # Tipos TypeScript
├── data/
│   └── mockData.ts          # Dados de exemplo
└── styles/
    ├── globalStyles.ts
    ├── theme.ts
    └── styled.d.ts
```

## 🔄 Fluxo de Uso

```
1. Buscar Produtos → 2. Selecionar Quantidade → 3. Adicionar à Lista
                                                         ↓
                    5. Exportar Mapa ← 4. Revisar Agrupamento
```

## 📊 Exemplo de Saída

```markdown
# MAPA COMPARATIVO DE PREÇOS - COTAÇÃO AUTOMÁTICA

| Item | Quantidade | PNCP | Nota MT | Radar TCE | Média | Valor Total |
|------|-----------|------|---------|-----------|-------|------------|
| Papel A4 75g | 10 | R$ 19,50 | R$ 18,90 | R$ 20,10 | R$ 19,50 | R$ 195,00 |

| **Valor Total Aquisição** | | | | | | **R$ 195,00** |
```

## 🛠️ Scripts Disponíveis

### `npm start`

Executa em modo desenvolvimento.

### `npm test`

Executa testes unitários.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
