// ⚠️ Telegram Bot Ma'lumotlarini shu yerga kiriting:
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; // Masalan: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
const CHAT_ID = "YOUR_CHAT_ID_HERE";     // Masalan: 987654321 yoki guruh ID si

const form = document.getElementById('tg-form');
const statusMsg = document.getElementById('status-msg');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Tugmani bloklab turamiz
  submitBtn.disabled = true;
  submitBtn.innerText = "Yuborilmoqda...";
  statusMsg.style.color = "#333";
  statusMsg.innerText = "";

  // Formadagi qiymatlarni olish
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const guests = document.getElementById('guests').value || "Ko'rsatilmadi";
  const message = document.getElementById('message').value || "Yo'q";

  // Telegramga yuboriladigan matn
  const text = `🎉 *Yangi Ariza!* 🎉\n\n` +
               `👤 *Ism:* ${name}\n` +
               `📞 *Tel:* ${phone}\n` +
               `📅 *Sana:* ${date}\n` +
               `👥 *Mehmonlar:* ${guests}\n` +
               `💬 *Izoh:* ${message}`;

  // Telegram API ga so'rov yuborish
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'Markdown'
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      statusMsg.style.color = "green";
      statusMsg.innerText = "✅ Arizangiz muvaffaqiyatli yuborildi! Tez orada bog'lanamiz.";
      form.reset();
    } else {
      statusMsg.style.color = "red";
      statusMsg.innerText = "❌ Xatolik yuz berdi. Bot tokeni yoki Chat ID ni tekshiring.";
    }
  })
  .catch(error => {
    console.error(error);
    statusMsg.style.color = "red";
    statusMsg.innerText = "❌ Tarmoqda xatolik yuz berdi. Qayta urinib ko'ring.";
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerText = "Arizani Yuborish";
  });
});