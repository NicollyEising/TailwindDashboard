document.addEventListener("DOMContentLoaded", function () {
  const chartSelector = '#hs-single-area-chart';

  // Inicializa o gráfico com dados da tabela1 por padrão
  let chart;

  function extractDataFromTable(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll("tbody tr");
    const data = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      // Para cada tabela, adaptar a extração:
      // - tabela1: valores numéricos de colunas 1, 2, 3 (exemplo soma ou média)
      // - tabela2: usa Quantidade (coluna 2)
      // - tabela3: usa Vendas (coluna 2)
      // - tabela4: usa Horas Trabalhadas (coluna 2)

      switch (tableId) {
        case "tabela1":
          // Por exemplo, pegar os valores da Coluna 1 (índice 0)
          data.push(Number(cells[0].textContent.trim()));
          break;
        case "tabela2":
          data.push(Number(cells[1].textContent.trim())); // Quantidade
          break;
        case "tabela3":
          data.push(Number(cells[1].textContent.trim())); // Vendas
          break;
        case "tabela4":
          data.push(Number(cells[1].textContent.trim())); // Horas Trabalhadas
          break;
      }
    });

    return data;
  }

  function getCategoriesFromTable(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll("tbody tr");
    const categories = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      switch (tableId) {
        case "tabela1":
          categories.push(`Linha ${categories.length + 1}`); // ou outro identificador
          break;
        case "tabela2":
          categories.push(cells[0].textContent.trim()); // Produto
          break;
        case "tabela3":
          categories.push(cells[0].textContent.trim()); // Mês
          break;
        case "tabela4":
          categories.push(cells[0].textContent.trim()); // Funcionário
          break;
      }
    });

    return categories;
  }

  function buildChartWithData(tableId) {
    const seriesData = extractDataFromTable(tableId);
    const categories = getCategoriesFromTable(tableId);

    const options = {
      chart: {
        height: 300,
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      series: [{
        name: 'Dados',
        data: seriesData
      }],
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400
          }
        }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'straight', width: 2 },
      grid: { strokeDashArray: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.8
        }
      }
    };

    if (chart) {
      chart.updateOptions({
        series: [{ data: seriesData }],
        xaxis: { categories: categories }
      });
    } else {
      chart = new ApexCharts(document.querySelector(chartSelector), options);
      chart.render();
    }
  }

  // Inicializa o gráfico com a tabela1
  buildChartWithData('tabela1');

  // Menu de seleção
  const menuItems = document.querySelectorAll(".menu-item");
  const tabelas = document.querySelectorAll("table[id^='tabela']");

  // Exibe só a tabela selecionada
  function showTable(tableId) {
    tabelas.forEach(tabela => {
      tabela.style.display = tabela.id === tableId ? "table" : "none";
    });
    buildChartWithData(tableId);
  }

  menuItems.forEach(item => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      showTable(targetId);
    });
  });

});
