import styled from 'styled-components';
import { FilterOption } from '../../types';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
`;

const SearchBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 16px;
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  font-weight: 500;
`;

const FilterOptions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.light};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.dark};
  border: 1px solid ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 8px ${({ theme }) => theme.spacing.md};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

interface SearchSectionProps {
  filters: FilterOption[];
  onSearch: (query: string) => void;
  onFilterChange: (filterId: string) => void;
}

export const SearchSection = ({
  filters,
  onSearch,
  onFilterChange,
}: SearchSectionProps) => {
  return (
    <Section>
      <Title>Pesquisa de Preços para Cotações</Title>
      <SearchBox>
        <SearchInput
          type="text"
          placeholder="Digite o nome do produto ou serviço..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <SearchButton>Pesquisar</SearchButton>
      </SearchBox>
      <FilterOptions>
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            active={filter.active}
            onClick={() => onFilterChange(filter.id)}
          >
            <span>{filter.label}</span>
          </FilterButton>
        ))}
      </FilterOptions>
    </Section>
  );
};