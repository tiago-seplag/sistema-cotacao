import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { GlobalStyle } from "./styles/globalStyles";
import { theme } from "./styles/theme";
import { Header } from "./components/Header";
import { SearchSection } from "./components/SearchSection";
import { SourcesSection } from "./components/SourcesSection";
import { ResultsSection } from "./components/ResultsSection";
import { SavedProducts } from "./components/SavedProducts";
import { FilterOption, Source, SearchResult, User } from "./types";
import { mockResults } from "./data/mockData";

const initialUser: User = {
  name: "Servidor Público",
  initials: "SP",
  role: "Servidor Público",
};

const initialFilters: FilterOption[] = [
  { id: "1", label: "Produto", active: true },
  { id: "2", label: "Localização", active: false },
  { id: "3", label: "Fornecedor", active: false },
];

const initialSources: Source[] = [
  {
    id: "1",
    name: "PNCP",
    type: "public",
    selected: false,
  },
  {
    id: "2",
    name: "Radar TCE",
    type: "public",
    selected: false,
  },
  {
    id: "3",
    name: "Nota MT",
    type: "public",
    selected: false,
  },
  {
    id: "4",
    name: "E-commerce",
    type: "public",
    selected: false,
  },
];

const initialResults: SearchResult[] = mockResults;

function App() {
  const [user] = useState<User>(initialUser);
  const [filters, setFilters] = useState<FilterOption[]>(initialFilters);
  const [sources, setSources] = useState<Source[]>(initialSources);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("1"); // Default to 'Produto'
  const [results] = useState<SearchResult[]>(initialResults);
  const [savedProducts, setSavedProducts] = useState<SearchResult[]>([]);

  // Filter results based on search query and active filter
  const filteredResults = React.useMemo(() => {
    // First check if any sources are selected
    const selectedSources = sources.filter((source) => source.selected);

    // If no sources are selected, start with all results
    // Otherwise, filter by selected sources
    let filtered =
      selectedSources.length === 0
        ? results
        : results.filter((result) => {
            const selectedSourceNames = selectedSources.map(
              (source) => source.name
            );
            return selectedSourceNames.includes(result.source);
          });

    // If there's no search query, return results filtered only by sources
    if (!searchQuery) return filtered;

    // Then apply search query filter
    const query = searchQuery.toLowerCase();
    const activeFilterType = filters
      .find((f) => f.id === activeFilter)
      ?.label.toLowerCase();

    return filtered.filter((result) => {
      switch (activeFilterType) {
        case "produto":
          return result.productName.toLowerCase().includes(query);
        case "localização":
          return result.source.toLowerCase().includes(query);
        case "fornecedor":
          return result.supplier.toLowerCase().includes(query);
        default:
          return (
            result.productName.toLowerCase().includes(query) ||
            result.supplier.toLowerCase().includes(query) ||
            result.source.toLowerCase().includes(query)
          );
      }
    });
  }, [searchQuery, activeFilter, results, sources, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setFilters(
      filters.map((filter) => ({
        ...filter,
        active: filter.id === filterId,
      }))
    );
  };

  const handleSourceSelect = (sourceId: string) => {
    setSources(
      sources.map((source) => ({
        ...source,
        selected: source.id === sourceId ? !source.selected : source.selected,
      }))
    );
  };

  const handleExport = () => {
    console.log("Exporting results...");
    // Implement export logic here
  };

  const handleAdd = (resultId: string) => {
    const productToAdd = results.find(result => result.id === resultId);
    if (productToAdd && !savedProducts.some(p => p.id === resultId)) {
      setSavedProducts([...savedProducts, productToAdd]);
      toast.success('Produto adicionado à sua lista de licitação!', {
        description: productToAdd.productName
      });
    }
  };

  const handleDetails = (resultId: string) => {
    console.log("Showing details for:", resultId);
    // Implement details logic here
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" expand={true} richColors />
        <GlobalStyle />
        <Header user={user} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <nav style={{ 
            marginBottom: "20px", 
            padding: "10px 0",
            borderBottom: `1px solid ${theme.colors.border}`
          }}>
            <Link 
              to="/"
              style={{ 
                marginRight: "20px",
                color: theme.colors.primary,
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Buscar Produtos
            </Link>
            <Link 
              to="/saved"
              style={{ 
                color: theme.colors.primary,
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Produtos Salvos ({savedProducts.length})
            </Link>
          </nav>

          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <SearchSection
                    filters={filters}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                  <SourcesSection sources={sources} onSourceSelect={handleSourceSelect} />
                  <ResultsSection
                    results={filteredResults}
                    savedProducts={savedProducts}
                    onExport={handleExport}
                    onAdd={handleAdd}
                    onDetails={handleDetails}
                  />
                </>
              } 
            />
            <Route 
              path="/saved" 
              element={
                <SavedProducts 
                  savedProducts={savedProducts} 
                  onRemove={(id) => {
                    setSavedProducts(savedProducts.filter(p => p.id !== id));
                  }}
                />
              } 
            />
          </Routes>

          <footer
            style={{
              textAlign: "center",
              marginTop: "30px",
              color: theme.colors.gray,
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            Sistema de Cotações Públicas - Desenvolvido para otimizar processos de
            compras governamentais
          </footer>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
