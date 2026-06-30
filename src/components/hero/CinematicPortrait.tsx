"use client";

export function CinematicPortrait() {
  return (
    <div className="hero-half-image-wrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portrait-cutout.png?v=4"
        alt="Anjaneyulu Pallepagu"
        className="hero-half-image"
        draggable={false}
      />
    </div>
  );
}