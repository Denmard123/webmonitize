// Memantau perubahan pada Local Storage untuk menampilkan data yang diperbarui
window.addEventListener('storage', (event) => {
  if (event.key === 'updatedProduct') {
    const updatedProduct = JSON.parse(event.newValue);

    // Pastikan elemen HTML dapat ditemukan dengan benar
    const penjualanElement = document.querySelector('.purecounter[data-purecounter-end="85"]');
    const yearsOfExperienceElement = document.querySelector('.purecounter[data-purecounter-end="10"]');
    
    // Periksa apakah elemen HTML berhasil ditemukan sebelum memperbarui kontennya
    if (penjualanElement && yearsOfExperienceElement) {
      // Ubah teks pada elemen HTML berdasarkan data yang diperoleh dari Local Storage
      penjualanElement.textContent = `Penjualan: ${updatedProduct.penjualan}`;
      yearsOfExperienceElement.textContent = `Years of Experience: ${updatedProduct.Years_of_experience}`;
    } else {
      console.error('One or more elements not found');
    }
  }
});
