## Aufgabe

Erstellen einer kleinen Angular-Applikation.
Mit Hilfe des untenstehenden JSON (die Struktur kann sich regelmäßig ändern) soll eine Übersichtsseite für diverse Server erstellt werden. Dafür soll für jedes existierende Property "server" eine Komponente A in die Seite eingebunden und die darin existierenden Werte für Label und Status verwendet werden. Eine weitere Komponente B soll ebenfalls in die Seite integriert eine Liste aller aktiven Server anzeigen.

### Layout

Die Seite soll einen Header, Content-Bereich und Footer haben. Der Footer soll am unteren Rand des Screens angezeigt werden. Wenn die Content-Höhe größer als die Screen-Höhe ist, dann soll der Footer unter dem gesamten Content angezeigt werden.

### Component A

Soll einen Server darstellen, der über einen Button aktiviert/deaktiviert werden kann. Außerdem soll man das Label des Servers ändern können.

- Das Label kann/soll direkt änderbar sein (Input).
  - Labels mit weniger als 5 Zeichen sollen nicht erlaubt sein.
  - Ungültige Input-Felder sollen hervorgehoben dargestellt werden.
- Wenn der Server aktiviert wurde, soll sich der Status aktualisieren.
  Der Zustand der Server (also zB geänderte Labels) muss nicht persistiert werden.
  Die Darstellung eines Servers soll als Karte (aka "Card") umgesetzt werden. Pro Server zeigt die Karte ein Icon, das Label, den Status als Text sowie den Status als Icon/Kreis mit entsprechender Farbe an.

### Component B

- Soll alle Server auflisten und die Validierung für deren Labels steuern.
- Listet die aktuellen Karten aller Server auf.
- Über einen Button soll die Validierung der Labels aller Komponenten A aktiviert/deaktiviert werden können.
- Es soll möglich sein, die Component innerhalb der Applikation wiederzuverwenden, zB als Teil einer anderen Page/Component. Ein Beispiel wäre: Component B wird neben der Einbindung auf der Seite für die Serverübersicht auch in einem Dashboard eingebunden und zeigt die verfügbaren Server (laut Beschreibung).

### Unterschiedliche Darstellung Desktop/Mobile

- Auf großen (Desktop-) Bildschirmen sollen die Karten der Server als Grid (zB 3 Karten pro Zeile) und alle zugehörigen Infos angezeigt werden.
- Auf kleinen (Mobile-) Bildschirmen sollen alle Karten untereinander dargestellt werden, und das Icon sowie der Text-Status sollen nicht mehr angezeigt werden (nur noch Label und das Status Icon).

## Optionale Erweiterungen

Die folgenden Punkte sind nur nice-to-have:

- Der Status der Server wird persistiert.
- Man kann die Server nach Status filtern bzw nach Label suchen.
- Dynamisches Hinzufügen neuer Server.

---

Für fehlende Informationen in der Angabe kannst du einfach selbst Annahmen treffen. Wenn du trotzdem Fragen hast, kannst du dich aber natürlich gerne melden.
Lade den Code nach Möglichkeit zB auf GitHub hoch, andernfalls kannst du ihn uns aber auch per E-Mail schicken.

Viel Spaß beim Coden!

---

```
{
  "acai": true,
  "ackee": "abc",
  "apple": {
    "date": {
      "durian": {
        "server": {
          "label": "Durian",
          "active": true
        }
      }
    },
    "elderberry": [
      {
        "fig": null,
        "huckleberry": {
          "server": {
            "label": "Huckleberry",
            "active": true
          }
        }
      },
      {
        "gooseberry": false,
        "server": {
          "label": "Elderberry",
          "active": false
        }
      }
    ]
  },
  "apricot": 123,
  "avocado": "abc",
  "banana": false,
  "belfruit": "123",
  "bilberry": "abc",
  "blackberry": [
    {
      "boysenberry": 123,
      "dewberry": "123"
    },
    {
      "grapefruit": 123,
      "guava": "123"
    }
  ],
  "blueberry": 123,
  "breadfruit": false,
  "server": {
    "label": "Kiwi",
    "active": false
  },
  "breadnut": null,
  "canistel": "abc"
}
```
