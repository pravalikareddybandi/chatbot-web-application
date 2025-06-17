import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/api/auth.ts
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = 'your-super-secret-jwt-key-here'

// Mock user database
const users = [
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

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return { success: false, error: 'Invalid password' }
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

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

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword
    }
    
    users.push(newUser)

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

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
      const decoded = jwt.verify(token, JWT_SECRET) as any
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