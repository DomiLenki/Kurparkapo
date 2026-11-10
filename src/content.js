/*
  ALLE INHALTE DER SEITE AN EINER STELLE.
  Wer etwas ändern möchte (Öffnungszeiten, Telefon, Texte, Bewertungen),
  ändert es hier – die Seite übernimmt es überall.

  Quellen der Angaben (geprüft am 9. November 2026):
  kurparkapo.de (Startseite, Leistungen, Impressum, Datenschutzerklärung),
  App Store und Google Play (ApothekenApp), aponet.de (Notdienst-Nummern),
  Arzneimittelpreisverordnung § 6 (Notdienstgebühr), badfuessing.com (Thermalwasser),
  Google-Eintrag der Apotheke (Bewertung, Lieferdienst, Abholung).
*/

export const apotheke = {
  name: 'Kurpark-Apotheke',
  firma: 'Kurpark-Apotheke, Stefan Johannes Lengdobler e.K.',
  inhaber: 'Stefan Johannes Lengdobler',
  strasse: 'Kurallee 18',
  plz: '94072',
  ort: 'Bad Füssing',
  telefon: '08531 / 20 22',
  telefonLink: 'tel:+4985312022',
  fax: '08531 / 98 07 77',
  email: 'info@kurparkapo.de',
  pluscode: '9828+PR Bad Füssing',
  breite: 48.35176,
  laenge: 13.31706,
  appPlz: '94072',
}

/* Öffnungszeiten: 0 = Sonntag … 6 = Samstag. Mehrere Zeitspannen pro Tag sind möglich (z. B. Mittagspause). */
export const zeiten = {
  0: [],
  1: [['08:00', '18:00']],
  2: [['08:00', '18:00']],
  3: [['08:00', '18:00']],
  4: [['08:00', '18:00']],
  5: [['08:00', '18:00']],
  6: [['08:00', '12:00']],
}

/*
  Abweichende Tage. Beispiele:
  { datum: '2026-12-24', zeiten: [['08:00', '12:00']], hinweis: 'Heiligabend' },
  { datum: '2026-12-31', zeiten: [], hinweis: 'Silvester' },
  Gesetzliche Feiertage in Bayern kennt die Seite von selbst (dann: geschlossen).
*/
export const sonderzeiten = []

/* Kurzer Hinweis ganz oben auf der Seite, z. B. 'Am 24.12. sind wir von 8 bis 12 Uhr für Sie da.' – leer lassen, wenn es nichts gibt. */
export const hinweis = ''

export const links = {
  reservieren: 'https://medikamente.apotheken.de/19478',
  notdienst: 'https://www.kurparkapo.de/leistungen/notdienst',
  original: 'https://www.kurparkapo.de/',
  appStore: 'https://apps.apple.com/de/app/apothekenapp/id506362694',
  googlePlay: 'https://play.google.com/store/apps/details?id=de.apotheken.app&hl=de',
  appDirekt: 'apothekenapp://apoid/19478',
  route: 'https://www.google.com/maps/dir/?api=1&destination=Kurpark-Apotheke%2C+Kurallee+18%2C+94072+Bad+F%C3%BCssing&destination_place_id=ChIJ1yl1RSlEdEcRdEgzm8h3BSU',
  karte: 'https://www.google.com/maps/search/?api=1&query=Kurpark-Apotheke+Bad+F%C3%BCssing&query_place_id=ChIJ1yl1RSlEdEcRdEgzm8h3BSU',
}

export const start = {
  satz: 'Ihre Apotheke an der Kurallee\u00A018, wenige Gehminuten vom Kurpark.',
  fotoAlt: 'Eingang der Kurpark-Apotheke: roter Schriftzug über den gläsernen Schiebetüren, davor zwei schwarze Pflanzkübel mit weißen Blüten.',
}

/* Die fünf Farbfelder neben dem Startbild – zugleich die Navigation */
export const kapitel = [
  { id: 'spezialitaeten', name: 'Spezialitäten', farbe: 'gelb' },
  { id: 'leistungen', name: 'Leistungen', farbe: 'gruen' },
  { id: 'app', name: 'App', farbe: 'rosa' },
  { id: 'oeffnungszeiten', name: 'Öffnungszeiten', farbe: 'blau' },
  { id: 'kontakt', name: 'Kontakt', farbe: 'rot' },
]

export const blick = {
  titel: 'Auf einen Blick',
  durchgehend: 'Durchgehend geöffnet, ohne Mittagspause.',
  sprachenTitel: 'Wir sprechen',
  sprachen: ['Deutsch', 'English', 'Français', 'Русский'],
  kartenTitel: 'Sie zahlen',
  karten: 'bar, mit EC-Karte, Mastercard oder Visa',
  telefonHinweis: 'Rufen Sie uns an',
  fotoAlt: 'Das Schild über dem Eingang: „Kurpark“ in roter Schreibschrift.',
}

export const bewertung = {
  note: '4,4',
  von: 'von 5 Sternen',
  anzahl: 73,
  stand: 'November 2026',
  quelle: 'Google-Rezensionen',
  stimmen: [
    { text: 'Sehr gute Beratung, ausgezeichneter Service, sehr kompetent und hilfsbereit.', von: 'Google-Rezension' },
    { text: 'Die Kurpark-Apotheke Bad Füssing ist für unsere Familie zur ersten Anlaufstelle in Sachen Gesundheit geworden.', von: 'Stephan G., Google-Rezension' },
    { text: 'Kompetente Angestellte sehr freundlich und schnelle Abwicklung', von: 'Google-Rezension' },
    { text: 'Super dieser Service ist perfekt, sehr netter Apotheker.', von: 'Google-Rezension' },
  ],
}

/* Sechs Besonderheiten zum Antippen. farbe = Feldfarbe des Kapitels, bild = Zeichnung */
export const spezialitaeten = {
  titel: 'Unsere Spezialitäten',
  liste: [
    { id: 'schwefelbad', name: 'Schwefelbäder', farbe: 'gelb', bild: 'wanne',
      text: 'Original Bad Füssinger Mineral-Schwefelbäder stellen wir selbst her. Fragen Sie uns nach Anwendung und Verträglichkeit.',
      notiz: 'Bad Füssings Thermalwasser ist schwefelhaltig und kommt 56 Grad heiß aus 1.000 Metern Tiefe.' },
    { id: 'kompression', name: 'Kompressionsstrümpfe', farbe: 'blau', bild: 'strumpf',
      text: 'Kompressionsstrümpfe und Bandagen messen wir in der Apotheke für Sie an.' },
    { id: 'leihgeraete', name: 'Leihgeräte', farbe: 'gruen', bild: 'waage',
      text: 'Babywaagen, Inhalatoren und elektrische Milchpumpen können Sie bei uns leihen.' },
    { id: 'hautpflege', name: 'Hautpflege', farbe: 'rosa', bild: 'tiegel',
      text: 'Schwerpunkt Haut: Eucerin, frei öl, La Roche-Posay, Medipharma Olivenölpflege, Vichy und Weleda.' },
  ],
}

/* Das vollständige Verzeichnis, wie auf kurparkapo.de unter „Leistungen“ */
export const leistungen = {
  titel: 'Alle Leistungen',
  fotoAlt: 'Die gläserne Schiebetür der Apotheke, links und rechts Pflanzkübel mit weißen Blüten.',
  gruppen: [
    { name: 'Anmessen', icon: 'Ruler', punkte: ['Bandagen', 'Kompressionsstrümpfe'] },
    { name: 'Verleih', icon: 'Baby', punkte: ['Babywaagen', 'Inhalatoren', 'elektrische Milchpumpen'] },
    { name: 'Krankenpflege', icon: 'HeartHandshake', punkte: ['Dekubitusprophylaxe', 'Inkontinenzversorgung', 'Kompressionsstrümpfe', 'Stomaversorgung'] },
    { name: 'Hautpflege', icon: 'Sparkles', punkte: ['Eucerin', 'frei öl', 'La Roche-Posay', 'Medipharma Olivenölpflege', 'Vichy', 'Weleda'] },
    { name: 'Eigenherstellung', icon: 'Bath', punkte: ['Original Bad Füssinger Mineral-Schwefelbäder'] },
    { name: 'Service', icon: 'Truck', punkte: ['Lieferdienst', 'Abholung vor dem Laden', 'Reservierung online und per App'] },
    { name: 'Bezahlen', icon: 'CreditCard', punkte: ['bar', 'EC-Karte', 'Mastercard', 'Visa'] },
    { name: 'Sprachen', icon: 'Languages', punkte: ['Deutsch', 'Englisch', 'Französisch', 'Russisch'] },
  ],
}

export const app = {
  titel: 'Vorbestellen per App',
  text: 'Mit der kostenlosen ApothekenApp reservieren Sie Medikamente, senden uns Rezepte und E-Rezepte und finden jederzeit die nächste Notdienst-Apotheke.',
  schritte: [
    { name: 'App laden', text: 'Die ApothekenApp gibt es kostenlos im App Store und bei Google Play.', bild: 'laden' },
    { name: '94072 eingeben', text: 'Tippen Sie unsere Postleitzahl ein und wählen Sie die Kurpark-Apotheke als Ihre Apotheke.', bild: 'plz' },
    { name: 'Reservieren', text: 'Suchen Sie Ihr Medikament und reservieren Sie es. Rezepte und E-Rezepte senden Sie uns direkt aus der App.', bild: 'reservieren' },
    { name: 'Abholen', text: 'Wir legen alles für Sie bereit. Abholen können Sie an der Kurallee 18.', bild: 'abholen' },
  ],
  ohneApp: 'Lieber ohne App? Reservieren Sie im Browser.',
  anbieter: 'Die ApothekenApp ist ein Angebot des Deutschen Apotheker Verlags. Darstellung der Schritte vereinfacht.',
}

export const offen = {
  titel: 'Sechs Tage für Sie da',
  text: 'Montag bis Freitag von 8 bis 18 Uhr, Samstag von 8 bis 12 Uhr. Durchgehend, ohne Mittagspause.',
  frage: 'Wann möchten Sie kommen?',
  geschlossen: 'Sonntags und an Feiertagen haben wir geschlossen. Dann hilft der Apotheken-Notdienst.',
}

export const fragen = {
  titel: 'Häufige Fragen',
  liste: [
    { f: 'Kann ich Medikamente vorbestellen?',
      a: ['Ja. Reservieren Sie online oder in der ApothekenApp, oder rufen Sie uns an: 08531 / 20 22. Wir legen Ihre Bestellung zur Abholung bereit.'],
      link: { text: 'Medikament reservieren', href: 'reservieren' } },
    { f: 'Wie löse ich mein E-Rezept ein?',
      a: ['Kommen Sie mit Ihrer elektronischen Gesundheitskarte oder mit dem Ausdruck Ihres E-Rezepts zu uns. Über die ApothekenApp können Sie es uns auch vorab senden.'] },
    { f: 'Was tun nachts oder am Sonntag?',
      a: ['Dann hat immer eine Apotheke in der Nähe Notdienst. Welche es ist, zeigt der Notdienstplan.',
          'Im Notdienst dürfen Apotheken zwischen 20 und 6 Uhr sowie an Sonn- und Feiertagen 2,50 Euro Notdienstgebühr berechnen.'],
      link: { text: 'Notdienst-Apotheke finden', href: 'notdienst' },
      nummern: true },
    { f: 'Liefern Sie auch?',
      a: ['Ja, wir haben einen Lieferdienst. Rufen Sie uns an, dann besprechen wir die Einzelheiten: 08531 / 20 22.'] },
    { f: 'Welche Sprachen sprechen Sie?',
      a: ['Deutsch, Englisch, Französisch und Russisch.'] },
    { f: 'Kann ich mit Karte zahlen?',
      a: ['Ja, mit EC-Karte, Mastercard oder Visa. Bargeld nehmen wir natürlich auch.'] },
  ],
}

/* Wichtige Nummern für die Nacht und den Notfall */
export const nummern = [
  { name: 'Notruf, Rettungsdienst', nummer: '112', link: 'tel:112' },
  { name: 'Ärztlicher Bereitschaftsdienst', nummer: '116 117', link: 'tel:116117' },
  { name: 'Apotheken-Notdienst, Festnetz (kostenlos)', nummer: '0800 00 22 8 33', link: 'tel:08000022833' },
  { name: 'Apotheken-Notdienst, Handy (69\u00A0Cent/Min.)', nummer: '22 8 33', link: 'tel:22833' },
  { name: 'Giftnotruf München, rund um die Uhr', nummer: '089 19240', link: 'tel:+498919240' },
]

export const kontakt = {
  zeitenKurz: ['Mo–Fr 8–18 Uhr', 'Sa 8–12 Uhr'],
  schreiben: 'Schreiben Sie uns',
  fotoAlt: 'Die Schiebetür der Kurpark-Apotheke mit den beiden Pflanzkübeln.',
}

/* Nachschlagewerke und Ratgeber liegen weiter auf kurparkapo.de */
const o = 'https://www.kurparkapo.de'
export const wissen = [
  { titel: 'Nachschlagen', links: [
    ['Beipackzettelsuche', `${o}/leistungen/beipackzettelsuche`],
    ['Laborwerte A–Z', `${o}/leistungen/laborwerte`],
    ['Heilpflanzen A–Z', `${o}/leistungen/heilpflanzen`],
    ['Reiseimpfungen A–Z', `${o}/leistungen/reiseimpfungen`],
    ['Nahrungsergänzung A–Z', `${o}/leistungen/nahrungsergaenzungsmittel`],
    ['IGeL-Check A–Z', `${o}/leistungen/igel-check`],
    ['Notfälle A–Z', `${o}/leistungen/notfaelle`],
  ] },
  { titel: 'Ratgeber', links: [
    ['Ratgeber', `${o}/ratgeber`],
    ['Krankheiten & Therapie', `${o}/krankheiten-therapie`],
    ['Eltern und Kind', `${o}/themenwelt/29-eltern-und-kind`],
    ['Aktuelles', `${o}/news`],
  ] },
]

/* ---------- Rechtliches ---------- */

export const impressum = {
  titel: 'Impressum',
  abschnitte: [
    { h: 'Anbieter', p: [
      'Kurpark-Apotheke, Stefan Johannes Lengdobler e.K.',
      'Kurallee 18, 94072 Bad Füssing',
      'Inhaber: Stefan Johannes Lengdobler',
    ] },
    { h: 'Kontakt', p: [
      'Telefon: 08531 / 20 22',
      'Telefax: 08531 / 98 07 77',
      'E-Mail: info@kurparkapo.de',
    ] },
    { h: 'Register und Umsatzsteuer', p: [
      'Handelsregister Passau, HRA 4187',
      'Umsatzsteuer-Identifikationsnummer: DE297999912',
    ] },
    { h: 'Beruf und Kammer', p: [
      'Die gesetzliche Berufsbezeichnung Apotheker wurde in Deutschland erworben.',
      'Zuständige Apothekerkammer: Bayerische Landesapothekerkammer, Maria-Theresia-Str. 28, 81675 München, Telefon 089 92620, www.blak.de.',
      'Es gilt die Berufsordnung für Apothekerinnen und Apotheker der Bayerischen Landesapothekerkammer. Weitere berufsrechtliche Regelungen: Apothekengesetz, Apothekenbetriebsordnung und Bundes-Apothekerordnung, einsehbar unter www.gesetze-im-internet.de.',
    ] },
    { h: 'Aufsichtsbehörde', p: [
      'Landratsamt Passau, Domplatz 11, 94032 Passau',
    ] },
    { h: 'Verbraucherstreitbeilegung', p: [
      'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ] },
    { h: 'Inhalt und Gestaltung', p: [
      'Verantwortlich für den Inhalt: Stefan Johannes Lengdobler, Anschrift wie oben.',
      'Gestaltung und Umsetzung: Dominik Lengdobler. Fotos: Kurpark-Apotheke.',
      'Reservierung, Notdienstplan und Ratgeber sind Angebote von apotheken.de (DAN Netzwerk Deutscher Apotheker GmbH, Stuttgart) und öffnen dort. Die ApothekenApp ist ein Angebot des Deutschen Apotheker Verlags.',
    ] },
  ],
}

export const datenschutz = {
  titel: 'Datenschutz',
  stand: 'November 2026',
  abschnitte: [
    { h: 'Kurz gesagt', p: [
      'Diese Seite setzt keine Cookies, misst keine Besuche und bindet keine Inhalte fremder Anbieter ein. Schriften und Bilder liegen auf demselben Server wie die Seite. Ob wir gerade geöffnet haben, rechnet Ihr Gerät selbst aus; dafür werden keine Daten übertragen.',
    ] },
    { h: 'Verantwortlich', p: [
      'Kurpark-Apotheke, Stefan Johannes Lengdobler e.K., Kurallee 18, 94072 Bad Füssing. Telefon 08531 / 20 22, E-Mail info@kurparkapo.de.',
      'Datenschutzbeauftragte: Marion Lengdobler, erreichbar über info@kurparkapo.de.',
    ] },
    { h: 'Aufruf der Seite', p: [
      'Diese Seite liegt bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Beim Aufruf verarbeitet Vercel die Daten, die technisch nötig sind, um die Seite auszuliefern und vor Angriffen zu schützen: IP-Adresse, Datum und Uhrzeit, aufgerufene Datei, Browser und Betriebssystem.',
      'Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und stabilen Seite (Art. 6 Abs. 1 Buchstabe f DSGVO). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Die Übermittlung in die USA stützt sich auf das EU-US Data Privacy Framework und auf Standardvertragsklauseln.',
    ] },
    { h: 'Wenn Sie uns anrufen oder schreiben', p: [
      'Ihre Angaben nutzen wir, um Ihr Anliegen zu bearbeiten (Art. 6 Abs. 1 Buchstabe b und f DSGVO). Geht es um Ihre Gesundheit, etwa um ein Rezept, verarbeiten wir die Daten im Rahmen der Arzneimittelversorgung (Art. 9 Abs. 2 Buchstabe h DSGVO). Wir unterliegen der Schweigepflicht.',
      'Bitte senden Sie uns Gesundheitsdaten nicht per unverschlüsselter E-Mail. Rufen Sie lieber an oder kommen Sie vorbei.',
    ] },
    { h: 'Links zu anderen Angeboten', p: [
      'Die Reservierung, der Notdienstplan und die Ratgeber öffnen bei apotheken.de bzw. auf kurparkapo.de, die ApothekenApp im App Store oder bei Google Play, die Routenplanung und die Rezensionen bei Google Maps. Erst wenn Sie einen solchen Link antippen, erhält der jeweilige Anbieter Daten von Ihnen. Dann gilt dessen Datenschutzerklärung.',
    ] },
    { h: 'Speicherdauer', p: [
      'Wir speichern Ihre Daten nur so lange, wie es für den jeweiligen Zweck nötig ist oder wie es gesetzliche Aufbewahrungsfristen verlangen.',
    ] },
    { h: 'Ihre Rechte', p: [
      'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch (Art. 15 bis 21 DSGVO). Eine Nachricht an info@kurparkapo.de genügt.',
      'Sie können sich außerdem bei einer Aufsichtsbehörde beschweren. Für uns zuständig ist das Bayerische Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach, www.lda.bayern.de.',
    ] },
  ],
}

export const meta = {
  titel: 'Kurpark-Apotheke Bad Füssing',
  beschreibung: 'Kurpark-Apotheke in Bad Füssing, Kurallee 18: Mo–Fr 8–18 Uhr, Sa 8–12 Uhr. Medikamente reservieren, Notdienst finden, Original Bad Füssinger Mineral-Schwefelbäder aus eigener Herstellung. Telefon 08531 / 20 22.',
  macher: 'Dominik Lengdobler',
}

/* Laufband mit den Marken der Hautpflege */
export const marken = ['Eucerin', 'frei öl', 'La Roche-Posay', 'Medipharma Olivenölpflege', 'Vichy', 'Weleda']
