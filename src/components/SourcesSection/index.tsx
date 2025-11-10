import styled from 'styled-components';
import { Source } from '../../types';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md}; // Reduced padding
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  font-size: 16px; // Smaller font size
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // Reduced margin
  color: ${({ theme }) => theme.colors.dark};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); // Smaller minimum width
  gap: ${({ theme }) => theme.spacing.sm}; // Reduced gap
`;

const Card = styled.div<{ selected: boolean }>`
  border: 1px solid ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ theme, selected }) =>
    selected ? 'rgba(26, 115, 232, 0.05)' : theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.small};
    transform: translateY(-1px);
  }
`;

const RadioButton = styled.div<{ selected: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.gray};
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.sm};
  position: relative;
  flex-shrink: 0;
  
  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(${({ selected }) => (selected ? 1 : 0)});
    transition: transform 0.2s ease;
  }
`;

const SourceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SourceName = styled.div`
  font-weight: 500;
  font-size: 14px; // Smaller font size
`;

const SourceDescription = styled.div`
  font-size: 12px; // Smaller font size
  color: ${({ theme }) => theme.colors.gray};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const SourceType = styled.div<{ type: 'public' | 'paid' }>`
  font-size: 11px; // Smaller font size
  display: inline-block;
  padding: 2px 6px; // Reduced padding
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme, type }) =>
    type === 'public' ? '#e6f4ea' : '#fce8e6'};
  color: ${({ type }) => (type === 'public' ? '#34a853' : '#d93025')};
  white-space: nowrap;
`;

interface SourcesSectionProps {
  sources: Source[];
  onSourceSelect: (sourceId: string) => void;
}

export const SourcesSection = ({
  sources,
  onSourceSelect,
}: SourcesSectionProps) => {
  return (
    <Section>
      <Title>Fontes de Pesquisa</Title>
      <Grid>
        {sources.map((source) => (
          <Card
            key={source.id}
            selected={source.selected}
            onClick={() => onSourceSelect(source.id)}
          >
            <SourceInfo>
              <RadioButton selected={source.selected} />
              <div>
                <SourceName>{source.name}</SourceName>
                {source.description && (
                  <SourceDescription>({source.description})</SourceDescription>
                )}
              </div>
            </SourceInfo>
            <SourceType type={source.type}>
              {source.type === 'public' ? 'Público' : 'Pago'}
            </SourceType>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};