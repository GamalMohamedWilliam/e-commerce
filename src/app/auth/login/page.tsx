// src/app/auth/login/page.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { loginSchema, type LoginValues } from '@/schema/login.schema';

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get('callbackUrl') || '/';

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: LoginValues) {
    // امسح أي خطأ عام قديم
    form.clearErrors('root');

    const res = await signIn('credentials', {
      email: values.email.trim().toLowerCase(),
      password: values.password,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      // NextAuth بيرجع CredentialsSignin لما البيانات غلط
      const msg = res.error === 'CredentialsSignin'
        ? 'Invalid email or password'
        : res.error;

      form.setError('root', { message: msg });
      return;
    }

    // نجاح
    router.push(res?.url || callbackUrl || '/');
    router.refresh();
  }

  function handleGitHubSignIn() {
    signIn('github', { callbackUrl });
  }

  return (
    <>
      <h2 className="my-5">Login Now:</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-2/3 mx-auto">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* خطأ عام راجع من NextAuth */}
          {form.formState.errors.root?.message && (
            <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
          )}

          <Button
            className="w-full bg-main hover:bg-main"
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Logging in…' : 'Login'}
          </Button>

        </form>
      </Form>

      <div className="text-center mt-4 w-2/3 mx-auto">
        <Button onClick={handleGitHubSignIn} className="w-full">
          LogIn with GITHUB <i className="fa-brands fa-github ml-2" />
        </Button>
      </div>

    </>
  );
}
