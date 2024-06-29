export type Dictation = {
  title: string;
  content: string;
  level: number;
};

const dictations = [
  {
    title: "Le lièvre et la tortue",
    content:
      'Le lièvre et la tortue sont deux animaux très différents. Le lièvre est rapide et la tortue est lente. Un jour, le lièvre se moque de la tortue. Il lui dit : "Tu es tellement lente que je pourrais faire la sieste et te battre à la course." La tortue répond : "Je suis peut-être lente, mais je suis sûre de gagner." Le lièvre et la tortue décident de faire une course. Le lièvre part en courant très vite. Il est tellement sûr de gagner qu’il s’arrête pour faire une sieste. Pendant ce temps, la tortue continue à avancer lentement. Elle ne s’arrête pas. Quand le lièvre se réveille, il voit la tortue près de la ligne d’arrivée. Il court aussi vite qu’il peut, mais il est trop tard. La tortue a gagné la course. Le lièvre est très surpris. Il apprend que la lenteur peut être une force.',
    level: 1,
  },
  {
    title: "La cigale et la fourmi",
    content:
      'La cigale chante tout l’été. Elle ne pense pas à l’hiver. Elle ne travaille pas. Elle se moque de la fourmi qui travaille dur. La fourmi ramasse des grains de blé. Elle les met dans sa maison. Elle est prête pour l’hiver. Quand l’hiver arrive, la cigale a faim. Elle n’a pas de nourriture. Elle va voir la fourmi. Elle lui demande de la nourriture. La fourmi répond : "Tu as chanté tout l’été. Tu as moqué mon travail. Maintenant, tu as faim. Je ne peux pas t’aider." La cigale apprend que le travail est important.',
    level: 1,
  },
  {
    title: "Le petit ourson",
    content:
      "Un petit ourson se promène dans la forêt. Il est très curieux. Il veut tout voir. Il veut tout toucher. Il veut tout goûter. Il veut tout sentir. Un jour, il trouve un pot de miel. Il est très content. Il aime le miel. Il mange tout le miel. Il est très fatigué. Il s’endort. Quand il se réveille, il est perdu. Il ne sait plus où il est. Il pleure. Sa maman l’entend. Elle arrive. Elle le prend dans ses bras. Elle le ramène à la maison. L’ourson est très content. Il apprend que la curiosité peut être dangereuse.",
    level: 1,
  },
  {
    title: "Le corbeau et le renard",
    content:
      'Un corbeau a un morceau de fromage dans son bec. Il est perché sur un arbre. Un renard le voit. Il veut manger le fromage. Il dit au corbeau : "Bonjour, monsieur le corbeau. Tu es très beau. Tu as de belles plumes. Tu as l’air très intelligent. Tu as un beau morceau de fromage. Je suis sûr que tu chantes très bien." Le corbeau est flatté. Il ouvre le bec pour chanter. Le fromage tombe. Le renard le rattrape. Il mange le fromage. Le corbeau est triste. Il apprend que la flatterie peut être trompeuse.',
    level: 1,
  },
  {
    title: "Le loup et l’agneau",
    content:
      'Un loup et un agneau boivent à la même rivière. Le loup veut manger l’agneau. Il cherche une raison. Il dit : "Tu as sali l’eau que je bois." L’agneau répond : "Je suis plus bas que toi. Je ne peux pas salir ton eau." Le loup dit : "Tu as insulté mon père l’année dernière." L’agneau répond : "Je ne suis pas né l’année dernière." Le loup dit : "Alors, c’est ton frère." L’agneau répond : "Je n’ai pas de frère." Le loup est en colère. Il mange l’agneau. Il apprend que la mauvaise foi peut être dangereuse.',
    level: 1,
  },
  {
    title: "Le petit chaperon rouge",
    content:
      'Le petit chaperon rouge est une petite fille. Elle porte un chaperon rouge. Elle va voir sa grand-mère. Elle lui apporte une galette et un petit pot de beurre. Elle rencontre un loup. Le loup veut manger le petit chaperon rouge. Il lui demande où elle va. Elle répond : "Je vais voir ma grand-mère." Le loup part en courant. Il arrive chez la grand-mère avant le petit chaperon rouge. Il mange la grand-mère. Il se déguise avec ses vêtements. Quand le petit chaperon rouge arrive, elle ne reconnaît pas le loup. Elle lui dit : "Grand-mère, que tu as de grands yeux !" Le loup répond : "C’est pour mieux te voir." Elle lui dit : "Grand-mère, que tu as de grandes oreilles !" Le loup répond : "C’est pour mieux t’entendre." Elle lui dit : "Grand-mère, que tu as de grandes dents !" Le loup répond : "C’est pour mieux te manger." Le petit chaperon rouge crie. Un chasseur arrive. Il tue le loup. Le petit chaperon rouge apprend que la méfiance est importante.',
    level: 2,
  },
  {
    title: "Le chat botté",
    content:
      'Un meunier meurt. Il laisse à son fils un moulin, un âne et un chat. Le fils est triste. Il n’aime pas le chat. Il veut le tuer. Le chat lui dit : "Ne me tue pas. Je vais te rendre riche." Le fils accepte. Le chat part. Il attrape un lapin. Il va voir le roi. Il lui dit : "Mon maître, le marquis de Carabas, m’a envoyé vous offrir ce lapin." Le roi est content. Le chat attrape un faisan. Il va voir le roi. Il lui dit : "Mon maître, le marquis de Carabas, m’a envoyé vous offrir ce faisan." Le roi est content. Le chat attrape un cerf. Il va voir le roi. Il lui dit : "Mon maître, le marquis de Carabas, m’a envoyé vous offrir ce cerf." Le roi est content. Le chat attrape un ogre. Il lui dit : "Viens te baigner avec moi." L’ogre se noie. Le chat devient le marquis de Carabas. Le fils est riche. Il apprend que la ruse peut être utile.',
    level: 3,
  },
  {
    title: "Le vilain petit canard",
    content:
      "Un canard est né. Il est différent de ses frères et sœurs. Il est plus grand. Il est plus laid. Il est rejeté par sa famille. Il est rejeté par les autres animaux. Il est rejeté par les humains. Il est triste. Il part. Il marche longtemps. Il arrive dans une ferme. Il est accueilli par une vieille dame. Il grandit. Il devient un cygne. Il est beau. Il est heureux. Il retrouve des cygnes. Il apprend qu’il est un cygne. Il apprend que la différence peut être une force.",
    level: 3,
  },
  {
    title: "Le petit poucet",
    content:
      "Un bûcheron est pauvre. Il a sept enfants. Il ne peut pas les nourrir. Il les abandonne dans la forêt. Les enfants marchent longtemps. Ils ont peur. Ils ont faim. Ils trouvent une maison en pain d’épice. Ils mangent la maison. Une sorcière arrive. Elle veut les manger. Le petit poucet lui donne des cailloux. Il lui donne des coquilles d’escargot. Il lui donne des os de poulet. La sorcière est aveugle. Elle ne peut pas les manger. Les enfants partent. Ils trouvent leur maison. Le bûcheron est content. Il apprend que la ruse peut être utile.",
    level: 3,
  },
  {
    title: "Le roi grenouille",
    content:
      "Un roi est transformé en grenouille. Il est triste. Il veut redevenir un roi. Une princesse le trouve. Elle le prend. Elle le jette contre un mur. Il redevient un roi. Il est content. Il veut épouser la princesse. Elle ne veut pas. Il insiste. Elle accepte. Il apprend que la patience peut être utile.",
    level: 3,
  },
  {
    title: "Le petit bonhomme de pain d'épice",
    content:
      "Une vieille dame fait un bonhomme de pain d’épice. Il prend vie. Il s’enfuit. Il court. Il rencontre un fermier. Il veut le manger. Le fermier le poursuit. Il court. Il rencontre une fermière. Il veut la manger. La fermière le poursuit. Il court. Il rencontre un renard. Il veut le manger. Le renard le mange. Il apprend que la gourmandise peut être dangereuse.",
    level: 3,
  },
  {
    title: "Le petit prince",
    content:
      'Un petit prince vit sur une planète. Il est seul. Il est triste. Il veut voir d’autres planètes. Il part. Il arrive sur la Terre. Il rencontre un renard. Le renard lui dit : "Tu es seul. Tu es triste. Tu veux voir d’autres planètes. Tu dois apprivoiser les humains." Le petit prince apprivoise un pilote. Il apprivoise un roi. Il apprivoise un vaniteux. Il apprivoise un buveur. Il apprivoise un allumeur de réverbères. Il apprivoise un marchand. Il apprivoise un géographe. Il apprivoise une rose. Il apprivoise un renard. Il apprend que l’amitié est importante.',
    level: 3,
  },
  {
    title: "Le chat et la souris",
    content:
      'Un chat et une souris sont amis. Ils vivent dans une maison. Ils sont heureux. Un jour, la souris est malade. Le chat va voir le médecin. Il lui dit : "Ma souris est malade. Pouvez-vous la soigner ?" Le médecin répond : "Je ne soigne pas les souris. Je soigne les chats." Le chat est triste. Il part. Il revient avec une souris. Il dit : "Voici ma souris. Pouvez-vous la soigner ?" Le médecin répond : "Je ne soigne pas les souris. Je soigne les chats." Le chat est surpris. Il apprend que la ruse peut être utile.',
    level: 3,
  },
  {
    title: "Le loup et le chien",
    content:
      'Un loup et un chien sont amis. Le loup est sauvage. Le chien est domestiqué. Le loup est libre. Le chien est attaché. Le loup est fier. Le chien est soumis. Un jour, le loup dit au chien : "Tu es soumis. Tu es attaché. Tu es domestiqué. Tu es faible." Le chien répond : "Je suis soumis. Je suis attaché. Je suis domestiqué. Je suis fort." Le loup est surpris. Il apprend que la liberté peut être dangereuse.',
    level: 3,
  },
];

export default dictations;
