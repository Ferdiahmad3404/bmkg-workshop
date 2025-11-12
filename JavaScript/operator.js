
// =============================================
// 🔢 1. OPERATOR ARITMATIKA
// =============================================
console.log("=== OPERATOR ARITMATIKA ===");

let a = 10;
let b = 3;

console.log("a + b =", a + b);   // Penjumlahan
console.log("a - b =", a - b);   // Pengurangan
console.log("a * b =", a * b);   // Perkalian
console.log("a / b =", a / b);   // Pembagian
console.log("a % b =", a % b);   // Modulus (sisa bagi)
console.log("a ** b =", a ** b); // Pangkat


// =============================================
// 🧩 2. OPERATOR PENUGASAN
// =============================================
console.log("\n=== OPERATOR PENUGASAN ===");

let x = 5;
console.log("x =", x);

x += 3;  // x = x + 3
console.log("x += 3 →", x);

x -= 2;  // x = x - 2
console.log("x -= 2 →", x);

x *= 4;  // x = x * 4
console.log("x *= 4 →", x);

x /= 2;  // x = x / 2
console.log("x /= 2 →", x);

x %= 3;  // x = x % 3
console.log("x %= 3 →", x);


// =============================================
// ⚖️ 3. OPERATOR PERBANDINGAN
// =============================================
console.log("\n=== OPERATOR PERBANDINGAN ===");

let c = 10;
let d = "10";

console.log("c == d →", c == d);     // true (nilai sama, tipe diabaikan)
console.log("c === d →", c === d);   // false (tipe beda)
console.log("c != d →", c != d);     // false
console.log("c !== d →", c !== d);   // true
console.log("c > 5 →", c > 5);       // true
console.log("c < 5 →", c < 5);       // false
console.log("c >= 10 →", c >= 10);   // true
console.log("c <= 9 →", c <= 9);     // false


// =============================================
// 🧠 4. OPERATOR LOGIKA
// =============================================
console.log("\n=== OPERATOR LOGIKA ===");

let benar = true;
let salah = false;

console.log("true && false →", benar && salah); // AND
console.log("true || false →", benar || salah); // OR
console.log("!true →", !benar);                 // NOT


// =============================================
// 🔢 5. INCREMENT & DECREMENT
// =============================================
console.log("\n=== OPERATOR INCREMENT & DECREMENT ===");

let i = 5;
console.log("i =", i);

i++;
console.log("Setelah i++ =", i);

i--;
console.log("Setelah i-- =", i);


// =============================================
// 🔤 6. OPERATOR STRING
// =============================================
console.log("\n=== OPERATOR STRING ===");

let namaDepan = "Ferdi";
let namaBelakang = "Ariesta";

let namaLengkap = namaDepan + " " + namaBelakang; // Penggabungan string
console.log("Nama Lengkap:", namaLengkap);

let ucapan = `Halo, ${namaDepan}!`; // Template literal (ES6)
console.log("Template Literal:", ucapan);

console.log("Panjang nama:", namaLengkap.length); // Property length


// =============================================
// ❓ 7. OPERATOR TERNARY
// =============================================
console.log("\n=== OPERATOR TERNARY ===");

let umur = 18;
let status = (umur >= 17) ? "Dewasa" : "Anak-anak";
console.log("Umur:", umur, "→ Status:", status);


// =============================================
// 🧮 BONUS: GABUNGAN OPERATOR
// =============================================
console.log("\n=== BONUS: GABUNGAN OPERATOR ===");

let nilai = 80;
let hasil = (nilai >= 75 && nilai <= 100) ? "Lulus" : "Tidak Lulus";
console.log(`Nilai = ${nilai}, Hasil = ${hasil}`);
