"use client";

import { useState } from "react";

// Smartpen Store - Single-file React component
// Tailwind CSS classes used (expects Tailwind in the project)

export default function SmartpenStore() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const products = [
    {
      id: "sp-01",
      name: "SmartPen ",
      price: 1499000,
      short: "Smartpen pintar dengan konversi tulisan ke teks real-time.",
      img: "/produk.jpg",
      features: [
        "Realtime handwriting-to-text",
        "Bluetooth 5.2",
        "12 jam battery life",
        "Kompatibel iOS & Android",
      ],
    },
  ];

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.short.toLowerCase().includes(query.toLowerCase())
  );

  function addToCart(product) {
    setCart((c) => [...c, product]);
    alert(`${product.name} ditambahkan ke keranjang`);
  }

  function formatIDR(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* NAVBAR */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-indigo-600">SmartPen</div>
              <nav className="hidden md:flex gap-6 text-sm text-gray-600">
                <a href="#" className="hover:text-indigo-600">Home</a>
                <a href="#products" className="hover:text-indigo-600">Produk</a>
                <a href="#about" className="hover:text-indigo-600">Tentang</a>
                <a href="#support" className="hover:text-indigo-600">Support</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari smartpen..."
                  className="border rounded-md px-3 py-1 text-sm w-56"
                />
              </div>

              <button
                onClick={() => alert('Fitur checkout belum aktif di demo')}
                className="relative inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                </svg>
                Beli Sekarang
                <span className="ml-2 bg-white text-indigo-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {cart.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl font-extrabold leading-tight">SmartPen — Tulis, Simpan, dan Konversi</h1>
              <p className="mt-4 text-lg">Transformasikan catatan tangan Anda menjadi teks digital secara instan. Cocok untuk pelajar, profesional, dan kreator.</p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="px-5 py-3 bg-white text-indigo-600 rounded-md font-semibold shadow">Lihat Produk</button>
                <button onClick={() => setSelected(products[0])} className="px-5 py-3 border border-white rounded-md">Demo Cepat</button>
              </div>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/90">
                <li>🔋 Battery tahan lama</li>
                <li>🔊 Integrasi audio & cloud</li>
                <li>🔒 Data terenkripsi</li>
                <li>📱 Kompatibel iOS & Android</li>
              </ul>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="w-80 h-80 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <img src={"/pen.jpg"} alt="smartpen" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES + PRODUCTS */}
        <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Produk Unggulan</h2>
            <div className="text-sm text-gray-600">Menampilkan {filtered.length} dari {products.length} produk</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                <div className="relative">
                  <img src={p.img} alt={p.name} className="w-full h-44 object-cover rounded-lg" />
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white px-2 py-1 rounded-md text-xs">Terlaris</div>
                </div>

                <div className="mt-4 flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{p.short}</p>

                  <ul className="mt-3 text-xs text-gray-500 space-y-1">
                    {p.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Mulai dari</div>
                    <div className="text-xl font-bold">Rp {formatIDR(p.price)}</div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setSelected(p)} className="px-4 py-2 border rounded-md text-sm">Detail</button>
                    <button onClick={() => addToCart(p)} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">Masukkan</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT + SUPPORT */}
        <section id="about" className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold">Kenapa pilih SmartPen?</h3>
              <p className="mt-4 text-gray-600">Kami menggabungkan hardware presisi dengan software pintar untuk memastikan setiap coretan berubah menjadi data yang berguna. Keamanan, kemudahan sinkronisasi, dan daya tahan adalah prioritas kami.</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                <li>• Garansi 1 tahun & dukungan teknis lokal</li>
                <li>• Free shipping di beberapa kota (syarat & ketentuan berlaku)</li>
                <li>• Edu & bundle discount untuk institusi</li>
              </ul>
            </div>

            <div>
              <div className="rounded-2xl p-6 border">
                <h4 className="font-semibold">Butuh bantuan?</h4>
                <p className="mt-2 text-gray-600 text-sm">Chat dengan tim support kami, cek FAQ, atau kirim email ke support@smartpen.example</p>

                <div className="mt-4 flex gap-3">
                  <button onClick={() => alert('Memulai chat... (demo)')} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Chat Sekarang</button>
                  <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-4 py-2 border rounded-md">FAQ</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="support" className="bg-gray-900 text-gray-300 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-white">SmartPen</div>
              <p className="mt-3 text-sm">Solusi cerdas untuk pencatatan modern.</p>
            </div>

            <div>
              <h5 className="font-semibold">Perusahaan</h5>
              <ul className="mt-3 text-sm space-y-2">
                <li>Tentang Kami</li>
                <li>Karir</li>
                <li>Kontak</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold">Support</h5>
              <ul className="mt-3 text-sm space-y-2">
                <li>FAQ</li>
                <li>Garansi & Pengembalian</li>
                <li>Panduan Produk</li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} SmartPen Indonesia. Semua hak cipta dilindungi.</div>
        </footer>
      </main>

      {/* PRODUCT MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{selected.name}</h3>
                <p className="mt-2 text-gray-600">{selected.short}</p>

                <ul className="mt-4 text-sm text-gray-700 space-y-2">
                  {selected.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Harga</div>
                    <div className="text-2xl font-bold">Rp {formatIDR(selected.price)}</div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => { addToCart(selected); setSelected(null); }} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Masukkan Keranjang</button>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded-md">Tutup</button>
                  </div>
                </div>
              </div>

              <div className="w-48 flex-shrink-0">
                <img src={selected.img} alt={selected.name} className="rounded-lg object-cover w-full h-48" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
