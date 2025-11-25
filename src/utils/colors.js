export const CATEGORY_COLORS = {
    'Alimentação': '#FF9F1C',   // Orange
    'Saúde': '#FF4040',         // Red
    'Transporte': '#2EC4B6',    // Teal
    'Lazer': '#A06CD5',         // Purple
    'Moradia': '#20A4F3',       // Blue
    'Investimentos': '#FFD700', // Gold
    'Salário': '#00FF94',       // Neon Green
    'Aluguel': '#FF6B6B',       // Soft Red
    'Água': '#4CC9F0',          // Light Blue
    'Luz': '#F72585',           // Pink
    'Internet': '#4361EE',      // Blue
    'Outros': '#8D99AE'         // Grey
};

export const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS['Outros'];
};
