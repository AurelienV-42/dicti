export type Dictation = {
  id: string;
  title: string;
  content: string;
  level: number;
  grade?: number;
};

export const ID_FIRST_TEST = "1003";

export enum DictationLevel {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
}

const dictations = [
  {
    id: "1",
    title: "Au parc",
    content:
      "Ce matin, Léo et Emma vont au parc. Ils prennent un ballon et deux grands sacs de pique-nique. L’herbe est verte et le ciel est bleu. Ils jouent près d’un grand arbre. Après le jeu, ils mangent des sandwiches et boivent du jus de pomme. Léo voit un chien et il veut jouer avec. Le chien est gentil et court très vite.",
    level: DictationLevel.EASY,
  },
  {
    id: "2",
    title: "La journée de Marie",
    content:
      "Marie se lève tôt le matin. Elle mange des céréales et boit un verre de lait. À l’école, elle apprend beaucoup de choses. Elle aime surtout dessiner et lire. Son livre préféré parle d’animaux et de forêts. Après l’école, elle aide sa maman à faire les courses. Elles achètent des fruits, des légumes et du pain.",
    level: DictationLevel.EASY,
  },
  {
    id: "3",
    title: "En vacances",
    content:
      "La famille Dupont est en vacances à la mer. Ils ont une petite maison près de la plage. Chaque jour, ils se baignent et construisent des châteaux de sable. Le soir, ils regardent le soleil se coucher. Paul et Julie trouvent des coquillages sur le sable. Ils en collectent pour décorer la maison.",
    level: DictationLevel.EASY,
  },
  {
    id: "4",
    title: "Les animaux de la ferme",
    content:
      "Dans la ferme de mon oncle, il y a beaucoup d’animaux. Chaque matin, je me lève tôt pour les nourrir. Les poules picorent des grains, les vaches broutent l’herbe verte, et les moutons courent dans les prés. Mon animal préféré est le cheval. Il est grand, fort et aime galoper autour du champ. Le soir, nous ramenons tous les animaux à l’étable pour la nuit.",
    level: DictationLevel.EASY,
  },

  {
    id: "5",
    title: "Une journée à la plage",
    content:
      "Ce week-end, ma famille et moi sommes allés à la plage. Le soleil brillait fort et le sable était chaud sous nos pieds. Mon petit frère a construit un château de sable avec un grand fossé tout autour. Nous avons aussi ramassé des coquillages et joué au ballon dans les vagues. Quand la mer est devenue trop froide, nous avons mangé une glace avant de rentrer à la maison.",
    level: DictationLevel.EASY,
  },

  {
    id: "6",
    title: "La rentrée des classes",
    content:
      "Le jour de la rentrée, j’étais un peu nerveux mais aussi très excité. J’ai préparé mon cartable avec soin, en mettant mes nouveaux cahiers et mes crayons bien taillés. En arrivant à l’école, j’ai retrouvé mes amis dans la cour. Notre nouvelle maîtresse nous a accueillis avec un grand sourire. Elle nous a montré la salle de classe et expliqué ce que nous allions apprendre cette année.",
    level: DictationLevel.EASY,
  },
  {
    id: "1001",
    title: "La danse",
    content:
      "La danse classique est réputée pour sa précision et son élégance. Alex, qui est passionné de danse depuis l’enfance, assiste régulièrement aux cours proposés par l’école locale. Le rêve d’Alex est de pouvoir un jour danser sur les scènes internationales, interprétant des pièces qui traversent les cultures et les époques. Chaque entraînement est une occasion de se rapprocher de cet objectif, sous l’œil expert de son professeur, qui pousse chaque élève à trouver et exprimer sa propre interprétation artistique.",
    level: DictationLevel.MEDIUM,
  },
  {
    id: "1002",
    title: "Le jeu vidéo",
    content:
      "Les jeux vidéo attirent des joueurs de tous horizons et offrent un échappatoire où chacun peut devenir le héros de sa propre aventure. Jordan, qui adore les défis, utilise chaque instant de son temps libre pour maîtriser des jeux de rôle qui demandent réflexion et rapidité. Avec ses amis, Jordan partage cette passion et envisage de monter un club à l’école pour initier d’autres élèves à cet univers, enrichissant ainsi la vie sociale et ludique de l’établissement.",
    level: DictationLevel.MEDIUM,
  },
  {
    id: "1003",
    title: "Le basketball",
    content:
      "Le basketball est un sport qui exige vitesse et coordination, pratiqué avec enthousiasme par l’équipe du collège. Sam, qui en est un membre assidu, s’investit pleinement dans l’amélioration de ses compétences. L’entraîneur de l’équipe met un point d’honneur à cultiver l’esprit d’équipe et à encourager la persévérance chez ses joueurs. Un match récent a vu Sam réaliser un tir décisif, assurant une victoire mémorable pour l’équipe, un moment de célébration collective marquant une saison réussie.",
    level: DictationLevel.MEDIUM,
  },
  {
    id: "1004",
    title: "Les voyages scolaires",
    content:
      "Les voyages scolaires sont des moments privilégiés pour découvrir de nouveaux horizons et renforcer la cohésion de groupe. Que ce soit une visite d’un musée, une sortie en pleine nature, ou un séjour dans une ville étrangère, ces expériences enrichissent les connaissances des élèves et les ouvrent à d’autres cultures. En voyage scolaire, les élèves apprennent aussi à se responsabiliser et à vivre ensemble dans un cadre différent de celui de l’école.",
    level: DictationLevel.MEDIUM,
  },
  {
    id: "1005",
    title: "Les énergies renouvelables",
    content:
      "Les énergies renouvelables jouent un rôle crucial dans la lutte contre le changement climatique. Contrairement aux énergies fossiles, les énergies renouvelables, comme l’énergie solaire, éolienne ou hydraulique, ne produisent pas de gaz à effet de serre. De plus en plus de pays investissent dans ces technologies pour réduire leur dépendance aux énergies polluantes et protéger l’environnement. Il est essentiel que chacun prenne conscience de l’importance de ces énergies pour l’avenir de notre planète.",
    level: DictationLevel.MEDIUM,
  },
  {
    id: "1006",
    title: "Le sport en équipe",
    content:
      "Le sport en équipe est une activité très enrichissante pour les adolescents. Participer à un sport collectif, comme le football, le basketball ou le volleyball, permet de développer des compétences importantes comme l’esprit d’équipe, la communication et la persévérance. Ces sports favorisent également l’entraide et la solidarité entre les joueurs. En pratiquant régulièrement un sport, on améliore sa condition physique tout en renforçant les liens d’amitié.",
    level: DictationLevel.MEDIUM,
  },
  {
    id: "100001",
    title: "Les réseaux sociaux",
    content:
      "Les réseaux sociaux ont révolutionné notre manière de communiquer et d’interagir. En classe, le professeur explique l’impact de ces plateformes sur la société moderne. Les élèves discutent des avantages, comme la facilité de rester en contact avec des amis du monde entier, et des inconvénients, tels que les questions de vie privée. Le débat porte aussi sur le rôle des médias sociaux dans les mouvements sociaux, illustrant leur pouvoir en tant qu’outils de mobilisation et de changement.",
    level: DictationLevel.HARD,
  },
  {
    id: "100002",
    title: "Voyage dans l’espace",
    content:
      "L’exploration spatiale continue de captiver l’imagination collective. Le lycée organise une conférence sur les dernières avancées en matière de voyages interplanétaires. Un ingénieur aérospatial est invité pour parler des projets de colonisation de Mars et des défis technologiques associés. Les élèves apprennent sur les innovations en propulsion spatiale et l’importance de la durabilité dans les habitats extraterrestres. Cette présentation soulève des questions sur l’avenir de l’humanité et notre place dans l’univers.",
    level: DictationLevel.HARD,
  },
  {
    id: "100003",
    title: "Développement durable",
    content:
      "Le développement durable est devenu un enjeu crucial pour notre génération. Le cours de géographie aborde les pratiques écologiques et leur importance pour préserver la planète. Les élèves étudient divers cas où des communautés ont réussi à intégrer l’économie verte dans leur développement. Le professeur souligne la nécessité de repenser nos modes de vie et de consommation. Une visite est prévue à une installation solaire locale pour observer comment l’énergie renouvelable est produite et utilisée efficacement.",
    level: DictationLevel.HARD,
  },
  {
    id: "100004",
    title: "L'identité numérique",
    content:
      "Les réseaux sociaux jouent un rôle important dans la construction de l’identité numérique des adolescents. Chaque photo postée, chaque commentaire laissé contribue à façonner l’image que l’on donne de soi en ligne. Il est donc essentiel d’être conscient des conséquences de ses actions sur internet. Publier des contenus respectueux et se protéger contre les intrusions dans sa vie privée sont des pratiques indispensables pour préserver une image positive sur les réseaux.",
    level: DictationLevel.HARD,
  },
  {
    id: "100005",
    title: "La liberté d’expression",
    content:
      "La liberté d’expression est un droit fondamental dans de nombreuses démocraties à travers le monde. Elle permet à chacun d’exprimer ses idées, ses opinions et ses croyances sans craindre la censure. Cependant, ce droit n’est pas absolu. Il doit être exercé dans le respect des autres et de la loi. Par exemple, les discours de haine, les fausses informations et les atteintes à la vie privée peuvent être limités pour protéger l’ordre public et les droits d’autrui. Comprendre les enjeux de la liberté d’expression est crucial pour participer pleinement à la vie citoyenne.",
    level: DictationLevel.HARD,
  },
  {
    id: "100005",
    title: "L’engagement citoyen",
    content:
      "L’engagement citoyen prend de nombreuses formes, de la participation aux élections à l’implication dans des associations ou des mouvements sociaux. Au lycée, les élèves commencent à prendre conscience de leur rôle dans la société et de l’importance de défendre leurs convictions. Que ce soit pour la protection de l’environnement, les droits humains, ou l’égalité des chances, chaque action compte. S’engager, c’est aussi apprendre à débattre, à argumenter, et à coopérer pour construire un avenir commun. Les jeunes sont souvent à l’avant-garde des changements sociaux, et leur voix est cruciale pour façonner le monde de demain.",
    level: DictationLevel.HARD,
  },
];

export default dictations;
