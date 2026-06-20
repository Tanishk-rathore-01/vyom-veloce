import aboutAtelierCraft from '../assets/generated/about/atelier-craft.webp'
import aboutBrandStory from '../assets/generated/about/brand-story.webp'
import aboutGlobalVision from '../assets/generated/about/global-vision.webp'
import aboutHeritageVision from '../assets/generated/about/heritage-vision.webp'
import aboutInternationalExpansion from '../assets/generated/about/international-expansion.webp'
import modBajajDominar400 from '../assets/generated/modifications/bajaj-dominar-400.webp'
import modBmwCustom from '../assets/generated/modifications/bmw-custom.webp'
import modDucatiExhaust from '../assets/generated/modifications/ducati-exhaust.webp'
import modFerrariBodywork from '../assets/generated/modifications/ferrari-bodywork.webp'
import modKtm390Duke from '../assets/generated/modifications/ktm-390-duke.webp'
import modLamborghiniCustom from '../assets/generated/modifications/lamborghini-custom.webp'
import modPorscheSuspension from '../assets/generated/modifications/porsche-suspension.webp'
import modRoyalEnfieldGt650 from '../assets/generated/modifications/royal-enfield-gt-650.webp'
import modRoyalEnfieldMeteor from '../assets/generated/modifications/royal-enfield-meteor.webp'
import modTvsApacheRtr310 from '../assets/generated/modifications/tvs-apache-rtr-310.webp'
import showroomBangalore from '../assets/generated/showrooms/bangalore-showroom.webp'
import showroomDelhi from '../assets/generated/showrooms/delhi-showroom.webp'
import showroomGhaziabad from '../assets/generated/showrooms/ghaziabad-showroom.webp'
import aventadorSvjRoadster from '../assets/generated/vehicles/aventador-svj-roadster.webp'
import carreraGtHeritage from '../assets/generated/vehicles/carrera-gt-heritage.webp'
import cbr1000rrrFirebladeSp from '../assets/generated/vehicles/cbr1000rr-r-fireblade-sp.webp'
import chironSuperSport from '../assets/generated/vehicles/chiron-super-sport.webp'
import desmosediciRr from '../assets/generated/vehicles/desmosedici-rr.webp'
import gsxr1000rYoshimura from '../assets/generated/vehicles/gsx-r1000r-yoshimura.webp'
import huayraRoadsterBc from '../assets/generated/vehicles/huayra-roadster-bc.webp'
import ninjaH2rCarbon from '../assets/generated/vehicles/ninja-h2r-carbon.webp'
import one77Obsidian from '../assets/generated/vehicles/one-77-obsidian.webp'
import p1CarbonEdition from '../assets/generated/vehicles/p1-carbon-edition.webp'
import panigaleV4RCarbon from '../assets/generated/vehicles/panigale-v4-r-carbon.webp'
import phantomNoirEdition from '../assets/generated/vehicles/phantom-noir-edition.webp'
import rc8cLimited from '../assets/generated/vehicles/rc-8c-limited.webp'
import regeraNakedCarbon from '../assets/generated/vehicles/regera-naked-carbon.webp'
import rsv4FactoryWorks from '../assets/generated/vehicles/rsv4-factory-works.webp'
import s1000rrMPackage from '../assets/generated/vehicles/s1000rr-m-package.webp'
import sf90Stradale from '../assets/generated/vehicles/sf90-stradale.webp'
import speedtailVelocity from '../assets/generated/vehicles/speedtail-velocity.webp'
import superleggeraV4 from '../assets/generated/vehicles/superleggera-v4.webp'
import yzfR1mCarbon from '../assets/generated/vehicles/yzf-r1m-carbon.webp'

export function normalizeVisualKey(value = '') {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const generatedVehicleImages = {
  'chiron-super-sport': chironSuperSport,
  'panigale-v4-r-carbon': panigaleV4RCarbon,
  'aventador-svj-roadster': aventadorSvjRoadster,
  'superleggera-v4': superleggeraV4,
  'p1-carbon-edition': p1CarbonEdition,
  'rc-8c-limited': rc8cLimited,
  'huayra-roadster-bc': huayraRoadsterBc,
  'sf90-stradale': sf90Stradale,
  'ninja-h2r-carbon': ninjaH2rCarbon,
  'cbr1000rr-r-fireblade-sp': cbr1000rrrFirebladeSp,
  'carrera-gt-heritage': carreraGtHeritage,
  'yzf-r1m-carbon': yzfR1mCarbon,
  'speedtail-velocity': speedtailVelocity,
  'gsx-r1000r-yoshimura': gsxr1000rYoshimura,
  'regera-naked-carbon': regeraNakedCarbon,
  'rsv4-factory-works': rsv4FactoryWorks,
  'phantom-noir-edition': phantomNoirEdition,
  'desmosedici-rr': desmosediciRr,
  's1000rr-m-package': s1000rrMPackage,
  'one-77-obsidian': one77Obsidian,
}

export const generatedModificationImages = {
  lamborghini: modLamborghiniCustom,
  ferrari: modFerrariBodywork,
  porsche: modPorscheSuspension,
  ducati: modDucatiExhaust,
  bmw: modBmwCustom,
  'royal-enfield-gt-650': modRoyalEnfieldGt650,
  'royal-enfield-meteor': modRoyalEnfieldMeteor,
  'tvs-apache-rtr-310': modTvsApacheRtr310,
  'bajaj-dominar-400': modBajajDominar400,
  'ktm-390-duke': modKtm390Duke,
}

export const showroomImages = {
  delhi: showroomDelhi,
  bangalore: showroomBangalore,
  ghaziabad: showroomGhaziabad,
}

export const aboutImages = {
  brandStory: aboutBrandStory,
  atelierCraft: aboutAtelierCraft,
  globalVision: aboutGlobalVision,
  heritageVision: aboutHeritageVision,
  internationalExpansion: aboutInternationalExpansion,
}

export function getGeneratedVehicleImage(vehicle) {
  if (!vehicle) {
    return null
  }

  return (
    generatedVehicleImages[normalizeVisualKey(vehicle.title)] ||
    generatedVehicleImages[normalizeVisualKey(vehicle.image_query)] ||
    null
  )
}

export function getGeneratedModificationImage(vehicleName) {
  return generatedModificationImages[normalizeVisualKey(vehicleName)] || null
}

export function getShowroomImage(city) {
  return showroomImages[normalizeVisualKey(city)] || null
}
