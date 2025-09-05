export interface User {
  id: string
  email: string
  fullName: string
  phone: string
  country: string
  currency: string
  balance: number
  createdAt: string
}

export const authService = {
  signup: (userData: Omit<User, 'id' | 'balance' | 'createdAt'>) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.find((u: User) => u.email === userData.email)) {
      throw new Error('Email already exists')
    }

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      balance: 0,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    
    return newUser
  },

  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: User) => u.email === email)
    
    if (!user) {
      throw new Error('User not found')
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    return user
  },

  logout: () => {
    localStorage.removeItem('currentUser')
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('currentUser')
  }
}