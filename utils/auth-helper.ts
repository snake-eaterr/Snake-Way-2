

const isAuthenticated = (): boolean  => {
	if(typeof window == 'undefined') {
		return false;
	}
  

	if(localStorage.getItem('snake-way-2')) {
		return true;
	} else {
		return false;
	}
}

export default { isAuthenticated }