import { gsap, Elastic, Expo, Power1, Power3, Circ } from 'gsap';
import { SplitText, ScrollTrigger, CustomEase, Draggable } from 'gsap/all';

if (import.meta.client) {
  gsap.registerPlugin(CustomEase, SplitText, Draggable);
  CustomEase.create('in-out-smooth', 'M0,0 C0.8,0 0.2,1 1,1');
}

export const useGsap = () => {
  return {
    gsap,
    SplitText,
    Elastic,
    Expo,
    Power1,
    Power3,
    Circ,
    ScrollTrigger,
    CustomEase,
    Draggable,
  };
};
