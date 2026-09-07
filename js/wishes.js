const WISHES = {
  id: [
    {
      // pernyataan reflektif (bukan pertanyaan), 3 paragraf
      paragraphs: [
        "Ada banyak hal yang mungkin pengen kamu minta hari ini, {name}, entah itu ketenangan, keberanian buat mulai sesuatu yang baru, atau sekadar waktu buat napas sejenak dari semua yang numpuk. Apapun itu, hari ini emang harinya kamu buat berharap sebebas-bebasnya, tanpa perlu mikirin dulu masuk akal atau enggaknya.",
        "Setahun belakangan pasti ada bagian yang berat, ada juga bagian yang bikin kamu ketawa sampe lupa capek. Semua itu numpuk jadi satu cerita yang cuma kamu yang tau detailnya, lengkap dengan bagian-bagian yang mungkin gak pernah kamu certain ke siapa pun. Dari situ kamu keluar sebagai versi diri yang lebih paham gimana caranya bertahan sekaligus tetap waras, dan itu bukan pencapaian kecil, walau kadang gak ada yang bilang secara langsung.",
        "Jadi selain ngucapin selamat ulang tahun, {name}, aku juga mau bilang: semoga tahun ini kamu lebih sering dengerin apa yang sebenernya kamu mau, bukan cuma apa yang kelihatan aman. Semoga rezeki lancar, badan sehat, pikiran tenang, dan orang-orang di sekitarmu adalah orang-orang yang bikin kamu pengen pulang, bukan yang bikin kamu pengen ngilang."
      ]
    },
    {
      // ajakan membayangkan (bukan pertanyaan), 5 paragraf
      paragraphs: [
        "{name}, coba bayangin diri kamu setahun lalu, tepat di hari yang sama kayak sekarang. Ada banyak hal yang mungkin belum kebayang bakal terjadi, ada juga rencana yang akhirnya berubah arah sepenuhnya.",
        "Sekarang kamu ada di titik yang mungkin beda banget dari yang kamu bayangin waktu itu. Entah lebih baik, entah masih proses, tapi yang pasti kamu udah jalan sejauh ini, ngelewatin hal-hal yang dulu kelihatannya berat banget buat dihadapin sendirian.",
        "Dan itu cukup buat dirayain.",
        "Semoga ke depannya kamu makin berani milih hal-hal yang bikin kamu tenang, bukan cuma yang keliatan benar di mata orang lain. Semoga kamu juga makin percaya kalau caramu ngejalanin hidup sejauh ini, dengan segala kekurangannya, tetap layak dibanggain.",
        "Selamat ulang tahun, {name}. Semoga tahun ini nyaman buat ditinggalin, dan seru buat dijalanin."
      ]
    },
    {
      // gaya buka: menyatakan harinya, pujian dulu baru harapan, 4 paragraf
      paragraphs: [
        "Hari ini kalender cuma nunjukkin tanggal biasa buat orang lain, tapi buat orang-orang yang sayang sama kamu, ini hari yang ditandain khusus, {name}, hari yang mereka tunggu buat bisa bilang langsung ke kamu betapa berartinya kamu buat mereka.",
        "Aku cuma mau kamu tau kalo kamu itu orang yang, tanpa perlu diminta, sering jadi tempat orang lain cerita, tempat orang lain ngerasa didengerin, dan tempat orang lain pulang kalau lagi capek sama dunia. Kebaikan semacam itu gampang diabaikan sama orang yang ngasihnya sendiri, padahal itu hal yang bikin hidup orang lain jauh lebih ringan, bahkan di hari-hari yang mereka sendiri gak sadar lagi butuh itu.",
        "Semoga tahun ini giliran kamu yang dijagain sama semesta. Giliran kamu yang dikasih ruang buat capek, buat gak baik-baik aja, tanpa harus jelasin panjang lebar ke siapa pun, dan tanpa harus ngerasa bersalah karenanya.",
        "Met ulang tahun ya, {name}. Semoga umur baru ini membawa lebih banyak hal yang bikin kamu bilang, 'ini definisi bahagia versi aku.'"
      ]
    },
    {
      // gaya: harapan (list "semoga") duluan, baru ucapan, 3 paragraf
      paragraphs: [
        "Semoga tahun ini pintu-pintu yang selama ini susah kebuka buat kamu, pelan-pelan mulai kegeser. Semoga rezeki datang dari arah yang kadang gak kepikiran sebelumnya. Semoga capek kamu selalu diganti sama hasil yang sepadan, atau bahkan lebih dari yang kamu bayangin.",
        "Itu dulu ya harapannya, {name}, sebelum aku bilang selamat ulang tahun. Soalnya kamu udah cukup sering nunggu, cukup sering sabar, cukup sering ngalah buat hal-hal yang sebenarnya berat, dan sekarang giliran semesta yang gantian gerak buat kamu.",
        "Selamat ulang tahun. Semoga hari ini kamu ngerasa dicintai tanpa harus minta, dan semoga umur barumu jauh lebih ringan dari yang sebelumnya, dengan lebih sedikit hal yang perlu kamu pikul sendirian."
      ]
    },
    {
      // gaya: pujian di awal, 1 baris penekanan super pendek di tengah, 4 paragraf
      paragraphs: [
        "Dari sekian banyak hal baik yang bisa diomongin soal kamu, {name}, yang paling kerasa itu caramu nganggep orang lain penting, padahal kamu sendiri jarang ngasih ruang buat diri sendiri diperlakukan sama, seolah kebutuhanmu sendiri selalu bisa nunggu giliran paling belakang.",
        "Itu yang bikin kamu spesial.",
        "Semoga tahun ini kamu belajar buat gak selalu jadi yang paling belakangan diprioritasin, termasuk sama diri kamu sendiri. Semoga makin banyak orang yang ngebales kebaikanmu tanpa kamu harus minta duluan, dan semoga makin banyak momen kecil yang bikin kamu sadar kalau kamu juga berhak bahagia tanpa syarat, tanpa harus nunggu ngebuktiin apa-apa dulu.",
        "Happy birthday, {name}. Semoga tahun ini jadi bukti kalau semesta juga inget buat balas budi sama orang baik kayak kamu."
      ]
    },
    {
      // gaya: paragraf panjang-panjang, narasi, 3 paragraf
      paragraphs: [
        "Ada orang yang ulang tahunnya berasa biasa aja, dan ada yang harinya emang pantas dirayain rame-rame, {name}, dan kamu masuk kategori yang kedua. Bukan karena kamu minta perhatian, tapi karena kehadiran kamu emang ninggalin bekas yang baik ke orang-orang di sekitarmu, entah lewat cara kamu dengerin, cara kamu becanda di waktu yang pas, atau cara kamu tetep muncul walau lagi capek sendiri, tanpa pernah bikin itu keliatan kayak beban.",
        "Aku cuma mau kamu tau kalo kamu itu orang yang gak gampang nyerah, {name}, walau capeknya kadang gak keliatan dari luar. Setahun ini mungkin gak selalu sesuai rencana, tapi kamu tetap di sini, masih berjuang, masih peduli, masih berusaha jadi versi yang lebih baik dari kemarin. Itu udah cukup buat dibanggain, bahkan kalau kamu sendiri belum ngerasa begitu.",
        "Selamat ulang tahun, {name}. Semoga tahun barumu dipenuhi hal-hal yang bikin kamu yakin, kalau usaha kamu selama ini emang gak sia-sia, dan kalau capek yang kamu tanggung diam-diam itu, akhirnya kebayar juga."
      ]
    },
    {
      // gaya: metafora perjalanan, 4 paragraf
      paragraphs: [
        "Kalau setahun terakhir ini diibaratkan sebuah perjalanan, {name}, mungkin bukan jalan tol yang mulus, tapi lebih ke jalan setapak yang kadang nanjak, kadang becek, kadang bikin kamu pengen berhenti di tengah jalan, tapi pemandangannya tetap ada yang bikin kamu berhenti sejenak buat kagum.",
        "Dan kamu tetap jalan. Itu poinnya.",
        "Semoga di tahun baru ini jalannya sedikit lebih rata, temannya lebih banyak yang bisa dipegang tangannya, dan tujuannya makin kelihatan jelas walau masih jauh, tanpa harus kamu tempuh sendirian kayak sebelumnya.",
        "Met ulang tahun, {name}. Semoga langkah-langkah selanjutnya kerasa lebih ringan, dan semoga kamu makin percaya kalau arah yang kamu pilih itu gak salah."
      ]
    },
    {
      // gaya: kontras panjang-pendek ekstrem, 4 paragraf
      paragraphs: [
        "Met ulang tahun, {name}.",
        "Aku gak akan bilang tahun ini harus jadi tahun terbaik dalam hidup kamu, soalnya rasanya berat buat janji sesuatu yang di luar kendali siapa pun. Tapi aku berharap tahun ini kamu ngerasa lebih didengerin, lebih dipahami, dan lebih jarang harus jelasin diri sendiri berkali-kali ke orang yang sebenarnya gak berusaha ngerti dari awal. Semoga kamu juga lebih sering ngasih diri sendiri kesempatan buat istirahat tanpa ngerasa bersalah karenanya, dan lebih jarang mikir kalau kebahagiaanmu itu urusan nomor sekian.",
        "Semoga sehat, semoga cukup, semoga tenang.",
        "Itu aja doanya. Semoga cukup buat bikin harimu spesial."
      ]
    },
    {
      // gaya: retorika soal nambah umur, penutup santai
      paragraphs: [
        "Katanya makin nambah umur itu identik sama makin banyak beban, tapi menurutku enggak selalu gitu, {name}. Kadang nambah umur itu ya nambah juga jam terbang buat ngerti diri sendiri, nambah kesabaran buat hadepin hal-hal yang dulu gampang bikin panik, dan nambah kemampuan buat milih mana yang worth diperjuangin, mana yang cukup dilepas aja tanpa perlu ngerasa gagal karenanya.",
        "Semoga umur baru kamu ini nambahin semua hal baik itu, plus dikit-dikit rezeki lebih, plus circle yang makin sehat buat ditinggalin lama, plus lebih banyak alasan buat percaya kalau kamu ada di jalur yang benar.",
        "Udah gitu aja sih. Happy birthday, semoga tahun ini asik buat dijalanin, {name}."
      ]
    },
    {
      // gaya buka: obrolan santai, bukan "selamat ulang tahun" di awal
      paragraphs: [
        "Woilah, gak kerasa udah muter setahun lagi aja ya, {name}. Rasanya baru kemarin kita ngomongin rencana buat tahun ini, eh sekarang udah nyampe di titik ini lagi, lengkap sama segala hal yang kejadian di antara dua titik itu.",
        "Tapi justru itu yang keren, waktu emang jalan terus, dan kamu jalan bareng dia, ngelewatin apa pun yang dilempar ke arahmu tahun ini.",
        "Semoga tahun depan lebih banyak momen santai, lebih dikit drama yang gak perlu, dan lebih banyak alasan buat ketawa lepas tanpa mikirin apa-apa, termasuk hal-hal kecil yang kadang justru paling berkesan.",
        "Selamat nambah umur, {name}! Semoga makin oke dari hari ke hari."
      ]
    },
    {
      // gaya surat, 5 paragraf, ada "tanda tangan" di akhir
      paragraphs: [
        "Untuk {name}, di hari spesial ini.",
        "Aku pengen bilang makasih, walau kamu mungkin gak pernah minta diucapin makasih buat hal-hal kecil yang kamu lakuin. Tapi caramu perhatian ke orang lain, caramu inget hal-hal detail tentang orang yang kamu sayang, itu semua kerasa, dan itu semua berarti lebih dari yang kamu kira, bahkan buat orang-orang yang mungkin belum pernah bilang langsung ke kamu.",
        "Semoga tahun ini gantian kamu yang diperhatiin sedetail itu sama orang-orang di sekitarmu.",
        "Semoga kerja kerasmu berbuah manis, semoga kesehatanmu terjaga, dan semoga kamu selalu punya alasan buat percaya kalau hidup ini, walau kadang berat, tetap layak dijalanin dengan penuh harapan, satu langkah demi satu langkah.",
        "Selamat ulang tahun. Dengan sayang, dari orang-orang yang selalu dukung kamu."
      ]
    },
    {
      // penutup gak biasa, pernyataan harapan (bukan pertanyaan balik), 3 paragraf
      paragraphs: [
        "Selamat ulang tahun, {name}. Semoga hari ini kerasa ringan, semoga kamu dikelilingi orang-orang yang bikin kamu ketawa tanpa harus dipaksa, dan semoga gak ada satu pun momen hari ini yang bikin kamu ngerasa sendirian.",
        "Setahun ke depan bakal ada banyak hal yang belum ketauan, dan itu wajar bikin campur aduk, antara excited sama sedikit was-was. Tapi semoga kamu inget, kamu udah berhasil lewatin banyak hal yang dulu kamu pikir gak bakal sanggup, jadi tahun ini pun, insyaAllah, kamu tetap sanggup, bahkan buat hal-hal yang sekarang masih kerasa jauh dari jangkauan.",
        "Semoga di umur baru ini, satu per satu hal yang selama ini cuma jadi harapan diam-diam, pelan-pelan mulai nemuin jalannya buat jadi kenyataan. Dan semoga semesta ikut bantu kamu ngejarnya, di setiap langkah yang kamu ambil."
      ]
    },
    {
      // gaya: afirmasi langsung, gak basa-basi, 4 paragraf
      paragraphs: [
        "Aku cuma mau kamu tau kalo kamu itu orang yang tulus, {name}. Bukan tulus yang dibuat-buat biar keliatan baik, tapi tulus yang emang keliatan dari cara kamu perlakuin orang lain walau lagi gak ada yang merhatiin, walau gak ada yang bakal tau atau muji.",
        "Kamu juga orang yang kuat, bukan yang gak pernah jatuh, tapi yang selalu berhasil bangun lagi walau kadang butuh waktu lebih lama dari yang keliatan, dan walau prosesnya gak selalu semulus yang orang lain bayangin.",
        "Dan kamu orang yang layak disayang, bukan karena kamu sempurna, tapi karena kamu terus berusaha jadi lebih baik tanpa kehilangan siapa diri kamu sebenarnya.",
        "Itu aja yang mau aku sampein hari ini. Selamat ulang tahun, {name}. Semoga kamu selalu inget hal-hal ini, bahkan di hari-hari kamu lupa sendiri."
      ]
    }
  ],
  en: [
    {
      // reflective statement (not a question), 3 paragraphs
      paragraphs: [
        "There's probably a lot you could wish for today, {name}, whether it's peace of mind, the courage to start something new, or simply a little room to breathe after everything that's been piling up. Whatever it is, today is exactly the kind of day where you're allowed to want things freely, without worrying whether they make perfect sense.",
        "This past year probably had its share of heavy days, along with plenty of moments that made you laugh until you forgot how tired you were. All of it adds up to a story only you know the full details of, including the parts you may never have told anyone. Somewhere along the way you came out the other side a little steadier, a little wiser about how to keep going without losing yourself, and that's not a small thing, even if no one's said it to you directly.",
        "So beyond just wishing you a happy birthday, {name}, I hope this year you start listening more to what you actually want, not just what looks safe. I hope things go well for you, your health holds steady, your mind stays calm, and the people around you are the kind who make you want to come home, not the kind who make you want to disappear."
      ]
    },
    {
      // invitation to picture the past (not a question), 5 paragraphs
      paragraphs: [
        "{name}, picture yourself exactly a year ago, on this same day. There was probably a lot you couldn't have predicted back then, and plenty of plans that ended up taking a completely different turn.",
        "You're likely in a completely different place now than you imagined you'd be. Better in some ways, still figuring it out in others, but either way, you made it this far, through things that once felt impossible to face alone.",
        "And that's worth celebrating.",
        "I hope going forward you get braver about choosing what actually brings you peace, not just what looks right to everyone else. I hope you also start believing that the way you've made it through so far, imperfections and all, is still something worth being proud of.",
        "Happy birthday, {name}. May this year be comfortable to live through and fun to look back on."
      ]
    },
    {
      // declares the day, praise first then wishes, 4 paragraphs
      paragraphs: [
        "For most people today is just another date on the calendar, but for the people who care about you, {name}, it's marked a little differently, a day they've been waiting for so they can finally tell you how much you mean to them.",
        "I just want you to know that you're the kind of person who, without ever being asked, becomes the one others open up to, the one who makes people feel truly heard, the one people come home to when the world feels like too much. That kind of kindness is easy to overlook when you're the one giving it, even though it makes everyone else's life noticeably lighter, even on days they don't realize they needed it.",
        "I hope this year it's finally your turn to be looked after like that. Your turn to have room to be tired, to not be okay sometimes, without having to explain yourself to anyone, and without feeling guilty about it.",
        "Happy birthday, {name}. May this new year bring you more moments that make you think, this is exactly what happiness feels like."
      ]
    },
    {
      // wishes come first, birthday greeting second, 3 paragraphs
      paragraphs: [
        "May the doors that have been hard to open for you slowly start to give way this year. May good fortune arrive from directions you never expected. May every bit of your hard work come back to you in equal measure, or more than you ever imagined.",
        "That's the wish list first, {name}, before I even say happy birthday. You've waited long enough, been patient long enough, given in on enough things that actually mattered, so now it's the universe's turn to move for you.",
        "Happy birthday. May you feel loved today without having to ask for it, and may this new year of yours feel a whole lot lighter than the last, with less for you to carry alone."
      ]
    },
    {
      // compliment first, short emphasis line mid-way, longer close, 4 paragraphs
      paragraphs: [
        "Out of everything good that could be said about you, {name}, the thing that stands out most is how naturally you make other people feel like they matter, even though you rarely give yourself that same kind of care, as if your own needs could always wait their turn.",
        "That's what makes you special.",
        "I hope this year you stop being the last one on your own list of priorities. I hope more people return your kindness without you having to ask first, and I hope more small moments remind you that you're allowed to be happy without earning it first.",
        "Happy birthday, {name}. May this year prove that the universe remembers to repay good people too."
      ]
    },
    {
      // longer narrative paragraphs, 3 total
      paragraphs: [
        "Some birthdays feel completely ordinary, and some genuinely deserve to be celebrated loudly, {name}, and yours falls into the second category. Not because you demand attention, but because your presence actually leaves a mark on the people around you, whether it's the way you listen, the way you crack a joke at exactly the right moment, or the way you still show up even when you're running on empty yourself, without ever making it look like a burden.",
        "I just want you to know that you're someone who doesn't give up easily, {name}, even when the exhaustion doesn't show on the outside. This past year probably didn't go entirely according to plan, but you're still here, still trying, still caring, still working toward becoming a slightly better version of yourself. That alone is worth being proud of, even if you don't quite feel it yet.",
        "Happy birthday, {name}. May this new year of yours be full of proof that everything you've put in hasn't gone to waste, and that the exhaustion you carried quietly finally pays off."
      ]
    },
    {
      // journey metaphor, 4 paragraphs
      paragraphs: [
        "If the past year were a journey, {name}, it probably wasn't a smooth highway. More like a trail that climbed steep in places, turned muddy in others, and occasionally made you want to stop right there, but one that still had views worth pausing for along the way.",
        "And you kept walking. That's the part that matters.",
        "I hope this new year the path evens out a little, that you've got more hands to hold along the way, and that the destination starts coming into clearer view, even if it's still far off, so you don't have to walk it entirely on your own.",
        "Happy birthday, {name}. May the next steps feel lighter, and may you trust a little more that the direction you've chosen isn't the wrong one."
      ]
    },
    {
      // dramatic contrast in paragraph length, 4 paragraphs
      paragraphs: [
        "Happy birthday, {name}.",
        "I won't promise this year has to be the best one of your life, because that feels like too big a claim to make about something none of us can fully control. But I do hope this year you feel more heard, more understood, and less often like you have to explain yourself over and over to people who weren't really trying to understand in the first place. I hope you also give yourself permission to rest more often, without feeling guilty about it, and without treating your own happiness as an afterthought.",
        "Wishing you health, enough, and calm.",
        "That's really it. I hope it's enough to make your day feel special."
      ]
    },
    {
      // rhetorical about getting older, casual sign-off
      paragraphs: [
        "People say getting older automatically means carrying more weight, but I don't think that's always true, {name}. Sometimes it just means more practice understanding yourself, more patience for things that used to send you spiraling, and a better sense of what's actually worth fighting for versus what's fine to just let go, without treating that as a failure.",
        "I hope this new year of yours adds all of that, plus a little extra luck, plus a circle of people who are genuinely good for you to keep around, plus more reasons to believe you're exactly where you're supposed to be.",
        "That's about it, honestly. Happy birthday, hope this year turns out to be a fun one, {name}."
      ]
    },
    {
      // casual chat opener, not "happy birthday" first line
      paragraphs: [
        "Whoa, can't believe another year already went by, {name}. Feels like we were just talking about plans for this year, and somehow we're already back here again, with everything that happened in between.",
        "But honestly, that's kind of the cool part, time keeps moving no matter what, and you kept moving right alongside it, through whatever got thrown your way this year.",
        "Hoping next year brings more easy, relaxed moments, less unnecessary drama, and way more reasons to laugh without overthinking anything, including the small stuff that somehow ends up mattering the most.",
        "Happy birthday, {name}! Here's to getting better every single day."
      ]
    },
    {
      // letter style, 5 paragraphs, closes with a signature-like line
      paragraphs: [
        "To {name}, on your special day.",
        "I want to say thank you, even though you've probably never asked to be thanked for the little things you do. But the way you pay attention to people, the way you remember small details about the people you love, all of that is felt, and it means far more than you probably realize, even to people who've never said so out loud.",
        "I hope this year it's your turn to be paid attention to just as closely by the people around you.",
        "I hope your hard work pays off, your health stays strong, and I hope you always have a reason to believe that life, even when it's heavy, is still worth walking through with hope, one step at a time.",
        "Happy birthday. With love, from the people who are always rooting for you."
      ]
    },
    {
      // unusual close, a wish statement instead of a question back, 3 paragraphs
      paragraphs: [
        "Happy birthday, {name}. I hope today feels light, I hope you're surrounded by people who make you laugh without even trying, and I hope no part of today leaves you feeling alone.",
        "The year ahead holds a lot you can't predict yet, and it's completely normal for that to feel like a mix of excitement and nerves. But I hope you remember, you've already made it through plenty of things you once thought you couldn't handle, so odds are, you'll make it through this year too, even the parts that still feel far out of reach right now.",
        "May this new year slowly turn the things you've quietly hoped for into something real, one by one. And may the universe give you a hand getting there, every step of the way."
      ]
    },
    {
      // direct affirmation style, no small talk, 4 paragraphs
      paragraphs: [
        "I just want you to know that you're a genuinely kind person, {name}. Not kindness put on for show, but the kind that shows up in how you treat people even when no one's watching, even when no one would ever find out.",
        "You're also strong, not in the sense of never falling apart, but in the sense of always finding a way to get back up, even when it takes longer than it looks from the outside, and even when the process isn't as smooth as people assume.",
        "And you're worth loving, not because you're perfect, but because you keep trying to become better without losing who you actually are.",
        "That's really all I wanted to say today. Happy birthday, {name}. I hope you hold onto these things, especially on the days you forget them yourself."
      ]
    }
  ]
};

const AGE_PHRASES = {
  id: [
    'kamu berumur {age} sekarang',
    'kamu naik level ke {age} sekarang',
    'usiamu genap {age} tahun sekarang',
    'kamu resmi jadi {age} tahun hari ini',
    'level hidupmu naik jadi {age}',
    '{age} tahun perjalanan hidupmu, dan terus berlanjut',
    'selamat, kamu upgrade ke versi {age}',
    'hari ini kamu {age} tahun lebih bijak'
  ],
  en: [
    "you're {age} years old now",
    'you just leveled up to {age}',
    'you officially turned {age} today',
    '{age} years young, and counting',
    'welcome to age {age}',
    "you're now version {age}.0",
    '{age} trips around the sun, and counting',
    'today you unlocked age {age}'
  ]
};

const BONUS_WISH = {
  id: {
    title: 'Ucapan Rahasia',
    paragraphs: [ 'ZZZ' ]
  },
  en: {
    title: 'A Secret Message',
    paragraphs: [ 'ZZZ' ]
  }
};