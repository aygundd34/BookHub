# Book Hub

Book Hub, kullanıcıların kitapları görüntüleyebileceği, ekleyebileceği, güncelleyebileceği ve favorilere ekleyebileceği bir kitap yönetim uygulamasıdır. Bu proje, React.js ile oluşturulmuş bir frontend ve ASP.NET ile oluşturulmuş bir backend kullanarak geliştirilmiştir. Veritabanı olarak MongoDB kullanılmıştır.

## Kullanılan Teknolojiler

### Frontend

- **React.js**: Kullanıcı arayüzünü oluşturmak için kullanılan JavaScript kütüphanesi.
- **Axios**: HTTP istekleri yapmak için kullanılan kütüphane.
- **React Router**: React uygulamasında yönlendirme işlemleri için kullanılan kütüphane.
- **React Icons**: Uygulamada kullanılan ikonlar için kütüphane.
- **CSS**: Uygulamanın stil ve tasarımı için kullanılan stil dili.
- **Modal**: Kullanıcıya bilgi vermek için kullanılan modal pencereleri.

### Backend

- **ASP.NET**: API'yi oluşturmak için kullanılan framework.
- **MongoDB**: NoSQL veritabanı yönetim sistemi.
- **MongoDB.Driver**: MongoDB ile etkileşim kurmak için kullanılan .NET kütüphanesi.
- **Swagger**: API dokümantasyonu ve test aracı.

## Özellikler

- Kitapları listeleme
- Kitap detaylarını görüntüleme
- Kitap ekleme (Yalnızca admin kullanıcılar)
- Kitap güncelleme (Yalnızca admin kullanıcılar)
- Kitap silme (Yalnızca admin kullanıcılar)
- Kitapları favorilere ekleme ve favorilerden çıkarma (Kullanıcı girişi gerektirir)

## API Uç Noktaları

- `GET /api/books`: Tüm kitapları listeler.
- `GET /api/books/{id}`: Belirli bir kitabın detaylarını getirir.
- `POST /api/books`: Yeni bir kitap ekler.
- `PUT /api/books/{id}`: Mevcut bir kitabı günceller.
- `DELETE /api/books/{id}`: Belirli bir kitabı siler.

## Swagger

Swagger kullanarak API dokümantasyonunu görüntüleyebilir ve API uç noktalarını test edebilirsiniz. API çalışırken, Swagger arayüzüne `http://localhost:5000/swagger` adresinden erişebilirsiniz.

## Kullanım

### Kitapları Listeleme

Ana sayfada tüm kitapları listeleyebilirsiniz. Her kitap kartında, kitabın başlığı, yazarı ve türü hakkında bilgi bulunur.

### Kitap Detaylarını Görüntüleme

Bir kitabın detaylarını görmek için kitap kartına tıklayın. Kitap detay sayfasında, kitabın daha fazla bilgisi ve favorilere ekleme butonu bulunur.

### Kitap Ekleme

Admin kullanıcılar, "Add Book" butonuna tıklayarak yeni bir kitap ekleyebilirler. Kitap ekleme formunu doldurduktan sonra "Add Book" butonuna tıklayarak kitabı ekleyebilirsiniz.

### Kitap Güncelleme

Admin kullanıcılar, kitap kartındaki "Update" butonuna tıklayarak mevcut bir kitabı güncelleyebilirler. Kitap güncelleme formunu doldurduktan sonra "Update Book" butonuna tıklayarak kitabı güncelleyebilirsiniz.

### Kitap Silme

Admin kullanıcılar, kitap kartındaki "Delete" butonuna tıklayarak mevcut bir kitabı silebilirler. Kitabı silmeden önce onay penceresi görünecektir.

### Favorilere Ekleme

Kullanıcılar, kitap detay sayfasındaki kalp ikonuna tıklayarak kitapları favorilerine ekleyebilirler veya favorilerden çıkarabilirler. Favorilere eklemek veya çıkarmak için giriş yapmış olmanız gerekmektedir.

