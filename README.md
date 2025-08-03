# 🏨 Booking.com Mobile App

Modern ve kullanıcı dostu bir otel rezervasyon uygulaması. React Native ile geliştirilmiş, Redux Toolkit ile state yönetimi yapılan, tam özellikli bir mobil uygulama.

## 📱 Ekran Görüntüleri

![Booking App Screenshots](https://github.com/user-attachments/assets/73d6b8e2-e4b3-453e-bfbb-4af1a6291441)

![Booking App Screenshots](https://github.com/user-attachments/assets/dd0a0239-9f50-46d3-869f-bb431fd5fbb4)

![Booking App Screenshots](https://github.com/user-attachments/assets/0274ede5-0791-4d44-9442-67b776eaf3eb)

![Booking App Screenshots](https://github.com/user-attachments/assets/edbbc59f-f73f-4a8c-9838-932b4c6337df)

✨ Özellikler

### 🏠 Ana Sayfa (HomeScreen)

- **Arama Formu**: Destinasyon, tarih, oda ve misafir seçimi
- **Tarih Seçici**: Modal tabanlı takvim ile tarih aralığı seçimi
- **Oda/Misafir Modal**: Dinamik oda ve misafir sayısı ayarlama
- **Loyalty Program**: Popüler sadakat programları
- **Hafta Sonu Fırsatları**: Özel indirimli otel teklifleri
- **Kampanyalar**: Promosyon ve özel teklifler
- **Fikirler**: Seyahat önerileri ve ilham

### 🔍 Arama Sayfası (SearchScreen)

- **Gelişmiş Arama**: Otel adı ve konum bazlı arama
- **Filtreler**: Fiyat, puan, mesafe, iptal seçenekleri
- **Gelişmiş Filtreler**: Modal tabanlı detaylı filtreleme
- **Fiyat Aralığı**: Slider ve input ile fiyat filtreleme
- **Puan Filtresi**: Yıldız bazlı puan filtreleme
- **Özellikler**: WiFi, park, kahvaltı, havuz gibi özellik filtreleri
- **ListView Tasarımı**: Dikkat çekici otel listesi

### 🏨 Otel Detay Sayfası (PlacesScreen)

- **Hero Görsel**: Büyük otel fotoğrafı
- **Otel Bilgileri**: Detaylı otel açıklaması ve özellikler
- **Fiyatlandırma**: İndirimli ve orijinal fiyatlar
- **Arama Detayları**: Seçilen tarih ve misafir bilgileri
- **Favori Ekleme**: Otel favorilere ekleme
- **Rezervasyon**: Hemen rezervasyon yapma

### 💳 Ödeme Sayfası (PaymentScreen)

- **Rezervasyon Özeti**: Seçilen otel ve tarih bilgileri
- **Fiyat Detayları**: Oda ücreti, gece sayısı, servis ücreti
- **Kredi Kartı Formu**: Güvenli ödeme formu
- **Kart Numarası Formatlaması**: Otomatik formatlama
- **CVV Güvenliği**: Şifreli CVV girişi
- **Simüle Ödeme**: Gerçekçi ödeme işlemi

### 📄 Fatura Sayfası (InvoiceScreen)

- **Fatura Numarası**: Otomatik fatura numarası
- **Otel Bilgileri**: Detaylı otel ve rezervasyon bilgileri
- **Fiyat Detayları**: Kalem bazlı fiyatlandırma
- **Ödeme Bilgileri**: Ödeme yöntemi ve durumu
- **Paylaşım**: Fatura paylaşma özelliği
- **PDF İndirme**: Fatura indirme (simüle)

### 👤 Profil Sayfası (ProfileScreen)

- **Authentication**: Login/Register sistemi
- **Profil Yönetimi**: Kişisel bilgi düzenleme
- **Avatar Sistemi**: Profil fotoğrafı yönetimi
- **Hesap Ayarları**: Güvenlik, bildirimler, yardım
- **Logout**: Güvenli çıkış işlemi

### 🔐 Giriş Sayfası (LoginScreen)

- **Login/Register Toggle**: Tek sayfada hem giriş hem kayıt
- **Form Validasyonu**: Tüm alanlar için validasyon
- **Şifre Görünürlüğü**: Şifre göster/gizle
- **Sosyal Giriş**: Google ve Apple ile giriş
- **Simüle Authentication**: Gerçekçi giriş işlemi

### ❤️ Favoriler Sayfası (SavedScreen)

- **Favori Oteller**: Kaydedilen otellerin listesi
- **Otel Detayları**: Fiyat, puan, konum bilgileri
- **Favori Kaldırma**: Favorilerden çıkarma
- **Rezervasyon**: Favori otelden rezervasyon
- **Boş Durum**: Favori yoksa öneri

### 📋 Rezervasyon Sayfası (BookingScreen)

- **Aktif Rezervasyonlar**: Mevcut rezervasyonların listesi
- **Rezervasyon Detayları**: Tarih, misafir, otel bilgileri
- **Fiyat Özeti**: Toplam ücret hesaplama
- **Rezervasyon İptali**: Güvenli iptal işlemi
- **Rezervasyon Düzenleme**: Mevcut rezervasyonu güncelleme
- **Ödeme**: Rezervasyon için ödeme

## 🛠️ Teknolojiler

### Frontend

- **React Native**: Cross-platform mobil uygulama
- **TypeScript**: Tip güvenliği
- **Redux Toolkit**: State yönetimi
- **React Navigation**: Sayfa navigasyonu

### UI/UX

- **Expo Vector Icons**: İkon kütüphanesi
- **React Native Calendars**: Takvim bileşeni
- **React Native Modal**: Modal bileşenleri
- **Responsive Design**: Tüm cihazlarda uyumlu

### State Management

- **Redux Toolkit**: Merkezi state yönetimi
- **Redux Hooks**: useAppSelector, useAppDispatch
- **Persistent State**: Oturum ve kullanıcı verileri

## 📁 Proje Yapısı

```
booking-app/
├── src/
│   ├── store/
│   │   ├── hooks.ts
│   │   ├── store.ts
│   │   └── slices/
│   │       └── bookingSlice.ts
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── hotel/
│   │   └── HotelListItem.tsx
│   ├── modals/
│   │   └── AdvancedFiltersModal.tsx
│   └── search/
│       ├── FilterChip.tsx
│       └── SearchBar.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── PlacesScreen.tsx
│   ├── PaymentScreen.tsx
│   ├── InvoiceScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SavedScreen.tsx
│   └── BookingScreen.tsx
├── navigator/
│   └── AppNavigator.tsx
├── data/
│   └── mockData.ts
├── utils/
│   ├── constants.ts
│   └── helpers.ts
└── hooks/
    ├── useHotelFilters.ts
    └── useDateRange.ts
```

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- React Native CLI
- Expo CLI

### Adımlar

1. **Projeyi klonlayın**

```bash
git clone <repository-url>
cd booking-app
```

2. **Bağımlılıkları yükleyin**

```bash
npm install
# veya
yarn install
```

3. **iOS için (macOS gerekli)**

```bash
cd ios
pod install
cd ..
```

4. **Uygulamayı çalıştırın**

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android

# Expo (geliştirme)
npx expo start
```

## 📱 Kullanım

### Ana Akış

1. **Ana Sayfa**: Destinasyon ve tarih seçimi
2. **Arama**: Otel arama ve filtreleme
3. **Otel Detayı**: Otel bilgileri ve rezervasyon
4. **Ödeme**: Güvenli ödeme işlemi
5. **Fatura**: Rezervasyon onayı ve fatura

## 🔧 Geliştirme

### Redux State Yapısı

```typescript
interface BookingState {
  // Form Data
  selectedHotel: string;
  destination: string;
  startDate: string;
  endDate: string;
  rooms: number;
  adults: number;
  children: number;
  
  // Search & Filters
  searchQuery: string;
  selectedFilter: string;
  minPrice: number;
  maxPrice: number;
  selectedRating: number;
  selectedAmenities: string[];
  
  // UI State
  showAdvancedFilters: boolean;
  showDateModal: boolean;
  showRoomsModal: boolean;
  
  // User Data
  savedHotels: string[];
  activeBookings: string[];
  
  // Authentication
  isAuthenticated: boolean;
  user: User | null;
}
```

### Component Yapısı

- **Reusable Components**: Button, Card, Input
- **Screen Components**: Her sayfa için ayrı component
- **Modal Components**: Gelişmiş filtreler ve formlar
- **Custom Hooks**: useHotelFilters, useDateRange

## 🎨 Tasarım Sistemi

### Renkler

```typescript
export const COLORS = {
  primary: '#003580',
  secondary: '#f8f9fa',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
    white: '#ffffff'
  },
  border: '#e0e0e0'
};
```

### Boyutlar

```typescript
export const DIMENSIONS = {
  padding: {
    small: 8,
    medium: 16,
    large: 20
  },
  fontSize: {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12
  }
};
```


### Katkı Süreci

1. Fork yapın
2. Feature branch oluşturun
3. Değişiklikleri commit edin
4. Pull request açın
5. Code review bekleyin

## 👥 Ekip

- **Geliştirici**: [Muhammed Beraat Kıldacı]

## 📞 İletişim

- **Email**: [muhammedberaatkildaci@gmail.com]
- **LinkedIn**: [[linkedin.com/in/MuhammedBeraatKildaci](https://www.linkedin.com/in/muhammed-beraat-k%C4%B1ldac%C4%B1-3576a6187/)]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
