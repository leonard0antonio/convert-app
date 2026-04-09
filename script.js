// 1. Mapeamento de DOM Elements
const form = document.getElementById('convert-form');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const resultSection = document.getElementById('result-section');
const exchangeRateText = document.getElementById('exchange-rate');
const finalResultText = document.getElementById('final-result');

// 2. Taxas de Câmbio Fixas (Simulação de um "Backend")
// Valores de exemplo. Em uma aplicação real, você faria um 'fetch' em uma API (ex: AwesomeAPI).
const exchangeRates = {
    "USD": { rate: 4.86, symbol: "US$" },
    "EUR": { rate: 5.30, symbol: "€" },
    "GBP": { rate: 6.10, symbol: "£" }
};

// 3. Função Auxiliar para formatar moeda
// Utiliza a API nativa do navegador para formatar números no padrão brasileiro
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// 4. Lógica de submissão do formulário
form.addEventListener('submit', function(event) {
    // Impede a página de recarregar
    event.preventDefault();

    // Captura os valores inseridos pelo usuário
    const amount = Number(amountInput.value);
    const currency = currencySelect.value;

    // Busca os dados da moeda selecionada no nosso objeto
    const currencyData = exchangeRates[currency];

    if (currencyData) {
        // Realiza o cálculo matemático
        const total = amount * currencyData.rate;

        // Atualiza os textos na interface (UI)
        exchangeRateText.textContent = `${currencyData.symbol} 1 = R$ ${formatCurrencyBRL(currencyData.rate)}`;
        finalResultText.textContent = `${formatCurrencyBRL(total)} Reais`;

        // Remove a classe 'hidden' para exibir a área de resultado
        resultSection.classList.remove('hidden');
    }
});

// 5. Opcional: Esconder o resultado se o usuário alterar o input
// Isso melhora a experiência, não deixando um resultado antigo na tela
amountInput.addEventListener('input', () => {
    resultSection.classList.add('hidden');
});
currencySelect.addEventListener('change', () => {
    resultSection.classList.add('hidden');
});