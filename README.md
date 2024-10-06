# Ascii Morph

Ascii Morph is a small stand alone javascript library for rendering ascii art and creations into elements, allowing for them to be changed out with a morphing transition.

### Demo
Here's a gif of it in action. You can also play with the [demo live here](http://codepen.io/tholman/full/BQLQyo).

![Ascii Morph in action](https://s3.amazonaws.com/tholman.com/static-assets/ascii-morph-demo.gif)

### Usage

This is example usage:

```javascript
import AsciiMorph from 'ascii-morph';

const bird = [
  "                             /",
  "                            /",
  "                           /;",
  "                          //",
  "                         ;/",
  "                       ,//",
  "                   _,-' ;_,,",
  "                _,'-_  ;|,'",
  "            _,-'_,..--. |",
  "    ___   .'-'_)'  ) _)\\|      ___",
  "  ,'\"\"\"`'' _  )   ) _)  ''--'''_,-'",
  "-={-o-  /|    )  _)  ) ; '_,--''",
  "  \\ -' ,`.  ) .)  _)_,''|",
  "   `.\"(   `------''     /",
  "     `.\\             _,'",
  "       `-.____....-\\\\",
  "                 || \\\\",
  "                 // ||",
  "                //  ||",
  "            _-.//_ _||_,",
  "              ,'  ,-'/"
]

const mona = [
  "         ____",
  "        o8%8888,",
  "      o88%8888888.",
  "     8'-    -:8888b",
  "    8'         8888",
  "   d8.-=. ,==-.:888b",
  "   >8 `~` :`~' d8888",
  "   88         ,88888",
  "   88b. `-~  ':88888",
  "   888b ~==~ .:88888",
  "   88888o--:':::8888",
  "   `88888| :::' 8888b",
  "   8888^^'       8888b",
  "  d888           ,%888b.",
  " d88%            %%%8--'-.",
  "/88:.__ ,       _%-' ---  -",
  "    '''::===..-'   =  --.  `",
];

const anim = AsciiMorph({ x: 50, y: 25 });

const frames = anim.morph(bird, mona);

anim.animate(frames, function(frame) {
  console.log('\x1b[2J' + frame.join('\n'));
});
```

### License

Copyright (c) 2024 Jakub Jankiewicz https://jcu.bi

Copyright (c) 2016 Tim Holman - http://tholman.com

[The MIT License](https://github.com/tholman/ascii-morph/blob/master/license.md)
