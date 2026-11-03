import { Composition } from "remotion";
import { ProductFilm } from "./ProductFilm";

export const RemotionRoot = () => (
  <>
    <Composition
      id="ProductFilm"
      component={ProductFilm}
      durationInFrames={720}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
