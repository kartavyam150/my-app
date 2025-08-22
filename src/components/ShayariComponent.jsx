import React, { useState } from "react";

const initialShayaris = [
  "मंज़िल को भुला कर जिया तो क्या जिया,अगर तुझमें दम है तो उसे पा कर दिखा।लिख दे ख़ून से अपनी कामयाबी की कहानी,और बोल उस क़िस्मत से — हिम्मत है तो रोक कर दिखा।",
  "ज़िन्दगी एक किताब की तरह होती है, हर पन्ना कुछ न कुछ सिखा जाता है।",
  "वक़्त अच्छा ज़रूर आता है, मगर वक़्त पर ही आता है।",
  "दिल से जो बात निकलती है असर रखती है, पर नहीं ताक़त-ए-परवाज़ मगर रखती है।",
  "तूफानों से आंख मिलाओ, सैलाबों पर वार करो, मुश्किलों का खुद सामना करो और जीत कर उभार आओ।",
  "हर सुबह एक नई शुरुआत है, हर दिन एक नया अवसर है।",
  "कभी-कभी हम मुस्कुराते हैं, बस दूसरों की ख़ुशी के लिए, वरना दर्द तो हमें भी होता है...",
  "जो लोग अंदर से टूट जाते हैं, वो अक्सर बाहर से खामोश हो जाते हैं।",
  "कभी किसी को इतना मत चाहो कि जब वो छोड़ के जाए तो खुद को ही खो बैठो।",
  "जिसे हम सबसे ज़्यादा चाहते हैं, वही हमें सबसे बड़ा दर्द देता है।",
  "ख़ामोशी को मत समझो कमज़ोरी, वो दर्द भी बयां करती है और सब्र भी।",
  "ज़िन्दगी को इतना भी सीरियस मत ले, यारो... यहाँ से कोई भी ज़िंदा नहीं बचता।",
  "हर सुबह एक नई शुरुआत है, बीती बातों को भूलकर फिर से मुस्कुराओ।",
  "जो खो गया, उसका ग़म नहीं... जो पाया है, वो किसी से कम नहीं।",
  "ज़िन्दगी उसी को आज़माती है जो हर मोड़ पे चलना जानता है।",
  "जी लो ज़िन्दगी इस कदर कि मौत भी कहे... क्या बन्दे को मारा है!",
  "तेरे जाने से कुछ बदला तो नहीं, बस पहले जहां दिल था, अब वहां दर्द रहता है।",
  "हम भी मुस्कुरा सकते थे, मगर किस्मत ने इतनी मोहलत ही नहीं दी।",
  "कभी-कभी तन्हाई भी ज़रूरी होती है, खुद से मिलने के लिए।",
  "वो जो कहते थे साथ निभाएंगे आखिरी दम तक... आज सांसें तो हैं, पर वो नहीं।",
  "अक्सर वही लोग हमें तोड़ जाते हैं, जिन्हें हम टूट कर चाहते हैं।"
];

const ShayariComponent = () => {
  const [shayaris, setShayaris] = useState(initialShayaris);
  const [index, setIndex] = useState(0);

  const showNextShayari = () => {
    if (shayaris.length > 1) {
      setIndex((prev) => (prev + 1) % shayaris.length);
    }
  };

  const speakShayari = () => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(shayaris[index]);
      utter.lang = 'hi-IN';
      utter.rate = 0.95;
      window.speechSynthesis.cancel(); // Stop any previous speech
      window.speechSynthesis.speak(utter);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '700px',
      margin: 'auto',
      textAlign: 'center',
      fontFamily: 'Georgia, serif',
      backgroundColor: '#fffbe7',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
      color: '#444',
      position: 'relative'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>📝 शायरी</h2>
      <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>अर्ज़ किया है...</p>
      <p style={{
        fontSize: '1.4rem',
        fontWeight: '500',
        margin: '1.5rem 0',
        lineHeight: '2rem'
      }}>
        “{shayaris[index] || "कोई शायरी उपलब्ध नहीं है"}”
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={showNextShayari} style={{
          padding: '0.7rem 1.7rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#d72638',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
        }}>
          इरशाद इरशाद 🎤
        </button>
        <button onClick={speakShayari} style={{
          padding: '0.7rem 1.7rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#43cea2',
          color: '#fff',
          cursor: 'pointer',
          boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
        }}>
          सुनिए 🔊
        </button>
      </div>
    </div>
  );
};

export default ShayariComponent;
