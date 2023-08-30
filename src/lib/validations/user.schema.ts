import { z } from 'zod'

export const password = { min: 6, max: 32 }
export const RegisterUserSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required'
      })
      .min(1, 'Full name is required'),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .min(1, 'Email is required')
      .email('Email is invalid'),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(1, 'Password is required')
      .min(password.min, `Password must be more than ${password.min} characters`)
      .max(password.max, `Password must be less than ${password.max} characters`),
    confirmPassword: z
      .string({
        required_error: 'Confirm your password'
      })
      .min(1, 'Confirm your password')
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .min(1, 'Email is required')
    .email('Email is invalid'),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(1, 'Password is required')
    .min(password.min, `Password must be at least ${password.min} characters`)
})

export type LoginUserInput = z.infer<typeof LoginUserSchema>
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>
