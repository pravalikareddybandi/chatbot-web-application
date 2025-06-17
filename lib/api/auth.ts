// lib/api/auth.ts
const JWT_SECRET = 'your-super-secret-jwt-key-here'

// Mock user database - In production, this would be a real database
const users: Array<{
  id: string
  name: string
  email: string
  password: string
}> = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@zerocode.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // demo123
  }
]

export const authAPI = {
  async login(email: string, password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = users.find(u => u.email === email)
    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // For demo purposes, we'll do a simple password check
    // In production, you'd use bcryptjs here
    const isValid = password === 'demo123' || user.password === password
    
    if (!isValid) {
      return { success: false, error: 'Invalid password' }
    }

    // Simple JWT simulation - in production use proper JWT library
    const token = btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    }))

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  },

  async register(name: string, email: string, password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' }
    }

    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: password // In production, hash this password
    }
    
    users.push(newUser)

    const token = btoa(JSON.stringify({
      userId: newUser.id,
      email: newUser.email,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000)
    }))

    return {
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    }
  },

  async verifyToken(token: string) {
    try {
      const decoded = JSON.parse(atob(token))
      
      // Check if token is expired
      if (decoded.exp < Date.now()) {
        throw new Error('Token expired')
      }
      
      const user = users.find(u => u.id === decoded.userId)
      
      if (!user) {
        throw new Error('User not found')
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email
      }
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}