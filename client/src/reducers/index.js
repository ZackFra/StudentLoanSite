

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
		default: 
			break;
	}

	return ns;
}

export default reducer;