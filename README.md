# Reverzná hypotéka — finančný model

Interaktívny finančný model reverznej hypotéky pre Slovensko. Statická single-page aplikácia (žiadny build krok) — `index.html` + Chart.js z CDN.

- **Model B (úverová)** — byt ostáva klientovi, fond zriadi záložné právo, anuita sa roluje, prebytok pri úmrtí ide dedičom (no-negative-equity).
- **Model A (predaj s vecným bremenom)** — fond kúpi byt za diskontovanú cenu, klient má doživotné užívanie, apreciáciu vlastní fond.
- Vstupy cez posuvníky, KPI karty, graf **P&L po rokoch** s 3 scenármi (optimistický / báza / pesimistický) a detailná ročná P&L tabuľka.

> Model je ilustračný — mortalita je zjednodušená (bez aktuárskych tabuliek a poistného krytia longevity). Slúži na pochopenie ekonomiky, nie ako oficiálne nacenenie.

---

## 1. Lokálne spustenie

Stačí otvoriť `index.html` v prehliadači. Žiadne závislosti, žiadny build.

```bash
open index.html        # macOS
```

---

## 2. Nasadenie: GitHub → Vercel

### 2.1 Vytvor GitHub repozitár a nahraj kód

```bash
cd "reversed-app"
git init
git add .
git commit -m "Reverzná hypotéka — finančný model"
git branch -M main
git remote add origin https://github.com/<tvoj-ucet>/reversed-app.git
git push -u origin main
```

### 2.2 Import do Vercelu

1. Prihlás sa na [vercel.com](https://vercel.com) (cez GitHub).
2. **Add New… → Project** → vyber repozitár `reversed-app` → **Import**.
3. Framework Preset: **Other** (je to statická stránka), Root Directory: `./`, Build Command: *nechaj prázdne*, Output Directory: *nechaj prázdne*.
4. **Deploy**. Dostaneš URL typu `reversed-app-xxxx.vercel.app`.

Každý ďalší `git push` do `main` nasadí novú verziu automaticky.

---

## 3. Doména `reversed.royalewithcheese.sk`

### 3.1 V Verceli

1. Projekt → **Settings → Domains** → zadaj `reversed.royalewithcheese.sk` → **Add**.
2. Vercel ukáže **presnú DNS hodnotu** pre tento projekt — buď všeobecnú `cname.vercel-dns.com`, alebo projektovo špecifickú, napr. `d1d4f….vercel-dns-017.com`. **Skopíruj presne tú hodnotu, ktorú Vercel zobrazí** (môže sa líšiť od príkladu nižšie).

### 3.2 Na Websupporte (správa DNS)

V administrácii Websupportu (doména `royalewithcheese.sk` → **DNS záznamy** → *Pridať záznam*) pridaj **CNAME** pre subdoménu:

| Typ   | Názov / Hostiteľ | Hodnota / Cieľ                         | TTL      |
|-------|------------------|----------------------------------------|----------|
| CNAME | `reversed`       | `cname.vercel-dns.com`  *(alebo presná hodnota z Vercelu)* | 3600 (default) |

Poznámky:
- Do poľa **Názov** zadaj len `reversed` (Websupport k nemu sám doplní `.royalewithcheese.sk`). Ak by editor vyžadoval plný tvar, zadaj `reversed.royalewithcheese.sk`.
- Hodnotu zadaj **bez** `http://` a `https://`. Niektoré editory chcú bodku na konci: `cname.vercel-dns.com.`
- Ak Websupport pre subdoménu CNAME nepovolí, použi hodnotu, ktorú Vercel ponúkne ako alternatívu (A záznam) — ale CNAME je pre subdoménu preferovaný.

### 3.3 Overenie

- Propagácia DNS trvá od pár minút do ~1 hodiny.
- Vo Verceli sa pri doméne zmení stav na **Valid Configuration** a TLS certifikát (Let's Encrypt) sa vystaví automaticky.
- Kontrola z terminálu:

```bash
dig reversed.royalewithcheese.sk CNAME +short
```

---

## 4. Štruktúra

```
reversed-app/
├── index.html      # celá aplikácia (UI + výpočtový engine)
├── vercel.json     # statická konfigurácia + bezpečnostné hlavičky
├── .gitignore
└── README.md
```

## 5. Úprava modelu

Celý výpočtový engine je v `index.html` v sekcii `// ====== ENGINE ======` (funkcie `modelA`, `modelB`, `life`, `irr`). Predvolené hodnoty a rozsahy posuvníkov sú v príslušných `<input type="range">`. Farby a téma sú v `:root` CSS premenných — ľahko zladíš s `rfp.royalewithcheese.sk`.
