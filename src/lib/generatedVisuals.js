import aboutAtelierCraft from '../assets/generated/about/atelier-craft.png'
import aboutBrandStory from '../assets/generated/about/brand-story.png'
import aboutGlobalVision from '../assets/generated/about/global-vision.png'
import modBajajDominar400 from '../assets/generated/modifications/bajaj-dominar-400.png'
import modBmwCustom from '../assets/generated/modifications/bmw-custom.png'
import modDucatiExhaust from '../assets/generated/modifications/ducati-exhaust.png'
import modFerrariBodywork from '../assets/generated/modifications/ferrari-bodywork.png'
import modKtm390Duke from '../assets/generated/modifications/ktm-390-duke.png'
import modLamborghiniCustom from '../assets/generated/modifications/lamborghini-custom.png'
import modPorscheSuspension from '../assets/generated/modifications/porsche-suspension.png'
import modRoyalEnfieldGt650 from '../assets/generated/modifications/royal-enfield-gt-650.png'
import modRoyalEnfieldMeteor from '../assets/generated/modifications/royal-enfield-meteor.png'
import modTvsApacheRtr310 from '../assets/generated/modifications/tvs-apache-rtr-310.png'
import showroomBangalore from '../assets/generated/showrooms/bangalore-showroom.png'
import showroomDelhi from '../assets/generated/showrooms/delhi-showroom.png'
import showroomGhaziabad from '../assets/generated/showrooms/ghaziabad-showroom.png'
import aventadorSvjRoadster from '../assets/generated/vehicles/aventador-svj-roadster.png'
import carreraGtHeritage from '../assets/generated/vehicles/carrera-gt-heritage.png'
import cbr1000rrrFirebladeSp from '../assets/generated/vehicles/cbr1000rr-r-fireblade-sp.png'
import chironSuperSport from '../assets/generated/vehicles/chiron-super-sport.png'
import desmosediciRr from '../assets/generated/vehicles/desmosedici-rr.png'
import gsxr1000rYoshimura from '../assets/generated/vehicles/gsx-r1000r-yoshimura.png'
import huayraRoadsterBc from '../assets/generated/vehicles/huayra-roadster-bc.png'
import ninjaH2rCarbon from '../assets/generated/vehicles/ninja-h2r-carbon.png'
import one77Obsidian from '../assets/generated/vehicles/one-77-obsidian.png'
import p1CarbonEdition from '../assets/generated/vehicles/p1-carbon-edition.png'
import panigaleV4RCarbon from '../assets/generated/vehicles/panigale-v4-r-carbon.png'
import phantomNoirEdition from '../assets/generated/vehicles/phantom-noir-edition.png'
import rc8cLimited from '../assets/generated/vehicles/rc-8c-limited.png'
import regeraNakedCarbon from '../assets/generated/vehicles/regera-naked-carbon.png'
import rsv4FactoryWorks from '../assets/generated/vehicles/rsv4-factory-works.png'
import s1000rrMPackage from '../assets/generated/vehicles/s1000rr-m-package.png'
import sf90Stradale from '../assets/generated/vehicles/sf90-stradale.png'
import speedtailVelocity from '../assets/generated/vehicles/speedtail-velocity.png'
import superleggeraV4 from '../assets/generated/vehicles/superleggera-v4.png'
import yzfR1mCarbon from '../assets/generated/vehicles/yzf-r1m-carbon.png'

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
