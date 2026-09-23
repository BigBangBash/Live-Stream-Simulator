# Live Stream Simulator V3

Neu:
- Name/Kanalname wird vor dem Start eingegeben.
- Zuschauerzahl wird vor dem Start eingegeben; kein Standardwert.
- Zuschauerzahl ändert sich nur langsam (alle 7 Sekunden, kleine Änderungen).
- Kein Mikrofonzugriff.
- Stream beenden befindet sich im Drei-Punkte-Menü.
- Andere Menüeinträge sind rein visuell.
- Mehr deutsche und englische Chat-Kommentare.
- Geringere Emoji-Dichte und unterschiedlich lange Kommentare.
- Party-Kommentare inklusive kurzem "Baila Baila Baila".
- Endscreen und erneuter Start.
- Vorbereiteter Hook `triggerSecondPersonComments()` für Kommentare bei zweiter Person.

Hinweis zur Personenerkennung:
Die automatische lokale Erkennung einer zweiten Person benötigt ein zusätzliches Vision-Modell bzw. eine Browser-Vision-Bibliothek. In dieser V3 ist die Chat-Reaktion darauf bereits vorbereitet, die eigentliche automatische Bilderkennung aber noch nicht eingebunden.

Start am PC:
    python -m http.server 8000
Dann:
    http://localhost:8000

Auf Android muss die Web-App für Kamerazugriff normalerweise über HTTPS ausgeliefert werden.

## V3.1 Änderungen
- sichtbare Livestream-Laufzeit entfernt
- Dauer auch aus dem Endscreen entfernt
- Kommentar-Pool überarbeitet
- Totenkopf-Emoji vollständig entfernt
- mehr Party-, Bier-, Flammen-, Mallorca-/Ballermann- und Gruß-Kommentare
- deutsche und englische Kommentare bleiben gemischt

## V3.2 Kommentaränderungen
Hinzugefügt: heute MEGAPARK?, Megapark, Bambooooo sowie hey/hallo/Hallo/hi mit passenden Varianten.
Entfernt: okay das war wild; wie viele seid ihr da.

## V3.3
- Chat-Timing randomisiert: schnelle Folgen, normale Abstände und gelegentliche Pausen.
- Gelegentliche Kommentar-Bursts eingebaut.
- Nutzernamen deutlich stärker variiert; `_404`-Muster reduziert.
- `cheers` entfernt.
- Schwebende Reaktionen rechts deutlich häufiger, inklusive kleiner Reaktions-Bursts.

## V3.4
Entfernte Kommentare:
- where u from
- alle mitsingen
- wie spät ist es bei euch
- jetzt fehlt nur noch Malle

## V3.5
- Folgen-Button entfernt.
- Aufsteigende Herz-Reaktionen rechts werden rot dargestellt.
