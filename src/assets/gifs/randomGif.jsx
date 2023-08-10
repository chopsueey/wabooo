import gif1 from "./6jq.gif";
import gif2 from "./6os.gif";
import gif3 from "./Vho.gif";
import gif4 from "./y5.gif";
import gif5 from "./ZIb4.gif";

function randomGif() {
  const gifs = [gif1, gif2, gif3, gif4, gif5];
  const num = Math.floor(Math.random() * gifs.length);
  console.log(gifs[num]);
  return gifs[num];
}
const gif = randomGif();
export default gif;
