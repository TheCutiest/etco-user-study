
// ============================================================
// PART 1 — STABILITY EVALUATION (independent single-video rating)
// ============================================================
// 修改这里添加 Part 1 的样本。每个 prompt 通常对应两条记录：
// 一条 Baseline，一条 ETCO，作为两个独立的 trial 出现（不成对显示）。
// method 字段仅供内部记录/CSV 导出使用，页面不会展示给参与者。
const STABILITY_ITEMS = [
  {
    id: "baby_panda_icecream_etco",
    caseId: "baby_panda_icecream",
    prompt: "A baby panda eating ice cream",
    mediaType: "video",
    media: "assets/stable/baby panda eating icecream.mp4",
    method: "ETCO"
  },
  {
    id: "bulldog_etco",
    caseId: "bulldog",
    prompt: "A bulldo wearing a black pirate hat eating candy",
    mediaType: "video",
    media: "assets/stable/bulldog.mp4",
    method: "ETCO"
  },
  {
    id: "cat_singing_etco",
    caseId: "cat_singing",
    prompt: "A cat singing",
    mediaType: "video",
    media: "assets/stable/cat singing.mp4",
    method: "ETCO"
  },
  {
    id: "darth_vader_etco",
    caseId: "darth_vader",
    prompt: "Darth Vader with a flame thrower",
    mediaType: "video",
    media: "assets/stable/darth vader.mp4",
    method: "ETCO"
  },
  {
    id: "dog_running_etco",
    caseId: "dog_running",
    prompt: "A dog running",
    mediaType: "video",
    media: "assets/stable/dog running.mp4",
    method: "ETCO"
  },
  {
    id: "dog_skateboard_etco",
    caseId: "dog_skateboard",
    prompt: "A dog riding a skateboarding",
    mediaType: "video",
    media: "assets/stable/dog-skateboard it10000-test.mp4",
    method: "ETCO"
  },
  {
    id: "firehydrant_etco",
    caseId: "firehydrant",
    prompt: "water spraying out of a fire hydrant",
    mediaType: "video",
    media: "assets/stable/firehydrant it10000-test.mp4",
    method: "ETCO"
  },
  {
    id: "fluffy_white_cat_etco",
    caseId: "fluffy_white_cat",
    prompt: "A fluffy white cat",
    mediaType: "video",
    media: "assets/stable/flufffy white cat.mp4",
    method: "ETCO"
  },
  {
    id: "knight_etco",
    caseId: "knight",
    prompt: " A middle aged knight riding a horse walking forward",
    mediaType: "video",
    media: "assets/stable/knight.mp4",
    method: "ETCO"
  },
  {
    id: "panda_etco",
    caseId: "panda",
    prompt: "A panda",
    mediaType: "video",
    media: "assets/stable/panda.mp4",
    method: "ETCO"
  },
  {
    id: "person_kicking_ball_etco",
    caseId: "person_kicking_ball",
    prompt: "A person kicking a ball",
    mediaType: "video",
    media: "assets/stable/person kicking a ball.mp4",
    method: "ETCO"
  },
  {
    id: "person_walking_etco",
    caseId: "person_walking",
    prompt: "A person walking",
    mediaType: "video",
    media: "assets/stable/person walking.mp4",
    method: "ETCO"
  },
  {
    id: "raincoat_etco",
    caseId: "raincoat",
    prompt: "A yellow raincoat hanging on a hook",
    mediaType: "video",
    media: "assets/stable/raincoat.mp4",
    method: "ETCO"
  },
  {
    id: "space_shuttle_etco",
    caseId: "space_shuttle",
    prompt: "A space shuttle launching",
    mediaType: "video",
    media: "assets/stable/space shuttle.mp4",
    method: "ETCO"
  },
  {
    id: "superherodog_etco",
    caseId: "superherodog",
    prompt: "A superhero dog with a red cape flying in the sky",
    mediaType: "video",
    media: "assets/stable/superherodog.mp4",
    method: "ETCO"
  },
  {
    id: "swan_etco",
    caseId: "swan",
    prompt: "A white swan with golden feathers spreading its wings",
    mediaType: "video",
    media: "assets/stable/swan.mp4",
    method: "ETCO"
  },
  {
    id: "unicorn_running_etco",
    caseId: "unicorn_running",
    prompt: "A unicorn running",
    mediaType: "video",
    media: "assets/stable/unicorn running.mp4",
    method: "ETCO"
  },
  {
    id: "wooden_chair_etco",
    caseId: "wooden_chair",
    prompt: "A wooden chair with curved armrests",
    mediaType: "video",
    media: "assets/stable/wooden chair.mp4",
    method: "ETCO"
  }
];

// ============================================================
// PART 2 — PAIRWISE COMPARISON (existing study, unchanged shape)
// ============================================================
// 修改这里即可添加/替换你的真实实验样本。
// mediaType 可为 "image" 或 "video"。
// methodA / methodB 只是内部标签；页面默认不会向参与者展示方法名。
// A/B 的实际呈现顺序会在每位参与者开始 Part 2 时随机分配一次
// （见 app.js 的 buildPart2Assignment），因此这里 A 固定写 Baseline、
// B 固定写 ETCO 也没问题，不需要手工打乱。
const STUDY_ITEMS = [
  {
    id: "falling_basketball_01",
    prompt: "A falling basketball",
    mediaType: "video",
    A: "assets/baseline/DREAM4D falling basketball.mp4",
    B: "assets/ETCO/ETCO falling basketball.mp4",
    methodA: "DREAM4D",
    methodB: "ETCO"
  },
  {
    id: "cat_play_ball_01",
    prompt: "A cat playing with a basketball",
    mediaType: "video",
    A: "assets/baseline/4dfy cat-play-ball it10000-test.mp4",
    B: "assets/ETCO/ETCO cat-play-ball it10000-test.mp4",
    methodA: "4Dfy",
    methodB: "ETCO"
  },
  {
    id: "worn_basketball_01",
    prompt: "A worn basketball with texture",
    mediaType: "video",
    A: "assets/baseline/4dfy worn-basketball it10000-test.mp4",
    B: "assets/ETCO/ETCO worn-basketball it10000-test.mp4",
    methodA: "4Dfy",
    methodB: "ETCO"
  },
  {
    id: "kite_4dfy_01",
    prompt: "A kite flying in the sky",
    mediaType: "video",
    A: "assets/baseline/4dfy kite it10000-test.mp4",
    B: "assets/ETCO/ETCO(4dfy) kite it10000-test.mp4",
    methodA: "4Dfy",
    methodB: "ETCO"
  },
  {
    id: "kite_dream4d_01",
    prompt: "A kite flying in the sky",
    mediaType: "video",
    A: "assets/baseline/DREAM4D kite.mp4",
    B: "assets/ETCO/ETCO kite.mp4",
    methodA: "DREAM4D",
    methodB: "ETCO"
  },
  {
    id: "rabbit_01",
    prompt: "A fluffy white rabbit wearing a green backpack hopping across the grass",
    mediaType: "video",
    A: "assets/baseline/4dfy rabbit it10000-test.mp4",
    B: "assets/ETCO/ETCO rabbit it10000-test.mp4",
    methodA: "4Dfy",
    methodB: "ETCO"
  },
  {
    id: "teapot_01",
    prompt: "A ceramic teapot with blue floral patterns",
    mediaType: "video",
    A: "assets/baseline/DREAM4D teapot.mp4",
    B: "assets/ETCO/ETCO teapot.mp4",
    methodA: "DREAM4D",
    methodB: "ETCO"
  },
  {
    id: "building_on_fire_01",
    prompt: "A building on fire",
    mediaType: "video",
    A: "assets/baseline/building on fire.mp4",
    B: "assets/ETCO/building on fire.mp4",
    methodA: "Baseline",
    methodB: "ETCO"
  },
  {
    id: "cat_chicken_wings_01",
    prompt: "Cute smallcat seating eating chicken wings while watching a movie",
    mediaType: "video",
    A: "assets/baseline/cat eating chicken wings watching movie.mp4",
    B: "assets/ETCO/cat eating chicken wings watching movie.mp4",
    methodA: "Baseline",
    methodB: "ETCO"
  },
  {
    id: "dog_frisbee_01",
    prompt: "A dog chasing a frisbee",
    mediaType: "video",
    A: "assets/baseline/dog chasing frisbee (2).mp4",
    B: "assets/ETCO/dog chasing frisbee.mp4",
    methodA: "Baseline",
    methodB: "ETCO"
  }
];
