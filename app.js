/* Radar de Editais — Agricultura Familiar
 * JavaScript puro, sem dependências. Persistência via localStorage.
 *
 * Fonte de dados: API pública do PNCP (Portal Nacional de Contratações
 * Públicas). Se o PNCP falhar (rede, CORS, timeout) ou não trouxer nenhuma
 * chamada compatível, usa o editais.json local (ou a cópia embutida abaixo).
 */
(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Fallback embutido (usado quando o index.html é aberto via file://
  // ou quando o fetch do editais.json falhar). Mantenha em sincronia
  // com o editais.json — veja o README.
  // ------------------------------------------------------------------
  const EDITAIS_FALLBACK = /*FALLBACK_INICIO*/[
    {
      "id": "edital-001",
      "titulo": "Chamada Pública PNAE 01/2026 — Alimentação Escolar",
      "orgao": "Prefeitura Municipal de Domingos Martins",
      "programa": "PNAE",
      "municipio": "Domingos Martins",
      "uf": "ES",
      "dias_para_encerrar": 4,
      "valor_estimado": 185000.0,
      "resumo": "Aquisição de hortifrúti direto da agricultura familiar para as escolas municipais da rede de ensino.",
      "link_pdf": "https://exemplo.gov.br/edital-001.pdf",
      "itens": [
        {
          "nome": "Alface Crespa",
          "unidade": "maço",
          "quantidade": 1200,
          "preco_ref": 4.5
        },
        {
          "nome": "Tomate Salada",
          "unidade": "kg",
          "quantidade": 800,
          "preco_ref": 7.8
        },
        {
          "nome": "Cenoura",
          "unidade": "kg",
          "quantidade": 900,
          "preco_ref": 5.2
        },
        {
          "nome": "Morango",
          "unidade": "bandeja 250g",
          "quantidade": 1500,
          "preco_ref": 6.9
        },
        {
          "nome": "Inhame",
          "unidade": "kg",
          "quantidade": 1000,
          "preco_ref": 6.4
        }
      ]
    },
    {
      "id": "edital-002",
      "titulo": "Chamada Pública PNAE 03/2026 — Gêneros da Agricultura Familiar",
      "orgao": "Secretaria Municipal de Educação de Vila Velha",
      "programa": "PNAE",
      "municipio": "Vila Velha",
      "uf": "ES",
      "dias_para_encerrar": 8,
      "valor_estimado": 642000.0,
      "resumo": "Compra de frutas, verduras, legumes e panificados para a alimentação escolar das unidades municipais de ensino (UMEIs e UMEFs).",
      "link_pdf": "https://exemplo.gov.br/edital-002.pdf",
      "itens": [
        {
          "nome": "Banana Prata",
          "unidade": "kg",
          "quantidade": 12000,
          "preco_ref": 5.1
        },
        {
          "nome": "Mamão Formosa",
          "unidade": "kg",
          "quantidade": 6000,
          "preco_ref": 4.8
        },
        {
          "nome": "Couve Manteiga",
          "unidade": "maço",
          "quantidade": 4000,
          "preco_ref": 3.9
        },
        {
          "nome": "Abóbora Cabotiá",
          "unidade": "kg",
          "quantidade": 5000,
          "preco_ref": 4.2
        },
        {
          "nome": "Pão Caseiro",
          "unidade": "kg",
          "quantidade": 3500,
          "preco_ref": 18.5
        },
        {
          "nome": "Ovos Caipira",
          "unidade": "dúzia",
          "quantidade": 4000,
          "preco_ref": 14.0
        }
      ]
    },
    {
      "id": "edital-003",
      "titulo": "PAA Compra com Doação Simultânea — Termo de Adesão 2026",
      "orgao": "Prefeitura Municipal de Cariacica — Secretaria de Assistência Social",
      "programa": "PAA",
      "municipio": "Cariacica",
      "uf": "ES",
      "dias_para_encerrar": 14,
      "valor_estimado": 320000.0,
      "resumo": "Aquisição de alimentos da agricultura familiar para doação a entidades socioassistenciais, restaurantes populares e bancos de alimentos.",
      "link_pdf": "https://exemplo.gov.br/edital-003.pdf",
      "itens": [
        {
          "nome": "Aipim (Mandioca)",
          "unidade": "kg",
          "quantidade": 8000,
          "preco_ref": 3.8
        },
        {
          "nome": "Feijão Preto",
          "unidade": "kg",
          "quantidade": 5000,
          "preco_ref": 9.5
        },
        {
          "nome": "Banana da Terra",
          "unidade": "kg",
          "quantidade": 6000,
          "preco_ref": 5.6
        },
        {
          "nome": "Quiabo",
          "unidade": "kg",
          "quantidade": 2000,
          "preco_ref": 8.2
        },
        {
          "nome": "Tomate Salada",
          "unidade": "kg",
          "quantidade": 4000,
          "preco_ref": 7.5
        }
      ]
    },
    {
      "id": "edital-004",
      "titulo": "Chamada Pública 02/2026 — Compra Direta para o Hospital Estadual",
      "orgao": "Secretaria de Estado da Saúde do Espírito Santo (SESA)",
      "programa": "Compra Direta",
      "municipio": "Vitória",
      "uf": "ES",
      "dias_para_encerrar": 22,
      "valor_estimado": 410000.0,
      "resumo": "Compra institucional de gêneros alimentícios da agricultura familiar para as cozinhas de unidades hospitalares da Grande Vitória (Decreto nº 11.476/2023).",
      "link_pdf": "https://exemplo.gov.br/edital-004.pdf",
      "itens": [
        {
          "nome": "Batata Inglesa",
          "unidade": "kg",
          "quantidade": 10000,
          "preco_ref": 5.4
        },
        {
          "nome": "Cebola",
          "unidade": "kg",
          "quantidade": 6000,
          "preco_ref": 5.9
        },
        {
          "nome": "Laranja Pera",
          "unidade": "kg",
          "quantidade": 9000,
          "preco_ref": 3.7
        },
        {
          "nome": "Iogurte Natural",
          "unidade": "litro",
          "quantidade": 4000,
          "preco_ref": 12.0
        },
        {
          "nome": "Queijo Minas Frescal",
          "unidade": "kg",
          "quantidade": 1500,
          "preco_ref": 42.0
        }
      ]
    },
    {
      "id": "edital-005",
      "titulo": "Chamada Pública PNAE 05/2026 — Escolas Estaduais (SRE Carapina)",
      "orgao": "Secretaria de Estado da Educação (SEDU) — Superintendência Regional de Carapina",
      "programa": "PNAE",
      "municipio": "Serra",
      "uf": "ES",
      "dias_para_encerrar": 30,
      "valor_estimado": 528000.0,
      "resumo": "Aquisição de gêneros alimentícios da agricultura familiar e do empreendedor familiar rural para as escolas estaduais do município da Serra.",
      "link_pdf": "https://exemplo.gov.br/edital-005.pdf",
      "itens": [
        {
          "nome": "Banana Prata",
          "unidade": "kg",
          "quantidade": 9000,
          "preco_ref": 5.0
        },
        {
          "nome": "Goiaba",
          "unidade": "kg",
          "quantidade": 3000,
          "preco_ref": 7.2
        },
        {
          "nome": "Polpa de Fruta (Acerola)",
          "unidade": "kg",
          "quantidade": 2500,
          "preco_ref": 16.0
        },
        {
          "nome": "Alface Crespa",
          "unidade": "maço",
          "quantidade": 5000,
          "preco_ref": 4.2
        },
        {
          "nome": "Mel de Abelha",
          "unidade": "kg",
          "quantidade": 600,
          "preco_ref": 45.0
        },
        {
          "nome": "Café Torrado e Moído",
          "unidade": "kg",
          "quantidade": 1200,
          "preco_ref": 48.0
        }
      ]
    },
    {
      "id": "edital-006",
      "titulo": "Chamada Pública PNAE 02/2026 — Alimentação Escolar (Encerrada)",
      "orgao": "Prefeitura Municipal de Santa Teresa",
      "programa": "PNAE",
      "municipio": "Santa Teresa",
      "uf": "ES",
      "dias_para_encerrar": -2,
      "valor_estimado": 96000.0,
      "resumo": "Aquisição de hortifrutigranjeiros e produtos da agroindústria familiar para as escolas municipais de Santa Teresa.",
      "link_pdf": "https://exemplo.gov.br/edital-006.pdf",
      "itens": [
        {
          "nome": "Brócolis",
          "unidade": "maço",
          "quantidade": 1500,
          "preco_ref": 6.5
        },
        {
          "nome": "Repolho",
          "unidade": "kg",
          "quantidade": 2000,
          "preco_ref": 3.4
        },
        {
          "nome": "Socol (embutido artesanal)",
          "unidade": "kg",
          "quantidade": 150,
          "preco_ref": 95.0
        },
        {
          "nome": "Biscoito Caseiro",
          "unidade": "kg",
          "quantidade": 800,
          "preco_ref": 26.0
        }
      ]
    },
    {
      "id": "edital-007",
      "titulo": "PAA Leite e Derivados — Chamada Pública 01/2026",
      "orgao": "Prefeitura Municipal de Alfredo Chaves",
      "programa": "PAA",
      "municipio": "Alfredo Chaves",
      "uf": "ES",
      "dias_para_encerrar": 3,
      "valor_estimado": 74000.0,
      "resumo": "Aquisição de leite, derivados e hortaliças de agricultores familiares locais para distribuição a famílias em situação de insegurança alimentar.",
      "link_pdf": "https://exemplo.gov.br/edital-007.pdf",
      "itens": [
        {
          "nome": "Leite Pasteurizado",
          "unidade": "litro",
          "quantidade": 9000,
          "preco_ref": 4.9
        },
        {
          "nome": "Queijo Minas Frescal",
          "unidade": "kg",
          "quantidade": 400,
          "preco_ref": 40.0
        },
        {
          "nome": "Inhame",
          "unidade": "kg",
          "quantidade": 1500,
          "preco_ref": 6.0
        },
        {
          "nome": "Gengibre",
          "unidade": "kg",
          "quantidade": 500,
          "preco_ref": 12.0
        }
      ]
    },
    {
      "id": "edital-008",
      "titulo": "Chamada Pública 04/2026 — Compra Direta para Restaurante Universitário",
      "orgao": "Instituto Federal do Espírito Santo (Ifes) — Campus Guarapari",
      "programa": "Compra Direta",
      "municipio": "Guarapari",
      "uf": "ES",
      "dias_para_encerrar": 45,
      "valor_estimado": 138000.0,
      "resumo": "Compra institucional de alimentos da agricultura familiar para o refeitório estudantil, com prioridade a produtos orgânicos e agroecológicos.",
      "link_pdf": "https://exemplo.gov.br/edital-008.pdf",
      "itens": [
        {
          "nome": "Cenoura Orgânica",
          "unidade": "kg",
          "quantidade": 1200,
          "preco_ref": 7.5
        },
        {
          "nome": "Tomate Cereja Orgânico",
          "unidade": "kg",
          "quantidade": 600,
          "preco_ref": 14.0
        },
        {
          "nome": "Couve Manteiga",
          "unidade": "maço",
          "quantidade": 1800,
          "preco_ref": 4.0
        },
        {
          "nome": "Aipim (Mandioca)",
          "unidade": "kg",
          "quantidade": 2500,
          "preco_ref": 4.0
        },
        {
          "nome": "Ovos Caipira",
          "unidade": "dúzia",
          "quantidade": 1500,
          "preco_ref": 15.0
        },
        {
          "nome": "Palmito Pupunha",
          "unidade": "kg",
          "quantidade": 400,
          "preco_ref": 38.0
        }
      ]
    }
  ]/*FALLBACK_FIM*/;

  // ------------------------------------------------------------------
  // Configuração do PNCP
  // ------------------------------------------------------------------
  const PNCP = {
    urlConsulta: 'https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao',
    urlItens: 'https://pncp.gov.br/api/pncp/v1/orgaos/{cnpj}/compras/{ano}/{sequencial}/itens',
    urlPortal: 'https://pncp.gov.br/app/editais/{cnpj}/{ano}/{sequencial}',
    modalidades: [8, 12], // 8 = Dispensa (inclui Chamada Pública), 12 = Credenciamento
    diasAtras: 30,
    pagina: 1,
    tamanhoPagina: 50,
    timeoutMs: 20000,
    // Termos buscados no objetoCompra (sem acento, minúsculos).
    // Termos curtos casam só como palavra inteira, para "paa" não casar com "CAPAAC".
    termos: ['agricultura familiar', 'pnae', 'paa', 'alimentacao escolar', 'hortifruti', 'generos alimenticios', 'merenda'],
    // Itens são buscados em segundo plano para fazer o match com o perfil.
    maxEditaisComItens: 40,
    requisicoesSimultaneas: 3
  };

  const UFS = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE',
    'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

  const CHAVES = {
    perfil: 'radarEditais.perfil',
    seguindo: 'radarEditais.seguindo',
    seguindoDados: 'radarEditais.seguindoDados',
    checklists: 'radarEditais.checklists'
  };

  const PERFIL_PADRAO = { nome: '', municipio: '', uf: 'ES', tipo: 'individual', caf: false, produtos: [] };

  const SUGESTOES_PRODUTOS = [
    'Alface', 'Tomate', 'Banana', 'Aipim', 'Inhame', 'Couve', 'Cenoura', 'Ovos',
    'Feijão', 'Mamão', 'Laranja', 'Morango', 'Café', 'Mel', 'Leite', 'Queijo',
    'Abóbora', 'Batata', 'Cebola', 'Goiaba', 'Polpa de fruta', 'Pão caseiro',
    'Biscoito caseiro', 'Palmito', 'Gengibre', 'Quiabo', 'Brócolis', 'Repolho'
  ];

  // Sinônimos regionais: qualquer termo do grupo casa com os demais.
  const SINONIMOS = [
    ['aipim', 'mandioca', 'macaxeira'],
    ['abobora', 'jerimum', 'cabotia'],
    ['ovo', 'ovos'],
    ['mexerica', 'tangerina', 'bergamota', 'ponkan'],
    ['inhame', 'taro'],
    ['milho', 'milho verde']
  ];

  const PALAVRAS_IGNORADAS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'com', 'para', 'tipo', 'kg', 'g']);

  // ------------------------------------------------------------------
  // Estado
  // ------------------------------------------------------------------
  const estado = {
    editais: [],
    fonte: 'carregando', // 'carregando' | 'pncp' | 'demo'
    motivoFallback: '',
    atualizadoEm: null,
    perfil: Object.assign({}, PERFIL_PADRAO, carregar(CHAVES.perfil, {})),
    seguindo: carregar(CHAVES.seguindo, []),
    seguindoDados: carregar(CHAVES.seguindoDados, {}),
    checklists: carregar(CHAVES.checklists, {}),
    produtosRascunho: null, // edição em andamento no formulário de perfil
    itensCarregando: new Set(),
    itensErro: new Set()
  };

  // ------------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------------
  function carregar(chave, padrao) {
    try {
      const bruto = localStorage.getItem(chave);
      if (!bruto) return padrao;
      const valor = JSON.parse(bruto);
      if (Array.isArray(padrao) !== Array.isArray(valor) || typeof valor !== 'object' || valor === null) return padrao;
      return valor;
    } catch (e) {
      return padrao;
    }
  }

  function salvar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) {
      console.warn('Não foi possível salvar no localStorage:', e);
    }
  }

  function esc(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizar(texto) {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Reduz plural simples para comparar "tomates" com "tomate", "ovos" com "ovo".
  function radical(palavra) {
    if (palavra.length > 4 && palavra.endsWith('oes')) return palavra.slice(0, -3) + 'ao';
    if (palavra.length > 3 && palavra.endsWith('s')) return palavra.slice(0, -1);
    return palavra;
  }

  function tokens(texto) {
    return normalizar(texto)
      .split(' ')
      .filter(function (p) { return p && !PALAVRAS_IGNORADAS.has(p); })
      .map(radical);
  }

  function expandirSinonimos(lista) {
    const saida = new Set(lista);
    lista.forEach(function (t) {
      SINONIMOS.forEach(function (grupo) {
        const grupoRad = grupo.map(radical);
        if (grupoRad.indexOf(t) !== -1) grupoRad.forEach(function (g) { saida.add(g); });
      });
    });
    return saida;
  }

  const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const numero = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
  const dataLonga = new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
  const hora = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });

  function formatarValor(v) {
    const n = Number(v) || 0;
    return n > 0 ? moeda.format(n) : 'Não informado';
  }

  function hojeMeiaNoite() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function aaaammdd(d) {
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  }

  // "YYYY-MM-DD" no fuso local (evita o deslocamento de fuso de toISOString).
  function isoLocal(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  // Limpa links que vieram no formato Markdown "[url](url)".
  function limparLink(link) {
    const m = String(link || '').match(/\((https?:\/\/[^)]+)\)/);
    const url = m ? m[1] : String(link || '').replace(/^\[|\]$/g, '');
    return /^https?:\/\//i.test(url) ? url : '';
  }

  function preencherUrl(modelo, p) {
    return modelo
      .replace('{cnpj}', encodeURIComponent(p.cnpj))
      .replace('{ano}', encodeURIComponent(p.ano))
      .replace('{sequencial}', encodeURIComponent(p.sequencial));
  }

  function fetchComTimeout(url, ms) {
    const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    const t = ctrl ? setTimeout(function () { ctrl.abort(); }, ms) : null;
    return fetch(url, { signal: ctrl ? ctrl.signal : undefined, headers: { Accept: 'application/json' } })
      .finally(function () { if (t) clearTimeout(t); });
  }

  // ------------------------------------------------------------------
  // Prazos
  // ------------------------------------------------------------------
  // Cada edital interno tem `data_limite`: "YYYY-MM-DD" ou "YYYY-MM-DDTHH:MM:SS" (ou null).
  function calcularPrazo(edital) {
    if (!edital.data_limite) {
      return { dias: Infinity, semData: true, dataTexto: 'Não informada', rotulo: '📅 Prazo não informado', classe: 'neutro', encerrado: false };
    }
    const temHora = String(edital.data_limite).indexOf('T') !== -1;
    const limite = temHora ? new Date(edital.data_limite) : new Date(edital.data_limite + 'T23:59:59');
    if (isNaN(limite.getTime())) {
      return { dias: Infinity, semData: true, dataTexto: 'Não informada', rotulo: '📅 Prazo não informado', classe: 'neutro', encerrado: false };
    }
    const diaLimite = new Date(limite);
    diaLimite.setHours(0, 0, 0, 0);
    const dias = Math.round((diaLimite - hojeMeiaNoite()) / 86400000);
    const encerrado = dias < 0 || Date.now() > limite.getTime();

    let rotulo, classe;
    if (encerrado) {
      rotulo = dias < 0 ? 'Encerrado há ' + Math.abs(dias) + (Math.abs(dias) === 1 ? ' dia' : ' dias') : 'Encerrado hoje';
      classe = 'encerrado';
    } else if (dias === 0) {
      rotulo = '⏰ Encerra HOJE' + (temHora ? ' às ' + hora.format(limite) : '');
      classe = 'urgente';
    } else if (dias === 1) {
      rotulo = '⏰ Encerra amanhã';
      classe = 'urgente';
    } else if (dias <= 3) {
      rotulo = '⏰ Faltam ' + dias + ' dias';
      classe = 'urgente';
    } else if (dias <= 7) {
      rotulo = '⏳ Faltam ' + dias + ' dias';
      classe = 'alerta';
    } else {
      rotulo = '📅 Faltam ' + dias + ' dias';
      classe = 'ok';
    }
    return {
      dias: dias,
      semData: false,
      dataTexto: dataLonga.format(limite) + (temHora ? ' às ' + hora.format(limite) : ''),
      rotulo: rotulo,
      classe: classe,
      encerrado: encerrado
    };
  }

  function compararPrazo(a, b) {
    if (a.dias === b.dias) return 0;
    if (a.dias === Infinity) return 1;
    if (b.dias === Infinity) return -1;
    return a.dias - b.dias;
  }

  // ------------------------------------------------------------------
  // Normalização das fontes para o formato interno
  // ------------------------------------------------------------------
  function deDemonstracao(e) {
    const limite = hojeMeiaNoite();
    limite.setDate(limite.getDate() + (Number(e.dias_para_encerrar) || 0));
    return Object.assign({}, e, {
      fonte: 'demo',
      data_limite: isoLocal(limite),
      link_pdf: limparLink(e.link_pdf),
      itens: Array.isArray(e.itens) ? e.itens : []
    });
  }

  function detectarPrograma(texto) {
    const t = ' ' + normalizar(texto) + ' ';
    if (/ (pnae|merenda|alimentacao escolar|escolar|escolas?) /.test(t)) return 'PNAE';
    if (/ paa /.test(t) || t.indexOf('programa de aquisicao de alimentos') !== -1 || t.indexOf('alimenta brasil') !== -1) return 'PAA';
    return 'Compra Direta';
  }

  function objetoRelevante(objeto) {
    const t = ' ' + normalizar(objeto) + ' ';
    return PNCP.termos.some(function (termo) {
      return termo.length <= 4 ? t.indexOf(' ' + termo + ' ') !== -1 : t.indexOf(termo) !== -1;
    });
  }

  function dePncp(c) {
    const orgao = c.orgaoEntidade || {};
    const unidade = c.unidadeOrgao || {};
    const ref = { cnpj: orgao.cnpj, ano: c.anoCompra, sequencial: c.sequencialCompra };
    const encerramento = c.dataEncerramentoProposta || null;
    const complemento = String(c.informacaoComplementar || '').trim();
    const titulo = String(c.objetoCompra || 'Contratação sem descrição').trim();
    const resumoPartes = [];
    if (complemento && normalizar(complemento) !== normalizar(titulo)) resumoPartes.push(complemento);
    resumoPartes.push([c.modalidadeNome, c.situacaoCompraNome, c.numeroCompra ? 'nº ' + c.numeroCompra + '/' + c.anoCompra : '']
      .filter(Boolean).join(' · '));

    return {
      id: 'pncp-' + (c.numeroControlePNCP || [ref.cnpj, ref.ano, ref.sequencial].join('-')),
      fonte: 'pncp',
      titulo: titulo,
      orgao: orgao.razaoSocial || unidade.nomeUnidade || 'Órgão não informado',
      programa: detectarPrograma(titulo + ' ' + complemento),
      municipio: unidade.municipioNome || '—',
      uf: unidade.ufSigla || '',
      valor_estimado: Number(c.valorTotalEstimado) || 0,
      data_encerramento: encerramento,
      data_limite: encerramento,
      publicado_em: c.dataPublicacaoPncp || null,
      resumo: resumoPartes.join('\n'),
      link_pdf: preencherUrl(PNCP.urlPortal, ref),
      pncp: ref,
      itens: null // carregados sob demanda
    };
  }

  // Nome curto de um item do PNCP: "ABÓBORA JAPONESA in natura, procedente..." -> "Abóbora Japonesa"
  function nomeCurtoItem(descricao) {
    let nome = String(descricao || '').split(/[,;:(]| - | in natura| tipo /i)[0].trim();
    if (nome.length > 60) nome = nome.slice(0, 57).trim() + '…';
    if (nome === nome.toUpperCase()) {
      nome = nome.toLowerCase().replace(/(^|\s)(\S)/g, function (m, esp, letra) { return esp + letra.toUpperCase(); });
    }
    return nome || 'Item';
  }

  function deItemPncp(i) {
    return {
      nome: nomeCurtoItem(i.descricao),
      descricao: i.descricao || '',
      unidade: i.unidadeMedida || '',
      quantidade: Number(i.quantidade) || 0,
      preco_ref: Number(i.valorUnitarioEstimado) || 0
    };
  }

  // ------------------------------------------------------------------
  // Carregamento de dados
  // ------------------------------------------------------------------
  function buscarModalidade(codigo, uf) {
    const hoje = new Date();
    const inicio = new Date();
    inicio.setDate(inicio.getDate() - PNCP.diasAtras);
    const params = new URLSearchParams({
      dataInicial: aaaammdd(inicio),
      dataFinal: aaaammdd(hoje),
      uf: uf,
      codigoModalidadeContratacao: String(codigo),
      pagina: String(PNCP.pagina),
      tamanhoPagina: String(PNCP.tamanhoPagina)
    });
    return fetchComTimeout(PNCP.urlConsulta + '?' + params.toString(), PNCP.timeoutMs).then(function (r) {
      if (r.status === 204) return []; // PNCP responde 204 quando não há resultados
      if (!r.ok) throw new Error('PNCP respondeu HTTP ' + r.status);
      return r.json().then(function (j) { return Array.isArray(j && j.data) ? j.data : []; });
    });
  }

  function carregarPncp(uf) {
    return Promise.allSettled(PNCP.modalidades.map(function (m) { return buscarModalidade(m, uf); }))
      .then(function (resultados) {
        const ok = resultados.filter(function (r) { return r.status === 'fulfilled'; });
        if (!ok.length) {
          const erro = resultados[0] && resultados[0].reason;
          throw new Error(erro && erro.name === 'AbortError' ? 'o PNCP demorou demais para responder' : 'não foi possível acessar o PNCP (rede ou bloqueio)');
        }
        const vistos = new Set();
        const editais = [];
        ok.forEach(function (r) {
          r.value.forEach(function (c) {
            if (!objetoRelevante(c.objetoCompra)) return;
            const e = dePncp(c);
            if (vistos.has(e.id)) return;
            vistos.add(e.id);
            editais.push(e);
          });
        });
        if (!editais.length) throw new Error('nenhuma chamada pública de alimentos encontrada no PNCP (' + uf + ', últimos ' + PNCP.diasAtras + ' dias)');
        return editais;
      });
  }

  function carregarDemonstracao() {
    const usarEmbutido = function () { return EDITAIS_FALLBACK.map(deDemonstracao); };
    if (location.protocol === 'file:') return Promise.resolve(usarEmbutido());
    return fetch('./editais.json', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (dados) {
        const validos = validarEditais(dados);
        if (!validos.length) throw new Error('editais.json vazio ou inválido');
        return validos.map(deDemonstracao);
      })
      .catch(function (erro) {
        console.warn('Usando editais embutidos (fallback):', erro);
        return usarEmbutido();
      });
  }

  function validarEditais(lista) {
    if (!Array.isArray(lista)) return [];
    return lista.filter(function (e) { return e && e.id && e.titulo; });
  }

  let carregamentoAtual = 0;

  function carregarEditais() {
    const minhaVez = ++carregamentoAtual;
    estado.fonte = 'carregando';
    renderizarFonte();
    if (!estado.editais.length) {
      document.getElementById('lista-radar').innerHTML = '<p class="resumo-lista">⏳ Buscando chamadas públicas no PNCP…</p>';
      document.getElementById('resumo-radar').textContent = '';
    }

    const uf = estado.perfil.uf || 'ES';
    return carregarPncp(uf)
      .then(function (editais) {
        return { editais: editais, fonte: 'pncp', motivo: '' };
      })
      .catch(function (erro) {
        console.warn('PNCP indisponível, usando dados de demonstração:', erro);
        return carregarDemonstracao().then(function (editais) {
          return { editais: editais, fonte: 'demo', motivo: erro && erro.message ? erro.message : 'erro desconhecido' };
        });
      })
      .then(function (r) {
        if (minhaVez !== carregamentoAtual) return; // um carregamento mais novo já começou
        estado.editais = r.editais;
        estado.fonte = r.fonte;
        estado.motivoFallback = r.motivo;
        estado.atualizadoEm = new Date();
        estado.itensErro.clear();
        preencherMunicipios();
        preencherListaProdutos();
        renderizarTudo();
        if (r.fonte === 'pncp') precarregarItens();
      });
  }

  // ------------------------------------------------------------------
  // Itens do PNCP (sob demanda / em segundo plano)
  // ------------------------------------------------------------------
  function buscarItens(edital) {
    if (!edital || edital.fonte !== 'pncp' || Array.isArray(edital.itens) || estado.itensCarregando.has(edital.id)) {
      return Promise.resolve();
    }
    estado.itensCarregando.add(edital.id);
    estado.itensErro.delete(edital.id);
    const url = preencherUrl(PNCP.urlItens, edital.pncp) + '?pagina=1&tamanhoPagina=500';
    return fetchComTimeout(url, PNCP.timeoutMs)
      .then(function (r) {
        if (r.status === 204) return [];
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (lista) {
        edital.itens = (Array.isArray(lista) ? lista : []).map(deItemPncp);
        if (estado.seguindoDados[edital.id]) {
          estado.seguindoDados[edital.id] = edital;
          salvar(CHAVES.seguindoDados, estado.seguindoDados);
        }
      })
      .catch(function (erro) {
        console.warn('Falha ao carregar itens de', edital.id, erro);
        estado.itensErro.add(edital.id);
      })
      .finally(function () {
        estado.itensCarregando.delete(edital.id);
        agendarRender();
      });
  }

  function precarregarItens() {
    const fila = estado.editais
      .filter(function (e) { return e.fonte === 'pncp' && !Array.isArray(e.itens); })
      .sort(function (a, b) { return compararPrazo(calcularPrazo(a), calcularPrazo(b)); })
      .slice(0, PNCP.maxEditaisComItens);
    // também os acompanhados que ainda não têm itens
    Object.keys(estado.seguindoDados).forEach(function (id) {
      const e = editalPorId(id);
      if (e && e.fonte === 'pncp' && !Array.isArray(e.itens) && fila.indexOf(e) === -1) fila.push(e);
    });

    function proximo() {
      const e = fila.shift();
      if (!e) return Promise.resolve();
      return buscarItens(e).then(proximo);
    }
    for (let i = 0; i < PNCP.requisicoesSimultaneas; i++) proximo();
  }

  let renderAgendado = null;
  function agendarRender() {
    if (renderAgendado) return;
    renderAgendado = setTimeout(function () {
      renderAgendado = null;
      renderizarTudo();
    }, 150);
  }

  // ------------------------------------------------------------------
  // Match de produtos
  // ------------------------------------------------------------------
  function produtoCasaComTexto(produto, texto) {
    const tp = tokens(produto);
    if (!tp.length) return false;
    const ti = expandirSinonimos(tokens(texto));
    // Todas as palavras do produto do perfil precisam aparecer no texto
    // (considerando sinônimos). Ex.: "tomate" casa com "Tomate Salada".
    return tp.every(function (t) {
      if (ti.has(t)) return true;
      for (const s of expandirSinonimos([t])) if (ti.has(s)) return true;
      return false;
    });
  }

  function calcularMatch(edital) {
    const produtos = estado.perfil.produtos || [];
    const base = { indices: new Set(), quantidade: 0, total: 0, valorPotencial: 0, citados: [], porTexto: false, temItens: Array.isArray(edital.itens) };

    // Sem itens (PNCP ainda carregando): procura os produtos no texto do objeto.
    if (!Array.isArray(edital.itens) || !edital.itens.length) {
      const texto = edital.titulo + ' ' + (edital.resumo || '');
      base.citados = produtos.filter(function (p) { return produtoCasaComTexto(p, texto); });
      base.quantidade = base.citados.length;
      base.porTexto = true;
      return base;
    }

    const itens = edital.itens;
    base.total = itens.length;
    itens.forEach(function (item, i) {
      const ok = produtos.some(function (p) { return produtoCasaComTexto(p, item.nome); });
      if (ok) {
        base.indices.add(i);
        base.valorPotencial += (Number(item.quantidade) || 0) * (Number(item.preco_ref) || 0);
      }
    });
    base.quantidade = base.indices.size;
    return base;
  }

  function pertoDeMim(edital) {
    const meu = normalizar(estado.perfil.municipio);
    return !!meu && normalizar(edital.municipio) === meu;
  }

  // ------------------------------------------------------------------
  // Checklist de documentos (baseado nas exigências usuais do PNAE/PAA)
  // ------------------------------------------------------------------
  function documentosPara(edital) {
    const tipo = estado.perfil.tipo || 'individual';
    const docs = [];

    if (tipo === 'grupo-formal') {
      docs.push(
        { id: 'cnpj', nome: 'Cartão CNPJ da associação/cooperativa' },
        { id: 'caf-juridica', nome: 'Extrato da CAF Pessoa Jurídica (ou DAP Jurídica) ativa' },
        { id: 'cnd-federal', nome: 'Certidão Negativa de Débitos Federais (Receita/PGFN)' },
        { id: 'crf-fgts', nome: 'Certificado de Regularidade do FGTS (CRF)' },
        { id: 'cndt', nome: 'Certidão Negativa de Débitos Trabalhistas (CNDT)' },
        { id: 'estatuto', nome: 'Estatuto social e ata da posse da diretoria atual', obs: 'Registrados em cartório' },
        { id: 'decl-limite', nome: 'Declaração de controle do limite individual de venda dos cooperados/associados' }
      );
    } else if (tipo === 'grupo-informal') {
      docs.push(
        { id: 'cpf-membros', nome: 'CPF de cada agricultor(a) do grupo' },
        { id: 'caf-membros', nome: 'Extrato da CAF (ou DAP) de cada agricultor(a) do grupo' }
      );
    } else {
      docs.push(
        { id: 'cpf', nome: 'CPF' },
        { id: 'caf', nome: 'Extrato da CAF (ou DAP) física ativa', obs: 'Emita em caf.mda.gov.br ou com a assistência técnica (Incaper/sindicato)' }
      );
    }

    docs.push(
      { id: 'projeto-venda', nome: 'Projeto de Venda preenchido e assinado', obs: 'Modelo anexo ao edital' },
      { id: 'decl-producao', nome: 'Declaração de que os produtos são de produção própria' },
      { id: 'sanitario', nome: 'Registro/licença sanitária (se vender produto de origem animal ou processado)', obs: 'Ex.: SIM, SIE, SIF ou alvará da Vigilância Sanitária' }
    );

    if (edital.programa === 'PAA') {
      docs.push({ id: 'paa-cadastro', nome: 'Cadastro / termo de compromisso do fornecedor no PAA', obs: 'Feito junto à prefeitura ou ao órgão executor' });
    }
    if (edital.programa === 'Compra Direta') {
      docs.push({ id: 'compra-cadastro', nome: 'Cadastro de fornecedor no órgão comprador (se exigido)' });
    }

    const prazo = calcularPrazo(edital);
    docs.push(
      { id: 'amostras', nome: 'Separar amostras dos produtos (se o edital pedir)' },
      { id: 'entrega', nome: 'Entregar envelope/proposta até o prazo final', obs: prazo.semData ? 'Confira o prazo no edital' : 'Prazo: ' + prazo.dataTexto }
    );
    return docs;
  }

  function progressoChecklist(edital) {
    const docs = documentosPara(edital);
    const marcados = estado.checklists[edital.id] || {};
    const feitos = docs.filter(function (d) { return marcados[d.id]; }).length;
    return { feitos: feitos, total: docs.length, percentual: docs.length ? Math.round((feitos / docs.length) * 100) : 0 };
  }

  // ------------------------------------------------------------------
  // Seguindo ("Quero Participar")
  // Guardamos uma cópia do edital, para ele continuar em "Meus Editais"
  // mesmo se a fonte mudar (PNCP ↔ demonstração) ou o edital sair da busca.
  // ------------------------------------------------------------------
  function editalPorId(id) {
    return estado.editais.find(function (e) { return e.id === id; }) || estado.seguindoDados[id] || null;
  }

  function estaSeguindo(id) {
    return estado.seguindo.indexOf(id) !== -1;
  }

  function alternarSeguindo(id) {
    if (estaSeguindo(id)) {
      estado.seguindo = estado.seguindo.filter(function (x) { return x !== id; });
      delete estado.seguindoDados[id];
    } else {
      const e = editalPorId(id);
      if (!e) return;
      estado.seguindo.push(id);
      estado.seguindoDados[id] = e;
      buscarItens(e);
    }
    salvar(CHAVES.seguindo, estado.seguindo);
    salvar(CHAVES.seguindoDados, estado.seguindoDados);
    renderizarTudo();
  }

  // Atualiza as cópias salvas com os dados mais novos da fonte atual.
  function sincronizarSeguidos() {
    let mudou = false;
    estado.editais.forEach(function (e) {
      if (!estaSeguindo(e.id)) return;
      const antigo = estado.seguindoDados[e.id];
      if (antigo && Array.isArray(antigo.itens) && !Array.isArray(e.itens)) e.itens = antigo.itens;
      estado.seguindoDados[e.id] = e;
      mudou = true;
    });
    // Ids antigos (versão sem cópia salva): recupera da base de demonstração;
    // só descarta se não existir em lugar nenhum.
    estado.seguindo = estado.seguindo.filter(function (id) {
      if (estado.seguindoDados[id]) return true;
      const demo = EDITAIS_FALLBACK.find(function (e) { return e.id === id; });
      mudou = true;
      if (demo) {
        estado.seguindoDados[id] = deDemonstracao(demo);
        return true;
      }
      return false;
    });
    if (mudou) {
      salvar(CHAVES.seguindo, estado.seguindo);
      salvar(CHAVES.seguindoDados, estado.seguindoDados);
    }
  }

  // ------------------------------------------------------------------
  // Renderização: indicador de fonte
  // ------------------------------------------------------------------
  function renderizarFonte() {
    const el = document.getElementById('fonte-dados');
    const btn = '<button type="button" class="btn btn--pequeno btn--secundario" data-acao="atualizar"' +
      (estado.fonte === 'carregando' ? ' disabled' : '') + '>🔄 Tentar atualizar do PNCP</button>';
    let texto;
    if (estado.fonte === 'carregando') {
      el.className = 'fonte fonte--carregando';
      texto = '<span class="fonte__txt">⏳ Consultando o PNCP…</span>';
    } else if (estado.fonte === 'pncp') {
      el.className = 'fonte fonte--pncp';
      texto = '<span class="fonte__txt"><strong>🟢 Dados reais (PNCP)</strong> · ' + esc(estado.perfil.uf || 'ES') +
        ', publicados nos últimos ' + PNCP.diasAtras + ' dias' +
        (estado.atualizadoEm ? ' · atualizado às ' + hora.format(estado.atualizadoEm) : '') + '</span>';
    } else {
      el.className = 'fonte fonte--demo';
      texto = '<span class="fonte__txt"><strong>🟡 Dados de demonstração (offline)</strong>' +
        (estado.motivoFallback ? '<small>Motivo: ' + esc(estado.motivoFallback) + '.</small>' : '') + '</span>';
    }
    el.innerHTML = texto + btn;
    el.hidden = false;
  }

  // ------------------------------------------------------------------
  // Renderização: cartões
  // ------------------------------------------------------------------
  function htmlSelosTopo(edital, prazo) {
    const classeProg = normalizar(edital.programa).replace(/\s+/g, '-');
    return '<div class="edital__topo">' +
      '<span class="selo selo--programa ' + esc(classeProg) + '">' + esc(edital.programa) + '</span>' +
      '<span class="selo selo--prazo ' + prazo.classe + '">' + esc(prazo.rotulo) + '</span>' +
      '<span class="selo selo--local">📍 ' + esc(edital.municipio) + (edital.uf ? '/' + esc(edital.uf) : '') + '</span>' +
      (pertoDeMim(edital) ? '<span class="selo selo--perto">🏡 No seu município</span>' : '') +
      (edital.fonte === 'demo' && estado.fonte === 'pncp' ? '<span class="selo selo--local">Demonstração</span>' : '') +
      '</div>';
  }

  function htmlMatch(edital, match) {
    if (!(estado.perfil.produtos || []).length) return '';
    if (match.porTexto) {
      const carregando = estado.itensCarregando.has(edital.id);
      const erro = estado.itensErro.has(edital.id);
      const semItens = match.temItens; // itens carregados, mas a lista veio vazia
      if (match.citados.length) {
        return '<p class="match">✅ O edital cita: <strong>' + match.citados.map(esc).join(', ') + '</strong>' +
          (carregando ? ' · ⏳ conferindo itens…' : '') + '</p>';
      }
      if (carregando) return '<p class="match match--nenhum">⏳ Conferindo os itens deste edital…</p>';
      if (erro) return '<p class="match match--nenhum">Não foi possível carregar os itens. Abra os detalhes para tentar de novo.</p>';
      if (semItens) return '<p class="match match--nenhum">O PNCP não listou itens para este edital. Confira no edital completo.</p>';
      return '<p class="match match--nenhum">Seus produtos não aparecem no resumo. Abra os detalhes para ver os itens.</p>';
    }
    if (!match.quantidade) {
      return '<p class="match match--nenhum">Nenhum dos seus produtos aparece neste edital.</p>';
    }
    return '<p class="match">✅ <strong>' + match.quantidade + ' de ' + match.total + '</strong> itens combinam com sua produção' +
      (match.valorPotencial > 0 ? ' · potencial de até <strong>' + moeda.format(match.valorPotencial) + '</strong>' : '') + '</p>';
  }

  function htmlProdutos(edital, match) {
    if (!Array.isArray(edital.itens) || !edital.itens.length) return '';
    const max = 12;
    // Mostra primeiro os itens que casaram
    const ordem = edital.itens.map(function (item, i) { return { item: item, i: i, casou: match.indices.has(i) }; })
      .sort(function (a, b) { return (b.casou - a.casou) || (a.i - b.i); });
    const resto = ordem.length - max;
    return '<ul class="produtos-edital" aria-label="Produtos pedidos">' +
      ordem.slice(0, max).map(function (x) {
        return '<li class="' + (x.casou ? 'casou' : '') + '">' + (x.casou ? '✓ ' : '') + esc(x.item.nome) + '</li>';
      }).join('') +
      (resto > 0 ? '<li>+ ' + resto + ' itens</li>' : '') +
      '</ul>';
  }

  function htmlProgresso(edital) {
    const p = progressoChecklist(edital);
    return '<div class="progresso">' +
      '<div class="progresso__barra" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + p.percentual + '" aria-label="Documentos prontos"><span style="width:' + p.percentual + '%"></span></div>' +
      '<span class="progresso__txt">📄 Documentos prontos: <strong>' + p.feitos + ' de ' + p.total + '</strong></span>' +
      '</div>';
  }

  function htmlCartao(edital, opcoes) {
    const prazo = calcularPrazo(edital);
    const match = calcularMatch(edital);
    const seguindo = estaSeguindo(edital.id);
    const classes = ['cartao', 'edital'];
    if (prazo.encerrado) classes.push('edital--encerrado');
    else if (prazo.classe === 'urgente') classes.push('edital--urgente');
    else if (prazo.classe === 'alerta') classes.push('edital--alerta');
    else if (prazo.classe === 'neutro') classes.push('edital--neutro');
    const nItens = Array.isArray(edital.itens) ? String(edital.itens.length) : (estado.itensCarregando.has(edital.id) ? '…' : '—');

    return '<article class="' + classes.join(' ') + '" data-id="' + esc(edital.id) + '">' +
      htmlSelosTopo(edital, prazo) +
      '<h2 class="edital__titulo">' + esc(edital.titulo) + '</h2>' +
      '<p class="edital__orgao">🏛️ ' + esc(edital.orgao) + '</p>' +
      (opcoes.compacto || !edital.resumo ? '' : '<p class="edital__resumo">' + esc(edital.resumo) + '</p>') +
      '<dl class="edital__dados">' +
        '<div><dt>Data limite</dt><dd>' + esc(prazo.dataTexto) + '</dd></div>' +
        '<div><dt>Valor estimado</dt><dd>' + formatarValor(edital.valor_estimado) + '</dd></div>' +
        '<div><dt>Itens pedidos</dt><dd>' + nItens + '</dd></div>' +
        '<div><dt>Programa</dt><dd>' + esc(edital.programa) + '</dd></div>' +
      '</dl>' +
      htmlMatch(edital, match) +
      (opcoes.compacto ? '' : htmlProdutos(edital, match)) +
      (opcoes.mostrarProgresso ? htmlProgresso(edital) : '') +
      '<div class="edital__acoes">' +
        '<button type="button" class="btn btn--secundario" data-acao="detalhes">' + (opcoes.mostrarProgresso ? '📄 Checklist' : 'Ver detalhes') + '</button>' +
        (prazo.encerrado && !seguindo
          ? ''
          : '<button type="button" class="btn ' + (seguindo ? 'btn--seguindo' : 'btn--primario') + '" data-acao="seguir" aria-pressed="' + seguindo + '">' +
            (seguindo ? '★ Acompanhando' : '☆ Quero Participar') + '</button>') +
      '</div>' +
      '</article>';
  }

  // ------------------------------------------------------------------
  // Aba Radar
  // ------------------------------------------------------------------
  function lerFiltros() {
    return {
      busca: normalizar(document.getElementById('f-busca').value),
      programa: document.getElementById('f-programa').value,
      municipio: document.getElementById('f-municipio').value,
      ordem: document.getElementById('f-ordem').value,
      compativeis: document.getElementById('f-compativeis').checked,
      encerrados: document.getElementById('f-encerrados').checked
    };
  }

  function textoBusca(edital) {
    return normalizar([
      edital.titulo, edital.orgao, edital.programa, edital.municipio, edital.resumo
    ].concat((edital.itens || []).map(function (i) { return i.nome; })).join(' '));
  }

  function renderizarRadar() {
    if (estado.fonte === 'carregando' && !estado.editais.length) return;
    const f = lerFiltros();
    const temProdutos = (estado.perfil.produtos || []).length > 0;
    document.getElementById('aviso-perfil').hidden = temProdutos;

    let lista = estado.editais.map(function (e) {
      return { edital: e, prazo: calcularPrazo(e), match: calcularMatch(e) };
    });

    const encerradosOcultos = lista.filter(function (x) { return x.prazo.encerrado; }).length;

    lista = lista.filter(function (x) {
      const e = x.edital;
      if (!f.encerrados && x.prazo.encerrado) return false;
      if (f.programa && e.programa !== f.programa) return false;
      if (f.municipio && e.municipio !== f.municipio) return false;
      if (f.compativeis && x.match.quantidade === 0) return false;
      if (f.busca) {
        const alvo = textoBusca(e);
        if (!f.busca.split(' ').every(function (t) { return alvo.indexOf(t) !== -1; })) return false;
      }
      return true;
    });

    lista.sort(function (a, b) {
      // Encerrados sempre por último
      if (a.prazo.encerrado !== b.prazo.encerrado) return a.prazo.encerrado ? 1 : -1;
      if (f.ordem === 'match') {
        return (b.match.valorPotencial - a.match.valorPotencial) || (b.match.quantidade - a.match.quantidade) || compararPrazo(a.prazo, b.prazo);
      }
      if (f.ordem === 'valor') return (Number(b.edital.valor_estimado) || 0) - (Number(a.edital.valor_estimado) || 0);
      return compararPrazo(a.prazo, b.prazo);
    });

    const alvo = document.getElementById('lista-radar');
    const resumo = document.getElementById('resumo-radar');

    if (!lista.length) {
      resumo.textContent = '';
      const carregandoItens = f.compativeis && estado.itensCarregando.size > 0;
      alvo.innerHTML = '<div class="cartao vazio"><span class="vazio__icone" aria-hidden="true">🌾</span>' +
        '<p>' + (carregandoItens ? '⏳ Conferindo os itens dos editais com a sua produção…' : 'Nenhum edital encontrado com esses filtros.') + '</p>' +
        '<button type="button" class="btn btn--secundario" id="btn-limpar-filtros">Limpar filtros</button></div>';
      return;
    }

    const compat = lista.filter(function (x) { return x.match.quantidade > 0; }).length;
    let txt = lista.length + (lista.length === 1 ? ' edital encontrado' : ' editais encontrados');
    if (temProdutos) txt += ' · ' + compat + ' compatíve' + (compat === 1 ? 'l' : 'is') + ' com sua produção';
    if (!f.encerrados && encerradosOcultos) txt += ' · ' + encerradosOcultos + ' encerrado' + (encerradosOcultos === 1 ? '' : 's') + ' oculto' + (encerradosOcultos === 1 ? '' : 's');
    if (estado.itensCarregando.size) txt += ' · ⏳ conferindo itens…';
    resumo.textContent = txt;

    alvo.innerHTML = lista.map(function (x) { return htmlCartao(x.edital, {}); }).join('');
  }

  function preencherMunicipios() {
    const municipios = Array.from(new Set(estado.editais.map(function (e) { return e.municipio; }))).sort(function (a, b) { return a.localeCompare(b, 'pt-BR'); });
    const sel = document.getElementById('f-municipio');
    const atual = sel.value;
    sel.innerHTML = '<option value="">Todos</option>' + municipios.map(function (m) {
      return '<option value="' + esc(m) + '">' + esc(m) + '</option>';
    }).join('');
    sel.value = municipios.indexOf(atual) !== -1 ? atual : '';

    document.getElementById('lista-municipios').innerHTML = municipios.map(function (m) {
      return '<option value="' + esc(m) + '">';
    }).join('');
  }

  // ------------------------------------------------------------------
  // Aba Meus Editais
  // ------------------------------------------------------------------
  function renderizarMeus() {
    const seguidos = estado.seguindo
      .map(editalPorId)
      .filter(Boolean)
      .map(function (e) { return { edital: e, prazo: calcularPrazo(e) }; })
      .sort(function (a, b) {
        if (a.prazo.encerrado !== b.prazo.encerrado) return a.prazo.encerrado ? 1 : -1;
        return compararPrazo(a.prazo, b.prazo);
      });

    document.getElementById('contador-meus').textContent = seguidos.length;

    const alvo = document.getElementById('lista-meus');
    const resumo = document.getElementById('resumo-meus');

    if (!seguidos.length) {
      resumo.textContent = '';
      alvo.innerHTML = '<div class="cartao vazio"><span class="vazio__icone" aria-hidden="true">📋</span>' +
        '<p>Você ainda não está acompanhando nenhum edital.<br>Toque em <strong>☆ Quero Participar</strong> no Radar para montar sua lista e o checklist de documentos.</p>' +
        '<button type="button" class="btn btn--primario" data-ir-aba="radar">🔍 Ir para o Radar</button></div>';
      return;
    }

    const proximo = seguidos.find(function (x) { return !x.prazo.encerrado && !x.prazo.semData; });
    let txt = 'Acompanhando ' + seguidos.length + (seguidos.length === 1 ? ' edital' : ' editais') + '.';
    if (proximo) {
      txt += ' Próximo prazo: ' + proximo.edital.municipio + ' (' + proximo.prazo.rotulo.replace(/^\S+\s/, '').toLowerCase() + ').';
    }
    resumo.textContent = txt;

    alvo.innerHTML = seguidos.map(function (x) { return htmlCartao(x.edital, { compacto: true, mostrarProgresso: true }); }).join('');
  }

  // ------------------------------------------------------------------
  // Modal de detalhes
  // ------------------------------------------------------------------
  let editalAberto = null;

  function htmlChecklist(edital) {
    const marcados = estado.checklists[edital.id] || {};
    return '<ul class="checklist">' + documentosPara(edital).map(function (d) {
      return '<li><label><input type="checkbox" data-doc="' + esc(d.id) + '"' + (marcados[d.id] ? ' checked' : '') + '>' +
        '<span>' + esc(d.nome) + (d.obs ? '<small>' + esc(d.obs) + '</small>' : '') + '</span></label></li>';
    }).join('') + '</ul>';
  }

  function htmlTabelaItens(edital, match) {
    if (estado.itensCarregando.has(edital.id)) {
      return '<p class="ajuda" style="margin:0">⏳ Carregando itens do PNCP…</p>';
    }
    if (estado.itensErro.has(edital.id)) {
      return '<p class="ajuda" style="margin:0">Não foi possível carregar os itens do PNCP. ' +
        '<button type="button" class="link-btn" data-acao="recarregar-itens">Tentar de novo</button></p>';
    }
    if (!Array.isArray(edital.itens)) return '<p class="ajuda" style="margin:0">Itens ainda não carregados.</p>';
    if (!edital.itens.length) return '<p class="ajuda" style="margin:0">O PNCP não listou itens para esta contratação. Confira no edital completo.</p>';

    const linhas = edital.itens.map(function (item, i) {
      const casou = match.indices.has(i);
      const total = (Number(item.quantidade) || 0) * (Number(item.preco_ref) || 0);
      return '<tr class="' + (casou ? 'casou' : '') + '"' + (item.descricao ? ' title="' + esc(item.descricao) + '"' : '') + '>' +
        '<td>' + (casou ? '✓ ' : '') + esc(item.nome) + '</td>' +
        '<td class="num">' + numero.format(Number(item.quantidade) || 0) + ' ' + esc(item.unidade) + '</td>' +
        '<td class="num">' + formatarValor(item.preco_ref) + '</td>' +
        '<td class="num">' + formatarValor(total) + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="tabela-wrap"><table class="tabela"><thead><tr><th>Produto</th><th class="num">Quantidade</th><th class="num">Preço ref.</th><th class="num">Total</th></tr></thead>' +
      '<tbody>' + linhas + '</tbody></table></div>';
  }

  function renderizarModal() {
    const edital = editalAberto;
    if (!edital) return;
    const prazo = calcularPrazo(edital);
    const match = calcularMatch(edital);
    const seguindo = estaSeguindo(edital.id);
    const link = limparLink(edital.link_pdf);
    const nItens = Array.isArray(edital.itens) ? edital.itens.length : '—';

    // Preserva a rolagem ao re-renderizar (ex.: quando os itens chegam)
    const modal = document.getElementById('modal');
    const rolagem = modal.scrollTop;

    document.getElementById('modal-corpo').innerHTML =
      '<div class="modal__cab"><h2 id="modal-titulo">' + esc(edital.titulo) + '</h2>' +
        '<button type="button" class="fechar" data-acao="fechar" aria-label="Fechar">✕</button></div>' +
      htmlSelosTopo(edital, prazo) +
      '<p class="edital__orgao">🏛️ ' + esc(edital.orgao) + '</p>' +
      (edital.resumo ? '<p class="edital__resumo">' + esc(edital.resumo) + '</p>' : '') +
      '<dl class="edital__dados">' +
        '<div><dt>Data limite</dt><dd>' + esc(prazo.dataTexto) + '</dd></div>' +
        '<div><dt>Valor estimado</dt><dd>' + formatarValor(edital.valor_estimado) + '</dd></div>' +
        '<div><dt>Itens</dt><dd>' + nItens + '</dd></div>' +
        '<div><dt>Seus itens</dt><dd>' + (match.porTexto ? '—' : match.quantidade) + '</dd></div>' +
      '</dl>' +
      htmlMatch(edital, match) +
      '<h3>🥬 Produtos pedidos</h3>' +
      htmlTabelaItens(edital, match) +
      '<h3>📄 Checklist de documentos</h3>' +
      (seguindo
        ? htmlProgresso(edital) + htmlChecklist(edital)
        : '<p class="ajuda" style="margin:0">Toque em <strong>Quero Participar</strong> para salvar este edital e marcar os documentos que você já tem.</p>') +
      '<div class="edital__acoes">' +
        (link ? '<a class="btn btn--secundario" href="' + esc(link) + '" target="_blank" rel="noopener noreferrer">' +
          (edital.fonte === 'pncp' ? '🔗 Ver no PNCP' : '📥 Edital (PDF)') + '</a>' : '') +
        (prazo.encerrado && !seguindo
          ? ''
          : '<button type="button" class="btn ' + (seguindo ? 'btn--seguindo' : 'btn--primario') + '" data-acao="seguir" aria-pressed="' + seguindo + '">' +
            (seguindo ? '★ Acompanhando' : '☆ Quero Participar') + '</button>') +
        (seguindo ? '<button type="button" class="btn btn--perigo" data-acao="deixar">Deixar de acompanhar</button>' : '') +
      '</div>';

    modal.scrollTop = rolagem;
  }

  function abrirModal(id) {
    editalAberto = editalPorId(id);
    if (!editalAberto) return;
    const modal = document.getElementById('modal');
    buscarItens(editalAberto);
    renderizarModal();
    if (typeof modal.showModal === 'function') {
      if (!modal.open) modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
    modal.scrollTop = 0;
  }

  function fecharModal() {
    const modal = document.getElementById('modal');
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
    editalAberto = null;
  }

  // ------------------------------------------------------------------
  // Aba Perfil
  // ------------------------------------------------------------------
  function produtosEditando() {
    if (!estado.produtosRascunho) estado.produtosRascunho = (estado.perfil.produtos || []).slice();
    return estado.produtosRascunho;
  }

  function renderizarEtiquetas() {
    const produtos = produtosEditando();
    document.getElementById('p-produtos').innerHTML = produtos.length
      ? produtos.map(function (p, i) {
          return '<li>' + esc(p) + '<button type="button" data-remover="' + i + '" aria-label="Remover ' + esc(p) + '">✕</button></li>';
        }).join('')
      : '<li style="background:none;color:var(--texto-suave);padding-left:0;font-weight:400">Nenhum produto cadastrado ainda.</li>';

    const jaTem = new Set(produtos.map(normalizar));
    document.getElementById('p-sugestoes').innerHTML = SUGESTOES_PRODUTOS
      .filter(function (s) { return !jaTem.has(normalizar(s)); })
      .slice(0, 14)
      .map(function (s) { return '<button type="button" data-sugestao="' + esc(s) + '">+ ' + esc(s) + '</button>'; })
      .join('');
  }

  function preencherListaProdutos() {
    const nomes = new Set(SUGESTOES_PRODUTOS);
    estado.editais.forEach(function (e) { (e.itens || []).forEach(function (i) { nomes.add(i.nome); }); });
    document.getElementById('lista-produtos').innerHTML = Array.from(nomes).sort(function (a, b) { return a.localeCompare(b, 'pt-BR'); })
      .map(function (n) { return '<option value="' + esc(n) + '">'; }).join('');
  }

  function adicionarProduto(nome) {
    const limpo = String(nome || '').trim().replace(/\s+/g, ' ');
    if (!limpo) return;
    const produtos = produtosEditando();
    // Permite adicionar vários separados por vírgula
    limpo.split(/[,;]/).map(function (s) { return s.trim(); }).filter(Boolean).forEach(function (p) {
      if (!produtos.some(function (x) { return normalizar(x) === normalizar(p); })) {
        produtos.push(p.charAt(0).toUpperCase() + p.slice(1));
      }
    });
    renderizarEtiquetas();
  }

  function preencherFormPerfil() {
    const p = estado.perfil;
    estado.produtosRascunho = null;
    document.getElementById('p-nome').value = p.nome || '';
    document.getElementById('p-municipio').value = p.municipio || '';
    document.getElementById('p-uf').value = p.uf || 'ES';
    document.getElementById('p-caf').checked = !!p.caf;
    const radio = document.querySelector('input[name="p-tipo"][value="' + (p.tipo || 'individual') + '"]');
    if (radio) radio.checked = true;
    renderizarEtiquetas();
  }

  function salvarPerfil() {
    const pendente = document.getElementById('p-produto-novo');
    if (pendente.value.trim()) { adicionarProduto(pendente.value); pendente.value = ''; }

    const ufAnterior = estado.perfil.uf || 'ES';
    const tipo = document.querySelector('input[name="p-tipo"]:checked');
    estado.perfil = {
      nome: document.getElementById('p-nome').value.trim(),
      municipio: document.getElementById('p-municipio').value.trim(),
      uf: document.getElementById('p-uf').value || 'ES',
      tipo: tipo ? tipo.value : 'individual',
      caf: document.getElementById('p-caf').checked,
      produtos: produtosEditando().slice()
    };
    salvar(CHAVES.perfil, estado.perfil);
    estado.produtosRascunho = null;

    const ok = document.getElementById('perfil-ok');
    ok.textContent = estado.perfil.uf !== ufAnterior
      ? '✅ Perfil salvo! Buscando editais de ' + estado.perfil.uf + ' no PNCP…'
      : '✅ Perfil salvo!';
    ok.hidden = false;
    clearTimeout(salvarPerfil._t);
    salvarPerfil._t = setTimeout(function () { ok.hidden = true; }, 3000);

    if (estado.perfil.uf !== ufAnterior) carregarEditais();
    else renderizarTudo();
  }

  function apagarDados() {
    if (!confirm('Apagar seu perfil, os editais acompanhados e todos os checklists deste aparelho?')) return;
    const ufAnterior = estado.perfil.uf || 'ES';
    Object.keys(CHAVES).forEach(function (k) { localStorage.removeItem(CHAVES[k]); });
    estado.perfil = Object.assign({}, PERFIL_PADRAO);
    estado.seguindo = [];
    estado.seguindoDados = {};
    estado.checklists = {};
    preencherFormPerfil();
    if (ufAnterior !== estado.perfil.uf) carregarEditais();
    else renderizarTudo();
  }

  // ------------------------------------------------------------------
  // Abas
  // ------------------------------------------------------------------
  function irParaAba(nome) {
    document.querySelectorAll('.aba').forEach(function (b) {
      const ativa = b.dataset.aba === nome;
      b.classList.toggle('ativa', ativa);
      b.setAttribute('aria-selected', ativa);
    });
    document.querySelectorAll('.painel').forEach(function (p) {
      p.hidden = p.id !== 'painel-' + nome;
    });
    if (nome === 'perfil') preencherFormPerfil();
    if (location.hash !== '#' + nome) history.replaceState(null, '', '#' + nome);
    window.scrollTo(0, 0);
  }

  // ------------------------------------------------------------------
  // Eventos
  // ------------------------------------------------------------------
  function ligarEventos() {
    document.querySelectorAll('.aba').forEach(function (b) {
      b.addEventListener('click', function () { irParaAba(b.dataset.aba); });
    });

    // Navegação por teclado entre abas (setas)
    document.querySelector('.abas').addEventListener('keydown', function (ev) {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      const abas = Array.from(document.querySelectorAll('.aba'));
      const i = abas.indexOf(document.activeElement);
      if (i === -1) return;
      const prox = abas[(i + (ev.key === 'ArrowRight' ? 1 : abas.length - 1)) % abas.length];
      prox.focus();
      irParaAba(prox.dataset.aba);
    });

    document.body.addEventListener('click', function (ev) {
      const irAba = ev.target.closest('[data-ir-aba]');
      if (irAba) { irParaAba(irAba.dataset.irAba); return; }

      if (ev.target.closest('#btn-limpar-filtros')) {
        document.getElementById('filtros').reset();
        renderizarRadar();
        return;
      }

      const botao = ev.target.closest('[data-acao]');
      if (!botao) return;
      const acao = botao.dataset.acao;
      const cartao = botao.closest('[data-id]');
      const id = cartao ? cartao.dataset.id : (editalAberto && editalAberto.id);

      if (acao === 'atualizar') carregarEditais();
      else if (acao === 'detalhes' && id) abrirModal(id);
      else if (acao === 'seguir' && id) alternarSeguindo(id);
      else if (acao === 'deixar' && id) {
        if (confirm('Deixar de acompanhar este edital? O checklist marcado continuará salvo caso você volte a acompanhá-lo.')) alternarSeguindo(id);
      } else if (acao === 'recarregar-itens' && editalAberto) {
        buscarItens(editalAberto);
        renderizarModal();
      } else if (acao === 'fechar') fecharModal();
    });

    // Filtros
    document.getElementById('f-busca').addEventListener('input', renderizarRadar);
    ['f-programa', 'f-municipio', 'f-ordem', 'f-compativeis', 'f-encerrados'].forEach(function (id) {
      document.getElementById(id).addEventListener('change', renderizarRadar);
    });

    // Modal: checklist e fechar ao clicar fora
    const modal = document.getElementById('modal');
    modal.addEventListener('change', function (ev) {
      const doc = ev.target.dataset && ev.target.dataset.doc;
      if (!doc || !editalAberto) return;
      const id = editalAberto.id;
      estado.checklists[id] = estado.checklists[id] || {};
      if (ev.target.checked) estado.checklists[id][doc] = true;
      else delete estado.checklists[id][doc];
      salvar(CHAVES.checklists, estado.checklists);
      // Atualiza só a barra de progresso do modal (mantém foco no checkbox)
      const prog = modal.querySelector('.progresso');
      if (prog) prog.outerHTML = htmlProgresso(editalAberto);
      renderizarMeus();
    });
    modal.addEventListener('click', function (ev) {
      if (ev.target === modal) fecharModal();
    });
    modal.addEventListener('close', function () { editalAberto = null; });

    // Perfil
    const inputProduto = document.getElementById('p-produto-novo');
    document.getElementById('btn-add-produto').addEventListener('click', function () {
      adicionarProduto(inputProduto.value);
      inputProduto.value = '';
      inputProduto.focus();
    });
    inputProduto.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        adicionarProduto(inputProduto.value);
        inputProduto.value = '';
      }
    });
    document.getElementById('p-produtos').addEventListener('click', function (ev) {
      const b = ev.target.closest('[data-remover]');
      if (!b) return;
      produtosEditando().splice(Number(b.dataset.remover), 1);
      renderizarEtiquetas();
    });
    document.getElementById('p-sugestoes').addEventListener('click', function (ev) {
      const b = ev.target.closest('[data-sugestao]');
      if (b) adicionarProduto(b.dataset.sugestao);
    });
    document.getElementById('form-perfil').addEventListener('submit', function (ev) {
      ev.preventDefault();
      salvarPerfil();
    });
    document.getElementById('btn-limpar').addEventListener('click', apagarDados);

    // Sincroniza entre abas do navegador
    window.addEventListener('storage', function (ev) {
      if (!ev.key || ev.key.indexOf('radarEditais.') !== 0) return;
      const ufAnterior = estado.perfil.uf;
      estado.perfil = Object.assign({}, PERFIL_PADRAO, carregar(CHAVES.perfil, {}));
      estado.seguindo = carregar(CHAVES.seguindo, []);
      estado.seguindoDados = carregar(CHAVES.seguindoDados, {});
      estado.checklists = carregar(CHAVES.checklists, {});
      if (estado.perfil.uf !== ufAnterior) carregarEditais();
      else renderizarTudo();
    });
  }

  // ------------------------------------------------------------------
  // Inicialização
  // ------------------------------------------------------------------
  function renderizarTudo() {
    if (estado.fonte !== 'carregando') sincronizarSeguidos();
    renderizarFonte();
    renderizarRadar();
    renderizarMeus();
    if (editalAberto) renderizarModal();
  }

  function iniciar() {
    document.getElementById('p-uf').innerHTML = UFS.map(function (uf) {
      return '<option value="' + uf + '">' + uf + '</option>';
    }).join('');
    ligarEventos();
    const aba = (location.hash || '').replace('#', '');
    irParaAba(['radar', 'meus', 'perfil'].indexOf(aba) !== -1 ? aba : 'radar');
    renderizarMeus(); // "Meus Editais" funciona com as cópias salvas enquanto o PNCP carrega
    carregarEditais();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
