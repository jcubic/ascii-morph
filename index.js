/**
 * Ascii Morph
 *
 * Copyright (c) 2024 Jakub T. Jankiewicz https://jcu.bi
 * Copyright (c) 2016 Tim Holman - http://tholman.com
 */

export default function AsciiMorph(canvasSize) {

  'use strict';

  var canvasDimensions = canvasSize;

  /**
   * Utils
   */

  function repeat(pattern, count) {
      return pattern.replace(count);
  }

  function replaceAt(string, index, character ) {
    return string.substr(0, index) + character + string.substr(index+character.length);
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
    for( i = 0; i < data.length; i++ ) {
      if( data[i].length > renderDimensions.x) {
        renderDimensions.x = data[i].length
      }
    }

    // Pad out right side of data to square it out
    for( i = 0; i < data.length; i++ ) {
      if( data[i].length < renderDimensions.x) {
        data[i] = (data[i] + repeat(' ', renderDimensions.x - data[i].length ));
      }
    }

    var paddings = {
      x: Math.floor((canvasDimensions.x - renderDimensions.x) / 2),
      y: Math.floor((canvasDimensions.y - renderDimensions.y) / 2)
    }

    // Left Padding
    for( var i = 0; i < data.length; i++ ) {
      data[i] = repeat(' ', paddings.x) + data[i] + repeat(' ', paddings.x);
    }

    // Pad out the rest of everything
    for( var i = 0; i < canvasDimensions.y; i++ ) {
      if( i < paddings.y) {
        data.unshift( repeat(' ', canvasDimensions.x));
      } else if (i > (paddings.y + renderDimensions.y)) {
        data.push( repeat(' ', canvasDimensions.x));
      }
    }

    return data;
  }

  // Crushes the frame data by 1 unit.
  function getMorphedFrame(data) {

    var firstInLine, lastInLine = null;
    var found = false;
    for( var i = 0; i < data.length; i++) {

      var line = data[i];
      firstInLine = line.search(/\S/);
      if( firstInLine === -1) {
        firstInLine = null;
      }

      for( var j = 0; j < line.length; j++) {
        if( line[j] != ' ') {
          lastInLine = j;
        }
      }

      if( firstInLine !== null && lastInLine !== null) {
        data = crushLine(data, i, firstInLine, lastInLine)
        found = true;
      }

      firstInLine = null, lastInLine = null;
    }

    if( found ) {
      return data;
    } else {
      return false;
    }
  }

  function crushLine(data, line, start, end) {

    var centers = {
      x: Math.floor(canvasDimensions.x / 2),
      y: Math.floor(canvasDimensions.y / 2)
    }

    var crushDirection = 1;
    if( line > centers.y ) {
      crushDirection = -1;
    }

    var charA = data[line][start];
    var charB = data[line][end];

    data[line] = replaceAt(data[line], start, " ");
    data[line] = replaceAt(data[line], end, " ");

    if( !((end - 1) == (start + 1)) && !(start === end) && !((start + 1) === end)) {
      data[line + crushDirection] = replaceAt(data[line + crushDirection], (start + 1), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
      data[line + crushDirection] = replaceAt(data[line + crushDirection], (end - 1), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
    } else if ((((start === end) || (start + 1) === end)) && ((line + 1) !== centers.y && (line - 1) !== centers.y && line !== centers.y)) {
      data[line + crushDirection] = replaceAt(data[line + crushDirection], (start), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
      data[line + crushDirection] = replaceAt(data[line + crushDirection], (end), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
    }

    return data;
  }

  function render(element, data) {
    var ourData = squareOutData(data.slice());
    renderSquareData(element, ourData);
  }

  function renderSquareData(element, data) {
    element.innerHTML = '';
    for( var i = 0; i < data.length; i++ ) {
      element.innerHTML = element.innerHTML + data[i] + '\n';
    }
  }

  // Morph between whatever two static frames
  function morph(start, end) {
    return prepareFrames([...start], [...end]);
  }

  function prepareFrames(start, end) {

    var deconstructionFrames = [];
    var constructionFrames = [];

    var clonedData = start;

    // If its taking more than 100 frames, its probably somehow broken
    // Get the deconscrution frames
    for(var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(clonedData);
      if( newData === false) {
        break;
      }
      deconstructionFrames.push(newData.slice(0));
      clonedData = newData;
    }

    // Get the constuction frames for the new data
    var squareData = squareOutData(end);
    constructionFrames.unshift(squareData.slice(0));
    for( var i = 0; i < 100; i++ ) {
      var newData = getMorphedFrame(squareData);
      if( newData === false) {
        break;
      }
      constructionFrames.unshift(newData.slice(0));
      squareData = newData;
    }

    return deconstructionFrames.concat(constructionFrames)
  }

  function animate(frames, callback) {
    const framesToAnimate = [...frames];
    let myTimeout;
    (function loop() {
      myTimeout = setTimeout(function() {

        callback(framesToAnimate[0]);
        framesToAnimate.shift();
        if (framesToAnimate.length > 0) {
          loop();
        }
      }, 20)
    })();
  }

  function update(element) {
    return data => render(element, data);
  }

  return {
    morph,
    update,
    animate
  };
};
