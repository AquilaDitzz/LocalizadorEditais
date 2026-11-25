# SPEC.md — Radar de Editais (Agricultura Familiar)

## 1. Visão Geral e Arquitetura
Aplicação web estática independente (**HTML, CSS e JavaScript puros**, sem frameworks, sem backend e sem APIs externas) para ajudar pequenos produtores rurais a encontrar Chamadas Públicas (PNAE, PAA e compras institucionais) compatíveis com sua produção e acompanhar prazos e documentos.

- **Arquivos a criar:**
  - `index.html` — Página principal completa da aplicação.
  - `style.css` — Estilos responsivos (mobile-first).
  - `app.js` — Lógica de filtros, cálculo de prazos, match de produtos e persistência.
  - `editais.json` — Base local de editais de exemplo (carregada via `fetch('./editais.json')`, com fallback embutido no `app.js` caso o usuário abra o `index.html` direto via `file://`).
  - `README.md` — Instruções breves de uso e como atualizar o `editais.json`.
- **Hospedagem:** 100% compatível com GitHub Pages (raiz do repositório).
- **Persistência:** Dados do perfil do produtor, editais favoritados ("Quero Participar") e checklists salvos exclusivamente no `localStorage`.

## 2. Identidade Visual e UX
- **Paleta:** Visual limpo e acessível voltado ao campo — tons de verde-escuro (`#1B4332`), verde-folha (`#2D6A4F`), fundo claro (`#F8F9FA` / `#FDFBF7`), cartões brancos com cantos arredondados e alto contraste.
- **Mobile-first:** Botões grandes, leitura confortável no celular e navegação superior por **3 abas**:
  1. `🔍 Radar de Editais`
  2. `📋 Meus Editais` (com contador de editais acompanhados)
  3. `👨‍🌾 Meu Perfil`

## 3. Estrutura do `editais.json`
Crie **8 editais realistas** (focados em municípios do Espírito Santo, como Vila Velha, Vitória, Serra, Cariacica, Domingos Martins, Santa Teresa, Alfredo Chaves e Guarapari) variando entre PNAE, PAA e Compra Direta.

Use `dias_para_encerrar` (número inteiro relativo à data de hoje, ex.: `3`, `8`, `14`, `22`, `30`, `-2`) para calcular a data limite dinamicamente no front-end, garantindo que os editais de demonstração nunca fiquem todos vencidos.

Schema de cada edital:
```json
{
  "id": "edital-001",
  "titulo": "Chamada Pública PNAE 01/2026 — Alimentação Escolar",
  "orgao": "Prefeitura Municipal de Domingos Martins",
  "programa": "PNAE",
  "municipio": "Domingos Martins",
  "uf": "ES",
  "dias_para_encerrar": 4,
  "valor_estimado": 185000.00,
  "resumo": "Aquisição de hortifrúti direto da agricultura familiar para escolas municipais.",
  "link_pdf": "[https://exemplo.gov.br/edital-001.pdf](https://exemplo.gov.br/edital-001.pdf)",
  "itens": [
    { "nome": "Alface Crespa", "unidade": "maço", "quantidade": 1200, "preco_ref": 4.50 },
    { "nome": "Tomate Salada", "unidade": "kg", "quantidade": 800, "preco_ref": 7.80 }
  ]
}
