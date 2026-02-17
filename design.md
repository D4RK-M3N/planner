# Design Plan - Planner App (iPhone 17 Pro - Cosmic Orange)

## Założenia projektowe

Aplikacja do planowania wydarzeń z kalendarzem i przypomnieniami, dostosowana do **iPhone 17 Pro** z premium kolorystyką **Cosmic Orange**. Projekt zakłada **orientację pionową (9:16)** i **obsługę jedną ręką**, zgodnie z Apple Human Interface Guidelines.

## Paleta kolorów - Cosmic Orange Edition

Inspiracja: iPhone 17 Pro Cosmic Orange - ciepły, elegancki pomarańcz z premium metalicznym finiszem.

- **Primary**: `#FF8C00` - Cosmic Orange (główny akcent, przyciski, aktywne elementy)
- **Primary Light**: `#FFB84D` - Jaśniejszy Cosmic Orange (hover states)
- **Primary Dark**: `#E67E00` - Ciemniejszy Cosmic Orange (pressed states)
- **Background**: `#FFFFFF` (light) / `#0F0F0F` (dark) - czysty biały / głęboka czerń
- **Surface**: `#F8F8F8` (light) / `#1A1A1A` (dark) - subtelne powierzchnie
- **Foreground**: `#1A1A1A` (light) / `#F5F5F5` (dark) - główny tekst
- **Muted**: `#666666` (light) / `#A0A0A0` (dark) - tekst pomocniczy
- **Border**: `#E0E0E0` (light) / `#2A2A2A` (dark) - subtelne obramowania
- **Success**: `#34C759` (light) / `#32D74B` (dark) - zielony dla potwierdzeń
- **Warning**: `#FF9500` (light) / `#FFB340` (dark) - pomarańczowy dla ostrzeżeń
- **Error**: `#FF3B30` (light) / `#FF453A` (dark) - czerwony dla błędów

## Charakterystyka designu

- **Premium feel**: Metaliczny gradient w tle (subtelny)
- **Minimalizm**: Czyste linie, duże białe przestrzenie
- **Kontrast**: Cosmic Orange na neutralnym tle dla maksymalnego wpływu
- **Zaokrąglenia**: Radius 12-16pt dla nowoczesnego wyglądu
- **Cienie**: Subtelne cienie (shadow opacity 0.1-0.15) dla głębi
- **Typografia**: SF Pro Display (domyślna na iOS) dla premium wyglądu

## Lista ekranów

### 1. Home (Kalendarz)
- **Główna zawartość**: Widok kalendarza miesięcznego z zaznaczonymi dniami zawierającymi wydarzenia
- **Funkcjonalność**: 
  - Nawigacja między miesiącami (swipe lub strzałki w Cosmic Orange)
  - Kliknięcie dnia pokazuje listę wydarzeń tego dnia poniżej kalendarza
  - Przycisk FAB (Floating Action Button) w Cosmic Orange do dodawania nowego wydarzenia
  - Lista wydarzeń wybranego dnia z godzinami i tytułami
  - Dni z wydarzeniami oznaczone Cosmic Orange dot

### 2. Event List (Lista wydarzeń)
- **Główna zawartość**: Lista wszystkich nadchodzących wydarzeń posortowana chronologicznie
- **Funkcjonalność**:
  - Karty wydarzeń z tytułem, datą, godziną, ikoną kategorii
  - Lewy pasek w Cosmic Orange dla wizualnego akcentu
  - Swipe-to-delete dla usuwania wydarzeń
  - Kliknięcie karty otwiera szczegóły wydarzenia
  - Filtrowanie po kategoriach (opcjonalne)

### 3. Event Detail (Szczegóły wydarzenia)
- **Główna zawartość**: Pełne informacje o wydarzeniu
- **Funkcjonalność**:
  - Tytuł, data, godzina rozpoczęcia i zakończenia
  - Opis wydarzenia
  - Lokalizacja (opcjonalna)
  - Przypomnienie (czas przed wydarzeniem)
  - Przyciski: Edytuj (Cosmic Orange), Usuń (Error)
  - Powrót do poprzedniego ekranu

### 4. Add/Edit Event (Dodaj/Edytuj wydarzenie)
- **Główna zawartość**: Formularz tworzenia/edycji wydarzenia
- **Funkcjonalność**:
  - Pole tekstowe: Tytuł wydarzenia (wymagane)
  - Date picker: Data wydarzenia
  - Time picker: Godzina rozpoczęcia
  - Time picker: Godzina zakończenia
  - Pole tekstowe: Opis (opcjonalne, multiline)
  - Pole tekstowe: Lokalizacja (opcjonalne)
  - Picker: Przypomnienie (brak, 5 min, 15 min, 30 min, 1h, 1 dzień przed)
  - Przyciski: Anuluj, Zapisz (Cosmic Orange)

### 5. Settings (Ustawienia)
- **Główna zawartość**: Opcje konfiguracji aplikacji
- **Funkcjonalność**:
  - Przełącznik: Motyw (jasny/ciemny/automatyczny) - toggle w Cosmic Orange
  - Picker: Pierwszy dzień tygodnia (poniedziałek/niedziela)
  - Przełącznik: Powiadomienia
  - Informacje o aplikacji (wersja)

## Kluczowe przepływy użytkownika

### Przepływ 1: Dodawanie wydarzenia
1. Użytkownik otwiera aplikację (ekran Home z kalendarzem)
2. Klika przycisk FAB "+" w Cosmic Orange
3. Otwiera się ekran Add Event z formularzem
4. Wypełnia tytuł, wybiera datę i godzinę
5. Opcjonalnie dodaje opis, lokalizację, przypomnienie
6. Klika "Zapisz" (Cosmic Orange button)
7. Wraca do ekranu Home, nowe wydarzenie widoczne w kalendarzu

### Przepływ 2: Przeglądanie wydarzeń dnia
1. Użytkownik otwiera aplikację
2. Widzi kalendarz miesięczny
3. Klika na wybrany dzień (Cosmic Orange highlight)
4. Poniżej kalendarza pojawia się lista wydarzeń tego dnia
5. Klika na wydarzenie aby zobaczyć szczegóły

### Przepływ 3: Edycja wydarzenia
1. Użytkownik przechodzi do Event Detail
2. Klika przycisk "Edytuj" (Cosmic Orange)
3. Otwiera się formularz z wypełnionymi danymi
4. Modyfikuje wybrane pola
5. Klika "Zapisz" (Cosmic Orange)
6. Wraca do szczegółów z zaktualizowanymi danymi

### Przepływ 4: Usuwanie wydarzenia
1. Użytkownik przechodzi do Event Detail
2. Klika przycisk "Usuń" (Error red)
3. Pojawia się dialog potwierdzenia
4. Potwierdza usunięcie
5. Wraca do ekranu Home, wydarzenie usunięte

### Przepływ 5: Otrzymywanie przypomnienia
1. Aplikacja wysyła lokalne powiadomienie w ustawionym czasie przed wydarzeniem
2. Użytkownik klika powiadomienie
3. Aplikacja otwiera się na ekranie Event Detail wybranego wydarzenia

## Struktura nawigacji

```
Tab Navigator (dolny pasek - Cosmic Orange accents):
├─ Home (ikona: calendar)
├─ Events (ikona: list)
└─ Settings (ikona: settings)

Stack Navigator (dla każdego taba):
Home Stack:
├─ Calendar View
└─ Event Detail → Edit Event

Events Stack:
├─ Event List
└─ Event Detail → Edit Event

Settings Stack:
└─ Settings View

Modal:
└─ Add Event (otwierane przez FAB w Cosmic Orange)
```

## Komponenty UI

### EventCard
- Karta z zaokrąglonymi rogami (radius 12pt)
- Lewy pasek w Cosmic Orange (4pt width)
- Tytuł wydarzenia (bold, foreground)
- Data i godzina (muted, mniejszy font)
- Ikona kategorii/koloru po lewej
- Swipe gesture dla usuwania
- Cień subtelny dla głębi

### CalendarDay
- Kwadratowa komórka dnia
- Numer dnia (foreground)
- Kropka/znacznik w Cosmic Orange jeśli są wydarzenia
- Podświetlenie dla wybranego dnia (Cosmic Orange background)
- Wyszarzenie dla dni spoza miesiąca

### FloatingActionButton (FAB)
- Okrągły przycisk z ikoną "+"
- Kolor: Cosmic Orange (#FF8C00)
- Pozycja: prawy dolny róg (z marginesem 16pt)
- Cień dla głębi (shadow elevation 8)
- Haptic feedback przy kliknięciu
- Gradient metaliczny (subtelny) dla premium feel

### DateTimePicker
- Natywny picker dla iOS/Android
- Modal presentation
- Przyciski: Anuluj, Potwierdź (Cosmic Orange)

### PrimaryButton
- Tło: Cosmic Orange (#FF8C00)
- Tekst: Biały
- Radius: 12pt
- Padding: 12pt vertical, 24pt horizontal
- Pressed state: Ciemniejszy Cosmic Orange (#E67E00)
- Haptic feedback

### SecondaryButton
- Tło: Surface color
- Tekst: Cosmic Orange
- Border: 1pt Cosmic Orange
- Radius: 12pt
- Pressed state: Cosmic Orange background z białym tekstem

## Przechowywanie danych

**Domyślnie: AsyncStorage (lokalne)**
- Wydarzenia przechowywane lokalnie w AsyncStorage
- Struktura danych:
```typescript
interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO 8601
  endDate: string;
  location?: string;
  reminder?: number; // minuty przed wydarzeniem
  createdAt: string;
  updatedAt: string;
}
```

## Powiadomienia

- Wykorzystanie `expo-notifications` dla lokalnych powiadomień
- Planowanie powiadomienia przy zapisywaniu wydarzenia z przypomnieniem
- Anulowanie powiadomienia przy usuwaniu/edycji wydarzenia
- Kliknięcie powiadomienia otwiera szczegóły wydarzenia
- Ikona powiadomienia w Cosmic Orange

## Animacje i feedback

- **Haptic feedback**: Lekki impuls przy kliknięciu przycisków głównych (Cosmic Orange buttons)
- **Press feedback**: Opacity 0.7 dla kart wydarzeń, scale 0.97 dla przycisków
- **Transitions**: Subtelne fade-in (250ms) dla list wydarzeń
- **Swipe gestures**: Smooth animation dla usuwania wydarzeń (swipe-to-delete)
- **Color transitions**: Smooth transition do Cosmic Orange na hover/press states

## Accessibility

- Wszystkie interaktywne elementy z odpowiednimi labels
- Kontrast kolorów zgodny z WCAG AA (Cosmic Orange na białym tle)
- Rozmiar czcionek: minimum 14px dla tekstu pomocniczego, 16px dla głównego
- Touch targets: minimum 44x44 punktów
- Wsparcie dla Dark Mode z dostosowanymi kolorami

## Premium Features (iPhone 17 Pro)

- Wsparcie dla Dynamic Island (jeśli dostępne)
- Wsparcie dla Always-On Display (jeśli dostępne)
- Wsparcie dla Haptic Engine (zaawansowane feedback)
- Metaliczny gradient w tle (subtelny, nie rozpraszający)
- Optymalizacja dla ProMotion 120Hz display
