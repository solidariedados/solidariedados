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
 *   - website:     Personal page URL (full link)
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
    website: 'https://exemplo.pt/afonso',
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
    website: 'https://exemplo.pt/carolina',
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
    website: 'https://exemplo.pt/santas',
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
    website: 'https://exemplo.pt/rosa',
  }
];

