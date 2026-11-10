import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ortszeit, tag, ostern, feiertagAm, statusAm, statusText, sonne, himmel, utcAbstand, wannWieder, uhr } from './zeit.js'

const ZEITEN = { 0: [], 1: [['08:00', '18:00']], 2: [['08:00', '18:00']], 3: [['08:00', '18:00']], 4: [['08:00', '18:00']], 5: [['08:00', '18:00']], 6: [['08:00', '12:00']] }
const st = (y, m, d, h, min, sonder) => statusAm(tag(y, m, d), h * 60 + min, ZEITEN, sonder)

test('Ortszeit rechnet in Europe/Berlin, Sommer wie Winter', () => {
  const winter = ortszeit(new Date('2026-11-09T09:30:00Z'))
  assert.deepEqual([winter.h, winter.min, winter.wd, winter.key], [10, 30, 1, '2026-11-09'])
  const sommer = ortszeit(new Date('2026-07-01T22:30:00Z'))
  assert.deepEqual([sommer.h, sommer.d, sommer.wd], [0, 2, 4])
  assert.equal(utcAbstand(tag(2026, 11, 9)), 60)
  assert.equal(utcAbstand(tag(2026, 7, 1)), 120)
})

test('Ostern und bayerische Feiertage', () => {
  assert.equal(ostern(2026).key, '2026-04-05')
  assert.equal(ostern(2027).key, '2027-03-28')
  assert.equal(feiertagAm(tag(2027, 3, 26)), 'Karfreitag')
  assert.equal(feiertagAm(tag(2027, 3, 29)), 'Ostermontag')
  assert.equal(feiertagAm(tag(2026, 6, 4)), 'Fronleichnam')
  assert.equal(feiertagAm(tag(2026, 5, 14)), 'Christi Himmelfahrt')
  assert.equal(feiertagAm(tag(2026, 5, 25)), 'Pfingstmontag')
  assert.equal(feiertagAm(tag(2026, 8, 15)), 'Mariä Himmelfahrt')
  assert.equal(feiertagAm(tag(2027, 1, 6)), 'Heilige Drei Könige')
  assert.equal(feiertagAm(tag(2026, 11, 18)), null) // Buß- und Bettag ist kein gesetzlicher Feiertag
})

test('Montagvormittag: geöffnet bis 18 Uhr', () => {
  const s = st(2026, 11, 9, 10, 0)
  assert.equal(s.offen, true); assert.equal(s.bis, 1080); assert.equal(s.rest, 480)
  assert.equal(statusText(s).zeile1, 'Jetzt geöffnet')
  assert.equal(statusText(s).zeile2, 'bis 18 Uhr')
})

test('kurz vor Ladenschluss zählt die Restzeit', () => {
  const s = st(2026, 11, 9, 17, 40)
  assert.equal(statusText(s).zeile2, 'noch 20 Minuten')
})

test('Punkt 18 Uhr ist geschlossen, morgen wieder ab 8', () => {
  const s = st(2026, 11, 9, 18, 0)
  assert.equal(s.offen, false)
  assert.equal(wannWieder(s.naechste), 'morgen ab 8 Uhr')
})

test('früh am Morgen: öffnet heute um 8', () => {
  const s = st(2026, 11, 9, 7, 30)
  assert.equal(s.offen, false)
  assert.deepEqual([statusText(s).zeile1, statusText(s).zeile2], ['Wir öffnen', 'heute um 8 Uhr'])
})

test('Samstag: bis 12, danach erst Montag', () => {
  assert.equal(st(2026, 11, 14, 11, 59).offen, true)
  const s = st(2026, 11, 14, 12, 0)
  assert.equal(s.offen, false)
  assert.equal(statusText(s).zeile2, 'Montag ab 8 Uhr')
  assert.equal(statusText(st(2026, 11, 15, 15, 0)).zeile2, 'morgen ab 8 Uhr') // Sonntag
})

test('Weihnachten 2026: Freitag und Samstag Feiertag, Sonntag zu, Montag wieder da', () => {
  const s = st(2026, 12, 25, 10, 0)
  assert.equal(s.offen, false); assert.equal(s.grund, '1. Weihnachtstag')
  assert.equal(s.naechste.tag.key, '2026-12-28')
  assert.equal(statusText(s).zeile2, 'Montag ab 8 Uhr')
  assert.match(statusText(s).satz, /Heute ist 1\. Weihnachtstag/)
})

test('Feiertag unter der Woche', () => {
  const s = st(2027, 1, 6, 9, 0) // Mittwoch, Heilige Drei Könige
  assert.equal(s.offen, false)
  assert.equal(statusText(s).zeile2, 'morgen ab 8 Uhr')
})

test('Sonderöffnungszeiten gehen vor', () => {
  const sonder = [{ datum: '2026-12-24', zeiten: [['08:00', '12:00']], hinweis: 'Heiligabend' }, { datum: '2026-12-31', zeiten: [], hinweis: 'Silvester' }]
  assert.equal(st(2026, 12, 24, 11, 0, sonder).offen, true)
  assert.equal(st(2026, 12, 24, 13, 0, sonder).offen, false)
  assert.equal(st(2026, 12, 31, 10, 0, sonder).offen, false)
  assert.equal(st(2026, 12, 31, 10, 0, sonder).naechste.tag.key, '2027-01-02')
})

test('Uhrzeiten in Worten', () => {
  assert.equal(uhr(480), '8 Uhr')
  assert.equal(uhr(510), '8:30 Uhr')
})

test('Sonne über Bad Füssing', () => {
  const nov = sonne(tag(2026, 11, 9), 48.3518, 13.3171)
  assert.ok(Math.abs(nov.auf - (7 * 60 + 2)) <= 6, `Aufgang November: ${nov.auf}`)
  assert.ok(Math.abs(nov.unter - (16 * 60 + 32)) <= 6, `Untergang November: ${nov.unter}`)
  const jun = sonne(tag(2026, 6, 21), 48.3518, 13.3171)
  assert.ok(Math.abs(jun.auf - (5 * 60 + 3)) <= 6, `Aufgang Juni: ${jun.auf}`)
  assert.ok(Math.abs(jun.unter - (21 * 60 + 9)) <= 6, `Untergang Juni: ${jun.unter}`)
  assert.equal(himmel(12 * 60, nov).phase, 'tag')
  assert.equal(himmel(2 * 60, nov).phase, 'nacht')
  assert.equal(himmel(nov.auf, nov).phase, 'daemmerung')
})
