# 🌱 Radar de Editais — Agricultura Familiar

Aplicação web estática (HTML, CSS e JavaScript puros) que ajuda pequenos produtores rurais a encontrar Chamadas Públicas do **PNAE**, **PAA** e de **Compras Institucionais** compatíveis com a sua produção, e a acompanhar prazos e documentos.

Não tem backend. Perfil, editais acompanhados e checklists ficam salvos só no `localStorage` do navegador.

## De onde vêm os editais

1. **🟢 Dados reais (PNCP).** Ao abrir, o app consulta a API pública do [PNCP](https://pncp.gov.br):
   - endpoint `api/consulta/v1/contratacoes/publicacao`, com as publicações dos últimos 30 dias;
   - na UF escolhida no perfil (padrão `ES`);
   - nas modalidades 8 (Dispensa/Chamada Pública) e 12 (Credenciamento), página 1 com 50 registros cada.

   Ficam só as contratações cujo `objetoCompra` cita *agricultura familiar*, *PNAE*, *PAA*, *alimentação escolar*, *hortifrúti*, *gêneros alimentícios* ou *merenda*. Em seguida, os itens de cada edital são buscados em segundo plano (`/api/pncp/v1/orgaos/{cnpj}/compras/{ano}/{sequencial}/itens`) para cruzar com os produtos do perfil.
2. **🟡 Dados de demonstração (offline).** Se o PNCP falhar (rede, CORS, demora acima de 20 s) ou não houver nenhuma chamada compatível, o app usa o `editais.json`. O botão **🔄 Tentar atualizar do PNCP** faz uma nova consulta.

Os editais marcados com "Quero Participar" ficam salvos com uma cópia local. Por isso continuam em "Meus Editais" mesmo quando a fonte muda.

Os parâmetros da consulta (dias, modalidades, termos, tamanho da página) ficam no objeto `PNCP`, no início do `app.js`.

## Como usar

1. **👨‍🌾 Meu Perfil**: informe seu município, o tipo de fornecedor (individual, grupo informal ou associação/cooperativa) e os produtos que você cultiva.
2. **🔍 Radar de Editais**: filtre por programa, município ou palavra-chave. Cada edital mostra quantos dias faltam, quais itens combinam com a sua produção e quanto você pode faturar com eles.
3. Toque em **☆ Quero Participar** para acompanhar um edital.
4. **📋 Meus Editais**: veja os prazos dos editais acompanhados e marque os documentos no checklist (CAF, Projeto de Venda etc.).

## Rodando localmente

- Dê dois cliques no `index.html`. Ao abrir via `file://`, o app usa a cópia dos editais embutida no `app.js`.
- Ou sirva a pasta para que o `editais.json` seja carregado:
  ```bash
  python3 -m http.server 8000
  # abra http://localhost:8000
  ```

## Publicando no GitHub Pages

Envie os arquivos para a raiz do repositório e ative **Settings → Pages → Deploy from a branch → `main` / root**.

## Atualizando o `editais.json` (dados de demonstração)

Cada edital segue este formato:

```json
{
  "id": "edital-009",
  "titulo": "Chamada Pública PNAE 06/2026 — Alimentação Escolar",
  "orgao": "Prefeitura Municipal de Guarapari",
  "programa": "PNAE",
  "municipio": "Guarapari",
  "uf": "ES",
  "dias_para_encerrar": 10,
  "valor_estimado": 120000.00,
  "resumo": "Descrição curta do objeto.",
  "link_pdf": "https://site-do-orgao.gov.br/edital.pdf",
  "itens": [
    { "nome": "Alface Crespa", "unidade": "maço", "quantidade": 1000, "preco_ref": 4.50 }
  ]
}
```

- `id`: precisa ser único e não deve mudar depois de publicado, porque os favoritos e checklists dos usuários ficam ligados a ele.
- `programa`: use `PNAE`, `PAA` ou `Compra Direta` para casar com o filtro.
- `dias_para_encerrar`: quantidade de dias a partir de **hoje** (negativo = já encerrado). A data limite é calculada no navegador, então os editais de demonstração nunca vencem todos juntos. Para editais reais com data fixa, atualize esse número quando publicar.
- `link_pdf`: URL `https://` do edital oficial.

### Sincronizando o fallback embutido

O `app.js` tem uma cópia dos editais entre os marcadores `/*FALLBACK_INICIO*/` e `/*FALLBACK_FIM*/`, usada quando o arquivo é aberto via `file://` ou quando o `fetch` falha. Depois de editar o `editais.json`, atualize essa cópia com:

```bash
python3 -c "
import json,re
d=json.load(open('editais.json'))
s=open('app.js').read()
n='/*FALLBACK_INICIO*/'+json.dumps(d,ensure_ascii=False,indent=2).replace('\n','\n  ')+'/*FALLBACK_FIM*/'
open('app.js','w').write(re.sub(r'/\*FALLBACK_INICIO\*/.*?/\*FALLBACK_FIM\*/',lambda m:n,s,flags=re.S))
"
```

Se você só publica no GitHub Pages, esse passo é opcional, porque lá o `editais.json` é sempre lido diretamente.

---

⚠️ Os editais do `editais.json` são **exemplos de demonstração**. Os dados do PNCP são reais, mas resumidos. Confira sempre o edital oficial antes de participar.
