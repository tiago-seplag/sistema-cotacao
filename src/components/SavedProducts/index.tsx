import React, { useState } from "react";
import styled from "styled-components";
import { SearchResult } from "../../types";
import { groupProducts, calculateTotalBudget } from "../../utils/groupProducts";
import { exportToMarkdown } from "../../utils/exportToMarkdown";
import { toast } from "sonner";

const SavedProductsContainer = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Price = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

const Th = styled.th`
  background-color: ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.dark};
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const ActionButton = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ff0000;
  }
`;

const ExportButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-bottom: 20px;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const NoProducts = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.gray};
  margin-top: 40px;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
`;

interface SavedProductsProps {
  savedProducts: SearchResult[];
  onRemove: (id: string) => void;
}

export const SavedProducts: React.FC<SavedProductsProps> = ({
  savedProducts,
  onRemove,
}) => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Convert to SavedProduct with quantity from state or default
  const productsWithQuantity = savedProducts.map(p => {
    // Use the quantity from state for this product name, or default to 1
    const quantityKey = p.productName; // Use product name as key
    return {
      ...p,
      quantity: quantities[quantityKey] !== undefined ? quantities[quantityKey] : 1
    };
  });

  // Group products by name
  const groupedProducts = groupProducts(productsWithQuantity);
  const totalBudget = calculateTotalBudget(groupedProducts);

  const handleQuantityChange = (productName: string, newQuantity: number) => {
    setQuantities({
      ...quantities,
      [productName]: newQuantity > 0 ? newQuantity : 1
    });
  };

  const handleExport = () => {
    const markdown = exportToMarkdown(groupedProducts, {
      title: 'MAPA COMPARATIVO DE PREÇOS - COTAÇÃO AUTOMÁTICA',
      decree: 'Decreto nº 779, de 15 de março de 2024 - Estado de Mato Grosso',
      description: 'Cotação automática Produtos de Escritório',
    });

    // Create blob and download
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mapa-precos-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success('Mapa de preços exportado com sucesso!');
  };
  return (
    <SavedProductsContainer>
      <Title>Produtos Salvos para Licitação</Title>
      {savedProducts.length === 0 ? (
        <NoProducts>Nenhum produto salvo ainda.</NoProducts>
      ) : (
        <>
          <ButtonContainer>
            <ExportButton onClick={handleExport}>
              📥 Exportar Mapa de Preços
            </ExportButton>
          </ButtonContainer>

          <div style={{ marginBottom: '20px' }}>
            <strong>Valor Total Orçado:</strong>{' '}
            {totalBudget.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>

          <Table>
            <thead>
              <tr>
                <Th>Produto</Th>
                <Th>Preço Unitário (por Fonte)</Th>
                <Th>Preço Médio</Th>
                <Th>Quantidade</Th>
                <Th>Valor Total</Th>
                <Th>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {groupedProducts.map((product, index) => {
                return (
                  <tr key={`${product.productName}-${index}`}>
                    <Td>{product.productName}</Td>
                    <Td>
                      <Price>
                        {product.prices
                          .map(
                            (p) =>
                              `${p.source}: R$ ${p.price.toFixed(2)}`
                          )
                          .join(' | ')}
                      </Price>
                    </Td>
                    <Td>
                      <Price>
                        {product.averagePrice.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </Price>
                    </Td>
                    <Td>
                      <QuantityInput
                        type="number"
                        min="1"
                        value={quantities[product.productName] !== undefined ? quantities[product.productName] : 1}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value) || 1;
                          handleQuantityChange(product.productName, newQty);
                        }}
                      />
                    </Td>
                    <Td>
                      <Price>
                        {product.totalValue.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </Price>
                    </Td>
                    <Td>
                      <ActionButton onClick={() => {
                        savedProducts
                          .filter(p => p.productName === product.productName)
                          .forEach(p => onRemove(p.id));
                      }}>
                        Remover
                      </ActionButton>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </SavedProductsContainer>
  );
};
