import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { cn } from "@/lib/utils";

/**
 * 3D Realistic Earth & Live Flight Trajectory System
 * Inspired by the Dribbble Chile Globe & TravelAnimator.com
 *
 * - Blue Marble surface, graded in-shader for azure oceans and emerald land
 * - Independently drifting cloud deck
 * - Cyan Fresnel limb + soft outer halo (additive)
 * - Elevated Bezier arcs India → UAE, bowed south over the Arabian Sea
 * - 3D aircraft that takes off, banks into the arc and lands, with a fading contrail
 * - Glowing airport pins, radar ripples and labels on the active corridor
 * - Drag with inertia; selecting a route slerps the corridor back to face the viewer
 *
 * The parent owns route selection and passes `activeRoute`; the globe reacts to it.
 */

export const LOCATIONS = {
  // India Origin Hubs & Gateways
  DEL: { name: "Delhi", code: "DEL", region: "India", type: "hub", lat: 28.5562, lng: 77.1000, colorHex: "#ffffff" },
  BOM: { name: "Mumbai", code: "BOM", region: "India", type: "hub", lat: 19.0896, lng: 72.8656, colorHex: "#ffffff" },
  ATQ: { name: "Amritsar", code: "ATQ", region: "India", type: "hub", lat: 31.7096, lng: 74.7973, colorHex: "#ffffff" },

  // UAE Flagship Corridors (On Website)
  DXB: { name: "Dubai", code: "DXB", region: "UAE", type: "flagship", lat: 25.2532, lng: 55.3657, colorHex: "#ff5b04" },
  AUH: { name: "Abu Dhabi", code: "AUH", region: "UAE", type: "international", lat: 24.4330, lng: 54.6511, colorHex: "#38bdf8" },
  SHJ: { name: "Sharjah", code: "SHJ", region: "UAE", type: "international", lat: 25.3286, lng: 55.5172, colorHex: "#38bdf8" },

  // Southeast Asia & Island Escapes (On Website)
  DPS: { name: "Bali", code: "DPS", region: "Indonesia", type: "international", lat: -8.7482, lng: 115.1672, colorHex: "#06d6a0" },
  BKK: { name: "Thailand", code: "BKK", region: "Bangkok", type: "international", lat: 13.6900, lng: 100.7501, colorHex: "#00b4d8" },
  SIN: { name: "Singapore", code: "SIN", region: "Singapore", type: "international", lat: 1.3644, lng: 103.9915, colorHex: "#38bdf8" },
  HAN: { name: "Vietnam", code: "HAN", region: "Hanoi", type: "international", lat: 21.2212, lng: 105.8072, colorHex: "#f59e0b" },
  CMB: { name: "Sri Lanka", code: "CMB", region: "Colombo", type: "international", lat: 7.1808, lng: 79.8841, colorHex: "#06d6a0" },
  VTE: { name: "Laos", code: "VTE", region: "Vientiane", type: "international", lat: 17.9883, lng: 102.5633, colorHex: "#38bdf8" },

  // Domestic Wonders (On Website)
  SXR: { name: "Kashmir", code: "SXR", region: "Srinagar", type: "domestic", lat: 33.9871, lng: 74.7744, colorHex: "#a855f7" },
  COK: { name: "Kerala", code: "COK", region: "Kochi", type: "domestic", lat: 10.1518, lng: 76.3930, colorHex: "#10b981" },
  IXZ: { name: "Andaman", code: "IXZ", region: "Port Blair", type: "domestic", lat: 11.6416, lng: 92.7297, colorHex: "#06d6a0" },
  JAI: { name: "Jaipur", code: "JAI", region: "Rajasthan", type: "domestic", lat: 26.8242, lng: 75.8122, colorHex: "#f59e0b" },

  // World-Famous Global Destinations (NOT on website)
  // Europe
  PAR: { name: "Paris", code: "PAR", region: "France", type: "global", lat: 48.8566, lng: 2.3522, colorHex: "#f43f5e" },
  LON: { name: "London", code: "LON", region: "United Kingdom", type: "global", lat: 51.5074, lng: -0.1278, colorHex: "#38bdf8" },
  ROM: { name: "Rome", code: "ROM", region: "Italy", type: "global", lat: 41.9028, lng: 12.4964, colorHex: "#f59e0b" },
  VCE: { name: "Venice", code: "VCE", region: "Italy", type: "global", lat: 45.4408, lng: 12.3155, colorHex: "#fb923c" },
  SWI: { name: "Switzerland", code: "SWI", region: "Alps", type: "global", lat: 47.3769, lng: 8.5417, colorHex: "#ef4444" },
  SAN: { name: "Santorini", code: "SAN", region: "Greece", type: "global", lat: 36.3932, lng: 25.4615, colorHex: "#0ea5e9" },
  BCN: { name: "Barcelona", code: "BCN", region: "Spain", type: "global", lat: 41.3879, lng: 2.1699, colorHex: "#f97316" },
  AMS: { name: "Amsterdam", code: "AMS", region: "Netherlands", type: "global", lat: 52.3676, lng: 4.9041, colorHex: "#06d6a0" },
  PRG: { name: "Prague", code: "PRG", region: "Czechia", type: "global", lat: 50.0755, lng: 14.4378, colorHex: "#ec4899" },
  KEF: { name: "Reykjavik", code: "KEF", region: "Iceland", type: "global", lat: 64.1466, lng: -21.9426, colorHex: "#38bdf8" },
  VIE: { name: "Vienna", code: "VIE", region: "Austria", type: "global", lat: 48.2082, lng: 16.3738, colorHex: "#f59e0b" },

  // Americas
  NYC: { name: "New York", code: "NYC", region: "USA", type: "global", lat: 40.7128, lng: -74.0060, colorHex: "#38bdf8" },
  LAX: { name: "Los Angeles", code: "LAX", region: "USA", type: "global", lat: 34.0522, lng: -118.2437, colorHex: "#fb923c" },
  SFO: { name: "San Francisco", code: "SFO", region: "USA", type: "global", lat: 37.7749, lng: -122.4194, colorHex: "#0ea5e9" },
  LAS: { name: "Las Vegas", code: "LAS", region: "USA", type: "global", lat: 36.1699, lng: -115.1398, colorHex: "#facc15" },
  HNL: { name: "Hawaii", code: "HNL", region: "USA", type: "global", lat: 21.3069, lng: -157.8583, colorHex: "#06d6a0" },
  YYC: { name: "Banff", code: "YYC", region: "Canada", type: "global", lat: 51.1784, lng: -115.5708, colorHex: "#38bdf8" },
  CUN: { name: "Cancún", code: "CUN", region: "Mexico", type: "global", lat: 21.1619, lng: -86.8515, colorHex: "#00b4d8" },
  RIO: { name: "Rio de Janeiro", code: "RIO", region: "Brazil", type: "global", lat: -22.9068, lng: -43.1729, colorHex: "#22c55e" },
  CUZ: { name: "Machu Picchu", code: "CUZ", region: "Peru", type: "global", lat: -13.1631, lng: -72.5450, colorHex: "#eab308" },
  EZE: { name: "Buenos Aires", code: "EZE", region: "Argentina", type: "global", lat: -34.6037, lng: -58.3816, colorHex: "#a855f7" },

  // East Asia & Oceania
  TYO: { name: "Tokyo", code: "TYO", region: "Japan", type: "global", lat: 35.6762, lng: 139.6503, colorHex: "#ec4899" },
  UKY: { name: "Kyoto", code: "UKY", region: "Japan", type: "global", lat: 34.9858, lng: 135.7588, colorHex: "#f43f5e" },
  ICN: { name: "Seoul", code: "ICN", region: "South Korea", type: "global", lat: 37.5665, lng: 126.9780, colorHex: "#a855f7" },
  SYD: { name: "Sydney", code: "SYD", region: "Australia", type: "global", lat: -33.8688, lng: 151.2093, colorHex: "#f97316" },
  MEL: { name: "Melbourne", code: "MEL", region: "Australia", type: "global", lat: -37.8136, lng: 144.9631, colorHex: "#0ea5e9" },
  ZQN: { name: "Queenstown", code: "ZQN", region: "New Zealand", type: "global", lat: -45.0312, lng: 168.6626, colorHex: "#06d6a0" },

  // Middle East & Africa
  CAI: { name: "Cairo", code: "CAI", region: "Egypt", type: "global", lat: 30.0444, lng: 31.2357, colorHex: "#eab308" },
  CPT: { name: "Cape Town", code: "CPT", region: "South Africa", type: "global", lat: -33.9249, lng: 18.4241, colorHex: "#a855f7" },
  RAK: { name: "Marrakech", code: "RAK", region: "Morocco", type: "global", lat: 31.6295, lng: -7.9811, colorHex: "#f97316" },
  AMM: { name: "Petra", code: "AMM", region: "Jordan", type: "global", lat: 30.3285, lng: 35.4444, colorHex: "#fb923c" },
  JRO: { name: "Serengeti", code: "JRO", region: "Tanzania", type: "global", lat: -3.3667, lng: 37.0667, colorHex: "#22c55e" },
  MLE: { name: "Maldives", code: "MLE", region: "Maldives", type: "global", lat: 4.1755, lng: 73.5093, colorHex: "#06d6a0" },
};

export const FLIGHT_ROUTES = [
  // UAE & Middle East Flagship
  { id: "dxb", from: LOCATIONS.DEL, to: LOCATIONS.DXB, duration: "≈ 3h 25m", note: "Nonstop, daily", category: "uae" },
  { id: "bom_dxb", from: LOCATIONS.BOM, to: LOCATIONS.DXB, duration: "≈ 3h 10m", note: "Nonstop, daily", category: "uae" },
  { id: "atq", from: LOCATIONS.ATQ, to: LOCATIONS.DXB, duration: "≈ 3h 55m", note: "Nonstop, 5× weekly", category: "uae" },
  { id: "shj", from: LOCATIONS.DEL, to: LOCATIONS.SHJ, duration: "≈ 3h 40m", note: "Nonstop, daily", category: "uae" },
  { id: "auh", from: LOCATIONS.DEL, to: LOCATIONS.AUH, duration: "≈ 3h 45m", note: "Nonstop, daily", category: "uae" },

  // Europe & Transatlantic
  { id: "par", from: LOCATIONS.DEL, to: LOCATIONS.PAR, duration: "≈ 9h 15m", note: "Direct to Paris", category: "europe" },
  { id: "lon", from: LOCATIONS.DEL, to: LOCATIONS.LON, duration: "≈ 9h 30m", note: "Direct to London", category: "europe" },
  { id: "swi", from: LOCATIONS.DEL, to: LOCATIONS.SWI, duration: "≈ 8h 50m", note: "Alps gateway", category: "europe" },
  { id: "rom", from: LOCATIONS.DEL, to: LOCATIONS.ROM, duration: "≈ 8h 40m", note: "Eternal city", category: "europe" },
  { id: "vce", from: LOCATIONS.ROM, to: LOCATIONS.VCE, duration: "≈ 1h 05m", note: "Venetian canals", category: "europe" },
  { id: "bcn", from: LOCATIONS.DEL, to: LOCATIONS.BCN, duration: "≈ 9h 40m", note: "Catalan direct", category: "europe" },
  { id: "ams", from: LOCATIONS.DEL, to: LOCATIONS.AMS, duration: "≈ 9h 05m", note: "Direct to Amsterdam", category: "europe" },
  { id: "prg", from: LOCATIONS.DEL, to: LOCATIONS.PRG, duration: "≈ 8h 35m", note: "Heart of Bohemia", category: "europe" },
  { id: "kef", from: LOCATIONS.LON, to: LOCATIONS.KEF, duration: "≈ 3h 10m", note: "Aurora corridor", category: "europe" },
  { id: "vie", from: LOCATIONS.DEL, to: LOCATIONS.VIE, duration: "≈ 8h 15m", note: "Imperial gateway", category: "europe" },
  { id: "san", from: LOCATIONS.ROM, to: LOCATIONS.SAN, duration: "≈ 2h 20m", note: "Aegean hop", category: "europe" },

  // Americas
  { id: "dxb_nyc", from: LOCATIONS.DXB, to: LOCATIONS.NYC, duration: "≈ 14h 20m", note: "Global flagship", category: "americas" },
  { id: "lon_nyc", from: LOCATIONS.LON, to: LOCATIONS.NYC, duration: "≈ 7h 55m", note: "Transatlantic route", category: "americas" },
  { id: "nyc_lax", from: LOCATIONS.NYC, to: LOCATIONS.LAX, duration: "≈ 5h 45m", note: "Coast to coast", category: "americas" },
  { id: "sfo", from: LOCATIONS.NYC, to: LOCATIONS.SFO, duration: "≈ 6h 15m", note: "Pacific gateway", category: "americas" },
  { id: "las", from: LOCATIONS.LAX, to: LOCATIONS.LAS, duration: "≈ 1h 10m", note: "Desert express", category: "americas" },
  { id: "hnl", from: LOCATIONS.LAX, to: LOCATIONS.HNL, duration: "≈ 5h 45m", note: "Pacific paradise", category: "americas" },
  { id: "yyc", from: LOCATIONS.NYC, to: LOCATIONS.YYC, duration: "≈ 4h 50m", note: "Canadian Rockies", category: "americas" },
  { id: "cun", from: LOCATIONS.NYC, to: LOCATIONS.CUN, duration: "≈ 4h 15m", note: "Caribbean escape", category: "americas" },
  { id: "par_rio", from: LOCATIONS.PAR, to: LOCATIONS.RIO, duration: "≈ 11h 30m", note: "South Atlantic", category: "americas" },
  { id: "cuz", from: LOCATIONS.RIO, to: LOCATIONS.CUZ, duration: "≈ 5h 20m", note: "Andean wonder", category: "americas" },
  { id: "eze", from: LOCATIONS.RIO, to: LOCATIONS.EZE, duration: "≈ 3h 15m", note: "Rio-Buenos Aires hop", category: "americas" },

  // Asia & Indian Ocean Escapes
  { id: "mle", from: LOCATIONS.DEL, to: LOCATIONS.MLE, duration: "≈ 4h 10m", note: "Direct to Maldives", category: "asia" },
  { id: "bkk", from: LOCATIONS.DEL, to: LOCATIONS.BKK, duration: "≈ 4h 10m", note: "Nonstop, daily", category: "asia" },
  { id: "dps", from: LOCATIONS.DEL, to: LOCATIONS.DPS, duration: "≈ 7h 15m", note: "Island gateway", category: "asia" },
  { id: "sin", from: LOCATIONS.DEL, to: LOCATIONS.SIN, duration: "≈ 5h 30m", note: "Nonstop, daily", category: "asia" },
  { id: "han", from: LOCATIONS.DEL, to: LOCATIONS.HAN, duration: "≈ 4h 30m", note: "Nonstop, daily", category: "asia" },
  { id: "cmb", from: LOCATIONS.DEL, to: LOCATIONS.CMB, duration: "≈ 3h 35m", note: "Island hop", category: "asia" },
  { id: "vte", from: LOCATIONS.BKK, to: LOCATIONS.VTE, duration: "≈ 1h 10m", note: "Indochina hop", category: "asia" },
  { id: "tyo", from: LOCATIONS.DEL, to: LOCATIONS.TYO, duration: "≈ 8h 20m", note: "Nonstop to Tokyo", category: "asia" },
  { id: "uky", from: LOCATIONS.TYO, to: LOCATIONS.UKY, duration: "≈ 1h 15m", note: "Cultural corridor", category: "asia" },
  { id: "icn", from: LOCATIONS.DEL, to: LOCATIONS.ICN, duration: "≈ 7h 45m", note: "Direct to Seoul", category: "asia" },
  { id: "syd", from: LOCATIONS.SIN, to: LOCATIONS.SYD, duration: "≈ 7h 50m", note: "Pacific corridor", category: "oceania" },
  { id: "mel", from: LOCATIONS.SYD, to: LOCATIONS.MEL, duration: "≈ 1h 35m", note: "Aussie corridor", category: "oceania" },
  { id: "zqn", from: LOCATIONS.SYD, to: LOCATIONS.ZQN, duration: "≈ 3h 10m", note: "Southern Alps hop", category: "oceania" },

  // Middle East & Africa
  { id: "cai", from: LOCATIONS.DXB, to: LOCATIONS.CAI, duration: "≈ 3h 45m", note: "Nile corridor", category: "africa" },
  { id: "cpt", from: LOCATIONS.DXB, to: LOCATIONS.CPT, duration: "≈ 9h 40m", note: "African gateway", category: "africa" },
  { id: "rak", from: LOCATIONS.DXB, to: LOCATIONS.RAK, duration: "≈ 8h 30m", note: "Sahara gateway", category: "africa" },
  { id: "amm", from: LOCATIONS.DXB, to: LOCATIONS.AMM, duration: "≈ 3h 25m", note: "Rose city flight", category: "middle_east" },
  { id: "jro", from: LOCATIONS.DXB, to: LOCATIONS.JRO, duration: "≈ 5h 30m", note: "Safari corridor", category: "africa" },

  // Domestic Wonders
  { id: "sxr", from: LOCATIONS.DEL, to: LOCATIONS.SXR, duration: "≈ 1h 25m", note: "Mountain paradise", category: "domestic" },
  { id: "cok", from: LOCATIONS.DEL, to: LOCATIONS.COK, duration: "≈ 3h 10m", note: "Backwaters & coast", category: "domestic" },
  { id: "ixz", from: LOCATIONS.DEL, to: LOCATIONS.IXZ, duration: "≈ 3h 45m", note: "Pristine islands", category: "domestic" },
  { id: "jai", from: LOCATIONS.DEL, to: LOCATIONS.JAI, duration: "≈ 0h 55m", note: "Royal heritage hop", category: "domestic" },
];

const EARTH_RADIUS = 2.0;
const CLOUD_RADIUS = EARTH_RADIUS + 0.018;
const HALO_RADIUS = EARTH_RADIUS + 0.22;
// Pins and rings sit just above the cloud deck so clouds never swallow them.
const PIN_ALTITUDE = 0.022;

const COLOR_ORANGE = 0xff5b04;
const COLOR_ROUTE_IDLE = 0x0284c7; // rgba(2, 132, 199, 0.35)
const ROUTE_IDLE_OPACITY = 0.35;
const COLOR_ATMOSPHERE = 0x38bdf8;

// Flight timing. One cycle = takeoff → touchdown → a beat on the ground → relaunch.
const FLIGHT_SECONDS = 4.6;
const GROUND_SECONDS = 0.8;
const TRAIL_STEPS = 25;
const TRAIL_SPACING = 0.011; // arc-length fraction between contrail samples
const PARKED_T = 0.62; // reduced motion: the aircraft holds here

// Orientation physics (radians, seconds).
const FOCUS_ELEVATION = 0.0; // Centered dead-on; no offset or top clipping
const SWAY = 0.42; // idle auto-rotation drifts ± this far around the corridor
const AUTO_SPEED = 0.07;
const RETURN_DELAY = 1.6; // after a drag, wait this long before drifting home
const RETURN_SPEED = 0.9;
const DAMPING = 3.6; // velocity blend rate — increased for controlled, less slippery spin
const PITCH_LIMIT = [-0.5, 1.0];

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;
const wrapPi = (a) => Math.atan2(Math.sin(a), Math.cos(a));

function latLngToVec3(lat, lng, radius, altitude = 0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + altitude;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function vec3ToLatLng(v) {
  const n = v.clone().normalize();
  const lat = 90 - Math.acos(n.y) * (180 / Math.PI);
  const lng = Math.atan2(n.z, -n.x) * (180 / Math.PI) - 180;
  return { lat, lng };
}

/**
 * Elevated arc between two airports. The control point is lifted with distance
 * and nudged south, so DEL/ATQ → UAE bows out over the Arabian Sea instead of
 * cutting across Balochistan — which also gives the aircraft a real turn to bank into.
 */
function buildRouteCurve(from, to) {
  const vFrom = latLngToVec3(from.lat, from.lng, EARTH_RADIUS);
  const vTo = latLngToVec3(to.lat, to.lng, EARTH_RADIUS);
  const angle = vFrom.angleTo(vTo);
  const mid = vFrom.clone().add(vTo).normalize();
  const arcLift = Math.min(0.72, 0.22 + angle * 0.35);
  const control = mid.multiplyScalar(EARTH_RADIUS + arcLift);
  return new THREE.QuadraticBezierCurve3(vFrom, control, vTo);
}

/** Euler (pitch, yaw) that turns `point` (earth-local) to face the camera. */
function facingAngles(point) {
  const { x, y, z } = point;
  return {
    yaw: Math.atan2(-x, z),
    pitch: Math.atan2(y, Math.hypot(x, z)) - FOCUS_ELEVATION,
  };
}

// Stylised jet. Nose +Z, up +Y, so the flight basis can be written straight in.
function createAirplane() {
  const plane = new THREE.Group();

  const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35, metalness: 0.25 });
  const orange = new THREE.MeshStandardMaterial({
    color: COLOR_ORANGE,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.4,
    metalness: 0.2,
    side: THREE.DoubleSide,
  });

  const bodyGeo = new THREE.CapsuleGeometry(0.026, 0.2, 4, 12);
  bodyGeo.rotateX(Math.PI / 2);
  plane.add(new THREE.Mesh(bodyGeo, white));

  const cockpit = new THREE.Mesh(
    new THREE.SphereGeometry(0.02, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0x0f172a })
  );
  cockpit.position.set(0, 0.012, 0.1);
  cockpit.scale.set(0.8, 0.45, 1.3);
  plane.add(cockpit);

  // Shapes are drawn with y = forward and rotated flat into the XZ plane.
  const flat = (points) => {
    const shape = new THREE.Shape();
    points.forEach(([x, y], i) => (i ? shape.lineTo(x, y) : shape.moveTo(x, y)));
    shape.closePath();
    const geo = new THREE.ShapeGeometry(shape);
    geo.rotateX(Math.PI / 2);
    return geo;
  };

  plane.add(
    new THREE.Mesh(
      flat([[0, 0.06], [0.22, -0.04], [0.22, -0.065], [0, -0.03], [-0.22, -0.065], [-0.22, -0.04]]),
      wingMat
    )
  );
  plane.add(
    new THREE.Mesh(
      flat([[0, -0.09], [0.08, -0.135], [0.08, -0.15], [0, -0.13], [-0.08, -0.15], [-0.08, -0.135]]),
      wingMat
    )
  );

  // Vertical fin: drawn with x = forward, y = up, then turned into the YZ plane.
  const finShape = new THREE.Shape();
  finShape.moveTo(-0.07, 0);
  finShape.lineTo(-0.135, 0);
  finShape.lineTo(-0.15, 0.075);
  finShape.lineTo(-0.12, 0.075);
  finShape.closePath();
  const finGeo = new THREE.ShapeGeometry(finShape);
  finGeo.rotateY(-Math.PI / 2);
  plane.add(new THREE.Mesh(finGeo, orange));

  const engineGeo = new THREE.CylinderGeometry(0.011, 0.009, 0.05, 10);
  engineGeo.rotateX(Math.PI / 2);
  [0.085, -0.085].forEach((x) => {
    const engine = new THREE.Mesh(engineGeo, white);
    engine.position.set(x, -0.012, 0.012);
    plane.add(engine);
  });

  const tipGeo = new THREE.BoxGeometry(0.008, 0.02, 0.026);
  const tipMat = new THREE.MeshBasicMaterial({ color: COLOR_ORANGE });
  [0.218, -0.218].forEach((x) => {
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.set(x, 0.006, -0.052);
    plane.add(tip);
  });

  return plane;
}

function createGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createActiveLabelTexture({ code, name }) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 80;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(4, 8, 248, 64, 32);
  else ctx.rect(4, 8, 248, 64);
  ctx.fill();

  ctx.strokeStyle = "#FF5B04";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.textBaseline = "middle";
  ctx.font = "700 28px Poppins, system-ui, sans-serif";
  ctx.fillStyle = "#FF5B04";
  ctx.fillText(code, 26, 41);
  const codeWidth = ctx.measureText(code).width;
  ctx.font = "600 24px Poppins, system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, 26 + codeWidth + 12, 41);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createLocationLabelTexture({ name, colorHex = "#38bdf8" }) {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 56;
  const ctx = canvas.getContext("2d");

  // Translucent dark glass pill
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(4, 4, 192, 48, 24);
  else ctx.rect(4, 4, 192, 48);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Color dot
  ctx.fillStyle = colorHex;
  ctx.beginPath();
  ctx.arc(24, 28, 5, 0, Math.PI * 2);
  ctx.fill();

  // Name
  ctx.textBaseline = "middle";
  ctx.font = "600 21px Poppins, system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, 38, 29);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Shader colours go through <colorspace_fragment> so #FF5B04 lands on screen as #FF5B04.
const RouteShader = {
  vertexShader: `
    varying vec2 vUv;
    varying float vFacing;
    void main() {
      vUv = uv;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vec3 n = normalize(normalMatrix * normal);
      vFacing = abs(dot(n, normalize(-mv.xyz)));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uIdleColor;
    uniform vec3 uActiveColor;
    uniform float uIdleOpacity;
    uniform float uActive;
    uniform float uTime;
    uniform float uHead;
    varying vec2 vUv;
    varying float vFacing;
    void main() {
      float u = vUv.x;
      float ends = smoothstep(0.0, 0.04, u) * smoothstep(1.0, 0.96, u);
      float core = 0.4 + 0.6 * pow(vFacing, 1.5);

      // Dashes marching toward the destination.
      float f = fract(u * 22.0 - uTime * 1.4);
      float dash = smoothstep(0.0, 0.12, f) * smoothstep(0.62, 0.5, f);

      // Light pulse riding with the aircraft, comet tail behind it.
      float behind = uHead - u;
      float pulse = smoothstep(-0.012, 0.0, behind) * exp(-max(behind, 0.0) * 9.0);

      float activeAlpha = 0.42 + 0.4 * dash + 0.9 * pulse;
      float alpha = mix(uIdleOpacity, activeAlpha, uActive) * core * ends;

      vec3 color = mix(uIdleColor, uActiveColor, uActive);
      color = mix(color, vec3(1.0, 0.88, 0.66), pulse * uActive * 0.7);

      gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
      #include <colorspace_fragment>
    }
  `,
};

const ContrailShader = {
  vertexShader: `
    attribute float aAlpha;
    attribute float aSide;
    varying float vAlpha;
    varying float vSide;
    void main() {
      vAlpha = aAlpha;
      vSide = aSide;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uHeadColor;
    uniform vec3 uTailColor;
    varying float vAlpha;
    varying float vSide;
    void main() {
      float edge = pow(1.0 - abs(vSide), 1.4);
      vec3 color = mix(uTailColor, uHeadColor, vAlpha);
      gl_FragColor = vec4(color, vAlpha * edge * 0.9);
      #include <colorspace_fragment>
    }
  `,
};

const FresnelVertex = `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Outer halo, rendered on the back faces of the larger sphere. -dot(n, v) is 0 at
// the halo's silhouette and ~0.43 where the planet's limb occludes it, so the
// glow peaks against the Earth and diffuses to nothing out in space.
const HaloShader = {
  vertexShader: FresnelVertex,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float f = clamp(-dot(vNormal, vView), 0.0, 1.0);
      float glow = pow(smoothstep(0.0, 0.46, f), 2.2);
      gl_FragColor = vec4(uColor, glow * 0.85);
      #include <colorspace_fragment>
    }
  `,
};

// Thin inner rim on the disc itself — the bright blue limb of the Chile Globe look.
const RimShader = {
  vertexShader: FresnelVertex,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
      float rim = 1.0 - clamp(dot(vNormal, vView), 0.0, 1.0);
      gl_FragColor = vec4(uColor, pow(rim, 3.2) * 0.95);
      #include <colorspace_fragment>
    }
  `,
};

// Colour grade on the Blue Marble texture (linear space, after the map sample):
// lift saturation for lush land, push blue-dominant texels toward a deep azure.
function gradeEarthShader(shader) {
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <map_fragment>",
    `#include <map_fragment>
    {
      float luma = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
      diffuseColor.rgb = max(mix(vec3(luma), diffuseColor.rgb, 1.3), 0.0);
      float water = smoothstep(0.008, 0.04, diffuseColor.b - max(diffuseColor.r, diffuseColor.g));
      diffuseColor.rgb *= mix(vec3(1.0), vec3(0.82, 1.08, 1.3), water);
    }`
  );
}

export default function Globe({ className, activeRoute = "dxb", onSelectRoute }) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const [ready, setReady] = useState(false);

  const onSelectRouteRef = useRef(onSelectRoute);
  onSelectRouteRef.current = onSelectRoute;

  const reduceMotion = useReducedMotion();
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  const initialRouteRef = useRef(activeRoute);

  useEffect(() => {
    controlsRef.current?.selectRoute(activeRoute);
  }, [activeRoute]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let disposed = false;
    const width = mount.clientWidth || 460;
    const height = mount.clientHeight || 460;

    // ── 1. Scene, Camera, Renderer ──
    const scene = new THREE.Scene();

    // Camera distance & zoom constraints (calibrated for smaller, non-interfering globe)
    const DEFAULT_DIST = 7.5;
    const MIN_DIST = 5.2;
    const MAX_DIST = 9.8;
    let currentDist = DEFAULT_DIST;
    let targetDist = DEFAULT_DIST;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, DEFAULT_DIST);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const dom = renderer.domElement;
    dom.style.width = "100%";
    dom.style.height = "100%";
    dom.style.display = "block";
    dom.style.cursor = "grab";
    // Crucial: touchAction = "none" prevents browser native pinch-zoom from zooming the whole website
    dom.style.touchAction = "none";
    mount.appendChild(dom);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // ── 2. Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(4, 3, 5);
    scene.add(sunLight);
    const rimLight = new THREE.DirectionalLight(COLOR_ATMOSPHERE, 1.0);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // ── 3. Earth ──
    const textureLoader = new THREE.TextureLoader();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const loadTexture = (url, onLoad, onError) =>
      textureLoader.load(
        url,
        (tex) => {
          if (disposed) {
            tex.dispose();
            return;
          }
          tex.anisotropy = maxAniso;
          onLoad(tex);
        },
        undefined,
        () => !disposed && onError?.()
      );

    // Deep navy until the texture streams in.
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x0b2a5b,
      roughness: 0.65,
      metalness: 0.1,
    });
    earthMat.onBeforeCompile = gradeEarthShader;
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(EARTH_RADIUS, 96, 96), earthMat);
    earthGroup.add(earthMesh);

    loadTexture(
      "/assets/images/earth-blue-marble.jpg",
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        earthMat.map = tex;
        earthMat.color.setHex(0xffffff);
        earthMat.needsUpdate = true;
        setReady(true);
      },
      // The navy sphere still carries the routes; reveal it rather than hang on the skeleton.
      () => setReady(true)
    );

    // ── 4. Drifting cloud deck ──
    const cloudMat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      roughness: 1,
      metalness: 0,
    });
    const cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(CLOUD_RADIUS, 96, 96), cloudMat);
    cloudMesh.visible = false;
    cloudMesh.renderOrder = 1;
    earthGroup.add(cloudMesh);

    // White texels with real alpha, so normal blending rather than additive.
    loadTexture("/assets/images/earth-clouds.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      cloudMat.map = tex;
      cloudMat.needsUpdate = true;
      cloudMesh.visible = true;
    });

    // ── 5. Atmosphere: inner Fresnel rim + outer halo ──
    const atmosphereColor = new THREE.Color(COLOR_ATMOSPHERE);
    const rimMesh = new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_RADIUS + 0.03, 64, 64),
      new THREE.ShaderMaterial({
        ...RimShader,
        uniforms: { uColor: { value: atmosphereColor } },
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      })
    );
    rimMesh.renderOrder = 2;
    scene.add(rimMesh);

    const haloMesh = new THREE.Mesh(
      new THREE.SphereGeometry(HALO_RADIUS, 64, 64),
      new THREE.ShaderMaterial({
        ...HaloShader,
        uniforms: { uColor: { value: atmosphereColor } },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      })
    );
    scene.add(haloMesh);

    // ── 6. Flight arcs ──
    // Tubes rather than Lines: WebGL ignores linewidth, so a 1px line is all a Line can be.
    const routes = new Map();
    FLIGHT_ROUTES.forEach((route) => {
      const curve = buildRouteCurve(route.from, route.to);
      const isActive = route.id === initialRouteRef.current;
      const material = new THREE.ShaderMaterial({
        ...RouteShader,
        uniforms: {
          uIdleColor: { value: new THREE.Color(COLOR_ROUTE_IDLE) },
          uActiveColor: { value: new THREE.Color(COLOR_ORANGE) },
          uIdleOpacity: { value: ROUTE_IDLE_OPACITY },
          uActive: { value: isActive ? 1 : 0 },
          uTime: { value: 0 },
          uHead: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
      });
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 96, 0.011, 8, false), material);
      tube.renderOrder = 3;
      earthGroup.add(tube);
      routes.set(route.id, {
        ...route,
        curve,
        material,
        mix: isActive ? 1 : 0,
        home: facingAngles(curve.getPointAt(0.5)),
      });
    });

    // ── 7. Aircraft + contrail ribbon ──
    const airplane = createAirplane();
    const PLANE_SCALE = 0.42;
    airplane.scale.setScalar(PLANE_SCALE);
    earthGroup.add(airplane);

    const trailPositions = new Float32Array(TRAIL_STEPS * 2 * 3);
    const trailAlpha = new Float32Array(TRAIL_STEPS * 2);
    const trailSide = new Float32Array(TRAIL_STEPS * 2);
    const trailIndex = [];
    for (let i = 0; i < TRAIL_STEPS; i++) {
      trailSide[i * 2] = -1;
      trailSide[i * 2 + 1] = 1;
      if (i < TRAIL_STEPS - 1) {
        const a = i * 2;
        trailIndex.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute("aAlpha", new THREE.BufferAttribute(trailAlpha, 1).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute("aSide", new THREE.BufferAttribute(trailSide, 1));
    trailGeo.setIndex(trailIndex);
    const trailMesh = new THREE.Mesh(
      trailGeo,
      new THREE.ShaderMaterial({
        ...ContrailShader,
        uniforms: {
          uHeadColor: { value: new THREE.Color(0xfffaf0) },
          uTailColor: { value: new THREE.Color(0xffc56b) },
        },
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    // Vertices move every frame, so the stale bounding sphere must not cull it.
    trailMesh.frustumCulled = false;
    trailMesh.renderOrder = 5;
    earthGroup.add(trailMesh);

    // ── 8. Airport pins, radar ripples, labels ──
    const glowTexture = createGlowTexture();
    const needleGeo = new THREE.CylinderGeometry(0.0035, 0.0035, 0.06, 6);
    needleGeo.translate(0, 0.03, 0);
    const headGeo = new THREE.SphereGeometry(0.02, 16, 12);
    const ringGeo = new THREE.RingGeometry(0.026, 0.034, 48);
    const hitGeo = new THREE.SphereGeometry(0.085, 8, 8);
    const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    const yAxis = new THREE.Vector3(0, 1, 0);
    const zAxis = new THREE.Vector3(0, 0, 1);
    const pinActive = new THREE.Color(COLOR_ORANGE);
    const hitTargets = [];

    const airports = Object.values(LOCATIONS).map((loc) => {
      const base = latLngToVec3(loc.lat, loc.lng, EARTH_RADIUS, PIN_ALTITUDE);
      const normal = base.clone().normalize();
      const baseColor = new THREE.Color(loc.colorHex || 0x38bdf8);

      const pinMat = new THREE.MeshBasicMaterial({ color: baseColor.clone() });
      const needle = new THREE.Mesh(needleGeo, pinMat);
      needle.position.copy(base);
      needle.quaternion.setFromUnitVectors(yAxis, normal);
      earthGroup.add(needle);

      const headPos = base.clone().addScaledVector(normal, 0.062);
      const head = new THREE.Mesh(headGeo, pinMat);
      head.position.copy(headPos);
      earthGroup.add(head);

      // Invisible hit sphere for click/tap interaction
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.copy(headPos);
      hitMesh.userData = { code: loc.code };
      earthGroup.add(hitMesh);
      hitTargets.push(hitMesh);

      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          color: baseColor.clone(),
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        })
      );
      glow.position.copy(headPos);
      glow.scale.setScalar(0.13);
      glow.renderOrder = 4;
      earthGroup.add(glow);

      // Two radar sweep rings
      const rings = [0, 0.5].map((phase) => {
        const mesh = new THREE.Mesh(
          ringGeo,
          new THREE.MeshBasicMaterial({
            color: baseColor.clone(),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            depthWrite: false,
          })
        );
        mesh.position.copy(base);
        mesh.quaternion.setFromUnitVectors(zAxis, normal);
        mesh.renderOrder = 3;
        earthGroup.add(mesh);
        return { mesh, phase };
      });

      // Active bold billboard label (for current route endpoints)
      const activeLabel = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: createActiveLabelTexture(loc),
          transparent: true,
          opacity: 0,
          depthWrite: false,
          toneMapped: false,
        })
      );
      activeLabel.position.copy(base.clone().addScaledVector(normal, 0.22));
      activeLabel.scale.set(0.44, 0.14, 1);
      activeLabel.renderOrder = 7;
      activeLabel.visible = false;
      earthGroup.add(activeLabel);

      // Compact micro-pill destination label (visible when facing viewer)
      const destLabel = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: createLocationLabelTexture(loc),
          transparent: true,
          opacity: 0,
          depthWrite: false,
          toneMapped: false,
        })
      );
      destLabel.position.copy(base.clone().addScaledVector(normal, 0.14));
      destLabel.scale.set(0.32, 0.09, 1);
      destLabel.renderOrder = 6;
      destLabel.visible = false;
      earthGroup.add(destLabel);

      return {
        code: loc.code,
        name: loc.name,
        base,
        baseColor,
        pinMat,
        glow,
        rings,
        activeLabel,
        destLabel,
        mix: 0,
      };
    });

    // ── 9. Orientation state & route selection ──
    let currentRoute = routes.get(initialRouteRef.current) || routes.values().next().value;
    let yaw = currentRoute.home.yaw;
    let pitch = currentRoute.home.pitch;
    let yawVel = 0;
    let pitchVel = 0;
    let swayDir = 1;
    let focus = null; // active slerp: { from, to, start, duration }
    let lastInteraction = performance.now();
    let launchedAt = performance.now();
    const euler = new THREE.Euler(0, 0, 0, "XYZ");

    const selectRoute = (id) => {
      const next = routes.get(id);
      if (!next || next === currentRoute) return;
      currentRoute = next;
      launchedAt = performance.now();

      const target = new THREE.Quaternion().setFromEuler(euler.set(next.home.pitch, next.home.yaw, 0));
      const angle = earthGroup.quaternion.angleTo(target);
      if (reduceMotionRef.current || angle < 0.02) {
        yaw = next.home.yaw;
        pitch = next.home.pitch;
        yawVel = pitchVel = 0;
        return;
      }
      focus = {
        from: earthGroup.quaternion.clone(),
        to: target,
        start: performance.now(),
        duration: Math.min(1.8, 0.7 + angle * 0.6),
      };
    };
    controlsRef.current = {
      selectRoute,
      zoomIn: () => {
        targetDist = Math.max(MIN_DIST, targetDist - 0.85);
        lastInteraction = performance.now();
      },
      zoomOut: () => {
        targetDist = Math.min(MAX_DIST, targetDist + 0.85);
        lastInteraction = performance.now();
      },
      resetZoom: () => {
        targetDist = DEFAULT_DIST;
        lastInteraction = performance.now();
      },
    };

    const endFocus = (completed) => {
      if (completed) {
        yaw = currentRoute.home.yaw;
        pitch = currentRoute.home.pitch;
      } else {
        euler.setFromQuaternion(earthGroup.quaternion, "XYZ");
        yaw = euler.y;
        pitch = euler.x;
      }
      yawVel = pitchVel = 0;
      swayDir = 1;
      focus = null;
    };

    // ── 10. Drag with inertia ──
    let dragging = false;
    let last = { x: 0, y: 0, t: 0 };
    let pointerDownPos = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e) => {
      if (focus) endFocus(false);
      dragging = true;
      last = { x: e.clientX, y: e.clientY, t: performance.now() };
      pointerDownPos = { x: e.clientX, y: e.clientY };
      yawVel = pitchVel = 0;
      dom.setPointerCapture?.(e.pointerId);
      dom.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(0.001, (now - last.t) / 1000);
      // Calibrated sensitivity: smooth, heavy, non-twitchy drag response
      const k = (Math.PI * 0.40) / Math.max(340, dom.clientWidth);
      const dYaw = (e.clientX - last.x) * k;
      const dPitch = (e.clientY - last.y) * (k * 0.7);
      yaw += dYaw;
      pitch = THREE.MathUtils.clamp(pitch + dPitch, PITCH_LIMIT[0], PITCH_LIMIT[1]);
      // Smoothed so the fling velocity reflects the gesture gently
      yawVel = THREE.MathUtils.lerp(yawVel, THREE.MathUtils.clamp(dYaw / dt, -1.4, 1.4), 0.35);
      pitchVel = THREE.MathUtils.lerp(pitchVel, THREE.MathUtils.clamp(dPitch / dt, -0.9, 0.9), 0.35);
      last = { x: e.clientX, y: e.clientY, t: now };
    };

    const onPointerUp = (e) => {
      if (!dragging) return;
      dragging = false;
      const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moved < 8) {
        // Tap / Click detection: raycast against airport hit spheres
        const rect = dom.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitTargets, false);
        if (hits.length > 0) {
          const clickedCode = hits[0].object.userData.code;
          // Find matching route for this destination
          const targetRoute = FLIGHT_ROUTES.find(
            (r) => r.to.code === clickedCode || r.from.code === clickedCode
          );
          if (targetRoute) {
            selectRoute(targetRoute.id);
            onSelectRouteRef.current?.(targetRoute.id);
          }
        }
      }
      // A pointer held still before release should not fling.
      if (performance.now() - last.t > 80) yawVel = pitchVel = 0;
      lastInteraction = performance.now();
      dom.releasePointerCapture?.(e.pointerId);
      dom.style.cursor = "grab";
    };

    dom.addEventListener("pointerdown", onPointerDown);
    dom.addEventListener("pointermove", onPointerMove);
    dom.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("pointercancel", onPointerUp);

    // ── 10b. Globe Zoom (Wheel, Trackpad Pinch, Touch Pinch) ──
    const onWheel = (e) => {
      // PREVENT BROWSER ZOOM: Stop browser from zooming the entire website
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY;
      // Trackpad pinch-to-zoom sets e.ctrlKey = true on wheel events; gentle factor
      const factor = e.ctrlKey ? 0.005 : 0.0008;
      const zoomDelta = THREE.MathUtils.clamp(delta * factor, -0.15, 0.15);
      targetDist = THREE.MathUtils.clamp(targetDist * (1 + zoomDelta), MIN_DIST, MAX_DIST);
      lastInteraction = performance.now();
    };

    let touchPinchStart = 0;
    let distAtPinchStart = DEFAULT_DIST;

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchPinchStart = Math.hypot(dx, dy);
        distAtPinchStart = targetDist;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2 && touchPinchStart > 0) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentPinch = Math.hypot(dx, dy);
        const scale = touchPinchStart / Math.max(1, currentPinch);
        targetDist = THREE.MathUtils.clamp(distAtPinchStart * scale, MIN_DIST, MAX_DIST);
        lastInteraction = performance.now();
      }
    };

    const onTouchEnd = (e) => {
      if (e.touches.length < 2) {
        touchPinchStart = 0;
      }
    };

    dom.addEventListener("wheel", onWheel, { passive: false });
    dom.addEventListener("touchstart", onTouchStart, { passive: false });
    dom.addEventListener("touchmove", onTouchMove, { passive: false });
    dom.addEventListener("touchend", onTouchEnd);

    // ── 11. Animation loop ──
    // Scratch objects, so the loop allocates nothing per frame.
    const point = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const tangentAhead = new THREE.Vector3();
    const up = new THREE.Vector3();
    const left = new THREE.Vector3();
    const basis = new THREE.Matrix4();
    const side = new THREE.Vector3();
    let bank = 0;
    let elapsed = 0;
    let lastFrame = performance.now();
    let animId = 0;

    const updateOrientation = (now, dt, reduced) => {
      if (focus) {
        const p = THREE.MathUtils.clamp((now - focus.start) / 1000 / focus.duration, 0, 1);
        earthGroup.quaternion.slerpQuaternions(focus.from, focus.to, easeInOutSine(p));
        if (p >= 1) endFocus(true);
        return;
      }

      if (!dragging) {
        const idle = (now - lastInteraction) / 1000;
        const offset = wrapPi(yaw - currentRoute.home.yaw);
        let targetVel;
        if (reduced) {
          targetVel = 0;
        } else if (idle > RETURN_DELAY && Math.abs(offset) > SWAY + 0.05) {
          targetVel = -Math.sign(offset) * Math.min(RETURN_SPEED, Math.abs(offset) * 1.2);
        } else {
          if (offset > SWAY) swayDir = -1;
          else if (offset < -SWAY) swayDir = 1;
          targetVel = swayDir * AUTO_SPEED;
        }
        const blend = 1 - Math.exp(-dt * DAMPING);
        yawVel += (targetVel - yawVel) * blend;
        pitchVel -= pitchVel * blend;
        yaw += yawVel * dt;
        pitch = THREE.MathUtils.clamp(pitch + pitchVel * dt, PITCH_LIMIT[0], PITCH_LIMIT[1]);
        if (!reduced && idle > RETURN_DELAY) {
          pitch += (currentRoute.home.pitch - pitch) * (1 - Math.exp(-dt * 1.2));
        }
      }
      earthGroup.rotation.set(pitch, yaw, 0);
    };

    const updateFlight = (now, reduced) => {
      const { curve } = currentRoute;
      let s = PARKED_T;
      let ground = 0;
      if (!reduced) {
        // t = (time * speed) % 1, offset by the launch so a route switch takes off from the gate.
        const c = (Math.max(0, now - launchedAt) / 1000) % (FLIGHT_SECONDS + GROUND_SECONDS);
        if (c < FLIGHT_SECONDS) s = c / FLIGHT_SECONDS;
        else {
          s = 1;
          ground = (c - FLIGHT_SECONDS) / GROUND_SECONDS;
        }
      }
      // Ease in and out: the aircraft accelerates off the runway and slows into landing.
      const t = reduced ? s : easeInOutSine(s);

      curve.getPointAt(t, point);
      curve.getTangentAt(t, tangent);
      curve.getTangentAt(Math.min(1, t + 0.01), tangentAhead);

      // Basis: nose along the tangent, up along the surface normal, wings across.
      up.copy(point).normalize();
      up.addScaledVector(tangent, -up.dot(tangent)).normalize();
      left.crossVectors(up, tangent);
      basis.makeBasis(left, up, tangent);
      airplane.position.copy(point);
      airplane.quaternion.setFromRotationMatrix(basis);

      // Bank into the turn: lateral change of heading rolls the wings, smoothed.
      const lateral = tangentAhead.sub(tangent).dot(left) / 0.01;
      bank += (THREE.MathUtils.clamp(-lateral * 1.6, -0.4, 0.4) - bank) * 0.1;
      airplane.rotateZ(bank);

      const envelope = reduced ? 1 : smoothstep(0, 0.07, s) * (1 - smoothstep(0.93, 1, s));
      airplane.scale.setScalar(PLANE_SCALE * Math.max(0.001, envelope));
      airplane.visible = envelope > 0.001;

      // Contrail: sampled back along the arc rather than from frame history, so its
      // length is the same at 60Hz and 120Hz and it never streaks across a loop restart.
      const fade = 1 - ground;
      for (let i = 0; i < TRAIL_STEPS; i++) {
        const ti = t - (i + 0.6) * TRAIL_SPACING;
        const k = i / (TRAIL_STEPS - 1);
        const alpha = ti < 0 ? 0 : Math.pow(1 - k, 1.4) * fade;
        const halfWidth = 0.006 + 0.016 * k; // widens as it diffuses
        curve.getPointAt(Math.max(0, ti), point);
        curve.getTangentAt(Math.max(0, ti), tangent);
        side.crossVectors(tangent, up.copy(point).normalize()).normalize().multiplyScalar(halfWidth);
        const o = i * 6;
        trailPositions[o] = point.x - side.x;
        trailPositions[o + 1] = point.y - side.y;
        trailPositions[o + 2] = point.z - side.z;
        trailPositions[o + 3] = point.x + side.x;
        trailPositions[o + 4] = point.y + side.y;
        trailPositions[o + 5] = point.z + side.z;
        trailAlpha[i * 2] = trailAlpha[i * 2 + 1] = alpha;
      }
      trailGeo.attributes.position.needsUpdate = true;
      trailGeo.attributes.aAlpha.needsUpdate = true;

      return ground > 0 ? 1 + ground * 0.4 : t;
    };

    const frame = (now) => {
      animId = requestAnimationFrame(frame);
      // The rAF timestamp is the frame's start, so it can precede a performance.now()
      // taken moments earlier. A negative dt would make every damping blend unstable.
      const dt = THREE.MathUtils.clamp((now - lastFrame) / 1000, 0, 0.05);
      lastFrame = now;
      const reduced = !!reduceMotionRef.current;
      if (!reduced) elapsed += dt;

      updateOrientation(now, dt, reduced);

      // Clouds drift independently: +0.0004 rad per 60Hz frame, normalised to real time.
      if (!reduced) cloudMesh.rotation.y += 0.0004 * dt * 60;

      const head = updateFlight(now, reduced);

      const mixRate = 1 - Math.exp(-dt * 6);
      routes.forEach((route) => {
        route.mix += ((route === currentRoute ? 1 : 0) - route.mix) * (reduced ? 1 : mixRate);
        const u = route.material.uniforms;
        u.uActive.value = route.mix;
        u.uTime.value = elapsed;
        u.uHead.value = route === currentRoute ? head : -1;
      });

      const endpoints = [currentRoute.from.code, currentRoute.to.code];
      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);
      const toCamera = cameraDir.clone().negate();

      airports.forEach((a) => {
        const isActiveEndpoint = endpoints.includes(a.code);
        a.mix += ((isActiveEndpoint ? 1 : 0) - a.mix) * (reduced ? 1 : mixRate);
        a.pinMat.color.copy(a.baseColor).lerp(pinActive, a.mix);
        a.glow.material.color.copy(a.pinMat.color);
        a.glow.material.opacity = 0.45 + 0.55 * a.mix;

        // Radar sweep: active pulses bright orange, idle gives subtle ambient beacon
        a.rings.forEach((ring) => {
          const p = reduced ? 0.4 : (elapsed / 2.2 + ring.phase) % 1;
          ring.mesh.scale.setScalar(1 + p * (a.mix > 0.5 ? 2.2 : 1.3));
          const ringOpacity = Math.pow(1 - p, 1.4) * (a.mix > 0.5 ? 0.85 : 0.28);
          ring.mesh.material.opacity = ringOpacity;
          ring.mesh.material.color.copy(a.mix > 0.5 ? pinActive : a.baseColor);
          ring.mesh.visible = ringOpacity > 0.01;
        });

        // Facing test: check if location is on front hemisphere towards camera
        const worldPos = a.base.clone().applyQuaternion(earthGroup.quaternion).normalize();
        const facing = worldPos.dot(toCamera);

        // Active bold billboard label (for current route endpoints)
        if (a.activeLabel) {
          const activeFacing = facing > 0.1 ? 1 : Math.max(0, (facing + 0.1) * 5);
          a.activeLabel.material.opacity = a.mix * activeFacing;
          a.activeLabel.visible = a.activeLabel.material.opacity > 0.01;
        }

        // Compact micro-pill destination label (for all destinations across the globe)
        if (a.destLabel) {
          const facingAlpha = THREE.MathUtils.clamp((facing - 0.25) / 0.35, 0, 1);
          a.destLabel.material.opacity = facingAlpha * (1 - a.mix) * 0.92;
          a.destLabel.visible = a.destLabel.material.opacity > 0.02;
        }
      });

      // Smooth camera distance interpolation (globe zoom)
      currentDist += (targetDist - currentDist) * (1 - Math.exp(-dt * 12));
      camera.position.set(0, 0, currentDist);

      renderer.render(scene, camera);
    };

    // Only animate while the globe is on screen and the tab is visible.
    let inView = true;
    const start = () => {
      if (animId || disposed || !inView || document.hidden) return;
      lastFrame = performance.now();
      animId = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(animId);
      animId = 0;
    };
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    intersection.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    // ── 12. Resize ──
    const resize = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resize.observe(mount);

    return () => {
      disposed = true;
      stop();
      controlsRef.current = null;
      intersection.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("pointermove", onPointerMove);
      dom.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("pointercancel", onPointerUp);
      dom.removeEventListener("wheel", onWheel);
      dom.removeEventListener("touchstart", onTouchStart);
      dom.removeEventListener("touchmove", onTouchMove);
      dom.removeEventListener("touchend", onTouchEnd);

      // Every geometry, material and texture (maps, canvas labels, glow sprite).
      const textures = new Set();
      scene.traverse((obj) => {
        obj.geometry?.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
        materials.forEach((m) => {
          Object.values(m).forEach((v) => v?.isTexture && textures.add(v));
          m.dispose();
        });
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      dom.remove();
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full max-w-[370px] mx-auto items-center justify-center overflow-visible select-none",
        className
      )}
    >
      {/* Skeleton until the Earth texture lands, so a flat navy ball never flashes */}
      {!ready && (
        <div
          className="absolute inset-[6%] animate-pulse rounded-full border border-brand-hairline bg-teal/5 ring-1 ring-inset ring-teal/10"
          aria-hidden="true"
        />
      )}

      {/* 3D WebGL canvas mount */}
      <motion.div
        ref={mountRef}
        className="relative z-10 size-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.6 }}
        aria-label="Interactive 3D realistic globe showing flight routes and destinations"
        role="img"
      />

      {/* Ambient celestial glow behind the globe */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(56, 189, 248, 0.15) 0%, rgba(255, 91, 4, 0.08) 55%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
