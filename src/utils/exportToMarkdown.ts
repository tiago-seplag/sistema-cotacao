import { GroupedProduct } from '../types';

interface ExportOptions {
  title?: string;
  decree?: string;
  description?: string;
  technicalReport?: string;
}

export const exportToMarkdown = (
  groupedProducts: GroupedProduct[],
  options: ExportOptions = {}
): string => {
  const {
    title = 'MAPA COMPARATIVO DE PREÇOS - COTAÇÃO AUTOMÁTICA',
    decree = 'Decreto nº 779, de 15 de março de 2024 - Estado de Mato Grosso',
    description = 'Cotação automática Produtos de Escritório',
    technicalReport = true,
  } = options;

  const totalBudget = groupedProducts.reduce(
    (sum, product) => sum + product.totalValue,
    0
  );

  let markdown = `# ${title}\n\n`;
  markdown += `${description}\n\n`;
  markdown += `${decree}\n\n`;
  markdown += `<br/><br/>Planilha Excessiva ou Inexequível\n\n`;

  // Create table header
  markdown += `| **Item** | **Quantidade solicitada** | `;
  
  // Get all unique sources
  const allSources = new Set<string>();
  groupedProducts.forEach((product) => {
    product.prices.forEach((p) => {
      allSources.add(p.source);
    });
  });
  
  Array.from(allSources)
    .sort()
    .forEach((source) => {
      markdown += `**${source}** | `;
    });

  markdown += `**Média** | **Valor Total** |\n`;

  // Create table separator
  markdown += `| --- | --- |`;
  Array.from(allSources).forEach(() => {
    markdown += ` --- |`;
  });
  markdown += ` --- | --- |\n`;

  // Add rows for each product
  groupedProducts.forEach((product) => {
    markdown += `| ${product.productName} | ${product.quantity} |`;

    // Add prices for each source
    Array.from(allSources)
      .sort()
      .forEach((source) => {
        const sourcePrice = product.prices.find((p) => p.source === source);
        if (sourcePrice) {
          markdown += ` R$ ${sourcePrice.price.toFixed(2)} |`;
        } else {
          markdown += ` - |`;
        }
      });

    markdown += ` R$ ${product.averagePrice.toFixed(2)} | R$ ${product.totalValue.toFixed(2)} |\n`;
  });

  // Add empty row
  markdown += `| | | | | | |\n`;

  // Add total row
  markdown += `| **Valor Total Aquisição** | | | | | | **R$ ${totalBudget.toFixed(2)}** |\n`;

  markdown += `\n<br/>Obs.: a plataforma pode ainda exibir, para cada fonte, se o valor está DE ACORDO, EXCESSIVO ou INEXEQUÍVEL em relação à média unitária, conforme critérios técnicos definidos internamente.\n`;

  if (technicalReport) {
    markdown += `\n<br/><br/><br/>`;
    markdown += `**RELATÓRIO TÉCNICO COTAÇÃO DE PREÇOS**\n\n`;
    markdown += `**1. Identificação:** Pesquisa de preços realizada para aquisição de materiais, utilizando as fontes `;
    markdown += Array.from(allSources)
      .sort()
      .join(', ');
    markdown += `, em conformidade com o Decreto nº 779, de 15 de março de 2024, que disciplina a pesquisa de preços no âmbito da Administração Pública do Estado de Mato Grosso.\n\n`;

    markdown += `**2. Metodologia:** A pesquisa foi conduzida por meio da plataforma MT Business Hub, que coletou automaticamente os valores unitários das bases públicas, estruturando-os em mapa comparativo de preços. A ferramenta também calculou as médias por item e o valor total estimado da compra, permitindo ao servidor responsável selecionar o valor aplicado de acordo com a análise técnica e os princípios de economicidade e razoabilidade.\n\n`;

    markdown += `**3. Análise Técnica:** Foram avaliadas a consistência e a variação dos preços entre as fontes consultadas. O valor de referência foi estabelecido com base na média aritmética simples dos preços coletados, refletindo a realidade do mercado e representando uma opção economicamente vantajosa, sem prejuízo à qualidade dos bens a serem adquiridos.\n\n`;

    markdown += `**4. Conclusão:** Diante do exposto, define-se como **valor final aplicado da cotação** o montante de **R$ ${totalBudget.toFixed(2)}** (${convertNumberToWords(totalBudget)}), com base na pesquisa realizada. A presente pesquisa atende integralmente às exigências do Decreto nº 779/2024 e poderá ser utilizada para instruir o processo de contratação, observando-se os princípios da legalidade, eficiência, economicidade e transparência.\n\n`;

    markdown += `Gerado automaticamente pela plataforma **MT Business Hub**.\n`;
  }

  return markdown;
};

// Helper function to convert numbers to words in Portuguese
function convertNumberToWords(num: number): string {
  const units = [
    'zero',
    'um',
    'dois',
    'três',
    'quatro',
    'cinco',
    'seis',
    'sete',
    'oito',
    'nove',
  ];
  const tens = [
    '',
    '',
    'vinte',
    'trinta',
    'quarenta',
    'cinquenta',
    'sessenta',
    'setenta',
    'oitenta',
    'noventa',
  ];
  const scales = [
    '',
    'mil',
    'milhão',
    'bilhão',
    'trilhão',
  ];

  if (num === 0) return 'zero';

  const parts: string[] = [];
  let scale = 0;

  while (num > 0 && scale < scales.length) {
    const part = num % 1000;

    if (part !== 0) {
      let partWords = '';

      const hundreds = Math.floor(part / 100);
      if (hundreds > 0) {
        const hundredNames = [
          '',
          'cento',
          'duzentos',
          'trezentos',
          'quatrocentos',
          'quinhentos',
          'seiscentos',
          'setecentos',
          'oitocentos',
          'novecentos',
        ];
        partWords = hundredNames[hundreds];
      }

      const remainder = part % 100;
      if (remainder > 0) {
        if (partWords) partWords += ' e ';

        if (remainder < 10) {
          partWords += units[remainder];
        } else if (remainder < 20) {
          const teenNames = [
            'dez',
            'onze',
            'doze',
            'treze',
            'quatorze',
            'quinze',
            'dezesseis',
            'dezessete',
            'dezoito',
            'dezenove',
          ];
          partWords += teenNames[remainder - 10];
        } else {
          const ten = Math.floor(remainder / 10);
          const unit = remainder % 10;

          partWords += tens[ten];
          if (unit > 0) {
            partWords += ' e ' + units[unit];
          }
        }
      }

      if (scales[scale]) {
        partWords += ' ' + scales[scale];
      }

      parts.unshift(partWords);
    }

    num = Math.floor(num / 1000);
    scale++;
  }

  return parts.join(' e ').trim();
}
