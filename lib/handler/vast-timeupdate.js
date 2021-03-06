"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  if (this._destroyed) return;

  var videoSlot = this._videoSlot;
  var percentPlayed = _mapNumber(0, videoSlot.duration, 0, 100, videoSlot.currentTime);
  var last = this._lastQuartilePosition;

  if (percentPlayed < last.position) return;

  if (last.hook) last.hook();

  this.emit(last.event);

  var quartile = this._quartileEvents;
  this._lastQuartilePosition = quartile[quartile.indexOf(last) + 1];
};

function _normNumber(start, end, value) {
  return (value - start) / (end - start);
}

function _mapNumber(fromStart, fromEnd, toStart, toEnd, value) {
  return toStart + (toEnd - toStart) * _normNumber(fromStart, fromEnd, value);
}