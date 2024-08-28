/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/debounce.js":
/*!********************************!*\
  !*** ./js/modules/debounce.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ debounce)\n/* harmony export */ });\nfunction debounce(callback, delay) {\n  let timer;\n  return (...args) => {\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => {\n      callback(...args);\n      timer = null;\n    }, delay);\n  };\n}\n\n//# sourceURL=webpack://axios/./js/modules/debounce.js?");

/***/ }),

/***/ "./js/modules/pokemon.js":
/*!*******************************!*\
  !*** ./js/modules/pokemon.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PokemonFunction)\n/* harmony export */ });\n/* harmony import */ var _debounce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debounce.js */ \"./js/modules/debounce.js\");\n\nclass PokemonFunction {\n  constructor(listWrapper, maxPokemon = 151, itemPerPage = 14, searchInput = \"#search-input\", typeWrapper = \"#type-wrapper\") {\n    // Número máximo de Pokémon a serem exibidos\n    this.MAX_POKEMON = maxPokemon;\n    // Seleciona o elemento que contém a lista de Pokémon\n    this.listWrapper = document.querySelector(listWrapper);\n    // Seleciona o elemento de entrada de pesquisa\n    this.searchInput = document.querySelector(searchInput);\n    this.activeClass = \"ativo\";\n    // Seleciona o elemento que contém os tipos de Pokémon\n    this.typeWrapper = document.querySelector(typeWrapper);\n\n    // Seleciona o elemento de filtro de tipo\n    this.typeFilterWrap = document.querySelector(\".type-filter-wrap\");\n\n    // Seleciona o elemento de mensagem de não encontrado\n    this.notFoundMessage = document.getElementById(\"not-found-message\");\n    // Seleciona o botão de fechar\n    this.closeButton = document.querySelector(\".search-close-icon\");\n    // Seleciona o wrapper de filtro\n    this.filterWrapper = document.querySelector(\".filter-wrapper\");\n    this.pokemonData = []; // Variável para armazenar os dados dos Pokémon\n\n    this.filtroType = []; // Variável para armazenar os tipos de Pokémon\n\n    // Variáveis para armazenar o estado atual da página\n    this.currentPage = 1;\n    // Número de itens por página\n    this.itemsPerPage = itemPerPage;\n\n    // Vincula o this para os métodos\n    this.clearSearch = this.clearSearch.bind(this);\n    this.toggleTypeFiltro = this.toggleTypeFiltro.bind(this);\n    this.aplicarFiltros = this.aplicarFiltros.bind(this);\n\n    // Cores dos tipos de Pokémon\n    this.typeColors = {\n      normal: \"#A8A878\",\n      fire: \"#F08030\",\n      water: \"#6890F0\",\n      electric: \"#F8D030\",\n      grass: \"#78C850\",\n      ice: \"#98D8D8\",\n      fighting: \"#C03028\",\n      poison: \"#A040A0\",\n      ground: \"#E0C068\",\n      flying: \"#A890F0\",\n      psychic: \"#F85888\",\n      bug: \"#A8B820\",\n      rock: \"#B8A038\",\n      ghost: \"#705898\",\n      dragon: \"#7038F8\",\n      dark: \"#705848\",\n      steel: \"#B8B8D0\",\n      dark: \"#EE99AC\",\n      fairy: \"#EE99AC\"\n    };\n\n    // Inicializa o modal\n    this.modal = document.getElementById(\"pokemonModal\");\n    this.modalContent = document.querySelector(\".modal-content\");\n    this.modalDetails = document.getElementById(\"pokemonDetails\");\n    this.closeButtonModal = document.querySelector(\".close\");\n    this.closeButtonModal.onclick = () => {\n      this.modal.style.display = \"none\";\n    };\n    window.onclick = event => {\n      if (event.target == this.modal) {\n        this.modal.style.display = \"none\";\n      }\n    };\n\n    // Adiciona o evento de clique ao botão de limpar filtro\n    this.clearFilterButton = document.getElementById(\"clear-filter-button\");\n    this.clearFilterButton.addEventListener(\"click\", () => this.limparFiltro());\n    this.verificarTamanhoTela(itemPerPage);\n    window.addEventListener(\"resize\", (0,_debounce_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(() => this.verificarTamanhoTela(itemPerPage), 500));\n  }\n\n  // Função para aplicar cores nas divs de acordo com o tipo de Pokémon\n  aplicarCoresNosLabels() {\n    const divs = this.typeWrapper.querySelectorAll(\".type-wrap > div\");\n    divs.forEach(div => {\n      const tipo = div.getAttribute(\"data-type\");\n      const cor = this.typeColors[tipo];\n      if (cor) {\n        div.style.setProperty(\"--cor-principal\", cor);\n      }\n    });\n  }\n\n  // Função para converter o valor hexadecimal em RGB\n  hexParaRgb(hexColor, alpha = 1.0) {\n    // Remove o símbolo '#' se estiver presente\n    hexColor = hexColor.replace(\"#\", \"\");\n\n    // Verifica se o hexadecimal tem 3 dígitos e expande para 6 dígitos\n    if (hexColor.length === 3) {\n      hexColor = hexColor.split(\"\").map(char => char + char).join(\"\");\n    }\n\n    // Verifica se o hexadecimal agora tem 6 dígitos\n    if (hexColor.length !== 6) {\n      throw new Error(\"Entrada inválida. Use um valor hexadecimal de 3 ou 6 caracteres.\");\n    }\n    const r = parseInt(hexColor.slice(0, 2), 16);\n    const g = parseInt(hexColor.slice(2, 4), 16);\n    const b = parseInt(hexColor.slice(4, 6), 16);\n    return `rgba(${r}, ${g}, ${b}, ${alpha})`;\n  }\n\n  // Função para criar os cards dos Pokémon\n  async criarPokemon(pokemonData) {\n    this.filtroType = pokemonData; // Define o filtro de tipo como os dados dos Pokémon\n    // Função para renderizar a página atual de acordo com o número da página e os dados dos Pokémon\n    const renderizarPagina = pagina => {\n      // Calcula o índice do último item e do primeiro item da página\n      const indexUltimoItem = pagina * this.itemsPerPage;\n      // O índice do primeiro item é o índice do último item menos o número de itens por página\n      const indexPrimeiroItem = indexUltimoItem - this.itemsPerPage;\n      // Slice os dados dos Pokémon com base no índice do primeiro e último item\n      const pokemonAtual = pokemonData.slice(indexPrimeiroItem, indexUltimoItem);\n      this.listWrapper.innerHTML = \"\"; // Reseta o innerHTML quando executado\n\n      const fragment = document.createDocumentFragment(); // Cria um fragmento de documento\n\n      // Itere sobre os dados dos Pokémon para criar os elementos do DOM\n      pokemonAtual.forEach(pokemon => {\n        try {\n          const div = document.createElement(\"div\");\n          div.classList.add(\"pokemon-card\");\n          div.setAttribute(\"data-id\", pokemon.id); // Adiciona o ID do Pokémon como atributo\n\n          const {\n            name,\n            types,\n            id,\n            weight,\n            height,\n            stats,\n            abilities\n          } = pokemon;\n          const tipoPrincipal = types[0].type.name;\n          const tipoSecundario = types[1] ? types[1].type.name : null;\n          const corPrincipal = this.typeColors[tipoPrincipal];\n          const corSecundaria = this.typeColors[tipoSecundario];\n          div.style.setProperty(\"--identidade-primaria-fosca\", this.hexParaRgb(corPrincipal, 0.3));\n          div.style.setProperty(\"--identidade-primaria\", corPrincipal);\n          div.innerHTML = `\n          <div class=\"number-wrap\">\n              <p class=\"caption-fonts\">#${id}</p>\n          </div>\n          <div class=\"img-wrap\">\n              <img src=\"${pokemon.sprites.other.dream_world.front_default}\" alt=\"${name}\"/>\n          </div>\n          <div class=\"name-wrap\">\n          <div class=\"p-type\">\n              <p class=\"body3-fonts\">${name}</p>\n          </div>\n          </div>\n        `;\n\n          // Adiciona um evento de clique para redirecionar para a página de detalhes\n          div.addEventListener(\"click\", event => {\n            const pokemonId = event.currentTarget.getAttribute(\"data-id\");\n            this.exibirDetalhesPokemon(pokemonId);\n          });\n          fragment.appendChild(div); // Adiciona o card ao fragmento\n        } catch (error) {\n          console.error(\"Erro ao criar o card do Pokémon:\", error);\n        }\n      });\n      // Usa requestAnimationFrame para otimizar a atualização do DOM\n      requestAnimationFrame(() => {\n        this.listWrapper.appendChild(fragment); // Adiciona o fragmento ao DOM\n      });\n    };\n    const adicionarBotoesNavegacao = numeroPaginas => {\n      // Cria um container de navegação se não existir\n      let navContainer = document.querySelector(\".pagination\");\n      // Verifica se há apenas uma página e remove o container de navegação\n      if (numeroPaginas === 1) {\n        navContainer.innerHTML = \"\";\n      } else {\n        // Se houver mais de uma página, adicione os botões de navegação\n        // Verifica se o container de navegação já existe\n        if (!navContainer) {\n          navContainer = document.createElement(\"div\");\n          navContainer.classList.add(\"pagination\");\n          document.body.appendChild(navContainer);\n        } else {\n          // Limpa o container de navegação se já existir\n          navContainer.innerHTML = \"\";\n        }\n\n        // Botão de página anterior\n        const prevButton = document.createElement(\"button\");\n        prevButton.textContent = \"<\";\n        prevButton.classList.add(\"pag-arrow\");\n        prevButton.classList.add(\"arrow-left\");\n        prevButton.addEventListener(\"click\", () => {\n          if (this.currentPage > 1) {\n            this.currentPage--;\n            renderizarPagina(this.currentPage);\n            atualizarBotoesAtivos();\n          } else {\n            // Vai para a última página se a página atual for a primeira\n            this.currentPage = numeroPaginas;\n            renderizarPagina(this.currentPage);\n            atualizarBotoesAtivos();\n          }\n        });\n        navContainer.appendChild(prevButton);\n\n        // Cria um botão para cada página\n        for (let i = 1; i <= numeroPaginas; i++) {\n          const button = document.createElement(\"button\");\n\n          // Adiciona a classe ativo ao botão da página atual\n          if (i === this.currentPage) {\n            button.classList.add(\"ativo\");\n          }\n          button.addEventListener(\"click\", () => {\n            // Atualiza a página atual\n            this.currentPage = i;\n            // Renderiza a página atual\n            renderizarPagina(this.currentPage);\n            // Remove a classe ativo de todos os botões e adiciona ao botão clicado\n            document.querySelectorAll(\".pagination button\").forEach(btn => btn.classList.remove(\"ativo\"));\n            button.classList.add(\"ativo\");\n          });\n          navContainer.appendChild(button);\n        }\n\n        // Botão de próxima página\n        const nextButton = document.createElement(\"button\");\n        nextButton.textContent = \">\";\n        nextButton.classList.add(\"pag-arrow\");\n        nextButton.classList.add(\"arrow-right\");\n        nextButton.addEventListener(\"click\", () => {\n          if (this.currentPage < numeroPaginas) {\n            this.currentPage++;\n            renderizarPagina(this.currentPage);\n            atualizarBotoesAtivos();\n          } else {\n            this.currentPage = 1;\n            renderizarPagina(this.currentPage);\n            atualizarBotoesAtivos();\n          }\n        });\n        navContainer.appendChild(nextButton);\n        document.querySelector(\".pokemon-list\").appendChild(navContainer);\n      }\n    };\n    const atualizarBotoesAtivos = () => {\n      document.querySelectorAll(\".pagination button\").forEach(btn => btn.classList.remove(\"ativo\"));\n      document.querySelectorAll(\".pagination button\")[this.currentPage].classList.add(\"ativo\");\n    };\n    this.currentPage = 1; // Redefine a página atual para a primeira página\n    // Calcula o número de páginas com base no número de Pokémon e no número de itens por página\n    const numeroPaginas = Math.ceil(pokemonData.length / this.itemsPerPage);\n    adicionarBotoesNavegacao(numeroPaginas);\n    renderizarPagina(this.currentPage);\n  }\n\n  // Função para exibir os detalhes do Pokémon\n  async exibirDetalhesPokemon(id) {\n    try {\n      this.currentPokemonId = id; // Armazena o ID do Pokémon atual\n\n      // Busca os dados do Pokémon e da espécie do Pokémon\n      const pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json());\n\n      //  Busca o texto de sabor em inglês\n      const flavorText = this.getEnglishFlavorText(pokemonSpecies);\n\n      // Busca os dados do Pokémon com base em um ID\n      const pokemon = this.filtroType.find(p => p.id == id);\n      // Desestrutura os dados do Pokémon\n      const {\n        name,\n        types,\n        weight,\n        height,\n        stats,\n        abilities,\n        sprites\n      } = pokemon;\n      const tipoPrincipal = types[0].type.name;\n      const tipoSecundario = types[1] ? types[1].type.name : null;\n      const corPrincipal = this.typeColors[tipoPrincipal];\n      const corSecundaria = this.typeColors[tipoSecundario];\n      const statNameMapping = {\n        hp: \"HP\",\n        attack: \"ATK\",\n        defense: \"DEF\",\n        \"special-attack\": \"SATK\",\n        \"special-defense\": \"SDEF\",\n        speed: \"SPD\"\n      };\n      if (!pokemon) {\n        console.error(\"Pokémon não encontrado\");\n        return;\n      }\n      // Atualiza o conteúdo do modal com os detalhes do Pokémon\n      this.modalDetails.innerHTML = `\n      \n      <div class=\"detail-card-detail-wrapper\">\n    <div class=\"header-wrapper\">\n      <div class=\"header-wrap\">\n        <div class=\"name-wrap\">\n          <h1 class=\"name\">${name}</h1>\n        </div>\n      </div>\n      <div class=\"pokemon-id-wrap\">\n        <p class=\"body2-fonts\">#${id}</p>\n      </div>\n    </div>\n    <div class=\"featured-img\">\n      <div class=\"detail-img-wrapper\">\n        <img src=\"${sprites.other.dream_world.front_default}\" alt=\"${name}\">\n      </div>\n    </div>\n    <div class=\"power-wrapper\">\n      ${types.map(type => `<p class=\"body3-fonts type ${type.type.name}\">${type.type.name}</p>`).join(\"\")}\n    </div>\n    <p class=\"body2-fonts about-text\">Sobre</p>\n    <div class=\"pokemon-detail-wrapper\">\n      <div class=\"pokemon-detail-wrap\">\n        <div class=\"pokemon-detail\">\n          <img src=\"./dist/assets/weight.svg\" alt=\"weight\">\n          <p class=\"body3-fonts weight\">${weight / 10}kg</p>\n        </div>\n        <p class=\"caption-fonts\">Peso</p>\n      </div>\n      <div class=\"pokemon-detail-wrap\">\n        <div class=\"pokemon-detail\">\n          <img src=\"./dist/assets/height.svg\" alt=\"height\">\n          <p class=\"body3-fonts height\">${height / 10}m</p>\n        </div>\n        <p class=\"caption-fonts\">Altura</p>\n      </div>\n      <div class=\"pokemon-detail-wrap\">\n        <div class=\"pokemon-detail move\">\n          ${abilities.map(ability => `<p>${ability.ability.name}</p>`).join(\"\")}\n        </div>\n        <p class=\"caption-fonts\">Habilidades</p>\n      </div>\n    </div>\n    <p class=\"body3-fonts pokemon-description\">${flavorText}</p>\n    <p class=\"body2-fonts about-text\">Base Stats</p>\n    <div class=\"stats-wrapper\">\n      ${stats.map(({\n        stat,\n        base_stat\n      }) => `\n        <div class=\"stats-wrap\" data-stat=\"${statNameMapping[stat.name]}\">\n          <p class=\"body3-fonts stats\">${statNameMapping[stat.name]}</p>\n          <p class=\"body3-fonts\">${base_stat}</p>\n          <progress value=\"${base_stat}\" max=\"100\" class=\"progress-bar\"></progress>\n        </div>\n      `).join(\"\")}\n    </div>\n  </div>`;\n      this.modal.style.display = \"flex\";\n      this.modalContent.style.setProperty(\"--identidade-primaria\", corPrincipal);\n      this.modalContent.style.setProperty(\"--identidade-secundaria\", corSecundaria);\n      this.modalContent.style.setProperty(\"--identidade-primaria-fosca\", this.hexParaRgb(corPrincipal, 0.3));\n    } catch (error) {\n      console.error(\"Erro ao exibir os detalhes do Pokémon:\", error);\n    }\n  }\n  getEnglishFlavorText(pokemonSpecies) {\n    for (let entry of pokemonSpecies.flavor_text_entries) {\n      if (entry.language.name === \"en\") {\n        let flavor = entry.flavor_text.replace(/\\f/g, \" \");\n        return flavor;\n      }\n    }\n    return \"\";\n  }\n  navegarPokemon(direcao) {\n    const currentIndex = this.filtroType.findIndex(p => p.id == this.currentPokemonId);\n    let newIndex = currentIndex + direcao;\n\n    // Verifica se o novo índice está dentro dos limites\n    if (newIndex < 0) {\n      newIndex = this.filtroType.length - 1; // Vai para o último Pokémon\n    } else if (newIndex >= this.filtroType.length) {\n      newIndex = 0; // Vai para o primeiro Pokémon\n    }\n    const newPokemonId = this.filtroType[newIndex].id;\n    this.exibirDetalhesPokemon(newPokemonId);\n  }\n\n  // Função para buscar os dados do Pokémon antes de redirecionar para a página de detalhes\n\n  async fetchPokemonDataBeforeRedirect(id) {\n    try {\n      // Use Promise.all para buscar os dados do Pokémon e da espécie do Pokémon\n      const [pokemon, pokemonSpecies] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()), fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => res.json())]);\n      return true;\n    } catch (error) {\n      console.error(\"Faiou\");\n    }\n  }\n\n  // Função para filtrar Pokémon por tipo\n  filtrarPokemonPorTipo(pokemonData, tipo) {\n    if (tipo === \"all\") {\n      return pokemonData;\n    }\n    return pokemonData.filter(pokemon => pokemon.types.some(t => t.type.name === tipo));\n  }\n\n  // Função para filtrar Pokémon por nome ou número\n  filtrarPokemonPorNomeOuNumero(pokemonData, searchTerm) {\n    if (!searchTerm) {\n      return pokemonData;\n    }\n    return pokemonData.filter(pokemon => {\n      const pokemonID = pokemon.id.toString();\n      const pokemonName = pokemon.name.toLowerCase();\n      return (\n        // Verifica se o ID ou o nome do Pokémon começa com o termo de pesquisa\n        pokemonID.startsWith(searchTerm) || pokemonName.startsWith(searchTerm)\n      );\n    });\n  }\n\n  // Função para filtrar os Pokémon com base na barra de pesquisa e no tipo selecionado\n\n  // Função para aplicar filtros baseados nos radio buttons selecionados e na barra de pesquisa\n  aplicarFiltros() {\n    const radioSelecionado = this.typeWrapper.querySelector('input[type=\"radio\"]:checked');\n    const tipoSelecionado = radioSelecionado ? radioSelecionado.value : \"all\";\n    const styleBody = getComputedStyle(document.body);\n    const identidadePadrao = styleBody.getPropertyValue(\"--identidade-primaria\");\n\n    // Define a cor principal com base no tipo selecionado\n    const tipoPrincipal = tipoSelecionado;\n    const corPrincipal = this.typeColors[tipoPrincipal];\n    if (tipoSelecionado !== \"all\") {\n      document.querySelector(\".pokemon-list\").style.setProperty(\"--identidade-primaria\", corPrincipal);\n      document.querySelector(\".pokemon-list\").style.setProperty(\"--identidade-primaria-fosca\", this.hexParaRgb(corPrincipal, 0.3));\n    } else {\n      document.querySelector(\".pokemon-list\").style.setProperty(\"--identidade-primaria\", identidadePadrao);\n      document.querySelector(\".pokemon-list\").style.setProperty(\"--identidade-primaria-fosca\", this.hexParaRgb(identidadePadrao, 0.3));\n    }\n    const searchTerm = this.searchInput.value.toLowerCase();\n\n    // Filtra os Pokémon com base no tipo selecionado\n    this.filtroType = this.filtrarPokemonPorTipo(this.pokemonData, tipoSelecionado);\n\n    // Filtra os Pokémon com base no termo de pesquisa\n    let pokemonFiltrado;\n\n    //  Filtra os Pokémon com base no tipo selecionado e no termo de pesquisa\n    pokemonFiltrado = this.filtrarPokemonPorNomeOuNumero(this.filtroType, searchTerm);\n    this.criarPokemon(pokemonFiltrado);\n    this.filtroType = pokemonFiltrado; // Define o filtro de tipo como os Pokémon filtrados\n    // Exibe a mensagem de não encontrado se não houver Pokémon correspondente\n    if (pokemonFiltrado.length === 0) {\n      this.notFoundMessage.style.display = \"block\";\n      // Limpa o container de navegação se não houver Pokémon correspondente\n      document.querySelector(\".pagination\").innerHTML = \"\";\n    } else {\n      this.notFoundMessage.style.display = \"none\";\n    }\n  }\n  limparFiltro() {\n    document.getElementById(\"all\").checked = true; // Marca o botão de todos os tipos\n\n    this.aplicarFiltros(); // Aplica os filtros a partir do estado atual que é todos os tipos e sem termo de pesquisa\n  }\n\n  // Função para buscar e armazenar os dados dos Pokémon\n  async fetchAndStorePokemonData() {\n    const loadingElement = document.getElementById(\"loading\");\n    loadingElement.style.display = \"block\"; // Mostra o elemento de carregamento\n\n    this.listWrapper.innerHTML = \"\"; // Reseta o innerHTML quando executado\n\n    // Cria um array de IDs de Pokémon de 1 a MAX_POKEMON\n    const pokemonIDs = Array.from({\n      length: this.MAX_POKEMON\n    }, (_, index) => index + 1);\n    try {\n      // Use Promise.all para buscar os dados de todos os Pokémon\n      const pokemonData = await Promise.all(pokemonIDs.map(async id => {\n        try {\n          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);\n          if (!response.ok) {\n            throw new Error(`Erro ao buscar dados do Pokémon com ID ${id}: ${response.statusText}`);\n          }\n          return await response.json();\n        } catch (error) {\n          console.error(`Erro ao buscar dados do Pokémon com ID ${id}:`, error);\n          return null; // Retorna null em caso de erro\n        }\n      }));\n\n      // Filtra os resultados nulos antes de continuar\n      this.pokemonData = pokemonData.filter(pokemon => pokemon !== null);\n      // Define o filtro de tipo como os dados dos Pokémon\n      this.filtroType = this.pokemonData;\n\n      // Chama a função criarPokemon com os dados dos Pokémon\n      this.criarPokemon(this.pokemonData);\n    } catch (error) {\n      console.error(\"Erro ao buscar dados dos Pokémon:\", error);\n    } finally {\n      loadingElement.style.display = \"none\"; // Oculta o elemento de carregamento\n    }\n  }\n\n  // Função para alternar a visibilidade do filtro de tipo\n  toggleTypeFiltro() {\n    // Alterna a classe ativa no wrapper do tipo\n    this.typeWrapper.classList.toggle(this.activeClass);\n    this.typeFilterWrap.classList.toggle(this.activeClass);\n    // Fecha o filtro se estiver aberto\n  }\n  // Função para limpar a barra de pesquisa\n  clearSearch() {\n    this.searchInput.value = \"\";\n\n    // Filtra os Pokémon com base no tipo selecionado\n    this.aplicarFiltros();\n    this.notFoundMessage.style.display = \"none\";\n    this.closeButton.classList.remove(\"search-close-icon-visible\");\n  }\n\n  // Função para lidar com a mudança de entrada\n  handleInputChange(inputElement) {\n    const inputValue = inputElement.value;\n    if (inputValue !== \"\") {\n      this.closeButton.classList.add(\"search-close-icon-visible\");\n    } else {\n      this.closeButton.classList.remove(\"search-close-icon-visible\");\n    }\n  }\n\n  // Função para verificar o tamanho da tela e ajustar o número de Pokémon exibidos\n\n  verificarTamanhoTela(itemPerPage) {\n    const larguraTela = window.innerWidth;\n    const alturaTela = window.innerHeight;\n    const larguraItem = 200; // Largura média de um item (ajuste conforme necessário)\n    const alturaItem = 200; // Altura média de um item (ajuste conforme necessário)\n    const margemItem = 34; // Margem média de um item (ajuste conforme necessário)\n\n    // Calcula o número de itens que cabem na tela\n    const itensPorLinha = Math.floor(larguraTela / (larguraItem + margemItem));\n    const linhasVisiveis = Math.floor(alturaTela / (alturaItem + margemItem));\n\n    // Calcula o número total de itens por página\n    itemPerPage = itensPorLinha * linhasVisiveis;\n    if (window.innerWidth <= 800) {\n      this.itemsPerPage = this.MAX_POKEMON; // Exibe todos os Pokémon em telas menores\n      // this.listWrapper.style.overflowY = \"scroll\";\n      this.listWrapper.style.height = \"auto\"; // Ajuste conforme necessário\n    } else {\n      this.itemsPerPage = itemPerPage; // Volta ao valor padrão em telas maiores\n      // this.listWrapper.style.overflowY = \"hidden\";\n      // this.listWrapper.style.height = \"auto\"; // Ajuste conforme necessário\n    }\n    this.criarPokemon(this.filtroType); // Recria a lista de Pokémon com o novo limite\n  }\n\n  // Função para adicionar os eventos\n  eventListeners() {\n    //  Adiciona evento de digitacao para a barra de pesquisa de acordo com os filtros e aplicando o debounce\n    this.searchInput.addEventListener(\"keyup\", (0,_debounce_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.aplicarFiltros, 100));\n\n    // Adiciona um evento de clique para limpar a barra de pesquisa\n    this.closeButton.addEventListener(\"click\", this.clearSearch);\n\n    // Adiciona um evento de clique para alternar a visibilidade do filtro de tipo\n    this.typeFilterWrap.addEventListener(\"click\", this.toggleTypeFiltro);\n    // Adiciona um evento de digitação para a barra de pesquisa para exibir e remover o botão de fechar e limpar a barra de pesquisa\n    this.searchInput.addEventListener(\"input\", () => {\n      this.handleInputChange(this.searchInput);\n    });\n    // Adiciona um evento de clique para o filtro de número\n    this.typeWrapper.addEventListener(\"change\", event => {\n      if (event.target.tagName === \"INPUT\" && event.target.type === \"radio\") {\n        this.aplicarFiltros();\n      }\n    });\n\n    // Adiciona event listeners aos botões de navegação\n    document.getElementById(\"prevPokemon\").addEventListener(\"click\", () => {\n      this.navegarPokemon(-1);\n    });\n    document.getElementById(\"nextPokemon\").addEventListener(\"click\", () => {\n      this.navegarPokemon(1);\n    });\n  }\n  async init() {\n    if (this.listWrapper) {\n      await this.fetchAndStorePokemonData();\n      this.aplicarCoresNosLabels();\n      this.eventListeners();\n      return this;\n    }\n  }\n}\n\n//# sourceURL=webpack://axios/./js/modules/pokemon.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_pokemon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/pokemon.js */ \"./js/modules/pokemon.js\");\n\nconst pokemon = new _modules_pokemon_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\".list-wrapper\", 500, 24);\npokemon.init();\n\n//# sourceURL=webpack://axios/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;