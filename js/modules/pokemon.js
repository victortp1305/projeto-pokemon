import debounce from "./debounce.js";
export default class PokemonFunction {
  constructor(
    listWrapper,
    maxPokemon = 151,
    itemPerPage = 14,
    searchInput = "#search-input",
    typeWrapper = "#type-wrapper"
  ) {
    // Número máximo de Pokémon a serem exibidos
    this.MAX_POKEMON = maxPokemon;
    // Seleciona o elemento que contém a lista de Pokémon
    this.listWrapper = document.querySelector(listWrapper);
    // Seleciona o elemento de entrada de pesquisa
    this.searchInput = document.querySelector(searchInput);
    this.activeClass = "ativo";
    // Seleciona o elemento que contém os tipos de Pokémon
    this.typeWrapper = document.querySelector(typeWrapper);

    // Seleciona o elemento de filtro de tipo
    this.typeFilterWrap = document.querySelector(".type-filter-wrap");

    // Seleciona o elemento de mensagem de não encontrado
    this.notFoundMessage = document.getElementById("not-found-message");
    // Seleciona o botão de fechar
    this.closeButton = document.querySelector(".search-close-icon");
    // Seleciona o wrapper de filtro
    this.filterWrapper = document.querySelector(".filter-wrapper");

    this.pokemonData = []; // Variável para armazenar os dados dos Pokémon

    this.filtroType = []; // Variável para armazenar os tipos de Pokémon

    // Variáveis para armazenar o estado atual da página
    this.currentPage = 1;
    // Número de itens por página
    this.itemsPerPage = itemPerPage;

    // Vincula o this para os métodos
    this.clearSearch = this.clearSearch.bind(this);

    this.toggleTypeFiltro = this.toggleTypeFiltro.bind(this);
    this.aplicarFiltros = this.aplicarFiltros.bind(this);

    // Cores dos tipos de Pokémon
    this.typeColors = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      dark: "#EE99AC",
      fairy: "#EE99AC",
    };

    // Inicializa o modal
    this.modal = document.getElementById("pokemonModal");
    this.modalContent = document.querySelector(".modal-content");
    this.modalDetails = document.getElementById("pokemonDetails");
    this.closeButtonModal = document.querySelector(".close");

    this.closeButtonModal.onclick = () => {
      this.modal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    };

    // Adiciona o evento de clique ao botão de limpar filtro
    this.clearFilterButton = document.getElementById("clear-filter-button");
    this.clearFilterButton.addEventListener("click", () => this.limparFiltro());

    this.verificarTamanhoTela(itemPerPage);
    window.addEventListener(
      "resize",
      debounce(() => this.verificarTamanhoTela(itemPerPage), 500)
    );
  }

  // Função para aplicar cores nas divs de acordo com o tipo de Pokémon
  aplicarCoresNosLabels() {
    const divs = this.typeWrapper.querySelectorAll(".type-wrap > div");
    divs.forEach((div) => {
      const tipo = div.getAttribute("data-type");
      const cor = this.typeColors[tipo];
      if (cor) {
        div.style.setProperty("--cor-principal", cor);
      }
    });
  }

  // Função para converter o valor hexadecimal em RGB
  hexParaRgb(hexColor, alpha = 1.0) {
    // Remove o símbolo '#' se estiver presente
    hexColor = hexColor.replace("#", "");

    // Verifica se o hexadecimal tem 3 dígitos e expande para 6 dígitos
    if (hexColor.length === 3) {
      hexColor = hexColor
        .split("")
        .map((char) => char + char)
        .join("");
    }

    // Verifica se o hexadecimal agora tem 6 dígitos
    if (hexColor.length !== 6) {
      throw new Error(
        "Entrada inválida. Use um valor hexadecimal de 3 ou 6 caracteres."
      );
    }

    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Função para criar os cards dos Pokémon
  async criarPokemon(pokemonData) {
    this.filtroType = pokemonData; // Define o filtro de tipo como os dados dos Pokémon
    // Função para renderizar a página atual de acordo com o número da página e os dados dos Pokémon
    const renderizarPagina = (pagina) => {
      // Calcula o índice do último item e do primeiro item da página
      const indexUltimoItem = pagina * this.itemsPerPage;
      // O índice do primeiro item é o índice do último item menos o número de itens por página
      const indexPrimeiroItem = indexUltimoItem - this.itemsPerPage;
      // Slice os dados dos Pokémon com base no índice do primeiro e último item
      const pokemonAtual = pokemonData.slice(
        indexPrimeiroItem,
        indexUltimoItem
      );

      this.listWrapper.innerHTML = ""; // Reseta o innerHTML quando executado

      const fragment = document.createDocumentFragment(); // Cria um fragmento de documento

      // Itere sobre os dados dos Pokémon para criar os elementos do DOM
      pokemonAtual.forEach((pokemon) => {
        try {
          const div = document.createElement("div");
          div.classList.add("pokemon-card");
          div.setAttribute("data-id", pokemon.id); // Adiciona o ID do Pokémon como atributo

          const { name, types, id, weight, height, stats, abilities } = pokemon;
          const tipoPrincipal = types[0].type.name;
          const tipoSecundario = types[1] ? types[1].type.name : null;
          const corPrincipal = this.typeColors[tipoPrincipal];
          const corSecundaria = this.typeColors[tipoSecundario];

          div.style.setProperty(
            "--identidade-primaria-fosca",
            this.hexParaRgb(corPrincipal, 0.3)
          );
          div.style.setProperty("--identidade-primaria", corPrincipal);

          div.innerHTML = `
          <div class="number-wrap">
              <p class="caption-fonts">#${id}</p>
          </div>
          <div class="img-wrap">
              <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${name}"/>
          </div>
          <div class="name-wrap">
          <div class="p-type">
              <p class="body3-fonts">${name}</p>
          </div>
          </div>
        `;

          // Adiciona um evento de clique para redirecionar para a página de detalhes
          div.addEventListener("click", (event) => {
            const pokemonId = event.currentTarget.getAttribute("data-id");
            this.exibirDetalhesPokemon(pokemonId);
          });

          fragment.appendChild(div); // Adiciona o card ao fragmento
        } catch (error) {
          console.error("Erro ao criar o card do Pokémon:", error);
        }
      });
      // Usa requestAnimationFrame para otimizar a atualização do DOM
      requestAnimationFrame(() => {
        this.listWrapper.appendChild(fragment); // Adiciona o fragmento ao DOM
      });
    };

    const adicionarBotoesNavegacao = (numeroPaginas) => {
      // Cria um container de navegação se não existir
      let navContainer = document.querySelector(".pagination");
      // Verifica se há apenas uma página e remove o container de navegação
      if (numeroPaginas === 1) {
        navContainer.innerHTML = "";
      } else {
        // Se houver mais de uma página, adicione os botões de navegação
        // Verifica se o container de navegação já existe
        if (!navContainer) {
          navContainer = document.createElement("div");
          navContainer.classList.add("pagination");
          document.body.appendChild(navContainer);
        } else {
          // Limpa o container de navegação se já existir
          navContainer.innerHTML = "";
        }

        // Botão de página anterior
        const prevButton = document.createElement("button");
        prevButton.textContent = "<";
        prevButton.classList.add("pag-arrow");
        prevButton.classList.add("arrow-left");
        prevButton.addEventListener("click", () => {
          if (this.currentPage > 1) {
            this.currentPage--;
            renderizarPagina(this.currentPage);
            atualizarBotoesAtivos();
          } else {
            // Vai para a última página se a página atual for a primeira
            this.currentPage = numeroPaginas;
            renderizarPagina(this.currentPage);
            atualizarBotoesAtivos();
          }
        });
        navContainer.appendChild(prevButton);

        // Cria um botão para cada página
        for (let i = 1; i <= numeroPaginas; i++) {
          const button = document.createElement("button");

          // Adiciona a classe ativo ao botão da página atual
          if (i === this.currentPage) {
            button.classList.add("ativo");
          }
          button.addEventListener("click", () => {
            // Atualiza a página atual
            this.currentPage = i;
            // Renderiza a página atual
            renderizarPagina(this.currentPage);
            // Remove a classe ativo de todos os botões e adiciona ao botão clicado
            document
              .querySelectorAll(".pagination button")
              .forEach((btn) => btn.classList.remove("ativo"));
            button.classList.add("ativo");
          });
          navContainer.appendChild(button);
        }

        // Botão de próxima página
        const nextButton = document.createElement("button");
        nextButton.textContent = ">";
        nextButton.classList.add("pag-arrow");
        nextButton.classList.add("arrow-right");
        nextButton.addEventListener("click", () => {
          if (this.currentPage < numeroPaginas) {
            this.currentPage++;
            renderizarPagina(this.currentPage);
            atualizarBotoesAtivos();
          } else {
            this.currentPage = 1;
            renderizarPagina(this.currentPage);
            atualizarBotoesAtivos();
          }
        });
        navContainer.appendChild(nextButton);

        document.querySelector(".pokemon-list").appendChild(navContainer);
      }
    };

    const atualizarBotoesAtivos = () => {
      document
        .querySelectorAll(".pagination button")
        .forEach((btn) => btn.classList.remove("ativo"));
      document
        .querySelectorAll(".pagination button")
        [this.currentPage].classList.add("ativo");
    };

    this.currentPage = 1; // Redefine a página atual para a primeira página
    // Calcula o número de páginas com base no número de Pokémon e no número de itens por página
    const numeroPaginas = Math.ceil(pokemonData.length / this.itemsPerPage);

    adicionarBotoesNavegacao(numeroPaginas);

    renderizarPagina(this.currentPage);
  }

  // Função para exibir os detalhes do Pokémon
  async exibirDetalhesPokemon(id) {
    try {
      this.currentPokemonId = id; // Armazena o ID do Pokémon atual

      // Busca os dados do Pokémon e da espécie do Pokémon
      const pokemonSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      ).then((res) => res.json());

      //  Busca o texto de sabor em inglês
      const flavorText = this.getEnglishFlavorText(pokemonSpecies);

      // Busca os dados do Pokémon com base em um ID
      const pokemon = this.filtroType.find((p) => p.id == id);
      // Desestrutura os dados do Pokémon
      const { name, types, weight, height, stats, abilities, sprites } =
        pokemon;

      const tipoPrincipal = types[0].type.name;
      const tipoSecundario = types[1] ? types[1].type.name : null;
      const corPrincipal = this.typeColors[tipoPrincipal];
      const corSecundaria = this.typeColors[tipoSecundario];

      const statNameMapping = {
        hp: "HP",
        attack: "ATK",
        defense: "DEF",
        "special-attack": "SATK",
        "special-defense": "SDEF",
        speed: "SPD",
      };

      if (!pokemon) {
        console.error("Pokémon não encontrado");
        return;
      }
      // Atualiza o conteúdo do modal com os detalhes do Pokémon
      this.modalDetails.innerHTML = `
      
      <div class="detail-card-detail-wrapper">
    <div class="header-wrapper">
      <div class="header-wrap">
        <div class="name-wrap">
          <h1 class="name">${name}</h1>
        </div>
      </div>
      <div class="pokemon-id-wrap">
        <p class="body2-fonts">#${id}</p>
      </div>
    </div>
    <div class="featured-img">
      <div class="detail-img-wrapper">
        <img src="${sprites.other.dream_world.front_default}" alt="${name}">
      </div>
    </div>
    <div class="power-wrapper">
      ${types
        .map(
          (type) =>
            `<p class="body3-fonts type ${type.type.name}">${type.type.name}</p>`
        )
        .join("")}
    </div>
    <p class="body2-fonts about-text">Sobre</p>
    <div class="pokemon-detail-wrapper">
      <div class="pokemon-detail-wrap">
        <div class="pokemon-detail">
          <img src="./dist/assets/weight.svg" alt="weight">
          <p class="body3-fonts weight">${weight / 10}kg</p>
        </div>
        <p class="caption-fonts">Peso</p>
      </div>
      <div class="pokemon-detail-wrap">
        <div class="pokemon-detail">
          <img src="./dist/assets/height.svg" alt="height">
          <p class="body3-fonts height">${height / 10}m</p>
        </div>
        <p class="caption-fonts">Altura</p>
      </div>
      <div class="pokemon-detail-wrap">
        <div class="pokemon-detail move">
          ${abilities
            .map((ability) => `<p>${ability.ability.name}</p>`)
            .join("")}
        </div>
        <p class="caption-fonts">Habilidades</p>
      </div>
    </div>
    <p class="body3-fonts pokemon-description">${flavorText}</p>
    <p class="body2-fonts about-text">Base Stats</p>
    <div class="stats-wrapper">
      ${stats
        .map(
          ({ stat, base_stat }) => `
        <div class="stats-wrap" data-stat="${statNameMapping[stat.name]}">
          <p class="body3-fonts stats">${statNameMapping[stat.name]}</p>
          <p class="body3-fonts">${base_stat}</p>
          <progress value="${base_stat}" max="100" class="progress-bar"></progress>
        </div>
      `
        )
        .join("")}
    </div>
  </div>`;

      this.modal.style.display = "flex";

      this.modalContent.style.setProperty(
        "--identidade-primaria",
        corPrincipal
      );
      this.modalContent.style.setProperty(
        "--identidade-secundaria",
        corSecundaria
      );
      this.modalContent.style.setProperty(
        "--identidade-primaria-fosca",
        this.hexParaRgb(corPrincipal, 0.3)
      );
    } catch (error) {
      console.error("Erro ao exibir os detalhes do Pokémon:", error);
    }
  }

  getEnglishFlavorText(pokemonSpecies) {
    for (let entry of pokemonSpecies.flavor_text_entries) {
      if (entry.language.name === "en") {
        let flavor = entry.flavor_text.replace(/\f/g, " ");
        return flavor;
      }
    }
    return "";
  }

  navegarPokemon(direcao) {
    const currentIndex = this.filtroType.findIndex(
      (p) => p.id == this.currentPokemonId
    );
    let newIndex = currentIndex + direcao;

    // Verifica se o novo índice está dentro dos limites
    if (newIndex < 0) {
      newIndex = this.filtroType.length - 1; // Vai para o último Pokémon
    } else if (newIndex >= this.filtroType.length) {
      newIndex = 0; // Vai para o primeiro Pokémon
    }

    const newPokemonId = this.filtroType[newIndex].id;
    this.exibirDetalhesPokemon(newPokemonId);
  }

  // Função para buscar os dados do Pokémon antes de redirecionar para a página de detalhes

  async fetchPokemonDataBeforeRedirect(id) {
    try {
      // Use Promise.all para buscar os dados do Pokémon e da espécie do Pokémon
      const [pokemon, pokemonSpecies] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
          res.json()
        ),
      ]);
      return true;
    } catch (error) {
      console.error("Faiou");
    }
  }

  // Função para filtrar Pokémon por tipo
  filtrarPokemonPorTipo(pokemonData, tipo) {
    if (tipo === "all") {
      return pokemonData;
    }
    return pokemonData.filter((pokemon) =>
      pokemon.types.some((t) => t.type.name === tipo)
    );
  }

  // Função para filtrar Pokémon por nome ou número
  filtrarPokemonPorNomeOuNumero(pokemonData, searchTerm) {
    if (!searchTerm) {
      return pokemonData;
    }
    return pokemonData.filter((pokemon) => {
      const pokemonID = pokemon.id.toString();
      const pokemonName = pokemon.name.toLowerCase();
      return (
        // Verifica se o ID ou o nome do Pokémon começa com o termo de pesquisa
        pokemonID.startsWith(searchTerm) || pokemonName.startsWith(searchTerm)
      );
    });
  }

  // Função para filtrar os Pokémon com base na barra de pesquisa e no tipo selecionado

  // Função para aplicar filtros baseados nos radio buttons selecionados e na barra de pesquisa
  aplicarFiltros() {
    const radioSelecionado = this.typeWrapper.querySelector(
      'input[type="radio"]:checked'
    );
    const tipoSelecionado = radioSelecionado ? radioSelecionado.value : "all";

    const styleBody = getComputedStyle(document.body);
    const identidadePadrao = styleBody.getPropertyValue(
      "--identidade-primaria"
    );

    // Define a cor principal com base no tipo selecionado
    const tipoPrincipal = tipoSelecionado;
    const corPrincipal = this.typeColors[tipoPrincipal];
    if (tipoSelecionado !== "all") {
      document
        .querySelector(".pokemon-list")
        .style.setProperty("--identidade-primaria", corPrincipal);

      document
        .querySelector(".pokemon-list")
        .style.setProperty(
          "--identidade-primaria-fosca",
          this.hexParaRgb(corPrincipal, 0.3)
        );
    } else {
      document
        .querySelector(".pokemon-list")
        .style.setProperty("--identidade-primaria", identidadePadrao);
      document
        .querySelector(".pokemon-list")
        .style.setProperty(
          "--identidade-primaria-fosca",
          this.hexParaRgb(identidadePadrao, 0.3)
        );
    }

    const searchTerm = this.searchInput.value.toLowerCase();

    // Filtra os Pokémon com base no tipo selecionado
    this.filtroType = this.filtrarPokemonPorTipo(
      this.pokemonData,
      tipoSelecionado
    );

    // Filtra os Pokémon com base no termo de pesquisa
    let pokemonFiltrado;

    //  Filtra os Pokémon com base no tipo selecionado e no termo de pesquisa
    pokemonFiltrado = this.filtrarPokemonPorNomeOuNumero(
      this.filtroType,
      searchTerm
    );

    this.criarPokemon(pokemonFiltrado);

    this.filtroType = pokemonFiltrado; // Define o filtro de tipo como os Pokémon filtrados
    // Exibe a mensagem de não encontrado se não houver Pokémon correspondente
    if (pokemonFiltrado.length === 0) {
      this.notFoundMessage.style.display = "block";
      // Limpa o container de navegação se não houver Pokémon correspondente
      document.querySelector(".pagination").innerHTML = "";
    } else {
      this.notFoundMessage.style.display = "none";
    }
  }

  limparFiltro() {
    document.getElementById("all").checked = true; // Marca o botão de todos os tipos

    this.aplicarFiltros(); // Aplica os filtros a partir do estado atual que é todos os tipos e sem termo de pesquisa
  }

  // Função para buscar e armazenar os dados dos Pokémon
  async fetchAndStorePokemonData() {
    const loadingElement = document.getElementById("loading");
    loadingElement.style.display = "block"; // Mostra o elemento de carregamento

    this.listWrapper.innerHTML = ""; // Reseta o innerHTML quando executado

    // Cria um array de IDs de Pokémon de 1 a MAX_POKEMON
    const pokemonIDs = Array.from(
      { length: this.MAX_POKEMON },
      (_, index) => index + 1
    );

    try {
      // Use Promise.all para buscar os dados de todos os Pokémon
      const pokemonData = await Promise.all(
        pokemonIDs.map(async (id) => {
          try {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`
            );
            if (!response.ok) {
              throw new Error(
                `Erro ao buscar dados do Pokémon com ID ${id}: ${response.statusText}`
              );
            }
            return await response.json();
          } catch (error) {
            console.error(
              `Erro ao buscar dados do Pokémon com ID ${id}:`,
              error
            );
            return null; // Retorna null em caso de erro
          }
        })
      );

      // Filtra os resultados nulos antes de continuar
      this.pokemonData = pokemonData.filter((pokemon) => pokemon !== null);
      // Define o filtro de tipo como os dados dos Pokémon
      this.filtroType = this.pokemonData;

      // Chama a função criarPokemon com os dados dos Pokémon
      this.criarPokemon(this.pokemonData);
    } catch (error) {
      console.error("Erro ao buscar dados dos Pokémon:", error);
    } finally {
      loadingElement.style.display = "none"; // Oculta o elemento de carregamento
    }
  }

  // Função para alternar a visibilidade do filtro de tipo
  toggleTypeFiltro() {
    // Alterna a classe ativa no wrapper do tipo
    this.typeWrapper.classList.toggle(this.activeClass);
    this.typeFilterWrap.classList.toggle(this.activeClass);
    // Fecha o filtro se estiver aberto
  }
  // Função para limpar a barra de pesquisa
  clearSearch() {
    this.searchInput.value = "";

    // Filtra os Pokémon com base no tipo selecionado
    this.aplicarFiltros();
    this.notFoundMessage.style.display = "none";
    this.closeButton.classList.remove("search-close-icon-visible");
  }

  // Função para lidar com a mudança de entrada
  handleInputChange(inputElement) {
    const inputValue = inputElement.value;

    if (inputValue !== "") {
      this.closeButton.classList.add("search-close-icon-visible");
    } else {
      this.closeButton.classList.remove("search-close-icon-visible");
    }
  }

  // Função para verificar o tamanho da tela e ajustar o número de Pokémon exibidos

  verificarTamanhoTela(itemPerPage) {
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    const larguraItem = 200; // Largura média de um item (ajuste conforme necessário)
    const alturaItem = 200; // Altura média de um item (ajuste conforme necessário)
    const margemItem = 34; // Margem média de um item (ajuste conforme necessário)

    // Calcula o número de itens que cabem na tela
    const itensPorLinha = Math.floor(larguraTela / (larguraItem + margemItem));
    const linhasVisiveis = Math.floor(alturaTela / (alturaItem + margemItem));

    // Calcula o número total de itens por página
    itemPerPage = itensPorLinha * linhasVisiveis;
    if (window.innerWidth <= 800) {
      this.itemsPerPage = this.MAX_POKEMON; // Exibe todos os Pokémon em telas menores
      // this.listWrapper.style.overflowY = "scroll";
      this.listWrapper.style.height = "auto"; // Ajuste conforme necessário
    } else {
      this.itemsPerPage = itemPerPage; // Volta ao valor padrão em telas maiores
      // this.listWrapper.style.overflowY = "hidden";
      // this.listWrapper.style.height = "auto"; // Ajuste conforme necessário
    }
    this.criarPokemon(this.filtroType); // Recria a lista de Pokémon com o novo limite
  }

  // Função para adicionar os eventos
  eventListeners() {
    //  Adiciona evento de digitacao para a barra de pesquisa de acordo com os filtros e aplicando o debounce
    this.searchInput.addEventListener(
      "keyup",
      debounce(this.aplicarFiltros, 100)
    );

    // Adiciona um evento de clique para limpar a barra de pesquisa
    this.closeButton.addEventListener("click", this.clearSearch);

    // Adiciona um evento de clique para alternar a visibilidade do filtro de tipo
    this.typeFilterWrap.addEventListener("click", this.toggleTypeFiltro);
    // Adiciona um evento de digitação para a barra de pesquisa para exibir e remover o botão de fechar e limpar a barra de pesquisa
    this.searchInput.addEventListener("input", () => {
      this.handleInputChange(this.searchInput);
    });
    // Adiciona um evento de clique para o filtro de número
    this.typeWrapper.addEventListener("change", (event) => {
      if (event.target.tagName === "INPUT" && event.target.type === "radio") {
        this.aplicarFiltros();
      }
    });

    // Adiciona event listeners aos botões de navegação
    document.getElementById("prevPokemon").addEventListener("click", () => {
      this.navegarPokemon(-1);
    });

    document.getElementById("nextPokemon").addEventListener("click", () => {
      this.navegarPokemon(1);
    });
  }

  async init() {
    if (this.listWrapper) {
      await this.fetchAndStorePokemonData();
      this.aplicarCoresNosLabels();
      this.eventListeners();
      return this;
    }
  }
}
