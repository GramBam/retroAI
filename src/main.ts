import * as WebFont from "webfontloader";
import {GameApp} from "./app/app";

WebFont.load({
	custom: {
		families: [ "Arcade" ],
	},
	active: () => {
    const myGame = new GameApp(document.body,  window.innerWidth, window.innerHeight);
	},
});