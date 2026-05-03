/**
 * LOCATIONS CONFIGURATION
 * Add, edit, or remove entries to configure locations displayed on the map.
 *
 * Required fields:
 *   - name:        GM name
 *   - image:       Photo path or URL
 *   - distrito:    District name (e.g. 'Lisboa')
 *   - description: Brief description
 *   - lat:         Latitude
 *   - lng:         Longitude
 *
 * Optional fields:
 *   - maps:        Google Maps URL (full link)
 *   - instagram:   Instagram handle, without @ (e.g. 'afonsomolinar')
 *   - discord:     Discord URL (https://discordapp.com/users/<id> or server invite)
 *   - twitch:      Twitch URL (full link)
 *   - youtube:     YouTube channel URL (full link)
 *   - website:     Personal page URL (full link)
 *   - custom1/2/3: Custom link with { name, icon, link }
 *                  icon can be an image URL or an emoji (e.g. '🎲')
 *                  name appears on hover, link is the destination URL
 */

window.LOCATIONS = [
  {
    name: 'Santas / Daniel Santana',
    image: 'pictures/santas.jpg',
    distrito: 'Santarém',
    description: 'Um entusiasta de TTRPG que adora conduzir campanhas curtas e one-shots em vários sistemas de jogos narrativos com cenários de fantasia, horror, western e ficção científica! Ele organiza os encontros mensais de TTRPG em Rio Maior e costuma estar ativo na comunidade de TTRPG e quer fazer com que Portugal inteiro jogue.',
    lat: 39.3376,
    lng: -8.9351,
    maps: 'https://maps.app.goo.gl/WHZCeGXXPm49MW5E6',
    instagram: 'santasgm',
    discord: 'https://discord.gg/PMYKGwZ4q5'
  },
  {
    name: 'Riddari',
    image: 'pictures/riddari.jpg',
    distrito: 'Santarém',
    description: 'Um grande apaixonado por narrativa de fantasia e actualmente Daggerheart é o meu campo de batalha favorito. Sou DM e faço streams onde me dedico a criar e partilhar as minhas campanhas com os meus jogadores. Onde exploramos o equilibrio entre esperança e medo. Essa dedicação ao universo de Daggerheart também se extende ao meu podcast onde mergulhamos a fundo em tudo o que vem no livro. Fora das mesas sou Fotografo e Videografo onde uso o meu olho criativo para dar vida a outras histórias através da Frutografia. No fundo, sou um contador de histórias, sejam elas com dados, microfones ou lentes.',
    lat: 39.3376,
    lng: -8.9351,
    maps: 'https://maps.app.goo.gl/WHZCeGXXPm49MW5E6',
    instagram: 'riddari.cos',
    discord: 'https://discord.gg/kRA2f2Aku',
    twitch: 'https://www.twitch.tv/dadosedragoes',
    custom1: { name: 'Instagram Dados e Dragões', icon: 'instagram', link: 'https://www.instagram.com/dadosdragoes/' },
  },
  {
    name: 'Mitchell Ventura',
    image: 'pictures/mitchell.jpg',
    distrito: 'Santarém',
    description: 'Mitchell Ventura é um dos produtores do podcast português de TTRPG Dados à Portuguesa, conhecido por explorar diversos sistemas e mundos, com um elenco rotativo. Mitchell também é um dos criadores da The Mimic Network, uma rede colaborativa de podcasts de RPG de mesa focada em apoiar o crescimento e expandir a distribuição.',
    lat: 39.4769,
    lng: -8.5388,
    instagram: 'mitchellfroisventura',
    discord: 'http://discordapp.com/users/403567480217272330'
  },
  {
    name: 'Nuno Teixeira',
    image: 'pictures/nunoteixeira.jpg',
    distrito: 'Setúbal',
    description: '10 anos de experiência; hiper-narrativo; improv.',
    lat: 38.5244,
    lng: -8.8882,
    instagram: 'nunotxr'
  },
  {
    name: 'Barda Laurinha',
    image: 'pictures/bardalaurinha.jpg',
    distrito: 'Coimbra',
    description: 'Nascida e criada em Coimbra, estudante de Psicologia da Educação e Desenvolvimento e um dos primeiros Bardos do Mondego. Costuma mestrar para grupos mais pequenos de jogadores novatos, de variadas idades, com um lugar especial no seu coração para mini-aventureiros e o seu caos saudável. As suas histórias envolvem (quase) sempre temas socio-políticos, tentando plantar a semente da mudança sem perder a magia da arte do storytelling. Gosta de criar personagens com a curiosidade e esperança de criança e, apesar de dificilmente assistires a um TPK na sua mesa, momentos de riso e/ou choro são garantidos!',
    lat: 40.2033,
    lng: -8.4103,
    maps: 'https://maps.app.goo.gl/LNBXxR58ZywnHj8F6',
    instagram: 'thefairybard',
    discord: 'https://discord.gg/DgD58yntu',
    twitch: 'https://www.twitch.tv/bardos_do_mondego',
    website: 'https://linktr.ee/bardosdomondego?utm_source=linktree_profile_share&ltsid=1fb272b5-7c9b-43de-acf9-1fe7ee7c3bd0',
    custom1: { name: 'Instagram Bardos do Mondego', icon: 'instagram', link: 'https://www.instagram.com/bardos_do_mondego/' },
  }  ,{
    name: 'Bardo Maia',
    image: 'pictures/bardomaia.jpg',
    distrito: 'Coimbra',
    description: 'Bardo Maia é um Mestre do centro de Portugal e o catalisador por detrás dos Bardos do Mondego. Se o conheces, sabes duas coisas: está sempre de um lado para o outro, a tentar garantir que todos os eventos correm da melhor forma possível… e adora criar personagens stackadas, explorando ao máximo todo o seu potencial. Já fez counterspell a Revify mais do que uma vez, porque acredita que o drama é o que move uma boa história. Ele é o homem que faz as coisas acontecer.',
    lat: 40.2033,
    lng: -8.4103,
    maps: 'https://maps.app.goo.gl/LNBXxR58ZywnHj8F6',
    instagram: 'el_manatim',
    discord: 'https://discord.gg/DgD58yntu',
    twitch: 'https://www.twitch.tv/bardos_do_mondego',
    website: 'https://linktr.ee/bardosdomondego?utm_source=linktree_profile_share&ltsid=1fb272b5-7c9b-43de-acf9-1fe7ee7c3bd0',
    custom1: { name: 'Instagram Bardos do Mondego', icon: 'instagram', link: 'https://www.instagram.com/bardos_do_mondego/' }
  },
  {
    name: 'Barda Pipa',
    image: 'pictures/bardapipa.jpg',
    distrito: 'Lisboa',
    description: 'Apesar de ser jurista, a Barda Pipa não podia estar mais longe de ser rules lawyer. Grande adepta da rule of cool, com mesas conhecidas pelo caos e com risadas e drama igualmente presentes, promete uma aventura cheia de ação e reviravoltas. Quem nunca sonhou em ser parte de um golpe mega elaborado para roubar artefactos mágicos? E quem nunca sonhou em ter um romance steamy com um aliado? E quem nunca sonhou em juntar estes dois sonhos?',
    lat: 38.7696,
    lng: -9.1016,
    instagram: 'flowerybard',
    discord: 'https://discord.gg/DgD58yntu',
    twitch: 'https://www.twitch.tv/bardos_do_mondego',
    website: 'https://linktr.ee/bardosdomondego?utm_source=linktree_profile_share&ltsid=1fb272b5-7c9b-43de-acf9-1fe7ee7c3bd0',
    custom1: { name: 'Instagram Bardos do Mondego', icon: 'instagram', link: 'https://www.instagram.com/bardos_do_mondego/' }
  },
  {
    name: 'Barda Cat',
    image: 'pictures/bardacat.jpg',
    distrito: 'Coimbra',
    description: '',
    lat: 40.3386,
    lng: -8.4283,
    instagram: 'abardacat',
    maps: 'https://maps.app.goo.gl/bYBnhb1Fc7u5oXw97',
    discord: 'https://discord.gg/DgD58yntu',
    twitch: 'https://www.twitch.tv/bardos_do_mondego',
    website: 'https://linktr.ee/bardosdomondego?utm_source=linktree_profile_share&ltsid=1fb272b5-7c9b-43de-acf9-1fe7ee7c3bd0',
    custom1: { name: 'Instagram Bardos do Mondego', icon: 'instagram', link: 'https://www.instagram.com/bardos_do_mondego/' }
  },
  {
    name: 'Bardo Rhov',
    image: 'pictures/bardorhov.jpg',
    distrito: 'Leiria',
    description: '',
    lat: 39.4633,
    lng: -8.9782,
    instagram: 'bardo_rhov',
    discord: 'https://discord.gg/DgD58yntu',
    twitch: 'https://www.twitch.tv/bardos_do_mondego',
    website: 'https://linktr.ee/bardosdomondego?utm_source=linktree_profile_share&ltsid=1fb272b5-7c9b-43de-acf9-1fe7ee7c3bd0',
    custom1: { name: 'Instagram Bardos do Mondego', icon: 'instagram', link: 'https://www.instagram.com/bardos_do_mondego/' }
  },
  {
    name: 'Bardo Jota',
    image: 'pictures/bardojota.jpg',
    distrito: 'Coimbra',
    description: '',
    lat: 40.2033,
    lng: -8.4103,
    maps: 'https://maps.app.goo.gl/YGZNDu61vwFQmBXu7',
    instagram: 'jota379',
    discord: 'https://discord.gg/DgD58yntu',
    twitch: 'https://www.twitch.tv/bardos_do_mondego',
    website: 'https://linktr.ee/bardosdomondego',
    custom1: { name: 'Instagram Bardos do Mondego', icon: 'instagram', link: 'https://www.instagram.com/bardos_do_mondego/' },
    custom2: { name: 'Instagram Sanji da Tuga', icon: 'instagram', link: 'https://www.instagram.com/sanjidatuga/' }
  },
  {
    name: 'Carolina Magalhães Dias',
    image: 'pictures/cari.jpg',
    distrito: 'Santarém',
    description: 'Jogadora desde 2016, co-fundadora e atual Presidente da Associação Quebra-Dados. Mestra na Quebra-Dados e outros espaços do Porto, assim como em convenções espalhadas pelo país.',
    lat: 41.1622,
    lng: -8.6185,
    maps: 'https://maps.app.goo.gl/sDpRtCmNWo4h7Njs7',
    instagram: 'carimagadias',
    website: 'https://www.carolinamagalhaesdias.com'
  },
  {
    name: 'Joana Jesus',
    image: 'pictures/joanajesus.jpg',
    distrito: 'Lisboa',
    description: 'Com vários anos de experiência como GM, a Joana corre one-shots semanalmente no restaurante Wizards of the Toast, passando por dezenas de sistemas de jogo diferentes.',
    lat: 38.7696,
    lng: -9.1015,
    maps: 'https://maps.app.goo.gl/tko9PTmz6Z83d9aW6',
    instagram: 'thealmightygm'
  },
  {
    name: 'João Reis',
    image: 'pictures/joaoreis.jpg',
    distrito: 'Braga',
    description: 'Seja por trás do GM screen ou por trás da câmara, criar narrativas cativantes é o meu principal objetivo. Após muitos anos a tentar encontrar uma forma de me expressar criativamente, a fotografia permitiu-me explorar o meio visual como forma de contar histórias. Mas depois descobri os jogos narrativos e um meio totalmente novo através do qual as minhas narrativas podiam ganhar vida. O miúdo nerd que cresceu a ler sagas épicas encontrou uma forma de reviver, recontar e reconectar-se com essas fantasias, ao mesmo tempo que cria ligações com uma comunidade apaixonada e forja amizades duradouras à volta da mesa.',
    lat: 41.4438,
    lng: -8.2930,
    maps: 'https://share.google/aLvjHPP9frRuPeREi',
    instagram: 'joao.reis.94',
    discord: 'http://discordapp.com/users/1344797389419974749',
    custom1: { name: 'Instagram vanishingkraken', icon: 'instagram', link: 'https://www.instagram.com/vanishingkraken/' }
  },
  {
    name: 'Mora Sininho Rosa',
    image: 'pictures/rosasininho.jpg',
    distrito: 'Évora',
    description: 'Criadora de conteúdo sobre jogos narrativos, livros, mitologia e temas queer. Game Master na loja Weatherlight games e em eventos. Começou a iniciativa Dados de Vénus para promover encontros queer de jogos narrativos.',
    lat: 38.5642,
    lng: -7.9176,
    maps: 'https://maps.app.goo.gl/4CFGkds47H3H5unj9',
    instagram: 'rosasininho',
    discord: 'http://discordapp.com/users/354385264447193088',
    website: 'https://www.foradestemundo.com'
  },
  {
    name: 'Afonso Molinar',
    image: 'pictures/afonsomolinar.jpg',
    distrito: 'Lisboa',
    description: 'Afonso Molinar é ator e artista multidisciplinar, bem como Mestre de Jogo. É diretor do teatroàespada, um projeto que explora as intersecções entre Jogos Narrativos e Teatro, juntando encenação experimental e expressão artística em projetos que dão destaque à vertente criativa e social dos RPGs.',
    lat: 38.7123,
    lng: -9.1390,
    maps: 'https://maps.app.goo.gl/4CFGkds47H3H5unj9',
    instagram: 'afonsomolina',
    discord: 'https://discord.gg/nB3AYpupUx',
    website: 'https://www.teatroafaca.com/teatroaespada',
    custom1: { name: 'Instagram Teatro à Espada', icon: 'instagram', link: 'https://www.instagram.com/teatroaespada/' },
  }
];
