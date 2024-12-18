/*
 * ASCII-Morph - JavaScript morphic animation (v. 0.2.3)
 *
 * Copyright (c) 2024 Jakub T. Jankiewicz <https://jcubic.pl/me>
 * Copyright (c) 2016 Tim Holman - http://tholman.com
 *
 * Released under MIT license
 *
 * Sat, 30 Nov 2024 20:23:33 +0000
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AsciiMorph = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * ASCII-Morph - JavaScript morphic animation (v. 0.2.3)
 *
 * Copyright (c) 2024 Jakub T. Jankiewicz https://jcu.bi
 * Copyright (c) 2016 Tim Holman - http://tholman.com
 */

function AsciiMorph(canvasSize) {
  'use strict';

  var canvasDimensions = canvasSize;

  /**
   * Utils
   */

  function repeat(pattern, count) {
    return pattern.replace(count);
  }
  function replaceAt(string, index, character) {
    return string.substr(0, index) + character + string.substr(index + character.length);
  }

  /**
   * AsciiMorph
   */

  function squareOutData(data) {
    var i;
    var renderDimensions = {
      x: 0,
      y: data.length
    };

    // Calculate centering numbers
    for (i = 0; i < data.length; i++) {
      if (data[i].length > renderDimensions.x) {
        renderDimensions.x = data[i].length;
      }
    }

    // Pad out right side of data to square it out
    for (i = 0; i < data.length; i++) {
      if (data[i].length < renderDimensions.x) {
        data[i] = data[i] + repeat(' ', renderDimensions.x - data[i].length);
      }
    }
    var paddings = {
      x: Math.floor((canvasDimensions.x - renderDimensions.x) / 2),
      y: Math.floor((canvasDimensions.y - renderDimensions.y) / 2)
    };

    // Left Padding
    for (var i = 0; i < data.length; i++) {
      data[i] = repeat(' ', paddings.x) + data[i] + repeat(' ', paddings.x);
    }

    // Pad out the rest of everything
    for (var i = 0; i < canvasDimensions.y; i++) {
      if (i < paddings.y) {
        data.unshift(repeat(' ', canvasDimensions.x));
      } else if (i > paddings.y + renderDimensions.y) {
        data.push(repeat(' ', canvasDimensions.x));
      }
    }
    return data;
  }

  // Crushes the frame data by 1 unit.
  function getMorphedFrame(data) {
    var firstInLine,
      lastInLine = null;
    var found = false;
    for (var i = 0; i < data.length; i++) {
      var line = data[i];
      firstInLine = line.search(/\S/);
      if (firstInLine === -1) {
        firstInLine = null;
      }
      for (var j = 0; j < line.length; j++) {
        if (line[j] != ' ') {
          lastInLine = j;
        }
      }
      if (firstInLine !== null && lastInLine !== null) {
        data = crushLine(data, i, firstInLine, lastInLine);
        found = true;
      }
      firstInLine = null, lastInLine = null;
    }
    if (found) {
      return data;
    } else {
      return false;
    }
  }
  function crushLine(data, line, start, end) {
    var centers = {
      x: Math.floor(canvasDimensions.x / 2),
      y: Math.floor(canvasDimensions.y / 2)
    };
    var crushDirection = 1;
    if (line > centers.y) {
      crushDirection = -1;
    }
    var charA = data[line][start];
    var charB = data[line][end];
    data[line] = replaceAt(data[line], start, " ");
    data[line] = replaceAt(data[line], end, " ");
    if (!(end - 1 == start + 1) && !(start === end) && !(start + 1 === end)) {
      data[line + crushDirection] = replaceAt(data[line + crushDirection], start + 1, '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1));
      data[line + crushDirection] = replaceAt(data[line + crushDirection], end - 1, '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1));
    } else if ((start === end || start + 1 === end) && line + 1 !== centers.y && line - 1 !== centers.y && line !== centers.y) {
      data[line + crushDirection] = replaceAt(data[line + crushDirection], start, '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1));
      data[line + crushDirection] = replaceAt(data[line + crushDirection], end, '+*/\\'.substr(Math.floor(Math.random() * '+*/\\'.length), 1));
    }
    return data;
  }
  function render(element, data) {
    var ourData = squareOutData(data.slice());
    renderSquareData(element, ourData);
  }
  function render(element, data) {
    element.innerHTML = data.join('\n');
  }

  // Morph between whatever two static frames
  function morph(start, end) {
    return prepareFrames([...start], [...end]).map(squareOutData);
  }
  function prepareFrames(start, end) {
    var deconstructionFrames = [];
    var constructionFrames = [];
    var clonedData = start;

    // If its taking more than 100 frames, its probably somehow broken
    // Get the deconscrution frames
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(clonedData);
      if (newData === false) {
        break;
      }
      deconstructionFrames.push(newData.slice(0));
      clonedData = newData;
    }

    // Get the constuction frames for the new data
    var squareData = squareOutData(end);
    constructionFrames.unshift(squareData.slice(0));
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(squareData);
      if (newData === false) {
        break;
      }
      constructionFrames.unshift(newData.slice(0));
      squareData = newData;
    }
    return deconstructionFrames.concat(constructionFrames);
  }
  function animate(frames, callback, {
    signal
  } = {}) {
    const framesToAnimate = [...frames];
    let myTimeout;
    return new Promise((resolve, reject) => {
      (function loop() {
        myTimeout = setTimeout(function () {
          if (signal?.aborted) {
            return reject('aborted');
          }
          callback(framesToAnimate[0]);
          framesToAnimate.shift();
          if (framesToAnimate.length > 0) {
            loop();
          } else {
            resolve();
          }
        }, 20);
      })();
    });
  }
  function update(element) {
    return data => render(element, data);
  }
  return {
    morph,
    update,
    animate
  };
}
;
var _default = exports.default = AsciiMorph;
if (typeof module !== 'undefined') {
  module.exports = AsciiMorph;
}

},{}]},{},[1])(1)
});
