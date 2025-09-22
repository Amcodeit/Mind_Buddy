import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  AlertTriangle,
  Heart,
  Phone,
  Wifi,
  WifiOff,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import LanguageSelector, { languages } from './LanguageSelector';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'crisis';
  language?: string;
}

// Multilingual responses with comprehensive language support
const multilingualResponses: Record<string, { 
  welcome: string;
  responses: Array<{ content: string; severity: 'low' | 'medium' | 'high'; keywords?: string[] }>;
  followUps: Array<{ content: string; trigger: string }>;
  offline: string;
  disclaimer: string;
  crisisMessage: string;
}> = {
  en: {
    welcome: "Hi! I'm your MindBuddy AI assistant. I'm here to provide immediate support and help assess how you're feeling. How are you doing today?",
    responses: [
      { content: "Thank you for sharing that. On a scale of 1-9, how would you rate your current mood?", severity: 'low', keywords: ['ok', 'fine', 'good', 'well'] },
      { content: "I understand this is challenging. Have you been experiencing these feelings for more than two weeks?", severity: 'medium', keywords: ['stressed', 'anxious', 'worried', 'tired', 'overwhelmed'] },
      { content: "I'm concerned about what you've shared. It's important that you talk to someone right away. Would you like me to connect you with immediate support?", severity: 'high', keywords: ['sad', 'depressed', 'hopeless', 'alone', 'hurt', 'pain'] }
    ],
    followUps: [
      { content: "That's great to hear! What's been helping you feel this way?", trigger: 'positive' },
      { content: "I understand. Can you tell me more about what's been on your mind?", trigger: 'neutral' },
      { content: "It sounds like you're going through a difficult time. You're not alone in this.", trigger: 'negative' }
    ],
    offline: "You're currently offline. Your messages will be saved and processed when you reconnect.",
    disclaimer: "AI support for immediate help. Not a substitute for professional care.",
    crisisMessage: "If you're having thoughts of self-harm, please contact emergency services immediately or call a crisis helpline."
  },
  es: {
    welcome: "¡Hola! Soy tu asistente de IA MindBuddy. Estoy aquí para brindarte apoyo inmediato y ayudarte a evaluar cómo te sientes. ¿Cómo estás hoy?",
    responses: [
      { content: "Gracias por compartir eso. En una escala del 1 al 9, ¿cómo calificarías tu estado de ánimo actual?", severity: 'low', keywords: ['bien', 'bueno', 'normal', 'tranquilo'] },
      { content: "Entiendo que esto es desafiante. ¿Has estado experimentando estos sentimientos durante más de dos semanas?", severity: 'medium', keywords: ['estresado', 'ansioso', 'preocupado', 'cansado', 'abrumado'] },
      { content: "Me preocupa lo que has compartido. Es importante que hables con alguien de inmediato. ¿Te gustaría que te conecte con apoyo inmediato?", severity: 'high', keywords: ['triste', 'deprimido', 'desesperanzado', 'solo', 'dolor'] }
    ],
    followUps: [
      { content: "¡Qué bueno escuchar eso! ¿Qué te ha estado ayudando a sentirte así?", trigger: 'positive' },
      { content: "Entiendo. ¿Puedes contarme más sobre lo que ha estado en tu mente?", trigger: 'neutral' },
      { content: "Parece que estás pasando por un momento difícil. No estás solo en esto.", trigger: 'negative' }
    ],
    offline: "Actualmente estás sin conexión. Tus mensajes se guardarán y procesarán cuando te reconectes.",
    disclaimer: "Apoyo de IA para ayuda inmediata. No es sustituto de atención profesional.",
    crisisMessage: "Si tienes pensamientos de autolesión, contacta servicios de emergencia inmediatamente o llama a una línea de crisis."
  },
  fr: {
    welcome: "Salut ! Je suis votre assistant IA MindBuddy. Je suis là pour vous apporter un soutien immédiat et vous aider à évaluer comment vous vous sentez. Comment allez-vous aujourd'hui ?",
    responses: [
      { content: "Merci de partager cela. Sur une échelle de 1 à 9, comment évalueriez-vous votre humeur actuelle ?", severity: 'low', keywords: ['bien', 'bon', 'normal', 'calme'] },
      { content: "Je comprends que c'est difficile. Ressentez-vous ces sentiments depuis plus de deux semaines ?", severity: 'medium', keywords: ['stressé', 'anxieux', 'inquiet', 'fatigué', 'débordé'] },
      { content: "Ce que vous avez partagé m'inquiète. Il est important que vous parliez à quelqu'un tout de suite. Souhaiteriez-vous que je vous connecte à un soutien immédiat ?", severity: 'high', keywords: ['triste', 'déprimé', 'désespéré', 'seul', 'douleur'] }
    ],
    followUps: [
      { content: "C'est formidable d'entendre cela ! Qu'est-ce qui vous aide à vous sentir ainsi ?", trigger: 'positive' },
      { content: "Je comprends. Pouvez-vous me dire plus sur ce qui vous préoccupe ?", trigger: 'neutral' },
      { content: "Il semble que vous traversez une période difficile. Vous n'êtes pas seul dans cette épreuve.", trigger: 'negative' }
    ],
    offline: "Vous êtes actuellement hors ligne. Vos messages seront sauvegardés et traités lors de votre reconnexion.",
    disclaimer: "Support IA pour aide immédiate. Ne remplace pas les soins professionnels.",
    crisisMessage: "Si vous avez des pensées d'automutilation, contactez immédiatement les services d'urgence ou appelez une ligne de crise."
  },
  de: {
    welcome: "Hallo! Ich bin dein MindBuddy KI-Assistent. Ich bin hier, um dir sofortige Unterstützung zu bieten und dir zu helfen, zu bewerten, wie du dich fühlst. Wie geht es dir heute?",
    responses: [
      { content: "Danke, dass du das geteilt hast. Auf einer Skala von 1-9, wie würdest du deine aktuelle Stimmung bewerten?", severity: 'low', keywords: ['gut', 'okay', 'normal', 'ruhig'] },
      { content: "Ich verstehe, dass das herausfordernd ist. Erlebst du diese Gefühle schon seit mehr als zwei Wochen?", severity: 'medium', keywords: ['gestresst', 'ängstlich', 'besorgt', 'müde', 'überfordert'] },
      { content: "Was du geteilt hast, bereitet mir Sorgen. Es ist wichtig, dass du sofort mit jemandem sprichst. Möchtest du, dass ich dich mit sofortiger Hilfe verbinde?", severity: 'high', keywords: ['traurig', 'deprimiert', 'hoffnungslos', 'allein', 'schmerz'] }
    ],
    followUps: [
      { content: "Das ist großartig zu hören! Was hat dir geholfen, dich so zu fühlen?", trigger: 'positive' },
      { content: "Ich verstehe. Kannst du mir mehr darüber erzählen, was dich beschäftigt?", trigger: 'neutral' },
      { content: "Es klingt, als würdest du eine schwere Zeit durchmachen. Du bist nicht allein damit.", trigger: 'negative' }
    ],
    offline: "Du bist derzeit offline. Deine Nachrichten werden gespeichert und verarbeitet, wenn du dich wieder verbindest.",
    disclaimer: "KI-Unterstützung für sofortige Hilfe. Kein Ersatz für professionelle Betreuung.",
    crisisMessage: "Wenn du Gedanken an Selbstverletzung hast, kontaktiere sofort den Notdienst oder rufe eine Krisenhotline an."
  },
  it: {
    welcome: "Ciao! Sono il tuo assistente AI MindBuddy. Sono qui per fornire supporto immediato e aiutarti a valutare come ti senti. Come stai oggi?",
    responses: [
      { content: "Grazie per aver condiviso questo. Su una scala da 1 a 9, come valuteresti il tuo umore attuale?", severity: 'low', keywords: ['bene', 'okay', 'normale', 'tranquillo'] },
      { content: "Capisco che sia difficile. Provi questi sentimenti da più di due settimane?", severity: 'medium', keywords: ['stressato', 'ansioso', 'preoccupato', 'stanco', 'sopraffatto'] },
      { content: "Quello che hai condiviso mi preoccupa. È importante che tu parli con qualcuno subito. Vorresti che ti collegassi con supporto immediato?", severity: 'high', keywords: ['triste', 'depresso', 'senza speranza', 'solo', 'dolore'] }
    ],
    followUps: [
      { content: "È fantastico sentire questo! Cosa ti ha aiutato a sentirti così?", trigger: 'positive' },
      { content: "Capisco. Puoi dirmi di più su quello che hai in mente?", trigger: 'neutral' },
      { content: "Sembra che tu stia attraversando un periodo difficile. Non sei solo in questo.", trigger: 'negative' }
    ],
    offline: "Attualmente sei offline. I tuoi messaggi verranno salvati e elaborati quando ti riconnetterai.",
    disclaimer: "Supporto AI per aiuto immediato. Non sostituisce le cure professionali.",
    crisisMessage: "Se hai pensieri di autolesionismo, contatta immediatamente i servizi di emergenza o chiama una linea di crisi."
  },
  pt: {
    welcome: "Olá! Sou seu assistente de IA MindBuddy. Estou aqui para fornecer suporte imediato e ajudar a avaliar como você se sente. Como você está hoje?",
    responses: [
      { content: "Obrigado por compartilhar isso. Em uma escala de 1-9, como você classificaria seu humor atual?", severity: 'low', keywords: ['bem', 'okay', 'normal', 'calmo'] },
      { content: "Entendo que isso é desafiador. Você tem experimentado esses sentimentos por mais de duas semanas?", severity: 'medium', keywords: ['estressado', 'ansioso', 'preocupado', 'cansado', 'sobrecarregado'] },
      { content: "Estou preocupado com o que você compartilhou. É importante que você fale com alguém imediatamente. Gostaria que eu o conectasse com suporte imediato?", severity: 'high', keywords: ['triste', 'deprimido', 'sem esperança', 'sozinho', 'dor'] }
    ],
    followUps: [
      { content: "É ótimo ouvir isso! O que tem ajudado você a se sentir assim?", trigger: 'positive' },
      { content: "Entendo. Pode me contar mais sobre o que está em sua mente?", trigger: 'neutral' },
      { content: "Parece que você está passando por um momento difícil. Você não está sozinho nisso.", trigger: 'negative' }
    ],
    offline: "Você está atualmente offline. Suas mensagens serão salvas e processadas quando você se reconectar.",
    disclaimer: "Suporte de IA para ajuda imediata. Não substitui cuidados profissionais.",
    crisisMessage: "Se você tem pensamentos de autolesão, entre em contato com serviços de emergência imediatamente ou ligue para uma linha de crise."
  },
  zh: {
    welcome: "你好！我是你的MindBuddy AI助手。我在这里提供即时支持，帮助评估你的感受。你今天怎么样？",
    responses: [
      { content: "谢谢你分享这些。在1-9的评分中，你会如何评价你当前的心情？", severity: 'low', keywords: ['好', '还行', '正常', '平静'] },
      { content: "我理解这很有挑战性。你是否已经体验这些感受超过两周了？", severity: 'medium', keywords: ['压力', '焦虑', '担心', '疲倦', 'overwhelmed'] },
      { content: "你分享的内容让我担心。立即与某人交谈很重要。你希望我为你联系即时支持吗？", severity: 'high', keywords: ['悲伤', '沮丧', '绝望', '孤独', '痛苦'] }
    ],
    followUps: [
      { content: "听到这个真是太好了！是什么帮助你有这样的感觉？", trigger: 'positive' },
      { content: "我理解。你能告诉我更多关于你心中所想的吗？", trigger: 'neutral' },
      { content: "听起来你正在经历困难时期。在这件事上你并不孤单。", trigger: 'negative' }
    ],
    offline: "你目前处于离线状态。你的消息将被保存，并在重新连接时处理。",
    disclaimer: "AI支持提供即时帮助。不能替代专业护理。",
    crisisMessage: "如果你有自伤念头，请立即联系紧急服务或拨打危机热线。"
  },
  ja: {
    welcome: "こんにちは！私はあなたのMindBuddy AIアシスタントです。即座のサポートを提供し、あなたの気持ちを評価するお手伝いをします。今日はいかがですか？",
    responses: [
      { content: "シェアしてくれてありがとう。1-9のスケールで、現在の気分をどう評価しますか？", severity: 'low', keywords: ['元気', '大丈夫', '普通', '落ち着いている'] },
      { content: "それが困難であることを理解しています。これらの感情を2週間以上経験していますか？", severity: 'medium', keywords: ['ストレス', '不安', '心配', '疲れた', 'overwhelmed'] },
      { content: "あなたがシェアしたことが心配です。すぐに誰かと話すことが重要です。即座のサポートに接続しましょうか？", severity: 'high', keywords: ['悲しい', 'うつ', '絶望的', '孤独', '痛み'] }
    ],
    followUps: [
      { content: "それを聞いて素晴らしいです！何があなたをそのように感じさせているのですか？", trigger: 'positive' },
      { content: "理解します。あなたの心にあることについてもっと教えてもらえますか？", trigger: 'neutral' },
      { content: "困難な時期を過ごしているようですね。あなたは一人ではありません。", trigger: 'negative' }
    ],
    offline: "現在オフラインです。メッセージは保存され、再接続時に処理されます。",
    disclaimer: "即座の支援のためのAIサポート。専門的なケアの代替ではありません。",
    crisisMessage: "自傷の考えがある場合は、すぐに緊急サービスに連絡するか、危機ホットラインに電話してください。"
  },
  ko: {
    welcome: "안녕하세요! 저는 당신의 MindBuddy AI 어시스턴트입니다. 즉각적인 지원을 제공하고 당신의 기분을 평가하는 데 도움을 드리고 있습니다. 오늘 어떠세요?",
    responses: [
      { content: "공유해 주셔서 감사합니다. 1-9 척도에서 현재 기분을 어떻게 평가하시겠습니까?", severity: 'low', keywords: ['좋아', '괜찮아', '보통', '평온한'] },
      { content: "이것이 도전적이라는 것을 이해합니다. 이러한 감정을 2주 이상 경험하고 계신가요?", severity: 'medium', keywords: ['스트레스', '불안한', '걱정', '피곤한', 'overwhelmed'] },
      { content: "당신이 공유한 내용이 걱정됩니다. 즉시 누군가와 이야기하는 것이 중요합니다. 즉각적인 지원에 연결하시겠습니까?", severity: 'high', keywords: ['슬픈', '우울한', '절망적인', '외로운', '고통'] }
    ],
    followUps: [
      { content: "그것을 들으니 정말 좋습니다! 무엇이 그렇게 느끼게 도와주고 있나요?", trigger: 'positive' },
      { content: "이해합니다. 마음에 있는 것에 대해 더 말씀해 주시겠습니까?", trigger: 'neutral' },
      { content: "어려운 시기를 겪고 계신 것 같습니다. 이 일에서 혼자가 아닙니다.", trigger: 'negative' }
    ],
    offline: "현재 오프라인 상태입니다. 메시지가 저장되고 다시 연결될 때 처리됩니다.",
    disclaimer: "즉각적인 도움을 위한 AI 지원. 전문적인 치료를 대체하지 않습니다.",
    crisisMessage: "자해 생각이 있으시면 즉시 응급 서비스에 연락하거나 위기 상담 전화에 전화하세요."
  },
  ar: {
    welcome: "مرحبا! أنا مساعد الذكي MindBuddy. أنا هنا لتقديم الدعم الفوري ومساعدتك في تقييم مشاعرك. كيف حالك اليوم؟",
    responses: [
      { content: "شكرا لك على مشاركة ذلك. على مقياس من 1-9، كيف تقيم مزاجك الحالي؟", severity: 'low', keywords: ['جيد', 'بخير', 'عادي', 'هادئ'] },
      { content: "أفهم أن هذا صعب. هل تواجه هذه المشاعر لأكثر من أسبوعين؟", severity: 'medium', keywords: ['مضغوط', 'قلق', 'قلق', 'متعب', 'مرهق'] },
      { content: "ما شاركته يقلقني. من المهم أن تتحدث مع شخص ما فورا. هل تريد أن أصلك بالدعم الفوري؟", severity: 'high', keywords: ['حزين', 'مكتئب', 'يائس', 'وحيد', 'ألم'] }
    ],
    followUps: [
      { content: "من الرائع سماع ذلك! ما الذي يساعدك على الشعور بهذه الطريقة؟", trigger: 'positive' },
      { content: "أفهم. هل يمكنك إخباري المزيد عما يدور في ذهنك؟", trigger: 'neutral' },
      { content: "يبدو أنك تمر بوقت صعب. أنت لست وحدك في هذا.", trigger: 'negative' }
    ],
    offline: "أنت حاليا غير متصل. سيتم حفظ رسائلك ومعالجتها عند إعادة الاتصال.",
    disclaimer: "دعم الذكاء الاصطناعي للمساعدة الفورية. ليس بديلا عن الرعاية المهنية.",
    crisisMessage: "إذا كان لديك أفكار إيذاء النفس، يرجى الاتصال بخدمات الطوارئ فورا أو الاتصال بخط أزمة."
  },
  hi: {
    welcome: "नमस्ते! मैं आपका MindBuddy AI सहायक हूं। मैं तत्काल सहायता प्रदान करने और आपकी भावनाओं का मूल्यांकन करने में मदद करने के लिए यहां हूं। आज आप कैसे हैं?",
    responses: [
      { content: "इसे साझा करने के लिए धन्यवाद। 1-9 के पैमाने पर, आप अपने वर्तमान मूड को कैसे रेट करेंगे?", severity: 'low', keywords: ['अच्छा', 'ठीक', 'सामान्य', 'शांत'] },
      { content: "मैं समझता हूं कि यह चुनौतीपूर्ण है। क्या आप इन भावनाओं को दो सप्ताह से अधिक समय से अनुभव कर रहे हैं?", severity: 'medium', keywords: ['तनावग्रस्त', 'चिंतित', 'चिंतित', 'थका हुआ', 'अभिभूत'] },
      { content: "आपने जो साझा किया है उससे मैं चिंतित हूं। यह महत्वपूर्ण है कि आप तुरंत किसी से बात करें। क्या आप चाहेंगे कि मैं आपको तत्काल सहायता से जोड़ूं?", severity: 'high', keywords: ['उदास', 'अवसादग्रस्त', 'निराश', 'अकेला', 'दर्द'] }
    ],
    followUps: [
      { content: "यह सुनना बहुत अच्छा है! आपको इस तरह महसूस करने में क्या मदद मिल रही है?", trigger: 'positive' },
      { content: "मैं समझता हूं। क्या आप मुझे बता सकते हैं कि आपके मन में क्या चल रहा है?", trigger: 'neutral' },
      { content: "ऐसा लगता है कि आप कठिन समय से गुजर रहे हैं। इसमें आप अकेले नहीं हैं।", trigger: 'negative' }
    ],
    offline: "आप वर्तमान में ऑफलाइन हैं। आपके संदेश सहेजे जाएंगे और पुनः कनेक्ट होने पर संसाधित होंगे।",
    disclaimer: "तत्काल सहायता के लिए AI समर्थन। पेशेवर देखभाल का विकल्प नहीं।",
    crisisMessage: "यदि आपको आत्म-हानि के विचार आ रहे हैं, तो कृपया तुरंत आपातकालीन सेवाओं से संपर्क करें या संकट हेल्पलाइन पर कॉल करें।"
  },
  ru: {
    welcome: "Привет! Я ваш ИИ-помощник MindBuddy. Я здесь, чтобы оказать немедленную поддержку и помочь оценить ваши чувства. Как дела сегодня?",
    responses: [
      { content: "Спасибо, что поделились этим. По шкале от 1 до 9, как бы вы оценили свое текущее настроение?", severity: 'low', keywords: ['хорошо', 'нормально', 'обычно', 'спокойно'] },
      { content: "Я понимаю, что это сложно. Испытываете ли вы эти чувства более двух недель?", severity: 'medium', keywords: ['стресс', 'тревожный', 'беспокойный', 'усталый', 'перегруженный'] },
      { content: "То, чем вы поделились, меня беспокоит. Важно, чтобы вы немедленно поговорили с кем-то. Хотели бы вы, чтобы я соединил вас с немедленной поддержкой?", severity: 'high', keywords: ['грустный', 'подавленный', 'безнадежный', 'одинокий', 'боль'] }
    ],
    followUps: [
      { content: "Здорово это слышать! Что помогает вам так себя чувствовать?", trigger: 'positive' },
      { content: "Понимаю. Можете рассказать больше о том, что у вас на уме?", trigger: 'neutral' },
      { content: "Похоже, вы переживаете трудное время. Вы не одиноки в этом.", trigger: 'negative' }
    ],
    offline: "Вы сейчас офлайн. Ваши сообщения будут сохранены и обработаны при повторном подключении.",
    disclaimer: "ИИ-поддержка для немедленной помощи. Не заменяет профессиональный уход.",
    crisisMessage: "Если у вас есть мысли о самоповреждении, немедленно обратитесь в службу экстренной помощи или позвоните на горячую линию кризиса."
  }
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [offlineMessages, setOfflineMessages] = useState<Message[]>([]);
  const isOnline = useOnlineStatus();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: multilingualResponses[selectedLanguage]?.welcome || multilingualResponses.en.welcome,
      timestamp: new Date(),
      language: selectedLanguage
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentSeverity, setCurrentSeverity] = useState<'low' | 'medium' | 'high' | 'crisis' | null>(null);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[0].type === 'ai') {
        newMessages[0] = {
          ...newMessages[0],
          content: multilingualResponses[selectedLanguage]?.welcome || multilingualResponses.en.welcome,
          language: selectedLanguage
        };
      }
      return newMessages;
    });
  }, [selectedLanguage]);

  // Process offline messages when coming back online
  useEffect(() => {
    if (isOnline && offlineMessages.length > 0) {
      setMessages(prev => [...prev, ...offlineMessages]);
      setOfflineMessages([]);
    }
  }, [isOnline, offlineMessages]);

  const analyzeMessage = (message: string, language: string): { severity: 'low' | 'medium' | 'high' | 'crisis', sentiment: 'positive' | 'neutral' | 'negative' } => {
    const lowercaseMessage = message.toLowerCase();
    const langData = multilingualResponses[language] || multilingualResponses.en;
    
    // Crisis keywords (immediate danger)
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'no point', 'better off dead', 'hurt myself', 'suicida', 'matarme', 'mort', 'mourir', 'selbstmord', 'töten', 'suicidio', 'uccidermi', 'suicídio', 'matar-me', '自杀', '自殺', '자살', 'انتحار', 'आत्महत्या', 'самоубийство'];
    
    // High severity keywords
    const highKeywords = ['hopeless', 'worthless', 'empty', 'numb', 'desperate', 'can\'t cope', 'sin esperanza', 'desesperado', 'désespéré', 'vide', 'hoffnungslos', 'verzweifelt', 'disperato', 'vuoto', 'desesperado', 'vazio', '绝望', '空虚', '절망적', 'يائس', 'फारغ', 'безнадежный', 'отчаянный'];
    
    // Medium severity keywords  
    const mediumKeywords = ['anxious', 'stressed', 'worried', 'overwhelmed', 'tired', 'exhausted', 'ansioso', 'estresado', 'preocupado', 'anxieux', 'stressé', 'inquiet', 'ängstlich', 'gestresst', 'besorgt', 'ansioso', 'stressato', 'preoccupato', 'ansioso', 'estressado', 'preocupado', '焦虑', '压力', '担心', '불안한', '스트레스', 'قلق', 'चिंतित', 'тревожный'];
    
    // Positive keywords
    const positiveKeywords = ['good', 'great', 'happy', 'better', 'improving', 'hopeful', 'bien', 'bueno', 'feliz', 'mejor', 'bon', 'heureux', 'mieux', 'gut', 'glücklich', 'besser', 'bene', 'felice', 'meglio', 'bom', 'feliz', 'melhor', '好', '快乐', '더 나은', '행복한', 'جيد', 'سعيد', 'अच्छा', 'खुश', 'хорошо', 'счастливый'];

    let severity: 'low' | 'medium' | 'high' | 'crisis' = 'low';
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';

    // Check for crisis keywords
    if (crisisKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
      severity = 'crisis';
      sentiment = 'negative';
    }
    // Check for high severity keywords
    else if (highKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
      severity = 'high';
      sentiment = 'negative';
    }
    // Check for medium severity keywords
    else if (mediumKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
      severity = 'medium';
      sentiment = 'negative';
    }
    // Check for positive sentiment
    else if (positiveKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
      severity = 'low';
      sentiment = 'positive';
    }

    return { severity, sentiment };
  };

  const getContextualResponse = (analysis: { severity: 'low' | 'medium' | 'high' | 'crisis', sentiment: 'positive' | 'neutral' | 'negative' }, language: string): string => {
    const langData = multilingualResponses[language] || multilingualResponses.en;
    
    if (analysis.severity === 'crisis') {
      return langData.crisisMessage;
    }
    
    // Get appropriate response based on severity
    const severityResponses = langData.responses.filter(r => r.severity === analysis.severity);
    if (severityResponses.length > 0) {
      return severityResponses[Math.floor(Math.random() * severityResponses.length)].content;
    }
    
    // Fallback to follow-up based on sentiment
    const followUps = langData.followUps.filter(f => f.trigger === analysis.sentiment);
    if (followUps.length > 0) {
      return followUps[Math.floor(Math.random() * followUps.length)].content;
    }
    
    // Default fallback
    return langData.responses[0].content;
  };
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language: selectedLanguage
    };

    if (isOnline) {
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // Analyze message for intelligent response
      setTimeout(() => {
        const analysis = analyzeMessage(inputMessage, selectedLanguage);
        setCurrentSeverity(analysis.severity);

        const responseContent = getContextualResponse(analysis, selectedLanguage);

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: responseContent,
          timestamp: new Date(),
          severity: analysis.severity,
          language: selectedLanguage
        };

        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    } else {
      // Store message offline
      setOfflineMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      
      // Show offline message
      const offlineMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: multilingualResponses[selectedLanguage]?.offline || multilingualResponses.en.offline,
        timestamp: new Date(),
        language: selectedLanguage
      };
      setMessages(prev => [...prev, userMessage, offlineMessage]);
    }
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-severity-low';
      case 'medium': return 'bg-severity-medium';
      case 'high': return 'bg-severity-high';
      case 'crisis': return 'bg-severity-crisis';
      default: return 'bg-primary';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'Mild Concern';
      case 'medium': return 'Moderate Concern';
      case 'high': return 'High Concern';
      case 'crisis': return 'Crisis Level';
      default: return 'Assessment';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          variant="hero"
          size="lg"
          className="rounded-full h-14 w-14 shadow-glow animate-pulse hover:animate-none"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 transition-all duration-300 shadow-trust ${isMinimized ? 'h-16' : 'h-[500px]'}`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm">MindBuddy AI Support</CardTitle>
            <div className="flex items-center space-x-1">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              {currentSeverity && (
                <Badge variant="secondary" className={`text-xs ${getSeverityColor(currentSeverity)} text-white`}>
                  {getSeverityText(currentSeverity)}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6"
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-4 pt-0 flex flex-col h-[calc(100%-4rem)]">
            {/* Language Selector */}
            <div className="mb-3">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.content}
                    {message.severity === 'high' || message.severity === 'crisis' && (
                      <div className="mt-2 pt-2 border-t border-border/20">
                        <div className="flex items-center space-x-2 text-xs">
                          <AlertTriangle className="h-3 w-3 text-severity-high" />
                          <span className="text-severity-high">Immediate support recommended</span>
                        </div>
                        <div className="mt-1 flex space-x-1">
                          <Button variant="safety" size="sm" className="text-xs">
                            <Phone className="h-3 w-3 mr-1" />
                            Crisis Helpline
                          </Button>
                          <Button variant="trust" size="sm" className="text-xs">
                            Book Counselor
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <Input
                placeholder="Share how you're feeling..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                variant="default"
                size="icon"
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {multilingualResponses[selectedLanguage]?.disclaimer || multilingualResponses.en.disclaimer}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatWidget;