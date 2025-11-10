import React from "react";
import styled from "styled-components";
import { SearchResult } from "../../types";

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

const Title = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const NoProducts = styled.p`
  text-align: center;
  color: ${(props) => props.theme.colors.gray};
  margin-top: 40px;
`;

interface SavedProductsProps {
  savedProducts: SearchResult[];
  onRemove: (id: string) => void;
}

export const SavedProducts: React.FC<SavedProductsProps> = ({
  savedProducts,
  onRemove,
}) => {
  return (
    <SavedProductsContainer>
      <Title>Produtos Salvos para Licitação</Title>
      {savedProducts.length === 0 ? (
        <NoProducts>Nenhum produto salvo ainda.</NoProducts>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Produto</Th>
              <Th>Fornecedor</Th>
              <Th>Preço</Th>
              <Th>Fonte</Th>
              <Th>Data</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {savedProducts.map((product) => (
              <tr key={product.id}>
                <Td>{product.productName}</Td>
                <Td>{product.supplier}</Td>
                <Td>
                  <Price>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Price>
                </Td>
                <Td>{product.source}</Td>
                <Td>{new Date().toLocaleDateString()}</Td>
                <Td>
                  <ActionButton onClick={() => onRemove(product.id)}>
                    Remover
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </SavedProductsContainer>
  );
};
