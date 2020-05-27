

function reducer(state, action) {
	let ns = {};
	Object.assign(ns, state);

	switch(action.type) {
		case 'SET_TAB':
			ns.tab = action.payload;
			break;
		case 'SET_PASS':
			ns.pass = action.payload;
            break;
        case 'SET_USER':
            ns.user = action.payload;
			break;
		case 'TOGGLE_THROTTLE':
			ns.throttle = !ns.throttle;
			break;
		case 'SET_ACCOUNTS':
			ns.accounts = action.payload;
			break;
		case 'SET_INFO_PANEL':
			ns.infoPanels = action.payload;
			break;
		case 'SET_SELECTED':
			ns.selected = action.payload;
			break;
		case 'SET_LOIS':
			ns.lois = action.payload;
			break;
		default: 
			break;
	}

	return ns;
}

export default reducer;