# 🌟 AnoNotes - WebApp 🌟  
AnoNotes is a fun and interactive web app where users can create a link, share it with friends, and receive anonymous messages.  

## ✨ Features  
- 🔗 **Create and Share Links**  
- 📝 **Submit Anonymous Messages**  
- 📖 **View Responses**  
- 🎨 **Clean Interface**  
- 🤖 **Text Detection**

## 🛠️ **Tech Stack**  

- 🗄️ **MongoDB**: NoSQL database for storing messages.  
- 🚀 **Express.js**: Handles server-side logic and routing.  
- 💻 **React**: Builds a responsive and intuitive frontend.  
- 🟢 **Node.js**: Backend runtime environment for smooth functionality.  
- ⚡ **FastAPI**: Powers the NLP solution for content moderation.  

<br><br>

# 🤖 **NLP - Integration** 🤖

Anonymous messages may sometimes contain harmful content or bad words, which could negatively impact the receiver's mental health. To address this, an **NLP solution** is integrated into the app to ensure a safe and positive experience.  

---

### ⚠️ **Bad Word Detection**  
- 🔍 Messages are checked against a **predefined list of bad words** in **Sinhala Singlish**.  
- 🚨 If a bad word is detected:  
  - A **warning** is displayed.  
  - The message is **blocked** from being sent to the recipient.  

---

### ☢️ **Harmful Content Detection**  
Detecting harmful content across **three languages** (**English, Sinhala, and Singlish**) posed a challenge. Here's how it's tackled:  

- **Models Used:**  
  1️⃣ Detects harmful content in **Singlish**.  
  2️⃣ Detects harmful content in **Sinhala**.  
  3️⃣ Detects harmful content in **English**.  
  4️⃣ Identifies and differentiates between **English and Sinhala** content.  

---

### 📊 **Dataset Collection**  
To build robust models, data was gathered using the following methods:  
- **YouTube Comments**: Scraped using the **YouTube V3 API**.  
- **Google Form Submissions**: Collected user-submitted comments.  

🌟 **Want to Contribute?**  
You can help us improve our models by contributing data in different accents and contexts!  
- 📝 Fill out the form: [📋 Submit Data](https://forms.gle/HkqrPBjM3J317EWaA)  

---
## 🛡️ **Security and Privacy**  

We take the security and privacy of our users very seriously. Here’s how we ensure a safe and secure experience:  

- 🧠 **NLP for Protection**:  
  Integrated **NLP models** ensure users are shielded from harmful and offensive content.  

- 🔑 **Encrypted Passwords**:  
  User passwords are encrypted, ensuring that no one, including administrators, can view them.  

- 🌐 **IP Address Collection**:  
  To address any **illegal activity** or **higher-level concerns**, we collect the IP address of commenters. This ensures that we can take **legal action** if necessary.  

---

🤝 Contributions are welcome! Feel free to submit issues or create pull requests. Let’s build AnoNotes together!
