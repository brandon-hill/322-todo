module.exports = {
	ensureAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			console.log('authentication successful')
			return next()
		}
		console.log('authentication failed')
		req.flash('error_msg', 'Please log in to view this resource')
		res.redirect('/user/login')
	},
}
