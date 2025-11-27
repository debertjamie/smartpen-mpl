"use client";

import { useState } from "react";

// Smartpen Store - Single-file React component
// Tailwind CSS classes used (expects Tailwind in the project)

export default function SmartpenStore() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

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
    setCart((c) => {
      const existingItem = c.find(item => item.id === product.id);
      if (existingItem) {
        return c.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...c, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} ditambahkan ke keranjang`);
  }

  function removeFromCart(productId) {
    setCart((c) => c.filter(item => item.id !== productId));
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((c) => 
      c.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  function getTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function handleCheckout() {
    if (!selectedPayment) {
      alert('Silakan pilih metode pembayaran');
      return;
    }
    alert(`Checkout berhasil dengan ${selectedPayment}! Total: Rp ${formatIDR(getTotalPrice())}`);
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setSelectedPayment('');
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
                onClick={() => setShowCart(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md shadow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                </svg>
                Keranjang
                <span className="ml-2 bg-white text-indigo-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                  {getTotalItems()}
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

      {/* SHOPPING CART MODAL */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Keranjang Belanja</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  </svg>
                  <p className="text-gray-500">Keranjang Anda kosong</p>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
                  >
                    Mulai Belanja
                  </button>
                </div>
              ) : (
                <div>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.short}</p>
                          <div className="text-lg font-bold text-indigo-600">Rp {formatIDR(item.price)}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-lg font-bold min-w-[120px] text-right">
                            Rp {formatIDR(item.price * item.quantity)}
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-semibold">Total ({getTotalItems()} item{getTotalItems() > 1 ? 's' : ''})</div>
                      <div className="text-2xl font-bold text-indigo-600">Rp {formatIDR(getTotalPrice())}</div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowCart(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Lanjut Belanja
                      </button>
                      <button 
                        onClick={() => setShowCheckout(true)}
                        className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-semibold">Rp {formatIDR(item.price * item.quantity)}</div>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span className="text-indigo-600">Rp {formatIDR(getTotalPrice())}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
                <div className="space-y-3">
                  {[
                    { id: 'ewallet', label: 'E-Wallet / Virtual Account', desc: 'OVO, GoPay, Dana, BCA Virtual Account', icon: '💳' },
                    { id: 'qris', label: 'QRIS', desc: 'Scan QR code untuk pembayaran instan', icon: '📱' },
                    { id: 'paypal', label: 'PayPal / Credit Card', desc: 'Visa, Mastercard, PayPal', icon: '💰' }
                  ].map((method) => (
                    <label key={method.id} className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="payment" 
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="text-indigo-600"
                      />
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{method.label}</div>
                        <div className="text-sm text-gray-600">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Kembali
                </button>
                <button 
                  onClick={handleCheckout}
                  disabled={!selectedPayment}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
