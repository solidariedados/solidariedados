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
    name: 'Afonso Molinar',
    image: 'pictures/afonso.jpg',
    distrito: 'Lisboa',
    description: 'Teatro à Espada',
    lat: 38.7223,
    lng: -9.1393,
    maps: 'https://maps.google.com/?q=Lisboa,Portugal',
    instagram: 'afonsomolinar',
    discord: 'https://discord.gg/exemplo',
    twitch: 'https://www.twitch.tv/afonsomolinar',
    youtube: 'https://youtube.com/@afonsomolinar',
    website: 'https://exemplo.pt/afonso',
    custom1: { name: 'Teatro à Espada', icon: '🎭', link: 'https://exemplo.pt/teatro' },
    custom2: { name: 'Loja de Merch', icon: '👕', link: 'https://exemplo.pt/merch' },
    custom3: { name: 'Loja', icon: '🛒', link: 'https://exemplo.pt/loja' },
  },
  {
    name: 'Carolina Dias',
    image: 'pictures/carolina.webp',
    distrito: 'Porto',
    description: 'Quebradados',
    lat: 41.1579,
    lng: -8.6291,
    maps: 'https://maps.google.com/?q=Porto,Portugal',
    instagram: 'carimagadias',
    discord: 'https://discordapp.com/users/111111111111111111',
    twitch: 'https://www.twitch.tv/carimagadias',
    youtube: 'https://youtube.com/@carimagadias',
    website: 'https://exemplo.pt/carolina',
    custom1: { name: 'Quebradados', icon: '🎲', link: 'https://exemplo.pt/quebradados' },
    custom2: { name: 'Podcast', icon: '🎙️', link: 'https://exemplo.pt/podcast' },
    custom3: { name: 'Newsletter', icon: '📧', link: 'https://exemplo.pt/newsletter' },
  },
  {
    name: 'Santas',
    image: 'pictures/santas.jpg',
    distrito: 'Santarém',
    description: 'Roleplayers Rio Maior',
    lat: 39.2368,
    lng: -8.7265,
    maps: 'https://maps.google.com/?q=Rio+Maior,Portugal',
    instagram: 'santasgm',
    discord: 'https://discord.gg/riomaior',
    twitch: 'https://www.twitch.tv/santasgm',
    youtube: 'https://youtube.com/@santasgm',
    website: 'https://exemplo.pt/santas',
    custom1: { name: 'Grupo Roleplayers Rio Maior', icon: '⚔️', link: 'https://exemplo.pt/riomaior' },
    custom2: { name: 'Eventos', icon: '📅', link: 'https://exemplo.pt/eventos' },
    custom3: { name: 'Patreon', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Patreon_logo.svg', link: 'https://patreon.com/exemplo' },
  },
  {
    name: 'Rosa Sininho',
    image: 'pictures/rosa.jpg',
    distrito: 'Setúbal',
    description: 'Rosa Sininho',
    lat: 38.6650,
    lng: -8.0050,
    maps: 'https://maps.google.com/?q=Setúbal,Portugal',
    instagram: 'rosasininho',
    discord: 'https://discordapp.com/users/222222222222222222',
    twitch: 'https://www.twitch.tv/rosasininho',
    youtube: 'https://youtube.com/@rosasininho',
    website: 'https://exemplo.pt/rosa',
    custom1: { name: 'TikTok', icon: '🎵', link: 'https://tiktok.com/@exemplo' },
    custom2: { name: 'Ko-fi', icon: '☕', link: 'https://ko-fi.com/exemplo' },
    custom3: { name: 'Linktree', icon: '🌿', link: 'https://linktr.ee/exemplo' },
  },
  {
    name: 'Riddari',
    image: 'pictures/riddari.jpg',
    distrito: 'Santarém',
    description: 'Um grande apaixonado por narrativa de fantasia e actualmente Daggerheart é o meu campo de batalha favorito. Sou DM e faço streams onde me dedico a criar e partilhar as minhas campanhas com os meus jogadores. Onde exploramos o equilibrio entre esperança e medo. Essa dedicação ao universo de Daggerheart também se extende ao meu podcast onde mergulhamos a fundo em tudo o que vem no livro. Fora das mesas sou Fotografo e Videografo onde uso o meu olho criativo para dar vida a outras histórias através da Frutografia. No fundo, sou um contador de histórias, sejam elas com dados, microfones ou lentes.',
    lat: 39.33768983780347,
    lng: -8.935198920472429,
    maps: 'https://maps.app.goo.gl/WHZCeGXXPm49MW5E6',
    instagram: 'riddari.cos',
    discord: 'https://discord.gg/kRA2f2Aku',
    twitch: 'https://www.twitch.tv/dadosedragoes',
    custom1: { name: 'Instagram Dados e Dragões', icon: 'instagram', link: 'https://www.instagram.com/dadosdragoes/' },
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
    discord: 'http://discordapp.com/users/690242834254659747',
    twitch: 'https://www.twitch.tv/bardos_do_mondego',
    website: 'https://linktr.ee/bardosdomondego',
    custom1: { name: 'Instagram Bardos do Mondego', icon: 'instagram', link: 'https://www.instagram.com/bardos_do_mondego/' },
  }
];
