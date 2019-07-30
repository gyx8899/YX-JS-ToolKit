/**!
 * YX Common Library v2.0.0.190729_beta | https://github.com/gyx8899/YX-JS-ToolKit/blob/master/assets/js
 * Copyright (c) 2018 Kate Kuo @Steper
 */

import * as algorithm from './util/Algorithm';
import * as animateElement from './util/AnimateElement';
import * as animateTiming from './util/AnimateTiming';
import * as array from './util/Array';
import * as browser from './util/Browser';
import * as device from './util/Device';
import * as element from './util/Element';
import * as event from './util/Event';
import * as html from './util/HTML';
import * as is from './util/IS';
import * as load from './util/Load';
import * as math from './util/Math';
import * as navigator from './util/Navigator';
import * as page from './util/Page';
import * as plugin from './util/Plugin';
import * as regExp from './util/RegExp';
import * as string from './util/String';
import * as tool from './util/Tool';
import * as url from './util/URL';

import Event from './components/Event';
import WebWorker from './components/WebWorker';
import ShareWorkers from './components/ShareWorkers';

let YX = {
	Util: {
		algorithm,
		animateElement,
		animateTiming,
		array,
		browser,
		device,
		element,
		event,
		html,
		is,
		load,
		math,
		navigator,
		page,
		plugin,
		regExp,
		string,
		tool,
		url,
	},
	WebWorker,
	ShareWorkers,
	event: new Event(),
};

export default YX;