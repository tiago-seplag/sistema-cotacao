import styled from "styled-components";
import { SearchResult } from "../../types";
import { useState } from "react";

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.dark};
`;

const ResultCount = styled.div`
  color: ${({ theme }) => theme.colors.gray};
`;

const ExportButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 8px ${({ theme }) => theme.spacing.md};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
`;

const Td = styled.td`
  padding: 12px ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Price = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const SourceBadge = styled.span`
  font-size: 12px;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background-color: ${({ theme }) => theme.colors.light};
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  background: ${({ theme, primary }) =>
    primary ? theme.colors.primary : "none"};
  color: ${({ theme, primary }) =>
    primary ? theme.colors.white : theme.colors.dark};
  border: 1px solid
    ${({ theme, primary }) =>
      primary ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 5px ${({ theme }) => theme.spacing.sm};
  font-size: 12px;
  margin-right: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
`;

interface ResultsSectionProps {
  results: SearchResult[];
  savedProducts: SearchResult[];
  onExport: () => void;
  onAdd: (resultId: string, quantity: number) => void;
  onDetails: (resultId: string) => void;
}

export const ResultsSection = ({
  results,
  savedProducts,
  onExport,
  onAdd,
  onDetails,
}: ResultsSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const PaginationButton = styled.button<{ active?: boolean }>`
    padding: 8px 12px;
    margin: 0 4px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    background-color: ${({ theme, active }) =>
      active ? theme.colors.primary : "white"};
    color: ${({ theme, active }) => (active ? "white" : theme.colors.dark)};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme, active }) =>
        active ? theme.colors.primary : theme.colors.light};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 4px;
  `;

  const PageInfo = styled.span`
    margin: 0 10px;
    color: ${({ theme }) => theme.colors.gray};
  `;

  return (
    <Section>
      <Header>
        <Title>Resultados da Pesquisa</Title>
        <ResultCount>{results.length} itens encontrados</ResultCount>
        <ExportButton onClick={onExport}>
          <span>Exportar Mapa de Preços</span>
        </ExportButton>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Produto/Serviço</Th>
            <Th>Fornecedor</Th>
            <Th>Preço</Th>
            <Th>Fonte</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedResults.map((result) => {
            const isAdded = savedProducts.some((p) => p.id === result.id);
            return (
              <tr key={result.id}>
                <Td style={{ opacity: isAdded ? 0.5 : 1 }}>{result.productName}</Td>
                <Td style={{ opacity: isAdded ? 0.5 : 1 }}>{result.supplier}</Td>
                <Td style={{ opacity: isAdded ? 0.5 : 1 }}>
                  <Price>
                    {result.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Price>
                </Td>
                <Td style={{ opacity: isAdded ? 0.5 : 1 }}>
                  <SourceBadge>{result.source}</SourceBadge>
                </Td>
                <Td>
                  {isAdded ? (
                    <ActionButton
                      disabled
                      style={{
                        backgroundColor: "#6c757d",
                        color: "white",
                        cursor: "not-allowed",
                        opacity: 0.6,
                      }}
                    >
                      ✓ Adicionado
                    </ActionButton>
                  ) : (
                    <ActionButton primary onClick={() => onAdd(result.id, 1)}>
                      Adicionar
                    </ActionButton>
                  )}
                  <ActionButton onClick={() => onDetails(result.id)}>
                    Detalhes
                  </ActionButton>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </PaginationButton>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <PaginationButton
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationButton>
            )
          )}

          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </PaginationButton>

          <PageInfo>
            Página {currentPage} de {totalPages}
          </PageInfo>
        </PaginationContainer>
      )}
    </Section>
  );
};
