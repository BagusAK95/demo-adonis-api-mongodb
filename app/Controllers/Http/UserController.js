'use strict'

class UserController {
  show({auth}){
    return auth.getUser()
  }

  login ({ request, auth }) {
    const { email, password } = request.all()
    return auth.attempt(email, password)
  }

  logout ({auth}) {
    return auth.logout()
  }
}

module.exports = UserController
