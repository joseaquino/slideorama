import compose from "crocks/helpers/compose";
import { initializeState, moveSlidesForward } from "./slideshow";

const slides = [
  { title: "Slide 1" },
  { title: "Slide 2" },
  { title: "Slide 3" },
  { title: "Slide 4" }
];

const props = {
  slides
};

describe("Tests for slideshow model", () => {
  test("It should set the currentSlide to be the first slide on state initialization", () => {
    let state = initializeState(props);
    expect(state.currentSlide).toBe(slides[0]);
  });

  test("It should set the nextSlide to be the second slide on state initialization", () => {
    let state = initializeState(props);
    expect(state.nextSlide).toBe(slides[1]);
  });

  test("It should set the prevSlide to be the last slide on state initialization", () => {
    let state = initializeState(props);
    expect(state.prevSlide).toBe(slides[slides.length - 1]);
  });
  test("It should move the slides forward", () => {
    let prevState = initializeState(props);
    let state = moveSlidesForward(prevState);
    expect(state.currentSlide).toBe(prevState.nextSlide);
    expect(state.prevSlide).toBe(prevState.currentSlide);
    expect(state.nextSlide).toBe(prevState.slides[0]);
    expect(state.slides[0]).toBe(prevState.prevSlide);
  });
});
