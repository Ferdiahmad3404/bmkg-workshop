// =======================================================
// 1️⃣ Fungsi dengan var
// =======================================================
function demoVar() {
  console.log("=== Demo var ===");
  
  var nama = "Andi";
  console.log("Awal:", nama);

  // var bisa diubah nilainya
  nama = "Budi";
  console.log("Setelah diubah:", nama);

  // var bisa di-redeclare di fungsi yang sama
  var nama = "Citra";
  console.log("Setelah redeclare:", nama);

  // var hanya function-scoped, tidak block-scoped
  if (true) {
    var pesan = "Halo dari dalam blok if (var)";
  }
  console.log("Masih bisa diakses di luar if:", pesan); // ✅ bisa
}

demoVar();

// =======================================================
// 2️⃣ Fungsi dengan let
// =======================================================
function demoLet() {
  console.log("\n=== Demo let ===");
  
  let umur = 20;
  console.log("Awal:", umur);

  // let bisa diubah nilainya
  umur = 25;
  console.log("Setelah diubah:", umur);

  // let tidak bisa di-redeclare di blok yang sama
  // let umur = 30; // ❌ Error kalau aktifkan

  // let bersifat block-scoped
  if (true) {
    let hobi = "Bermain musik";
    console.log("Di dalam blok if:", hobi);
  }

  // console.log(hobi); // ❌ Error: hobi is not defined
  console.log("Variabel di luar blok tetap aman");
}

demoLet();

// =======================================================
// 3️⃣ Fungsi dengan const
// =======================================================
function demoConst() {
  console.log("\n=== Demo const ===");
  
  const kota = "Jakarta";
  console.log("Awal:", kota);

  // const tidak bisa diubah nilainya
  // kota = "Bandung"; // ❌ Error kalau aktifkan

  // const tidak bisa di-redeclare
  // const kota = "Surabaya"; // ❌ Error kalau aktifkan

  // const juga block-scoped
  if (true) {
    const negara = "Indonesia";
    console.log("Di dalam blok if:", negara);
  }

  // console.log(negara); // ❌ Error: negara is not defined
  console.log("Const hanya bisa diakses di blok tempat dia dideklarasikan");
}

demoConst();