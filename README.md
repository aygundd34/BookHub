# Book Hub

Book Hub, kullanıcıların kitapları görüntüleyebileceği, ekleyebileceği, güncelleyebileceği ve favorilere ekleyebileceği bir kitap yönetim uygulamasıdır. Bu projede, React.js ve Axios kullanılarak bir kitap yönetim sistemi geliştirilmiştir.

## Özellikler

- Kitapları listeleme
- Kitap detaylarını görüntüleme
- Kitap ekleme (Yalnızca admin kullanıcılar)
- Kitap güncelleme (Yalnızca admin kullanıcılar)
- Kitap silme (Yalnızca admin kullanıcılar)
- Kitapları favorilere ekleme ve favorilerden çıkarma (Kullanıcı girişi gerektirir)

## API

Bu proje, kitap verilerini almak ve yönetmek için bir RESTful API kullanmaktadır. API uç noktaları `http://localhost:5094/api/Books` adresindedir.

### API Uç Noktaları

- `GET /api/Books/getList`: Tüm kitapları listeler.
- `GET /api/Books/get/:id`: Belirli bir kitabın detaylarını getirir.
- `POST /api/Books/add`: Yeni bir kitap ekler.
- `PUT /api/Books/update`: Mevcut bir kitabı günceller.
- `DELETE /api/Books/delete/:id`: Belirli bir kitabı siler.

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
