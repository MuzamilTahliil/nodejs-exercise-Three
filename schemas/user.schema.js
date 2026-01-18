const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: 'Username is required',
        }),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email('Not a valid email'),
        password: z
            .string({
                required_error: 'Password is required',
            })
            .min(6, 'Password too short - should be 6 chars minimum'),
        role: z.enum(['user', 'admin']).optional(),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
};
