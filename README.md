# Ascii Morph

[![npm](https://img.shields.io/badge/npm-0.2.0-blue.svg)](https://www.npmjs.com/package/ascii-morph)
[![License](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/license/MIT)

[Ascii Morph](https://github.com/jcubic/ascii-morph) is a small stand alone javascript library for rendering ascii art and creations into elements, allowing for them to be changed out with a morphing transition.

## Demo
Here's a gif of it in action. You can also play with the [demo live here](https://codepen.io/jcubic/pen/dyxXdLE).

![Ascii Morph in action](https://s3.amazonaws.com/tholman.com/static-assets/ascii-morph-demo.gif)

## Usage

### Installation

```
npm install ascii-morph
```

This is example usage. First you need two frames as array of lines:

```javascript
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
```

Then you can create and animation between those two frames:

```javascript
import AsciiMorph from 'ascii-morph';

const anim = AsciiMorph({ x: 50, y: 25 });

const frames = anim.morph(bird, mona);

anim.animate(frames, function(frame) {
  console.log('\x1b[2J' + frame.join('\n'));
});
```

> [!NOTE]
> `\x1b[2J` ANSI Escape code will clear the terminal.

When using in Browser you can use helper function that will update the DOM:

```javascript
const render = anim.update(document.querySelector('pre'));

anim.animate(frames, render);
```

You can also use the animate and update the DOM yourself. You can also use frames directly.
`frames` are an array of frames similar to the input ones.

### AbortSignal

`animate` function return a Promise and accept [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal).

```javascript
anim.animate(frames, render, { signal: AbortSignal.timeout(5000) }).then(() => {
  console.log('animation finished');
}).catch(() => {
  console.log('animation aborted');
});
```

## License

Copyright (c) 2024 Jakub Jankiewicz https://jcu.bi<br/>
Copyright (c) 2016 Tim Holman - http://tholman.com

[The MIT License](https://github.com/jcubic/ascii-morph/blob/master/LICENSE.md)
